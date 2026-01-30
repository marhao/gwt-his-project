import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Nationality extends BaseModel {
  static table = 'nationality'
  static primaryKey = 'nationality'

  @column({ isPrimary: true, columnName: 'nationality' })
  declare nationality: string

  @column({ columnName: 'name' })
  declare name: string | null

  @column({ columnName: 'nhso_code' })
  declare nhsoCode: string | null

  @column({ columnName: 'sur_code' })
  declare surCode: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null

  @column({ columnName: 'zip09_code' })
  declare zip09Code: string | null

  @column({ columnName: 'inv_unuse' })
  declare invUnuse: string | null
}
