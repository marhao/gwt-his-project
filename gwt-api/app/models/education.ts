import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Education extends BaseModel {
  static table = 'education'
  static primaryKey = 'education'

  @column({ isPrimary: true, columnName: 'education' })
  declare education: string

  @column({ columnName: 'name' })
  declare name: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null

  @column({ columnName: 'provis_code' })
  declare provisCode: string | null
}
