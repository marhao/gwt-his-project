/*
|--------------------------------------------------------------------------
| Report Routes
|--------------------------------------------------------------------------
|
| Routes for report generation and management
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// const ReportsController = () => import('#controllers/reports_controller')

export default function reportRoutes() {
  router.group(() => {
    // router.get('/', [ReportsController, 'index'])
    // router.get('/:id', [ReportsController, 'show'])
    // router.post('/', [ReportsController, 'store'])
    // router.put('/:id', [ReportsController, 'update'])
    // router.delete('/:id', [ReportsController, 'destroy'])
    // router.get('/:id/preview', [ReportsController, 'preview'])
    // router.get('/:id/export/:format', [ReportsController, 'export'])
  }).prefix('/api/v1/reports').use(middleware.auth())
}
