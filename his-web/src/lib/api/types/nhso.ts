// src/lib/api/types/nhso.ts

// ============================================
// NHSO Login Types
// ============================================

export interface NhsoLoginRequest {
  username: string;
  password: string;
}

export interface NhsoLoginResponse {
  success: boolean;
  message?: string;
  data?: {
    username: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
    userInfo?: NhsoUserInfo;
  };
}

export interface NhsoUserInfo {
  sub?: string;
  username?: string;
  name?: string;
  nameTh?: string;
  givenName?: string;
  familyName?: string;
  email?: string;
  emailVerified?: boolean;
  personalId?: string;
  userId?: number;
  source?: string;
  organization?: {
    id: string;
    orgType: string;
    name: string;
    fromType: string;
  };
  realmAccess?: {
    roles: string[];
  };
  sessionState?: string;
}

// ============================================
// Token Status Types
// ============================================

export interface NhsoTokenStatus {
  isValid: boolean;
  accessTokenMinutesRemaining: number;
  refreshTokenHoursRemaining: number;
  needsRefresh: boolean;
  needsRelogin: boolean;
  message: string;
}

export interface NhsoTokenStatusResponse {
  success: boolean;
  data?: NhsoTokenStatus;
  message?: string;
}

// ============================================
// Refresh Token Types
// ============================================

export interface NhsoRefreshTokenResponse {
  success: boolean;
  message?: string;
  needsRelogin?: boolean;
  data?: {
    expiresAt: string;
  };
}
  
// ============================================
// Search by PID Types (ตรวจสอบสิทธิ)
// ============================================

export interface NhsoPersonalFund {
  // ข้อมูลพื้นฐาน
  pid?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  
  // สิทธิหลัก
  mainInscl?: string;
  mainInsclName?: string;
  
  // สิทธิรอง
  subInscl?: string;
  subInsclName?: string;
  
  // หน่วยบริการหลัก
  hospMain?: string;
  hospMainName?: string;
  
  // หน่วยบริการรอง
  hospSub?: string;
  hospSubName?: string;
  
  // วันที่
  startDate?: string;
  expireDate?: string;
  
  // สถานะ
  status?: string;
  statusName?: string;
  
  // ข้อมูลเพิ่มเติม
  [key: string]: unknown;
}

export interface NhsoSearchByPidResponse {
  success: boolean;
  data?: NhsoPersonalFund;
  message?: string;
  meta?: {
    tokenRefreshed?: boolean;
  };
}

// ============================================
// Check Rights Types (Login + Search รวม)
// ============================================

export interface NhsoCheckRightsRequest {
  username: string;
  password: string;
  pid: string;
}

export interface NhsoCheckRightsResponse {
  success: boolean;
  message?: string;
  data?: {
    rights: NhsoPersonalFund;
    tokenStatus: {
      accessTokenMinutesRemaining: number;
      refreshTokenHoursRemaining: number;
    };
  };
}

// ============================================
// Logout Types
// ============================================

export interface NhsoLogoutResponse {
  success: boolean;
  message?: string;
}

// ============================================
// Cleanup Types (Admin)
// ============================================

export interface NhsoCleanupResponse {
  success: boolean;
  data?: {
    removedCount: number;
    activeUsersCount: number;
  };
}

// ============================================
// Error Types
// ============================================

export interface NhsoError {
  success: false;
  message: string;
  needsRelogin?: boolean;
}