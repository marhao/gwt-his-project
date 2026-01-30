// ============================================
// Navigation Types
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
  // Access permissions
  can_view?: boolean;
  can_create?: boolean;
  can_edit?: boolean;
  can_delete?: boolean;
  can_export?: boolean;
  can_print?: boolean;
}

export interface MenuGroup {
  id: string;
  label?: string;
  items: MenuItem[];
}

// ============================================
// Role & Permission Types
// ============================================
export interface Role {
  id: number;
  role_code: string;
  role_name: string;
  description: string | null;
  is_active: boolean;
}

export interface Permission {
  id: number;
  permission_code: string;
  permission_name: string;
  description: string | null;
}

export interface Group {
  id: number;
  group_code: string;
  group_name: string;
  description: string | null;
  parent_id: number | null;
  is_active: boolean;
}

export interface RoleMenuAccess {
  role_id: number;
  menu_id: number;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_export: boolean;
  can_print: boolean;
}

// ============================================
// Auth Types
// ============================================
export interface User {
  officerId: number;
  username: string;
  name: string;
  role: string;
  department: string | null;
  permissions: string[];
  groups?: Group[];
  roles?: Role[];
}

export interface LoginInfo {
  clientIP: string;
  serverIP: string;
  serverMAC: string;
  serverHostname: string;
  loginTime: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    expiresIn: number;
    user: User;
    loginInfo: LoginInfo;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ============================================
// Layout Types
// ============================================
export type LayoutMode = 'sidebar' | 'horizontal';

export interface LayoutState {
  mode: LayoutMode;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
}

// ============================================
// Theme Types
// ============================================
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
}

// ============================================
// API Response Types
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Dashboard Types
// ============================================
export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'critical';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  type: string;
  doctor: string;
  status: 'scheduled' | 'waiting' | 'in-progress' | 'completed' | 'cancelled';
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  onClick?: () => void;
}