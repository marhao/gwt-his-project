import NewVisitService, {
    type ValidateVisitParams,
    type VisitValidationResult,
    type CreateVisitParams,
    type CreateVisitResult,
    type PttypeRecord,
    type HipRecord,
  } from '#services/new_visit_service'
  
  import DoSaveVisitService, {
    type DoSaveVisitParams,
    type DoSaveVisitResult,
  } from '#services/do_save_visit_service'
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // VisitOrchestrator
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //
  // รวม flow ทั้งหมดของการลงทะเบียน visit:
  //
  //   API 1: POST /visits/validate
  //     → validateVisit()  → ตรวจ hn, ซ้ำ, สถานะ
  //
  //   API 2: POST /visits
  //     → createVisit()    → VN gen + INSERT ovst/ovst_seq/opdscreen/visit_pttype
  //     → doSaveVisit()    → oqueue, auto charge, opd_dep_queue, vn_stat, etc.
  //
  //   API 3: PUT /visits/:vn/use-existing
  //     → useExistingVisit() → ใช้ visit เดิม (same-day)
  //
  //   API 4: GET /patients/:hn/pttypes
  //     → getPatientPttypes() → ดึงสิทธิ์สำหรับ UI
  //
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Types
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /** Input สำหรับ full create (API 2) */
  export interface FullCreateVisitInput {
    hn: string
    vstdate: string                       // yyyy-MM-dd
    vsttime?: string                      // HH:mm:ss (optional, default server time)
    loginUser: string
  
    // สิทธิ์
    pttypeRecords?: PttypeRecord[]
    hipRecords?: HipRecord[]
  
    // context เครื่อง/แผนก
    computerDepcode?: string
    computerName?: string
    hospitalDepartmentId?: number
    hospitalCode?: string
  
    // skip validation (เมื่อ user confirm แล้ว)
    skipValidation?: boolean
    confirmSameDay?: boolean              // ยืนยันสร้างซ้ำวันเดียวกัน
    confirmStatusNotOk?: boolean          // ยืนยันสถานะไม่ปกติ
  }
  
  /** Output รวมผลลัพธ์ทั้ง create + doSave */
  export interface FullCreateVisitResult {
    // จาก createVisit
    vn: string
    hn: string
    vstdate: string
    vsttime: string
    ovstId: number
    hosGuid: string
    labOrdersCreated: number
  
    // จาก doSaveVisit
    oqueue: number
    mainDepQueue: number
    opdDepQueueId: number
    autoChargeCount: number
    otChargeInserted: boolean
  
    warnings: string[]
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Orchestrator
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  export default class VisitOrchestrator {
  
    private newVisitService: NewVisitService
    private doSaveVisitService: DoSaveVisitService
  
    constructor() {
      this.newVisitService = new NewVisitService()
      this.doSaveVisitService = new DoSaveVisitService()
    }
  
    // ──────────────────────────────────────────────────────
    //  API 1: Validate Visit
    // ──────────────────────────────────────────────────────
    //
    // POST /visits/validate
    // ตรวจสอบก่อนสร้าง — ถ้ามี needConfirm ต้องให้ user ยืนยัน
    //
  
    public async validate(
      params: ValidateVisitParams
    ): Promise<VisitValidationResult> {
  
      return this.newVisitService.validateVisit(params)
    }
  
    // ──────────────────────────────────────────────────────
    //  API 2: Create Visit (full flow)
    // ──────────────────────────────────────────────────────
    //
    // POST /visits
    //
    // Flow:
    //   1. validateVisit()          — ตรวจ hn, ซ้ำ, สถานะ
    //   2. createVisit()            — VN gen + INSERT ทุกตาราง
    //   3. doSaveVisit.execute()    — post-processing (oqueue, charge, queue)
    //
  
    public async createFullVisit(
      input: FullCreateVisitInput
    ): Promise<FullCreateVisitResult> {
  
      // ─── Step 1: Validation (ถ้ายังไม่ skip) ─────────
      if (!input.skipValidation) {
        const validation = await this.newVisitService.validateVisit({
          hn: input.hn,
          vstdate: input.vstdate,
          vsttime: input.vsttime,
          loginUser: input.loginUser,
        })
  
        if (!validation.ok) {
          // มี needConfirm — ตรวจว่า user ยืนยันแล้วหรือยัง
          if (validation.needConfirm) {
            const { type } = validation.needConfirm
  
            if (type === 'same_day_visit' && !input.confirmSameDay) {
              throw new VisitValidationError(
                'SAME_DAY_VISIT',
                validation.needConfirm.message,
                validation
              )
            }
  
            if (type === 'status_not_ok' && !input.confirmStatusNotOk) {
              throw new VisitValidationError(
                'STATUS_NOT_OK',
                validation.needConfirm.message,
                validation
              )
            }
          } else {
            // ไม่ผ่าน validation จริง ๆ (เช่น patient ไม่มี, เสียชีวิต)
            throw new VisitValidationError(
              'VALIDATION_FAILED',
              validation.warnings.join('; '),
              validation
            )
          }
        }
      }
  
      // ─── Step 2: Create Visit ────────────────────────
      const createParams: CreateVisitParams = {
        hn: input.hn,
        vstdate: input.vstdate,
        vsttime: input.vsttime,
        loginUser: input.loginUser,
        pttypeRecords: input.pttypeRecords,
        hipRecords: input.hipRecords,
        computerDepcode: input.computerDepcode,
        computerName: input.computerName,
        hospitalDepartmentId: input.hospitalDepartmentId,
        hospitalCode: input.hospitalCode,
      }
  
      const createResult: CreateVisitResult = await this.newVisitService.createVisit(createParams)
  
      // ─── Step 3: Do Save Visit (post-processing) ────
      const doSaveParams: DoSaveVisitParams = {
        vn: createResult.vn,
        hn: createResult.hn,
        vstdate: createResult.vstdate,
        vsttime: createResult.vsttime,
        loginUser: input.loginUser,
        computerDepcode: input.computerDepcode || '',
        computerName: input.computerName || '',
        hospitalDepartmentId: input.hospitalDepartmentId || 0,
        hospitalCode: input.hospitalCode || '',
      }
  
      const saveResult: DoSaveVisitResult = await this.doSaveVisitService.execute(doSaveParams)
  
      // ─── Combine results ────────────────────────────
      return {
        vn: createResult.vn,
        hn: createResult.hn,
        vstdate: createResult.vstdate,
        vsttime: createResult.vsttime,
        ovstId: createResult.ovstId,
        hosGuid: createResult.hosGuid,
        labOrdersCreated: createResult.labOrdersCreated || 0,
  
        oqueue: saveResult.oqueue,
        mainDepQueue: saveResult.mainDepQueue,
        opdDepQueueId: saveResult.opdDepQueueId,
        autoChargeCount: saveResult.autoChargeCount,
        otChargeInserted: saveResult.otChargeInserted,
  
        warnings: createResult.warnings || [],
      }
    }
  
    // ──────────────────────────────────────────────────────
    //  API 3: Use Existing Visit
    // ──────────────────────────────────────────────────────
    //
    // PUT /visits/:vn/use-existing
    // เมื่อ user เลือกใช้ visit เดิมแทนสร้างใหม่ (same-day)
    //
  
    public async useExisting(vn: string): Promise<CreateVisitResult> {
      return this.newVisitService.useExistingVisit(vn)
    }
  
    // ──────────────────────────────────────────────────────
    //  API 4: Get Patient Pttypes
    // ──────────────────────────────────────────────────────
    //
    // GET /patients/:hn/pttypes
    // ดึงสิทธิ์สำหรับ UI เลือกก่อนสร้าง visit
    //
  
    public async getPatientPttypes(hn: string): Promise<PttypeRecord[]> {
      return this.newVisitService.getPatientPttypes(hn)
    }
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Custom Error
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  export type VisitErrorCode =
    | 'SAME_DAY_VISIT'
    | 'STATUS_NOT_OK'
    | 'VALIDATION_FAILED'
  
  export class VisitValidationError extends Error {
    public code: VisitErrorCode
    public validation: VisitValidationResult
  
    constructor(code: VisitErrorCode, message: string, validation: VisitValidationResult) {
      super(message)
      this.name = 'VisitValidationError'
      this.code = code
      this.validation = validation
    }
  }