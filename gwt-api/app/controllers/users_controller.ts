import type { HttpContext } from '@adonisjs/core/http'
import Officer from '#models/officer'
import UserGroup from '#models/user_group'
import UserRole from '#models/user_role'
import Group from '#models/group'
import Role from '#models/role'
import crypto from 'node:crypto'

export default class UsersController {
  /**
   * List all users (officers) with pagination
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)
      const search = request.input('search', '')
      const status = request.input('status', 'all') // all, active, inactive

      let query = Officer.query()

      // Search filter
      if (search) {
        query = query.where((builder) => {
          builder
            .whereILike('officer_name', `%${search}%`)
            .orWhereILike('officer_login_name', `%${search}%`)
            .orWhereILike('officer_email', `%${search}%`)
        })
      }

      // Status filter
      if (status === 'active') {
        query = query.where('officer_active', 'Y')
      } else if (status === 'inactive') {
        query = query.where('officer_active', '!=', 'Y')
      }

      // Get paginated results
      const officersPaginated = await query
        .orderBy('officer_name', 'asc')
        .paginate(page, limit)

      // Get groups and roles for each officer
      const data = await Promise.all(
        officersPaginated.all().map(async (officer) => {
          const userGroups = await UserGroup.query()
            .where('officer_id', officer.officerId)
            .preload('group')

          const userRoles = await UserRole.query()
            .where('officer_id', officer.officerId)
            .preload('role')

          return {
            officer_id: officer.officerId,
            officer_login_name: officer.officerLoginName,
            officer_name: officer.officerName || officer.fullName,
            officer_position: officer.officerGroupListText,
            officer_email: officer.officerEmail,
            officer_phone: officer.officerMobile || officer.officerPhone,
            officer_active: officer.officerActive,
            groups: userGroups.map((ug) => ({
              id: ug.id,
              group_id: ug.groupId,
              group_code: ug.group?.groupCode,
              group_name: ug.group?.groupName,
              is_primary: ug.isPrimary,
            })),
            roles: userRoles.map((ur) => ({
              id: ur.id,
              role_id: ur.roleId,
              role_code: ur.role?.roleCode,
              role_name: ur.role?.roleName,
            })),
          }
        })
      )

      return response.ok({
        data,
        meta: {
          total: officersPaginated.total,
          per_page: officersPaginated.perPage,
          current_page: officersPaginated.currentPage,
          last_page: officersPaginated.lastPage,
          first_page: 1,
          first_page_url: officersPaginated.getUrl(1),
          last_page_url: officersPaginated.getUrl(officersPaginated.lastPage),
          next_page_url: officersPaginated.getNextPageUrl(),
          previous_page_url: officersPaginated.getPreviousPageUrl(),
        },
      })
    } catch (error) {
      console.error('Error fetching users:', error)
      return response.internalServerError({
        message: 'Failed to fetch users',
        error: error.message,
      })
    }
  }

  /**
   * Show single user
   */
  async show({ params, response }: HttpContext) {
    try {
      const officer = await Officer.find(params.id)

      if (!officer) {
        return response.notFound({ message: 'User not found' })
      }

      const userGroups = await UserGroup.query()
        .where('officer_id', officer.officerId)
        .preload('group')

      const userRoles = await UserRole.query()
        .where('user_id', officer.officerId)
        .preload('role')

      return response.ok({
        data: {
          id: officer.officerId,
          officer_login: officer.officerLoginName,
          officer_name: officer.officerName || officer.fullName,
          officer_position: officer.officerGroupListText,
          officer_email: officer.officerEmail,
          officer_phone: officer.officerMobile || officer.officerPhone,
          is_active: officer.officerActive === 'Y',
          created_at: null, // officer table may not have this
          updated_at: null,
          last_login: null,
          groups: userGroups.map((ug) => ({
            id: ug.id,
            group_id: ug.groupId,
            group_code: ug.group?.groupCode,
            group_name: ug.group?.groupName,
            is_primary: ug.isPrimary,
          })),
          roles: userRoles.map((ur) => ({
            id: ur.id,
            role_id: ur.roleId,
            role_code: ur.role?.roleCode,
            role_name: ur.role?.roleName,
          })),
        },
      })
    } catch (error) {
      console.error('Error fetching user:', error)
      return response.internalServerError({
        message: 'Failed to fetch user',
        error: error.message,
      })
    }
  }

  /**
   * Update user
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const officer = await Officer.find(params.id)

      if (!officer) {
        return response.notFound({ message: 'User not found' })
      }

      const data = request.only([
        'officer_name',
        'officer_position',
        'officer_email',
        'officer_phone',
        'password',
        'is_active',
      ])

      if (data.officer_name !== undefined) {
        officer.officerName = data.officer_name
      }

      if (data.officer_position !== undefined) {
        officer.officerGroupListText = data.officer_position
      }

      if (data.officer_email !== undefined) {
        officer.officerEmail = data.officer_email
      }

      if (data.officer_phone !== undefined) {
        officer.officerMobile = data.officer_phone
      }

      if (data.password) {
        officer.officerLoginPasswordMd5 = crypto.createHash('md5').update(data.password).digest('hex')
      }

      if (data.is_active !== undefined) {
        officer.officerActive = data.is_active ? 'Y' : 'N'
      }

      await officer.save()

      return response.ok({
        message: 'User updated successfully',
        data: {
          id: officer.officerId,
          officer_login: officer.officerLoginName,
          officer_name: officer.officerName,
          is_active: officer.officerActive === 'Y',
        },
      })
    } catch (error) {
      console.error('Error updating user:', error)
      return response.internalServerError({
        message: 'Failed to update user',
        error: error.message,
      })
    }
  }

  /**
   * Get user's groups
   */
  async getGroups({ params, response }: HttpContext) {
    try {
      const userGroups = await UserGroup.query()
        .where('officer_id', params.id)
        .preload('group')

      return response.ok({
        data: userGroups.map((ug) => ({
          id: ug.id,
          group_id: ug.groupId,
          group_code: ug.group?.groupCode,
          group_name: ug.group?.groupName,
          is_primary: ug.isPrimary,
        })),
      })
    } catch (error) {
      console.error('Error fetching user groups:', error)
      return response.internalServerError({
        message: 'Failed to fetch user groups',
        error: error.message,
      })
    }
  }

  /**
   * Add user to group
   */
  async addGroup({ params, request, response }: HttpContext) {
    try {
      const { group_id, is_primary = false } = request.only(['group_id', 'is_primary'])

      // Check if officer exists
      const officer = await Officer.find(params.id)
      if (!officer) {
        return response.notFound({ message: 'User not found' })
      }

      // Check if group exists
      const group = await Group.find(group_id)
      if (!group) {
        return response.notFound({ message: 'Group not found' })
      }

      // Check if already in group
      const existing = await UserGroup.query()
        .where('officer_id', params.id)
        .where('group_id', group_id)
        .first()

      if (existing) {
        return response.badRequest({ message: 'User already in this group' })
      }

      // If setting as primary, unset other primaries
      if (is_primary) {
        await UserGroup.query()
          .where('officer_id', params.id)
          .update({ is_primary: false })
      }

      const userGroup = await UserGroup.create({
        officerId: params.id,
        groupId: group_id,
        isPrimary: is_primary,
      })

      return response.created({
        message: 'User added to group',
        data: {
          id: userGroup.id,
          group_id: group.id,
          group_code: group.groupCode,
          group_name: group.groupName,
          is_primary: userGroup.isPrimary,
        },
      })
    } catch (error) {
      console.error('Error adding user to group:', error)
      return response.internalServerError({
        message: 'Failed to add user to group',
        error: error.message,
      })
    }
  }

  /**
   * Update user group (e.g., toggle primary)
   */
  async updateGroup({ params, request, response }: HttpContext) {
    try {
      const { is_primary } = request.only(['is_primary'])

      const userGroup = await UserGroup.query()
        .where('officer_id', params.id)
        .where('group_id', params.groupId)
        .first()

      if (!userGroup) {
        return response.notFound({ message: 'User group not found' })
      }

      // If setting as primary, unset other primaries
      if (is_primary) {
        await UserGroup.query()
          .where('officer_id', params.id)
          .whereNot('group_id', params.groupId)
          .update({ is_primary: false })
      }

      userGroup.isPrimary = is_primary
      await userGroup.save()

      return response.ok({
        message: 'User group updated',
        data: {
          id: userGroup.id,
          is_primary: userGroup.isPrimary,
        },
      })
    } catch (error) {
      console.error('Error updating user group:', error)
      return response.internalServerError({
        message: 'Failed to update user group',
        error: error.message,
      })
    }
  }

  /**
   * Remove user from group
   */
  async removeGroup({ params, response }: HttpContext) {
    try {
      const userGroup = await UserGroup.query()
        .where('officer_id', params.id)
        .where('group_id', params.groupId)
        .first()

      if (!userGroup) {
        return response.notFound({ message: 'User group not found' })
      }

      await userGroup.delete()

      return response.ok({ message: 'User removed from group' })
    } catch (error) {
      console.error('Error removing user from group:', error)
      return response.internalServerError({
        message: 'Failed to remove user from group',
        error: error.message,
      })
    }
  }

  /**
   * Get user's roles
   */
  async getRoles({ params, response }: HttpContext) {
    try {
      const userRoles = await UserRole.query()
        .where('user_id', params.id)
        .preload('role')

      return response.ok({
        data: userRoles.map((ur) => ({
          id: ur.id,
          role_id: ur.roleId,
          role_code: ur.role?.roleCode,
          role_name: ur.role?.roleName,
        })),
      })
    } catch (error) {
      console.error('Error fetching user roles:', error)
      return response.internalServerError({
        message: 'Failed to fetch user roles',
        error: error.message,
      })
    }
  }

  /**
   * Add role to user
   */
  async addRole({ params, request, response }: HttpContext) {
    try {
      const { role_id } = request.only(['role_id'])

      // Check if officer exists
      const officer = await Officer.find(params.id)
      if (!officer) {
        return response.notFound({ message: 'User not found' })
      }

      // Check if role exists
      const role = await Role.find(role_id)
      if (!role) {
        return response.notFound({ message: 'Role not found' })
      }

      // Check if already has role
      const existing = await UserRole.query()
        .where('user_id', params.id)
        .where('role_id', role_id)
        .first()

      if (existing) {
        return response.badRequest({ message: 'User already has this role' })
      }

      const userRole = await UserRole.create({
        userId: params.id,
        roleId: role_id,
      })

      return response.created({
        message: 'Role added to user',
        data: {
          id: userRole.id,
          role_id: role.id,
          role_code: role.roleCode,
          role_name: role.roleName,
        },
      })
    } catch (error) {
      console.error('Error adding role to user:', error)
      return response.internalServerError({
        message: 'Failed to add role to user',
        error: error.message,
      })
    }
  }

  /**
   * Remove role from user
   */
  async removeRole({ params, response }: HttpContext) {
    try {
      const userRole = await UserRole.query()
        .where('user_id', params.id)
        .where('role_id', params.roleId)
        .first()

      if (!userRole) {
        return response.notFound({ message: 'User role not found' })
      }

      await userRole.delete()

      return response.ok({ message: 'Role removed from user' })
    } catch (error) {
      console.error('Error removing role from user:', error)
      return response.internalServerError({
        message: 'Failed to remove role from user',
        error: error.message,
      })
    }
  }
}
