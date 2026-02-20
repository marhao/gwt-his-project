import type { HttpContext } from '@adonisjs/core/http'
import Patient from '#models/patient'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import crypto from 'node:crypto'

export default class PatientsController {
  /**
   * @index
   * @summary List patients with pagination and search
   * @paramQuery page - Page number - @type(number)
   * @paramQuery limit - Items per page - @type(number)
   * @paramQuery search - Search by HN, CID, name - @type(string)
   * @paramQuery pttype - Filter by patient type - @type(string)
   * @responseBody 200 - Returns paginated patient list
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)
      const search = request.input('search', '')
      const pttype = request.input('pttype', '')
      const chwpart = request.input('chwpart', '')
      const amppart = request.input('amppart', '')
      const isActive = request.input('is_active', '')

      let query = Patient.query()
        .select([
          'hos_guid',
          'hn',
          'cid',
          'pname',
          'fname',
          'lname',
          'sex',
          'birthday',
          'pttype',
          'mobile_phone_number',
          'chwpart',
          'amppart',
          'tmbpart',
          'death',
          'last_visit',
          'drugallergy',
        ])

      // Search filter
      if (search) {
        query = query.where((builder) => {
          builder
            .where('hn', 'like', `%${search}%`)
            .orWhere('cid', 'like', `%${search}%`)
            .orWhere('fname', 'like', `%${search}%`)
            .orWhere('lname', 'like', `%${search}%`)
            .orWhereRaw("CONCAT(fname, ' ', lname) LIKE ?", [`%${search}%`])
        })
      }

      // Filters
      if (pttype) {
        query = query.where('pttype', pttype)
      }

      if (chwpart) {
        query = query.where('chwpart', chwpart)
      }

      if (amppart) {
        query = query.where('amppart', amppart)
      }

      if (isActive === 'true') {
        query = query.where((builder) => {
          builder.whereNull('death').orWhere('death', '!=', 'Y')
        })
      } else if (isActive === 'false') {
        query = query.where('death', 'Y')
      }

      // Order by last visit desc
      query = query.orderBy('last_visit', 'desc')

      const patients = await query.paginate(page, limit)

      // Transform data
      const data = patients.all().map((p) => this.transformPatient(p))

      return response.ok({
        success: true,
        data,
        meta: {
          total: patients.total,
          per_page: patients.perPage,
          current_page: patients.currentPage,
          last_page: patients.lastPage,
        },
      })
    } catch (error) {
      console.error('Error fetching patients:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch patients',
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @summary Get patient details by HN
   * @paramPath hn - Patient HN
   * @responseBody 200 - Returns patient details with lookup data
   * @responseBody 404 - Patient not found
   */
  async show({ params, response }: HttpContext) {
    try {
      const patient = await Patient.query().where('hn', params.hn).first()

      if (!patient) {
        return response.notFound({
          success: false,
          message: 'Patient not found',
        })
      }

      // Get lookup data
      const lookups = await this.getLookupData(patient)

      return response.ok({
        success: true,
        data: {
          ...this.transformPatientFull(patient),
          lookups,
        },
      })
    } catch (error) {
      console.error('Error fetching patient:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch patient',
        error: error.message,
      })
    }
  }

  /**
   * @search
   * @summary Quick search patients
   * @paramQuery q - Search query (HN, CID, name) - @type(string)
   * @paramQuery limit - Max results - @type(number)
   * @responseBody 200 - Returns matching patients
   */
  async search({ request, response }: HttpContext) {
    try {
      const q = request.input('q', '')
      const limit = request.input('limit', 10)

      if (!q || q.length < 2) {
        return response.ok({ success: true, data: [] })
      }

      const patients = await Patient.query()
        .select(['hn', 'cid', 'pname', 'fname', 'lname', 'sex', 'birthday', 'pttype','death'])
        .where((builder) => {
          builder
            .where('hn', 'like', `${q}%`)
            .orWhere('cid', 'like', `${q}%`)
            .orWhere('fname', 'like', `%${q}%`)
            .orWhere('lname', 'like', `%${q}%`)
            .orWhereRaw(`CONCAT(COALESCE(pname,''), COALESCE(fname,''), COALESCE(lname,'')) LIKE ?`, [`%${q}%`])
        })
        .limit(limit)

      const data = patients.map((p) => ({
        hn: p.hn,
        cid: p.cid,
        full_name: [p.pname, p.fname, p.lname].filter(Boolean).join(' '),
        sex: p.sex,
        birthday: p.birthday?.toISODate(),
        age: this.calculateAge(p.birthday),
        pttype: p.pttype,
        death: p.death,
      }))

      return response.ok({ success: true, data })
    } catch (error) {
      console.error('Error searching patients:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to search patients',
        error: error.message,
      })
    }
  }

  /**
   * @stats
   * @summary Get patient statistics
   * @responseBody 200 - Returns patient statistics
   */
  async stats({ response }: HttpContext) {
    try {
      // Total patients
      const totalResult = await db.from('patient').count('* as count').first()
      const total = Number(totalResult?.count || 0)

      // New this month
      const startOfMonth = DateTime.now().startOf('month').toISODate()
      const newThisMonthResult = await db
        .from('patient')
        .where('firstday', '>=', startOfMonth)
        .count('* as count')
        .first()
      const newThisMonth = Number(newThisMonthResult?.count || 0)

      // Visited today
      const today = DateTime.now().toISODate()
      const visitedTodayResult = await db
        .from('patient')
        .where('last_visit', today)
        .count('* as count')
        .first()
      const visitedToday = Number(visitedTodayResult?.count || 0)

      // With allergy
      const withAllergyResult = await db
        .from('patient')
        .whereNotNull('drugallergy')
        .whereNot('drugallergy', '')
        .count('* as count')
        .first()
      const withAllergy = Number(withAllergyResult?.count || 0)

      // By gender
      const maleResult = await db.from('patient').where('sex', '1').count('* as count').first()
      const femaleResult = await db.from('patient').where('sex', '2').count('* as count').first()

      // By patient type (top 10)
      const byPttypeResult = await db
        .from('patient')
        .join('pttype', 'patient.pttype', '=', 'pttype.pttype')
        .select('patient.pttype as code', 'pttype.name')
        .count('* as count')
        .groupBy('patient.pttype', 'pttype.name')
        .orderBy('count', 'desc')
        .limit(10)

      return response.ok({
        success: true,
        data: {
          total,
          newThisMonth,
          visitedToday,
          withAllergy,
          byGender: {
            male: Number(maleResult?.count || 0),
            female: Number(femaleResult?.count || 0),
          },
          byPttype: byPttypeResult.map((r) => ({
            code: r.code,
            name: r.name,
            count: Number(r.count),
          })),
        },
      })
    } catch (error) {
      console.error('Error fetching patient stats:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch patient statistics',
        error: error.message,
      })
    }
  }

  /**
   * @update
   * @summary Update patient information
   * @paramPath hn - Patient HN
   * @responseBody 200 - Patient updated successfully
   * @responseBody 404 - Patient not found
   */
  async create({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'pname',
        'fname',
        'midname',
        'lname',
        'sex',
        'birthday',
        'cid',
        'passport_no',
        'occupation',
        'citizenship',
        'nationality',
        'religion',
        'marrystatus',
        'education',
        'pttype',
        'bloodgrp',
        'bloodgroup_rh',
        'g6pd',
        'addrpart',
        'moopart',
        'road',
        // 'addr_soi',
        'tmbpart',
        'amppart',
        'chwpart',
        'po_code',
        'hometel',
        // 'worktel',
        'mobile_phone_number',
        'email',
        'drugallergy',
        'informname',
        'informtel',
        'informrelation',
        'fathername',
        'mathername',
        'spsname',
      ])

      // Map snake_case to camelCase for model
      const updateData: Record<string, unknown> = {}

      if (data.pname !== undefined) updateData.pname = data.pname
      if (data.fname !== undefined) updateData.fname = data.fname
      if (data.midname !== undefined) updateData.midname = data.midname
      if (data.lname !== undefined) updateData.lname = data.lname
      if (data.sex !== undefined) updateData.sex = data.sex
      if (data.birthday !== undefined) updateData.birthday = DateTime.fromISO(data.birthday)
      if (data.cid !== undefined) updateData.cid = data.cid
      // if (data.passport_no !== undefined) updateData.passportNo = data.passport_no

      /** สถานะต่างๆ */
      if (data.nationality !== undefined) updateData.nationalityCode = data.nationality
      if (data.citizenship !== undefined) updateData.citizenship = data.citizenship
      if (data.religion !== undefined) updateData.religionCode = data.religion
      if (data.marrystatus !== undefined) updateData.marryStatus = data.marrystatus
      if (data.occupation !== undefined) updateData.occupation = data.occupation
      if (data.education !== undefined) updateData.educate = data.education

      /** สิทธิการรักษา */
      if (data.pttype !== undefined) updateData.pttype = data.pttype

      /** ข้อมูลทางการแพทย์ */
      if (data.bloodgrp !== undefined) updateData.bloodGroup = data.bloodgrp
      if (data.bloodgroup_rh !== undefined) updateData.bloodGroupRh = data.bloodgroup_rh
      if (data.g6pd !== undefined) updateData.g6pd = data.g6pd
      if (data.drugallergy !== undefined) updateData.drugAllergy = data.drugallergy

      /** ที่อยู่ */
      if (data.addrpart !== undefined) updateData.addrPart = data.addrpart
      if (data.moopart !== undefined) updateData.mooPart = data.moopart
      if (data.road !== undefined) updateData.road = data.road
      // if (data.addr_soi !== undefined) updateData.addrSoi = data.addr_soi
      if (data.tmbpart !== undefined) updateData.tmbPart = data.tmbpart
      if (data.amppart !== undefined) updateData.ampPart = data.amppart
      if (data.chwpart !== undefined) updateData.chwPart = data.chwpart
      if (data.po_code !== undefined) updateData.poCode = data.po_code

      /** ข้อมูลติดต่อ */
      if (data.hometel !== undefined) updateData.homeTel = data.hometel
      // if (data.worktel !== undefined) updateData.workTel = data.worktel
      if (data.mobile_phone_number !== undefined) updateData.mobilePhoneNumber = data.mobile_phone_number
      if (data.email !== undefined) updateData.email = data.email

      /** ข้อมูลติดต่อ และ ครอบครัว */
      if (data.informname !== undefined) updateData.informName = data.informname
      if (data.informtel !== undefined) updateData.informTel = data.informtel
      if (data.informrelation !== undefined) updateData.informRelation = data.informrelation
      if (data.fathername !== undefined) updateData.fatherName = data.fathername
      if (data.mathername !== undefined) updateData.motherName = data.mathername
      if (data.spsname !== undefined) updateData.spouseName = data.spsname

      // Set auto computed field
      updateData.hosGuid = crypto.randomUUID()
      updateData.lastUpdate = DateTime.now()

      const patient = await Patient.create(updateData);

      return response.ok({
        success: true,
        message: 'Patient created successfully',
        data: this.transformPatientFull(patient),
      })
    } catch (error) {
      console.error('Error creating patient:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to creating patient',
        error: error.message,
      })
    }
  }

  /**
   * @update
   * @summary Update patient information
   * @paramPath hn - Patient HN
   * @responseBody 200 - Patient updated successfully
   * @responseBody 404 - Patient not found
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const patient = await Patient.query().where('hn', params.hn).first()

      if (!patient) {
        return response.notFound({
          success: false,
          message: 'Patient not found',
        })
      }

      const data = request.only([
        'pname',
        'fname',
        'midname',
        'lname',
        'sex',
        'birthday',
        'cid',
        'passport_no',
        'occupation',
        'citizenship',
        'nationality',
        'religion',
        'marrystatus',
        'educate',
        'pttype',
        'bloodgrp',
        'bloodgroup_rh',
        'addrpart',
        'moopart',
        'road',
        'addr_soi',
        'tmbpart',
        'amppart',
        'chwpart',
        'po_code',
        'hometel',
        'worktel',
        'mobile_phone_number',
        'email',
        'drugallergy',
        'informname',
        'informtel',
        'informrelation',
        'fathername',
        'mathername',
        'spsname',
      ])

      // Map snake_case to camelCase for model
      const updateData: Record<string, unknown> = {}

      if (data.pname !== undefined) updateData.pname = data.pname
      if (data.fname !== undefined) updateData.fname = data.fname
      if (data.midname !== undefined) updateData.midname = data.midname
      if (data.lname !== undefined) updateData.lname = data.lname
      if (data.sex !== undefined) updateData.sex = data.sex
      if (data.birthday !== undefined) updateData.birthday = DateTime.fromISO(data.birthday)
      if (data.cid !== undefined) updateData.cid = data.cid
      if (data.passport_no !== undefined) updateData.passportNo = data.passport_no
      if (data.occupation !== undefined) updateData.occupation = data.occupation
      if (data.citizenship !== undefined) updateData.citizenship = data.citizenship
      if (data.nationality !== undefined) updateData.nationalityCode = data.nationality
      if (data.religion !== undefined) updateData.religionCode = data.religion
      if (data.marrystatus !== undefined) updateData.marryStatus = data.marrystatus
      if (data.educate !== undefined) updateData.educate = data.educate
      if (data.pttype !== undefined) updateData.pttype = data.pttype
      if (data.bloodgrp !== undefined) updateData.bloodGroup = data.bloodgrp
      if (data.bloodgroup_rh !== undefined) updateData.bloodGroupRh = data.bloodgroup_rh
      if (data.addrpart !== undefined) updateData.addrPart = data.addrpart
      if (data.moopart !== undefined) updateData.mooPart = data.moopart
      if (data.road !== undefined) updateData.road = data.road
      if (data.addr_soi !== undefined) updateData.addrSoi = data.addr_soi
      if (data.tmbpart !== undefined) updateData.tmbPart = data.tmbpart
      if (data.amppart !== undefined) updateData.ampPart = data.amppart
      if (data.chwpart !== undefined) updateData.chwPart = data.chwpart
      if (data.po_code !== undefined) updateData.poCode = data.po_code
      if (data.hometel !== undefined) updateData.homeTel = data.hometel
      if (data.worktel !== undefined) updateData.workTel = data.worktel
      if (data.mobile_phone_number !== undefined) updateData.mobilePhoneNumber = data.mobile_phone_number
      if (data.email !== undefined) updateData.email = data.email
      if (data.drugallergy !== undefined) updateData.drugAllergy = data.drugallergy
      if (data.informname !== undefined) updateData.informName = data.informname
      if (data.informtel !== undefined) updateData.informTel = data.informtel
      if (data.informrelation !== undefined) updateData.informRelation = data.informrelation
      if (data.fathername !== undefined) updateData.fatherName = data.fathername
      if (data.mathername !== undefined) updateData.motherName = data.mathername
      if (data.spsname !== undefined) updateData.spouseName = data.spsname

      // Set last_update
      updateData.lastUpdate = DateTime.now()

      patient.merge(updateData)
      await patient.save()

      return response.ok({
        success: true,
        message: 'Patient updated successfully',
        data: this.transformPatientFull(patient),
      })
    } catch (error) {
      console.error('Error updating patient:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to update patient',
        error: error.message,
      })
    }
  }

  /**
   * @visits
   * @summary Get patient visit history
   * @paramPath hn - Patient HN
   * @responseBody 200 - Returns visit history
   */
  async visits({ params, request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)

      // Query ovst table for visits
      const visits = await db
        .from('ovst')
        .where('hn', params.hn)
        .select([
          'vn',
          'hn',
          'vstdate',
          'vsttime',
          'pttype',
          'main_dep',
          'main_dep_queue',
          'doctor',
          'spclty',
          'ovst_key',
        ])
        .orderBy('vstdate', 'desc')
        .orderBy('vsttime', 'desc')
        .paginate(page, limit)

      return response.ok({
        success: true,
        data: visits.all(),
        meta: {
          total: visits.total,
          per_page: visits.perPage,
          current_page: visits.currentPage,
          last_page: visits.lastPage,
        },
      })
    } catch (error) {
      console.error('Error fetching visits:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch visits',
        error: error.message,
      })
    }
  }

  // ==================== Helper Methods ====================

  private transformPatient(patient: Patient) {
    return {
      hn: patient.hn,
      cid: patient.cid,
      full_name: [patient.pname, patient.fname, patient.lname].filter(Boolean).join(' '),
      pname: patient.pname,
      fname: patient.fname,
      lname: patient.lname,
      sex: patient.sex,
      birthday: patient.birthday?.toISODate(),
      age: this.calculateAge(patient.birthday),
      pttype: patient.pttype,
      phone: patient.mobilePhoneNumber || patient.homeTel,
      address: this.formatAddress(patient),
      is_dead: patient.death === 'Y',
      last_visit: patient.lastVisit?.toISODate(),
      drug_allergy: patient.drugAllergy,
    }
  }

  private transformPatientFull(patient: Patient) {
    return {
      hos_guid: patient.hosGuid,
      hn: patient.hn,
      hn_int: patient.hnInt,
      cid: patient.cid,
      passport_no: patient.passportNo,
      membercard_no: patient.membercardNo,

      // Personal
      pname: patient.pname,
      fname: patient.fname,
      midname: patient.midname,
      lname: patient.lname,
      alias_name: patient.aliasName,
      full_name: [patient.pname, patient.fname, patient.lname].filter(Boolean).join(' '),
      sex: patient.sex,
      birthday: patient.birthday?.toISODate(),
      birthtime: patient.birthtime,
      age: this.calculateAge(patient.birthday),
      height: patient.height,

      // Lookup codes
      occupation: patient.occupation,
      citizenship: patient.citizenship,
      nationality: patient.nationalityCode,
      religion: patient.religionCode,
      marrystatus: patient.marryStatus,
      educate: patient.educate,
      pttype: patient.pttype,

      // Blood
      bloodgrp: patient.bloodGroup,
      bloodgroup_rh: patient.bloodGroupRh,
      g6pd: patient.g6pd,

      // Address
      addrpart: patient.addrPart,
      moopart: patient.mooPart,
      road: patient.road,
      addr_soi: patient.addrSoi,
      tmbpart: patient.tmbPart,
      amppart: patient.ampPart,
      chwpart: patient.chwPart,
      po_code: patient.poCode,
      full_address: this.formatAddress(patient),

      // Contact
      hometel: patient.homeTel,
      worktel: patient.workTel,
      mobile_phone_number: patient.mobilePhoneNumber,
      email: patient.email,

      // Family
      fathername: patient.fatherName,
      fatherlname: patient.fatherLname,
      mathername: patient.motherName,
      motherlname: patient.motherLname,
      spsname: patient.spouseName,
      spslname: patient.spouseLname,

      // Emergency contact
      informname: patient.informName,
      informaddr: patient.informAddr,
      informtel: patient.informTel,
      informrelation: patient.informRelation,

      // Medical
      drugallergy: patient.drugAllergy,
      clinic: patient.clinic,

      // Status
      death: patient.death === 'Y',
      death_date: patient.deathDay?.toISODate(),
      first_visit: patient.firstDay?.toISODate(),
      last_visit: patient.lastVisit?.toISODate(),
      last_update: patient.lastUpdate?.toISO(),
    }
  }

  private async getLookupData(patient: Patient) {
    const [pname, occupation, nationality, religion, marrystatus, education, pttype, address] =
      await Promise.all([
        patient.pname ? db.from('pname').where('name', patient.pname).first() : null,
        patient.occupation ? db.from('occupation').where('occupation', patient.occupation).first() : null,
        patient.nationalityCode
          ? db.from('nationality').where('nationality', patient.nationalityCode).first()
          : null,
        patient.religionCode ? db.from('religion').where('religion', patient.religionCode).first() : null,
        patient.marryStatus ? db.from('marrystatus').where('code', patient.marryStatus).first() : null,
        patient.educate ? db.from('education').where('education', patient.educate).first() : null,
        patient.pttype ? db.from('pttype').where('pttype', patient.pttype).first() : null,
        patient.chwPart && patient.ampPart && patient.tmbPart
          ? db
              .from('thaiaddress')
              .where('chwpart', patient.chwPart)
              .where('amppart', patient.ampPart)
              .where('tmbpart', patient.tmbPart)
              .where('codetype', '3')
              .first()
          : null,
      ])

    return {
      pname: pname ? { code: pname.name, name: pname.name, ename: pname.ename } : null,
      occupation: occupation ? { code: occupation.occupation, name: occupation.name } : null,
      nationality: nationality ? { code: nationality.nationality, name: nationality.name } : null,
      religion: religion ? { code: religion.religion, name: religion.name } : null,
      marrystatus: marrystatus ? { code: marrystatus.code, name: marrystatus.name } : null,
      education: education ? { code: education.education, name: education.name } : null,
      pttype: pttype ? { code: pttype.pttype, name: pttype.name } : null,
      address: address ? { full_name: address.full_name } : null,
    }
  }

  private calculateAge(birthday: DateTime | null): number | null {
    if (!birthday) return null
    const now = DateTime.now()
    const diff = now.diff(birthday, 'years')
    return Math.floor(diff.years)
  }

  private formatAddress(patient: Patient): string {
    const parts = []
    if (patient.addrPart) parts.push(patient.addrPart)
    if (patient.mooPart) parts.push(`หมู่ ${patient.mooPart}`)
    if (patient.road) parts.push(`ถ.${patient.road}`)
    return parts.join(' ')
  }
}
