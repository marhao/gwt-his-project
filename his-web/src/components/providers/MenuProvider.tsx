'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MenuItem } from '@/types';
import { menuApi } from '@/lib/api';
import { useAuth } from './AuthProvider';

// API response type (camelCase from backend)
interface ApiMenuItem {
  menuId: number;
  menuCode: string;
  menuName: string;
  menuNameTh: string | null;
  parentId: number | null;
  icon: string | null;
  routePath: string | null;
  sortOrder: number;
  isActive?: boolean;
  canView?: number;
  canCreate?: number;
  canEdit?: number;
  canDelete?: number;
  canExport?: number;
  canPrint?: number;
  children?: ApiMenuItem[];
}

// Convert API response (camelCase) to frontend format (snake_case)
const convertApiMenuItem = (item: ApiMenuItem): MenuItem => ({
  id: item.menuId,
  menu_code: item.menuCode,
  menu_name: item.menuName,
  menu_name_th: item.menuNameTh,
  parent_id: item.parentId,
  icon: item.icon,
  route_path: item.routePath,
  sort_order: item.sortOrder,
  is_active: item.isActive ?? true,
  can_view: item.canView === 1,
  can_create: item.canCreate === 1,
  can_edit: item.canEdit === 1,
  can_delete: item.canDelete === 1,
  can_export: item.canExport === 1,
  can_print: item.canPrint === 1,
  children: item.children?.map(convertApiMenuItem) ?? [],
});

// Extended MenuItem with access permissions and HIS-specific properties
export interface MenuAccessItem extends MenuItem {
  // Access permissions
  can_view?: boolean;
  can_create?: boolean;
  can_edit?: boolean;
  can_delete?: boolean;
  can_export?: boolean;
  can_print?: boolean;
  
  // HIS-specific UI properties
  badge_count?: number;        // จำนวน notification (เช่น ผู้ป่วยรอตรวจ, รอจ่ายยา)
  badge_type?: 'default' | 'warning' | 'danger' | 'success'; // สีของ badge
  is_new?: boolean;            // แสดง label "New" สำหรับเมนูใหม่
  has_notification?: boolean;  // แสดง status dot (สำหรับ ER, เคสด่วน)
  notification_type?: 'info' | 'warning' | 'danger'; // ประเภท notification
  shortcut_key?: string;       // Keyboard shortcut (เช่น 'Alt+O' สำหรับ OPD)
  
  children?: MenuAccessItem[];
}

// Badge configuration for different menu types
export interface MenuBadgeConfig {
  menu_code: string;
  count?: number;
  type?: 'default' | 'warning' | 'danger' | 'success';
  has_notification?: boolean;
  notification_type?: 'info' | 'warning' | 'danger';
}

interface MenuContextType {
  menus: MenuAccessItem[];
  flatMenus: MenuAccessItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getMenuByCode: (code: string) => MenuAccessItem | undefined;
  getMenuByPath: (path: string) => MenuAccessItem | undefined;
  hasAccess: (menuCode: string, action?: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'print') => boolean;
  checkAccess: (menuCode: string) => Promise<{
    has_access: boolean;
    can_view: boolean;
    can_create: boolean;
    can_edit: boolean;
    can_delete: boolean;
    can_export: boolean;
    can_print: boolean;
  } | null>;
  // New methods for HIS badge management
  updateMenuBadge: (menuCode: string, config: Partial<MenuBadgeConfig>) => void;
  updateMenuBadges: (configs: MenuBadgeConfig[]) => void;
  clearMenuBadge: (menuCode: string) => void;
  clearAllBadges: () => void;
}

const MenuContext = createContext<MenuContextType | null>(null);

// Convert MenuItem to MenuAccessItem with default permissions
const toMenuAccessItem = (item: MenuItem): MenuAccessItem => ({
  ...item,
  // Access permissions
  can_view: (item as MenuAccessItem).can_view ?? true,
  can_create: (item as MenuAccessItem).can_create ?? false,
  can_edit: (item as MenuAccessItem).can_edit ?? false,
  can_delete: (item as MenuAccessItem).can_delete ?? false,
  can_export: (item as MenuAccessItem).can_export ?? false,
  can_print: (item as MenuAccessItem).can_print ?? false,
  // HIS properties (preserve if exists, otherwise undefined)
  badge_count: (item as MenuAccessItem).badge_count,
  badge_type: (item as MenuAccessItem).badge_type,
  is_new: (item as MenuAccessItem).is_new,
  has_notification: (item as MenuAccessItem).has_notification,
  notification_type: (item as MenuAccessItem).notification_type,
  shortcut_key: (item as MenuAccessItem).shortcut_key,
  children: item.children?.map(toMenuAccessItem) ?? [],
});

// Build tree structure from flat menu list
const buildMenuTree = (items: MenuAccessItem[]): MenuAccessItem[] => {
  const menuMap = new Map<number, MenuAccessItem>();

  // First pass: create all menu items with empty children arrays
  items.forEach((item) => {
    menuMap.set(item.id, { ...item, children: [] });
  });

  // Second pass: build the tree
  const rootMenus: MenuAccessItem[] = [];

  items.forEach((item) => {
    const menuItem = menuMap.get(item.id)!;

    if (item.parent_id === null || item.parent_id === undefined) {
      rootMenus.push(menuItem);
    } else {
      const parent = menuMap.get(item.parent_id);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(menuItem);
      } else {
        rootMenus.push(menuItem);
      }
    }
  });

  // Sort menus by sort_order
  const sortMenus = (menus: MenuAccessItem[]): MenuAccessItem[] => {
    return menus
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((menu) => ({
        ...menu,
        children: menu.children ? sortMenus(menu.children) : [],
      }));
  };

  return sortMenus(rootMenus);
};

// Flatten tree to list
const flattenTree = (items: MenuAccessItem[]): MenuAccessItem[] => {
  const result: MenuAccessItem[] = [];
  const traverse = (menuItems: MenuAccessItem[]) => {
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

// Helper to update badge in menu tree
const updateBadgeInTree = (
  menus: MenuAccessItem[],
  menuCode: string,
  config: Partial<MenuBadgeConfig>
): MenuAccessItem[] => {
  return menus.map((menu) => {
    if (menu.menu_code === menuCode) {
      return {
        ...menu,
        badge_count: config.count ?? menu.badge_count,
        badge_type: config.type ?? menu.badge_type,
        has_notification: config.has_notification ?? menu.has_notification,
        notification_type: config.notification_type ?? menu.notification_type,
      };
    }
    if (menu.children && menu.children.length > 0) {
      return {
        ...menu,
        children: updateBadgeInTree(menu.children, menuCode, config),
      };
    }
    return menu;
  });
};

// Helper to clear badge in menu tree
const clearBadgeInTree = (menus: MenuAccessItem[], menuCode: string): MenuAccessItem[] => {
  return menus.map((menu) => {
    if (menu.menu_code === menuCode) {
      return {
        ...menu,
        badge_count: undefined,
        badge_type: undefined,
        has_notification: false,
        notification_type: undefined,
      };
    }
    if (menu.children && menu.children.length > 0) {
      return {
        ...menu,
        children: clearBadgeInTree(menu.children, menuCode),
      };
    }
    return menu;
  });
};

// Helper to clear all badges
const clearAllBadgesInTree = (menus: MenuAccessItem[]): MenuAccessItem[] => {
  return menus.map((menu) => ({
    ...menu,
    badge_count: undefined,
    badge_type: undefined,
    has_notification: false,
    notification_type: undefined,
    children: menu.children ? clearAllBadgesInTree(menu.children) : [],
  }));
};

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
  const { isAuthenticated, token } = useAuth();
  const [menus, setMenus] = useState<MenuAccessItem[]>([]);
  const [flatMenus, setFlatMenus] = useState<MenuAccessItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setMenus([]);
      setFlatMenus([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Try to get user's menu tree first
      let rawData: ApiMenuItem[] = [];
      
      try {
        const response = await menuApi.getMyTree();
        if (response.success && response.data) {
          // API returns camelCase, need to cast
          rawData = response.data as unknown as ApiMenuItem[];
        }
      } catch {
        // Fallback to all menus if my/tree fails
        console.warn('Failed to get user menu tree, falling back to all menus');
        const fallbackResponse = await menuApi.getAll();
        if (fallbackResponse.success && fallbackResponse.data) {
          rawData = fallbackResponse.data as unknown as ApiMenuItem[];
        }
      }

      if (rawData.length > 0) {
        // Convert API response (camelCase) to frontend format (snake_case)
        const data = rawData.map(convertApiMenuItem);
        
        // Convert to MenuAccessItem with default permissions
        const accessItems = data.map(toMenuAccessItem);

        // Debug log
        console.log('Raw API data:', rawData);
        console.log('Converted menu data:', data);
        console.log('Menu count:', data.length);

        // Check if data already has nested children (is a tree)
        const isAlreadyTree = accessItems.some(
          (item) => item.children && Array.isArray(item.children) && item.children.length > 0
        );

        if (isAlreadyTree) {
          console.log('Data is already a tree');
          setMenus(accessItems);
          setFlatMenus(flattenTree(accessItems));
        } else {
          console.log('Building tree from flat data');
          const menuTree = buildMenuTree(accessItems);
          console.log('Built menu tree:', menuTree);
          setMenus(menuTree);
          setFlatMenus(accessItems);
        }
      } else {
        setMenus([]);
        setFlatMenus([]);
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error('Menu fetch error:', error);
      setError(error.message || 'Failed to fetch menus');
      setMenus([]);
      setFlatMenus([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const getMenuByCode = useCallback(
    (code: string): MenuAccessItem | undefined => {
      return flatMenus.find((menu) => menu.menu_code === code);
    },
    [flatMenus]
  );

  const getMenuByPath = useCallback(
    (path: string): MenuAccessItem | undefined => {
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
          return menu.can_view ?? true;
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

  const checkAccess = useCallback(async (menuCode: string) => {
    try {
      const response = await menuApi.checkMyAccess(menuCode);
      if (response.success) {
        return response.data;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Update single menu badge
  const updateMenuBadge = useCallback((menuCode: string, config: Partial<MenuBadgeConfig>) => {
    setMenus((prev) => updateBadgeInTree(prev, menuCode, config));
    setFlatMenus((prev) =>
      prev.map((menu) =>
        menu.menu_code === menuCode
          ? {
              ...menu,
              badge_count: config.count ?? menu.badge_count,
              badge_type: config.type ?? menu.badge_type,
              has_notification: config.has_notification ?? menu.has_notification,
              notification_type: config.notification_type ?? menu.notification_type,
            }
          : menu
      )
    );
  }, []);

  // Update multiple menu badges at once
  const updateMenuBadges = useCallback((configs: MenuBadgeConfig[]) => {
    setMenus((prev) => {
      let updated = prev;
      for (const config of configs) {
        updated = updateBadgeInTree(updated, config.menu_code, config);
      }
      return updated;
    });
    setFlatMenus((prev) =>
      prev.map((menu) => {
        const config = configs.find((c) => c.menu_code === menu.menu_code);
        if (config) {
          return {
            ...menu,
            badge_count: config.count ?? menu.badge_count,
            badge_type: config.type ?? menu.badge_type,
            has_notification: config.has_notification ?? menu.has_notification,
            notification_type: config.notification_type ?? menu.notification_type,
          };
        }
        return menu;
      })
    );
  }, []);

  // Clear single menu badge
  const clearMenuBadge = useCallback((menuCode: string) => {
    setMenus((prev) => clearBadgeInTree(prev, menuCode));
    setFlatMenus((prev) =>
      prev.map((menu) =>
        menu.menu_code === menuCode
          ? {
              ...menu,
              badge_count: undefined,
              badge_type: undefined,
              has_notification: false,
              notification_type: undefined,
            }
          : menu
      )
    );
  }, []);

  // Clear all badges
  const clearAllBadges = useCallback(() => {
    setMenus((prev) => clearAllBadgesInTree(prev));
    setFlatMenus((prev) =>
      prev.map((menu) => ({
        ...menu,
        badge_count: undefined,
        badge_type: undefined,
        has_notification: false,
        notification_type: undefined,
      }))
    );
  }, []);

  const value: MenuContextType = {
    menus,
    flatMenus,
    isLoading,
    error,
    refetch: fetchMenus,
    getMenuByCode,
    getMenuByPath,
    hasAccess,
    checkAccess,
    updateMenuBadge,
    updateMenuBadges,
    clearMenuBadge,
    clearAllBadges,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (context === null) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
}

// =============================================================================
// Custom hook for HIS badge updates (ใช้ร่วมกับ WebSocket หรือ polling)
// =============================================================================
export function useMenuBadgeUpdater() {
  const { updateMenuBadge, updateMenuBadges, clearMenuBadge, clearAllBadges } = useMenuContext();

  // ตัวอย่างการอัปเดต badge สำหรับ OPD queue
  const updateOPDQueue = useCallback(
    (count: number) => {
      updateMenuBadge('OPD', {
        count,
        type: count > 20 ? 'danger' : count > 10 ? 'warning' : 'default',
        has_notification: count > 0,
      });
    },
    [updateMenuBadge]
  );

  // ตัวอย่างการอัปเดต badge สำหรับ IPD
  const updateIPDPatients = useCallback(
    (count: number) => {
      updateMenuBadge('IPD', {
        count,
        type: 'default',
      });
    },
    [updateMenuBadge]
  );

  // ตัวอย่างการแจ้งเตือน ER ด่วน
  const setERAlert = useCallback(
    (hasAlert: boolean) => {
      updateMenuBadge('ER', {
        has_notification: hasAlert,
        notification_type: 'danger',
      });
    },
    [updateMenuBadge]
  );

  // ตัวอย่างการอัปเดตหลายเมนูพร้อมกัน
  const updateAllCounts = useCallback(
    (data: { opd?: number; ipd?: number; pharmacy?: number; er?: boolean }) => {
      const configs: MenuBadgeConfig[] = [];

      if (data.opd !== undefined) {
        configs.push({
          menu_code: 'OPD',
          count: data.opd,
          type: data.opd > 20 ? 'danger' : data.opd > 10 ? 'warning' : 'default',
          has_notification: data.opd > 0,
        });
      }

      if (data.ipd !== undefined) {
        configs.push({
          menu_code: 'IPD',
          count: data.ipd,
          type: 'default',
        });
      }

      if (data.pharmacy !== undefined) {
        configs.push({
          menu_code: 'PHARMACY',
          count: data.pharmacy,
          type: data.pharmacy > 30 ? 'warning' : 'default',
        });
      }

      if (data.er !== undefined) {
        configs.push({
          menu_code: 'ER',
          has_notification: data.er,
          notification_type: 'danger',
        });
      }

      if (configs.length > 0) {
        updateMenuBadges(configs);
      }
    },
    [updateMenuBadges]
  );

  return {
    updateMenuBadge,
    updateMenuBadges,
    clearMenuBadge,
    clearAllBadges,
    // HIS-specific helpers
    updateOPDQueue,
    updateIPDPatients,
    setERAlert,
    updateAllCounts,
  };
}