import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Officer from './officer.js'
import Group from './group.js'

export default class UserGroup extends BaseModel {
  static table = 'user_groups'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'officer_id' })
  declare officerId: number

  @column({ columnName: 'group_id' })
  declare groupId: number

  @column({ columnName: 'is_primary' })
  declare isPrimary: number

  @belongsTo(() => Officer, {
    foreignKey: 'officerId',
  })
  declare officer: BelongsTo<typeof Officer>

  @belongsTo(() => Group, {
    foreignKey: 'groupId',
  })
  declare group: BelongsTo<typeof Group>
}
