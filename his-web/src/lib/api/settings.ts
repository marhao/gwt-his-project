// src/lib/api/settings.ts

import { api } from './client';
import type { ApiResponse } from './types';
import type {
  MenuItem,
  Role,
  RoleMenuAccess,
  RoleCreateData,
  RoleUpdateData,
  Group,
  GroupCreateData,
  GroupUpdateData,
  Permission,
  PermissionCreateData,
  PermissionUpdateData,
  UserMenuAccessCheck,
  UserPermissionCheck,
} from './types/settings';

// ============================================
// Helper: Transform menu from API response
// ============================================

const transformMenuFromApi = (menu: Record<string, unknown>): MenuItem => ({
  id: menu.id as number,
  menu_code: (menu.menuCode || menu.menu_code) as string,
  menu_name: (menu.menuName || menu.menu_name) as string,
  menu_name_th: (menu.menuNameTh || menu.menu_name_th) as string | null,
  parent_id: (menu.parentId ?? menu.parent_id ?? null) as number | null,
  icon: (menu.icon || null) as string | null,
  route_path: (menu.routePath || menu.route_path) as string | null,
  sort_order: (menu.sortOrder ?? menu.sort_order ?? 0) as number,
  is_active: Boolean(menu.isActive ?? menu.is_active),
});

// ============================================
// Menu API
// ============================================

export const menuApi = {
  // =========================================
  // Public Menu Operations
  // =========================================

  getAll: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>('/settings/menus');
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  getActive: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>('/settings/menus/active');
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  getTree: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>('/settings/menus/tree');
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  getFullTree: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>('/settings/menus/tree/full');
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  getById: async (id: number): Promise<ApiResponse<MenuItem>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>>>(`/settings/menus/${id}`);
    return {
      ...response,
      data: transformMenuFromApi(response.data),
    };
  },

  getByCode: async (code: string): Promise<ApiResponse<MenuItem>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>>>(`/settings/menus/code/${code}`);
    return {
      ...response,
      data: transformMenuFromApi(response.data),
    };
  },

  getByParentId: async (parentId: number | null): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>(
      `/settings/menus/parent/${parentId === null ? 'null' : parentId}`
    );
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  // =========================================
  // CRUD Operations
  // =========================================

  create: (data: {
    menu_code: string;
    menu_name: string;
    menu_name_th?: string;
    parent_id?: number | null;
    icon?: string;
    route_path?: string;
    sort_order?: number;
    is_active?: number;
  }) => api.post<ApiResponse<MenuItem>>('/settings/menus', data),

  update: (id: number, data: Partial<MenuItem>) =>
    api.put<ApiResponse<MenuItem>>(`/settings/menus/${id}`, data),

  delete: (id: number) => api.delete<ApiResponse<void>>(`/settings/menus/${id}`),

  // =========================================
  // Bulk Operations
  // =========================================

  reorder: (items: { id: number; sort_order: number }[]) =>
    api.post<ApiResponse<void>>('/settings/menus/reorder', { items }),

  move: (id: number, parentId: number | null) =>
    api.put<ApiResponse<MenuItem>>(`/settings/menus/${id}/move`, { parent_id: parentId }),

  // =========================================
  // User Menu Access
  // =========================================

  getUserAccess: (userId: number) =>
    api.get<ApiResponse<MenuItem[]>>(`/settings/menus/user/${userId}/access`),

  getUserTree: (userId: number) =>
    api.get<ApiResponse<MenuItem[]>>(`/settings/menus/user/${userId}/tree`),

  checkUserAccess: (userId: number, menuCode: string) =>
    api.get<ApiResponse<UserMenuAccessCheck>>(`/settings/menus/user/${userId}/check/${menuCode}`),

  // =========================================
  // Current User Menu Access (my)
  // =========================================

  getMyAccess: () => api.get<ApiResponse<MenuItem[]>>('/settings/menus/my/access'),

  getMyTree: () => api.get<ApiResponse<MenuItem[]>>('/settings/menus/my/tree'),

  checkMyAccess: (menuCode: string) =>
    api.get<ApiResponse<UserMenuAccessCheck>>(`/settings/menus/my/check/${menuCode}`),

  // Alias for backward compatibility
  getUserMenus: () => api.get<ApiResponse<MenuItem[]>>('/settings/menus/my/tree'),
};

// ============================================
// Role API
// ============================================

export const roleApi = {
  getAll: () => api.get<ApiResponse<Role[]>>('/settings/roles'),

  getActive: () => api.get<ApiResponse<Role[]>>('/settings/roles/active'),

  getById: (id: number) => api.get<ApiResponse<Role>>(`/settings/roles/${id}`),

  getWithDetails: (id: number) => api.get<ApiResponse<Role>>(`/settings/roles/${id}/details`),

  getMenuAccess: (id: number) => api.get<ApiResponse<RoleMenuAccess[]>>(`/settings/roles/${id}/menus`),

  getPermissions: (id: number) => api.get<ApiResponse<Permission[]>>(`/settings/roles/${id}/permissions`),

  create: (data: RoleCreateData) => api.post<ApiResponse<Role>>('/settings/roles', data),

  update: (id: number, data: RoleUpdateData) => api.put<ApiResponse<Role>>(`/settings/roles/${id}`, data),

  delete: (id: number) => api.delete<ApiResponse<void>>(`/settings/roles/${id}`),

  setMenuAccess: (
    roleId: number,
    menuId: number,
    access: {
      can_view?: number;
      can_create?: number;
      can_edit?: number;
      can_delete?: number;
      can_export?: number;
      can_print?: number;
    }
  ) => api.post<ApiResponse<void>>(`/settings/roles/${roleId}/menus/${menuId}`, access),

  removeMenuAccess: (roleId: number, menuId: number) =>
    api.delete<ApiResponse<void>>(`/settings/roles/${roleId}/menus/${menuId}`),

  addPermission: (roleId: number, permissionId: number) =>
    api.post<ApiResponse<void>>(`/settings/roles/${roleId}/permissions/${permissionId}`),

  removePermission: (roleId: number, permissionId: number) =>
    api.delete<ApiResponse<void>>(`/settings/roles/${roleId}/permissions/${permissionId}`),
};

// ============================================
// Group API
// ============================================

export const groupApi = {
  getAll: () => api.get<ApiResponse<Group[]>>('/settings/groups'),

  getActive: () => api.get<ApiResponse<Group[]>>('/settings/groups/active'),

  getTree: () => api.get<ApiResponse<Group[]>>('/settings/groups/tree'),

  getById: (id: number) => api.get<ApiResponse<Group>>(`/settings/groups/${id}`),

  getWithRoles: (id: number) => api.get<ApiResponse<Group>>(`/settings/groups/${id}/roles`),

  create: (data: GroupCreateData) => api.post<ApiResponse<Group>>('/settings/groups', data),

  update: (id: number, data: GroupUpdateData) => api.put<ApiResponse<Group>>(`/settings/groups/${id}`, data),

  delete: (id: number) => api.delete<ApiResponse<void>>(`/settings/groups/${id}`),

  addRole: (groupId: number, roleId: number) =>
    api.post<ApiResponse<void>>(`/settings/groups/${groupId}/roles/${roleId}`),

  removeRole: (groupId: number, roleId: number) =>
    api.delete<ApiResponse<void>>(`/settings/groups/${groupId}/roles/${roleId}`),
};

// ============================================
// Permission API
// ============================================

export const permissionApi = {
  getAll: () => api.get<ApiResponse<Permission[]>>('/settings/permissions'),

  getById: (id: number) => api.get<ApiResponse<Permission>>(`/settings/permissions/${id}`),

  create: (data: PermissionCreateData) => api.post<ApiResponse<Permission>>('/settings/permissions', data),

  update: (id: number, data: PermissionUpdateData) =>
    api.put<ApiResponse<Permission>>(`/settings/permissions/${id}`, data),

  delete: (id: number) => api.delete<ApiResponse<void>>(`/settings/permissions/${id}`),
};

// ============================================
// User Settings API
// ============================================

export const userSettingsApi = {
  getGroups: (userId: number) => api.get<ApiResponse<Group[]>>(`/settings/users/${userId}/groups`),

  getRoles: (userId: number) => api.get<ApiResponse<Role[]>>(`/settings/users/${userId}/roles`),

  getEffectiveRoles: (userId: number) => api.get<ApiResponse<Role[]>>(`/settings/users/${userId}/effective-roles`),

  getMenuAccess: (userId: number) => api.get<ApiResponse<MenuItem[]>>(`/settings/users/${userId}/menu-access`),

  getPermissions: (userId: number) => api.get<ApiResponse<Permission[]>>(`/settings/users/${userId}/permissions`),

  checkMenuAccess: (userId: number, menuCode: string) =>
    api.get<ApiResponse<RoleMenuAccess>>(`/settings/users/${userId}/check-menu/${menuCode}`),

  checkPermission: (userId: number, permissionCode: string) =>
    api.get<ApiResponse<UserPermissionCheck>>(`/settings/users/${userId}/check-permission/${permissionCode}`),

  addGroup: (userId: number, groupId: number, isPrimary?: number) =>
    api.post<ApiResponse<void>>(`/settings/users/${userId}/groups/${groupId}`, { is_primary: isPrimary }),

  removeGroup: (userId: number, groupId: number) =>
    api.delete<ApiResponse<void>>(`/settings/users/${userId}/groups/${groupId}`),

  setPrimaryGroup: (userId: number, groupId: number) =>
    api.put<ApiResponse<void>>(`/settings/users/${userId}/groups/${groupId}/primary`),

  addRole: (userId: number, roleId: number) =>
    api.post<ApiResponse<void>>(`/settings/users/${userId}/roles/${roleId}`),

  removeRole: (userId: number, roleId: number) =>
    api.delete<ApiResponse<void>>(`/settings/users/${userId}/roles/${roleId}`),
};

// ============================================
// Current User (My) Settings API
// ============================================

export const mySettingsApi = {
  getEffectiveRoles: () => api.get<ApiResponse<Role[]>>('/settings/my/effective-roles'),

  getMenuAccess: () => api.get<ApiResponse<MenuItem[]>>('/settings/my/menu-access'),

  getPermissions: () => api.get<ApiResponse<Permission[]>>('/settings/my/permissions'),

  checkMenuAccess: (menuCode: string) =>
    api.get<ApiResponse<RoleMenuAccess>>(`/settings/my/check-menu/${menuCode}`),

  checkPermission: (permissionCode: string) =>
    api.get<ApiResponse<UserPermissionCheck>>(`/settings/my/check-permission/${permissionCode}`),
};

// ============================================
// Combined Settings API (backward compatible)
// ============================================

export const settingsApi = {
  roles: roleApi,
  groups: groupApi,
  menus: {
    getAll: () => menuApi.getAll(),
    getTree: () => menuApi.getTree(),
    getById: (id: number) => menuApi.getById(id),
    create: menuApi.create,
    update: menuApi.update,
    delete: menuApi.delete,
  },
  permissions: permissionApi,
  users: userSettingsApi,
  my: mySettingsApi,
};

export default settingsApi;