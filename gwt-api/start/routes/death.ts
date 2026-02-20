// start/routes/death.ts

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const DeathsController = () => import('#controllers/deaths_controller')

export default function deathRoutes() {
  router
    .group(() => {
      router.get('/', [DeathsController, 'index'])
      router.get('/:id', [DeathsController, 'show'])
      router.post('/', [DeathsController, 'store'])
      router.put('/:id', [DeathsController, 'update'])
      router.delete('/:id', [DeathsController, 'destroy'])
    })
    .prefix('/api/v1/deaths')
    .use(middleware.auth())
}