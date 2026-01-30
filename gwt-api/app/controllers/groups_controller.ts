import type { HttpContext } from '@adonisjs/core/http'
import Group from '#models/group'
import GroupRole from '#models/group_role'
import UserGroup from '#models/user_group'
import db from '@adonisjs/lucid/services/db'

// Types
interface GroupTree {
  id: number
  groupCode: string
  groupName: string
  description: string | null
  parentId: number | null
  isActive: number
  createdAt: string
  updatedAt: string
  _count: {
    users: number
    roles: number
    children: number
  }
  children: GroupTree[]
}

export default class GroupsController {
  // =========================================
  // Group CRUD Operations
  // =========================================

  /**
   * @index
   * @summary Get all groups
   * @description Returns all groups with counts
   * @responseBody 200 - Returns array of groups
   */
  async index({ response }: HttpContext) {
    const groups = await Group.query()
      .orderBy('group_name', 'asc')

    // Get counts for each group
    const data = await Promise.all(
      groups.map(async (group) => {
        const userCount = await UserGroup.query()
          .where('group_id', group.id)
          .count('* as total')
        const roleCount = await GroupRole.query()
          .where('group_id', group.id)
          .count('* as total')
        const childCount = await Group.query()
          .where('parent_id', group.id)
          .count('* as total')

        return {
          id: group.id,
          group_code: group.groupCode,
          group_name: group.groupName,
          description: group.description,
          parent_id: group.parentId,
          is_active: group.isActive,
          created_at: group.createdAt?.toISO() || null,
          updated_at: group.updatedAt?.toISO() || null,
          _count: {
            users: Number(userCount[0].$extras.total) || 0,
            roles: Number(roleCount[0].$extras.total) || 0,
            children: Number(childCount[0].$extras.total) || 0,
          },
        }
      })
    )

    return response.ok({ success: true, data })
  }

  /**
   * @active
   * @summary Get active groups
   * @description Returns only active groups
   * @responseBody 200 - Returns array of active groups
   */
  async active({ response }: HttpContext) {
    const groups = await Group.query()
      .where('is_active', 1)
      .orderBy('group_name', 'asc')

    const data = groups.map((group) => ({
      id: group.id,
      group_code: group.groupCode,
      group_name: group.groupName,
      description: group.description,
      parent_id: group.parentId,
      is_active: group.isActive,
      created_at: group.createdAt?.toISO() || null,
      updated_at: group.updatedAt?.toISO() || null,
    }))

    return response.ok({ success: true, data })
  }

  /**
   * @tree
   * @summary Get groups as tree structure
   * @description Returns groups in hierarchical tree structure
   * @responseBody 200 - Returns tree of groups
   */
  async tree({ response }: HttpContext) {
    const groups = await Group.query()
      .where('is_active', 1)
      .orderBy('group_name', 'asc')

    // Get counts
    const groupsWithCounts = await Promise.all(
      groups.map(async (group) => {
        const userCount = await UserGroup.query()
          .where('group_id', group.id)
          .count('* as total')
        const roleCount = await GroupRole.query()
          .where('group_id', group.id)
          .count('* as total')
        const childCount = await Group.query()
          .where('parent_id', group.id)
          .count('* as total')

        return {
          id: group.id,
          groupCode: group.groupCode,
          groupName: group.groupName,
          description: group.description,
          parentId: group.parentId,
          isActive: group.isActive,
          createdAt: group.createdAt?.toISO() || '',
          updatedAt: group.updatedAt?.toISO() || '',
          _count: {
            users: Number(userCount[0].$extras.total) || 0,
            roles: Number(roleCount[0].$extras.total) || 0,
            children: Number(childCount[0].$extras.total) || 0,
          },
        }
      })
    )

    const tree = this.buildTree(groupsWithCounts, null)
    return response.ok({ success: true, data: tree })
  }

  /**
   * @show
   * @summary Get group by ID
   * @description Returns a single group with counts
   * @responseBody 200 - Returns group
   * @responseBody 404 - Group not found
   */
  async show({ params, response }: HttpContext) {
    const group = await Group.find(params.id)

    if (!group) {
      return response.notFound({ success: false, message: 'Group not found' })
    }

    // Get counts
    const userCount = await UserGroup.query()
      .where('group_id', group.id)
      .count('* as total')
    const roleCount = await GroupRole.query()
      .where('group_id', group.id)
      .count('* as total')
    const childCount = await Group.query()
      .where('parent_id', group.id)
      .count('* as total')

    const data = {
      id: group.id,
      group_code: group.groupCode,
      group_name: group.groupName,
      description: group.description,
      parent_id: group.parentId,
      is_active: group.isActive,
      created_at: group.createdAt?.toISO() || null,
      updated_at: group.updatedAt?.toISO() || null,
      _count: {
        users: Number(userCount[0].$extras.total) || 0,
        roles: Number(roleCount[0].$extras.total) || 0,
        children: Number(childCount[0].$extras.total) || 0,
      },
    }

    return response.ok({ success: true, data })
  }

  /**
   * @store
   * @summary Create a new group
   * @description Creates a new group
   * @requestBody {"group_code": "string", "group_name": "string", "description": "string", "parent_id": "number", "is_active": "number"}
   * @responseBody 201 - Returns created group
   * @responseBody 400 - Validation error
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'group_code',
      'group_name',
      'description',
      'parent_id',
      'is_active',
    ])

    // Check if group_code already exists
    const existing = await Group.query()
      .where('group_code', data.group_code)
      .first()

    if (existing) {
      return response.badRequest({
        success: false,
        message: 'Group code already exists',
      })
    }

    // Check parent exists if provided
    if (data.parent_id) {
      const parent = await Group.find(data.parent_id)
      if (!parent) {
        return response.badRequest({
          success: false,
          message: 'Parent group not found',
        })
      }
    }

    const group = await Group.create({
      groupCode: data.group_code,
      groupName: data.group_name,
      description: data.description || null,
      parentId: data.parent_id || null,
      isActive: data.is_active ?? 1,
    })

    return response.created({
      success: true,
      data: {
        id: group.id,
        group_code: group.groupCode,
        group_name: group.groupName,
        description: group.description,
        parent_id: group.parentId,
        is_active: group.isActive,
        created_at: group.createdAt?.toISO() || null,
        updated_at: group.updatedAt?.toISO() || null,
      },
    })
  }

  /**
   * @update
   * @summary Update a group
   * @description Updates an existing group
   * @requestBody {"group_code": "string", "group_name": "string", "description": "string", "parent_id": "number", "is_active": "number"}
   * @responseBody 200 - Returns updated group
   * @responseBody 404 - Group not found
   */
  async update({ params, request, response }: HttpContext) {
    const group = await Group.find(params.id)

    if (!group) {
      return response.notFound({ success: false, message: 'Group not found' })
    }

    const data = request.only([
      'group_code',
      'group_name',
      'description',
      'parent_id',
      'is_active',
    ])

    // Check if new group_code already exists (if changed)
    if (data.group_code && data.group_code !== group.groupCode) {
      const existing = await Group.query()
        .where('group_code', data.group_code)
        .whereNot('id', group.id)
        .first()

      if (existing) {
        return response.badRequest({
          success: false,
          message: 'Group code already exists',
        })
      }
    }

    // Check circular reference
    if (data.parent_id !== undefined) {
      if (data.parent_id === group.id) {
        return response.badRequest({
          success: false,
          message: 'A group cannot be its own parent',
        })
      }

      if (data.parent_id !== null) {
        const isDescendant = await this.checkCircularReference(
          group.id,
          data.parent_id
        )
        if (isDescendant) {
          return response.badRequest({
            success: false,
            message: 'Cannot set a descendant as parent (circular reference)',
          })
        }

        // Check parent exists
        const parent = await Group.find(data.parent_id)
        if (!parent) {
          return response.badRequest({
            success: false,
            message: 'Parent group not found',
          })
        }
      }
    }

    // Update fields
    if (data.group_code !== undefined) group.groupCode = data.group_code
    if (data.group_name !== undefined) group.groupName = data.group_name
    if (data.description !== undefined) group.description = data.description
    if (data.parent_id !== undefined) group.parentId = data.parent_id
    if (data.is_active !== undefined) group.isActive = data.is_active

    await group.save()

    return response.ok({
      success: true,
      data: {
        id: group.id,
        group_code: group.groupCode,
        group_name: group.groupName,
        description: group.description,
        parent_id: group.parentId,
        is_active: group.isActive,
        created_at: group.createdAt?.toISO() || null,
        updated_at: group.updatedAt?.toISO() || null,
      },
    })
  }

  /**
   * @destroy
   * @summary Delete a group
   * @description Deletes a group
   * @responseBody 200 - Group deleted
   * @responseBody 404 - Group not found
   * @responseBody 400 - Cannot delete group with members or children
   */
  async destroy({ params, response }: HttpContext) {
    const group = await Group.find(params.id)

    if (!group) {
      return response.notFound({ success: false, message: 'Group not found' })
    }

    // Check if group has members
    const userCount = await UserGroup.query()
      .where('group_id', group.id)
      .count('* as total')

    if (Number(userCount[0].$extras.total) > 0) {
      return response.badRequest({
        success: false,
        message: 'Cannot delete group with members',
      })
    }

    // Check if group has children
    const childCount = await Group.query()
      .where('parent_id', group.id)
      .count('* as total')

    if (Number(childCount[0].$extras.total) > 0) {
      return response.badRequest({
        success: false,
        message: 'Cannot delete group with sub-groups',
      })
    }

    // Delete group roles first
    await GroupRole.query().where('group_id', group.id).delete()

    // Delete group
    await group.delete()

    return response.ok({ success: true, message: 'Group deleted' })
  }

  // =========================================
  // Group Roles Operations
  // =========================================

  /**
   * @roles
   * @summary Get roles for a group
   * @description Returns all roles assigned to a group
   * @responseBody 200 - Returns array of roles
   */
  async roles({ params, response }: HttpContext) {
    const group = await Group.find(params.id)

    if (!group) {
      return response.notFound({ success: false, message: 'Group not found' })
    }

    const groupRoles = await db
      .from('group_roles')
      .join('roles', 'group_roles.role_id', 'roles.id')
      .where('group_roles.group_id', group.id)
      .select(
        'roles.id',
        'roles.role_code',
        'roles.role_name',
        'roles.description',
        'roles.is_active',
        'group_roles.assigned_at'
      )

    return response.ok({ success: true, data: groupRoles })
  }

  /**
   * @addRole
   * @summary Add a role to a group
   * @description Assigns a role to a group
   * @responseBody 200 - Role added
   * @responseBody 404 - Group or role not found
   * @responseBody 400 - Role already assigned
   */
  async addRole({ params, response }: HttpContext) {
    const { id: groupId, roleId } = params

    // Check if already exists
    const existing = await GroupRole.query()
      .where('group_id', groupId)
      .where('role_id', roleId)
      .first()

    if (existing) {
      return response.badRequest({
        success: false,
        message: 'Role already assigned to this group',
      })
    }

    await GroupRole.create({
      groupId: Number(groupId),
      roleId: Number(roleId),
    })

    return response.ok({ success: true, message: 'Role added to group' })
  }

  /**
   * @removeRole
   * @summary Remove a role from a group
   * @description Removes a role assignment from a group
   * @responseBody 200 - Role removed
   * @responseBody 404 - Assignment not found
   */
  async removeRole({ params, response }: HttpContext) {
    const { id: groupId, roleId } = params

    const deleted = await GroupRole.query()
      .where('group_id', groupId)
      .where('role_id', roleId)
      .delete()

    if (deleted[0] === 0) {
      return response.notFound({
        success: false,
        message: 'Role assignment not found',
      })
    }

    return response.ok({ success: true, message: 'Role removed from group' })
  }

  // =========================================
  // Group Users Operations
  // =========================================

  /**
   * @users
   * @summary Get users in a group
   * @description Returns all users in a group
   * @responseBody 200 - Returns array of users
   */
  async users({ params, response }: HttpContext) {
    const group = await Group.find(params.id)

    if (!group) {
      return response.notFound({ success: false, message: 'Group not found' })
    }

    const groupUsers = await db
      .from('user_groups')
      .join('officer', 'user_groups.officer_id', 'officer.officer_id')
      .where('user_groups.group_id', group.id)
      .select(
        'officer.officer_id as id',
        'officer.officer_login_name as username',
        'officer.officer_name as full_name',
        'officer.officer_email as email',
        'user_groups.is_primary'
      )

    return response.ok({ success: true, data: groupUsers })
  }

  /**
   * @addUser
   * @summary Add a user to a group
   * @description Adds a user to a group
   * @responseBody 200 - User added
   * @responseBody 400 - User already in group
   */
  async addUser({ params, request, response }: HttpContext) {
    const { id: groupId, userId } = params
    const { is_primary } = request.only(['is_primary'])

    // Check if already exists
    const existing = await UserGroup.query()
      .where('group_id', groupId)
      .where('officer_id', userId)
      .first()

    if (existing) {
      return response.badRequest({
        success: false,
        message: 'User already in this group',
      })
    }

    await UserGroup.create({
      groupId: Number(groupId),
      officerId: Number(userId),
      isPrimary: is_primary ?? 0,
    })

    return response.ok({ success: true, message: 'User added to group' })
  }

  /**
   * @removeUser
   * @summary Remove a user from a group
   * @description Removes a user from a group
   * @responseBody 200 - User removed
   * @responseBody 404 - User not in group
   */
  async removeUser({ params, response }: HttpContext) {
    const { id: groupId, userId } = params

    const deleted = await UserGroup.query()
      .where('group_id', groupId)
      .where('officer_id', userId)
      .delete()

    if (deleted[0] === 0) {
      return response.notFound({
        success: false,
        message: 'User not in this group',
      })
    }

    return response.ok({ success: true, message: 'User removed from group' })
  }

  // =========================================
  // Helper Methods
  // =========================================

  /**
   * Build tree structure from flat list
   */
  private buildTree(
    items: Array<{
      id: number
      groupCode: string
      groupName: string
      description: string | null
      parentId: number | null
      isActive: number
      createdAt: string
      updatedAt: string
      _count: { users: number; roles: number; children: number }
    }>,
    parentId: number | null
  ): GroupTree[] {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        id: item.id,
        groupCode: item.groupCode,
        groupName: item.groupName,
        description: item.description,
        parentId: item.parentId,
        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        _count: item._count,
        children: this.buildTree(items, item.id),
      }))
  }

  /**
   * Check if targetId is a descendant of groupId
   */
  private async checkCircularReference(
    groupId: number,
    targetId: number
  ): Promise<boolean> {
    const descendants = await this.getDescendantIds(groupId)
    return descendants.includes(targetId)
  }

  /**
   * Get all descendant IDs of a group
   */
  private async getDescendantIds(groupId: number): Promise<number[]> {
    const children = await Group.query().where('parent_id', groupId)
    const ids: number[] = children.map((c) => c.id)

    for (const child of children) {
      const childDescendants = await this.getDescendantIds(child.id)
      ids.push(...childDescendants)
    }

    return ids
  }
}
