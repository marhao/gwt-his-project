import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pttype extends BaseModel {
  static table = 'pttype'
  static primaryKey = 'pttype'

  @column({ isPrimary: true, columnName: 'pttype' })
  declare pttype: string

  @column({ columnName: 'name' })
  declare name: string | null

  @column({ columnName: 'isuse' })
  declare isUse: string | null

  @column({ columnName: 'pcode' })
  declare pcode: string | null

  @column({ columnName: 'discount' })
  declare discount: number | null

  @column({ columnName: 'uc' })
  declare uc: string | null

  @column({ columnName: 'nhso_code' })
  declare nhsoCode: string | null

  @column({ columnName: 'hipdata_code' })
  declare hipdataCode: string | null

  @column({ columnName: 'pttype_guid' })
  declare pttypeGuid: string | null

  @column({ columnName: 'pttype_std_code' })
  declare pttypeStdCode: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null
}
