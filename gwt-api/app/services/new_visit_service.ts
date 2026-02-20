import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import db from '@adonisjs/lucid/services/db'
import { createHash } from 'node:crypto'
//import SerialHelper from '#services/shared/serial_helper'
import GuidHelper from '#services/shared/guid_helper'
import ThaiDateHelper from '#services/shared/thai_date_helper'
import LabAdvanceOrderService from '#services/lab/lab_advance_order_service'
import SerialHelper from '#services/shared/serial_helper'
//import LabAdvanceOrderService from '#services/lab/lab_advance_order_service'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** พารามิเตอร์สำหรับ Phase 1 — Validate + ตรวจซ้ำ */
export interface ValidateVisitParams {
  hn: string
  vstdate: string                     // yyyy-MM-dd
  vsttime?: string                    // HH:mm:ss (ไม่ส่ง = server time)
  loginUser: string
}

/** ผลลัพธ์ Phase 1 — ถ้าต้อง confirm */
export interface VisitValidationResult {
  ok: boolean
  warnings: string[]
  needConfirm?: {
    type: 'same_day_visit' | 'status_not_ok'
    message: string
    existingVisits?: SameDayVisitRow[]
  }
  patientInfo?: PatientInfoRow
}

/** พารามิเตอร์สำหรับ Phase 2-4 — สร้าง Visit จริง */
export interface CreateVisitParams {
  hn: string
  vstdate: string
  vsttime?: string
  loginUser: string
  pttypeRecords?: PttypeRecord[]      // สิทธิ์ที่ user เลือก
  hipRecords?: HipRecord[]            // สิทธิ์ HIP (บัตรทอง ฯลฯ)
  computerDepcode?: string            // แผนกของเครื่อง (สำหรับ lab ล่วงหน้า)
  computerName?: string               // ชื่อเครื่อง
  hospitalDepartmentId?: number       // รหัสแผนก
  hospitalCode?: string               // รหัส รพ. (สำหรับ ovst_key)
}

/** ผลลัพธ์สำเร็จ */
export interface CreateVisitResult {
  vn: string
  hn: string
  vstdate: string
  vsttime: string
  ovstId: number
  hosGuid: string
  warnings: string[]
  labOrdersCreated?: number           // จำนวน lab order ที่ copy จากนัดหมาย
}

/** สิทธิ์ผู้ป่วย — patient_pttype / visit_pttype */
export interface PttypeRecord {
  pttype: string
  pttypeno?: string
  hospmain?: string
  hospsub?: string
  begin_date?: string | null
  expire_date?: string | null
  max_debt_amount?: number
  emp_id?: number
  pttype_note?: string
  status?: string                     // 'Y' = active
}

/** สิทธิ์ HIP — บัตรทอง, ประกันสังคม ฯลฯ */
export interface HipRecord {
  pttype: string
  cardid?: string                     // ⚠️ → pttypeno
  hospmain?: string
  hospsub?: string
  datein?: string | null              // ⚠️ → begin_date
  dateexp?: string | null             // ⚠️ → expire_date
  status?: string
}

/** row จาก patient */
interface PatientInfoRow {
  hn: string
  pname: string
  fname: string
  lname: string
  birthday: string | null
  death: string | null
  status_ok: string | null
}

/** row จาก ovst สำหรับ same-day check */
interface SameDayVisitRow {
  vn: string
  vstdate: string
  vsttime: string
  cur_dep?: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NewVisitService
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Source: Decompiled NewVisitButtonClick (27 steps / 4 phases)
//
// Phase 1: VALIDATION   (Steps 1-7)   ← validateVisit()
// Phase 2: VN GEN       (Step 8)      ← generateAndLockVN()
// Phase 3: INSERT        (Steps 9-16) ← insertVisitRecords()
// Phase 4: PTTYPE + FIN  (Steps 17-27)← processPttype + applyOapp
//
// ตาราง:
//   patient, ovst, ovst_seq, vn_lock,
//   visit_pttype, patient_pttype,
//   opd_dep_queue, opd_visit_limit,
//   opdscreen, opd_allergy,
//   oapp, ovstist, serial_number,
//   visit_type, hospital_department
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default class NewVisitService {

  // ╔════════════════════════════════════════════════════╗
  // ║  PUBLIC: validateVisit  (Phase 1 — Steps 1-7)     ║
  // ╚════════════════════════════════════════════════════╝
  //
  // เรียกจาก frontend ก่อน createVisit
  //
  // ถ้า ok=true + ไม่มี needConfirm → เรียก createVisit ได้เลย
  // ถ้ามี needConfirm → แสดง confirm dialog ก่อน
  //

  public async validateVisit(
    params: ValidateVisitParams
  ): Promise<VisitValidationResult> {
    const { hn, vstdate } = params
    const warnings: string[] = []

    // ── Step 1: Validate HN format ────────────────────
    //
    // Equivalent: validhncode(hn) — client-side
    // HOSxP ใช้ check digit algorithm
    //
    if (!hn || hn.trim().length === 0) {
      return { ok: false, warnings: ['กรุณาระบุ HN'] }
    }

    // ── Step 2: Death check ───────────────────────────
    //
    // SELECT count(*) FROM patient WHERE hn=? AND death='Y'
    // → > 0 → "Patient death !!!"
    //
    const deathRow = await db.from('patient')
      .where('hn', hn)
      .where('death', 'Y')
      .count('* as cc')
      .first()

    if (deathRow && Number(deathRow.cc) > 0) {
      return { ok: false, warnings: ['Patient death !!!'] }
    }

    // ── Step 3: Patient exists ────────────────────────
    //
    // SELECT count(*) FROM patient WHERE hn=?
    // → 0 → "ไม่พบข้อมูลผู้ป่วย"
    //
    const patientRow = await db.from('patient')
      .where('hn', hn)
      .select('hn', 'pname', 'fname', 'lname', 'birthday', 'death', 'status_ok')
      .first()

    if (!patientRow) {
      return { ok: false, warnings: [`ไม่พบข้อมูลผู้ป่วย HN: ${hn}`] }
    }

    // ── Step 4: Prename & age check ───────────────────
    //
    // Equivalent: DoCheckPreNameAndAge
    // ตรวจ prename ว่าง / อายุไม่สมเหตุผล
    //
    if (!patientRow.pname || patientRow.pname.trim() === '') {
      warnings.push('ผู้ป่วยไม่มีคำนำหน้าชื่อ')
    }

    // ── Step 5: Future visit check ────────────────────
    //
    // SELECT vstdate, vsttime, cur_dep FROM ovst
    // WHERE hn=? AND vstdate > ?
    //
    const futureVisits = await db.from('ovst')
      .where('hn', hn)
      .where('vstdate', '>', vstdate)
      .select('vn', 'vstdate', 'vsttime', 'cur_dep')
      .orderBy('vstdate', 'asc')

    if (futureVisits.length > 0) {
      warnings.push(
        `ผู้ป่วยมี visit หลังวันที่เลือก ${futureVisits.length} รายการ`
      )
    }

    // ── Step 6: Same-day visit check ──────────────────
    //
    // SELECT * FROM ovst WHERE hn=? AND vstdate=?
    // → > 0 → ถามว่าจะเลือก visit เดิมหรือสร้างใหม่
    //
    const sameDayVisits = await db.from('ovst')
      .where('hn', hn)
      .where('vstdate', vstdate)
      .select('vn', 'vstdate', 'vsttime', 'cur_dep')
      .orderBy('vsttime', 'desc')

    if (sameDayVisits.length > 0) {
      return {
        ok: true,
        warnings,
        needConfirm: {
          type: 'same_day_visit',
          message: `ผู้ป่วยมี visit วันเดียวกัน ${sameDayVisits.length} รายการ ต้องการสร้างใหม่หรือไม่?`,
          existingVisits: sameDayVisits,
        },
        patientInfo: patientRow,
      }
    }

    // ── Step 7: status_ok check ───────────────────────
    //
    // SELECT count(*) FROM patient WHERE hn=? AND status_ok='N'
    //
    if (patientRow.status_ok === 'N') {
      return {
        ok: true,
        warnings,
        needConfirm: {
          type: 'status_not_ok',
          message: 'ข้อมูลผู้ป่วยยังไม่สมบูรณ์ (status_ok = N) ต้องการดำเนินการต่อหรือไม่?',
        },
        patientInfo: patientRow,
      }
    }

    // ── ผ่าน validation ทั้งหมด ────────────────────────
    return {
      ok: true,
      warnings,
      patientInfo: patientRow,
    }
  }

  // ╔════════════════════════════════════════════════════╗
  // ║  PUBLIC: createVisit  (Phase 2-4 — Steps 8-27)   ║
  // ╚════════════════════════════════════════════════════╝
  //
  // เรียกหลัง validateVisit ผ่านแล้ว + user confirm แล้ว
  //
  // ทุกอย่างอยู่ใน transaction
  //

  public async createVisit(
    params: CreateVisitParams
  ): Promise<CreateVisitResult> {
    const warnings: string[] = []
    const vsttime = params.vsttime || ThaiDateHelper.toMySQLTime()

    const trx = await db.transaction()

    try {
      // ═══════════════════════════════════════════════════
      // Phase 2: VN GENERATION (Step 8)
      // ═══════════════════════════════════════════════════

      const { vn, finalVsttime } = await this.generateAndLockVN(
        params.vstdate, vsttime, trx
      )

      // ═══════════════════════════════════════════════════
      // Phase 3: INSERT RECORDS (Steps 9-16)
      // ═══════════════════════════════════════════════════

      const { ovstId, hosGuid } = await this.insertVisitRecords(
        params.hn, vn, params.vstdate, finalVsttime,
        params.loginUser, params.hospitalCode || '',
        params.hospitalDepartmentId || 0, trx
      )

      // ═══════════════════════════════════════════════════
      // Phase 4: PTTYPE + FINALIZE (Steps 17-27)
      // ═══════════════════════════════════════════════════

      // ── Step 13b: INSERT opdscreen ──────────────────
      //
      // Source: OPDScreenCDSNewRecord
      //
      // Auto-populate: hos_guid, height (ล่าสุด),
      //   waist (ล่าสุด), g6pd, found_allergy
      //
      await this.insertOpdscreen(params.hn, vn, hosGuid, trx)

      // ── Steps 17-20: สิทธิ์ผู้ป่วย → visit_pttype ────
      await this.processAllPttypeRecords(
        vn, params.hn, params.loginUser,
        params.pttypeRecords || [],
        params.hipRecords || [],
        trx
      )

      // ── Steps 24-27: นัดหมาย → ovst update ──────────
      await this.applyAppointmentData(
        params.hn, vn, params.vstdate, trx
      )

      // ── Step 24b: Lab ล่วงหน้า → lab order จริง ──────
      //
      // Source: DoCreateLabOrderFromLabAppointment
      //
      // ค้น lab_app_head ที่ hn + nextdate ตรงกับ visit
      // แล้ว copy → lab_head + lab_order + lab_order_service
      //
      const labService = new LabAdvanceOrderService()
      const labResults = await labService.processLabAppointmentsForVisit(
        params.hn, vn, params.vstdate,
        {
          computerDepcode: params.computerDepcode,
          computerName: params.computerName,
          hospitalDepartmentId: params.hospitalDepartmentId,
        },
        trx
      )

      const labOrdersCreated = labResults.length

      await trx.commit()

      return {
        vn,
        hn: params.hn,
        vstdate: params.vstdate,
        vsttime: finalVsttime,
        ovstId,
        hosGuid,
        warnings,
        labOrdersCreated,
      }
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  // ╔════════════════════════════════════════════════════╗
  // ║  PUBLIC: useExistingVisit                          ║
  // ╚════════════════════════════════════════════════════╝
  //
  // Step 6 → user เลือก visit เดิม → ไม่สร้างใหม่
  //

  public async useExistingVisit(vn: string): Promise<CreateVisitResult> {
    const visit = await db.from('ovst')
      .where('vn', vn)
      .first()

    if (!visit) {
      throw new Error(`ไม่พบ visit vn: ${vn}`)
    }

    return {
      vn: visit.vn,
      hn: visit.hn,
      vstdate: visit.vstdate,
      vsttime: visit.vsttime,
      ovstId: visit.ovst_id,
      hosGuid: visit.hos_guid,
      warnings: [],
    }
  }

  // ╔════════════════════════════════════════════════════╗
  // ║  PUBLIC: getPatientPttypes                         ║
  // ╚════════════════════════════════════════════════════╝
  //
  // Step 17: ดึงรายการสิทธิ์จาก patient_pttype
  // สำหรับ frontend แสดง PatientVisitPttypeSelectForm
  //

  public async getPatientPttypes(hn: string): Promise<PttypeRecord[]> {
    const rows = await db.from('patient_pttype as pp')
      .leftJoin('pttype as pt', 'pp.pttype', 'pt.pttype')
      .where('pp.hn', hn)
      .select(
        'pp.pttype',
        'pp.pttypeno',
        'pp.hospmain',
        'pp.hospsub',
        'pp.begin_date',
        'pp.expire_date',
        'pp.max_debt_amount',
        'pp.emp_id',
        'pp.pttype_note',
        'pt.name as pttype_name'
      )

    return rows.map((r) => ({ ...r, status: 'Y' }))
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: Phase 2 — generateAndLockVN (Step 8)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Loop:
  //   8.1 thaiDateStr = FormatThaiDate("eemmddhhnnss", datetime)
  //       serialKey = "vst_second_" + thaiDateStr
  //       vn = GetSerialNumber(serialKey)
  //
  //   8.2 SELECT count(*) FROM vn_lock WHERE vn=?
  //       → > 0 → IncSecond → continue
  //
  //   8.3 SELECT count(*) FROM ovst WHERE vn=?
  //       → > 0 → IncSecond → continue
  //
  //   8.4 SELECT count(*) FROM oqueue WHERE vn=?
  //       → > 0 → IncSecond → continue
  //
  //   8.5 RequestLockVN → INSERT vn_lock
  //       → fail → IncSecond → continue
  //       → success → break
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async generateAndLockVN(
    vstdate: string,
    vsttime: string,
    trx: TransactionClientContract
  ): Promise<{ vn: string; finalVsttime: string }> {

    const MAX_ATTEMPTS = 100
    let currentTime = vsttime
    let vn = ''

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {

      // ── 8.1: คำนวณ VN ────────────────────────────────
      const thaiDateStr = ThaiDateHelper.formatThaiDate(
        'eemmddhhnnss', vstdate, currentTime
      )
      const serialKey = `vst_second_${thaiDateStr}`
      vn = await String(SerialHelper.getSerialNumber(serialKey, trx))

      // ── 8.2: ตรวจ vn_lock ────────────────────────────
      const vnLockRow = await trx.from('vn_lock')
        .where('vn', vn)
        .count('* as cc')
        .first()

      if (vnLockRow && Number(vnLockRow.cc) > 0) {
        currentTime = this.addSeconds(currentTime, 1)
        continue
      }

      // ── 8.3: ตรวจ ovst ───────────────────────────────
      const ovstRow = await trx.from('ovst')
        .where('vn', vn)
        .count('* as cc')
        .first()

      if (ovstRow && Number(ovstRow.cc) > 0) {
        currentTime = this.addSeconds(currentTime, 1)
        continue
      }

      // ── 8.4: ตรวจ oqueue ─────────────────────────────
      const oqueueRow = await trx.from('oqueue')
        .where('vn', vn)
        .count('* as cc')
        .first()

      if (oqueueRow && Number(oqueueRow.cc) > 0) {
        currentTime = this.addSeconds(currentTime, 1)
        continue
      }

      // ── 8.5: Lock VN ────────────────────────────────
      const locked = await this.requestLockVN(vn, trx)
      if (!locked) {
        currentTime = this.addSeconds(currentTime, 1)
        continue
      }

      return { vn, finalVsttime: currentTime }
    }

    throw new Error(`ไม่สามารถสร้าง VN ได้หลังจากลอง ${MAX_ATTEMPTS} ครั้ง`)
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: Step 8.5 — requestLockVN
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // INSERT INTO vn_lock (vn, lock_datetime) VALUES (?, NOW())
  // ถ้า duplicate key → return false
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async requestLockVN(
    vn: string,
    trx: TransactionClientContract
  ): Promise<boolean> {
    try {
      await trx.insertQuery().table('vn_lock').insert({
        vn,
        lock_datetime: trx.raw('NOW()'),
      })
      return true
    } catch {
      return false
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: Phase 3 — insertVisitRecords (Steps 9-16)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Step 9:  SELECT * FROM ovst WHERE vn=?
  // Step 10: DELETE FROM opd_dep_queue WHERE vn=?
  // Step 13.0: Resolve visit_type + pt_subtype
  // Step 13: INSERT ovst + ovst_seq
  // Step 13b: INSERT opdscreen (height, waist, g6pd, allergy)
  // Step 15: DELETE FROM opd_visit_limit WHERE vn=?
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async insertVisitRecords(
    hn: string,
    vn: string,
    vstdate: string,
    vsttime: string,
    loginUser: string,
    hospitalCode: string,
    hospitalDepartmentId: number,
    trx: TransactionClientContract
  ): Promise<{ ovstId: number; hosGuid: string }> {

    // ── Step 9: ตรวจ ovst เดิม ─────────────────────────
    const existingOvst = await trx.from('ovst')
      .where('vn', vn)
      .first()

    if (existingOvst) {
      return {
        ovstId: existingOvst.ovst_id,
        hosGuid: existingOvst.hos_guid,
      }
    }

    // ── Step 10: Cleanup opd_dep_queue ─────────────────
    //
    // SELECT count(*) FROM opd_dep_queue WHERE vn=?
    // → > 0 → DELETE FROM opd_dep_queue WHERE vn=?
    //
    await trx.from('opd_dep_queue').where('vn', vn).delete()

    // ── Step 13.0: Resolve visit_type + pt_subtype ─────
    //
    // Source: OvstCDSNewRecord
    //
    // visit_type: SELECT * FROM visit_type ORDER BY time_range_begin
    //   loop: time_range_begin <= vsttime <= time_range_end → visit_type
    //
    // pt_subtype: SELECT pt_subtype FROM hospital_department
    //   WHERE id = hospitalDepartmentId
    //
    let visitType = ''
    const visitTypes = await trx.from('visit_type')
      .orderBy('time_range_begin', 'asc')

    for (const vt of visitTypes) {
      if (vsttime >= vt.time_range_begin && vsttime <= vt.time_range_end) {
        visitType = vt.visit_type
        break
      }
    }

    let ptSubtype = 0
    if (hospitalDepartmentId > 0) {
      const hd = await trx.from('hospital_department')
        .where('id', hospitalDepartmentId)
        .select('pt_subtype')
        .first()
      if (hd) {
        ptSubtype = Number(hd.pt_subtype) || 0
      }
    }

    // ── Step 13.1: INSERT ovst ─────────────────────────
    //
    // ovst_id = CheckSerialPKForDataSet("ovst_id", "ovst")
    // hos_guid = GetNewGUID()
    //
    // From OvstCDSBeforePost:
    //   pt_priority  = "0" (default)
    //   staff        = flgn (login user)
    //   main_dep     = cur_dep (if empty)
    //   ovst_key     = GetOvstKeyMD5(hospitalcode, vn)
    //
    // From OvstCDSNewRecord:
    //   visit_type      = จาก visit_type table (time range match)
    //   anonymous_visit = 'N'
    //   pt_subtype      = จาก hospital_department
    //   at_hospital     = 'Y'
    //
    const ovstId = await SerialHelper.getUniqueSerial(
      'ovst_id', 'ovst', 'ovst_id', trx
    )
    const hosGuid = await GuidHelper.getNewGUID()
    const ovstKey = this.generateOvstKeyMD5(hospitalCode, vn)

    await trx.insertQuery().table('ovst').insert({
      ovst_id: ovstId,
      hn,
      vn,
      vstdate,
      vsttime,
      hos_guid: hosGuid,
      pt_priority: '0',
      staff: loginUser,
      ovst_key: ovstKey,
      visit_type: visitType,
      anonymous_visit: 'N',
      pt_subtype: ptSubtype,
      at_hospital: 'Y',
    })

    // ── Step 13.2: INSERT ovst_seq ─────────────────────
    const existingSeq = await trx.from('ovst_seq')
      .where('vn', vn)
      .first()

    if (!existingSeq) {
      await trx.insertQuery().table('ovst_seq').insert({ vn })
    }

    // ── Step 15: DELETE opd_visit_limit ─────────────────
    await trx.from('opd_visit_limit').where('vn', vn).delete()

    return { ovstId, hosGuid }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: Step 13b — insertOpdscreen
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: OPDScreenCDSNewRecord
  //
  // 1. hos_guid = GetNewGUID()
  //
  // 2. ถ้า validhncode(hn):
  //
  //    SELECT height FROM opdscreen
  //    WHERE hn=? AND height>0 AND vn<>?
  //    ORDER BY vstdate DESC LIMIT 1
  //    → set opdscreen.height
  //
  //    SELECT waist FROM opdscreen
  //    WHERE hn=? AND waist>0 AND vn<>?
  //    ORDER BY vstdate DESC LIMIT 1
  //    → set opdscreen.waist
  //
  //    SELECT count(*) FROM patient
  //    WHERE hn=? AND g6pd='Y'
  //    → > 0 → set opdscreen.g6pd = 'Y'
  //
  //    SELECT count(*) FROM opd_allergy
  //    WHERE hn=?
  //    → > 0 → set opdscreen.found_allergy = 'Y'
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async insertOpdscreen(
    hn: string,
    vn: string,
    hosGuid: string,
    trx: TransactionClientContract
  ): Promise<void> {

    const row: Record<string, any> = {
      vn,
      hn,
      hos_guid: hosGuid,
    }

    // ── ดึง height ล่าสุด ─────────────────────────────
    //
    // SELECT height FROM opdscreen
    // WHERE hn=? AND height>0 AND vn<>?
    // ORDER BY vstdate DESC LIMIT 1
    //
    const lastHeight = await trx.from('opdscreen')
      .where('hn', hn)
      .where('height', '>', 0)
      .whereNot('vn', vn)
      .orderBy('vstdate', 'desc')
      .select('height')
      .limit(1)
      .first()

    if (lastHeight) {
      row.height = lastHeight.height
    }

    // ── ดึง waist ล่าสุด ──────────────────────────────
    //
    // SELECT waist FROM opdscreen
    // WHERE hn=? AND waist>0 AND vn<>?
    // ORDER BY vstdate DESC LIMIT 1
    //
    const lastWaist = await trx.from('opdscreen')
      .where('hn', hn)
      .where('waist', '>', 0)
      .whereNot('vn', vn)
      .orderBy('vstdate', 'desc')
      .select('waist')
      .limit(1)
      .first()

    if (lastWaist) {
      row.waist = lastWaist.waist
    }

    // ── ตรวจ g6pd ─────────────────────────────────────
    //
    // SELECT count(*) FROM patient WHERE hn=? AND g6pd='Y'
    // → > 0 → 'Y'
    //
    const g6pdCheck = await trx.from('patient')
      .where('hn', hn)
      .where('g6pd', 'Y')
      .count('* as cc')
      .first()

    if (g6pdCheck && Number(g6pdCheck.cc) > 0) {
      row.g6pd = 'Y'
    }

    // ── ตรวจ allergy ──────────────────────────────────
    //
    // SELECT count(*) FROM opd_allergy WHERE hn=?
    // → > 0 → 'Y'
    //
    const allergyCheck = await trx.from('opd_allergy')
      .where('hn', hn)
      .count('* as cc')
      .first()

    if (allergyCheck && Number(allergyCheck.cc) > 0) {
      row.found_allergy = 'Y'
    }

    // ── INSERT opdscreen ──────────────────────────────
    await trx.insertQuery().table('opdscreen').insert(row)
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: Steps 17-20 — processAllPttypeRecords
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // 3 รอบ upsert เข้า visit_pttype:
  //
  // Step 18: PatientPttypeCDS → visit_pttype
  // Step 19: VisitPttypeCDS   → visit_pttype (เหมือน 18)
  // Step 20: HipDataCDS       → visit_pttype
  //   ⚠️ cardid→pttypeno, datein→begin_date, dateexp→expire_date
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async processAllPttypeRecords(
    vn: string,
    hn: string,
    loginUser: string,
    pttypeRecords: PttypeRecord[],
    hipRecords: HipRecord[],
    trx: TransactionClientContract
  ): Promise<void> {

    // ── Step 17: ดึงจาก patient_pttype ถ้าไม่ส่งมา ────
    let records = pttypeRecords
    if (records.length === 0) {
      records = await trx.from('patient_pttype')
        .where('hn', hn)
        .select(
          'pttype', 'pttypeno', 'hospmain', 'hospsub',
          'begin_date', 'expire_date', 'max_debt_amount',
          'emp_id', 'pttype_note'
        )
    }

    const serverDatetime = ThaiDateHelper.toMySQLDatetime()

    // ── Step 18-19: PttypeRecord[] → visit_pttype ─────
    for (const rec of records) {
      if (rec.status && rec.status !== 'Y') continue

      await this.upsertVisitPttype(vn, {
        pttype: rec.pttype,
        pttypeno: rec.pttypeno || '',
        hospmain: rec.hospmain || '',
        hospsub: rec.hospsub || '',
        begin_date: rec.begin_date || null,
        expire_date: rec.expire_date || null,
        max_debt_amount: rec.max_debt_amount || 0,
        emp_id: rec.emp_id || null,
        pttype_note: rec.pttype_note || '',
        staff: loginUser,
        update_datetime: serverDatetime,
      }, trx)
    }

    // ── Step 20: HipRecord[] → visit_pttype ───────────
    //
    // ⚠️ Field mapping:
    //   cardid  → pttypeno
    //   datein  → begin_date
    //   dateexp → expire_date
    //
    for (const hip of hipRecords) {
      if (hip.status && hip.status !== 'Y') continue

      await this.upsertVisitPttype(vn, {
        pttype: hip.pttype,
        pttypeno: hip.cardid || '',
        hospmain: hip.hospmain || '',
        hospsub: hip.hospsub || '',
        begin_date: hip.datein || null,
        expire_date: hip.dateexp || null,
        max_debt_amount: 0,
        emp_id: null,
        pttype_note: '',
        staff: loginUser,
        update_datetime: serverDatetime,
      }, trx)
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: upsertVisitPttype
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Locate by (vn, pttype):
  //   → found → UPDATE
  //   → not found → INSERT
  //
  // Fields:
  //   vn, pttype, pttype_number=1, pttypeno,
  //   hospmain, hospsub, begin_date, expire_date,
  //   staff, max_debt_amount, emp_id, emp_privilege,
  //   pttype_note, update_datetime
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async upsertVisitPttype(
    vn: string,
    data: {
      pttype: string
      pttypeno: string
      hospmain: string
      hospsub: string
      begin_date: string | null
      expire_date: string | null
      max_debt_amount: number
      emp_id: number | null
      pttype_note: string
      staff: string
      update_datetime: string
    },
    trx: TransactionClientContract
  ): Promise<void> {

    const existing = await trx.from('visit_pttype')
      .where('vn', vn)
      .where('pttype', data.pttype)
      .first()

    const hasEmpId = data.emp_id !== null && data.emp_id > 0

    const row = {
      pttype_number: 1,
      pttypeno: data.pttypeno,
      hospmain: data.hospmain,
      hospsub: data.hospsub,
      begin_date: data.begin_date,
      expire_date: data.expire_date,
      staff: data.staff,
      max_debt_amount: data.max_debt_amount,
      emp_id: hasEmpId ? data.emp_id : null,
      emp_privilege: hasEmpId ? 'Y' : null,
      pttype_note: data.pttype_note,
      update_datetime: data.update_datetime,
    }

    if (existing) {
      await trx.from('visit_pttype')
        .where('vn', vn)
        .where('pttype', data.pttype)
        .update(row)
    } else {
      await trx.insertQuery().table('visit_pttype').insert({
        vn,
        pttype: data.pttype,
        ...row,
      })
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: Steps 24-27 — applyAppointmentData
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Step 24: SELECT * FROM oapp
  //          WHERE hn=? AND nextdate=?
  //            AND (oapp_status_id < 4 OR oapp_status_id IS NULL)
  //            AND (visit_vn IS NULL OR visit_vn='')
  //
  // Step 25: UPDATE ovst SET cur_dep=oapp.depcode
  // Step 26: UPDATE ovst SET spclty=oapp.spclty
  // Step 27: SELECT ovstist FROM ovstist WHERE export_code='2'
  //          → UPDATE ovst SET ovstist=?
  //          + UPDATE oapp SET visit_vn=?
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async applyAppointmentData(
    hn: string,
    vn: string,
    vstdate: string,
    trx: TransactionClientContract
  ): Promise<void> {

    // ── Step 24: ค้นนัดหมาย ───────────────────────────
    const appt = await trx.from('oapp')
      .where('hn', hn)
      .where('nextdate', vstdate)
      .where((q) => {
        q.where('oapp_status_id', '<', 4)
          .orWhereNull('oapp_status_id')
      })
      .where((q) => {
        q.whereNull('visit_vn')
          .orWhere('visit_vn', '')
      })
      .orderBy('oapp_id', 'desc')
      .first()

    if (!appt) return

    const ovstUpdate: Record<string, any> = {}

    // ── Step 25 ───────────────────────────────────────
    //
    // OvstCDSBeforePost: if main_dep is empty → main_dep = cur_dep
    // ดังนั้นเมื่อ set cur_dep จาก oapp ต้อง set main_dep ด้วย
    //
    if (appt.depcode && appt.depcode.trim() !== '') {
      ovstUpdate.cur_dep = appt.depcode
      ovstUpdate.main_dep = appt.depcode
    }

    // ── Step 26 ───────────────────────────────────────
    if (appt.spclty && appt.spclty.trim() !== '') {
      ovstUpdate.spclty = appt.spclty
    }

    // ── Step 27 ───────────────────────────────────────
    const ovstistRow = await trx.from('ovstist')
      .where('export_code', '2')
      .select('ovstist')
      .first()

    if (ovstistRow) {
      ovstUpdate.ovstist = ovstistRow.ovstist
    }

    // ── Apply ─────────────────────────────────────────
    if (Object.keys(ovstUpdate).length > 0) {
      await trx.from('ovst').where('vn', vn).update(ovstUpdate)
    }

    // ── Link oapp กลับ ────────────────────────────────
    await trx.from('oapp')
      .where('oapp_id', appt.oapp_id)
      .update({ visit_vn: vn })
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  UTILS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private addSeconds(time: string, seconds: number): string {
    const parts = time.split(':').map(Number)
    let totalSec = parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0) + seconds
    totalSec = ((totalSec % 86400) + 86400) % 86400
    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60
    return [
      h.toString().padStart(2, '0'),
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0'),
    ].join(':')
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  UTILS: generateOvstKeyMD5
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Source: @Bmsencryptionutil@GetOvstKeyMD5
  //   → UPPER(MD5(CONCAT('ovst:', hospitalcode, ':', vn)))
  //
  // Example: hospitalcode=11608, vn=681029063805
  //   → MD5('ovst:11608:681029063805') → uppercase
  //

  private generateOvstKeyMD5(hospitalCode: string, vn: string): string {
    return createHash('md5')
      .update(`ovst:${hospitalCode}:${vn}`)
      .digest('hex')
      .toUpperCase()
  }
}