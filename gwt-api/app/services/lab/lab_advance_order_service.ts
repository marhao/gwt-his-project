import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import db from '@adonisjs/lucid/services/db'
import SerialHelper from '#services/shared/serial_helper'

export interface CreateLabFromAppParams {
  labAppOrderNumber: number             // lab_app_head.lab_app_order_number
  vn: string                            // VN ของ visit ใหม่
  computerDepcode?: string              // แผนกของเครื่องที่ใช้ (fcomputerdepcode)
  computerName?: string                 // ชื่อเครื่อง (fcomputername)
  hospitalDepartmentId?: number         // รหัสแผนก (fhospitalDepartmentID)
}

export interface CreateLabFromAppResult {
  labOrderNumber: number                // lab_order_number ที่สร้างใหม่
  labHeadInserted: boolean
  labOrderCount: number                 // จำนวน lab_order ที่ copy มา
  labOrderServiceCount: number          // จำนวน lab_order_service ที่ copy มา
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LabAdvanceOrderService
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Source: Decompiled @Hosxpdmu@DoCreateLabOrderFromLabAppointment
//
// Flow:
//   1. Validate lab_app_head (confirm_order='Y')
//   2. Validate VN
//   3. SELECT lab_app_head, lab_app_order, lab_app_order_service
//   4. Copy lab_app_head → lab_head (สร้าง lab_order_number ใหม่)
//   5. Copy lab_app_order → lab_order (ใช้ lab_order_number ใหม่)
//   6. Copy lab_app_order_service → lab_order_service
//   7. เรียก DoSaveLab logic (charge + LIS track)
//   8. Update lab_head.order_department + hospital_department_id
//
// ตาราง READ:
//   lab_app_head           — ใบสั่ง lab ล่วงหน้า (header)
//   lab_app_order          — รายการ lab ล่วงหน้า (items)
//   lab_app_order_service  — รายการ service ล่วงหน้า
//
// ตาราง WRITE:
//   lab_head               — ใบสั่ง lab จริง (header)
//   lab_order              — รายการ lab จริง (items)
//   lab_order_service      — รายการ service จริง
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default class LabAdvanceOrderService {

  // ╔════════════════════════════════════════════════════╗
  // ║  PUBLIC: createLabOrderFromAppointment             ║
  // ╚════════════════════════════════════════════════════╝
  //
  // เรียกหลัง visit สร้างเสร็จ (หลัง Step 27)
  // เพื่อ copy lab สั่งล่วงหน้า → lab order จริง
  //

  public async createLabOrderFromAppointment(
    params: CreateLabFromAppParams,
    trx?: TransactionClientContract
  ): Promise<CreateLabFromAppResult | null> {
    if (!trx) {
      return db.transaction((newTrx) => this.createLabOrderFromAppointment(params, newTrx))
    }

    // ═══════════════════════════════════════════════════
    // Step 1: Validate lab_app_head (confirm_order='Y')
    // ═══════════════════════════════════════════════════
    //
    // SELECT count(*) as cc FROM lab_app_head
    // WHERE lab_app_order_number = ?
    //   AND confirm_order = "Y"
    //
    // → cc == 0 → ไม่มี order ที่ confirm แล้ว → skip
    //

    const confirmCheck = await trx.from('lab_app_head')
      .where('lab_app_order_number', params.labAppOrderNumber)
      .where('confirm_order', 'Y')
      .count('* as cc')
      .first()

    if (!confirmCheck || Number(confirmCheck.cc) === 0) {
      return null   // ไม่มี confirmed lab appointment
    }

    // ═══════════════════════════════════════════════════
    // Step 2: Validate VN exists
    // ═══════════════════════════════════════════════════
    //
    // ตรวจว่า VN ที่ส่งมาไม่ว่าง + มีอยู่ใน ovst
    //

    if (!params.vn || params.vn.trim() === '') {
      throw new Error('Invalid VN')
    }

    // ═══════════════════════════════════════════════════
    // Step 3: Validate lab_app_head exists
    // ═══════════════════════════════════════════════════
    //
    // SELECT count(*) as cc FROM lab_app_head
    // WHERE lab_app_order_number = ?
    //

    const existCheck = await trx.from('lab_app_head')
      .where('lab_app_order_number', params.labAppOrderNumber)
      .count('* as cc')
      .first()

    if (!existCheck || Number(existCheck.cc) === 0) {
      throw new Error('Invalid Lab App Order Number')
    }

    // ═══════════════════════════════════════════════════
    // Step 4: Load lab_app_head
    // ═══════════════════════════════════════════════════
    //
    // SELECT * FROM lab_app_head
    // WHERE lab_app_order_number = ?
    //

    const labAppHead = await trx.from('lab_app_head')
      .where('lab_app_order_number', params.labAppOrderNumber)
      .first()

    if (!labAppHead) {
      throw new Error('Lab app head not found')
    }

    // ═══════════════════════════════════════════════════
    // Step 5: Load lab_app_order
    // ═══════════════════════════════════════════════════
    //
    // GetSQLSubQueryData สร้าง list ของ lab_app_order_number
    // ที่ = param_1 OR link_lab_order_number = param_1
    //
    // SELECT * FROM lab_app_order
    // WHERE lab_app_order_number IN (
    //   SELECT lab_app_order_number FROM lab_app_head
    //   WHERE lab_app_order_number = ?
    //      OR link_lab_order_number = ?
    // )
    //

    const labAppOrders = await trx.from('lab_app_order')
      .whereIn('lab_app_order_number', (q) => {
        q.select('lab_app_order_number')
          .from('lab_app_head')
          .where('lab_app_order_number', params.labAppOrderNumber)
          .orWhere('link_lab_order_number', params.labAppOrderNumber)
      })

    // ═══════════════════════════════════════════════════
    // Step 6: Load lab_app_order_service
    // ═══════════════════════════════════════════════════
    //
    // SELECT * FROM lab_app_order_service
    // WHERE lab_app_order_number IN (...)
    //

    const labAppOrderServices = await trx.from('lab_app_order_service')
      .whereIn('lab_app_order_number', (q) => {
        q.select('lab_app_order_number')
          .from('lab_app_head')
          .where('lab_app_order_number', params.labAppOrderNumber)
          .orWhere('link_lab_order_number', params.labAppOrderNumber)
      })

    // ═══════════════════════════════════════════════════
    // Step 7: Generate unique lab_order_number
    // ═══════════════════════════════════════════════════
    //
    // LOOP:
    //   lab_order_number = GetSerialNumber("lab_order_number")
    //   SELECT count(*) FROM lab_head WHERE lab_order_number = ?
    //   → 0 → break (unique)
    //

    const labOrderNumber = await SerialHelper.getUniqueSerial(
      'lab_order_number', 'lab_head', 'lab_order_number', trx
    )

    // ═══════════════════════════════════════════════════
    // Step 8: INSERT lab_head
    // ═══════════════════════════════════════════════════
    //
    // AssignRecordx(lab_app_head, lab_head, 1)
    // → copy ทุก field ที่ชื่อตรงกันจาก lab_app_head
    //
    // แล้ว override fields:
    //   lab_order_number        = ที่สร้างใหม่
    //   vn                      = param_2 (vn ของ visit)
    //   order_date              = GetServerDate()
    //   order_time              = GetServerTime()
    //   hospital_department_id  = fhospitalDepartmentID
    //   link_lab_order_number   = 0
    //   order_department        = lab_app_head.order_department
    //                             (ถ้าว่าง → fcomputerdepcode)
    //   order_computer_name     = fcomputername
    //   lab_request_type_id     = 3  ← "จากนัดหมาย"
    //

    const now = new Date()
    const serverDate = now.toISOString().substring(0, 10)
    const serverTime = [
      now.getHours().toString().padStart(2, '0'),
      now.getMinutes().toString().padStart(2, '0'),
      now.getSeconds().toString().padStart(2, '0'),
    ].join(':')

    // สร้าง lab_head row จาก lab_app_head (copy fields ที่ชื่อตรงกัน)
    const labHeadRow = this.copyMatchingFields(labAppHead, LAB_HEAD_FIELDS)

    // Override fields ตาม decompiled code
    labHeadRow.lab_order_number = labOrderNumber
    labHeadRow.vn = params.vn
    labHeadRow.order_date = serverDate
    labHeadRow.order_time = serverTime
    labHeadRow.hospital_department_id = params.hospitalDepartmentId || 0
    labHeadRow.link_lab_order_number = 0
    labHeadRow.order_computer_name = params.computerName || ''
    labHeadRow.lab_request_type_id = 3                    // ← "จากนัดหมาย"

    // order_department: ใช้จาก lab_app_head, ถ้าว่าง → computerDepcode
    if (!labAppHead.order_department || labAppHead.order_department.trim() === '') {
      labHeadRow.order_department = params.computerDepcode || ''
    } else {
      labHeadRow.order_department = labAppHead.order_department
    }

    await trx.table('lab_head').insert(labHeadRow)

    // ═══════════════════════════════════════════════════
    // Step 9: INSERT lab_order (copy จาก lab_app_order)
    // ═══════════════════════════════════════════════════
    //
    // lab_app_order.First()
    // WHILE NOT EOF:
    //   lab_order.Append()
    //   AssignRecordx(lab_app_order, lab_order, 1)
    //   lab_order.lab_order_number = lab_head.lab_order_number
    //   lab_order.Post()
    //   lab_app_order.Next()
    //

    let labOrderCount = 0

    for (const appOrder of labAppOrders) {
      const labOrderRow = this.copyMatchingFields(appOrder, LAB_ORDER_FIELDS)
      labOrderRow.lab_order_number = labOrderNumber       // ← ชี้ไปที่ lab_head ใหม่

      await trx.table('lab_order').insert(labOrderRow)
      labOrderCount++
    }

    // ═══════════════════════════════════════════════════
    // Step 10: INSERT lab_order_service
    //          (copy จาก lab_app_order_service)
    // ═══════════════════════════════════════════════════
    //
    // ใน decompiled code ส่วนนี้ถูก save ผ่าน
    // HOSxP_UpdateDelta_log ถ้า ChangeCount > 0
    //

    let labOrderServiceCount = 0

    for (const appService of labAppOrderServices) {
      const serviceRow = this.copyMatchingFields(appService, LAB_ORDER_SERVICE_FIELDS)
      serviceRow.lab_order_number = labOrderNumber

      await trx.table('lab_order_service').insert(serviceRow)
      labOrderServiceCount++
    }

    // ═══════════════════════════════════════════════════
    // Step 11: Update lab_head — order_department +
    //          hospital_department_id
    // ═══════════════════════════════════════════════════
    //
    // SELECT * FROM lab_head
    // WHERE link_lab_order_number = :labOrderNumber
    //    OR lab_order_number = :labOrderNumber
    //
    // WHILE NOT EOF:
    //   lab_head.Edit()
    //   lab_head.order_department =
    //     lab_app_head.order_department (ถ้าไม่ว่าง)
    //   lab_head.hospital_department_id =
    //     lab_app_head.hospital_department_id
    //   lab_head.Post()
    //

    const updateData: Record<string, any> = {}

    if (labAppHead.order_department && labAppHead.order_department.trim() !== '') {
      updateData.order_department = labAppHead.order_department
    }
    if (labAppHead.hospital_department_id) {
      updateData.hospital_department_id = labAppHead.hospital_department_id
    }

    if (Object.keys(updateData).length > 0) {
      await trx.from('lab_head')
        .where('lab_order_number', labOrderNumber)
        .orWhere('link_lab_order_number', labOrderNumber)
        .update(updateData)
    }

    // ═══════════════════════════════════════════════════
    // Step 12: Log LIS Track
    // ═══════════════════════════════════════════════════
    //
    // if labOrderNumber > 0:
    //   DoLogLabLISTrack(labOrderNumber, "ORDER-ENTRY")
    //

    if (labOrderNumber > 0) {
      await this.logLabLISTrack(labOrderNumber, 'ORDER-ENTRY', trx)
    }

    return {
      labOrderNumber,
      labHeadInserted: true,
      labOrderCount,
      labOrderServiceCount,
    }
  }

  // ╔════════════════════════════════════════════════════╗
  // ║  PUBLIC: processLabAppointmentsForVisit            ║
  // ╚════════════════════════════════════════════════════╝
  //
  // เรียกจาก NewVisitService หลัง Step 24 (oapp check)
  //
  // ค้น lab_app_head ที่ตรงกับ oapp
  // แล้ว copy เป็น lab order จริงทีละ record
  //

  public async processLabAppointmentsForVisit(
    hn: string,
    vn: string,
    vstdate: string,
    options: {
      computerDepcode?: string
      computerName?: string
      hospitalDepartmentId?: number
    },
    trx?: TransactionClientContract
  ): Promise<CreateLabFromAppResult[]> {
    if (!trx) {
      return db.transaction((newTrx) =>
        this.processLabAppointmentsForVisit(hn, vn, vstdate, options, newTrx)
      )
    }

    // ── ค้น lab_app_head ที่ตรงกับ visit ──────────────
    //
    // เงื่อนไข:
    //   hn = ?
    //   nextdate = vstdate (หรือ order_date = vstdate)
    //   confirm_order = 'Y'
    //   vn IS NULL OR vn = ''  ← ยังไม่ถูก link
    //

    const labApps = await trx.from('lab_app_head')
      .where('hn', hn)
      .where('nextdate', vstdate)
      .where('confirm_order', 'Y')
      .where((q) => {
        q.whereNull('vn')
          .orWhere('vn', '')
      })
      .select('lab_app_order_number')

    if (labApps.length === 0) {
      return []
    }

    // ── copy แต่ละ lab_app → lab order จริง ────────────

    const results: CreateLabFromAppResult[] = []

    for (const labApp of labApps) {
      const result = await this.createLabOrderFromAppointment({
        labAppOrderNumber: labApp.lab_app_order_number,
        vn,
        computerDepcode: options.computerDepcode,
        computerName: options.computerName,
        hospitalDepartmentId: options.hospitalDepartmentId,
      }, trx)

      if (result) {
        results.push(result)
      }
    }

    return results
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: copyMatchingFields
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Equivalent: AssignRecordx(source, dest, 1)
  //
  // HOSxP AssignRecordx จะ copy ทุก field ที่ชื่อตรงกัน
  // ระหว่าง source dataset กับ dest dataset
  //
  // เราทำแบบเดียวกัน: copy เฉพาะ field ที่อยู่ใน
  // allowedFields list
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private copyMatchingFields(
    source: Record<string, any>,
    allowedFields: string[]
  ): Record<string, any> {
    const result: Record<string, any> = {}

    for (const field of allowedFields) {
      if (source[field] !== undefined) {
        result[field] = source[field]
      }
    }

    return result
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PRIVATE: logLabLISTrack
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // Equivalent: DoLogLabLISTrack(labOrderNumber, "ORDER-ENTRY")
  //
  // INSERT INTO lab_lis_track (
  //   lab_order_number, action_name, action_datetime
  // ) VALUES (?, ?, NOW())
  //
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  private async logLabLISTrack(
    labOrderNumber: number,
    actionName: string,
    client: TransactionClientContract
  ): Promise<void> {
    try {
      await client.table('lab_lis_track').insert({
        lab_order_number: labOrderNumber,
        action_name: actionName,
        action_datetime: client.raw('NOW()'),
      })
    } catch {
      // log failure is not critical
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Field Lists — AssignRecordx Copy Mapping
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// lab_app_head → lab_head
// lab_app_order → lab_order
// lab_app_order_service → lab_order_service
//
// Fields ที่ชื่อตรงกันระหว่าง source/dest table
// (จาก CREATE TABLE ที่ได้มา)
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** lab_app_head → lab_head: fields ที่ชื่อตรงกัน */
const LAB_HEAD_FIELDS = [
  // PK (จะถูก override)
  'lab_order_number',

  // FK / identifiers
  'vn',
  'hn',

  // order info
  'doctor_code',
  'lab_items_group_code',
  'lab_head_remark',
  'order_date',
  'order_time',
  'department',
  'form_name',
  'sub_group_list',

  // report info
  'report_date',
  'reporter_name',
  'report_time',

  // specimen / status
  'confirm_specimen',
  'confirm_report',
  'receive_date',
  'receive_time',
  'ward',
  'result_note',
  'lock_result',

  // department / computer
  'order_department',
  'order_computer_name',
  'hospital_department_id',

  // type / priority
  'lab_request_type_id',
  'lab_priority_id',

  // GUID
  'hos_guid',

  // link
  'link_lab_order_number',

  // staff
  'order_staff',

  // finance
  'confirm_charge_money',
  'finance_lab_confirm',
  'finance_lab_clear',

  // misc
  'lab_receive',
  'notify_depcode',
  'entry_datetime',
  'update_datetime',
]

/** lab_app_order → lab_order: fields ที่ชื่อตรงกัน */
const LAB_ORDER_FIELDS = [
  'lab_order_number',             // จะถูก override
  'lab_items_code',
  'lab_items_name_ref',
  'lab_order_result',
  'lab_items_normal_value',
  'lab_items_normal_value_ref',
  'lab_order_remark',
  'confirm_report',
  'lab_items_sub_group_code',
  'lab_items_group_code',
  'abnormal_result',
]

/** lab_app_order_service → lab_order_service: fields ที่ชื่อตรงกัน */
const LAB_ORDER_SERVICE_FIELDS = [
  'lab_order_number',             // จะถูก override
  'icode',
  'qty',
  'unitprice',
  'discount',
  'total',
  'income',
  'pttype',
]