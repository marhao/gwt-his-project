import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import VisitOrchestrator, { VisitValidationError } from '#services/visit_orchestrator'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Validators (Vine — Adonis v6)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const validateVisitValidator = vine.compile(
  vine.object({
    hn: vine.string().trim().minLength(1),
    vstdate: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    vsttime: vine.string().regex(/^\d{2}:\d{2}:\d{2}$/).optional(),
    loginUser: vine.string().trim().minLength(1),
  })
)

const createVisitValidator = vine.compile(
  vine.object({
    hn: vine.string().trim().minLength(1),
    vstdate: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    vsttime: vine.string().regex(/^\d{2}:\d{2}:\d{2}$/).optional(),
    loginUser: vine.string().trim().minLength(1),

    // สิทธิ์
    pttypeRecords: vine.array(
      vine.object({
        pttype: vine.string().trim(),
        pttypeno: vine.string().optional(),
        hospmain: vine.string().optional(),
        hospsub: vine.string().optional(),
        begin_date: vine.string().nullable().optional(),
        expire_date: vine.string().nullable().optional(),
        max_debt_amount: vine.number().optional(),
        emp_id: vine.number().optional(),
        pttype_note: vine.string().optional(),
        status: vine.string().optional(),
      })
    ).optional(),

    hipRecords: vine.array(
      vine.object({
        pttype: vine.string().trim(),
        cardid: vine.string().optional(),
        hospmain: vine.string().optional(),
        hospsub: vine.string().optional(),
        datein: vine.string().nullable().optional(),
        dateexp: vine.string().nullable().optional(),
        status: vine.string().optional(),
      })
    ).optional(),

    // context
    computerDepcode: vine.string().optional(),
    computerName: vine.string().optional(),
    hospitalDepartmentId: vine.number().optional(),
    hospitalCode: vine.string().optional(),

    // confirmation flags
    skipValidation: vine.boolean().optional(),
    confirmSameDay: vine.boolean().optional(),
    confirmStatusNotOk: vine.boolean().optional(),
  })
)

const hnParamValidator = vine.compile(
  vine.object({
    params: vine.object({
      hn: vine.string().trim().minLength(1),
    }),
  })
)

const vnParamValidator = vine.compile(
  vine.object({
    params: vine.object({
      vn: vine.string().trim().minLength(1),
    }),
  })
)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Controller
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default class VisitsController {

  // ──────────────────────────────────────────────────────
  //  POST /visits/validate
  // ──────────────────────────────────────────────────────
  //
  // ตรวจสอบก่อนสร้าง visit
  //
  // Request body:
  //   { hn, vstdate, vsttime?, loginUser }
  //
  // Response:
  //   200 → { ok: true }
  //   200 → { ok: false, needConfirm: { type, message, existingVisits? } }
  //   200 → { ok: false, warnings: [...] }
  //

  async validate({ request, response }: HttpContext) {
    const payload = await request.validateUsing(validateVisitValidator)

    const orchestrator = new VisitOrchestrator()
    const result = await orchestrator.validate(payload)

    return response.ok({
      success: true,
      data: result,
    })
  }

  // ──────────────────────────────────────────────────────
  //  POST /visits
  // ──────────────────────────────────────────────────────
  //
  // สร้าง visit ใหม่ (full flow)
  //
  // Request body:
  //   { hn, vstdate, vsttime?, loginUser,
  //     pttypeRecords?, hipRecords?,
  //     computerDepcode?, computerName?,
  //     hospitalDepartmentId?, hospitalCode?,
  //     skipValidation?, confirmSameDay?, confirmStatusNotOk? }
  //
  // Response:
  //   201 → { vn, hn, vstdate, vsttime, oqueue, ... }
  //   409 → { code: 'SAME_DAY_VISIT', needConfirm: {...} }
  //   422 → { code: 'VALIDATION_FAILED', warnings: [...] }
  //

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createVisitValidator)

    const orchestrator = new VisitOrchestrator()

    try {
      const result = await orchestrator.createFullVisit(payload)

      return response.created({
        success: true,
        data: result,
      })
    } catch (err) {
      if (err instanceof VisitValidationError) {
        return this.handleValidationError(response, err)
      }
      throw err
    }
  }

  // ──────────────────────────────────────────────────────
  //  PUT /visits/:vn/use-existing
  // ──────────────────────────────────────────────────────
  //
  // ใช้ visit เดิม (same-day) แทนสร้างใหม่
  //
  // Response:
  //   200 → { vn, hn, vstdate, ... }
  //   404 → { message: 'Visit not found' }
  //

  async useExisting({ request, response }: HttpContext) {
    const { params } = await vnParamValidator.validate({
      params: request.params(),
    })

    const orchestrator = new VisitOrchestrator()

    try {
      const result = await orchestrator.useExisting(params.vn)

      return response.ok({
        success: true,
        data: result,
      })
    } catch (err: any) {
      if (err.message?.includes('not found')) {
        return response.notFound({
          success: false,
          message: 'Visit not found',
          code: 'VN_NOT_FOUND',
        })
      }
      throw err
    }
  }

  // ──────────────────────────────────────────────────────
  //  GET /patients/:hn/pttypes
  // ──────────────────────────────────────────────────────
  //
  // ดึงรายการสิทธิ์ผู้ป่วยสำหรับ UI
  //
  // Response:
  //   200 → { pttypes: [...] }
  //

  async pttypes({ request, response }: HttpContext) {
    const { params } = await hnParamValidator.validate({
      params: request.params(),
    })

    const orchestrator = new VisitOrchestrator()
    const pttypes = await orchestrator.getPatientPttypes(params.hn)

    return response.ok({
      success: true,
      data: { pttypes },
    })
  }

  // ──────────────────────────────────────────────────────
  //  Error Handling
  // ──────────────────────────────────────────────────────

  private handleValidationError(response: any, err: VisitValidationError) {
    switch (err.code) {
      case 'SAME_DAY_VISIT':
        // 409 Conflict — ต้อง confirm
        return response.conflict({
          success: false,
          code: err.code,
          message: err.message,
          needConfirm: err.validation.needConfirm,
        })

      case 'STATUS_NOT_OK':
        // 409 Conflict — ต้อง confirm
        return response.conflict({
          success: false,
          code: err.code,
          message: err.message,
          needConfirm: err.validation.needConfirm,
        })

      case 'VALIDATION_FAILED':
        // 422 Unprocessable — ไม่สามารถสร้างได้
        return response.unprocessableEntity({
          success: false,
          code: err.code,
          message: err.message,
          warnings: err.validation.warnings,
        })

      default:
        return response.internalServerError({
          success: false,
          code: 'UNKNOWN_ERROR',
          message: err.message,
        })
    }
  }
}