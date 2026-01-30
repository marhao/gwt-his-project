import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import MenuItem from './menu_item.js'

export default class RoleMenuAccess extends BaseModel {
  static table = 'role_menu_access'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'role_id' })
  declare roleId: number

  @column({ columnName: 'menu_id' })
  declare menuId: number

  @column({ columnName: 'can_view' })
  declare canView: number

  @column({ columnName: 'can_create' })
  declare canCreate: number

  @column({ columnName: 'can_edit' })
  declare canEdit: number

  @column({ columnName: 'can_delete' })
  declare canDelete: number

  @column({ columnName: 'can_export' })
  declare canExport: number

  @column({ columnName: 'can_print' })
  declare canPrint: number

  @belongsTo(() => MenuItem, {
    foreignKey: 'menuId',
  })
  declare menu: BelongsTo<typeof MenuItem>
}
