// app/controllers/nhso_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import { getNhsoTokenManager } from '#services/nhso_token_manager'

export default class NhsoController {
  private tokenManager = getNhsoTokenManager()

  /**
   * Login to NHSO and store token + credentials
   * POST /api/v1/nhso/login
   */
  async login({ request, response }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password'])

      if (!username || !password) {
        return response.badRequest({
          success: false,
          message: 'Username and password are required',
        })
      }

      const result = await this.tokenManager.login(username, password)

      if (!result.success) {
        return response.unauthorized({
          success: false,
          message: result.error || 'Login failed',
        })
      }

      return response.ok({
        success: true,
        message: 'Login successful',
        data: {
          username: result.tokenData!.username,
          expiresAt: result.tokenData!.expiresAt,
          userInfo: result.tokenData!.userInfo,
        },
      })
    } catch (error) {
      console.error('[NHSO Controller] Login error:', error)
      return response.internalServerError({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      })
    }
  }

  /**
   * Get token status
   * GET /api/v1/nhso/token-status
   */
  async tokenStatus({ request, response }: HttpContext) {
    try {
      const username = request.header('X-NHSO-Username') || request.input('username')

      if (!username) {
        return response.badRequest({
          success: false,
          message: 'Username is required (X-NHSO-Username header or username query param)',
        })
      }

      const status = this.tokenManager.getTokenStatus(username)
      const hasCredentials = this.tokenManager.hasStoredCredentials(username)

      return response.ok({
        success: true,
        data: {
          ...status,
          hasStoredCredentials: hasCredentials,
          canAutoRelogin: hasCredentials,
        },
      })
    } catch (error) {
      console.error('[NHSO Controller] Token status error:', error)
      return response.internalServerError({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      })
    }
  }

  /**
   * Search patient rights by PID (auto re-login if token expired)
   * GET /api/v1/nhso/search-by-pid/:pid
   */
  async searchByPid({ params, request, response }: HttpContext) {
    try {
      const { pid } = params
      const username = request.header('X-NHSO-Username') || request.input('username')

      if (!pid) {
        return response.badRequest({
          success: false,
          message: 'PID is required',
        })
      }

      if (!username) {
        return response.badRequest({
          success: false,
          message: 'Username is required (X-NHSO-Username header)',
        })
      }

      // Validate PID format
      if (!/^\d{13}$/.test(pid)) {
        return response.badRequest({
          success: false,
          message: 'Invalid PID format: must be 13 digits',
        })
      }

      // Check if has stored credentials for auto re-login
      if (!this.tokenManager.hasStoredCredentials(username)) {
        return response.unauthorized({
          success: false,
          message: 'No stored credentials. Please login first.',
          needsLogin: true,
        })
      }

      // Search with auto re-login
      const result = await this.tokenManager.searchByPidWithAutoRelogin(username, pid)

      if (!result.success) {
        return response.badRequest({
          success: false,
          message: result.error,
        })
      }

      // Get current token status
      const tokenStatus = this.tokenManager.getTokenStatus(username)

      return response.ok({
        success: true,
        data: result.data,
        meta: {
          reloggedIn: result.reloggedIn,
          tokenMinutesRemaining: tokenStatus.minutesRemaining,
        },
      })
    } catch (error) {
      console.error('[NHSO Controller] Search by PID error:', error)
      return response.internalServerError({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      })
    }
  }

  /**
   * Check rights (login if needed + search)
   * POST /api/v1/nhso/check-rights
   * 
   * ถ้ายังไม่เคย login หรือ token หมดอายุ → login ก่อน
   * ถ้า login แล้วและ token ยังใช้ได้ → ใช้ token เดิม (auto re-login ถ้าหมดอายุ)
   */
  async checkRights({ request, response }: HttpContext) {
    try {
      const { username, password, pid } = request.only(['username', 'password', 'pid'])

      if (!username || !password) {
        return response.badRequest({
          success: false,
          message: 'Username and password are required',
        })
      }

      if (!pid) {
        return response.badRequest({
          success: false,
          message: 'PID is required',
        })
      }

      // Validate PID format
      if (!/^\d{13}$/.test(pid)) {
        return response.badRequest({
          success: false,
          message: 'Invalid PID format: must be 13 digits',
        })
      }

      // Check if already logged in with valid token
      const existingStatus = this.tokenManager.getTokenStatus(username)
      let needsLogin = !existingStatus.isValid || existingStatus.needsRelogin
      
      // ถ้ายังไม่มี credentials เก็บไว้ ต้อง login ก่อน
      if (!this.tokenManager.hasStoredCredentials(username)) {
        needsLogin = true
      }

      if (needsLogin) {
        console.log('[NHSO Controller] Logging in user:', username)
        const loginResult = await this.tokenManager.login(username, password)
        
        if (!loginResult.success) {
          return response.unauthorized({
            success: false,
            message: loginResult.error || 'NHSO login failed',
          })
        }
      }

      // Search by PID (auto re-login ถ้า token หมดอายุระหว่าง search)
      const searchResult = await this.tokenManager.searchByPidWithAutoRelogin(username, pid)

      if (!searchResult.success) {
        return response.badRequest({
          success: false,
          message: searchResult.error || 'Search failed',
        })
      }

      // Get current token status
      const tokenStatus = this.tokenManager.getTokenStatus(username)

      return response.ok({
        success: true,
        data: {
          rights: searchResult.data,
          tokenStatus: {
            minutesRemaining: tokenStatus.minutesRemaining,
            expiresAt: this.tokenManager.getTokenData(username)?.expiresAt,
          },
          meta: {
            reloggedIn: searchResult.reloggedIn,
          },
        },
      })
    } catch (error) {
      console.error('[NHSO Controller] Check rights error:', error)
      return response.internalServerError({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      })
    }
  }

  /**
   * Logout (remove token and credentials)
   * POST /api/v1/nhso/logout
   */
  async logout({ request, response }: HttpContext) {
    try {
      const username = request.header('X-NHSO-Username') || request.input('username')

      if (!username) {
        return response.badRequest({
          success: false,
          message: 'Username is required',
        })
      }

      this.tokenManager.logout(username)

      return response.ok({
        success: true,
        message: 'Logged out successfully',
      })
    } catch (error) {
      console.error('[NHSO Controller] Logout error:', error)
      return response.internalServerError({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      })
    }
  }

  /**
   * List active users (for admin)
   * GET /api/v1/nhso/active-users
   */
  async activeUsers({ response }: HttpContext) {
    try {
      const activeUsers = this.tokenManager.listActiveUsers()
      
      // Get status for each user
      const usersWithStatus = activeUsers.map(username => {
        const status = this.tokenManager.getTokenStatus(username)
        const tokenData = this.tokenManager.getTokenData(username)
        return {
          username,
          isValid: status.isValid,
          minutesRemaining: status.minutesRemaining,
          expiresAt: tokenData?.expiresAt,
          loginAt: tokenData?.loginAt,
        }
      })

      return response.ok({
        success: true,
        data: {
          count: activeUsers.length,
          users: usersWithStatus,
        },
      })
    } catch (error) {
      console.error('[NHSO Controller] Active users error:', error)
      return response.internalServerError({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      })
    }
  }
}