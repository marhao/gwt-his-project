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
const HealthIdController = () => import('#controllers/health_id_controller')

export default function authRoutes() {
  // ============================================
  // Auth Routes (Public)
  // ============================================
  router.group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/login-provider', [AuthController, 'loginWithProviderId'])
    router.post('/logout', [AuthController, 'logout'])

    // --- Health ID / Provider ID OAuth ---
    router.get('/health-id/redirect', [HealthIdController, 'redirect'])
    router.get('/health-id/callback', [HealthIdController, 'callback'])
    router.get('/health-id/callback/provider', [HealthIdController, 'callbackWithProvider'])
    router.post('/health-id/callback/provider', [HealthIdController, 'callbackWithProvider'])
    router.post('/health-id/token', [HealthIdController, 'token'])
    router.get('/health-id/public-key', [HealthIdController, 'healthIdPublicKey'])
    router.post('/provider-id/token', [HealthIdController, 'providerToken'])
    router.get('/provider-id/public-key', [HealthIdController, 'providerIdPublicKey'])
  }).prefix('/api/v1/auth')

  // ============================================
  // Auth Routes (Protected)
  // ============================================
  router.group(() => {
    router.get('/me', [AuthController, 'me'])
    router.post('/refresh', [AuthController, 'refresh'])
    router.post('/change-password', [AuthController, 'changePassword'])

    // --- Provider ID (ต้อง login แล้ว) ---
    router.get('/provider-id/profile', [HealthIdController, 'providerProfile'])
  }).prefix('/api/v1/auth').use(middleware.auth())

}