import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Death extends BaseModel {
  static table = 'death'

  @column({ isPrimary: true })
  declare deathId: number

  @column()
  declare hn: string | null

  @column()
  declare cid: string | null

  @column()
  declare hcode: string | null

  @column.date()
  declare deathDate: DateTime | null

  @column()
  declare deathDiag1: string | null

  @column()
  declare deathDiag2: string | null

  @column()
  declare deathDiag3: string | null

  @column()
  declare deathDiag4: string | null

  @column()
  declare deathDiagOther: string | null

  /** FK → icd101 table (รหัส ICD-10 สาเหตุการตาย) */
  @column()
  declare deathCause: string | null

  /**
   * FK → death_place lookup table
   * 1=โรงพยาบาล, 2=บ้าน, 3=ระหว่างนำส่ง, 4=อื่นๆ, 9=ไม่ทราบ
   */
  @column()
  declare deathPlace: string | null

  @column.dateTime()
  declare lastUpdate: DateTime | null

  /** FK → pttype table (ประเภทสิทธิผู้ป่วย) */
  @column()
  declare lastPttype: string | null

  @column()
  declare an: string | null

  @column()
  declare nopreg: string | null

  @column()
  declare wpreg: number | null

  @column()
  declare odisease: string | null

  @column()
  declare deathTime: string | null

  @column.date()
  declare deathDiagDate1: DateTime | null

  @column.date()
  declare deathDiagDate2: DateTime | null

  @column.date()
  declare deathDiagDate3: DateTime | null

  @column.date()
  declare deathDiagDate4: DateTime | null

  @column()
  declare deathCauseText: string | null

  @column()
  declare deathCertId: number | null

  @column.date()
  declare deathCertDate: DateTime | null

  /** FK → doctor table (แพทย์ผู้ออกใบมรณบัตร) */
  @column()
  declare deathCertDoctor: string | null

  /** FK → death_source lookup table (แหล่งข้อมูลการตาย) */
  @column()
  declare deathSource: number | null

  @column()
  declare deathNumber: string | null

  /** FK → newborn_death_cause lookup table (สาเหตุการตายทารกแรกเกิด) */
  @column()
  declare newbornDeathCauseId: number | null

  @column()
  declare hosGuid: string | null

  @column()
  declare autopsyPerform: string | null

  @column()
  declare noDetail: string | null

  @column()
  declare deathHospcode: string | null

  @column()
  declare deathPreg42Day: string | null

  @column.dateTime()
  declare updateDatetime: DateTime | null

  @column()
  declare staff: string | null

  @column()
  declare doctorDxText: string | null

  @column()
  declare extHospitalText: string | null
}