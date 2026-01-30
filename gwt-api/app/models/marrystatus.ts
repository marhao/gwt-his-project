import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Marrystatus extends BaseModel {
  static table = 'marrystatus'
  static primaryKey = 'code'

  @column({ isPrimary: true, columnName: 'code' })
  declare code: string

  @column({ columnName: 'name' })
  declare name: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null

  @column({ columnName: 'code506' })
  declare code506: string | null

  @column({ columnName: 'nhso_marriage_code' })
  declare nhsoMarriageCode: string | null
}
