// app/services/health_id_service.ts

import env from '#start/env'
import { SecureConfig } from '../utils/crypto.js'

interface HealthIdTokenResponse {
  status: string
  data: {
    access_token: string
    token_type: string
    expires_in: number
    account_id: string
    expiration_date?: string
  }
  message: string
}

interface ProviderIdTokenResponse {
  status: number
  message: string
  data: {
    token_type: string
    expires_in: number
    access_token: string
    expiration_date: string
    account_id: string
    result: string
    username: string
    login_by: string
  }
}

interface ProviderProfile {
  status: number
  message: string
  data: {
    account_id: string
    hash_cid: string
    provider_id: string
    title_th: string | null
    special_title_th: string | null
    name_th: string
    name_eng: string
    created_at: string
    title_en: string | null
    special_title_en: string | null
    firstname_th: string
    lastname_th: string
    firstname_en: string
    lastname_en: string
    organization: ProviderOrganization[]
  }
}

interface ProviderOrganization {
  business_id: string
  position: string
  affiliation: string
  license_id: string
  hcode: string
  code9: string
  hcode9: string
  level: string
  hname_th: string
  hname_eng: string
  tax_id: string
  license_expired_date: string | null
  license_id_verify: boolean
  expertise: string
  expertise_id: string
  is_private_provider: boolean
  address: {
    address: string
    moo: string | null
    building: string | null
    soi: string | null
    street: string | null
    province: string
    district: string
    sub_district: string
    zip_code: string
  }
  is_hr_admin: boolean
  is_director: boolean
  moph_access_token_idp: string | null
  moph_access_token_idp_fdh: string | null
  moph_access_token_idp_pcu: string | null
  position_type: string | null
}

/**
 * Health ID และ Provider ID Authentication Service
 * ใช้เข้ารหัส credentials ด้วย AES-256-GCM
 */
export default class HealthIdService {
  private healthIdUrl: string
  private providerUrl: string
  private healthIdClientId: string
  private healthIdClientSecret: string
  private providerClientId: string
  private providerSecretKey: string
  private redirectUri: string

  constructor() {
    // URLs และ Redirect URI ดึงจาก environment (ไม่ sensitive)
    this.healthIdUrl = env.get('HEALTH_ID_URL', 'https://moph.id.th')
    this.providerUrl = env.get('PROVIDER_ID_URL', 'https://provider.id.th')
    this.redirectUri = env.get('HEALTH_ID_REDIRECT_URI', '')

    try {
      this.healthIdClientId = SecureConfig.decrypt(
        'd60e15dd057727aa92d8453ca74f97ee:a12d827d9060f050c3574a6d8d0ea254:bb5e9b1b21c68f71b68067b58d159f1b221df13804d8187fc4968f92d3253ee4c23fc7eb'
      )
      
      this.healthIdClientSecret = SecureConfig.decrypt(
        'f98932da8deba09141a4c891ff63b678:424cca7d533eb001546933fe34f9f6c3:5df356162eca0fe031c541eea6554a9d96baed2eaa37e3b6235d25729d83de24d4f1d85d708b5f3b'
      )
      
      this.providerClientId = SecureConfig.decrypt(
        'cf496db117830d18f66a4613fa460f33:d631e412ca76aa16024c0995ff84fc79:d3ba971a6f0dcf731d91c5510b906c421a6a301f05dc1ec957131c5ddc4453199c0d785f'
      )
      
      this.providerSecretKey = SecureConfig.decrypt(
        'dbac0e077987cbe18dbb96c7fefa8442:f538ac80f720f2e9d872c0be7e3ed0fd:a722c0d7571bdb7067630001178482e5975e885c9c5e2fe9cc61f4215a47929c'
      )
    } catch (error) {
      throw new Error(
        `Failed to decrypt credentials: ${error.message}`
      )
    }
  }

  /**
   * สร้าง URL สำหรับ Login ผ่าน Health ID
   */
  getLoginUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.healthIdClientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
    })

    if (state) {
      params.append('state', state)
    }

    return `${this.healthIdUrl}/oauth/redirect?${params.toString()}`
  }

  async getHealthIdToken(code: string): Promise<HealthIdTokenResponse> {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
      client_id: this.healthIdClientId,
      client_secret: this.healthIdClientSecret,
    })

    const response = await fetch(`${this.healthIdUrl}/api/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    const responseBody = await response.text()

    if (!response.ok) {
      let errorMessage = 'Failed to get Health ID token'
      try {
        const errorJson = JSON.parse(responseBody)
        errorMessage = errorJson.message || errorMessage
      } catch {
        errorMessage = responseBody || errorMessage
      }
      throw new HealthIdError(response.status, errorMessage)
    }

    return JSON.parse(responseBody) as HealthIdTokenResponse
  }

  async getHealthIdPublicKey(): Promise<string> {
    const response = await fetch(`${this.healthIdUrl}/api/v1/oauth/public-key`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': this.healthIdClientId,
        'secret-key': this.healthIdClientSecret,
      },
    })

    if (!response.ok) {
      const error: any = await response.json()
      throw new HealthIdError(response.status, error.message || 'Failed to get public key')
    }

    return response.text()
  }

  async getProviderIdToken(healthIdAccessToken: string): Promise<ProviderIdTokenResponse> {
    const response = await fetch(`${this.providerUrl}/api/v1/services/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.providerClientId,
        secret_key: this.providerSecretKey,
        token_by: 'Health ID',
        token: healthIdAccessToken,
      }),
    })

    if (!response.ok) {
      const error: any = await response.json()
      throw new HealthIdError(response.status, error.message || 'Failed to get Provider ID token')
    }

    return response.json() as Promise<ProviderIdTokenResponse>
  }

  async getProviderProfile(
    providerAccessToken: string,
    options?: {
      mophCenterToken?: boolean
      mophIdpPermission?: boolean
      positionType?: boolean
    }
  ): Promise<ProviderProfile> {
    const params = new URLSearchParams()

    if (options?.mophCenterToken) {
      params.append('moph_center_token', '1')
    }
    if (options?.mophIdpPermission) {
      params.append('moph_idp_permission', '1')
    }
    if (options?.positionType) {
      params.append('position_type', '1')
    }

    const queryString = params.toString()
    const url = `${this.providerUrl}/api/v1/services/profile${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${providerAccessToken}`,
        'client-id': this.providerClientId,
        'secret-key': this.providerSecretKey,
      },
    })

    if (!response.ok) {
      const error: any = await response.json()
      throw new HealthIdError(response.status, error.message || 'Failed to get provider profile')
    }

    return response.json() as Promise<ProviderProfile>
  }

  async getProviderIdPublicKey(): Promise<string> {
    const response = await fetch(`${this.providerUrl}/api/v1/services/public-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.providerClientId,
        secret_key: this.providerSecretKey,
      }),
    })

    if (!response.ok) {
      const error: any = await response.json()
      throw new HealthIdError(
        response.status,
        error.message || 'Failed to get Provider ID public key'
      )
    }

    return response.text()
  }

  async authenticateProvider(
    code: string,
    profileOptions?: {
      mophCenterToken?: boolean
      mophIdpPermission?: boolean
      positionType?: boolean
    }
  ) {
    
    const healthIdResult = await this.getHealthIdToken(code)
    const healthIdAccessToken = healthIdResult.data.access_token
    const providerResult = await this.getProviderIdToken(healthIdAccessToken)
    const providerAccessToken = providerResult.data.access_token
    const profile = await this.getProviderProfile(providerAccessToken, profileOptions)

    return {
      healthId: {
        accessToken: healthIdAccessToken,
        accountId: healthIdResult.data.account_id,
        expiresIn: healthIdResult.data.expires_in,
      },
      providerId: {
        accessToken: providerAccessToken,
        accountId: providerResult.data.account_id,
        username: providerResult.data.username,
        expiresIn: providerResult.data.expires_in,
      },
      profile: profile.data,
    }
  }
}

export class HealthIdError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'HealthIdError'
  }
}