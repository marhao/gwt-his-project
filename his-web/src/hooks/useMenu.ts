'use client';

import { useState, useEffect, useCallback } from 'react';
import { MenuItem } from '@/types';
import { menuApi } from '@/lib/api';

interface UseMenuReturn {
  menus: MenuItem[];
  flatMenus: MenuItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getMenuByCode: (code: string) => MenuItem | undefined;
  getMenuByPath: (path: string) => MenuItem | undefined;
  hasAccess: (menuCode: string, action?: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'print') => boolean;
}

// Build tree structure from flat menu list
const buildMenuTree = (items: MenuItem[], parentId: number | null = null): MenuItem[] => {
  return items
    .filter((item) => item.parent_id === parentId)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({
      ...item,
      children: buildMenuTree(items, item.id),
    }));
};

// Flatten tree to list
const flattenMenuTree = (items: MenuItem[]): MenuItem[] => {
  const result: MenuItem[] = [];
  const traverse = (menuItems: MenuItem[]) => {
    for (const item of menuItems) {
      result.push(item);
      if (item.children && item.children.length > 0) {
        traverse(item.children);
      }
    }
  };
  traverse(items);
  return result;
};

export function useMenu(): UseMenuReturn {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [flatMenus, setFlatMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await menuApi.getUserMenus();

      if (response.success && response.data) {
        const menuTree = buildMenuTree(response.data);
        setMenus(menuTree);
        setFlatMenus(response.data);
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'Failed to fetch menus');
      setMenus([]);
      setFlatMenus([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const getMenuByCode = useCallback(
    (code: string): MenuItem | undefined => {
      return flatMenus.find((menu) => menu.menu_code === code);
    },
    [flatMenus]
  );

  const getMenuByPath = useCallback(
    (path: string): MenuItem | undefined => {
      return flatMenus.find((menu) => menu.route_path === path);
    },
    [flatMenus]
  );

  const hasAccess = useCallback(
    (
      menuCode: string,
      action: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'print' = 'view'
    ): boolean => {
      const menu = getMenuByCode(menuCode);
      if (!menu) return false;

      switch (action) {
        case 'view':
          return menu.can_view ?? false;
        case 'create':
          return menu.can_create ?? false;
        case 'edit':
          return menu.can_edit ?? false;
        case 'delete':
          return menu.can_delete ?? false;
        case 'export':
          return menu.can_export ?? false;
        case 'print':
          return menu.can_print ?? false;
        default:
          return false;
      }
    },
    [getMenuByCode]
  );

  return {
    menus,
    flatMenus,
    isLoading,
    error,
    refetch: fetchMenus,
    getMenuByCode,
    getMenuByPath,
    hasAccess,
  };
}