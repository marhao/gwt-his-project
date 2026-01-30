import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Thaiaddress extends BaseModel {
  static table = 'thaiaddress'
  static primaryKey = 'addressid'

  @column({ isPrimary: true, columnName: 'addressid' })
  declare addressId: string

  @column({ columnName: 'name' })
  declare name: string | null

  @column({ columnName: 'chwpart' })
  declare chwPart: string | null

  @column({ columnName: 'amppart' })
  declare ampPart: string | null

  @column({ columnName: 'tmbpart' })
  declare tmbPart: string | null

  @column({ columnName: 'codetype' })
  declare codeType: string | null

  @column({ columnName: 'pocode' })
  declare poCode: string | null

  @column({ columnName: 'full_name' })
  declare fullName: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null

  @column({ columnName: 'hos_guid_ext' })
  declare hosGuidExt: string | null
}
