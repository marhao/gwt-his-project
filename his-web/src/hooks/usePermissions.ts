'use client';

import { useCallback } from 'react';
import { useAuth } from '@/components/providers';
import { useMenu } from './useMenu';

interface UsePermissionsReturn {
  hasPermission: (permissionCode: string) => boolean;
  hasMenuAccess: (menuCode: string, action?: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'print') => boolean;
  hasAnyPermission: (permissionCodes: string[]) => boolean;
  hasAllPermissions: (permissionCodes: string[]) => boolean;
  isAdmin: boolean;
}

export function usePermissions(): UsePermissionsReturn {
  const { user } = useAuth();
  const { hasAccess } = useMenu();

  const hasPermission = useCallback(
    (permissionCode: string): boolean => {
      if (!user?.permissions) return false;
      return user.permissions.includes(permissionCode);
    },
    [user?.permissions]
  );

  const hasMenuAccess = useCallback(
    (
      menuCode: string,
      action: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'print' = 'view'
    ): boolean => {
      return hasAccess(menuCode, action);
    },
    [hasAccess]
  );

  const hasAnyPermission = useCallback(
    (permissionCodes: string[]): boolean => {
      return permissionCodes.some((code) => hasPermission(code));
    },
    [hasPermission]
  );

  const hasAllPermissions = useCallback(
    (permissionCodes: string[]): boolean => {
      return permissionCodes.every((code) => hasPermission(code));
    },
    [hasPermission]
  );

  const isAdmin = user?.role === 'admin' || hasPermission('admin');

  return {
    hasPermission,
    hasMenuAccess,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin,
  };
}