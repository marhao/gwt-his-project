import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Role extends BaseModel {
  static table = 'roles'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'role_code' })
  declare roleCode: string

  @column({ columnName: 'role_name' })
  declare roleName: string

  @column()
  declare description: string | null

  @column({ columnName: 'is_active' })
  declare isActive: number

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime
}
