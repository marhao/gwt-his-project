import type { HttpContext } from '@adonisjs/core/http'
import MenuItem from '#models/menu_item'
import type { MenuItemTree, UserMenuAccess, UserMenuAccessTree } from '#models/menu_item'
import RoleMenuAccess from '#models/role_menu_access'
import UserRole from '#models/user_role'
import db from '@adonisjs/lucid/services/db'

export default class SettingsController {
  // =========================================
  // Menu CRUD Operations
  // =========================================

  /**
   * @index
   * @summary Get all menu items
   * @description Returns all menu items ordered by sort_order
   * @responseBody 200 - Returns array of menu items
   */
  async index({ response }: HttpContext) {
    const data = await MenuItem.query()
      .orderBy('sort_order', 'asc')
      .orderBy('menu_name', 'asc')

    return response.ok({ success: true, data })
  }

  /**
   * @active
   * @summary Get active menu items
   * @description Returns only active menu items
   * @responseBody 200 - {"success": true, "data": []}
   */
  async active({ response }: HttpContext) {
    const data = await MenuItem.query()
      .where('is_active', 1)
      .orderBy('sort_order', 'asc')
      .orderBy('menu_name', 'asc')

    return response.ok({ success: true, data })
  }

  /**
   * @tree
   * @summary Get menu tree (active only)
   * @description Returns active menu items in tree structure
   * @responseBody 200 - {"success": true, "data": []}
   */
  async tree({ response }: HttpContext) {
    const items = await MenuItem.query()
      .where('is_active', 1)
      .orderBy('sort_order', 'asc')

    const tree = this.buildTree(items, null)
    return response.ok({ success: true, data: tree })
  }

  /**
   * @fullTree
   * @summary Get full menu tree (including inactive)
   * @description Returns all menu items in tree structure
   * @responseBody 200 - {"success": true, "data": []}
   */
  async fullTree({ response }: HttpContext) {
    const items = await MenuItem.query().orderBy('sort_order', 'asc')

    const tree = this.buildTree(items, null)
    return response.ok({ success: true, data: tree })
  }

  /**
   * @show
   * @summary Get menu item by ID
   * @description Returns a single menu item
   * @responseBody 200 - Returns menu item
   * @responseBody 404 - Menu item not found
   */
  async show({ params, response }: HttpContext) {
    const item = await MenuItem.find(params.id)

    if (!item) {
      return response.notFound({ success: false, message: 'Menu item not found' })
    }

    return response.ok({ success: true, data: item })
  }

  /**
   * @showByCode
   * @summary Get menu item by code
   * @description Returns a menu item by its code
   * @responseBody 200 - Returns menu item
   * @responseBody 404 - Menu item not found
   */
  async showByCode({ params, response }: HttpContext) {
    const item = await MenuItem.query()
      .where('menu_code', params.code)
      .first()

    if (!item) {
      return response.notFound({ success: false, message: 'Menu item not found' })
    }

    return response.ok({ success: true, data: item })
  }

  /**
   * @byParent
   * @summary Get menu items by parent ID
   * @description Returns menu items by parent ID (use 'null' for root items)
   * @responseBody 200 - {"success": true, "data": []}
   */
  async byParent({ params, response }: HttpContext) {
    const parentId = params.parentId === 'null' ? null : Number(params.parentId)

    let query = MenuItem.query().orderBy('sort_order', 'asc')

    if (parentId === null) {
      query = query.whereNull('parent_id')
    } else {
      query = query.where('parent_id', parentId)
    }

    const data = await query
    return response.ok({ success: true, data })
  }

  /**
   * @store
   * @summary Create menu item
   * @description Creates a new menu item
   * @requestBody {"menuCode": "dashboard", "menuName": "Dashboard", "menuNameTh": "แดชบอร์ด", "icon": "home", "routePath": "/dashboard", "sortOrder": 0, "isActive": 1}
   * @responseBody 201 - Menu item created successfully
   * @responseBody 400 - Menu code is required
   * @responseBody 409 - Menu code already exists
   */
  async store({ request, response }: HttpContext) {
    const { menuCode, menuName, menuNameTh, parentId, icon, routePath, sortOrder, isActive } =
      request.only([
        'menuCode',
        'menuName',
        'menuNameTh',
        'parentId',
        'icon',
        'routePath',
        'sortOrder',
        'isActive',
      ])

    if (!menuCode || !menuName) {
      return response.badRequest({
        success: false,
        message: 'Menu code and menu name are required',
      })
    }

    // Check if code exists
    const existing = await MenuItem.query().where('menu_code', menuCode).first()
    if (existing) {
      return response.conflict({ success: false, message: 'Menu code already exists' })
    }

    // Check parent exists
    if (parentId) {
      const parent = await MenuItem.find(parentId)
      if (!parent) {
        return response.notFound({ success: false, message: 'Parent menu not found' })
      }
    }

    const item = await MenuItem.create({
      menuCode,
      menuName,
      menuNameTh: menuNameTh ?? null,
      parentId: parentId ?? null,
      icon: icon ?? null,
      routePath: routePath ?? null,
      sortOrder: sortOrder ?? 0,
      isActive: isActive ?? 1,
    })

    return response.created({ success: true, data: item })
  }

  /**
   * @update
   * @summary Update menu item
   * @description Updates an existing menu item
   * @requestBody {"menuName": "Updated Name", "menuCode": "new_code"}
   * @responseBody 200 - Menu item updated
   * @responseBody 404 - Menu item not found
   */
  async update({ params, request, response }: HttpContext) {
    const item = await MenuItem.find(params.id)

    if (!item) {
      return response.notFound({ success: false, message: 'Menu item not found' })
    }

    const data = request.only([
      'menuCode',
      'menuName',
      'menuNameTh',
      'parentId',
      'icon',
      'routePath',
      'sortOrder',
      'isActive',
    ])

    // Check code uniqueness
    if (data.menuCode && data.menuCode !== item.menuCode) {
      const existing = await MenuItem.query().where('menu_code', data.menuCode).first()
      if (existing) {
        return response.conflict({ success: false, message: 'Menu code already exists' })
      }
    }

    // Check parent
    if (data.parentId !== undefined && data.parentId !== null) {
      if (data.parentId === item.id) {
        return response.badRequest({ success: false, message: 'Menu cannot be its own parent' })
      }
      const parent = await MenuItem.find(data.parentId)
      if (!parent) {
        return response.notFound({ success: false, message: 'Parent menu not found' })
      }
    }

    item.merge(data)
    await item.save()

    return response.ok({ success: true, data: item })
  }

  /**
   * @move
   * @summary Move menu item to new parent
   * @description Moves a menu item to a different parent
   * @requestBody {"parentId": 5}
   * @responseBody 200 - Menu item moved
   * @responseBody 400 - Menu cannot be its own parent
   */
  async move({ params, request, response }: HttpContext) {
    const item = await MenuItem.find(params.id)

    if (!item) {
      return response.notFound({ success: false, message: 'Menu item not found' })
    }

    const { parentId } = request.only(['parentId'])

    if (parentId !== null) {
      if (parentId === item.id) {
        return response.badRequest({ success: false, message: 'Menu cannot be its own parent' })
      }

      const parent = await MenuItem.find(parentId)
      if (!parent) {
        return response.notFound({ success: false, message: 'Parent menu not found' })
      }

      // Check circular reference
      const isCircular = await this.checkCircularReference(item.id, parentId)
      if (isCircular) {
        return response.badRequest({ success: false, message: 'Circular reference detected' })
      }
    }

    item.parentId = parentId
    await item.save()

    return response.ok({ success: true, data: item })
  }

  /**
   * @reorder
   * @summary Reorder menu items
   * @description Updates sort order for multiple menu items. Pass array of items with id and sortOrder.
   * @responseBody 200 - Menu items reordered successfully
   */
  async reorder({ request, response }: HttpContext) {
    const { items } = request.only(['items'])

    if (!items || !Array.isArray(items)) {
      return response.badRequest({ success: false, message: 'Items array is required' })
    }

    await db.transaction(async (trx) => {
      for (const item of items) {
        await MenuItem.query({ client: trx })
          .where('id', item.id)
          .update({ sort_order: item.sortOrder })
      }
    })

    return response.ok({ success: true, message: 'Menu items reordered' })
  }

  /**
   * @destroy
   * @summary Delete menu item
   * @description Deletes a menu item (must have no children)
   * @responseBody 200 - Menu item deleted
   * @responseBody 400 - Cannot delete menu with children
   */
  async destroy({ params, response }: HttpContext) {
    const item = await MenuItem.find(params.id)

    if (!item) {
      return response.notFound({ success: false, message: 'Menu item not found' })
    }

    // Check for children
    const children = await MenuItem.query().where('parent_id', item.id)
    if (children.length > 0) {
      return response.badRequest({ success: false, message: 'Cannot delete menu with children' })
    }

    // Delete role_menu_access entries
    await RoleMenuAccess.query().where('menu_id', item.id).delete()

    await item.delete()

    return response.ok({ success: true, message: 'Menu item deleted' })
  }

  // =========================================
  // Current User Menu Access
  // =========================================

  /**
   * @myAccess
   * @summary Get my menu access
   * @description Returns menu access for the current authenticated user
   * @responseBody 200 - Returns array of accessible menus
   * @responseBody 401 - Not authenticated
   */
  async myAccess({ request, response }: HttpContext) {
    const user = request.user

    if (!user) {
      return response.unauthorized({ success: false, message: 'Not authenticated' })
    }

    const data = await this.getUserMenuAccess(user.id)
    return response.ok({ success: true, data })
  }

  /**
   * @myTree
   * @summary Get my menu tree
   * @description Returns menu tree for the current authenticated user
   * @responseBody 200 - Returns menu tree structure
   * @responseBody 401 - Not authenticated
   */
  async myTree({ request, response }: HttpContext) {
    const user = request.user

    if (!user) {
      return response.unauthorized({ success: false, message: 'Not authenticated' })
    }

    const menus = await this.getUserMenuAccess(user.id)
    const tree = this.buildUserMenuTree(menus, null)
    return response.ok({ success: true, data: tree })
  }

  /**
   * @myCheck
   * @summary Check my menu access
   * @description Checks if the current user has access to a specific menu
   * @responseBody 200 - Returns access permissions for the menu
   * @responseBody 401 - Not authenticated
   */
  async myCheck({ request, params, response }: HttpContext) {
    const user = request.user

    if (!user) {
      return response.unauthorized({ success: false, message: 'Not authenticated' })
    }

    const data = await this.checkMenuAccess(user.id, params.menuCode)
    return response.ok({ success: true, data })
  }

  // =========================================
  // User Menu Access (Admin)
  // =========================================

  /**
   * @userAccess
   * @summary Get user menu access
   * @description Returns menu access for a specific user
   * @responseBody 200 - Returns array of accessible menus
   */
  async userAccess({ params, response }: HttpContext) {
    const data = await this.getUserMenuAccess(params.id)
    return response.ok({ success: true, data })
  }

  /**
   * @userTree
   * @summary Get user menu tree
   * @description Returns menu tree for a specific user
   * @responseBody 200 - Returns menu tree structure
   */
  async userTree({ params, response }: HttpContext) {
    const menus = await this.getUserMenuAccess(params.id)
    const tree = this.buildUserMenuTree(menus, null)
    return response.ok({ success: true, data: tree })
  }

  /**
   * @userCheck
   * @summary Check user menu access
   * @description Checks if a user has access to a specific menu
   * @responseBody 200 - Returns access permissions
   */
  async userCheck({ params, response }: HttpContext) {
    const data = await this.checkMenuAccess(params.id, params.menuCode)
    return response.ok({ success: true, data })
  }

  // =========================================
  // Helper Methods
  // =========================================

  private buildTree(items: MenuItem[], parentId: number | null): MenuItemTree[] {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        id: item.id,
        menuCode: item.menuCode,
        menuName: item.menuName,
        menuNameTh: item.menuNameTh,
        parentId: item.parentId,
        icon: item.icon,
        routePath: item.routePath,
        sortOrder: item.sortOrder,
        isActive: item.isActive,
        children: this.buildTree(items, item.id),
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder)
  }

  private async getUserMenuAccess(officerId: number): Promise<UserMenuAccess[]> {
    // Get direct roles
    const directRoles = await UserRole.query().where('user_id', officerId).select('role_id')

    // Get roles from groups
    const groupRoles = await db
      .from('user_groups')
      .innerJoin('group_roles', 'user_groups.group_id', 'group_roles.group_id')
      .where('user_groups.officer_id', officerId)
      .select('group_roles.role_id')

    // Combine unique role IDs
    const allRoleIds = [
      ...new Set([...directRoles.map((r) => r.roleId), ...groupRoles.map((r) => r.role_id)]),
    ]

    if (allRoleIds.length === 0) return []

    const result = await db
      .from('role_menu_access')
      .innerJoin('menu_items', 'role_menu_access.menu_id', 'menu_items.id')
      .whereIn('role_menu_access.role_id', allRoleIds)
      .where('menu_items.is_active', 1)
      .select([
        'menu_items.id as menuId',
        'menu_items.menu_code as menuCode',
        'menu_items.menu_name as menuName',
        'menu_items.menu_name_th as menuNameTh',
        'menu_items.route_path as routePath',
        'menu_items.icon',
        'menu_items.parent_id as parentId',
        'menu_items.sort_order as sortOrder',
      ])
      .max('role_menu_access.can_view as canView')
      .max('role_menu_access.can_create as canCreate')
      .max('role_menu_access.can_edit as canEdit')
      .max('role_menu_access.can_delete as canDelete')
      .max('role_menu_access.can_export as canExport')
      .max('role_menu_access.can_print as canPrint')
      .groupBy([
        'menu_items.id',
        'menu_items.menu_code',
        'menu_items.menu_name',
        'menu_items.menu_name_th',
        'menu_items.route_path',
        'menu_items.icon',
        'menu_items.parent_id',
        'menu_items.sort_order',
      ])
      .orderBy('menu_items.sort_order', 'asc')

    return result as unknown as UserMenuAccess[]
  }

  private buildUserMenuTree(items: UserMenuAccess[], parentId: number | null): UserMenuAccessTree[] {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        ...item,
        children: this.buildUserMenuTree(items, item.menuId),
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder)
  }

  private async checkMenuAccess(officerId: number, menuCode: string) {
    const menus = await this.getUserMenuAccess(officerId)
    const menu = menus.find((m) => m.menuCode === menuCode)

    return {
      menuCode,
      hasAccess: !!menu,
      canView: menu ? Number(menu.canView) === 1 : false,
      canCreate: menu ? Number(menu.canCreate) === 1 : false,
      canEdit: menu ? Number(menu.canEdit) === 1 : false,
      canDelete: menu ? Number(menu.canDelete) === 1 : false,
      canExport: menu ? Number(menu.canExport) === 1 : false,
      canPrint: menu ? Number(menu.canPrint) === 1 : false,
    }
  }

  private async checkCircularReference(menuId: number, newParentId: number): Promise<boolean> {
    let currentId: number | null = newParentId

    while (currentId !== null) {
      if (currentId === menuId) {
        return true
      }

      const parentItem: MenuItem | null = await MenuItem.find(currentId)
      currentId = parentItem?.parentId ?? null
    }

    return false
  }
}
