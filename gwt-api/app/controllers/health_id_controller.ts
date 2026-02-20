import type { HttpContext } from '@adonisjs/core/http'
import HealthIdService, { HealthIdError } from '#services/health_id_service'
import { randomBytes } from 'node:crypto'

export default class HealthIdController {
  private healthIdService: HealthIdService

  constructor() {
    this.healthIdService = new HealthIdService()
  }

  /**
   * GET /auth/health-id/redirect
   * Redirect ผู้ใช้ไปหน้า Login ของ Health ID
   */
  async redirect({ response }: HttpContext) {
    const state = randomBytes(16).toString('hex')

    response.cookie('oauth_state', state, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 600, // 10 นาที
    })

    const loginUrl = this.healthIdService.getLoginUrl({
      state,
      scope: 'ProviderID',
    })
    return response.redirect(loginUrl)
  }

  /**
   * GET /auth/health-id/callback
   * รับ callback จาก Health ID หลัง login สำเร็จ
   */
  async callback({ request, response }: HttpContext) {
    const code = request.input('code')
    const state = request.input('state')

    if (!code) {
      return response.badRequest({ message: 'Authorization code is required' })
    }

    // ตรวจสอบ state เพื่อป้องกัน CSRF
    const savedState = request.cookie('oauth_state')
    if (state && savedState && state !== savedState) {
      return response.badRequest({ message: 'Invalid state parameter' })
    }
    response.clearCookie('oauth_state')

    try {
      const result = await this.healthIdService.getHealthIdToken(code)

      return response.ok({
        status: 'success',
        data: {
          access_token: result.data.access_token,
          token_type: result.data.token_type,
          expires_in: result.data.expires_in,
          account_id: result.data.account_id,
        },
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  /**
   * GET / หรือ /auth/health-id/callback/provider
   * จับ code จาก redirect_uri แล้วแลกเป็น token + ดึง profile ทั้ง flow
   *
   * Health ID redirect กลับมา: http://127.0.0.1:3000?code=xxx&state=xxx
   */
  async callbackWithProvider({ request, response, logger }: HttpContext) {
    const code = request.input('code')
    const state = request.input('state')

    // ถ้าไม่มี code แสดงว่าเข้ามาโดยไม่ได้ผ่าน Health ID redirect
    if (!code) {
      return response.badRequest({
        status: 'error',
        message: 'Authorization code is required',
        hint: 'เข้าผ่าน /auth/health-id/redirect เพื่อเริ่ม login flow',
      })
    }

    logger.info({ code, state }, '[HealthID] Received callback with code')

    const savedState = request.cookie('oauth_state')
    if (state && savedState && state !== savedState) {
      return response.badRequest({ message: 'Invalid state parameter' })
    }
    response.clearCookie('oauth_state')

    try {
      // Step 1: แลก code -> Health ID access token
      const healthIdResult = await this.healthIdService.getHealthIdToken(code)
      logger.info(
        { account_id: healthIdResult.data.account_id },
        '[HealthID] Step 1 - Got Health ID token'
      )

      // Step 2: Health ID token -> Provider ID token
      let providerResult
      try {
        providerResult = await this.healthIdService.getProviderIdToken(
          healthIdResult.data.access_token
        )
        logger.info(
          { username: providerResult.data.username },
          '[HealthID] Step 2 - Got Provider ID token'
        )
      } catch (error) {
        // ผู้ใช้ไม่มี Provider ID -> return แค่ Health ID data
        logger.warn('[HealthID] Step 2 - User has no Provider ID')
        return response.ok({
          status: 'success',
          has_provider: false,
          health_id: {
            access_token: healthIdResult.data.access_token,
            token_type: healthIdResult.data.token_type,
            expires_in: healthIdResult.data.expires_in,
            account_id: healthIdResult.data.account_id,
          },
        })
      }

      // Step 3: ดึง Provider profile
      const profile = await this.healthIdService.getProviderProfile(
        providerResult.data.access_token,
        {
          mophCenterToken: !!request.input('moph_center_token'),
          mophIdpPermission: !!request.input('moph_idp_permission'),
          positionType: !!request.input('position_type'),
        }
      )
      logger.info(
        { provider_id: profile.data.provider_id },
        '[HealthID] Step 3 - Got Provider profile'
      )

      return response.ok({
        status: 'success',
        has_provider: true,
        health_id: {
          access_token: healthIdResult.data.access_token,
          account_id: healthIdResult.data.account_id,
          expires_in: healthIdResult.data.expires_in,
        },
        provider_id: {
          access_token: providerResult.data.access_token,
          account_id: providerResult.data.account_id,
          username: providerResult.data.username,
          expires_in: providerResult.data.expires_in,
        },
        profile: profile.data,
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  /**
   * POST /auth/health-id/token
   * แลก code เป็น token (สำหรับเรียกจาก Frontend)
   */
  async token({ request, response }: HttpContext) {
    const code = request.input('code')

    if (!code) {
      return response.badRequest({ message: 'Authorization code is required' })
    }

    try {
      const result = await this.healthIdService.getHealthIdToken(code)
      return response.ok(result)
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  /**
   * POST /auth/provider-id/token
   * ขอ Provider ID token โดยใช้ Health ID access token
   */
  async providerToken({ request, response }: HttpContext) {
    const healthIdAccessToken = request.input('health_id_access_token')

    if (!healthIdAccessToken) {
      return response.badRequest({ message: 'Health ID access token is required' })
    }

    try {
      const result = await this.healthIdService.getProviderIdToken(healthIdAccessToken)
      return response.ok(result)
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  /**
   * GET /auth/provider-id/profile
   * ดึงข้อมูล Provider profile
   */
  async providerProfile({ request, response }: HttpContext) {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.unauthorized({ message: 'Provider access token is required' })
    }

    const providerAccessToken = authHeader.replace('Bearer ', '')

    try {
      const result = await this.healthIdService.getProviderProfile(providerAccessToken, {
        mophCenterToken: !!request.input('moph_center_token'),
        mophIdpPermission: !!request.input('moph_idp_permission'),
        positionType: !!request.input('position_type'),
      })

      return response.ok(result)
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  /**
   * GET /auth/health-id/public-key
   * ดึง Public Key ของ Health ID
   */
  async healthIdPublicKey({ response }: HttpContext) {
    try {
      const publicKey = await this.healthIdService.getHealthIdPublicKey()
      return response.ok({ public_key: publicKey })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  /**
   * GET /auth/provider-id/public-key
   * ดึง Public Key ของ Provider ID
   */
  async providerIdPublicKey({ response }: HttpContext) {
    try {
      const publicKey = await this.healthIdService.getProviderIdPublicKey()
      return response.ok({ public_key: publicKey })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  /**
   * จัดการ Error response
   */
  private handleError(response: HttpContext['response'], error: unknown) {
    if (error instanceof HealthIdError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    console.error('HealthIdController unexpected error:', error)
    return response.internalServerError({
      status: 'error',
      message: 'Internal server error',
    })
  }
}