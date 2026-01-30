import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'

export default class RolesController {
  /**
   * List all roles
   */
  async index({ response }: HttpContext) {
    try {
      const roles = await Role.query()
        .orderBy('role_name', 'asc')

      return response.ok({
        data: roles.map((role) => ({
          id: role.id,
          role_code: role.roleCode,
          role_name: role.roleName,
          description: role.description,
          is_active: role.isActive,
          created_at: role.createdAt?.toISO(),
          updated_at: role.updatedAt?.toISO(),
        })),
      })
    } catch (error) {
      console.error('Error fetching roles:', error)
      return response.internalServerError({
        message: 'Failed to fetch roles',
        error: error.message,
      })
    }
  }

  /**
   * List active roles only
   */
  async active({ response }: HttpContext) {
    try {
      const roles = await Role.query()
        .where('is_active', true)
        .orderBy('role_name', 'asc')

      return response.ok({
        data: roles.map((role) => ({
          id: role.id,
          role_code: role.roleCode,
          role_name: role.roleName,
          description: role.description,
          is_active: role.isActive,
        })),
      })
    } catch (error) {
      console.error('Error fetching active roles:', error)
      return response.internalServerError({
        message: 'Failed to fetch active roles',
        error: error.message,
      })
    }
  }

  /**
   * Create new role
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['role_code', 'role_name', 'description', 'is_active'])

      if (!data.role_code || !data.role_name) {
        return response.badRequest({ message: 'Role code and name are required' })
      }

      // Check if role code exists
      const existing = await Role.findBy('role_code', data.role_code)
      if (existing) {
        return response.badRequest({ message: 'Role code already exists' })
      }

      const role = await Role.create({
        roleCode: data.role_code,
        roleName: data.role_name,
        description: data.description || null,
        isActive: data.is_active !== undefined ? data.is_active : true,
      })

      return response.created({
        message: 'Role created successfully',
        data: {
          id: role.id,
          role_code: role.roleCode,
          role_name: role.roleName,
          description: role.description,
          is_active: role.isActive,
        },
      })
    } catch (error) {
      console.error('Error creating role:', error)
      return response.internalServerError({
        message: 'Failed to create role',
        error: error.message,
      })
    }
  }

  /**
   * Show single role
   */
  async show({ params, response }: HttpContext) {
    try {
      const role = await Role.find(params.id)

      if (!role) {
        return response.notFound({ message: 'Role not found' })
      }

      return response.ok({
        data: {
          id: role.id,
          role_code: role.roleCode,
          role_name: role.roleName,
          description: role.description,
          is_active: role.isActive,
          created_at: role.createdAt?.toISO(),
          updated_at: role.updatedAt?.toISO(),
        },
      })
    } catch (error) {
      console.error('Error fetching role:', error)
      return response.internalServerError({
        message: 'Failed to fetch role',
        error: error.message,
      })
    }
  }

  /**
   * Update role
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const role = await Role.find(params.id)

      if (!role) {
        return response.notFound({ message: 'Role not found' })
      }

      const data = request.only(['role_code', 'role_name', 'description', 'is_active'])

      if (data.role_code !== undefined) {
        // Check if code is taken by another role
        const existing = await Role.query()
          .where('role_code', data.role_code)
          .whereNot('id', params.id)
          .first()
          
        if (existing) {
          return response.badRequest({ message: 'Role code already exists' })
        }
        role.roleCode = data.role_code
      }

      if (data.role_name !== undefined) {
        role.roleName = data.role_name
      }

      if (data.description !== undefined) {
        role.description = data.description
      }

      if (data.is_active !== undefined) {
        role.isActive = data.is_active
      }

      await role.save()

      return response.ok({
        message: 'Role updated successfully',
        data: {
          id: role.id,
          role_code: role.roleCode,
          role_name: role.roleName,
          description: role.description,
          is_active: role.isActive,
        },
      })
    } catch (error) {
      console.error('Error updating role:', error)
      return response.internalServerError({
        message: 'Failed to update role',
        error: error.message,
      })
    }
  }

  /**
   * Delete role
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const role = await Role.find(params.id)

      if (!role) {
        return response.notFound({ message: 'Role not found' })
      }

      await role.delete()

      return response.ok({ message: 'Role deleted successfully' })
    } catch (error) {
      console.error('Error deleting role:', error)
      return response.internalServerError({
        message: 'Failed to delete role',
        error: error.message,
      })
    }
  }
}
