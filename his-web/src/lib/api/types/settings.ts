// src/lib/api/types/settings.ts

// ============================================
// Menu Types
// ============================================

export interface MenuItem {
    id: number;
    menu_code: string;
    menu_name: string;
    menu_name_th: string | null;
    parent_id: number | null;
    icon: string | null;
    route_path: string | null;
    sort_order: number;
    is_active: boolean;
    children?: MenuItem[];
  }
  
  export interface MenuAccess {
    can_view: boolean;
    can_create: boolean;
    can_edit: boolean;
    can_delete: boolean;
    can_export: boolean;
    can_print: boolean;
  }
  
  // ============================================
  // Role Types
  // ============================================
  
  export interface Role {
    id: number;
    role_code: string;
    role_name: string;
    description: string | null;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface RoleMenuAccess {
    role_id: number;
    menu_id: number;
    can_view: number;
    can_create: number;
    can_edit: number;
    can_delete: number;
    can_export: number;
    can_print: number;
  }
  
  export interface RoleCreateData {
    role_code: string;
    role_name: string;
    description?: string;
    is_active?: number;
  }
  
  export interface RoleUpdateData {
    role_code?: string;
    role_name?: string;
    description?: string;
    is_active?: number;
  }
  
  // ============================================
  // Group Types
  // ============================================
  
  export interface Group {
    id: number;
    group_code: string;
    group_name: string;
    description: string | null;
    parent_id: number | null;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
    children?: Group[];
  }
  
  export interface GroupCreateData {
    group_code: string;
    group_name: string;
    description?: string;
    parent_id?: number;
    is_active?: number;
  }
  
  export interface GroupUpdateData {
    group_code?: string;
    group_name?: string;
    description?: string;
    parent_id?: number | null;
    is_active?: number;
  }
  
  // ============================================
  // Permission Types
  // ============================================
  
  export interface Permission {
    id: number;
    permission_code: string;
    permission_name: string;
    description: string | null;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface PermissionCreateData {
    permission_code: string;
    permission_name: string;
    description?: string;
  }
  
  export interface PermissionUpdateData {
    permission_code?: string;
    permission_name?: string;
    description?: string;
  }
  
  // ============================================
  // User Settings Types
  // ============================================
  
  export interface UserMenuAccessCheck {
    has_access: boolean;
    can_view: boolean;
    can_create: boolean;
    can_edit: boolean;
    can_delete: boolean;
    can_export: boolean;
    can_print: boolean;
  }
  
  export interface UserPermissionCheck {
    permission_code: string;
    has_permission: boolean;
  }