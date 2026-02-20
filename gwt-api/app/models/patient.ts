import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Pname from './pname.js'
import Occupation from './occupation.js'
import Nationality from './nationality.js'
import Religion from './religion.js'
import Marrystatus from './marrystatus.js'
import Education from './education.js'
import Pttype from './pttype.js'
import SerialService from '../services/serial_service.js'

export default class Patient extends BaseModel {
  static table = 'patient'
  static primaryKey = 'hos_guid'

  // ==================== Primary Key ====================
  @column({ isPrimary: true, columnName: 'hos_guid' })
  declare hosGuid: string

  // ==================== Identifiers ====================
  @column({ columnName: 'hn' })
  declare hn: string | null

  @column({ columnName: 'hn_int' })
  declare hnInt: number | null

  @column({ columnName: 'cid' })
  declare cid: string | null

  @column({ columnName: 'passport_no' })
  declare passportNo: string | null

  @column({ columnName: 'membercard_no' })
  declare membercardNo: string | null

  @column({ columnName: 'oldcode' })
  declare oldcode: string | null

  // ==================== Personal Info ====================
  @column({ columnName: 'pname' })
  declare pname: string | null

  @column({ columnName: 'fname' })
  declare fname: string | null

  @column({ columnName: 'midname' })
  declare midname: string | null

  @column({ columnName: 'lname' })
  declare lname: string | null

  @column({ columnName: 'alias_name' })
  declare aliasName: string | null

  @column({ columnName: 'fname_soundex' })
  declare fnameSoundex: string | null

  @column({ columnName: 'lname_soundex' })
  declare lnameSoundex: string | null

  @column({ columnName: 'sex' })
  declare sex: string | null

  @column.date({ columnName: 'birthday' })
  declare birthday: DateTime | null

  @column({ columnName: 'birthtime' })
  declare birthtime: string | null

  @column({ columnName: 'truebirthday' })
  declare trueBirthday: string | null

  @column({ columnName: 'height' })
  declare height: number | null

  // ==================== Lookup Fields ====================
  @column({ columnName: 'occupation' })
  declare occupation: string | null

  @column({ columnName: 'citizenship' })
  declare citizenship: string | null

  @column({ columnName: 'nationality' })
  declare nationalityCode: string | null

  @column({ columnName: 'religion' })
  declare religionCode: string | null

  @column({ columnName: 'marrystatus' })
  declare marryStatus: string | null

  @column({ columnName: 'educate' })
  declare educate: string | null

  @column({ columnName: 'pttype' })
  declare pttype: string | null

  @column({ columnName: 'lang' })
  declare lang: string | null

  @column({ columnName: 'country' })
  declare country: string | null

  // ==================== Blood Group ====================
  @column({ columnName: 'bloodgrp' })
  declare bloodGroup: string | null

  @column({ columnName: 'bloodgroup_rh' })
  declare bloodGroupRh: string | null

  @column({ columnName: 'g6pd' })
  declare g6pd: string | null

  // ==================== Address ====================
  @column({ columnName: 'addrpart' })
  declare addrPart: string | null

  @column({ columnName: 'moopart' })
  declare mooPart: string | null

  @column({ columnName: 'road' })
  declare road: string | null

  @column({ columnName: 'addr_soi' })
  declare addrSoi: string | null

  @column({ columnName: 'tmbpart' })
  declare tmbPart: string | null

  @column({ columnName: 'amppart' })
  declare ampPart: string | null

  @column({ columnName: 'chwpart' })
  declare chwPart: string | null

  @column({ columnName: 'po_code' })
  declare poCode: string | null

  @column({ columnName: 'addressid' })
  declare addressId: string | null

  @column({ columnName: 'hcode' })
  declare hcode: string | null

  @column({ columnName: 'old_addr' })
  declare oldAddr: string | null

  @column({ columnName: 'inregion' })
  declare inRegion: string | null

  @column({ columnName: 'type_area' })
  declare typeArea: string | null

  // ==================== Contact ====================
  @column({ columnName: 'hometel' })
  declare homeTel: string | null

  @column({ columnName: 'worktel' })
  declare workTel: string | null

  @column({ columnName: 'mobile_phone_number' })
  declare mobilePhoneNumber: string | null

  @column({ columnName: 'email' })
  declare email: string | null

  // ==================== Work ====================
  @column({ columnName: 'workaddr' })
  declare workAddr: string | null

  @column({ columnName: 'work_addr' })
  declare workAddrFull: string | null

  // ==================== Family ====================
  @column({ columnName: 'familyno' })
  declare familyNo: number | null

  @column({ columnName: 'fathername' })
  declare fatherName: string | null

  @column({ columnName: 'fatherlname' })
  declare fatherLname: string | null

  @column({ columnName: 'father_cid' })
  declare fatherCid: string | null

  @column({ columnName: 'father_hn' })
  declare fatherHn: string | null

  @column({ columnName: 'mathername' })
  declare motherName: string | null

  @column({ columnName: 'motherlname' })
  declare motherLname: string | null

  @column({ columnName: 'mother_cid' })
  declare motherCid: string | null

  @column({ columnName: 'mother_hn' })
  declare motherHn: string | null

  @column({ columnName: 'spsname' })
  declare spouseName: string | null

  @column({ columnName: 'spslname' })
  declare spouseLname: string | null

  @column({ columnName: 'couple_cid' })
  declare coupleCid: string | null

  @column({ columnName: 'family_status' })
  declare familyStatus: string | null

  @column({ columnName: 'number_of_relatives' })
  declare numberOfRelatives: number | null

  @column({ columnName: 'birth_order' })
  declare birthOrder: number | null

  // ==================== Emergency Contact ====================
  @column({ columnName: 'informname' })
  declare informName: string | null

  @column({ columnName: 'informaddr' })
  declare informAddr: string | null

  @column({ columnName: 'informtel' })
  declare informTel: string | null

  @column({ columnName: 'informrelation' })
  declare informRelation: string | null

  @column({ columnName: 'ec_fname' })
  declare ecFname: string | null

  @column({ columnName: 'ec_lname' })
  declare ecLname: string | null

  @column({ columnName: 'ec_relation_type_id' })
  declare ecRelationTypeId: number | null

  // ==================== Medical Info ====================
  @column({ columnName: 'drugallergy' })
  declare drugAllergy: string | null

  @column({ columnName: 'clinic' })
  declare clinic: string | null

  @column({ columnName: 'opdlocation' })
  declare opdLocation: string | null

  @column({ columnName: 'private_doctor_name' })
  declare privateDoctorName: string | null

  @column({ columnName: 'gov_chronic_id' })
  declare govChronicId: string | null

  // ==================== Death Info ====================
  @column.date({ columnName: 'deathday' })
  declare deathDay: DateTime | null

  @column({ columnName: 'death' })
  declare death: string | null

  @column({ columnName: 'death_code504' })
  declare deathCode504: string | null

  @column({ columnName: 'death_diag' })
  declare deathDiag: string | null

  // ==================== Dates ====================
  @column.date({ columnName: 'firstday' })
  declare firstDay: DateTime | null

  @column.date({ columnName: 'last_visit' })
  declare lastVisit: DateTime | null

  @column.dateTime({ columnName: 'last_update' })
  declare lastUpdate: DateTime | null

  @column({ columnName: 'reg_time' })
  declare regTime: string | null

  // ==================== Status & Type ====================
  @column({ columnName: 'person_type' })
  declare personType: string | null

  @column({ columnName: 'labor_type' })
  declare laborType: string | null

  @column({ columnName: 'person_labor_type_id' })
  declare personLaborTypeId: number | null

  @column({ columnName: 'patient_type_id' })
  declare patientTypeId: number | null

  @column({ columnName: 'patient_color_id' })
  declare patientColorId: number | null

  @column({ columnName: 'hospital_department_id' })
  declare hospitalDepartmentId: number | null

  // ==================== Flags ====================
  @column({ columnName: 'admit' })
  declare admit: string | null

  @column({ columnName: 'legal_action' })
  declare legalAction: string | null

  @column({ columnName: 'in_cups' })
  declare inCups: string | null

  @column({ columnName: 'anonymous_person' })
  declare anonymousPerson: string | null

  @column({ columnName: 'destroyed' })
  declare destroyed: string | null

  @column({ columnName: 'is_card_destroy' })
  declare isCardDestroy: string | null

  @column.date({ columnName: 'card_destroy_date' })
  declare cardDestroyDate: DateTime | null

  @column({ columnName: 'node_id' })
  declare nodeId: string | null

  @column({ columnName: 'hid' })
  declare hid: number | null

  // ==================== Relationships ====================
  @belongsTo(() => Pname, {
    foreignKey: 'pname',
    localKey: 'name',
  })
  declare prefix: BelongsTo<typeof Pname>

  @belongsTo(() => Occupation, {
    foreignKey: 'occupation',
    localKey: 'occupation',
  })
  declare occupationRef: BelongsTo<typeof Occupation>

  @belongsTo(() => Nationality, {
    foreignKey: 'nationalityCode',
    localKey: 'nationality',
  })
  declare nationality: BelongsTo<typeof Nationality>

  @belongsTo(() => Religion, {
    foreignKey: 'religionCode',
    localKey: 'religion',
  })
  declare religion: BelongsTo<typeof Religion>

  @belongsTo(() => Marrystatus, {
    foreignKey: 'marryStatus',
    localKey: 'code',
  })
  declare maritalStatus: BelongsTo<typeof Marrystatus>

  @belongsTo(() => Education, {
    foreignKey: 'educate',
    localKey: 'education',
  })
  declare education: BelongsTo<typeof Education>

  @belongsTo(() => Pttype, {
    foreignKey: 'pttype',
    localKey: 'pttype',
  })
  declare patientType: BelongsTo<typeof Pttype>

  // ==================== Computed Properties ====================
  get fullName(): string {
    const parts = [this.pname, this.fname, this.lname].filter(Boolean)
    return parts.join(' ')
  }

  get age(): number | null {
    if (!this.birthday) return null
    const now = DateTime.now()
    const diff = now.diff(this.birthday, 'years')
    return Math.floor(diff.years)
  }

  get isActive(): boolean {
    return this.death !== 'Y' && this.destroyed !== 'Y'
  }

  /** Hook to generate new HN */
  @beforeCreate()
  static async generateNewHn(patient: Patient) {
    const newHn = await SerialService.getSerial('HN')

    patient.hn = newHn.toString().padStart(7, '0')
  }
}
