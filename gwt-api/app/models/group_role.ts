import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Group from './group.js'
import Role from './role.js'
import { DateTime } from 'luxon'

export default class GroupRole extends BaseModel {
  static table = 'group_roles'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'group_id' })
  declare groupId: number

  @column({ columnName: 'role_id' })
  declare roleId: number

  @column.dateTime({ autoCreate: true, columnName: 'assigned_at' })
  declare assignedAt: DateTime

  @column({ columnName: 'assigned_by' })
  declare assignedBy: number | null

  @belongsTo(() => Group, {
    foreignKey: 'groupId',
  })
  declare group: BelongsTo<typeof Group>

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof Role>
}
