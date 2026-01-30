/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
|
| Routes for user management (CRUD operations)
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#controllers/users_controller')

export default function userRoutes() {
  router
    .group(() => {
      // Users list and details
      router.get('/', [UsersController, 'index'])
      router.get('/:id', [UsersController, 'show'])
      router.put('/:id', [UsersController, 'update'])

      // User groups management
      router.get('/:id/groups', [UsersController, 'getGroups'])
      router.post('/:id/groups', [UsersController, 'addGroup'])
      router.put('/:id/groups/:groupId', [UsersController, 'updateGroup'])
      router.delete('/:id/groups/:groupId', [UsersController, 'removeGroup'])

      // User roles management
      router.get('/:id/roles', [UsersController, 'getRoles'])
      router.post('/:id/roles', [UsersController, 'addRole'])
      router.delete('/:id/roles/:roleId', [UsersController, 'removeRole'])
    })
    .prefix('/api/v1/settings/users')
    .use(middleware.auth())
}
