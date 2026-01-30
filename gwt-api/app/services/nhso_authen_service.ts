// app/services/nhso_auth_service.ts
import axios from 'axios'

interface NhsoTokens {
  idToken?: string
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
  sessionState?: string
}

interface NhsoUserInfo {
  sub?: string
  username?: string
  name?: string
  nameTh?: string
  givenName?: string
  familyName?: string
  email?: string
  emailVerified?: boolean
  personalId?: string
  userId?: number
  source?: string
  organization?: {
    id: string
    orgType: string
    name: string
    fromType: string
  }
  realmAccess?: {
    roles: string[]
  }
  sessionState?: string
  issuedAt?: Date
  expiresAt?: Date
}

interface LoginSession {
  authenServiceCookies: string[]
  iamCookies: string[]
  authenticateUrl: string
}

interface LoginResult {
  success: boolean
  session?: string
  cookies?: string[]
  userInfo?: NhsoUserInfo
  tokens?: {
    accessToken?: string
    refreshToken?: string
    idToken?: string
    expiresIn?: number
  }
  error?: string
  debug?: any
}

interface PersonalFundResult {
  success: boolean
  data?: PersonalFundData
  error?: string
  status?: number
}

interface PersonalFundData {
  pid?: string
  firstName?: string
  lastName?: string
  birthDate?: string
  mainInscl?: string
  mainInsclName?: string
  subInscl?: string
  subInsclName?: string
  hospMain?: string
  hospMainName?: string
  hospSub?: string
  hospSubName?: string
  startDate?: string
  expireDate?: string
  status?: string
  statusName?: string
  [key: string]: any
}

export default class NhsoAuthService {
  private iamBaseUrl = 'https://iam.nhso.go.th'
  private authenServiceUrl = 'https://authenservice.nhso.go.th'
  private realm = 'nhso'
  private clientId = 'authencode'

  // ============================================
  // STEP 1: Start OAuth Flow from AuthenService
  // ============================================

  async initLoginSession(): Promise<LoginSession> {
    const authenServiceCookies: string[] = []
    const iamCookies: string[] = []

    // Step 1.1: Request OAuth authorization from AuthenService
    const oauthUrl = `${this.authenServiceUrl}/authencode/oauth2/authorization/authencode`
    

    const step1Response = await fetch(oauthUrl, {
      method: 'GET',
      headers: this.getDefaultHeaders(),
      redirect: 'manual',
    })

    this.collectCookies(step1Response, authenServiceCookies)

    // Get redirect URL to IAM
    let iamAuthUrl = step1Response.headers.get('location')
    if (!iamAuthUrl) {
      throw new Error('No redirect to IAM from AuthenService')
    }

    // Step 1.2: Follow redirect to IAM
    const step2Response = await fetch(iamAuthUrl, {
      method: 'GET',
      headers: {
        ...this.getDefaultHeaders(),
        'Referer': this.authenServiceUrl,
      },
      redirect: 'manual',
    })

    this.collectCookies(step2Response, iamCookies)

    // Check if there's another redirect or if we got the login page
    let html = ''
    const nextRedirect = step2Response.headers.get('location')
    
    if (nextRedirect) {
      // Follow one more redirect if needed
      const absoluteUrl = nextRedirect.startsWith('http') ? nextRedirect : `${this.iamBaseUrl}${nextRedirect}`

      const step3Response = await fetch(absoluteUrl, {
        method: 'GET',
        headers: {
          ...this.getDefaultHeaders(),
          'Cookie': iamCookies.join('; '),
          'Referer': iamAuthUrl,
        },
        redirect: 'manual',
      })

      this.collectCookies(step3Response, iamCookies)
      html = await step3Response.text()
    } else {
      html = await step2Response.text()
    }

    // Parse login form
    const authenticateUrl = this.parseFormAction(html)

    return {
      authenServiceCookies,
      iamCookies,
      authenticateUrl,
    }
  }

  private parseFormAction(html: string): string {
    const match = html.match(/action="([^"]+)"/)
    if (!match) {
      console.log('[NHSO] HTML preview:', html.substring(0, 2000))
      throw new Error('Could not find form action')
    }
    
    let url = match[1].replace(/&amp;/g, '&')
    if (!url.startsWith('http')) {
      url = `${this.iamBaseUrl}${url}`
    }
    return url
  }

  // ============================================
  // STEP 2: Login with Username/Password
  // ============================================

  async login(username: string, password: string): Promise<LoginResult> {
    try {

      // Step 1: Initialize session
      const session = await this.initLoginSession()

      const formData = new URLSearchParams({
        username: username,
        password: password,
        credentialId: '',
      })

      const loginResponse = await fetch(session.authenticateUrl, {
        method: 'POST',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': session.iamCookies.join('; '),
          'Origin': this.iamBaseUrl,
          'Referer': session.authenticateUrl,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
          'Sec-Ch-Ua': '"Not_A Brand";v="99", "Chromium";v="142"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"macOS"',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': '1',
          'Cache-Control': 'max-age=0',
        },
        body: formData.toString(),
        redirect: 'manual',
      })

      // Collect cookies from login response
      const updatedIamCookies = [...session.iamCookies]
      this.collectCookies(loginResponse, updatedIamCookies)

      const redirectUrl = loginResponse.headers.get('location')

      if (!redirectUrl) {
        const html = await loginResponse.text()
        
        // Check for error
        if (html.includes('Invalid username or password') || html.includes('Invalid user credentials')) {
          return { success: false, error: 'Invalid username or password' }
        }
        
        return {
          success: false,
          error: 'Login failed - no redirect',
          debug: { status: loginResponse.status, htmlPreview: html.substring(0, 1000) }
        }
      }

      // Step 3: Follow redirect back to AuthenService with code
      return await this.followRedirectsToComplete(redirectUrl, session.authenServiceCookies, updatedIamCookies)

    } catch (error) {
      console.error('[NHSO] Login error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // ============================================
  // STEP 3: Follow Redirects and Get Session
  // ============================================

  private async followRedirectsToComplete(
    initialUrl: string,
    authenServiceCookies: string[],
    iamCookies: string[]
  ): Promise<LoginResult> {
    let currentUrl = initialUrl
    let currentCookies = [...authenServiceCookies]
    let maxRedirects = 10
    let capturedCode: string | null = null  // เก็บ authorization code

    while (maxRedirects > 0) {
      // Determine which cookies to use based on URL
      const isAuthenService = currentUrl.includes('authenservice.nhso.go.th')
      const isIam = currentUrl.includes('iam.nhso.go.th')
      
      let cookiesToUse: string[]
      if (isAuthenService) {
        cookiesToUse = currentCookies
      } else if (isIam) {
        cookiesToUse = iamCookies
      } else {
        cookiesToUse = currentCookies
      }

      // ตรวจจับ authorization code จาก callback URL
      if (currentUrl.includes('code=')) {
        const urlObj = new URL(currentUrl)
        capturedCode = urlObj.searchParams.get('code')
      }

      const response = await fetch(currentUrl, {
        method: 'GET',
        headers: {
          ...this.getDefaultHeaders(),
          'Cookie': cookiesToUse.join('; '),
        },
        redirect: 'manual',
      })

      // Collect cookies
      if (isAuthenService) {
        this.collectCookies(response, currentCookies)
      } else {
        this.collectCookies(response, iamCookies)
      }

      const nextUrl = response.headers.get('location')

      // Check if we've completed the flow
      if (!nextUrl && response.status === 200 && currentUrl.includes('/authencode/')) {
        const sessionCookie = currentCookies.find(c => c.startsWith('SESSION='))
        if (sessionCookie) {
          const sessionValue = sessionCookie.split('=')[1]

          // Get user info
          const userInfo = await this.getUserInfo({
            session: sessionValue,
            cookies: currentCookies,
          })

          // ดึง tokens จาก userInfo.idToken
          let tokens: LoginResult['tokens'] = undefined
          if (userInfo && (userInfo as any).idToken?.tokenValue) {
            const idTokenValue = (userInfo as any).idToken.tokenValue
            tokens = {
              accessToken: idTokenValue,
              idToken: idTokenValue,
            }
          }

          // ลองดึง refresh token จาก token endpoint ถ้ามี code
          if (capturedCode) {
            const oauthTokens = await this.exchangeCodeForTokens(capturedCode, currentCookies)
            if (oauthTokens) {
              tokens = {
                ...tokens,
                ...oauthTokens,
              }
            }
          }

          return {
            success: true,
            session: sessionValue,
            cookies: currentCookies,
            userInfo,
            tokens,
          }
        }
      }

      if (!nextUrl) {
        const sessionCookie = currentCookies.find(c => c.startsWith('SESSION='))
        if (sessionCookie) {
          const sessionValue = sessionCookie.split('=')[1]
          
          try {
            const userInfo = await this.getUserInfo({
              session: sessionValue,
              cookies: currentCookies,
            })

            let tokens: LoginResult['tokens'] = undefined
            if (userInfo && (userInfo as any).idToken?.tokenValue) {
              tokens = {
                accessToken: (userInfo as any).idToken.tokenValue,
                idToken: (userInfo as any).idToken.tokenValue,
              }
            }

            return {
              success: true,
              session: sessionValue,
              cookies: currentCookies,
              userInfo,
              tokens,
            }
          } catch (e) {
            // Session might not be valid
          }
        }
        break
      }

      // Prepare next URL
      if (!nextUrl.startsWith('http')) {
        if (nextUrl.includes('authencode') || isAuthenService) {
          currentUrl = `${this.authenServiceUrl}${nextUrl}`
        } else {
          currentUrl = `${this.iamBaseUrl}${nextUrl}`
        }
      } else {
        currentUrl = nextUrl
      }

      maxRedirects--
    }

    return {
      success: false,
      error: 'Could not complete login flow',
      debug: { lastCookies: currentCookies }
    }
  }

  // ============================================
  // Exchange Authorization Code for Tokens
  // ============================================

  /**
   * แลก authorization code เป็น access_token และ refresh_token
   * ผ่าน OAuth token endpoint
   */
  private async exchangeCodeForTokens(code: string, cookies: string[]): Promise<LoginResult['tokens'] | null> {
    try {

      // ลองเรียก token endpoint ของ IAM
      const tokenUrl = `${this.iamBaseUrl}/realms/${this.realm}/protocol/openid-connect/token`
      
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: this.clientId,
          code: code,
          redirect_uri: `${this.authenServiceUrl}/authencode/login/oauth2/code/authencode`,
        }).toString(),
      })

      if (response.ok) {
        const data: any = await response.json()
        console.log('[NHSO] Got tokens from IAM:', Object.keys(data))
        
        return {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
        }
      } else {
        console.log('[NHSO] Token exchange failed:', response.status)
      }
    } catch (error) {
      console.error('[NHSO] Error exchanging code for tokens:', error)
    }

    return null
  }

  // ============================================
  // STEP 4: Get User Info
  // ============================================

  async getUserInfo(params: { session: string; cookies?: string[] }): Promise<NhsoUserInfo> {
    const cookieString = params.cookies 
      ? params.cookies.join('; ')
      : `SESSION=${params.session}`


    const response = await fetch(`${this.authenServiceUrl}/authencode/api/user-info`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': cookieString,
        'Referer': `${this.authenServiceUrl}/authencode/`,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
        'Sec-Ch-Ua': '"Not_A Brand";v="99", "Chromium";v="142"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      },
    })

    if (!response.ok) {
      throw new Error(`Get user info failed: ${response.status}`)
    }

    return await response.json() as NhsoUserInfo
  }

  // ============================================
  // Search Personal Fund by PID (เลขบัตรประชาชน)
  // ============================================

  /**
   * ค้นหาข้อมูลสิทธิการรักษาจากเลขบัตรประชาชน
   * @param pid - เลขบัตรประชาชน 13 หลัก
   * @param sessionOrCookies - SESSION value หรือ array ของ cookies
   * @returns PersonalFundResult
   */
  async searchByPid(
    pid: string, 
    sessionOrCookies: string | string[]
  ): Promise<PersonalFundResult> {
    try {
      // Validate PID
      if (!pid || pid.length !== 13) {
        return {
          success: false,
          error: 'Invalid PID: must be 13 digits',
        }
      }

      // Build cookie string
      const cookieString = Array.isArray(sessionOrCookies)
        ? sessionOrCookies.join('; ')
        : `SESSION=${sessionOrCookies}`

      const response = await fetch(
        `${this.authenServiceUrl}/authencode/api/nch-personal-fund/search-by-pid?pid=${pid}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': cookieString,
            'Referer': `${this.authenServiceUrl}/authencode/`,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
            'Sec-Ch-Ua': '"Not_A Brand";v="99", "Chromium";v="142"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"macOS"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        return {
          success: false,
          error: `Search failed: ${response.status}`,
          status: response.status,
        }
      }

      const data = await response.json()
      
      return {
        success: true,
        data: data as PersonalFundData,
      }

    } catch (error: any) {
      console.error('[NHSO] Search by PID error:', error)
      return {
        success: false,
        error: error.message || 'Unknown error',
      }
    }
  }

  /**
   * ค้นหาข้อมูลสิทธิการรักษา (ใช้ axios)
   * @deprecated ใช้ searchByPid แทน
   */
  async searchByPidAxios(pid: string, token: string) {
    try {
      const response = await axios.get(
        `${this.authenServiceUrl}/authencode/api/nch-personal-fund/search-by-pid`,
        {
          params: { pid },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      )

      return {
        success: true,
        data: response.data,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        response: error.response?.data,
      }
    }
  }

  // ============================================
  // Logout
  // ============================================

  buildLogoutUrl(idTokenHint: string, postLogoutRedirectUri?: string): string {
    const params = new URLSearchParams({
      id_token_hint: idTokenHint,
      post_logout_redirect_uri: postLogoutRedirectUri || `${this.authenServiceUrl}/authencode`,
    })
    return `${this.iamBaseUrl}/realms/${this.realm}/protocol/openid-connect/logout?${params.toString()}`
  }

  // ============================================
  // Helper Methods
  // ============================================

  private collectCookies(response: Response, cookies: string[]): void {
    if (typeof response.headers.getSetCookie === 'function') {
      for (const cookie of response.headers.getSetCookie()) {
        const cookiePart = cookie.split(';')[0]
        const cookieName = cookiePart.split('=')[0]
        
        // Update existing or add new
        const existingIndex = cookies.findIndex(c => c.startsWith(cookieName + '='))
        if (existingIndex >= 0) {
          cookies[existingIndex] = cookiePart
        } else {
          cookies.push(cookiePart)
        }
      }
    }
  }

  private getDefaultHeaders(): Record<string, string> {
    return {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      'Sec-Ch-Ua': '"Not_A Brand";v="99", "Chromium";v="142"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"macOS"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
    }
  }
}