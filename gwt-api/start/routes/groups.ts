/*
|--------------------------------------------------------------------------
| Groups Routes
|--------------------------------------------------------------------------
|
| Routes for group management
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const GroupsController = () => import('#controllers/groups_controller')

export default function groupsRoutes() {
  router
    .group(() => {
      // =========================================
      // Static Routes First
      // =========================================

      // Get all groups
      router.get('/', [GroupsController, 'index'])

      // Get active groups
      router.get('/active', [GroupsController, 'active'])

      // Get groups as tree
      router.get('/tree', [GroupsController, 'tree'])

      // Create group
      router.post('/', [GroupsController, 'store'])

      // =========================================
      // Dynamic Routes (/:id)
      // =========================================

      // Get group by ID
      router.get('/:id', [GroupsController, 'show'])

      // Update group
      router.put('/:id', [GroupsController, 'update'])

      // Delete group
      router.delete('/:id', [GroupsController, 'destroy'])

      // =========================================
      // Group Roles
      // =========================================

      // Get roles for a group
      router.get('/:id/roles', [GroupsController, 'roles'])

      // Add role to group
      router.post('/:id/roles/:roleId', [GroupsController, 'addRole'])

      // Remove role from group
      router.delete('/:id/roles/:roleId', [GroupsController, 'removeRole'])

      // =========================================
      // Group Users
      // =========================================

      // Get users in a group
      router.get('/:id/users', [GroupsController, 'users'])

      // Add user to group
      router.post('/:id/users/:userId', [GroupsController, 'addUser'])

      // Remove user from group
      router.delete('/:id/users/:userId', [GroupsController, 'removeUser'])
    })
    .prefix('/api/v1/settings/groups')
    .use(middleware.auth())
}
