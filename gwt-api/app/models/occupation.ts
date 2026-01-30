import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Occupation extends BaseModel {
  static table = 'occupation'
  static primaryKey = 'occupation'

  @column({ isPrimary: true, columnName: 'occupation' })
  declare occupation: string

  @column({ columnName: 'name' })
  declare name: string | null

  @column({ columnName: 'nhso_code' })
  declare nhsoCode: string | null

  @column({ columnName: 'code506' })
  declare code506: string | null

  @column({ columnName: 'sur_code' })
  declare surCode: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null

  @column({ columnName: 'zip09_code' })
  declare zip09Code: string | null

  @column({ columnName: 'hos_guid_ext' })
  declare hosGuidExt: string | null

  @column({ columnName: 'nhso_eclaim_occupation_code' })
  declare nhsoEclaimOccupationCode: string | null
}
