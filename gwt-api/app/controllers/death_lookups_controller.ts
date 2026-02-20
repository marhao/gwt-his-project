import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DeathLookupsController {
  /**
   * GET /api/v1/lookups/deaths
   */
  async index({ response }: HttpContext) {
    try {
      const [deathPlaces, deathSources, newbornDeathCauses] = await Promise.all([
        db.from('death_place').select('*').orderBy('id'),
        db.from('death_source').select('*').orderBy('id'),
        db.from('newborn_death_cause').select('*').orderBy('id'),
      ])

      return response.ok({
        success: true,
        data: {
          deathPlaces,
          deathSources,
          newbornDeathCauses,
        },
      })
    } catch (error) {
      console.error('Error fetching death lookups:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch death lookups',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/lookups/icd10?q=A09&limit=20
   */
  async icd10({ request, response }: HttpContext) {
    try {
      const q = request.input('q', '').trim()
      const limit = request.input('limit', 20)

      if (q.length < 1) {
        return response.ok({ success: true, data: [] })
      }

      const results = await db
        .from('icd101')
        .select('code', 'name', 'tname')
        .where('code', 'like', `${q}%`)
        .orWhere('name', 'like', `%${q}%`)
        .orWhere('tname', 'like', `%${q}%`)
        .orderBy('code')
        .limit(limit)

      return response.ok({
        success: true,
        data: results,
      })
    } catch (error) {
      console.error('Error searching ICD-10:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to search ICD-10',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/lookups/doctors?q=สมชาย&limit=20
   */
  async doctors({ request, response }: HttpContext) {
    try {
      const q = request.input('q', '').trim()
      const limit = request.input('limit', 20)

      if (q.length < 1) {
        return response.ok({ success: true, data: [] })
      }

      const results = await db
        .from('doctor')
        .select('code', 'name', 'license_no')
        .where('code', 'like', `${q}%`)
        .orWhere('name', 'like', `%${q}%`)
        .orderBy('name')
        .limit(limit)

      return response.ok({
        success: true,
        data: results,
      })
    } catch (error) {
      console.error('Error searching doctors:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to search doctors',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/lookups/patients?q=12345&limit=20
   */
  async patients({ request, response }: HttpContext) {
    try {
      const q = request.input('q', '').trim()
      const limit = request.input('limit', 20)

      if (q.length < 1) {
        return response.ok({ success: true, data: [] })
      }

      const results = await db
        .from('patient')
        .select('hn', 'cid', 'fname', 'lname')
        .where('hn', 'like', `${q}%`)
        .orWhere('cid', 'like', `${q}%`)
        .orWhere('fname', 'like', `%${q}%`)
        .orWhere('lname', 'like', `%${q}%`)
        .orderBy('hn')
        .limit(limit)

      return response.ok({
        success: true,
        data: results,
      })
    } catch (error) {
      console.error('Error searching patients:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to search patients',
        error: error.message,
      })
    }
  }
}