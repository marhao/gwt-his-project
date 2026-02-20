// src/lib/api/auth.ts

import { api } from './client';

// ============================================
// Auth Response Types
// ============================================

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    expiresIn: number;
    user: {
      officerId: number;
      username: string;
      name: string;
      role: string;
      department: string | null;
      permissions: string[];
    };
    loginInfo: {
      clientIP: string;
      serverIP: string;
      serverMAC: string;
      serverHostname: string;
      loginTime: string;
    };
  };
}

export interface MeResponse {
  success: boolean;
  data: {
    user: unknown;
  };
}

// ============================================
// Auth API
// ============================================

export const authApi = {
  login: (username: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { username, password }),

  loginWithProvider: (code: string) =>
    api.post<LoginResponse>('/auth/login-provider', { code }),

  logout: () => {
    api.clearToken();
    return api.post('/auth/logout');
  },

  refreshToken: () => api.post<{ token: string }>('/auth/refresh'),

  me: () => api.get<MeResponse>('/auth/me'),
};

export default authApi;