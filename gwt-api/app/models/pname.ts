import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pname extends BaseModel {
  static table = 'pname'
  static primaryKey = 'name'

  @column({ isPrimary: true, columnName: 'name' })
  declare name: string

  @column({ columnName: 'class' })
  declare class: number | null

  @column({ columnName: 'sex' })
  declare sex: string | null

  @column({ columnName: 'provis_code' })
  declare provisCode: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null

  @column({ columnName: 'hos_guid_ext' })
  declare hosGuidExt: string | null

  @column({ columnName: 'min_age' })
  declare minAge: number | null

  @column({ columnName: 'marrystatus' })
  declare marryStatus: string | null

  @column({ columnName: 'ename' })
  declare ename: string | null
}
