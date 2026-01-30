// app/controllers/lookups_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class LookupsController {
  /**
   * @pnames
   * @summary Get name prefixes (คำนำหน้าชื่อ)
   * @paramQuery sex - Filter by sex (M/F)
   * @responseBody 200 - Returns list of name prefixes
   */
  async pnames({ request, response }: HttpContext) {
    try {
      const sex = request.input('sex', '')

      let query = db.from('pname').select(['name', 'ename', 'sex', 'provis_code']).orderBy('name')

      if (sex) {
        query = query.where('sex', sex)
      }

      const data = await query

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.name,
          name: item.name,
          ename: item.ename,
          sex: item.sex,
        })),
      })
    } catch (error) {
      console.error('Error fetching pnames:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch name prefixes',
        error: error.message,
      })
    }
  }

  /**
   * @occupations
   * @summary Get occupations (อาชีพ)
   * @responseBody 200 - Returns list of occupations
   */
  async occupations({ response }: HttpContext) {
    try {
      const data = await db
        .from('occupation')
        .select(['occupation', 'name'])
        .whereNotNull('name')
        .orderBy('name')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.occupation,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching occupations:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch occupations',
        error: error.message,
      })
    }
  }

  /**
   * @nationalities
   * @summary Get nationalities (เชื้อชาติ/สัญชาติ)
   * @responseBody 200 - Returns list of nationalities
   */
  async nationalities({ response }: HttpContext) {
    try {
      const data = await db
        .from('nationality')
        .select(['nationality', 'name'])
        .whereNotNull('name')
        .orderBy('name')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.nationality,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching nationalities:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch nationalities',
        error: error.message,
      })
    }
  }

  /**
   * @religions
   * @summary Get religions (ศาสนา)
   * @responseBody 200 - Returns list of religions
   */
  async religions({ response }: HttpContext) {
    try {
      const data = await db
        .from('religion')
        .select(['religion', 'name'])
        .whereNotNull('name')
        .orderBy('name')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.religion,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching religions:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch religions',
        error: error.message,
      })
    }
  }

  /**
   * @marryStatuses
   * @summary Get marital statuses (สถานะสมรส)
   * @responseBody 200 - Returns list of marital statuses
   */
  async marryStatuses({ response }: HttpContext) {
    try {
      const data = await db
        .from('marrystatus')
        .select(['code', 'name'])
        .whereNotNull('name')
        .orderBy('code')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.code,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching marital statuses:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch marital statuses',
        error: error.message,
      })
    }
  }

  /**
   * @educations
   * @summary Get education levels (การศึกษา)
   * @responseBody 200 - Returns list of education levels
   */
  async educations({ response }: HttpContext) {
    try {
      const data = await db
        .from('education')
        .select(['education', 'name'])
        .whereNotNull('name')
        .orderBy('education')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.education,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching education levels:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch education levels',
        error: error.message,
      })
    }
  }

  /**
   * @pttypes
   * @summary Get patient types / rights (สิทธิการรักษา)
   * @paramQuery active - Filter only active (isuse=Y)
   * @responseBody 200 - Returns list of patient types
   */
  async pttypes({ request, response }: HttpContext) {
    try {
      const active = request.input('active', 'true')

      let query = db.from('pttype').select(['pttype', 'name', 'isuse', 'pcode', 'nhso_code']).orderBy('pttype')

      if (active === 'true') {
        query = query.where('isuse', 'Y')
      }

      const data = await query

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.pttype,
          name: item.name,
          is_active: item.isuse === 'Y',
          pcode: item.pcode,
          nhso_code: item.nhso_code,
        })),
      })
    } catch (error) {
      console.error('Error fetching patient types:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch patient types',
        error: error.message,
      })
    }
  }

  /**
   * @relationTypes
   * @summary Get relation types (ความสัมพันธ์)
   * @responseBody 200 - Returns list of relation types
   */
  async relationTypes({ response }: HttpContext) {
    try {
      const data = await db
        .from('patient_relation_type')
        .select(['patient_relation_type_id', 'patient_relation_type_name'])
        .orderBy('patient_relation_type_id')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.patient_relation_type_id,
          name: item.patient_relation_type_name,
        })),
      })
    } catch (error) {
      console.error('Error fetching relation types:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch relation types',
        error: error.message,
      })
    }
  }

  // =========================================
  // Thai Address Lookups
  // =========================================

  /**
   * @provinces
   * @summary Get provinces (จังหวัด)
   * @responseBody 200 - Returns list of provinces
   */
  async provinces({ response }: HttpContext) {
    try {
      const data = await db
        .from('thaiaddress')
        .select(['chwpart', 'name'])
        .where('codetype', '1')
        .whereNotNull('name')
        .orderBy('name')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.chwpart,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching provinces:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch provinces',
        error: error.message,
      })
    }
  }

  /**
   * @districts
   * @summary Get districts (อำเภอ) by province
   * @paramQuery chwpart - Province code
   * @responseBody 200 - Returns list of districts
   */
  async districts({ request, response }: HttpContext) {
    try {
      const chwpart = request.input('chwpart', '')

      if (!chwpart) {
        return response.badRequest({
          success: false,
          message: 'Province code (chwpart) is required',
        })
      }

      const data = await db
        .from('thaiaddress')
        .select(['amppart', 'name'])
        .where('chwpart', chwpart)
        .where('codetype', '2')
        .whereNotNull('name')
        .orderBy('name')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.amppart,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching districts:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch districts',
        error: error.message,
      })
    }
  }

  /**
   * @subdistricts
   * @summary Get subdistricts (ตำบล) by district
   * @paramQuery chwpart - Province code
   * @paramQuery amppart - District code
   * @responseBody 200 - Returns list of subdistricts
   */
  async subdistricts({ request, response }: HttpContext) {
    try {
      const chwpart = request.input('chwpart', '')
      const amppart = request.input('amppart', '')

      if (!chwpart || !amppart) {
        return response.badRequest({
          success: false,
          message: 'Province code (chwpart) and district code (amppart) are required',
        })
      }

      const data = await db
        .from('thaiaddress')
        .select(['tmbpart', 'name', 'pocode', 'full_name'])
        .where('chwpart', chwpart)
        .where('amppart', amppart)
        .where('codetype', '3')
        .whereNotNull('name')
        .orderBy('name')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.tmbpart,
          name: item.name,
          pocode: item.pocode,
          full_name: item.full_name,
        })),
      })
    } catch (error) {
      console.error('Error fetching subdistricts:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch subdistricts',
        error: error.message,
      })
    }
  }

  /**
   * @searchAddress
   * @summary Search Thai address by name
   * @paramQuery q - Search query
   * @paramQuery limit - Max results
   * @responseBody 200 - Returns matching addresses
   */
  async searchAddress({ request, response }: HttpContext) {
    try {
      const q = request.input('q', '')
      const limit = request.input('limit', 20)

      if (!q || q.length < 2) {
        return response.ok({ success: true, data: [] })
      }

      const data = await db
        .from('thaiaddress')
        .select(['addressid', 'chwpart', 'amppart', 'tmbpart', 'name', 'full_name', 'pocode', 'codetype'])
        .where('codetype', '3')
        .where((builder) => {
          builder.where('name', 'like', `%${q}%`).orWhere('full_name', 'like', `%${q}%`)
        })
        .limit(limit)

      return response.ok({
        success: true,
        data: data.map((item) => ({
          addressid: item.addressid,
          chwpart: item.chwpart,
          amppart: item.amppart,
          tmbpart: item.tmbpart,
          name: item.name,
          full_name: item.full_name,
          pocode: item.pocode,
        })),
      })
    } catch (error) {
      console.error('Error searching address:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to search address',
        error: error.message,
      })
    }
  }

  // =========================================
  // Static Lookups
  // =========================================

  /**
   * @bloodGroups
   * @summary Get blood groups
   * @responseBody 200 - Returns list of blood groups
   */
  async bloodGroups({ response }: HttpContext) {
    try {
      const data = [
        { code: 'A', name: 'A' },
        { code: 'B', name: 'B' },
        { code: 'AB', name: 'AB' },
        { code: 'O', name: 'O' },
        { code: 'Unknown', name: 'ไม่ทราบ' },
      ]

      return response.ok({ success: true, data })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch blood groups',
      })
    }
  }

  /**
   * @bloodGroupRhs
   * @summary Get Rh blood groups
   * @responseBody 200 - Returns list of Rh types
   */
  async bloodGroupRhs({ response }: HttpContext) {
    try {
      const data = [
        { code: '+', name: 'Rh+' },
        { code: '-', name: 'Rh-' },
        { code: 'Unknown', name: 'ไม่ทราบ' },
      ]

      return response.ok({ success: true, data })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch Rh blood groups',
      })
    }
  }

  /**
   * @sexes
   * @summary Get sex options
   * @responseBody 200 - Returns list of sex options
   */
  async sexes({ response }: HttpContext) {
    try {
      const data = [
        { code: '1', name: 'ชาย' },
        { code: '2', name: 'หญิง' },
      ]

      return response.ok({ success: true, data })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch sex options',
      })
    }
  }

  // =========================================
  // OPD Visit Lookups
  // =========================================

  /**
   * @ovstists
   * @summary Get visit types ประเภทการมาผู้ป่วยนอก
   * @responseBody 200 - Returns list of visit types
   */
  async ovstists({ response }: HttpContext) {
    try {
      const data = await db
        .from('ovstist')
        .select(['ovstist', 'name'])
        .whereNotNull('name')
        .orderBy('ovstist')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.ovstist,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching ovstists:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch visit types',
        error: error.message,
      })
    }
  }

  /**
   * @departments
   * @summary Get departments/clinics (ห้องตรวจ/แผนก)
   * @paramQuery active - Filter only active
   * @responseBody 200 - Returns list of departments
   */
  async departments({response }: HttpContext) {
    try {
  
      
      let query = db
        .from('kskdepartment')
        .select(['depcode', 'department', 'spclty'])
        .orderBy('depcode')

      const data = await query

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.depcode,
          name: item.department,
          spclty: item.spclty 
        })),
      })
    } catch (error) {
      console.error('Error fetching departments:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch departments',
        error: error.message,
      })
    }
  }

  /**
   * @doctors
   * @summary Get doctors (แพทย์)
   * @paramQuery depcode - Filter by department
   * @paramQuery active - Filter only active
   * @responseBody 200 - Returns list of doctors
   */
  async doctors({ request, response }: HttpContext) {
    try {
      const depcode = request.input('depcode', '')
      const active = request.input('active', 'true')

      let query = db
        .from('doctor')
        .select(['code', 'name', 'licenseno', 'depcode', 'active', 'specialty'])
        .orderBy('name')

      if (depcode) {
        query = query.where('depcode', depcode)
      }

      if (active === 'true') {
        query = query.where('active', 'Y')
      }

      const data = await query

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.code,
          name: item.name,
          licenseNo: item.licenseno,
          depcode: item.depcode,
          specialty: item.specialty,
          isActive: item.active === 'Y',
        })),
      })
    } catch (error) {
      console.error('Error fetching doctors:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch doctors',
        error: error.message,
      })
    }
  }

  /**
   * @spclties
   * @summary Get specialties (ความเชี่ยวชาญ)
   * @responseBody 200 - Returns list of specialties
   */
  async spclties({ response }: HttpContext) {
    try {
      const data = await db
        .from('spclty')
        .select(['spclty', 'name'])
        .whereNotNull('name')
        .orderBy('name')

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.spclty,
          name: item.name,
        })),
      })
    } catch (error) {
      console.error('Error fetching specialties:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch specialties',
        error: error.message,
      })
    }
  }

  /**
   * @clinics
   * @summary Get clinic rooms (ห้องตรวจ)
   * @paramQuery depcode - Filter by department
   * @responseBody 200 - Returns list of clinics
   */
  async clinics({ request, response }: HttpContext) {
    try {
      const depcode = request.input('depcode', '')

      let query = db
        .from('clinic')
        .select(['clinic', 'name', 'depcode', 'online'])
        .where('online', 'Y')
        .orderBy('clinic')

      if (depcode) {
        query = query.where('depcode', depcode)
      }

      const data = await query

      return response.ok({
        success: true,
        data: data.map((item) => ({
          code: item.clinic,
          name: item.name,
          depcode: item.depcode,
        })),
      })
    } catch (error) {
      console.error('Error fetching clinics:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch clinics',
        error: error.message,
      })
    }
  }

  // =========================================
  // Combined Lookups for Pages
  // =========================================

  /**
   * @opdVisit
   * @summary Get all lookups for OPD visit page
   * @responseBody 200 - Returns combined lookups
   */
  async opdVisit({ response }: HttpContext) {
    try {
      const [ovstists, pttypes, departments, doctors, spclties] = await Promise.all([
        db.from('ovstist').select(['ovstist', 'name']).whereNotNull('name').orderBy('ovstist'),
        db.from('pttype').select(['pttype', 'name', 'nhso_code']).where('isuse', 'Y').orderBy('pttype'),
        db.from('kskdepartment').select(['depcode', 'department']).orderBy('depcode'),
        db.from('doctor').select(['code', 'name', 'licenseno']).where('active', 'Y').orderBy('name'),
        db.from('spclty').select(['spclty', 'name']).whereNotNull('name').orderBy('spclty'),
      ])

      return response.ok({
        success: true,
        data: {
          ovstists: ovstists.map((item) => ({
            code: item.ovstist,
            name: item.name,
            label: `${item.ovstist} - ${item.name}`,
          })),
          pttypes: pttypes.map((item) => ({
            code: item.pttype,
            name: item.name,
            nhsoCode: item.nhso_code,
            label: `${item.pttype} - ${item.name}`,
          })),
          departments: departments.map((item) => ({
            code: item.depcode,
            name: item.department,
            label: `${item.depcode} - ${item.department}`,
          })),
          doctors: doctors.map((item) => ({
            code: item.code,
            name: item.name,
            licenseNo: item.licenseno,
            depcode: item.depcode,
            specialty: item.specialty,
            label: item.name,
          })),
          spclties: spclties.map((item) => ({
            code: item.spclty,
            name: item.name,
            label: item.name,
          })),
        },
      })
    } catch (error) {
      console.error('Error fetching OPD visit lookups:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch OPD visit lookups',
        error: error.message,
      })
    }
  }

  /**
   * @patientRegistration
   * @summary Get all lookups for patient registration page
   * @responseBody 200 - Returns combined lookups
   */
  async patientRegistration({ response }: HttpContext) {
    try {
      const [pnames, occupations, nationalities, religions, marryStatuses, educations, pttypes, provinces] =
        await Promise.all([
          db.from('pname').select(['name', 'ename', 'sex']).orderBy('name'),
          db.from('occupation').select(['occupation', 'name']).whereNotNull('name').orderBy('name'),
          db.from('nationality').select(['nationality', 'name']).whereNotNull('name').orderBy('name'),
          db.from('religion').select(['religion', 'name']).whereNotNull('name').orderBy('name'),
          db.from('marrystatus').select(['code', 'name']).whereNotNull('name').orderBy('code'),
          db.from('education').select(['education', 'name']).whereNotNull('name').orderBy('education'),
          db.from('pttype').select(['pttype', 'name']).where('isuse', 'Y').orderBy('pttype'),
          db.from('thaiaddress').select(['chwpart', 'name']).where('codetype', '1').whereNotNull('name').orderBy('name'),
        ])

      return response.ok({
        success: true,
        data: {
          pnames: pnames.map((item) => ({
            code: item.name,
            name: item.name,
            ename: item.ename,
            sex: item.sex,
          })),
          occupations: occupations.map((item) => ({
            code: item.occupation,
            name: item.name,
          })),
          nationalities: nationalities.map((item) => ({
            code: item.nationality,
            name: item.name,
          })),
          religions: religions.map((item) => ({
            code: item.religion,
            name: item.name,
          })),
          marryStatuses: marryStatuses.map((item) => ({
            code: item.code,
            name: item.name,
          })),
          educations: educations.map((item) => ({
            code: item.education,
            name: item.name,
          })),
          pttypes: pttypes.map((item) => ({
            code: item.pttype,
            name: item.name,
            label: `${item.pttype} - ${item.name}`,
          })),
          provinces: provinces.map((item) => ({
            code: item.chwpart,
            name: item.name,
          })),
          bloodGroups: [
            { code: 'A', name: 'A' },
            { code: 'B', name: 'B' },
            { code: 'AB', name: 'AB' },
            { code: 'O', name: 'O' },
            { code: 'Unknown', name: 'ไม่ทราบ' },
          ],
          bloodGroupRhs: [
            { code: '+', name: 'Rh+' },
            { code: '-', name: 'Rh-' },
            { code: 'Unknown', name: 'ไม่ทราบ' },
          ],
          sexes: [
            { code: '1', name: 'ชาย' },
            { code: '2', name: 'หญิง' },
          ],
        },
      })
    } catch (error) {
      console.error('Error fetching patient registration lookups:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch patient registration lookups',
        error: error.message,
      })
    }
  }
}