
import SerialHelper from '#services/shared/serial_helper'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ProcessIncomeDiscountParams {
  hosGuid: string           // opitemrece.hos_guid
  vn: string                // OPD=vn / IPD=an
  pttype: string            // สิทธิ์ผู้ป่วย (primary)
  income: string            // income code จาก s_drugitems
  unitprice: number         // ราคาต่อหน่วย
  qty?: number              // จำนวน (default 1)
  icode?: string            // รหัสรายการ
  mode: 'OPD' | 'IPD'      // ⭐ OPD ≠ IPD ใน income_discount query
}

export interface DiscountCalcResult {
  discount: number          // จำนวนเงินส่วนลด (บาท)
  discountPercent: number   // % ส่วนลด (-1 = ไม่มี rule, 0 = ไม่ลด)
  sumPrice: number          // ยอดสุทธิ = (qty × unitprice) - discount
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DiscountService
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Source: @Hosxpdmu@CheckServiceOPDGuid  Lines 2079-2650
//         @Hosxpdmu@CheckServiceIPDGUID  Lines 2035-2900
//
// 3 ระดับส่วนลด (ตามลำดับ priority):
//
//   Level 1: GetPttypeItemsDiscountPercent
//            → pttype_items_price.discount_percent
//            → ถ้ามี = ใช้เลย
//            → ถ้า return -1 = fallback ไป Level 2
//
//   Level 2: income_discount table
//            → SELECT discount FROM income_discount
//              WHERE pttype=? AND income=?
//              ⭐ IPD เพิ่ม: AND department='IPD'
//
//   Level 3: pttype_items_price_inc (cover rules)
//            → ถ้า pttype_items_price_id > 0
//            → ดู inc_cover_price vs ราคา
//            → สร้าง opitemrece ตัวใหม่สำหรับ cover
//            → สร้าง opi_inc_charge เชื่อม
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default class DiscountService {

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PUBLIC: processIncomeDiscount
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // เรียกโดย ChargeService หลัง INSERT/UPDATE opitemrece
  //
  // Flow:
  //   1. GetPttypeItemsDiscountPercent(pttype, icode)
  //   2. ถ้า == -1 → getIncomeDiscountPercent(pttype, income)
  //   3. ถ้า > 0 → discount = qty × unitprice × (% / 100)
  //   4. UPDATE opitemrece SET discount, sum_price
  //   5. ดึง pttype_items_price_id จาก opi_dispense
  //   6. ถ้ามี → processPttypeItemsPriceInc (Level 3)
  //   7. POST opi_dispense, opi_inc_charge
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async processIncomeDiscount(
    params: ProcessIncomeDiscountParams,
    trx: TransactionClientContract
  ): Promise<DiscountCalcResult> {
    const qty = params.qty ?? 1

    // ──────────────────────────────────────────────────
    // Step 1: Level 1 — GetPttypeItemsDiscountPercent
    //
    // Equivalent:
    //   @Applicationdmunit@TApplicationDM
    //     @GetPttypeItemsDiscountPercent(pttype, "drugitems", icode)
    //
    // Returns:
    //   -1  → ไม่มี rule → fallback ไป income_discount
    //    0  → มี rule แต่ไม่ลด
    //   >0  → actual discount percent
    // ──────────────────────────────────────────────────

    let discountPercent = await this.getPttypeItemsDiscountPercent(
      params.pttype,
      params.icode || '',
      trx
    )

    // ──────────────────────────────────────────────────
    // Step 2: Level 2 — income_discount table
    //
    // เฉพาะเมื่อ Level 1 return -1
    //
    // OPD SQL:
    //   SELECT discount FROM income_discount
    //   WHERE pttype = ? AND income = ?
    //
    // ⭐ IPD SQL (ต่างจาก OPD):
    //   SELECT discount FROM income_discount
    //   WHERE pttype = ? AND income = ?
    //   AND department = 'IPD'
    // ──────────────────────────────────────────────────

    if (discountPercent === -1) {
      discountPercent = await this.getIncomeDiscountPercent(
        params.pttype,
        params.income,
        params.mode,
        trx
      )
    }

    // ──────────────────────────────────────────────────
    // Step 3: Calculate discount amount
    //
    // Equivalent:
    //   discount = qty × unitprice × (local_ac / 100)
    //
    // Note: HOSxP calculates in Currency (×10000)
    //   then divides back. We use normal decimals.
    // ──────────────────────────────────────────────────

    let discount = 0
    if (discountPercent > 0) {
      discount = qty * params.unitprice * (discountPercent / 100)
    }

    // ──────────────────────────────────────────────────
    // Step 4: sum_price = (qty × unitprice) - discount
    //
    // Equivalent: (L1947-1960)
    //   sum_price = RoundMoney((qty × unitprice - discount) × 10000) / 10000
    // ──────────────────────────────────────────────────

    const sumPrice = this.roundMoney((qty * params.unitprice) - discount)

    // ──────────────────────────────────────────────────
    // Step 5: UPDATE opitemrece
    // ──────────────────────────────────────────────────

    await trx.from('opitemrece')
      .where('hos_guid', params.hosGuid)
      .update({
        discount: discount,
        sum_price: sumPrice,
      })

    // ──────────────────────────────────────────────────
    // Step 6: Level 3 — pttype_items_price_inc
    //
    // ดึง pttype_items_price_id จาก opi_dispense
    // ถ้ามี → process cover rules
    // ──────────────────────────────────────────────────

    const dispense = await trx.from('opi_dispense')
      .where('hos_guid', params.hosGuid)
      .select('pttype_items_price_id')
      .first()

    const priceId = dispense?.pttype_items_price_id || 0

    if (priceId > 0) {
      await this.processPttypeItemsPriceInc({
        hosGuid: params.hosGuid,
        vn: params.vn,
        pttype: params.pttype,
        income: params.income,
        unitprice: params.unitprice,
        qty,
        pttypeItemsPriceId: priceId,
        mode: params.mode,
      }, trx)
    } else {
      // ── No price_id: POST opi_dispense as-is ────────
      //
      // Equivalent: (L2226)
      //   (**(code **)(*local_58 + 0x2a4))()  → ApplyUpdates
      //   เมื่อไม่มี pttype_items_price_id จะ apply changes
      //   แล้วจบ
    }

    return { discount, discountPercent, sumPrice }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRIVATE: getPttypeItemsDiscountPercent
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Equivalent:
  //   @Applicationdmunit@TApplicationDM
  //     @GetPttypeItemsDiscountPercent$qqr
  //       20System@UnicodeStringt1iit1
  //   (ApplicationDM, "drugitems", icode)
  //
  // ค้นหา discount_percent จาก pttype_items_price
  // ตาม pttype + icode
  //
  // Return:
  //   actual %  → ใช้เลย
  //   -1        → ไม่มี rule, ให้ใช้ income_discount table
  //    0        → มี rule, ไม่ลด
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async getPttypeItemsDiscountPercent(
    pttype: string,
    icode: string,
    trx: TransactionClientContract
  ): Promise<number> {

    if (!pttype || !icode) return -1

    // ── ดึง pttype_price_policy_type_id ───────────────
    const pttypeRow = await trx.from('pttype')
      .where('pttype', pttype)
      .select('pttype_price_policy_type_id')
      .first()

    if (!pttypeRow?.pttype_price_policy_type_id) return -1

    // ── ค้นหาใน pttype_items_price ────────────────────
    //
    // pttype_items_price เก็บกฎราคา/ส่วนลด
    // เฉพาะสิทธิ์ + รายการ
    //
    // ค้นหาตาม:
    //   pttype + icode
    //   OR pttype + income group
    //   OR pttype + dt_type (date-based rules)

    const rule = await trx.from('pttype_items_price')
      .where('pttype', pttype)
      .where('icode', icode)
      .select('pttype_items_price_id', 'discount_percent')
      .first()

    if (rule) {
      return rule.discount_percent ?? -1
    }

    // ── ไม่มี rule เฉพาะ icode ────────────────────────
    return -1
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRIVATE: getIncomeDiscountPercent
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // OPD Equivalent: (L2079-2100)
  //   local_60 = income_discount dataset
  //   Locate("pttype;income", [pttype, income])
  //   discount = FieldByName("discount").AsFloat
  //
  // IPD Equivalent: (L2076-2100)
  //   SELECT discount FROM income_discount
  //   WHERE pttype = ? AND income = ?
  //   AND department = 'IPD'
  //
  //   ⭐ IPD ต่างจาก OPD ตรงที่มีเงื่อนไข department
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async getIncomeDiscountPercent(
    pttype: string,
    income: string,
    mode: 'OPD' | 'IPD',
    trx: TransactionClientContract
  ): Promise<number> {

    if (!pttype || !income) return 0

    // ── Build query ───────────────────────────────────
    const query = trx.from('income_discount')
      .where('pttype', pttype)
      .where('income', income)
      .select('discount')

    // ⭐ IPD: เพิ่มเงื่อนไข department = 'IPD'
    //
    // จาก decompiled IPD code (L2077):
    //   "select discount from income_discount
    //    where pttype = \"...\" and income = \"...\"
    //    and department=\"IPD\""
    //
    // OPD ไม่มีเงื่อนไข department
    // (OPD ใช้ Locate บน cached dataset ที่ index "pttype;income")

    if (mode === 'IPD') {
      query.where('department', 'IPD')
    }

    const row = await query.first()

    return row?.discount ?? 0
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRIVATE: processPttypeItemsPriceInc
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Equivalent:
  //   OPD Lines 2270-2650
  //   IPD Lines 2370-2900
  //
  // เมื่อ pttype_items_price_id > 0:
  //
  //   1. SELECT * FROM pttype_items_price_inc
  //      WHERE pttype_items_price_id = ?
  //
  //   2. Compare opi_dispense.price vs inc_cover_price:
  //      - ถ้า price < inc_cover_price → ต้อง cover
  //
  //   3. ถ้าต้อง cover:
  //      a. อ่าน opi_dispense.qty, price
  //      b. คำนวณ cover_price = qty × price
  //      c. SET opi_dispense.price = cover_price
  //
  //      d. ดึง discount_percent จาก pttype_items_price_inc
  //         - ถ้า discount_percent > 0 → ใช้เลย
  //         - ถ้า <= 0 → เรียก GetPttypeItemsDiscountPercent อีกรอบ
  //           - ถ้ายังได้ -1 → ค้น income_discount table
  //             ⭐ IPD: query income_discount ที่นี่ใช้
  //               "WHERE pttype IN (SELECT pttype FROM ipt_pttype WHERE an=?)
  //                AND department='IPD'"
  //
  //      e. คำนวณ discount สำหรับ cover charge
  //         - ถ้า discount_percent > 0:
  //           - ปกติ: discount = qty × price × (% / 100)
  //           - ถ้ามี inc_cover_price:
  //             discount = (qty × price - inc_cover_price) × (% / 100)
  //
  //      f. SET opi_dispense.discount = cover_discount
  //
  //      g. opi_dispense.price = inc_cover_price (cap the cover)
  //
  //      h. สร้าง opitemrece ตัวใหม่
  //         (split charge สำหรับส่วนที่ cover)
  //         - hos_guid = opi_dispense.hos_guid ของ inc charge
  //         - unitprice = original price
  //         - price → ตามที่คำนวณ
  //
  //      i. สร้าง opi_inc_charge เชื่อมกลับ
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async processPttypeItemsPriceInc(
    params: {
      hosGuid: string
      vn: string
      pttype: string
      income: string
      unitprice: number
      qty: number
      pttypeItemsPriceId: number
      mode: 'OPD' | 'IPD'
      icode?: string
    },
    trx: TransactionClientContract
  ): Promise<void> {

    // ── Step 1: ดึง inc cover rules ───────────────────
    //
    // SELECT * FROM pttype_items_price_inc
    // WHERE pttype_items_price_id = ?
    //
    // Columns: inc_cover_price, discount_percent, income, ...

    const incRules = await trx
      .from('pttype_items_price_inc')
      .where('pttype_items_price_id', params.pttypeItemsPriceId)
      .select('*')

    if (!incRules || incRules.length === 0) return

    // ── Step 2: ดึง opi_dispense price/qty ─────────────

    const dispRow = await trx.from('opi_dispense')
      .where('hos_guid', params.hosGuid)
      .select('price', 'icode')
      .first()

    if (!dispRow) return

    const currentPrice = dispRow.price ?? params.unitprice

    // ── Step 3: Process first matching inc rule ────────
    //
    // HOSxP processes RecordCount > 0 → ใช้ record แรก

    const rule = incRules[0]

    // ── Step 4: Compare price vs inc_cover_price ──────
    //
    // Equivalent: (L2310-2315 OPD, L2435-2440 IPD)
    //   if price < inc_cover_price then ...

    if (currentPrice >= (rule.inc_cover_price ?? 0)) {
      // price ≥ cover → ไม่ต้อง cover, apply updates แล้วจบ
      return
    }

    // ━━━━ COVER NEEDED ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // ── Step 5: Read values from opi_dispense ──────────
    //
    // Equivalent: (L2320-2340)
    //   local_74 = qty × price  (cover_price)
    //   local_6c = qty
    //   local_8c = price

    const coverPrice = params.qty * currentPrice
    const coverQty = params.qty

    // ── Step 6: Determine discount_percent ─────────────
    //
    // Check pttype_items_price_inc.discount_percent first
    //
    // Equivalent: (L2408-2420 OPD, L2560-2575 IPD)
    //   FieldByName("discount_percent").AsFloat → local_c4
    //   ถ้า <= 0 → เรียก GetPttypeItemsDiscountPercent

    let incDiscountPct: number = rule.discount_percent ?? 0

    if (incDiscountPct <= 0) {
      // ── Fallback: GetPttypeItemsDiscountPercent ──────
      incDiscountPct = await this.getPttypeItemsDiscountPercent(
        params.pttype,
        params.icode || dispRow.icode || '',
        trx
      )

      // ── ถ้ายังเป็น -1 → ค้น income_discount ──────────
      //
      // ⭐ IPD ตรงนี้ใช้ subquery ต่างจาก OPD:
      //
      // IPD (L2470):
      //   SELECT * FROM income_discount
      //   WHERE pttype IN (
      //     SELECT pttype FROM ipt_pttype WHERE an = ?
      //   )
      //   AND department = 'IPD'
      //   → Locate("pttype;income", [pttype, income])
      //
      // OPD (L2100):
      //   Locate on cached income_discount
      //   by "pttype;income" = [pttype, income]

      if (incDiscountPct === -1) {
        incDiscountPct = await this.getIncomeDiscountForCover(
          params.pttype,
          params.income,
          params.vn,
          params.mode,
          trx
        )
      }
    }

    // ── Step 7: Calculate cover discount ───────────────
    //
    // Equivalent: (L2440-2470 OPD, L2580-2610 IPD)
    //
    // ถ้า discount_percent > 0:
    //   opi_dispense.discount = qty × price × (% / 100)
    //
    //   สำหรับ opitemrece split charge:
    //   - ถ้า NOT using inc_cover_price deduction:
    //     discount = qty × price × (% / 100)
    //   - ถ้า using inc_cover_price:
    //     discount = (qty × price - inc_cover_price) × (% / 100)

    let coverDiscount = 0
    let splitChargeDiscount = 0

    if (incDiscountPct > 0) {
      // opi_dispense level discount
      coverDiscount = coverQty * currentPrice * (incDiscountPct / 100)

      // Split charge discount (สำหรับ opitemrece ตัวใหม่)
      //
      // Equivalent: (L2540 OPD / L2700 IPD)
      //   ถ้ามี discount_percent จาก pttype_items_price_inc โดยตรง:
      //     discount = (qty × price - inc_cover_price) × (% / 100)
      //   ถ้ามาจาก income_discount:
      //     discount = qty × original_price × (% / 100)

      if (rule.discount_percent > 0) {
        // มี discount_percent จาก inc rule โดยตรง
        // → หัก inc_cover_price ก่อนคำนวณ
        splitChargeDiscount = (coverQty * currentPrice - (rule.inc_cover_price ?? 0))
          * (incDiscountPct / 100)
      } else {
        // discount จาก income_discount table
        splitChargeDiscount = coverQty * currentPrice * (incDiscountPct / 100)
      }
    }

    // ── Step 8: Update opi_dispense ────────────────────
    //
    // Equivalent: (L2350-2380)
    //   opi_dispense.discount = coverDiscount
    //   opi_dispense.price = inc_cover_price (cap)

    await trx.from('opi_dispense')
      .where('hos_guid', params.hosGuid)
      .update({
        discount: coverDiscount,
        price: rule.inc_cover_price ?? currentPrice,
      })

    // ── Step 9: Get origin hos_guid ───────────────────
    //
    // Equivalent: (L2385-2390)
    //   FieldByName("hos_guid").AsString → local_90

    const originGuid = params.hosGuid

    // ── Step 10: สร้าง opi_inc_charge ──────────────────
    //
    // Equivalent: (L2400-2530)
    //   Locate opi_inc_charge by opi_guid
    //   ถ้าไม่มี → Append
    //     - opi_inc_charge_id = GetSerialNumber loop
    //   ถ้ามี → Edit
    //
    //   SET:
    //     vn = local_c (vn/an)
    //     opi_guid = opi_dispense.hos_guid
    //     discount = 0 (initially)
    //     income = '' (initially)
    //     paidst = '' (initially)

    await this.upsertOpiIncCharge({
      vn: params.vn,
      opiGuid: originGuid,
      originGuid: originGuid,
      income: '',
      discount: 0,
      paidst: '',
    }, trx)

    // ── Step 11: สร้าง opitemrece ตัวใหม่ (split) ──────
    //
    // Equivalent: (L2535-2650 OPD, L2770-2900 IPD)
    //
    // HOSxP สร้าง opitemrece ใหม่สำหรับ cover amount:
    //   SELECT * FROM opitemrece WHERE hos_guid = local_90
    //   → load → set unitprice, discount, sum_price
    //   → UpdateDelta
    //
    // opi_dispense.price ถูก cap ไว้ที่ inc_cover_price
    // opitemrece ต้นทาง → sum_price ถูก recalculate

    const origOpi = await trx.from('opitemrece')
      .where('hos_guid', originGuid)
      .select('*')
      .first()

    if (origOpi) {
      const origQty = origOpi.qty || params.qty
      const origUnitprice = origOpi.unitprice || params.unitprice
      const origDiscount = origOpi.discount || 0
      const recalcSum = this.roundMoney(
        (origQty * origUnitprice) - origDiscount
      )

      await trx.from('opitemrece')
        .where('hos_guid', originGuid)
        .update({ sum_price: recalcSum })
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRIVATE: getIncomeDiscountForCover
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // ค้นหา income_discount สำหรับ cover charge
  // ภายใน pttype_items_price_inc processing
  //
  // ⭐ IPD ใช้ query ต่างจาก OPD:
  //
  // IPD (L2470-2530):
  //   SELECT * FROM income_discount
  //   WHERE pttype IN (
  //     SELECT pttype FROM ipt_pttype WHERE an = ?
  //   )
  //   AND department = 'IPD'
  //   → Locate("pttype;income", [pttype, income])
  //
  // OPD:
  //   ใช้ cached income_discount dataset
  //   → Locate("pttype;income", [pttype, income])
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async getIncomeDiscountForCover(
    pttype: string,
    income: string,
    visitKey: string,
    mode: 'OPD' | 'IPD',
    trx: TransactionClientContract
  ): Promise<number> {

    if (!pttype || !income) return 0

    if (mode === 'IPD') {
      // ── IPD: subquery ─────────────────────────────
      //
      // SELECT * FROM income_discount
      // WHERE pttype IN (
      //   SELECT pttype FROM ipt_pttype WHERE an = ?
      // )
      // AND department = 'IPD'
      // → Locate("pttype;income", [pttype, income])

      const row = await trx.from('income_discount')
        .whereIn('pttype', function (p) {
          p.select('pttype')
            .from('ipt_pttype')
            .where('an', visitKey)
        })
        .where('department', 'IPD')
        .where('income', income)
        .select('discount')
        .first()

      return row?.discount ?? 0
    }

    // ── OPD: direct lookup ──────────────────────────
    const row = await trx.from('income_discount')
      .where('pttype', pttype)
      .where('income', income)
      .select('discount')
      .first()

    return row?.discount ?? 0
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRIVATE: upsertOpiIncCharge
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Equivalent: Lines 2480-2560 OPD, Lines 2680-2760 IPD
  //
  // Locate opi_inc_charge by opi_guid:
  //   - Not found → Append
  //     → opi_inc_charge_id = GetSerialNumber loop until unique
  //       (SELECT count(*) FROM opi_inc_charge WHERE opi_inc_charge_id = ?)
  //   - Found → Edit
  //
  // Fields:
  //   opi_inc_charge_id   PK (serial)
  //   vn                  visit/admission number
  //   opi_guid            this charge's hos_guid
  //   origin_guid         source opitemrece.hos_guid
  //   income              income code
  //   discount            discount amount (baht)
  //   paidst              paid status
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async upsertOpiIncCharge(
    params: {
      vn: string
      opiGuid: string
      originGuid: string
      income: string
      discount: number
      paidst: string
    },
    trx: TransactionClientContract
  ): Promise<void> {

    if (!params.opiGuid) return

    const existing = await trx.from('opi_inc_charge')
      .where('opi_guid', params.opiGuid)
      .first()

    if (!existing) {
      // ── INSERT ──────────────────────────────────────
      //
      // Equivalent:
      //   Append(local_50)
      //   do {
      //     opi_inc_charge_id = GetSerialNumber("opi_inc_charge_id")
      //     check = SELECT count(*) FROM opi_inc_charge
      //             WHERE opi_inc_charge_id = ?
      //   } while (check > 0)

      const id = await SerialHelper.getUniqueSerial(
        'opi_inc_charge_id',
        'opi_inc_charge',
        'opi_inc_charge_id',
        trx
      )

      await trx.table('opi_inc_charge').insert({
        opi_inc_charge_id: id,
        vn: params.vn,
        opi_guid: params.opiGuid,
        origin_guid: params.originGuid,
        income: params.income,
        discount: params.discount,
        paidst: params.paidst,
      })
    } else {
      // ── UPDATE ──────────────────────────────────────
      await trx.from('opi_inc_charge')
        .where('opi_guid', params.opiGuid)
        .update({
          discount: params.discount,
          income: params.income,
          paidst: params.paidst,
        })
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PUBLIC: removeIncomeDiscountCharges
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // เรียกเมื่อลบ charge (CheckRemoveServiceOPD/IPDGuid)
  //
  // Cascade:
  //   1. Find opi_inc_charge WHERE origin_guid = hosGuid
  //   2. For each:
  //      a. DELETE opitemrece WHERE hos_guid = inc.opi_guid
  //         AND (finance_number IS NULL OR '')
  //      b. DELETE opi_inc_charge
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async removeIncomeDiscountCharges(
    hosGuid: string,
    trx: TransactionClientContract
  ): Promise<void> {

    const incCharges = await trx.from('opi_inc_charge')
      .where('origin_guid', hosGuid)
      .select('opi_guid', 'opi_inc_charge_id')

    for (const inc of incCharges) {
      // ── Delete inc charge's opitemrece ───────────────
      // (only if NOT financed)
      await trx.from('opitemrece')
        .where('hos_guid', inc.opi_guid)
        .where((q) => {
          q.whereNull('finance_number')
            .orWhere('finance_number', '')
        })
        .delete()

      // ── Delete opi_inc_charge record ────────────────
      await trx.from('opi_inc_charge')
        .where('opi_inc_charge_id', inc.opi_inc_charge_id)
        .delete()
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PUBLIC: previewDiscount (read-only)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Preview discount ก่อน save — ไม่ write DB
  // ใช้สำหรับ UI แสดงผล
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async previewDiscount(
    params: {
      pttype: string
      icode: string
      income: string
      unitprice: number
      qty?: number
      mode: 'OPD' | 'IPD'
    },
    trx: TransactionClientContract
  ): Promise<DiscountCalcResult> {
    const qty = params.qty ?? 1

    let pct = await this.getPttypeItemsDiscountPercent(
      params.pttype, params.icode, trx
    )
    if (pct === -1) {
      pct = await this.getIncomeDiscountPercent(
        params.pttype, params.income, params.mode, trx
      )
    }

    let discount = 0
    if (pct > 0) {
      discount = qty * params.unitprice * (pct / 100)
    }
    const sumPrice = this.roundMoney((qty * params.unitprice) - discount)

    return { discount, discountPercent: pct, sumPrice }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRIVATE: roundMoney
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Equivalent: @Hosxpdmu@RoundMoney$qqr15System@Currency
  //
  // HOSxP:
  //   ROUND(amount × 10000) → Currency → / 10000
  //   บาง pttype มี round_money = 'Y' → ปัดเป็นจำนวนเต็ม
  //
  // เราใช้ round to 2 decimal places เป็น default
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private roundMoney(amount: number): number {
    return Math.round(amount * 100) / 100
  }
}