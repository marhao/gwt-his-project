import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class MenuItem extends BaseModel {
  static table = 'menu_items'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'menu_code' })
  declare menuCode: string

  @column({ columnName: 'menu_name' })
  declare menuName: string

  @column({ columnName: 'menu_name_th' })
  declare menuNameTh: string | null

  @column({ columnName: 'parent_id' })
  declare parentId: number | null

  @column()
  declare icon: string | null

  @column({ columnName: 'route_path' })
  declare routePath: string | null

  @column({ columnName: 'sort_order' })
  declare sortOrder: number

  @column({ columnName: 'is_active' })
  declare isActive: number

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime

  // Self-referencing relationship for tree structure
  @hasMany(() => MenuItem, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof MenuItem>
}

// Types for menu operations
export interface MenuItemTree {
  id: number
  menuCode: string
  menuName: string
  menuNameTh: string | null
  parentId: number | null
  icon: string | null
  routePath: string | null
  sortOrder: number
  isActive: number
  children: MenuItemTree[]
}

export interface UserMenuAccess {
  menuId: number
  menuCode: string
  menuName: string
  menuNameTh: string | null
  routePath: string | null
  icon: string | null
  parentId: number | null
  sortOrder: number
  canView: number
  canCreate: number
  canEdit: number
  canDelete: number
  canExport: number
  canPrint: number
}

export interface UserMenuAccessTree extends UserMenuAccess {
  children: UserMenuAccessTree[]
}
