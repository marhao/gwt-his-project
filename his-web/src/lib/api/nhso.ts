// src/lib/api/nhso.ts

// src/lib/api/nhso.ts
//
// NHSO API - ตรวจสอบสิทธิการรักษา สปสช.
//
// Usage:
//   import { nhsoApi } from '@/lib/api/nhso';
//   
//   // Login
//   const loginResult = await nhsoApi.login('username', 'password');
//   
//   // Check token status
//   const status = await nhsoApi.getTokenStatus();
//   
//   // Search by PID (auto-refresh token)
//   const rights = await nhsoApi.searchByPid('3301700333333');
//   
//   // Or use checkRights (login + search in one call)
//   const result = await nhsoApi.checkRights('username', 'password', '3301700333333');
//

import { api } from './client';
import type {
  NhsoLoginRequest,
  NhsoLoginResponse,
  NhsoTokenStatusResponse,
  NhsoRefreshTokenResponse,
  NhsoSearchByPidResponse,
  NhsoCheckRightsRequest,
  NhsoCheckRightsResponse,
  NhsoLogoutResponse,
  NhsoCleanupResponse,
  NhsoPersonalFund,
  NhsoTokenStatus,
} from './types/nhso';

// ============================================
// Local Storage Keys
// ============================================
const NHSO_USERNAME_KEY = 'nhso_username';
const NHSO_CREDENTIALS_KEY = 'nhso_credentials'; // Encrypted or session-only

// ============================================
// NHSO API Class
// ============================================
class NhsoApi {
  private username: string | null = null;

  constructor() {
    // Load username from localStorage on init
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem(NHSO_USERNAME_KEY);
    }
  }

  // ============================================
  // Authentication
  // ============================================

  /**
   * Login to NHSO
   * @param username - NHSO username
   * @param password - NHSO password
   * @param remember - Save username for future use
   */
  async login(
    username: string,
    password: string,
    remember: boolean = true
  ): Promise<NhsoLoginResponse> {
    const response = await api.post<NhsoLoginResponse>('/nhso/login', {
      username,
      password,
    } as NhsoLoginRequest);

    if (response.success && remember) {
      this.username = username;
      if (typeof window !== 'undefined') {
        localStorage.setItem(NHSO_USERNAME_KEY, username);
      }
    }

    return response;
  }

  /**
   * Logout from NHSO
   */
  async logout(): Promise<NhsoLogoutResponse> {
    const username = this.getUsername();
    if (!username) {
      return { success: false, message: 'No active session' };
    }

    const response = await api.post<NhsoLogoutResponse>(
      '/nhso/logout',
      { username },
      { headers: { 'X-NHSO-Username': username } }
    );

    if (response.success) {
      this.clearSession();
    }

    return response;
  }

  /**
   * Clear local session data
   */
  clearSession(): void {
    this.username = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(NHSO_USERNAME_KEY);
      localStorage.removeItem(NHSO_CREDENTIALS_KEY);
    }
  }

  // ============================================
  // Token Management
  // ============================================

  /**
   * Get current token status
   */
  async getTokenStatus(): Promise<NhsoTokenStatusResponse> {
    const username = this.getUsername();
    if (!username) {
      return {
        success: false,
        message: 'No active session. Please login first.',
      };
    }

    return api.get<NhsoTokenStatusResponse>('/nhso/token-status', {
      headers: { 'X-NHSO-Username': username },
    });
  }

  /**
   * Manually refresh access token
   */
  async refreshToken(): Promise<NhsoRefreshTokenResponse> {
    const username = this.getUsername();
    if (!username) {
      return {
        success: false,
        message: 'No active session. Please login first.',
        needsRelogin: true,
      };
    }

    return api.post<NhsoRefreshTokenResponse>(
      '/nhso/refresh-token',
      { username },
      { headers: { 'X-NHSO-Username': username } }
    );
  }

  /**
   * Check if token is valid and not expired
   */
  async isTokenValid(): Promise<boolean> {
    const status = await this.getTokenStatus();
    return status.success && status.data?.isValid === true;
  }

  /**
   * Check if needs to re-login
   */
  async needsRelogin(): Promise<boolean> {
    const status = await this.getTokenStatus();
    return !status.success || status.data?.needsRelogin === true;
  }

  // ============================================
  // Rights Verification (ตรวจสอบสิทธิ)
  // ============================================

  /**
   * Search patient rights by PID (เลขบัตรประชาชน)
   * Auto-refreshes token if needed
   * 
   * @param pid - เลขบัตรประชาชน 13 หลัก
   */
  async searchByPid(pid: string): Promise<NhsoSearchByPidResponse> {
    const username = this.getUsername();
    if (!username) {
      return {
        success: false,
        message: 'No active session. Please login first.',
      };
    }

    // Validate PID
    if (!this.isValidPid(pid)) {
      return {
        success: false,
        message: 'Invalid PID format. Must be 13 digits.',
      };
    }

    return api.get<NhsoSearchByPidResponse>(`/nhso/search-by-pid/${pid}`, {
      headers: { 'X-NHSO-Username': username },
    });
  }

  /**
   * Check rights with auto-login
   * Combines login and search in one call
   * 
   * @param username - NHSO username
   * @param password - NHSO password
   * @param pid - เลขบัตรประชาชน 13 หลัก
   */
  async checkRights(
    username: string,
    password: string,
    pid: string
  ): Promise<NhsoCheckRightsResponse> {
    // Validate PID
    if (!this.isValidPid(pid)) {
      return {
        success: false,
        message: 'Invalid PID format. Must be 13 digits.',
      };
    }

    const response = await api.post<NhsoCheckRightsResponse>('/nhso/check-rights', {
      username,
      password,
      pid,
    } as NhsoCheckRightsRequest);

    // Save username if successful
    if (response.success) {
      this.username = username;
      if (typeof window !== 'undefined') {
        localStorage.setItem(NHSO_USERNAME_KEY, username);
      }
    }

    return response;
  }

  /**
   * Quick check rights using stored credentials
   * Falls back to checkRights if no session
   * 
   * @param pid - เลขบัตรประชาชน 13 หลัก
   * @param credentials - Optional credentials for auto-login
   */
  async quickCheckRights(
    pid: string,
    credentials?: { username: string; password: string }
  ): Promise<NhsoSearchByPidResponse | NhsoCheckRightsResponse> {
    // Try with existing session first
    const searchResult = await this.searchByPid(pid);

    // If successful or no credentials provided, return result
    if (searchResult.success || !credentials) {
      return searchResult;
    }

    // If failed and credentials provided, try login + search
    return this.checkRights(credentials.username, credentials.password, pid);
  }

  // ============================================
  // Admin Functions
  // ============================================

  /**
   * Cleanup expired tokens (admin only)
   */
  async cleanup(): Promise<NhsoCleanupResponse> {
    return api.post<NhsoCleanupResponse>('/nhso/cleanup');
  }

  // ============================================
  // Helper Methods
  // ============================================

  /**
   * Get stored username
   */
  getUsername(): string | null {
    return this.username;
  }

  /**
   * Set username (for external login flows)
   */
  setUsername(username: string): void {
    this.username = username;
    if (typeof window !== 'undefined') {
      localStorage.setItem(NHSO_USERNAME_KEY, username);
    }
  }

  /**
   * Check if logged in (has username)
   */
  isLoggedIn(): boolean {
    return !!this.username;
  }

  /**
   * Validate PID format (13 digits)
   */
  isValidPid(pid: string): boolean {
    return /^\d{13}$/.test(pid);
  }

  /**
   * Format PID for display (x-xxxx-xxxxx-xx-x)
   */
  formatPid(pid: string): string {
    if (!pid || pid.length !== 13) return pid;
    return `${pid[0]}-${pid.slice(1, 5)}-${pid.slice(5, 10)}-${pid.slice(10, 12)}-${pid[12]}`;
  }

  /**
   * Parse rights data to Thai display format
   */
  formatRights(rights: NhsoPersonalFund): {
    mainRight: string;
    subRight: string;
    mainHospital: string;
    subHospital: string;
    status: string;
    expireDate: string;
  } {
    return {
      mainRight: rights.mainInsclName || rights.mainInscl || '-',
      subRight: rights.subInsclName || rights.subInscl || '-',
      mainHospital: rights.hospMainName || rights.hospMain || '-',
      subHospital: rights.hospSubName || rights.hospSub || '-',
      status: rights.statusName || rights.status || '-',
      expireDate: rights.expireDate || '-',
    };
  }
}

// ============================================
// Singleton Instance
// ============================================
export const nhsoApi = new NhsoApi();

// ============================================
// Re-export types
// ============================================
export type {
  NhsoLoginRequest,
  NhsoLoginResponse,
  NhsoTokenStatus,
  NhsoTokenStatusResponse,
  NhsoRefreshTokenResponse,
  NhsoPersonalFund,
  NhsoSearchByPidResponse,
  NhsoCheckRightsRequest,
  NhsoCheckRightsResponse,
  NhsoLogoutResponse,
  NhsoCleanupResponse,
} from './types/nhso';