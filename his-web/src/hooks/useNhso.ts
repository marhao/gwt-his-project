// src/hooks/useNhso.ts
//
// React Hook for NHSO API
//
// Usage:
//   const { 
//     login, 
//     checkRights, 
//     searchByPid,
//     tokenStatus,
//     isLoading,
//     error 
//   } = useNhso();
//

import { useState, useCallback, useEffect } from 'react';
import { nhsoApi } from '@/lib/api/nhso';
import type {
  NhsoTokenStatus,
  NhsoPersonalFund,
  NhsoUserInfo,
} from '@/lib/api/types/nhso';

// ============================================
// Types
// ============================================

interface UseNhsoState {
  isLoggedIn: boolean;
  username: string | null;
  tokenStatus: NhsoTokenStatus | null;
  userInfo: NhsoUserInfo | null;
  lastRightsCheck: NhsoPersonalFund | null;
  isLoading: boolean;
  error: string | null;
}

interface UseNhsoReturn extends UseNhsoState {
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  checkRights: (username: string, password: string, pid: string) => Promise<NhsoPersonalFund | null>;
  searchByPid: (pid: string) => Promise<NhsoPersonalFund | null>;
  quickCheck: (pid: string, credentials?: { username: string; password: string }) => Promise<NhsoPersonalFund | null>;
  
  // Helpers
  clearError: () => void;
  formatPid: (pid: string) => string;
  formatRights: (rights: NhsoPersonalFund) => ReturnType<typeof nhsoApi.formatRights>;
  isValidPid: (pid: string) => boolean;
}

// ============================================
// Hook
// ============================================

export function useNhso(): UseNhsoReturn {
  const [state, setState] = useState<UseNhsoState>({
    isLoggedIn: nhsoApi.isLoggedIn(),
    username: nhsoApi.getUsername(),
    tokenStatus: null,
    userInfo: null,
    lastRightsCheck: null,
    isLoading: false,
    error: null,
  });

  // ============================================
  // Load token status on mount
  // ============================================
  useEffect(() => {
    if (state.isLoggedIn) {
      loadTokenStatus();
    }
  }, []);

  // ============================================
  // Internal Helpers
  // ============================================

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  };

  const loadTokenStatus = async () => {
    const response = await nhsoApi.getTokenStatus();
    if (response.success && response.data) {
      setState(prev => ({ ...prev, tokenStatus: response.data! }));
    }
  };

  // ============================================
  // Actions
  // ============================================

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await nhsoApi.login(username, password);

      if (response.success) {
        setState(prev => ({
          ...prev,
          isLoggedIn: true,
          username,
          userInfo: response.data?.userInfo || null,
          isLoading: false,
          error: null,
        }));

        // Load token status
        await loadTokenStatus();
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      await nhsoApi.logout();
    } finally {
      setState({
        isLoggedIn: false,
        username: null,
        tokenStatus: null,
        userInfo: null,
        lastRightsCheck: null,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await nhsoApi.refreshToken();

      if (response.success) {
        await loadTokenStatus();
        setLoading(false);
        return true;
      } else {
        if (response.needsRelogin) {
          setState(prev => ({
            ...prev,
            isLoggedIn: false,
            tokenStatus: null,
            error: response.message || 'Session expired. Please login again.',
            isLoading: false,
          }));
        } else {
          setError(response.message || 'Refresh failed');
        }
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Refresh failed');
      return false;
    }
  }, []);

  const checkRights = useCallback(async (
    username: string,
    password: string,
    pid: string
  ): Promise<NhsoPersonalFund | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await nhsoApi.checkRights(username, password, pid);

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          isLoggedIn: true,
          username,
          lastRightsCheck: response.data!.rights,
          tokenStatus: {
            isValid: true,
            accessTokenMinutesRemaining: response.data!.tokenStatus.accessTokenMinutesRemaining,
            refreshTokenHoursRemaining: response.data!.tokenStatus.refreshTokenHoursRemaining,
            needsRefresh: response.data!.tokenStatus.accessTokenMinutesRemaining < 5,
            needsRelogin: false,
            message: 'Token valid',
          },
          isLoading: false,
          error: null,
        }));

        return response.data.rights;
      } else {
        setError(response.message || 'Check rights failed');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check rights failed');
      return null;
    }
  }, []);

  const searchByPid = useCallback(async (pid: string): Promise<NhsoPersonalFund | null> => {
    if (!state.isLoggedIn) {
      setError('Not logged in. Please login first.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await nhsoApi.searchByPid(pid);

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          lastRightsCheck: response.data!,
          isLoading: false,
          error: null,
        }));

        // Refresh token status if token was refreshed
        if (response.meta?.tokenRefreshed) {
          await loadTokenStatus();
        }

        return response.data;
      } else {
        setError(response.message || 'Search failed');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      return null;
    }
  }, [state.isLoggedIn]);

  const quickCheck = useCallback(async (
    pid: string,
    credentials?: { username: string; password: string }
  ): Promise<NhsoPersonalFund | null> => {
    // Try with existing session first
    if (state.isLoggedIn) {
      const result = await searchByPid(pid);
      if (result) return result;
    }

    // If no session or failed, try with credentials
    if (credentials) {
      return checkRights(credentials.username, credentials.password, pid);
    }

    return null;
  }, [state.isLoggedIn, searchByPid, checkRights]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // ============================================
  // Return
  // ============================================

  return {
    // State
    ...state,

    // Actions
    login,
    logout,
    refreshToken,
    checkRights,
    searchByPid,
    quickCheck,

    // Helpers
    clearError,
    formatPid: nhsoApi.formatPid,
    formatRights: nhsoApi.formatRights,
    isValidPid: nhsoApi.isValidPid,
  };
}

export default useNhso;