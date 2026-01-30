import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Group extends BaseModel {
  static table = 'groups'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'group_code' })
  declare groupCode: string

  @column({ columnName: 'group_name' })
  declare groupName: string

  @column()
  declare description: string | null

  @column({ columnName: 'parent_id' })
  declare parentId: number | null

  @column({ columnName: 'is_active' })
  declare isActive: number

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime

  // Self-referential relationship for nested groups
  @belongsTo(() => Group, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof Group>

  @hasMany(() => Group, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof Group>
}
