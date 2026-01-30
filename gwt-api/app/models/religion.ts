import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Religion extends BaseModel {
  static table = 'religion'
  static primaryKey = 'religion'

  @column({ isPrimary: true, columnName: 'religion' })
  declare religion: string

  @column({ columnName: 'name' })
  declare name: string | null

  @column({ columnName: 'nhso_code' })
  declare nhsoCode: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null
}
