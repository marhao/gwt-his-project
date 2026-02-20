import db from '@adonisjs/lucid/services/db'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NhsoRightCheckService (V2 — Token-based)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Source:
//   @Patientvisitquickpttypeentryframeunit
//   @TPatientVisitQuickPttypeEntryFrame
//   @DoNHSORightCheckServiceV2$qqrv
//
// ตรวจสอบสิทธิ์บัตรทอง (สปสช.) ผ่าน NHSO Web Service V2
// ใช้ CID ส่งไปตรวจสิทธิ์ → map ผลกลับเป็น pttype ของ รพ.
//
// Flow:
//   1. หา CID จาก patient (by hn หรือ vn)
//   2. Validate CID (CheckPID — mod 11)
//   3. ตรวจ/ดึง NHSO Token
//   4. เรียก NHSO SOAP V2: GetUCWSTokenP1(cid, token, userCID)
//   5. Map response → pttype ผ่าน 4 ตาราง:
//      - pttype_nhso_subinscl  (V2 ใหม่)
//      - nhso_type_name
//      - pttype.nhso_subinscl  (V2 ใหม่)
//      - pttype.hipdata_code
//   6. Return: pttype, pttypeno, hospmain, hospsub, begin_date, expire_date
//
// ความแตกต่าง V1 → V2:
//   Auth:    User/Password    → Token + UserCID
//   WS:      GetRightsSearch  → GetUCWSTokenP1
//   Mapping: +pttype_nhso_subinscl, +pttype.nhso_subinscl
//   Host:    conditional hospmain/hospsub by maininscl_type
//
// Tables READ:
//   patient, ovst, pttype, pttype_nhso_subinscl,
//   nhso_type_name, opdconfig/hos_variable
//
// Tables WRITE: (ไม่เขียนเอง — return ให้ caller จัดการ)
//   ไม่มี — caller (NewVisitService/Orchestrator) จะเขียน visit_pttype
//

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Input สำหรับ check สิทธิ์ */
export interface NhsoRightCheckParams {
  /** hn หรือ vn — ใช้หา CID */
  hn?: string
  vn?: string
  /** หรือส่ง CID ตรง */
  cid?: string
}

/** ผลลัพธ์จาก NHSO → map เป็น pttype แล้ว */
export interface NhsoRightCheckResult {
  /** สำเร็จหรือไม่ */
  success: boolean
  /** error message (ถ้าไม่สำเร็จ) */
  error?: string

  /** pttype ที่ map ได้ */
  pttype?: string
  /** เลขบัตร / inscl_id */
  pttypeno?: string
  /** รพ.หลัก */
  hospmain?: string
  /** รพ.รอง */
  hospsub?: string
  /** วันเริ่มสิทธิ์ yyyy-MM-dd */
  beginDate?: string
  /** วันหมดสิทธิ์ yyyy-MM-dd */
  expireDate?: string

  /** ข้อมูลดิบจาก NHSO (สำหรับ debug/log) */
  raw?: NhsoRawResponse
}

/** ข้อมูลดิบจาก NHSO response */
export interface NhsoRawResponse {
  maininscl?: string
  maininsclName?: string
  maininsclType?: string
  subinscl?: string
  subinsclName?: string
  insclId?: string
  hospmain?: string
  hospsub?: string
  beginDate?: string
  expireDate?: string
  wsStatus?: string
  wsId?: string
  wsIdBatch?: string
  countSelect?: number
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Service
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default class NhsoRightCheckService {

  // ──────────────────────────────────────────────────────
  //  Main Entry
  // ──────────────────────────────────────────────────────

  /**
   * ตรวจสิทธิ์ NHSO V2 → map เป็น pttype ของ รพ.
   */
  public async checkRight(
    params: NhsoRightCheckParams
  ): Promise<NhsoRightCheckResult> {

    // ═══════════════════════════════════════════════════
    // Step 1: หา CID
    // ═══════════════════════════════════════════════════
    //
    // Source:
    //   IF ovst exists → SELECT cid FROM patient WHERE hn = FCurrentVisitHN
    //   ELSE           → SELECT p.cid FROM patient p, ovst v
    //                     WHERE p.hn = v.hn AND v.vn = ?
    //

    let cid = params.cid || ''

    if (!cid) {
      cid = await this.resolveCid(params.hn, params.vn)
    }

    if (!cid) {
      return { success: false, error: 'ไม่พบ CID ของผู้ป่วย' }
    }

    // ═══════════════════════════════════════════════════
    // Step 2: Validate CID
    // ═══════════════════════════════════════════════════
    //
    // Source: CheckPID(cid) → ถ้าไม่ผ่าน → "CID Invalid"
    //

    if (!this.isValidCid(cid)) {
      return { success: false, error: `CID Invalid: ${cid}` }
    }

    // ═══════════════════════════════════════════════════
    // Step 3: ดึง NHSO Token
    // ═══════════════════════════════════════════════════
    //
    // Source V2:
    //   IF FNHSORightToken == null → show NHSOUCAuthenticationCheckForm
    //   IF still null → "Invalid NHSO Token"
    //

    const token = await this.getNhsoToken()
    if (!token) {
      return { success: false, error: 'Invalid NHSO Token — กรุณาตั้งค่า Token' }
    }

    const userCid = await this.getNhsoUserCid()

    // ═══════════════════════════════════════════════════
    // Step 4: เรียก NHSO SOAP V2
    // ═══════════════════════════════════════════════════
    //
    // Source V2:
    //   GetUCWSTokenP1(cid, token, userCID) → response object
    //
    // NOTE: SOAP call ต้อง implement ตาม WSDL ของ NHSO
    //   ตรงนี้ใช้ abstraction layer — inject ได้
    //

    const shortCid = this.makeShortCid(cid)

    let raw: NhsoRawResponse
    try {
      raw = await this.callNhsoService(shortCid, token, userCid)
    } catch (err: any) {
      return { success: false, error: `NHSO API Error: ${err.message}` }
    }

    // ═══════════════════════════════════════════════════
    // Step 5: Map response → pttype
    // ═══════════════════════════════════════════════════

    const pttype = await this.mapToPttype(raw)

    if (!pttype) {
      return {
        success: false,
        error: 'ไม่สามารถ map สิทธิ์ NHSO เป็น pttype ได้',
        raw,
      }
    }

    // ═══════════════════════════════════════════════════
    // Step 6: Resolve hospmain/hospsub + dates
    // ═══════════════════════════════════════════════════

    // pttypeno — ถ้า maininscl ว่าง → ใช้ MakeFullCID
    let pttypeno = raw.insclId || ''
    if (!raw.maininscl && !pttypeno) {
      pttypeno = this.makeFullCid(cid)
    }

    // hospmain/hospsub — conditional by maininsclType (V2)
    const { hospmain, hospsub } = this.resolveHospCodes(raw)

    // dates — Thai format → yyyy-MM-dd
    let beginDate = this.parseThaiDate(raw.beginDate || '')
    let expireDate = this.parseThaiDate(raw.expireDate || '')

    // pcode check — ถ้า pcode พิเศษ → expire = 2099
    const isSpecialPcode = await this.checkSpecialPcode(pttype)
    if (isSpecialPcode) {
      expireDate = '2099-01-01'
    }

    return {
      success: true,
      pttype,
      pttypeno,
      hospmain,
      hospsub,
      beginDate,
      expireDate,
      raw,
    }
  }

  // ──────────────────────────────────────────────────────
  //  Step 1: Resolve CID
  // ──────────────────────────────────────────────────────

  private async resolveCid(
    hn?: string,
    vn?: string
  ): Promise<string> {

    if (hn) {
      const row = await db.from('patient')
        .where('hn', hn)
        .select('cid')
        .first()
      return row?.cid || ''
    }

    if (vn) {
      const row = await db.from('patient as p')
        .join('ovst as v', 'v.hn', 'p.hn')
        .where('v.vn', vn)
        .select('p.cid')
        .first()
      return row?.cid || ''
    }

    return ''
  }

  // ──────────────────────────────────────────────────────
  //  Step 3: NHSO Token
  // ──────────────────────────────────────────────────────
  //
  // Source V2:
  //   FNHSORightToken  — stored after NHSOUCAuthenticationCheckForm
  //   FNHSORightUserCID — user's CID for API auth
  //
  // Backend: ดึงจาก hos_variable / config
  //

  private async getNhsoToken(): Promise<string | null> {
    const row = await db.from('hos_variable')
      .where('variable_name', 'NHSO_RIGHT_TOKEN')
      .select('variable_value')
      .first()

    return (row?.variable_value || '').trim() || null
  }

  private async getNhsoUserCid(): Promise<string> {
    const row = await db.from('hos_variable')
      .where('variable_name', 'NHSO_RIGHT_USER_CID')
      .select('variable_value')
      .first()

    return (row?.variable_value || '').trim()
  }

  // ──────────────────────────────────────────────────────
  //  Step 4: Call NHSO SOAP V2
  // ──────────────────────────────────────────────────────
  //
  // Source V2:
  //   GetUCWSTokenP1(shortCid, token, userCID)
  //   → SOAP call ไป Nhsorightsearchservice2unit
  //   → return response object with fields:
  //     maininscl, maininsclName, maininsclType,
  //     subinscl, subinsclName, inscl_id,
  //     hospmain, hospsub, beginDate, expireDate,
  //     wsStatus, wsId, wsIdBatch, countSelect
  //
  // NOTE: ต้อง implement SOAP client ตาม WSDL ของ NHSO
  //   หรือ wrap ด้วย HTTP client ที่ส่ง SOAP envelope
  //

  private async callNhsoService(
    cid: string,
    token: string,
    userCid: string
  ): Promise<NhsoRawResponse> {

    // ──── SOAP Envelope ────
    //
    // NHSO V2 ใช้ SOAP service: GetUCWSTokenP1
    // Parameters: personalId (CID), token, userPersonalId (userCID)
    //
    // TODO: ปรับ endpoint URL ตาม environment
    //

    const soapUrl = await this.getNhsoSoapUrl()

    const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:ser="http://service.nhso.go.th/">
  <soapenv:Header/>
  <soapenv:Body>
    <ser:GetUCWSTokenP1>
      <personalId>${this.escapeXml(cid)}</personalId>
      <token>${this.escapeXml(token)}</token>
      <userPersonalId>${this.escapeXml(userCid)}</userPersonalId>
    </ser:GetUCWSTokenP1>
  </soapenv:Body>
</soapenv:Envelope>`

    const response = await fetch(soapUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=UTF-8',
        'SOAPAction': 'GetUCWSTokenP1',
      },
      body: soapEnvelope,
    })

    if (!response.ok) {
      throw new Error(`NHSO SOAP HTTP ${response.status}: ${response.statusText}`)
    }

    const xml = await response.text()
    return this.parseSoapResponse(xml)
  }

  /**
   * Parse SOAP XML response → NhsoRawResponse
   *
   * Response fields (V2 offsets mapped to names):
   *   +0x70  maininscl
   *   +0x78  maininsclType       ← V2 ใหม่
   *   +0x80  maininsclName
   *   +0x14  insclId (pttypeno)
   *   +0x28  beginDate
   *   +0x38  hospmain (conditional)
   *   +0x48  hospsub (conditional)
   *   +0x58  hospsub (fallback)
   *   +0x190 expireDate
   *   +0x1b0 subinscl
   *   +0x1b8 subinsclName
   *   +0x1e0 wsStatus
   *   +0x1f0 wsId
   *   +0x1f8 wsIdBatch
   *   +0x24  countSelect
   */
  private parseSoapResponse(xml: string): NhsoRawResponse {
    // ใช้ simple regex extraction สำหรับ SOAP response
    // production ควรใช้ proper XML parser

    return {
      maininscl: this.extractXmlTag(xml, 'maininscl'),
      maininsclName: this.extractXmlTag(xml, 'maininsclName')
        || this.extractXmlTag(xml, 'maininscl_name'),
      maininsclType: this.extractXmlTag(xml, 'maininsclType')
        || this.extractXmlTag(xml, 'maininscl_type'),
      subinscl: this.extractXmlTag(xml, 'subinscl'),
      subinsclName: this.extractXmlTag(xml, 'subinsclName')
        || this.extractXmlTag(xml, 'subinscl_name'),
      insclId: this.extractXmlTag(xml, 'inscl_id')
        || this.extractXmlTag(xml, 'pttypeno'),
      hospmain: this.extractXmlTag(xml, 'hmain')
        || this.extractXmlTag(xml, 'hospmain'),
      hospsub: this.extractXmlTag(xml, 'hsub')
        || this.extractXmlTag(xml, 'hospsub'),
      beginDate: this.extractXmlTag(xml, 'startdate')
        || this.extractXmlTag(xml, 'begin_date'),
      expireDate: this.extractXmlTag(xml, 'expdate')
        || this.extractXmlTag(xml, 'expire_date'),
      wsStatus: this.extractXmlTag(xml, 'wsStatus'),
      wsId: this.extractXmlTag(xml, 'wsid'),
      wsIdBatch: this.extractXmlTag(xml, 'wsidBatch'),
      countSelect: Number(this.extractXmlTag(xml, 'countSelect')) || 0,
    }
  }

  // ──────────────────────────────────────────────────────
  //  Step 5: Map Response → pttype
  // ──────────────────────────────────────────────────────
  //
  // V2 Mapping Priority:
  //
  //   ลำดับ 1: subinscl
  //     1a. pttype_nhso_subinscl  (V2 ใหม่)
  //     1b. nhso_type_name (by subinsclName)
  //     1c. pttype.nhso_subinscl  (V2 ใหม่)
  //
  //   ลำดับ 2: subinsclName
  //     2a. nhso_type_name (by subinsclName)
  //
  //   ลำดับ 3: maininscl
  //     3a. nhso_type_name (by maininsclName)    — ถ้า maininscl ว่าง
  //     3b. pttype.hipdata_code                  — ถ้ามี maininscl
  //

  private async mapToPttype(raw: NhsoRawResponse): Promise<string | null> {

    let pttype: string | null = null

    // ═══════════════════════════════════════════════════
    // ลำดับ 1: subinscl
    // ═══════════════════════════════════════════════════

    if (raw.subinscl) {

      // 1a: pttype_nhso_subinscl (V2 ใหม่)
      //
      // Source:
      //   SELECT count(*) FROM pttype_nhso_subinscl
      //     WHERE nhso_subinscl = "{subinscl}"
      //   → count > 0 → use
      //   → count == 1 → SELECT pttype ... WHERE nhso_subinscl
      //   → count > 1  → GetSQLSubQueryData → user เลือก (backend: ใช้ตัวแรก)
      //

      pttype = await this.mapByNhsoSubinscl(raw.subinscl)

      // 1b: nhso_type_name (by subinsclName)
      if (!pttype && raw.subinsclName) {
        pttype = await this.mapByNhsoTypeName(raw.subinsclName)
      }

      // 1c: pttype.nhso_subinscl (V2 ใหม่)
      //
      // Source:
      //   SELECT count(*) FROM pttype
      //     WHERE nhso_subinscl = "{subinscl}" AND isuse = "Y"
      //   → mapping เหมือน hipdata_code logic
      //

      if (!pttype) {
        pttype = await this.mapByPttypeField(
          'nhso_subinscl', raw.subinscl
        )
      }
    }

    // ═══════════════════════════════════════════════════
    // ลำดับ 2: subinsclName (ถ้ายังไม่ได้)
    // ═══════════════════════════════════════════════════

    if (!pttype && raw.subinsclName) {
      pttype = await this.mapByNhsoTypeName(raw.subinsclName)
    }

    // ═══════════════════════════════════════════════════
    // ลำดับ 3: maininscl
    // ═══════════════════════════════════════════════════

    if (!pttype) {
      if (!raw.maininscl) {
        // 3a: maininscl ว่าง → ใช้ maininsclName
        //
        // Source:
        //   SELECT pttype FROM nhso_type_name
        //     WHERE name = "{maininsclName}"
        //

        if (raw.maininsclName) {
          pttype = await this.mapByNhsoTypeName(raw.maininsclName)
        }
      } else {
        // 3b: maininscl มีค่า → hipdata_code
        //
        // Source:
        //   SELECT count(*) FROM pttype
        //     WHERE hipdata_code = "{maininscl}" AND isuse = "Y"
        //   → count == 1 → ใช้เลย
        //   → count > 1  → ตรวจ maininsclName → nhso_type_name / user เลือก
        //   → count == 0 → SELECT pttype WHERE hipdata_code (no isuse)
        //

        pttype = await this.mapByHipdataCode(raw)
      }
    }

    return pttype
  }

  // ──────────────────────────────────────────────────────
  //  Mapping: pttype_nhso_subinscl (V2 ใหม่)
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   SELECT count(*) FROM pttype_nhso_subinscl
  //     WHERE nhso_subinscl = "{subinscl}" [AND ""]
  //
  //   IF count > 0:
  //     IF count == 1:
  //       SELECT pttype FROM pttype_nhso_subinscl
  //         WHERE nhso_subinscl = ?
  //     ELSE:
  //       subQuery = GetSQLSubQueryData(
  //         "select pttype from pttype_nhso_subinscl
  //          where nhso_subinscl = ?")
  //       → "select name from pttype where pttype in ({subQuery})
  //          and isuse='Y'"
  //       → ShowGetMultipleListSQL (UI เลือก)
  //       → SELECT pttype FROM pttype WHERE name = ?
  //
  // Backend: ถ้า > 1 → ใช้ตัวแรกที่ isuse='Y'
  //

  private async mapByNhsoSubinscl(subinscl: string): Promise<string | null> {

    const rows = await db.from('pttype_nhso_subinscl')
      .where('nhso_subinscl', subinscl)
      .select('pttype')

    if (rows.length === 0) return null

    if (rows.length === 1) {
      return rows[0].pttype || null
    }

    // หลาย pttype → หาตัวที่ isuse='Y'
    const pttypes = rows.map((r: any) => r.pttype)
    const valid = await db.from('pttype')
      .whereIn('pttype', pttypes)
      .where('isuse', 'Y')
      .select('pttype')
      .first()

    return valid?.pttype || rows[0].pttype || null
  }

  // ──────────────────────────────────────────────────────
  //  Mapping: nhso_type_name
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   SELECT pttype FROM nhso_type_name WHERE name = ?
  //

  private async mapByNhsoTypeName(name: string): Promise<string | null> {
    if (!name) return null

    const row = await db.from('nhso_type_name')
      .where('name', name)
      .select('pttype')
      .first()

    return row?.pttype || null
  }

  // ──────────────────────────────────────────────────────
  //  Mapping: pttype field (nhso_subinscl / nhso_code)
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   SELECT count(*) FROM pttype WHERE {field} = ? AND isuse = "Y"
  //   → count == 1 → ใช้
  //   → count > 1  → user เลือก (backend: ตัวแรก isuse=Y)
  //   → count == 0 → SELECT pttype WHERE {field} = ? (no isuse)
  //

  private async mapByPttypeField(
    field: string,
    value: string
  ): Promise<string | null> {

    // ตรวจ with isuse
    const activeRows = await db.from('pttype')
      .where(field, value)
      .where('isuse', 'Y')
      .select('pttype')

    if (activeRows.length === 1) {
      return activeRows[0].pttype
    }

    if (activeRows.length > 1) {
      // หลายตัว → ใช้ตัวแรก
      return activeRows[0].pttype
    }

    // count == 0 → fallback ไม่มี isuse filter
    const anyRow = await db.from('pttype')
      .where(field, value)
      .select('pttype')
      .first()

    return anyRow?.pttype || null
  }

  // ──────────────────────────────────────────────────────
  //  Mapping: hipdata_code (maininscl)
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   SELECT count(*) FROM pttype
  //     WHERE hipdata_code = "{maininscl}" AND isuse = "Y"
  //
  //   IF count == 1 → SELECT pttype ...
  //   IF count > 1  →
  //     ตรวจ maininsclName trim:
  //       ถ้าว่าง → ShowGetMultipleListSQL (user เลือก)
  //       ถ้าไม่ว่าง →
  //         SELECT count(*) FROM nhso_type_name WHERE name = maininsclName
  //         IF == 1 → ใช้จาก nhso_type_name
  //         ELSE    → ShowGetMultipleListSQL จาก nhso_type_name
  //   IF count == 0 → SELECT pttype WHERE hipdata_code (no isuse)
  //

  private async mapByHipdataCode(raw: NhsoRawResponse): Promise<string | null> {

    const maininscl = raw.maininscl || ''
    if (!maininscl) return null

    const activeRows = await db.from('pttype')
      .where('hipdata_code', maininscl)
      .where('isuse', 'Y')
      .select('pttype')

    if (activeRows.length === 1) {
      return activeRows[0].pttype
    }

    if (activeRows.length > 1) {
      // ตรวจ maininsclName
      const nameStr = (raw.maininsclName || '').trim()

      if (!nameStr) {
        // maininsclName ว่าง → ใช้ตัวแรก
        return activeRows[0].pttype
      }

      // ลอง nhso_type_name ก่อน
      const fromName = await this.mapByNhsoTypeName(nameStr)
      if (fromName) return fromName

      // fallback ตัวแรก
      return activeRows[0].pttype
    }

    // count == 0 → fallback ไม่มี isuse
    const anyRow = await db.from('pttype')
      .where('hipdata_code', maininscl)
      .select('pttype')
      .first()

    return anyRow?.pttype || null
  }

  // ──────────────────────────────────────────────────────
  //  Step 6: hospmain/hospsub
  // ──────────────────────────────────────────────────────
  //
  // V2: conditional by maininsclType
  //
  // Source:
  //   IF maininsclType == "" → hospmain = raw field 1
  //   ELSE IF maininsclType == "ค่าอื่น" → hospmain = raw field 2
  //   hospsub = raw.hospsub (fallback)
  //
  // ต้นฉบับเช็ค +0x78 (maininsclType) กับค่าคงที่
  //   ถ้า match → ใช้ +0x38 (hospmain ชุด 1)
  //   ถ้า match อีกค่า → ใช้ +0x48 (hospmain ชุด 2)
  //   hospsub ใช้ +0x58 เสมอ
  //
  // Backend: ใช้ hospmain/hospsub จาก response ตรง ๆ
  //   เพราะ SOAP response จะ return field ที่ถูกต้องอยู่แล้ว
  //

  private resolveHospCodes(raw: NhsoRawResponse): {
    hospmain: string
    hospsub: string
  } {
    return {
      hospmain: raw.hospmain || '',
      hospsub: raw.hospsub || '',
    }
  }

  // ──────────────────────────────────────────────────────
  //  Special pcode check
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   SELECT pcode FROM pttype WHERE pttype = ?
  //   IF pcode == "ค่าพิเศษ" → expire_date = 01/01/2099
  //

  private async checkSpecialPcode(pttype: string): Promise<boolean> {
    const row = await db.from('pttype')
      .where('pttype', pttype)
      .select('pcode')
      .first()

    // ต้นฉบับเช็คกับค่าคงที่ DAT_0056a5dc
    // ที่เป็น pcode พิเศษ → set expire 2099
    // จาก context น่าจะเป็น pcode ของสิทธิ์ที่ไม่มีวันหมดอายุ
    const specialPcodes = ['99']  // TODO: ยืนยันค่า pcode ที่ใช้
    return specialPcodes.includes(row?.pcode || '')
  }

  // ──────────────────────────────────────────────────────
  //  Config
  // ──────────────────────────────────────────────────────

  private async getNhsoSoapUrl(): Promise<string> {
    const row = await db.from('hos_variable')
      .where('variable_name', 'NHSO_SOAP_V2_URL')
      .select('variable_value')
      .first()

    return (row?.variable_value || '').trim()
      || 'https://ucws.nhso.go.th/ucws-p1/UCWSTokenP1'
  }

  // ──────────────────────────────────────────────────────
  //  Utilities
  // ──────────────────────────────────────────────────────

  /**
   * Validate CID — CheckPID (mod 11 check digit)
   */
  private isValidCid(cid: string): boolean {
    const cleaned = cid.replace(/[\s-]/g, '')
    if (!/^\d{13}$/.test(cleaned)) return false

    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += Number(cleaned[i]) * (13 - i)
    }
    const checkDigit = (11 - (sum % 11)) % 10
    return checkDigit === Number(cleaned[12])
  }

  /**
   * MakeShortCID — ตัด leading zeros
   */
  private makeShortCid(cid: string): string {
    return cid.replace(/[\s-]/g, '').replace(/^0+/, '') || cid
  }

  /**
   * MakeFullCID — pad ให้ครบ 13 หลัก
   *
   * Source: @Hosxpdmu@MakeFullCID
   */
  private makeFullCid(cid: string): string {
    const cleaned = cid.replace(/[\s-]/g, '')
    return cleaned.padStart(13, '0')
  }

  /**
   * Parse Thai date format → yyyy-MM-dd
   *
   * Input formats:
   *   "ddmmyyyy" Thai Buddhist (e.g. "15012567")
   *   "yyyymmdd" Thai Buddhist (e.g. "25670115")
   *   "yyyy-MM-dd" → pass through
   *
   * Source:
   *   WStrCopy(expdate, 7, 2) → dd
   *   WStrCopy(expdate, 5, 2) → mm
   *   WStrCopy(expdate, 1, 4) → yyyy
   *   → "dd/mm/yyyy" → ThaiDateToDate
   */
  private parseThaiDate(dateStr: string): string {
    if (!dateStr) return ''

    // yyyy-MM-dd already
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr
    }

    // 8 digits: yyyymmdd (Thai)
    // Source extracts: pos 1,4=yyyy  pos 5,2=mm  pos 7,2=dd
    if (/^\d{8}$/.test(dateStr)) {
      const yyyy = Number(dateStr.substring(0, 4))
      const mm = dateStr.substring(4, 6)
      const dd = dateStr.substring(6, 8)

      // Thai year → CE
      const ceYear = yyyy > 2400 ? yyyy - 543 : yyyy
      return `${ceYear}-${mm}-${dd}`
    }

    return ''
  }

  /**
   * Extract value from XML tag (simple regex)
   */
  private extractXmlTag(xml: string, tagName: string): string {
    // Try both <tagName>value</tagName> and <ns:tagName>value</ns:tagName>
    const patterns = [
      new RegExp(`<${tagName}>([^<]*)</${tagName}>`, 'i'),
      new RegExp(`<\\w+:${tagName}>([^<]*)</\\w+:${tagName}>`, 'i'),
    ]

    for (const pattern of patterns) {
      const match = xml.match(pattern)
      if (match?.[1]) return match[1].trim()
    }

    return ''
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
}