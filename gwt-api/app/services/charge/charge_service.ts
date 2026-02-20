
import SerialHelper from '#services/shared/serial_helper'
import DateHelper from '#services/shared/date_helper'
import PriceService from '#services/pricing/price_service'
import DiscountService from '#services/pricing/discount_service'
import FinanceService from '#services/finance/finance_service'
import {
  OPDChargeParams,
  IPDChargeParams,
  OpitemreceRecord,
} from '#services/charge/types'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class ChargeService {
  private priceService: PriceService
  private discountService: DiscountService
  private financeService: FinanceService

  constructor() {
    this.priceService = new PriceService()
    this.discountService = new DiscountService()
    this.financeService = new FinanceService()
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CHECK SERVICE OPD GUID
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Equivalent: @Hosxpdmu@CheckServiceOPDGuid
  // INSERT or UPDATE opitemrece for OPD patient
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async checkServiceOPDGuid(
    params: OPDChargeParams,
    trx: TransactionClientContract
  ): Promise<void> {

    // ── Step 1: Validate finance lock ──────────────────
    await this.validateFinanceLockOPD(params.vn, trx)

    // ── Step 2: Resolve pttype from visit_pttype ───────
    const pttype = await this.priceService.getOPDPttype(params.vn, trx)
    if (!pttype) throw new Error(`No pttype found for vn=${params.vn}`)

    // ── Step 3: Calculate price ────────────────────────
    const priceResult = await this.priceService.calculateOPDPrice({
      vn: params.vn,
      icode: params.icode,
      pttype,
      inputPrice: params.price,
    }, trx)

    // ── Step 4: Get visit info ─────────────────────────
    const visitInfo = await this.getOPDVisitInfo(params.vn, trx)

    // ── Step 5: Check existing opitemrece ──────────────
    const existing = await trx
      .from('opitemrece')
      .where('hos_guid', params.opiGuid)
      .first()

    const staffCode = await this.getCurrentStaff()
    const now = await DateHelper.getServerDateTime(trx)
    const today = await DateHelper.getServerDate(trx)

    // ── Step 6: Build opitemrece record ────────────────
    const record: Partial<OpitemreceRecord> = {
      vn: params.vn,
      hn: params.hn,
      vstdate: visitInfo.vstdate,
      vsttime: visitInfo.vsttime,
      rxdate: today,
      rxtime: DateHelper.formatTime(now),
      icode: params.icode,
      qty: params.qty,
      unitprice: priceResult.unitprice,
      income: priceResult.income,
      paidst: priceResult.paidst,
      pttype: priceResult.pttype,
      discount: priceResult.discount,
      sum_price: priceResult.sumPrice,
      doctor: params.doctorCode,
      staff: staffCode,
      dep_code: params.depCode || await this.getComputerDepCode(),
      item_type: params.itemType,
      sub_type: params.icode?.substring(0, 1) || '',
      last_modified: now,
    }

    // ── Step 7: INSERT or UPDATE ───────────────────────
    if (!existing) {
      await trx.table('opitemrece').insert({
        hos_guid: params.opiGuid,
        ...record,
      })
    } else {
      await trx.from('opitemrece')
        .where('hos_guid', params.opiGuid)
        .update(record)
    }

    // ── Step 8: Upsert opi_dispense ────────────────────
    await this.upsertOpiDispense({
      hosGuid: params.opiGuid,
      icode: params.icode,
      doctor: params.doctorCode,
      price: priceResult.unitprice,
      pttype,
    }, trx)

    // ── Step 9: Process income discount ────────────────
    await this.discountService.processIncomeDiscount({
        hosGuid: params.opiGuid,
        vn: params.vn,
        pttype,
        income: priceResult.income,
        unitprice: priceResult.unitprice,
        mode: 'OPD',        // ← เพิ่ม
      }, trx)

    // ── Step 10: Process drugitems_inc_charge ──────────
    await this.processDrugitemsIncCharge({
      hosGuid: params.opiGuid,
      icode: params.icode,
      mode: 'OPD',
    }, trx)

    // ── Step 11: Recalc finance summary ────────────────
    await this.financeService.recalcOPDFinanceSummary(params.vn, trx)
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CHECK SERVICE IPD GUID
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Equivalent: @Hosxpdmu@CheckServiceIPDGUID
  // INSERT or UPDATE opitemrece for IPD patient
  // Also creates/updates ipt_order_no
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async checkServiceIPDGuid(
    params: IPDChargeParams,
    trx: TransactionClientContract
  ): Promise<void> {

    // ── Step 1: Validate ───────────────────────────────
    if (!params.rxDate) {
      throw new Error('Invalid RxDate for ChargeServiceIPDGUID')
    }
    await this.validateFinanceLockIPD(params.an, trx)

    // ── Step 2: Resolve pttype from ipt_pttype ─────────
    const pttype = await this.priceService.getIPDPttype(params.an, trx)
    if (!pttype) throw new Error(`No pttype found for an=${params.an}`)

    // ── Step 3: Calculate price ────────────────────────
    const priceResult = await this.priceService.calculateIPDPrice({
      an: params.an,
      icode: params.icode,
      pttype,
      inputPrice: params.price,
    }, trx)

    // ── Step 4: Resolve or create order_no ─────────────
    const orderNo = await this.resolveIPDOrderNo(
      params.an,
      params.rxDate,
      params.orderNo,
      trx
    )

    // ── Step 5: Upsert ipt_order_no ────────────────────
    await this.upsertIptOrderNo({
      an: params.an,
      orderNo,
      rxDate: params.rxDate,
    }, trx)

    // ── Step 6: Get admission info ─────────────────────
    const admInfo = await this.getIPDAdmissionInfo(params.an, trx)

    // ── Step 7: Check existing opitemrece ──────────────
    const existing = await trx
      .from('opitemrece')
      .where('hos_guid', params.opiGuid)
      .first()

    const staffCode = await this.getCurrentStaff()
    const now = await DateHelper.getServerDateTime(trx)
    const rxDateTrunc = DateHelper.truncDate(params.rxDate)
    const rxTimeFrac = DateHelper.fracTime(params.rxDate)

    // ── Step 8: Build opitemrece record ────────────────
    const record: Partial<OpitemreceRecord> = {
      an: params.an,
      hn: params.hn,
      vstdate: rxDateTrunc,
      vsttime: rxTimeFrac,
      rxdate: rxDateTrunc,
      rxtime: DateHelper.formatTime(now),
      icode: params.icode,
      qty: params.qty,
      unitprice: priceResult.unitprice,
      income: priceResult.income,
      paidst: priceResult.paidst,
      pttype: priceResult.pttype,
      discount: priceResult.discount,
      sum_price: this.roundMoney(
        (params.qty * priceResult.unitprice) - priceResult.discount
      ),
      doctor: params.doctorCode,
      staff: staffCode,
      dep_code: params.depCode || await this.getComputerDepCode(),
      item_type: params.itemType,
      sub_type: params.icode?.substring(0, 1) || '',
      last_modified: now,
      // ⭐ IPD-specific fields
      order_no: orderNo,
      item_no: -1,
      iperdose: 0,
      iperday: 0,
      drugusage: '',
      sp_use: '',
    }

    // ── Step 9: INSERT or UPDATE ───────────────────────
    if (!existing) {
      await trx.table('opitemrece').insert({
        hos_guid: params.opiGuid,
        ...record,
      })
    } else {
      await trx.from('opitemrece')
        .where('hos_guid', params.opiGuid)
        .update(record)
    }

    // ── Step 10: Upsert opi_dispense ───────────────────
    await this.upsertOpiDispense({
      hosGuid: params.opiGuid,
      icode: params.icode,
      doctor: params.doctorCode,
      price: priceResult.unitprice,
      pttype,
    }, trx)

    // ── Step 11: Process income discount ───────────────
    await this.discountService.processIncomeDiscount({
        hosGuid: params.opiGuid,
        vn: params.an,       // IPD ใช้ an
        pttype,
        income: priceResult.income,
        unitprice: priceResult.unitprice,
        mode: 'IPD',        // ← เพิ่ม
      }, trx)

    // ── Step 12: Process drugitems_inc_charge ──────────
    await this.processDrugitemsIncCharge({
      hosGuid: params.opiGuid,
      icode: params.icode,
      mode: 'IPD',
    }, trx)
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // REMOVE SERVICE OPD GUID
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Equivalent: @Hosxpdmu@CheckRemoveServiceOPDGuid
  // DELETE opitemrece + cascade opi_inc_charge
  // Only if finance_number IS NULL (ยังไม่ตัดบัญชี)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async removeServiceOPDGuid(
    vn: string,
    opiGuid: string,
    trx: TransactionClientContract
  ): Promise<void> {
    await this.removeServiceByGuid(opiGuid, trx)
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // REMOVE SERVICE IPD GUID
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Equivalent: @Hosxpdmu@CheckRemoveServiceIPDGuid
  // Same logic as OPD remove
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async removeServiceIPDGuid(
    an: string,
    opiGuid: string,
    trx: TransactionClientContract
  ): Promise<void> {
    await this.removeServiceByGuid(opiGuid, trx)
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRIVATE: Shared remove logic
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async removeServiceByGuid(
    opiGuid: string,
    trx: TransactionClientContract
  ): Promise<void> {

    // Step 1: Delete main opitemrece (only if not financed)
    await trx.from('opitemrece')
      .where('hos_guid', opiGuid)
      .where((q) => {
        q.whereNull('finance_number')
          .orWhere('finance_number', '')
      })
      .delete()

    // Step 2: Find opi_inc_charge created from this item
    const incCharge = await trx
      .from('opi_inc_charge')
      .where('origin_guid', opiGuid)
      .select('opi_guid')
      .first()

    // Step 3: If exists, delete cascade
    if (incCharge?.opi_guid) {
      // Delete the inc_charge's opitemrece
      await trx.from('opitemrece')
        .where('hos_guid', incCharge.opi_guid)
        .where((q) => {
          q.whereNull('finance_number')
            .orWhere('finance_number', '')
        })
        .delete()

      // Delete opi_inc_charge record
      await trx.from('opi_inc_charge')
        .where('opi_guid', incCharge.opi_guid)
        .delete()
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRIVATE: Helper methods
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async validateFinanceLockOPD(
    vn: string,
    trx: TransactionClientContract
  ) {
    const row = await trx.from('ovst')
      .where('vn', vn)
      .select('finance_lock')
      .first()
    if (row?.finance_lock === 'Y') {
      throw new Error('Finance Locked !')
    }
  }

  private async validateFinanceLockIPD(
    an: string,
    trx: TransactionClientContract
  ) {
    const row = await trx.from('ipt')
      .where('an', an)
      .select('finance_lock')
      .first()
    if (row?.finance_lock === 'Y') {
      throw new Error('Finance Locked !')
    }
  }

  private async getOPDVisitInfo(vn: string, trx: TransactionClientContract) {
    return trx.from('ovst')
      .where('vn', vn)
      .select('hn', 'vstdate', 'vsttime')
      .first()
  }

  private async getIPDAdmissionInfo(an: string, trx: TransactionClientContract) {
    return trx.from('ipt')
      .where('an', an)
      .select('hn', 'ward', 'regdate', 'regtime')
      .first()
  }

  private async resolveIPDOrderNo(
    an: string,
    rxDate: Date,
    inputOrderNo: number | undefined,
    trx: TransactionClientContract
  ): Promise<number> {
    // If provided, use it
    if (inputOrderNo && inputOrderNo > 0) return inputOrderNo

    // Try to find existing order for same date
    const rxDateStr = DateHelper.formatDate(rxDate)
    const existing = await trx.from('ipt_order_no')
      .where('an', an)
      .whereRaw('rxdate = ?', [rxDateStr])
      .where('order_type', 'ATO')
      .select('order_no')
      .first()

    if (existing?.order_no) return existing.order_no

    // Generate new order_no
    return SerialHelper.getUniqueSerial(
      'med_rx_number',
      'ipt_order_no',
      'order_no',
      trx
    )
  }

  private async upsertIptOrderNo(
    params: { an: string; orderNo: number; rxDate: Date },
    trx: TransactionClientContract
  ) {
    const existing = await trx.from('ipt_order_no')
      .where('an', params.an)
      .where('order_no', params.orderNo)
      .first()

    if (!existing) {
      const ward = await trx.from('ipt')
        .where('an', params.an)
        .select('ward')
        .first()

      const ipt_order_id = await SerialHelper.getUniqueSerial(
        'ipt_order_id',
        'ipt_order_no',
        'ipt_order_id',
        trx
      )

      await trx.table('ipt_order_no').insert({
        ipt_order_id,
        an: params.an,
        order_no: params.orderNo,
        rxdate: DateHelper.truncDate(params.rxDate),
        ward: ward?.ward || '',
        entry_staff: await this.getCurrentStaff(),
        order_type: 'ATO',
        order_locked: 'Y',
        rxtime: DateHelper.formatTime(new Date()),
      })
    }
  }

  private async upsertOpiDispense(
    params: {
      hosGuid: string
      icode: string
      doctor: string
      price: number
      pttype: string
    },
    trx: TransactionClientContract
  ) {
    const existing = await trx.from('opi_dispense')
      .where('hos_guid', params.hosGuid)
      .first()

    const pttypeItemsPriceId = await this.priceService
      .getPttypeItemsPriceId(params.pttype, params.icode, trx)

    if (!existing) {
      const id = await SerialHelper.getUniqueSerial(
        'opi_dispense_id',
        'opi_dispense',
        'opi_dispense_id',
        trx
      )
      await trx.table('opi_dispense').insert({
        opi_dispense_id: id,
        hos_guid: params.hosGuid,
        icode: params.icode,
        doctor: params.doctor,
        price: params.price,
        pttype_items_price_id: pttypeItemsPriceId,
      })
    } else {
      await trx.from('opi_dispense')
        .where('hos_guid', params.hosGuid)
        .update({
          price: params.price,
          pttype_items_price_id: pttypeItemsPriceId,
        })
    }
  }

  private async processDrugitemsIncCharge(
    params: { hosGuid: string; icode: string; mode: 'OPD' | 'IPD' },
    trx: TransactionClientContract
  ) {
    // ดึง charge_service items จาก s_drugitems cache
    const chargeField = params.mode === 'OPD'
      ? 'charge_service_opd' : 'charge_service_ipd'

    const serviceItem = await trx.from('s_drugitems as s')
      .leftJoin('drugitems as d', 'd.icode', 's.icode')
      .leftJoin('nondrugitems as n', 'n.icode', 's.icode')
      .where('s.icode', params.icode)
      .select(
        `d.${chargeField} as charge_service1`,
        `n.${chargeField} as charge_service2`,
        'd.multiply_charge_service as multiply1',
        'n.multiply_charge_service as multiply2',
      )
      .first()

    const addIcode = serviceItem?.charge_service1
      || serviceItem?.charge_service2
    if (!addIcode) return

    // สร้าง drugitems_inc_charge
    const incId = await SerialHelper.getUniqueSerial(
      'drugitems_inc_charge_id',
      'drugitems_inc_charge',
      'drugitems_inc_charge_id',
      trx
    )

    await trx.table('drugitems_inc_charge').insert({
      drugitems_inc_charge_id: incId,
      icode: addIcode,
      opi_guid_src: params.hosGuid,
      opi_guid_charge: params.hosGuid,
    })
  }

  private roundMoney(amount: number): number {
    return Math.round(amount * 100) / 100
  }

  private async getCurrentStaff(): Promise<string> {
    // TODO: Get from auth context / session
    return ''
  }

  private async getComputerDepCode(): Promise<string> {
    // TODO: Get from system config
    return ''
  }
}