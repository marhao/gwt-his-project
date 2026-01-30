/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
|
| Routes for authentication (login, logout, refresh token, etc.)
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

export default function authRoutes() {
  // ============================================
  // Auth Routes (Public)
  // ============================================
  router.group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout'])
  }).prefix('/api/v1/auth')

  // ============================================
  // Auth Routes (Protected)
  // ============================================
  router.group(() => {
    router.get('/me', [AuthController, 'me'])
    router.post('/refresh', [AuthController, 'refresh'])
    router.post('/change-password', [AuthController, 'changePassword'])
  }).prefix('/api/v1/auth').use(middleware.auth())
}
