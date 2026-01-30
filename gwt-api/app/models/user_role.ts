import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Officer from './officer.js'
import Role from './role.js'
import { DateTime } from 'luxon'

export default class UserRole extends BaseModel {
  static table = 'user_roles'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'role_id' })
  declare roleId: number

  @column.dateTime({ autoCreate: true, columnName: 'assigned_at' })
  declare assignedAt: DateTime

  @column({ columnName: 'assigned_by' })
  declare assignedBy: number | null

  @belongsTo(() => Officer, {
    foreignKey: 'userId',
  })
  declare officer: BelongsTo<typeof Officer>

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof Role>
}
