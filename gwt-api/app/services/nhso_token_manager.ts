// app/services/nhso_token_manager.ts

import crypto from 'crypto'
import NhsoAuthService from './nhso_authen_service.js'

/**
 * Token data structure
 */
interface NhsoTokenData {
  // Token & Session
  accessToken: string
  session: string
  cookies: string[]
  
  // Expiry from idToken.expiresAt
  expiresAt: Date
  
  // Login timestamp
  loginAt: Date
  
  // User info
  username: string
  userInfo?: any
}

/**
 * Encrypted credentials for auto re-login
 */
interface StoredCredentials {
  username: string
  encryptedPassword: string
  iv: string
}

interface TokenStatus {
  isValid: boolean
  minutesRemaining: number
  needsRelogin: boolean
  message: string
}

/**
 * NHSO Token Manager
 * 
 * - ไม่มี refresh token
 * - ใช้ expiresAt จาก idToken เป็นตัวตัดสิน
 * - ถ้าหมดอายุ → auto re-login ด้วย credentials ที่เก็บไว้
 */
export default class NhsoTokenManager {
  private authService: NhsoAuthService
  private tokenStore: Map<string, NhsoTokenData> = new Map()
  private credentialsStore: Map<string, StoredCredentials> = new Map()
  
  // Encryption key from environment (ควรตั้งใน .env)
  private readonly ENCRYPTION_KEY = process.env.NHSO_ENCRYPTION_KEY || 'nhso-default-key-change-in-prod!'
  
  // Buffer time - re-login ก่อนหมดอายุ 2 นาที
  private readonly EXPIRY_BUFFER_MINUTES = 2

  constructor() {
    this.authService = new NhsoAuthService()
  }

  // ============================================
  // Login และเก็บ Credentials
  // ============================================

  /**
   * Login และเก็บ credentials ไว้สำหรับ auto re-login
   */
  async login(username: string, password: string): Promise<{
    success: boolean
    tokenData?: NhsoTokenData
    error?: string
  }> {
    try {
      
      const result = await this.authService.login(username, password)
      
      if (!result.success || !result.session) {
        return {
          success: false,
          error: result.error || 'Login failed',
        }
      }

      // ดึง expiresAt จาก idToken
      const userInfo = result.userInfo as any
      const idToken = userInfo?.idToken
      
      let expiresAt: Date
      if (idToken?.expiresAt) {
        expiresAt = new Date(idToken.expiresAt)
      } else {
        // Fallback: ถ้าไม่มี expiresAt ให้ใช้ 30 นาที
        expiresAt = new Date(Date.now() + 30 * 60 * 1000)
      }

      // ดึง accessToken จาก idToken.tokenValue
      const accessToken = idToken?.tokenValue || result.session

      // สร้าง token data
      const tokenData: NhsoTokenData = {
        accessToken,
        session: result.session,
        cookies: result.cookies || [],
        expiresAt,
        loginAt: new Date(),
        username,
        userInfo: result.userInfo,
      }

      // เก็บ token
      this.tokenStore.set(username, tokenData)
      
      // เก็บ credentials (encrypted) สำหรับ auto re-login
      this.storeCredentials(username, password)
      

      return {
        success: true,
        tokenData,
      }
    } catch (error) {
      console.error('[TokenManager] Login error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // ============================================
  // ตรวจสอบสถานะ Token
  // ============================================

  /**
   * ตรวจสอบว่า token หมดอายุหรือยัง
   */
  getTokenStatus(username: string): TokenStatus {
    const tokenData = this.tokenStore.get(username)
    
    if (!tokenData) {
      return {
        isValid: false,
        minutesRemaining: 0,
        needsRelogin: true,
        message: 'No token found. Please login.',
      }
    }

    const now = new Date()
    const msRemaining = tokenData.expiresAt.getTime() - now.getTime()
    const minutesRemaining = Math.floor(msRemaining / 60000)
    
    // ถ้าเหลือน้อยกว่า buffer time → ต้อง re-login
    const needsRelogin = minutesRemaining <= this.EXPIRY_BUFFER_MINUTES
    
    return {
      isValid: !needsRelogin,
      minutesRemaining: Math.max(0, minutesRemaining),
      needsRelogin,
      message: needsRelogin 
        ? `Token expired or expiring soon (${minutesRemaining} min remaining)`
        : `Token valid. ${minutesRemaining} minutes remaining.`,
    }
  }

  /**
   * ตรวจสอบว่า token หมดอายุหรือยัง (simple check)
   */
  isTokenExpired(username: string): boolean {
    const status = this.getTokenStatus(username)
    return status.needsRelogin
  }

  // ============================================
  // Auto Re-login
  // ============================================

  /**
   * Auto re-login ด้วย credentials ที่เก็บไว้
   */
  async autoRelogin(username: string): Promise<{
    success: boolean
    tokenData?: NhsoTokenData
    error?: string
  }> {
    
    const credentials = this.credentialsStore.get(username)
    if (!credentials) {
      return {
        success: false,
        error: 'No stored credentials. Please login manually.',
      }
    }

    try {
      const password = this.decryptPassword(credentials.encryptedPassword, credentials.iv)
      return await this.login(username, password)
    } catch (error) {
      console.error('[TokenManager] Auto re-login failed:', error)
      return {
        success: false,
        error: 'Auto re-login failed. Please login manually.',
      }
    }
  }

  // ============================================
  // Get Valid Token (Auto re-login if needed)
  // ============================================

  /**
   * ดึง valid token - auto re-login ถ้าหมดอายุ
   */
  async getValidToken(username: string): Promise<{
    success: boolean
    token?: string
    cookies?: string[]
    reloggedIn?: boolean
    error?: string
  }> {
    // ตรวจสอบว่า token หมดอายุหรือยัง
    if (this.isTokenExpired(username)) {
      
      const reloginResult = await this.autoRelogin(username)
      if (!reloginResult.success) {
        return {
          success: false,
          error: reloginResult.error,
        }
      }
      
      const tokenData = this.tokenStore.get(username)!
      return {
        success: true,
        token: tokenData.accessToken,
        cookies: tokenData.cookies,
        reloggedIn: true,
      }
    }
    
    // Token ยัง valid
    const tokenData = this.tokenStore.get(username)
    if (!tokenData) {
      return {
        success: false,
        error: 'No token found. Please login.',
      }
    }
    
    return {
      success: true,
      token: tokenData.accessToken,
      cookies: tokenData.cookies,
      reloggedIn: false,
    }
  }

  // ============================================
  // Search by PID with Auto Re-login
  // ============================================

  /**
   * ค้นหาสิทธิ์ - auto re-login ถ้า token หมดอายุ
   */
  async searchByPidWithAutoRelogin(username: string, pid: string): Promise<{
    success: boolean
    data?: any
    error?: string
    reloggedIn?: boolean
  }> {
    // ดึง valid token (auto re-login ถ้าจำเป็น)
    const tokenResult = await this.getValidToken(username)
    
    if (!tokenResult.success) {
      return {
        success: false,
        error: tokenResult.error,
      }
    }
    
    // ค้นหาสิทธิ์
    const searchResult = await this.authService.searchByPid(pid, tokenResult.cookies!)
    
    // ถ้า search fail เพราะ token หมดอายุ (กรณี server reject ก่อน expiresAt)
    if (!searchResult.success && this.isAuthError(searchResult)) {
      console.log('[TokenManager] Search failed with auth error, trying re-login...')
      
      const reloginResult = await this.autoRelogin(username)
      if (reloginResult.success) {
        // Retry search
        const tokenData = this.tokenStore.get(username)!
        const retryResult = await this.authService.searchByPid(pid, tokenData.cookies)
        return {
          ...retryResult,
          reloggedIn: true,
        }
      }
    }
    
    return {
      ...searchResult,
      reloggedIn: tokenResult.reloggedIn,
    }
  }

  // ============================================
  // Token Storage Management
  // ============================================

  /**
   * ดึง token data
   */
  getTokenData(username: string): NhsoTokenData | undefined {
    return this.tokenStore.get(username)
  }

  /**
   * ลบ token และ credentials
   */
  logout(username: string): void {
    this.tokenStore.delete(username)
    this.credentialsStore.delete(username)
  }

  /**
   * ดึงรายการ users ที่มี token
   */
  listActiveUsers(): string[] {
    return Array.from(this.tokenStore.keys())
  }

  /**
   * ตรวจสอบว่ามี stored credentials หรือไม่
   */
  hasStoredCredentials(username: string): boolean {
    return this.credentialsStore.has(username)
  }

  // ============================================
  // Credentials Encryption
  // ============================================

  /**
   * เก็บ credentials (encrypted)
   */
  private storeCredentials(username: string, password: string): void {
    const { encrypted, iv } = this.encryptPassword(password)
    this.credentialsStore.set(username, {
      username,
      encryptedPassword: encrypted,
      iv,
    })
  }

  /**
   * Encrypt password ด้วย AES-256-GCM
   */
  private encryptPassword(password: string): { encrypted: string; iv: string } {
    const iv = crypto.randomBytes(16)
    const key = crypto.scryptSync(this.ENCRYPTION_KEY, 'salt', 32)
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    
    let encrypted = cipher.update(password, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const authTag = cipher.getAuthTag()
    
    return {
      encrypted: encrypted + ':' + authTag.toString('hex'),
      iv: iv.toString('hex'),
    }
  }

  /**
   * Decrypt password
   */
  private decryptPassword(encryptedData: string, ivHex: string): string {
    const [encrypted, authTagHex] = encryptedData.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    const key = crypto.scryptSync(this.ENCRYPTION_KEY, 'salt', 32)
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }

  // ============================================
  // Helper Methods
  // ============================================

  /**
   * ตรวจสอบว่าเป็น auth error หรือไม่
   */
  private isAuthError(result: any): boolean {
    if (!result.success) {
      const status = result.status
      const error = result.error?.toLowerCase() || ''
      
      return status === 401 || 
             status === 403 || 
             error.includes('unauthorized') ||
             error.includes('expired') ||
             error.includes('invalid token')
    }
    return false
  }
}

// ============================================
// Singleton Instance
// ============================================

let tokenManagerInstance: NhsoTokenManager | null = null

export function getNhsoTokenManager(): NhsoTokenManager {
  if (!tokenManagerInstance) {
    tokenManagerInstance = new NhsoTokenManager()
  }
  return tokenManagerInstance
}