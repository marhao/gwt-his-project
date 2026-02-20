import type { HttpContext } from '@adonisjs/core/http'
import Officer from '#models/officer'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import os from 'node:os'
import env from '#start/env'
import HealthIdService, { HealthIdError } from '#services/health_id_service'

// ===========================================
// Server Network Info Helper
// ===========================================

interface ServerInfo {
  ip: string
  mac: string
  hostname: string
}

function getLocalIP(): string {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return '127.0.0.1'
}

function getServerMAC(): string {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal && iface.mac && iface.mac !== '00:00:00:00:00:00') {
        return iface.mac
      }
    }
  }
  return 'unknown'
}

function getServerInfo(): ServerInfo {
  return {
    ip: getLocalIP(),
    mac: getServerMAC(),
    hostname: os.hostname(),
  }
}

export default class AuthController {
  /**
   * JWT Secret key from environment
   */
  private jwtSecret: string = env.get('JWT_SECRET', 'your-secret-key')

  /**
   * JWT Token expiry time
   */
  private jwtExpiresIn = env.get('JWT_EXPIRES_IN', '7d')

  /**
   * @login
   * @summary Login with officer credentials
   * @description Authenticate user with username and password, returns JWT token
   * @requestBody {"username": "admin", "password": "secret123"}
   * @responseBody 200 - {"success": true, "message": "Login successful", "data": {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "tokenType": "Bearer", "expiresAt": "2026-01-12T00:00:00.000Z"}}
   * @responseBody 400 - {"success": false, "message": "Username and password are required"}
   * @responseBody 401 - {"success": false, "message": "Invalid credentials"}
   */
  async login({ request, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    // Validate input
    if (!username || !password) {
      return response.badRequest({
        success: false,
        message: 'Username and password are required',
      })
    }

    try {
      // Find officer by login name
      const officer = await Officer.query()
        .where('officer_login_name', username)
        .first()

      if (!officer) {
        return response.unauthorized({
          success: false,
          message: 'Invalid credentials',
        })
      }

      // Check if officer is active
      if (!officer.isActive) {
        return response.unauthorized({
          success: false,
          message: 'Account is inactive. Please contact administrator.',
        })
      }

      // Hash the password with MD5 and compare (convert to lowercase for comparison)
      // const passwordMd5 = crypto.createHash('md5').update(password).digest('hex').toLowerCase()
      // const storedPasswordMd5 = (officer.officerLoginPasswordMd5 || '').toLowerCase()

      // if (storedPasswordMd5 !== passwordMd5) {
      //   return response.unauthorized({
      //     success: false,
      //     message: 'Invalid credentials',
      //   })
      // }

      // Generate JWT token
      const tokenPayload = {
        id: officer.officerId,
        loginName: officer.officerLoginName,
        name: officer.fullName,
        email: officer.officerEmail,
        doctorCode: officer.officerDoctorCode,
        groups: officer.officerGroupListText,
      }

      const token = jwt.sign(tokenPayload, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
        algorithm: 'HS256',
        issuer: 'gwt-api',
        audience: 'gwt-his',
      } as jwt.SignOptions)

      // Calculate token expiry time
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // Default 7 days

      // Get client info from request
      const clientIp = 
        request.header('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.header('x-real-ip') ||
        request.ip() ||
        'unknown'
      const userAgent = request.header('user-agent') || 'unknown'

      // Get server info
      const serverInfo = getServerInfo()

      return response.ok({
        success: true,
        message: 'Login successful',
        data: {
          token,
          tokenType: 'Bearer',
          expiresAt: expiresAt.toISOString(),
          user: {
            id: officer.officerId,
            loginName: officer.officerLoginName,
            name: officer.fullName,
            email: officer.officerEmail,
            phone: officer.officerPhone,
            mobile: officer.officerMobile,
            doctorCode: officer.officerDoctorCode,
            groups: officer.officerGroupListText,
          },
          loginInfo: {
            clientIP: clientIp,
            userAgent: userAgent,
            serverIP: serverInfo.ip,
            serverMAC: serverInfo.mac,
            serverHostname: serverInfo.hostname,
            loginTime: new Date().toISOString(),
          },
        },
      })
    } catch (error) {
      console.error('Login error:', error)
      return response.internalServerError({
        success: false,
        message: 'An error occurred during login',
      })
    }
  }

  /**
   * @me
   * @summary Get current user info
   * @description Returns the current authenticated user's information
   * @responseBody 200 - {"success": true, "data": {"id": 1, "loginName": "admin", "name": "Admin User", "pname": "นาย", "fname": "ทดสอบ", "lname": "ระบบ", "email": "admin@hospital.go.th", "phone": "0-2xxx-xxxx", "mobile": "08x-xxx-xxxx", "doctorCode": "12345", "groups": "admin,user", "lineId": "@admin", "isActive": true}}
   * @responseBody 401 - {"success": false, "message": "Not authenticated"}
   * @responseBody 404 - {"success": false, "message": "User not found"}
   * @responseBody 500 - {"success": false, "message": "An error occurred"}
   */
  async me({ request, response }: HttpContext) {
    const user = request.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }

    try {
      // Get fresh officer data from database
      const officer = await Officer.find(user.id)

      if (!officer) {
        return response.notFound({
          success: false,
          message: 'User not found',
        })
      }

      return response.ok({
        success: true,
        data: {
          id: officer.officerId,
          loginName: officer.officerLoginName,
          name: officer.fullName,
          pname: officer.officerPname,
          fname: officer.officerFname,
          lname: officer.officerLname,
          email: officer.officerEmail,
          phone: officer.officerPhone,
          mobile: officer.officerMobile,
          doctorCode: officer.officerDoctorCode,
          groups: officer.officerGroupListText,
          lineId: officer.officerLineId,
          isActive: officer.isActive,
        },
      })
    } catch (error) {
      console.error('Get user error:', error)
      return response.internalServerError({
        success: false,
        message: 'An error occurred',
      })
    }
  }

  /**
   * @refresh
   * @summary Refresh JWT token
   * @description Generates a new JWT token for the authenticated user. The current token must be valid.
   * @responseBody 200 - {"success": true, "data": {"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "tokenType": "Bearer", "expiresIn": 86400}}
   * @responseBody 401 - {"success": false, "message": "Not authenticated"}
   * @responseBody 403 - {"success": false, "message": "Account is inactive"}
   * @responseBody 500 - {"success": false, "message": "An error occurred"}
   */
  async refresh({ request, response }: HttpContext) {
    const user = request.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }

    try {
      // Get fresh officer data
      const officer = await Officer.find(user.id)

      if (!officer || !officer.isActive) {
        return response.unauthorized({
          success: false,
          message: 'Account is inactive',
        })
      }

      // Generate new token
      const tokenPayload = {
        id: officer.officerId,
        loginName: officer.officerLoginName,
        name: officer.fullName,
        email: officer.officerEmail,
        doctorCode: officer.officerDoctorCode,
        groups: officer.officerGroupListText,
      }

      const token = jwt.sign(tokenPayload, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
        algorithm: 'HS256',
        issuer: 'gwt-api',
        audience: 'gwt-his',
      } as jwt.SignOptions)

      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7)

      return response.ok({
        success: true,
        message: 'Token refreshed',
        data: {
          token,
          tokenType: 'Bearer',
          expiresAt: expiresAt.toISOString(),
        },
      })
    } catch (error) {
      console.error('Refresh token error:', error)
      return response.internalServerError({
        success: false,
        message: 'An error occurred',
      })
    }
  }

  /**
   * @logout
   * @summary Logout user
   * @description Logs out the user. Since JWT is stateless, the client should discard the token from storage.
   * @responseBody 200 - {"success": true, "message": "Logged out successfully"}
   */
  async logout({ response }: HttpContext) {
    // Since we're using stateless JWT, just return success
    // Client should remove the token from storage
    return response.ok({
      success: true,
      message: 'Logged out successfully',
    })
  }

  /**
   * @changePassword
   * @summary Change user password
   * @description Changes the password for the authenticated user. Requires current password for verification.
   * @requestBody {"currentPassword": "oldpass123", "newPassword": "newpass456"}
   * @responseBody 200 - {"success": true, "message": "Password changed successfully"}
   * @responseBody 400 - {"success": false, "message": "Current password and new password are required"}
   * @responseBody 401 - {"success": false, "message": "Not authenticated"}
   * @responseBody 404 - {"success": false, "message": "User not found"}
   * @responseBody 500 - {"success": false, "message": "An error occurred"}
   */
  async changePassword({ request, response }: HttpContext) {
    const user = request.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }

    const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword'])

    if (!currentPassword || !newPassword) {
      return response.badRequest({
        success: false,
        message: 'Current password and new password are required',
      })
    }

    if (newPassword.length < 6) {
      return response.badRequest({
        success: false,
        message: 'New password must be at least 6 characters',
      })
    }

    try {
      const officer = await Officer.find(user.id)

      if (!officer) {
        return response.notFound({
          success: false,
          message: 'User not found',
        })
      }

      // Verify current password
      const currentPasswordMd5 = crypto.createHash('md5').update(currentPassword).digest('hex')

      if (officer.officerLoginPasswordMd5 !== currentPasswordMd5) {
        return response.badRequest({
          success: false,
          message: 'Current password is incorrect',
        })
      }

      // Update password
      const newPasswordMd5 = crypto.createHash('md5').update(newPassword).digest('hex')
      officer.officerLoginPasswordMd5 = newPasswordMd5
      officer.lastChangePasswordDate = new Date() as any

      await officer.save()

      return response.ok({
        success: true,
        message: 'Password changed successfully',
      })
    } catch (error) {
      console.error('Change password error:', error)
      return response.internalServerError({
        success: false,
        message: 'An error occurred',
      })
    }
  }

  async loginWithProviderId({ request, response }: HttpContext) {
    const { code } = request.only(['code'])

    if (!code) {
      return response.badRequest({
        success: false,
        message: 'Authorization code is required',
      })
    }

    try {
      // ============================================
      // Step 1-3: code → Health ID token → Provider token → Profile
      // ============================================
      const healthIdService = new HealthIdService()
      const result = await healthIdService.authenticateProvider(code)

      const { hash_cid, provider_id, name_th } = result.profile

      if (!hash_cid) {
        return response.badRequest({
          success: false,
          message: 'ไม่พบข้อมูล CID จาก Provider ID',
        })
      }
      const officer = await Officer.query()
        .where('officer_cid_hash256', hash_cid)
        .first()

      if (!officer) {
        return response.unauthorized({
          success: false,
          message: 'ไม่พบข้อมูลบุคลากรในระบบ กรุณาติดต่อผู้ดูแลระบบ',
          provider: {
            provider_id,
            name: name_th,
          },
        })
      }

      // ============================================
      // Step 5: ตรวจสอบสถานะ officer
      // ============================================
      if (!officer.isActive) {
        return response.unauthorized({
          success: false,
          message: 'บัญชีถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ',
        })
      }

      // ============================================
      // Step 6: สร้าง JWT token (เหมือน login ปกติ)
      // ============================================
      const tokenPayload = {
        id: officer.officerId,
        loginName: officer.officerLoginName,
        name: officer.fullName,
        email: officer.officerEmail,
        doctorCode: officer.officerDoctorCode,
        groups: officer.officerGroupListText,
        loginMethod: 'provider_id', // ← บอกว่า login ด้วย Provider ID
        providerId: provider_id,
      }

      const token = jwt.sign(tokenPayload, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
        algorithm: 'HS256',
        issuer: 'gwt-api',
        audience: 'gwt-his',
      } as jwt.SignOptions)

      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7)

      const clientIp =
        request.header('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.header('x-real-ip') ||
        request.ip() ||
        'unknown'
      const userAgent = request.header('user-agent') || 'unknown'
      const serverInfo = getServerInfo()

      return response.ok({
        success: true,
        message: 'Login with Provider ID successful',
        data: {
          token,
          tokenType: 'Bearer',
          expiresAt: expiresAt.toISOString(),
          user: {
            id: officer.officerId,
            loginName: officer.officerLoginName,
            name: officer.fullName,
            email: officer.officerEmail,
            phone: officer.officerPhone,
            mobile: officer.officerMobile,
            doctorCode: officer.officerDoctorCode,
            groups: officer.officerGroupListText,
          },
          provider: {
            providerId: provider_id,
            name: name_th,
            organization: result.profile.organization,
          },
          loginInfo: {
            method: 'provider_id',
            clientIP: clientIp,
            userAgent: userAgent,
            serverIP: serverInfo.ip,
            serverMAC: serverInfo.mac,
            serverHostname: serverInfo.hostname,
            loginTime: new Date().toISOString(),
          },
        },
      })
    } catch (error) {
      
      // จัดการ error จาก Health ID / Provider ID API
      if (error instanceof HealthIdError) {
        return response.status(error.statusCode).json({
          success: false,
          message: error.message,
        })
      }

      return response.internalServerError({
        success: false,
        message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย Provider ID',
      })
    }
  }
}
