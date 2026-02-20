import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import db from '@adonisjs/lucid/services/db'
import SerialHelper from '#services/shared/serial_helper'
import GuidHelper from '#services/shared/guid_helper'
import ThaiDateHelper from '#services/shared/thai_date_helper'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DoSaveVisitService
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Source: @Patientvisitentryunit@TPatientVisitEntryForm@DoSaveVisit$qqrv
//
// เรียกหลัง NewVisitService.createVisit() สร้าง ovst แล้ว
// ทำ post-processing ทั้งหมด:
//
// Section A:  oqueue generation
// Section B:  main_dep_queue generation
// Section C:  cur_dep_time, cur_dep_busy
// Section D:  Auto service charge (pttype → opitemrece)
// Section E:  OT service charge (kskdepartment → opitemrece)
// Section F:  (inline save — ไม่แยก)
// Section G:  opd_dep_queue INSERT/UPDATE
// Section H:  patient.last_visit UPDATE
// Section I:  opdscreen save (handled by NewVisitService)
// Section J:  ovst_seq enrich
// Section K:  vn_stat INSERT
// Section L:  InsertOvstVN (stub)
// Section M:  ovst final save
// Section N:  Broadcast (stub — UI only)
//
// ตาราง WRITE:
//   ovst, opitemrece, visit_pttype_charge, visit_pttype,
//   opd_dep_queue, patient, ovst_seq, vn_stat
//
// ตาราง READ:
//   visit_pttype, pttype_service_charge, spclty,
//   hospital_department, pttype, income_discount,
//   kskdepartment, s_drugitems, nondrugitems,
//   patient_arrear, patient_arrear_detail
//

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface DoSaveVisitParams {
  vn: string
  hn: string
  vstdate: string                       // yyyy-MM-dd
  vsttime: string                       // HH:mm:ss
  loginUser: string
  computerDepcode: string               // fcomputerdepcode
  computerName: string                  // fcomputername
  hospitalDepartmentId: number          // fhospitalDepartmentID
  hospitalCode: string                  // fhospitalcode
}

export interface DoSaveVisitResult {
  oqueue: number
  mainDepQueue: number
  opdDepQueueId: number
  vnStatCreated: boolean
  autoChargeCount: number               // จำนวน opitemrece จาก auto charge
  otChargeInserted: boolean
  lastVisitUpdated: boolean
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Service
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default class DoSaveVisitService {

  /**
   * Main entry — เรียกหลัง createVisit()
   * ทำ post-processing ทั้งหมดภายใน transaction เดียว
   */
  public async execute(params: DoSaveVisitParams): Promise<DoSaveVisitResult> {
    const trx = await db.transaction()

    try {
      // ═══════════════════════════════════════════════════
      // Section A: oqueue generation
      // ═══════════════════════════════════════════════════
      const oqueue = await this.generateOqueue(params.vn, params.vstdate, trx)

      // ═══════════════════════════════════════════════════
      // Section B: main_dep_queue generation
      // ═══════════════════════════════════════════════════
      const mainDepQueue = await this.generateMainDepQueue(
        params.vn, params.vstdate, trx
      )

      // ═══════════════════════════════════════════════════
      // Section C: cur_dep_time + cur_dep_busy
      // ═══════════════════════════════════════════════════
      await this.updateCurDepTime(params.vn, trx)

      // ═══════════════════════════════════════════════════
      // Section D: Auto service charge
      // ═══════════════════════════════════════════════════
      const autoChargeCount = await this.processAutoServiceCharge(params, trx)

      // ═══════════════════════════════════════════════════
      // Section E: OT service charge
      // ═══════════════════════════════════════════════════
      const otChargeInserted = await this.processOtServiceCharge(params, trx)

      // ═══════════════════════════════════════════════════
      // Section G: opd_dep_queue
      // ═══════════════════════════════════════════════════
      const opdDepQueueId = await this.upsertOpdDepQueue(params, trx)

      // ═══════════════════════════════════════════════════
      // Section H: patient.last_visit
      // ═══════════════════════════════════════════════════
      const lastVisitUpdated = await this.updatePatientLastVisit(
        params.hn, params.vstdate, trx
      )

      // ═══════════════════════════════════════════════════
      // Section J: ovst_seq enrich
      // ═══════════════════════════════════════════════════
      await this.enrichOvstSeq(params, trx)

      // ═══════════════════════════════════════════════════
      // Section K: vn_stat
      // ═══════════════════════════════════════════════════
      const vnStatCreated = await this.upsertVnStat(params.vn, params.hn, trx)

      // ═══════════════════════════════════════════════════
      // Section M: ovst final save (oqueue, main_dep_queue
      //   ถูก update ไปแล้วใน A,B — commit ผ่าน trx)
      // ═══════════════════════════════════════════════════

      await trx.commit()

      return {
        oqueue,
        mainDepQueue,
        opdDepQueueId,
        vnStatCreated,
        autoChargeCount,
        otChargeInserted,
        lastVisitUpdated,
      }
    } catch (err) {
      await trx.rollback()
      throw err
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section A: oqueue generation
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit → oqueue == 0 → loop
  //   serial_key = "ovst-q-" + FormatThaiDate(vstdate, "eemmdd")
  //   oqueue = GetSerialNumber(serial_key)
  //   ตรวจ: SELECT count(*) FROM ovst WHERE vstdate=? AND oqueue=?
  //   → ถ้าซ้ำ → loop ใหม่
  //

  private async generateOqueue(
    vn: string,
    vstdate: string,
    trx: TransactionClientContract
  ): Promise<number> {

    // ตรวจว่ามี oqueue แล้วหรือยัง
    const ovst = await trx.from('ovst').where('vn', vn).select('oqueue').first()
    if (ovst && ovst.oqueue && ovst.oqueue > 0) {
      return ovst.oqueue
    }

    const thaiDatePart = ThaiDateHelper.formatThaiDate(vstdate, 'eemmdd')
    const serialKey = `ovst-q-${thaiDatePart}`

    let oqueue = 0
    for (let attempt = 0; attempt < 100; attempt++) {
      oqueue = await SerialHelper.getSerialNumber(serialKey, trx)

      // ตรวจซ้ำ
      const dup = await trx.from('ovst')
        .where('vstdate', vstdate)
        .where('oqueue', oqueue)
        .select(trx.raw('count(*) as cc'))
        .first()

      if (!dup || Number(dup.cc) === 0) break
    }

    await trx.from('ovst').where('vn', vn).update({ oqueue })
    return oqueue
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section B: main_dep_queue generation
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit → main_dep_queue == 0 → generate
  //   serial_key = "ovst-spclty-q-" + spclty + "-" + FormatDateTime(vstdate, "eemmdd")
  //   main_dep_queue = GetSerialNumber(serial_key)
  //

  private async generateMainDepQueue(
    vn: string,
    vstdate: string,
    trx: TransactionClientContract
  ): Promise<number> {

    const ovst = await trx.from('ovst')
      .where('vn', vn)
      .select('main_dep_queue', 'spclty')
      .first()

    if (ovst && ovst.main_dep_queue && ovst.main_dep_queue > 0) {
      return ovst.main_dep_queue
    }

    const spclty = ovst?.spclty || ''
    const thaiDatePart = ThaiDateHelper.formatThaiDate(vstdate, 'eemmdd')
    const serialKey = `ovst-spclty-q-${spclty}-${thaiDatePart}`

    const mainDepQueue = await SerialHelper.getSerialNumber(serialKey, trx)

    await trx.from('ovst').where('vn', vn).update({ main_dep_queue: mainDepQueue })
    return mainDepQueue
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section C: cur_dep_time + cur_dep_busy
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit
  //   ovst.cur_dep_time = GetServerDateTime()
  //   ovst.cur_dep_busy = "N"
  //

  private async updateCurDepTime(
    vn: string,
    trx: TransactionClientContract
  ): Promise<void> {

    const now = await this.getServerDateTime(trx)

    await trx.from('ovst').where('vn', vn).update({
      cur_dep_time: now,
      cur_dep_busy: 'N',
    })
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section D: Auto Service Charge
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit
  //   visit_pttype (pttype_number=1)
  //     → pttype_service_charge (icode list by pttype)
  //       → INSERT opitemrece + visit_pttype_charge
  //

  private async processAutoServiceCharge(
    params: DoSaveVisitParams,
    trx: TransactionClientContract
  ): Promise<number> {

    // D.1: ดึง visit_pttype สิทธิ์หลัก
    const visitPttype = await trx.from('visit_pttype')
      .where('vn', params.vn)
      .where('pttype_number', 1)
      .first()

    if (!visitPttype) return 0

    const pttype = visitPttype.pttype || ''
    if (!pttype) return 0

    // ตรวจ pttype_service_charge flag
    if (visitPttype.pttype_service_charge !== 'Y') return 0

    // ตรวจ vstdate <= today
    const ovst = await trx.from('ovst')
      .where('vn', params.vn)
      .select('vstdate', 'vsttime', 'visit_type', 'spclty')
      .first()

    if (!ovst) return 0

    const todayRow = await trx.rawQuery('SELECT CURDATE() as today')
    const today = todayRow[0]?.[0]?.today || todayRow[0]?.today
    if (ovst.vstdate > today) return 0

    // D.2: Copy สิทธิ์ไป ovst
    await trx.from('ovst').where('vn', params.vn).update({
      pttype: visitPttype.pttype,
      pttypeno: visitPttype.pttypeno || '',
      hospmain: visitPttype.hospmain || '',
      hospsub: visitPttype.hospsub || '',
    })

    // D.3: ดึง pttype_service_charge records
    const chargeItems = await trx.from('pttype_service_charge')
      .where('pttype', pttype)

    if (chargeItems.length === 0) return 0

    // D.4: ตรวจ spclty.no_service_charge
    if (ovst.spclty) {
      const spcltyRow = await trx.from('spclty')
        .where('spclty', ovst.spclty)
        .select('no_service_charge')
        .first()
      if (spcltyRow?.no_service_charge === 'Y') return 0
    }

    // ตรวจ no_multiple_charge ของ hospital_department
    const noMultipleCharge = await this.checkNoMultipleCharge(
      params.hospitalDepartmentId, trx
    )

    // โหลด opitemrece ที่มีอยู่แล้ว (สำหรับตรวจซ้ำ)
    const existingItems = await trx.from('opitemrece')
      .where('vn', params.vn)
      .select('icode')
    const existingIcodes = new Set(existingItems.map((r: any) => r.icode))

    // โหลด visit_pttype_charge ที่มีอยู่แล้ว
    const existingCharges = await trx.from('visit_pttype_charge')
      .where('vn', params.vn)
      .select('pttype_service_charge_id')
    const existingChargeIds = new Set(
      existingCharges.map((r: any) => r.pttype_service_charge_id)
    )

    let insertCount = 0

    // D.5: Loop pttype_service_charge records
    for (const item of chargeItems) {
      // D.5.1: ตรวจ visit_type match
      if (item.visit_type && item.visit_type.trim() !== '') {
        if (item.visit_type !== (ovst.visit_type || '')) continue
      }

      // D.5.2: ตรวจ no_multiple_charge
      if (noMultipleCharge && item.icode) {
        const dupCount = await this.countOpitemreceByDate(
          params.hn, ovst.vstdate, item.icode, trx
        )
        if (dupCount > 0) continue
      }

      // D.5.3: ตรวจ visit_pttype_charge ซ้ำ
      if (existingChargeIds.has(item.pttype_service_charge_id)) continue

      // D.5.4: ตรวจ icode + price + income
      if (!item.icode || item.icode.trim() === '') continue
      if (Number(item.price) <= 0) continue
      if (!item.income || item.income.trim() === '') continue

      // D.5.5: ตรวจ opitemrece ซ้ำ (by icode)
      if (existingIcodes.has(item.icode)) continue

      // D.5.6: INSERT opitemrece
      const opiGuid = await GuidHelper.getNewGUID()
      const opitemreceId = await SerialHelper.getUniqueSerial(
        'opitemrece_id', 'opitemrece', 'opitemrece_id', trx
      )

      const unitprice = Number(item.price) || 0
      const qty = 1

      // D.5.7: Discount calculation
      const discount = await this.calculateDiscount(
        pttype, item.icode, item.income, qty, unitprice, trx
      )

      // D.5.8: sum_price
      let sumPrice = this.calcSumPrice(qty, unitprice, discount)

      // D.5.9: Round money check
      sumPrice = await this.applyRoundMoney(pttype, sumPrice, trx)

      await trx.insertQuery().table('opitemrece').insert({
        opitemrece_id: opitemreceId,
        hos_guid: opiGuid,
        vn: params.vn,
        hn: params.hn,
        vstdate: ovst.vstdate,
        vsttime: ovst.vsttime,
        rxdate: ovst.vstdate,
        rxtime: ovst.vsttime,
        icode: item.icode,
        qty,
        unitprice,
        discount,
        sum_price: sumPrice,
        pttype: item.pttype || pttype,
        paidst: item.paidst || '',
        income: item.income,
        staff: params.loginUser,
        dep_code: params.computerDepcode,
        item_type: '2',                       // service charge
      })

      existingIcodes.add(item.icode)

      // D.5.10: INSERT visit_pttype_charge (log)
      const chargeId = await this.getUniqueVisitPttypeChargeId(trx)

      await trx.insertQuery().table('visit_pttype_charge').insert({
        visit_pttype_charge_id: chargeId,
        pttype_service_charge_id: item.pttype_service_charge_id,
        vn: params.vn,
        opi_guid: opiGuid,
        pttype: item.pttype || pttype,
      })

      insertCount++
    }

    return insertCount
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section E: OT Service Charge
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit
  //   IF visit_type == "OT"
  //     kskdepartment.ot_service_pay == "Y"
  //     kskdepartment.ot_service_icode → INSERT opitemrece
  //

  private async processOtServiceCharge(
    params: DoSaveVisitParams,
    trx: TransactionClientContract
  ): Promise<boolean> {

    const ovst = await trx.from('ovst')
      .where('vn', params.vn)
      .select('visit_type', 'cur_dep', 'vstdate', 'vsttime')
      .first()

    if (!ovst) return false

    // E.1.1: visit_type ต้องเป็น "OT"
    if (ovst.visit_type !== 'OT') return false
    if (!ovst.cur_dep) return false

    // E.1.2: ตรวจ ot_service_pay
    const dept = await trx.from('kskdepartment')
      .where('depcode', ovst.cur_dep)
      .select('ot_service_pay', 'ot_service_icode')
      .first()

    if (!dept || dept.ot_service_pay !== 'Y') return false

    const otIcode = dept.ot_service_icode || ''
    if (!otIcode) return false

    // E.1.3: ตรวจ depcode_service_charge flag
    const vpCount = await trx.from('visit_pttype')
      .where('vn', params.vn)
      .where('depcode_service_charge', 'Y')
      .select(trx.raw('count(*) as cc'))
      .first()

    if (Number(vpCount?.cc) === 0) return false

    // E.1.4: ตรวจ no_multiple_charge
    const noMultipleCharge = await this.checkNoMultipleCharge(
      params.hospitalDepartmentId, trx
    )

    if (noMultipleCharge) {
      const dupCount = await this.countOpitemreceByDate(
        params.hn, ovst.vstdate, otIcode, trx
      )
      if (dupCount > 0) return false
    }

    // E.1.5: ตรวจ s_drugitems
    const sdrugCount = await trx.from('s_drugitems')
      .where('icode', otIcode)
      .select(trx.raw('count(*) as cc'))
      .first()

    if (Number(sdrugCount?.cc) === 0) return false

    // E.1.6: ตรวจ opitemrece ซ้ำ
    const existingOpi = await trx.from('opitemrece')
      .where('vn', params.vn)
      .where('icode', otIcode)
      .first()

    if (existingOpi) return false

    // E.2: ดึง visit_pttype สิทธิ์หลัก
    const visitPttype = await trx.from('visit_pttype')
      .where('vn', params.vn)
      .where('pttype_number', 1)
      .first()

    const pttype = visitPttype?.pttype || ''

    // ดึงราคา
    const unitprice = await this.getPriceForPttype(pttype, otIcode, trx)
    const qty = 1

    // Discount
    const paidst = visitPttype?.paidst || ''
    const income = visitPttype?.income || ''

    const discount = await this.calculateDiscount(
      pttype, otIcode, income, qty, unitprice, trx
    )

    let sumPrice = this.calcSumPrice(qty, unitprice, discount)
    sumPrice = await this.applyRoundMoney(pttype, sumPrice, trx)

    const opiGuid = await GuidHelper.getNewGUID()
    const opitemreceId = await SerialHelper.getUniqueSerial(
      'opitemrece_id', 'opitemrece', 'opitemrece_id', trx
    )

    await trx.insertQuery().table('opitemrece').insert({
      opitemrece_id: opitemreceId,
      hos_guid: opiGuid,
      vn: params.vn,
      hn: params.hn,
      vstdate: ovst.vstdate,
      vsttime: ovst.vsttime,
      rxdate: ovst.vstdate,
      rxtime: ovst.vsttime,
      icode: otIcode,
      qty,
      unitprice,
      discount,
      sum_price: sumPrice,
      pttype,
      paidst,
      income,
      staff: params.loginUser,
      dep_code: params.computerDepcode,
      item_type: '2',
    })

    // E.3: AddChargeServiceWithCC — stub
    // TODO: implement AddChargeServiceWithCC
    //   ตรวจ nondrugitems.charge_service_opd == "Y" → charge ค่าบริการ CC
    //   เรียกแค่ OT edge case — เติมภายหลัง

    // E.4: Update visit_pttype flags
    await trx.from('visit_pttype')
      .where('vn', params.vn)
      .where('pttype_number', 1)
      .update({
        depcode_service_charge: 'Y',
        pttype_service_charge: 'Y',
      })

    return true
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section G: opd_dep_queue INSERT/UPDATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit
  //   SELECT * FROM opd_dep_queue WHERE vn=? AND depcode=cur_dep
  //   → ถ้าไม่มี: INSERT
  //   → ถ้ามี: UPDATE
  //

  private async upsertOpdDepQueue(
    params: DoSaveVisitParams,
    trx: TransactionClientContract
  ): Promise<number> {

    const ovst = await trx.from('ovst')
      .where('vn', params.vn)
      .select('cur_dep', 'vstdate')
      .first()

    const curDep = ovst?.cur_dep || ''
    if (!curDep) return 0

    const now = await this.getServerDateTime(trx)

    const existing = await trx.from('opd_dep_queue')
      .where('vn', params.vn)
      .where('depcode', curDep)
      .first()

    let queueId: number

    if (!existing) {
      // INSERT — generate unique opd_dep_queue_id
      queueId = await this.getUniqueOpdDepQueueId(trx)

      // day_queue_no
      const vstdateFmt = (ovst?.vstdate || params.vstdate).replace(/-/g, '')
      const dayQueueKey = `day_queue_no_${vstdateFmt}_${curDep}`
      const dayQueueNo = await SerialHelper.getSerialNumber(dayQueueKey, trx)

      await trx.insertQuery().table('opd_dep_queue').insert({
        opd_dep_queue_id: queueId,
        vn: params.vn,
        depcode: curDep,
        from_depcode: params.computerDepcode,
        queue_datetime: now,
        tx_status: '1',
        check_in: 'N',
        day_queue_no: dayQueueNo,
      })
    } else {
      queueId = existing.opd_dep_queue_id

      await trx.from('opd_dep_queue')
        .where('opd_dep_queue_id', queueId)
        .update({
          queue_datetime: now,
          from_depcode: params.computerDepcode,
        })
    }

    return queueId
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section H: patient.last_visit UPDATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit
  //   SELECT max(vstdate) FROM ovst WHERE hn=? AND vstdate <= today
  //   → UPDATE patient SET last_visit = ?
  //

  private async updatePatientLastVisit(
    hn: string,
    vstdate: string,
    trx: TransactionClientContract
  ): Promise<boolean> {

    const row = await trx.from('ovst')
      .where('hn', hn)
      .where('vstdate', '<=', trx.raw('CURDATE()'))
      .max('vstdate as max_vstdate')
      .first()

    const lastVisit = row?.max_vstdate
    if (!lastVisit) return false

    await trx.from('patient')
      .where('hn', hn)
      .update({ last_visit: lastVisit })

    return true
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section J: ovst_seq enrich
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit
  //   ovst_seq.register_depcode  = fcomputerdepcode (if empty)
  //   ovst_seq.register_computer = fcomputername    (if empty)
  //   ovst_seq.has_arrear        = check patient_arrear
  //   ovst_seq.hospital_department_id = fhospitalDepartmentID (if 0)
  //

  private async enrichOvstSeq(
    params: DoSaveVisitParams,
    trx: TransactionClientContract
  ): Promise<void> {

    const seq = await trx.from('ovst_seq')
      .where('vn', params.vn)
      .first()

    if (!seq) return

    const update: Record<string, any> = {}

    // register_depcode
    if (!seq.register_depcode || seq.register_depcode.trim() === '') {
      update.register_depcode = params.computerDepcode
    }

    // register_computer
    if (!seq.register_computer || seq.register_computer.trim() === '') {
      update.register_computer = params.computerName
    }

    // has_arrear calculation
    const arrearRow = await trx.rawQuery(`
      SELECT COALESCE(SUM(p1.amount), 0) as total
      FROM patient_arrear_detail p1
      INNER JOIN patient_arrear p2
        ON p2.patient_arrear_id = p1.patient_arrear_id
      WHERE p2.hn = ?
        AND p1.status_ok = 'N'
    `, [params.hn])

    const arrearTotal = Number(arrearRow[0]?.[0]?.total ?? arrearRow[0]?.total ?? 0)
    update.has_arrear = arrearTotal > 0 ? 'Y' : 'N'

    // hospital_department_id
    if (!seq.hospital_department_id || seq.hospital_department_id === 0) {
      update.hospital_department_id = params.hospitalDepartmentId
    }

    if (Object.keys(update).length > 0) {
      await trx.from('ovst_seq').where('vn', params.vn).update(update)
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Section K: vn_stat INSERT/UPDATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: DoSaveVisit
  //   SELECT * FROM vn_stat WHERE vn = ?
  //   → IF empty: INSERT  ELSE: UPDATE
  //   vn_stat.vn = vn
  //   vn_stat.hn = hn
  //

  private async upsertVnStat(
    vn: string,
    hn: string,
    trx: TransactionClientContract
  ): Promise<boolean> {

    const existing = await trx.from('vn_stat')
      .where('vn', vn)
      .first()

    if (!existing) {
      await trx.insertQuery().table('vn_stat').insert({
        vn,
        hn,
      })
      return true
    } else {
      await trx.from('vn_stat').where('vn', vn).update({ hn })
      return false
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  HELPERS: Discount + Price
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /**
   * D.5.7 / E — Discount calculation
   *
   * Source: DoSaveVisit
   *   1. pttype_price_policy_type_id > 0 → GetPttypeItemsDiscountPercent
   *   2. ถ้ายังไม่ได้ → income_discount (pttype + income + department="OPD")
   *   3. discount = qty * unitprice * percent / 100
   */
  private async calculateDiscount(
    pttype: string,
    icode: string,
    income: string,
    qty: number,
    unitprice: number,
    trx: TransactionClientContract
  ): Promise<number> {

    let discountPercent = -1

    // Try 1: pttype_price_policy
    const pttypeRow = await trx.from('pttype')
      .where('pttype', pttype)
      .select('pttype_price_policy_type_id')
      .first()

    if (pttypeRow && Number(pttypeRow.pttype_price_policy_type_id) > 0) {
      // simplified: ดึง discount จาก pttype_price_policy
      // ต้นฉบับเรียก GetPttypeItemsDiscountPercent(pttype, "drugitems", icode)
      // → ตรงนี้ simplified เป็น query ตรง
      const policyDiscount = await this.getPttypePolicyDiscount(
        pttype, icode, Number(pttypeRow.pttype_price_policy_type_id), trx
      )
      if (policyDiscount >= 0) {
        discountPercent = policyDiscount
      }
    }

    // Try 2: income_discount
    if (discountPercent < 0 && income) {
      const incRow = await trx.from('income_discount')
        .where('pttype', pttype)
        .where('income', income)
        .where('department', 'OPD')
        .select('discount')
        .first()

      if (incRow) {
        discountPercent = Number(incRow.discount) || 0
      }
    }

    // Apply discount
    if (discountPercent > 0) {
      return this.roundMoney(qty * unitprice * discountPercent / 100)
    }

    return 0
  }

  /**
   * Simplified pttype_price_policy discount lookup
   */
  private async getPttypePolicyDiscount(
    pttype: string,
    _icode: string,
    _policyTypeId: number,
    trx: TransactionClientContract
  ): Promise<number> {

    // TODO: full implementation ของ GetPttypeItemsDiscountPercent
    //   ต้นฉบับเรียก ApplicationDM.GetPttypeItemsDiscountPercent(pttype, "drugitems", icode)
    //   ซึ่งอ้าง pttype_price_policy_type + drugitems/nondrugitems
    //
    // Simplified: ดึง discount จาก income_discount แทน
    // Return -1 = ไม่เจอ, ให้ fallback ไป Try 2

    void pttype
    return -1
  }

  /**
   * E.2 — ดึงราคาสำหรับ pttype
   *
   * Source: CheckAndGetPriceForPTTYPE(pttype, icode)
   *   → ดึงจาก drugitems/nondrugitems ตาม pttype price policy
   *   → return price (คูณ 10000 ใน Delphi → หาร 10000 กลับ)
   */
  private async getPriceForPttype(
    pttype: string,
    icode: string,
    trx: TransactionClientContract
  ): Promise<number> {

    // ลองดึงจาก nondrugitems ก่อน (OT icode มักเป็น non-drug)
    const ndRow = await trx.from('nondrugitems')
      .where('icode', icode)
      .select('unitprice')
      .first()

    if (ndRow && Number(ndRow.unitprice) > 0) {
      return Number(ndRow.unitprice)
    }

    // fallback: drugitems
    const dRow = await trx.from('drugitems')
      .where('icode', icode)
      .select('unitprice')
      .first()

    if (dRow && Number(dRow.unitprice) > 0) {
      return Number(dRow.unitprice)
    }

    void pttype
    return 0
  }

  /**
   * D.5.8 — Calculate sum_price
   *   sum_price = (qty * unitprice) - discount
   */
  private calcSumPrice(qty: number, unitprice: number, discount: number): number {
    const gross = qty * unitprice
    return this.roundMoney(gross - discount)
  }

  /**
   * D.5.9 — Apply round_money from pttype
   *
   * Source: SELECT round_money FROM pttype WHERE pttype = ?
   *   → ถ้า == "Y" → RoundMoney(sum_price)
   */
  private async applyRoundMoney(
    pttype: string,
    sumPrice: number,
    trx: TransactionClientContract
  ): Promise<number> {

    const row = await trx.from('pttype')
      .where('pttype', pttype)
      .select('round_money')
      .first()

    if (row?.round_money === 'Y') {
      return this.roundMoney(sumPrice)
    }

    return sumPrice
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  HELPERS: Checks + Serial
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /**
   * ตรวจ hospital_department.no_multiple_charge
   */
  private async checkNoMultipleCharge(
    hospitalDepartmentId: number,
    trx: TransactionClientContract
  ): Promise<boolean> {

    if (hospitalDepartmentId <= 0) return false

    const row = await trx.from('hospital_department')
      .where('id', hospitalDepartmentId)
      .select('no_multiple_charge')
      .first()

    return row?.no_multiple_charge === 'Y'
  }

  /**
   * นับ opitemrece ที่มีอยู่แล้วใน vn อื่น (same hn + vstdate + icode)
   */
  private async countOpitemreceByDate(
    hn: string,
    vstdate: string,
    icode: string,
    trx: TransactionClientContract
  ): Promise<number> {

    const row = await trx.from('opitemrece')
      .where('hn', hn)
      .where('vstdate', vstdate)
      .where('icode', icode)
      .select(trx.raw('count(*) as cc'))
      .first()

    return Number(row?.cc) || 0
  }

  /**
   * Generate unique visit_pttype_charge_id
   */
  private async getUniqueVisitPttypeChargeId(
    trx: TransactionClientContract
  ): Promise<number> {

    for (let attempt = 0; attempt < 100; attempt++) {
      const id = await SerialHelper.getSerialNumber('visit_pttype_charge_id', trx)

      const dup = await trx.from('visit_pttype_charge')
        .where('visit_pttype_charge_id', id)
        .select(trx.raw('count(*) as cc'))
        .first()

      if (!dup || Number(dup.cc) === 0) return id
    }

    throw new Error('Failed to generate unique visit_pttype_charge_id after 100 attempts')
  }

  /**
   * Generate unique opd_dep_queue_id
   */
  private async getUniqueOpdDepQueueId(
    trx: TransactionClientContract
  ): Promise<number> {

    for (let attempt = 0; attempt < 100; attempt++) {
      const id = await SerialHelper.getSerialNumber('opd_dep_queue_id', trx)

      const dup = await trx.from('opd_dep_queue')
        .where('opd_dep_queue_id', id)
        .select(trx.raw('count(*) as cc'))
        .first()

      if (!dup || Number(dup.cc) === 0) return id
    }

    throw new Error('Failed to generate unique opd_dep_queue_id after 100 attempts')
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  UTILS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /**
   * GetServerDateTime → SELECT NOW()
   */
  private async getServerDateTime(
    trx: TransactionClientContract
  ): Promise<string> {

    const row = await trx.rawQuery('SELECT NOW() as now')
    return row[0]?.[0]?.now || row[0]?.now || new Date().toISOString()
  }

  /**
   * RoundMoney — ปัดเศษเงิน
   *
   * Source: @Hosxpdmu@RoundMoney$qqr15System@Currency
   *   HOSxP ใช้ Currency type (4 decimal) + round
   *   simplified: round to 2 decimal places
   */
  private roundMoney(amount: number): number {
    return Math.round(amount * 100) / 100
  }
}