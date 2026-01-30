// start/routes/nhso.ts
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const NhsoController = () => import('#controllers/nhso_controller')

export default function nhsoRoutes() {
    /**
     * NHSO API Routes
     * ตรวจสอบสิทธิการรักษา สปสช.
     * 
     * Token Lifecycle:
     * - Access Token: 30 minutes
     * - Refresh Token: 24 hours
     * - Auto-refresh when < 5 minutes remaining
     */
    router.group(() => {
        /**
         * Login to NHSO AuthenService
         * POST /api/v1/nhso/login
         * Body: { username: string, password: string }
         * 
         * Response: { accessTokenExpiresAt, refreshTokenExpiresAt, userInfo }
         */
        router.post('/login', [NhsoController, 'login'])

        /**
         * Get token status (check remaining time)
         * GET /api/v1/nhso/token-status
         * Headers: X-NHSO-Username: <username>
         * 
         * Response: { isValid, accessTokenMinutesRemaining, refreshTokenHoursRemaining, needsRefresh, needsRelogin }
         */
        router.get('/token-status', [NhsoController, 'tokenStatus'])

        /**
         * Search patient rights by PID (auto-refresh token if needed)
         * GET /api/v1/nhso/search-by-pid/:pid
         * Headers: X-NHSO-Username: <username>
         * 
         * Response: { data: PersonalFundData, meta: { tokenRefreshed } }
         */
        router.get('/search-by-pid/:pid', [NhsoController, 'searchByPid'])

        /**
         * Check rights (login if needed + search)
         * POST /api/v1/nhso/check-rights
         * Body: { username: string, password: string, pid: string }
         * 
         * Response: { rights, tokenStatus }
         */
        router.post('/check-rights', [NhsoController, 'checkRights'])

        /**
         * Logout (remove stored token)
         * POST /api/v1/nhso/logout
         * Headers: X-NHSO-Username: <username>
         */
        router.post('/logout', [NhsoController, 'logout'])

    }).prefix('/api/v1/nhso')
        .use(middleware.auth())
}