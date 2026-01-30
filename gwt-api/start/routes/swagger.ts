/*
|--------------------------------------------------------------------------
| Swagger Routes
|--------------------------------------------------------------------------
|
| Routes for API documentation (Swagger UI)
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

export default function swaggerRoutes() {
  // Swagger JSON spec
  router.get('/swagger', async () => {
    return AutoSwagger.default.docs(router.toJSON(), swagger)
  })

  // Swagger UI
  router.get('/docs', async () => {
    return AutoSwagger.default.ui('/swagger', swagger)
  })

  // Swagger JSON endpoint (alternative)
  router.get('/swagger.json', async () => {
    return AutoSwagger.default.docs(router.toJSON(), swagger)
  })
}
