import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Death from '#models/death'
import db from '@adonisjs/lucid/services/db'
import { storeDeathValidator, updateDeathValidator } from '#validators/death'

const DATE_FIELDS = [
  'deathDate',
  'deathDiagDate1',
  'deathDiagDate2',
  'deathDiagDate3',
  'deathDiagDate4',
  'deathCertDate',
] as const

/**
 * Helper: convert date values to Luxon DateTime
 * VineJS vine.date() outputs JS Date objects, Lucid @column.date() expects Luxon DateTime
 */
function convertDatesToLuxon(payload: Record<string, any>) {
  for (const field of DATE_FIELDS) {
    const val = payload[field]
    if (!val) continue
    if (val instanceof DateTime) continue
    if (val instanceof Date) {
      payload[field] = DateTime.fromJSDate(val)
    } else if (typeof val === 'string') {
      payload[field] = DateTime.fromISO(val)
    }
  }
  return payload
}

/**
 * Helper: lookup doctor name by code
 */
async function getDoctorName(code: string | null): Promise<string | null> {
  if (!code) return null
  const row = await db.from('doctor').select('name').where('code', code).first()
  return row?.name || null
}

/**
 * Helper: serialize death record + append doctor name
 */
async function serializeWithDoctor(death: Death) {
  const data = death.serialize()
  data.deathCertDoctorName = await getDoctorName(death.deathCertDoctor)
  return data
}

export default class DeathsController {
  /**
   * GET /api/v1/deaths
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const perPage = request.input('perPage', 20)
      const hn = request.input('hn')
      const cid = request.input('cid')
      const deathDateFrom = request.input('deathDateFrom')
      const deathDateTo = request.input('deathDateTo')

      const query = Death.query().orderBy('death_date', 'desc')

      if (hn) {
        query.where('hn', hn)
      }
      if (cid) {
        query.where('cid', cid)
      }
      if (deathDateFrom) {
        query.where('death_date', '>=', deathDateFrom)
      }
      if (deathDateTo) {
        query.where('death_date', '<=', deathDateTo)
      }

      const deaths = await query.paginate(page, perPage)

      // Collect unique doctor codes
      const doctorCodes = [
        ...new Set(
          deaths.all()
            .map((d) => d.deathCertDoctor)
            .filter(Boolean) as string[]
        ),
      ]

      // Batch lookup doctor names
      let doctorMap: Record<string, string> = {}
      if (doctorCodes.length > 0) {
        const doctors = await db
          .from('doctor')
          .select('code', 'name')
          .whereIn('code', doctorCodes)
        doctorMap = Object.fromEntries(doctors.map((d) => [d.code, d.name]))
      }

      // Serialize with doctor names
      const serialized = deaths.serialize()
      serialized.data = serialized.data.map((item: any) => ({
        ...item,
        deathCertDoctorName: doctorMap[item.deathCertDoctor] || null,
      }))

      return response.ok({
        success: true,
        data: serialized,
      })
    } catch (error) {
      console.error('Error fetching deaths:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch deaths',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/deaths/:id
   */
  async show({ params, response }: HttpContext) {
    try {
      const death = await Death.find(params.id)

      if (!death) {
        return response.notFound({
          success: false,
          message: 'Death record not found',
        })
      }

      const data = await serializeWithDoctor(death)

      return response.ok({
        success: true,
        data,
      })
    } catch (error) {
      console.error('Error fetching death:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch death record',
        error: error.message,
      })
    }
  }

  /**
   * POST /api/v1/deaths
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload: any = await request.validateUsing(storeDeathValidator)
      convertDatesToLuxon(payload)
      const death = await Death.create(payload)

      const data = await serializeWithDoctor(death)

      return response.created({
        success: true,
        data,
      })
    } catch (error) {
      console.error('Error creating death:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to create death record',
        error: error.message,
      })
    }
  }

  /**
   * PUT /api/v1/deaths/:id
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const death = await Death.find(params.id)

      if (!death) {
        return response.notFound({
          success: false,
          message: 'Death record not found',
        })
      }

      const payload: any = await request.validateUsing(updateDeathValidator)
      convertDatesToLuxon(payload)
      death.merge(payload)
      await death.save()

      const data = await serializeWithDoctor(death)

      return response.ok({
        success: true,
        data,
      })
    } catch (error) {
      console.error('Error updating death:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to update death record',
        error: error.message,
      })
    }
  }

  /**
   * DELETE /api/v1/deaths/:id
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const death = await Death.find(params.id)

      if (!death) {
        return response.notFound({
          success: false,
          message: 'Death record not found',
        })
      }

      await death.delete()

      return response.ok({
        success: true,
        message: 'Death record deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting death:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to delete death record',
        error: error.message,
      })
    }
  }
}