/*
|--------------------------------------------------------------------------
| OPD Routes
|--------------------------------------------------------------------------
|
| Routes for outpatient department
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// const OpdController = () => import('#controllers/opd_controller')

export default function opdRoutes() {
  router.group(() => {
    // router.get('/visits', [OpdController, 'visits'])
    // router.get('/visits/:vn', [OpdController, 'showVisit'])
    // router.post('/visits', [OpdController, 'createVisit'])
    // router.get('/queue', [OpdController, 'queue'])
    // router.post('/queue/call', [OpdController, 'callQueue'])
  }).prefix('/api/v1/opd').use(middleware.auth())
}
