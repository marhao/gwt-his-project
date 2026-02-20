import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NhsoAuthCodeService
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Source: @Patientopdvisitlistformunit
//         @TPatientOPDVisitListForm
//         @AuthCodeNHSOAgent1Click$qqrp14System@TObject
//
// Batch job ดึง auth_code จาก NHSO REST API
// สำหรับ visit ที่ยังไม่มี auth_code
//
// Endpoint:
//   https://authenucws.nhso.go.th
//     /authencodestatus/api/check-authen-status
//     ?personalId={cid}&serviceDate={vstdate}
//
// Flow:
//   1. ดึง API Token จาก hos_variable
//   2. Query visit ที่ยังไม่มี auth_code
//   3. Loop แต่ละ visit → call NHSO API
//   4. Parse JSON → match hospitalCode + serviceDate
//   5. UPDATE visit_pttype SET auth_code
//
// Tables:
//   READ:  ovst, patient, visit_pttype, pttype, hos_variable
//   WRITE: visit_pttype (auth_code)
//

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface NhsoAuthCodeParams {
  /** Query filter — ดึง visit ตาม conditions */
  vstdateFrom?: string                  // yyyy-MM-dd
  vstdateTo?: string                    // yyyy-MM-dd
  hn?: string                           // เจาะจง HN
  vn?: string                           // เจาะจง VN
  /** Rate limit delay (ms) — default 1000 */
  delayMs?: number
  /** Max records to process — default unlimited */
  maxRecords?: number
}

export interface NhsoAuthCodeResult {
  totalProcessed: number
  totalUpdated: number
  totalSkipped: number
  totalErrors: number
  errors: AuthCodeError[]
}

export interface AuthCodeError {
  vn: string
  hn: string
  cid: string
  error: string
}

/** NHSO API response */
interface NhsoApiResponse {
  success: boolean
  results?: string                      // JSON string ซ้อน!
  message?: string
}

/** NHSO result item (หลัง parse results) */
interface NhsoResultItem {
  hospitalCode?: string
  serviceDate?: string                  // "2024-01-15T00:00:00"
  authCode?: string
  [key: string]: any
}

/** Visit record สำหรับ processing */
interface VisitRecord {
  vn: string
  hn: string
  cid: string
  vstdate: string                       // yyyy-MM-dd
  pttype: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Service
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default class NhsoAuthCodeService {

  private static readonly NHSO_HOST = 'authenucws.nhso.go.th'
  private static readonly NHSO_PATH = '/authencodestatus/api/check-authen-status'
  private static readonly DEFAULT_DELAY_MS = 1000
  private static readonly REQUEST_TIMEOUT_MS = 5000

  // ──────────────────────────────────────────────────────
  //  Main Entry
  // ──────────────────────────────────────────────────────

  /**
   * Batch fetch auth_code จาก NHSO API
   * แล้ว update visit_pttype
   */
  public async execute(params: NhsoAuthCodeParams): Promise<NhsoAuthCodeResult> {

    const result: NhsoAuthCodeResult = {
      totalProcessed: 0,
      totalUpdated: 0,
      totalSkipped: 0,
      totalErrors: 0,
      errors: [],
    }

    // 1. ดึง API Token
    const apiToken = await this.getApiToken()
    if (!apiToken) {
      throw new Error(
        'NHSO API Token not configured. ' +
        'Set NHSO-13FILE-FEE-SCHEDULE-API-TOKEN in hos_variable.'
      )
    }

    // 2. ดึง hospital code
    const hospitalCode = await this.getHospitalCode()
    if (!hospitalCode) {
      throw new Error('Hospital code not configured (fhospitalcode).')
    }

    // 3. Query visits ที่ยังไม่มี auth_code
    const visits = await this.getVisitsWithoutAuthCode(params)

    const delayMs = params.delayMs ?? NhsoAuthCodeService.DEFAULT_DELAY_MS
    const maxRecords = params.maxRecords ?? visits.length

    // 4. Loop แต่ละ visit
    for (let i = 0; i < Math.min(visits.length, maxRecords); i++) {
      const visit = visits[i]
      result.totalProcessed++

      try {
        // 4.1: Validate CID
        if (!this.isValidCid(visit.cid)) {
          result.totalSkipped++
          continue
        }

        // 4.2: Rate limit delay (ยกเว้นตัวแรก)
        if (i > 0 && delayMs > 0) {
          await this.delay(delayMs)
        }

        // 4.3: Call NHSO API
        const apiResponse = await this.callNhsoApi(
          visit.cid, visit.vstdate, apiToken
        )

        // 4.4: Parse + find matching record
        const authCode = this.extractAuthCode(
          apiResponse, hospitalCode, visit.vstdate
        )

        if (!authCode) {
          result.totalSkipped++
          continue
        }

        // 4.5: UPDATE visit_pttype
        await this.updateAuthCode(visit, authCode)
        result.totalUpdated++

      } catch (err: any) {
        result.totalErrors++
        result.errors.push({
          vn: visit.vn,
          hn: visit.hn,
          cid: visit.cid,
          error: err.message || String(err),
        })

        // API error → delay ก่อน retry ตัวถัดไป
        if (delayMs > 0) {
          await this.delay(delayMs)
        }
      }
    }

    return result
  }

  // ──────────────────────────────────────────────────────
  //  Single VN — ดึง auth_code สำหรับ visit เดียว
  // ──────────────────────────────────────────────────────

  /**
   * ดึง auth_code สำหรับ VN เดียว
   * เรียกจาก controller/route แยก
   */
  public async fetchForVn(vn: string): Promise<{
    authCode: string | null
    updated: boolean
    error?: string
  }> {

    const apiToken = await this.getApiToken()
    if (!apiToken) {
      return { authCode: null, updated: false, error: 'API Token not configured' }
    }

    const hospitalCode = await this.getHospitalCode()
    if (!hospitalCode) {
      return { authCode: null, updated: false, error: 'Hospital code not configured' }
    }

    // ดึง visit info
    const visit = await this.getVisitInfo(vn)
    if (!visit) {
      return { authCode: null, updated: false, error: 'Visit not found' }
    }

    if (!this.isValidCid(visit.cid)) {
      return { authCode: null, updated: false, error: `CID Invalid: ${visit.cid}` }
    }

    // ตรวจว่ามี auth_code อยู่แล้วหรือยัง
    const existing = await db.from('visit_pttype')
      .where('vn', vn)
      .whereNotNull('auth_code')
      .where('auth_code', '!=', '')
      .first()

    if (existing) {
      return { authCode: existing.auth_code, updated: false }
    }

    try {
      const apiResponse = await this.callNhsoApi(
        visit.cid, visit.vstdate, apiToken
      )

      const authCode = this.extractAuthCode(
        apiResponse, hospitalCode, visit.vstdate
      )

      if (!authCode) {
        return { authCode: null, updated: false, error: 'No matching auth code found' }
      }

      await this.updateAuthCode(visit, authCode)
      return { authCode, updated: true }

    } catch (err: any) {
      return { authCode: null, updated: false, error: err.message }
    }
  }

  // ──────────────────────────────────────────────────────
  //  Query: visits ที่ยังไม่มี auth_code
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   dataset loop → FieldByName("cid"), FieldByName("auth_code")
  //   skip if auth_code not empty
  //

  private async getVisitsWithoutAuthCode(
    params: NhsoAuthCodeParams
  ): Promise<VisitRecord[]> {

    const query = db.from('ovst as v')
      .join('patient as p', 'p.hn', 'v.hn')
      .join('visit_pttype as vp', 'vp.vn', 'v.vn')
      .where((q) => {
        q.whereNull('vp.auth_code')
          .orWhere('vp.auth_code', '')
      })
      .select(
        'v.vn',
        'v.hn',
        'p.cid',
        'v.vstdate',
        'vp.pttype'
      )

    // Filters
    if (params.vn) {
      query.where('v.vn', params.vn)
    }
    if (params.hn) {
      query.where('v.hn', params.hn)
    }
    if (params.vstdateFrom) {
      query.where('v.vstdate', '>=', params.vstdateFrom)
    }
    if (params.vstdateTo) {
      query.where('v.vstdate', '<=', params.vstdateTo)
    }

    // สิทธิ์ที่ต้องเบิก NHSO เท่านั้น (pttype_number=1)
    query.where('vp.pttype_number', 1)

    query.orderBy('v.vstdate', 'asc').orderBy('v.vn', 'asc')

    if (params.maxRecords) {
      query.limit(params.maxRecords)
    }

    const rows = await query

    return rows.map((r: any) => ({
      vn: r.vn,
      hn: r.hn,
      cid: r.cid || '',
      vstdate: this.formatDate(r.vstdate),
      pttype: r.pttype || '',
    }))
  }

  /**
   * ดึง visit info สำหรับ single VN
   */
  private async getVisitInfo(vn: string): Promise<VisitRecord | null> {
    const row = await db.from('ovst as v')
      .join('patient as p', 'p.hn', 'v.hn')
      .join('visit_pttype as vp', 'vp.vn', 'v.vn')
      .where('vp.pttype_number', 1)
      .where('v.vn', vn)
      .select('v.vn', 'v.hn', 'p.cid', 'v.vstdate', 'vp.pttype')
      .first()

    if (!row) return null

    return {
      vn: row.vn,
      hn: row.hn,
      cid: row.cid || '',
      vstdate: this.formatDate(row.vstdate),
      pttype: row.pttype || '',
    }
  }

  // ──────────────────────────────────────────────────────
  //  NHSO REST API Call
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   GetCurlWithContentType(
  //     "authenucws.nhso.go.th",
  //     path + "?personalId={cid}&serviceDate={vstdate}",
  //     "application/json",
  //     timeout=5000, readTimeout=600000
  //   )
  //

  private async callNhsoApi(
    cid: string,
    vstdate: string,
    apiToken: string
  ): Promise<NhsoApiResponse> {

    const shortCid = this.makeShortCid(cid)
    const url = `https://${NhsoAuthCodeService.NHSO_HOST}`
      + `${NhsoAuthCodeService.NHSO_PATH}`
      + `?personalId=${encodeURIComponent(shortCid)}`
      + `&serviceDate=${encodeURIComponent(vstdate)}`

    const controller = new AbortController()
    const timeout = setTimeout(
      () => controller.abort(),
      NhsoAuthCodeService.REQUEST_TIMEOUT_MS
    )

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`,
        },
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`NHSO API HTTP ${response.status}: ${response.statusText}`)
      }

      const body = await response.text()

      // ตรวจ valid JSON
      let parsed: any
      try {
        parsed = JSON.parse(body)
      } catch {
        throw new Error(`NHSO API returned invalid JSON: ${body.substring(0, 200)}`)
      }

      return parsed as NhsoApiResponse

    } finally {
      clearTimeout(timeout)
    }
  }

  // ──────────────────────────────────────────────────────
  //  Parse Response + Extract AuthCode
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   json = _Json(response)
  //   IF !json.success → skip
  //   resultsJson = _Json(json.results)    // ซ้อน!
  //   FOR i = 0 TO resultsJson.count - 1:
  //     IF record.hospitalCode == fhospitalcode
  //     AND FormatDateTime(record.serviceDate) == vstdate
  //     → return record.authCode
  //

  private extractAuthCode(
    apiResponse: NhsoApiResponse,
    hospitalCode: string,
    vstdate: string                       // yyyy-MM-dd
  ): string | null {

    // ตรวจ success
    if (!apiResponse.success) {
      return null
    }

    // results อาจเป็น string (JSON ซ้อน) หรือ array
    let results: NhsoResultItem[]

    if (!apiResponse.results) {
      return null
    }

    if (typeof apiResponse.results === 'string') {
      try {
        results = JSON.parse(apiResponse.results)
      } catch {
        return null
      }
    } else {
      results = apiResponse.results as unknown as NhsoResultItem[]
    }

    if (!Array.isArray(results) || results.length === 0) {
      return null
    }

    // วนหา record ที่ match hospitalCode + serviceDate
    for (const item of results) {
      // ตรวจ hospitalCode
      if (item.hospitalCode !== hospitalCode) {
        continue
      }

      // ตรวจ serviceDate
      // Source format: "2024-01-15T00:00:00"
      // → StrYYYYMMDDTHHNNSSToDateTime → FormatDateTime("yyyy-mm-dd")
      const itemDate = this.parseServiceDate(item.serviceDate || '')
      if (itemDate !== vstdate) {
        continue
      }

      // Match! → return authCode
      const authCode = item.authCode || ''
      if (authCode) {
        return authCode
      }
    }

    return null
  }

  // ──────────────────────────────────────────────────────
  //  UPDATE visit_pttype
  // ──────────────────────────────────────────────────────
  //
  // Source:
  //   ExecuteSQL("UPDATE visit_pttype
  //     SET auth_code = '{authCode}'
  //     WHERE vn = '{vn}'
  //     AND pttype = '{pttype}'")
  //
  // กรณีมีหลาย visit_pttype → วนทุก pttype ที่มีในตาราง pttype
  //

  private async updateAuthCode(
    visit: VisitRecord,
    authCode: string
  ): Promise<void> {

    if (visit.pttype) {
      // มี pttype เจาะจง → update ตรง
      await db.from('visit_pttype')
        .where('vn', visit.vn)
        .where('pttype', visit.pttype)
        .update({ auth_code: authCode })
    } else {
      // ไม่มี pttype → update ทุก visit_pttype ที่มี pttype valid
      //
      // Source: loop visit_pttype records
      //   SELECT count(*) FROM pttype WHERE pttype = ?
      //   → if > 0 → UPDATE
      //
      await db.from('visit_pttype')
        .where('vn', visit.vn)
        .whereIn('pttype', function (p) {
          p.select('pttype').from('pttype').where('isuse', 'Y')
        })
        .update({ auth_code: authCode })
    }
  }

  // ──────────────────────────────────────────────────────
  //  Config Helpers
  // ──────────────────────────────────────────────────────

  /**
   * ดึง API Token จาก hos_variable
   *
   * Source: GetHOSVariable("NHSO-13FILE-FEE-SCHEDULE-API-TOKEN")
   */
  private async getApiToken(): Promise<string | null> {
    const row = await db.from('hos_variable')
      .where('variable_name', 'NHSO-13FILE-FEE-SCHEDULE-API-TOKEN')
      .select('variable_value')
      .first()

    const token = (row?.variable_value || '').trim()
    return token || null
  }

  /**
   * ดึง hospital code
   *
   * Source: fhospitalcode (global variable)
   */
  private async getHospitalCode(): Promise<string | null> {
    // ดึงจาก hos_variable หรือ opdconfig
    const row = await db.from('opdconfig')
      .where('name', 'hospitalcode')
      .select('value')
      .first()

    const code = (row?.value || '').trim()
    return code || null
  }

  // ──────────────────────────────────────────────────────
  //  Utility
  // ──────────────────────────────────────────────────────

  /**
   * Validate CID (เลขบัตรประชาชน 13 หลัก)
   *
   * Source: CheckPID(cid)
   */
  private isValidCid(cid: string): boolean {
    if (!cid) return false

    // ลบ whitespace + ขีด
    const cleaned = cid.replace(/[\s-]/g, '')

    // ต้องเป็นตัวเลข 13 หลัก
    if (!/^\d{13}$/.test(cleaned)) return false

    // Check digit (mod 11)
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += Number(cleaned[i]) * (13 - i)
    }
    const checkDigit = (11 - (sum % 11)) % 10
    return checkDigit === Number(cleaned[12])
  }

  /**
   * MakeShortCID — ตัด leading zeros (ถ้ามี)
   *
   * Source: @Hosxpdmu@MakeShortCID
   */
  private makeShortCid(cid: string): string {
    return cid.replace(/[\s-]/g, '').replace(/^0+/, '') || cid
  }

  /**
   * Parse serviceDate จาก NHSO response
   * Input:  "2024-01-15T00:00:00" หรือ "25670115" (Thai)
   * Output: "2024-01-15"
   *
   * Source: StrYYYYMMDDTHHNNSSToDateTime → FormatDateTime("yyyy-mm-dd")
   */
  private parseServiceDate(dateStr: string): string {
    if (!dateStr) return ''

    // ISO format: "2024-01-15T00:00:00"
    if (dateStr.includes('T')) {
      const dt = DateTime.fromISO(dateStr)
      if (dt.isValid) {
        return dt.toFormat('yyyy-MM-dd')
      }
    }

    // Thai Buddhist year: "25670115" → 2024-01-15
    if (/^\d{8}$/.test(dateStr)) {
      const thaiYear = Number(dateStr.substring(0, 4))
      const month = dateStr.substring(4, 6)
      const day = dateStr.substring(6, 8)
      const ceYear = thaiYear - 543
      return `${ceYear}-${month}-${day}`
    }

    // yyyy-MM-dd already
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr
    }

    return ''
  }

  /**
   * Format date จาก DB value → yyyy-MM-dd string
   */
  private formatDate(dateVal: any): string {
    if (!dateVal) return ''

    if (dateVal instanceof Date) {
      return DateTime.fromJSDate(dateVal).toFormat('yyyy-MM-dd')
    }

    const str = String(dateVal)
    if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
      return str.substring(0, 10)
    }

    return str
  }

  /**
   * Async delay — rate limiting
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}