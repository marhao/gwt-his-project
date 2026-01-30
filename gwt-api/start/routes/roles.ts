/*
|--------------------------------------------------------------------------
| Role Routes
|--------------------------------------------------------------------------
|
| Routes for role management (CRUD operations)
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const RolesController = () => import('#controllers/roles_controller')

export default function roleRoutes() {
  router
    .group(() => {
      router.get('/', [RolesController, 'index'])
      router.get('/active', [RolesController, 'active'])
      router.post('/', [RolesController, 'store'])
      router.get('/:id', [RolesController, 'show'])
      router.put('/:id', [RolesController, 'update'])
      router.delete('/:id', [RolesController, 'destroy'])
    })
    .prefix('/api/v1/settings/roles')
    .use(middleware.auth())
}
