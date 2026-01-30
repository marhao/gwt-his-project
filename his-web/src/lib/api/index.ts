// src/lib/api/index.ts
//
// Main entry point - Re-exports everything for backward compatibility
// 
// Usage (existing code still works):
//   import { patientApi, lookupApi, authApi } from '@/lib/api';
//
// Usage (new, more specific imports):
//   import { patientApi } from '@/lib/api/patient';
//   import { lookupApi } from '@/lib/api/lookups';
//

// ============================================
// Client
// ============================================
export { api } from './client';
export type { default as ApiClient } from './client';

// ============================================
// Types (re-export all)
// ============================================
export * from './types';

// ============================================
// Auth API
// ============================================
export { authApi } from './auth';
export type { LoginResponse, MeResponse } from './auth';

// ============================================
// Lookup API
// ============================================
export { lookupApi } from './lookups';

// ============================================
// Patient API
// ============================================
export { patientApi, patientImageApi } from './patient';

// ============================================
// Settings API (Menu, Role, Group, Permission)
// ============================================
export {
  menuApi,
  roleApi,
  groupApi,
  permissionApi,
  userSettingsApi,
  mySettingsApi,
  settingsApi,
} from './settings';

// ============================================
// User API
// ============================================
export { userApi } from './user';

// ============================================
// NHSO API (ตรวจสอบสิทธิ สปสช.)
// ============================================
export { nhsoApi } from './nhso';
export type {
  NhsoLoginResponse,
  NhsoTokenStatus,
  NhsoPersonalFund,
  NhsoSearchByPidResponse,
  NhsoCheckRightsResponse,
} from './nhso';

// ============================================
// Default export
// ============================================
export { api as default } from './client';