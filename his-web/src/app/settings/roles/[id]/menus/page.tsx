// =============================================================================
// File: src/app/settings/roles/[id]/menus/page.tsx
// Description: Role Menu Access Management - Matrix table for menu permissions
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Shield,
  Key,
  Menu,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Eye,
  Plus,
  Edit,
  Trash2,
  Download,
  Printer,
  RefreshCw,
  Search,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';

interface MenuAccess {
  menu_id: number;
  menu_code: string;
  menu_name: string;
  menu_name_th: string | null;
  parent_id: number | null;
  icon: string | null;
  can_view: number;
  can_create: number;
  can_edit: number;
  can_delete: number;
  can_export: number;
  can_print: number;
  children?: MenuAccess[];
}

interface Role {
  id: number;
  role_code: string;
  role_name: string;
}

const permissionIcons = {
  can_view: Eye,
  can_create: Plus,
  can_edit: Edit,
  can_delete: Trash2,
  can_export: Download,
  can_print: Printer,
};

const permissionLabels = {
  can_view: 'View',
  can_create: 'Create',
  can_edit: 'Edit',
  can_delete: 'Delete',
  can_export: 'Export',
  can_print: 'Print',
};

export default function RoleMenuAccessPage() {
  const router = useRouter();
  const params = useParams();
  const roleId = Number(params.id);

  const [role, setRole] = useState<Role | null>(null);
  const [menus, setMenus] = useState<MenuAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (roleId) {
      fetchData();
    }
  }, [roleId]);

  const fetchData = async () => {
    setLoading(true);
    
    // Mock role data
    const mockRoles: Record<number, Role> = {
      1: { id: 1, role_code: 'ADMIN', role_name: 'Administrator' },
      2: { id: 2, role_code: 'DOCTOR', role_name: 'Doctor' },
      3: { id: 3, role_code: 'NURSE', role_name: 'Nurse' },
      4: { id: 4, role_code: 'PHARMACIST', role_name: 'Pharmacist' },
      5: { id: 5, role_code: 'CASHIER', role_name: 'Cashier' },
      6: { id: 6, role_code: 'RECEPTION', role_name: 'Receptionist' },
      7: { id: 7, role_code: 'LAB', role_name: 'Lab Technician' },
    };

    // Mock menu data
    const mockMenus: MenuAccess[] = [
      {
        menu_id: 1, menu_code: 'dashboard', menu_name: 'Dashboard', menu_name_th: 'แดชบอร์ด', parent_id: null, icon: 'layout-dashboard',
        can_view: 1, can_create: 0, can_edit: 0, can_delete: 0, can_export: 1, can_print: 1,
      },
      {
        menu_id: 2, menu_code: 'opd', menu_name: 'OPD', menu_name_th: 'ผู้ป่วยนอก', parent_id: null, icon: 'stethoscope',
        can_view: 1, can_create: 1, can_edit: 1, can_delete: 0, can_export: 1, can_print: 1,
        children: [
          { menu_id: 21, menu_code: 'opd-newvisit', menu_name: 'New Visit', menu_name_th: 'ลงทะเบียนใหม่', parent_id: 2, icon: 'user-plus', can_view: 1, can_create: 1, can_edit: 1, can_delete: 0, can_export: 0, can_print: 1 },
          { menu_id: 22, menu_code: 'opd-queue', menu_name: 'Queue', menu_name_th: 'คิวตรวจ', parent_id: 2, icon: 'users', can_view: 1, can_create: 0, can_edit: 1, can_delete: 0, can_export: 1, can_print: 1 },
        ],
      },
      {
        menu_id: 3, menu_code: 'ipd', menu_name: 'IPD', menu_name_th: 'ผู้ป่วยใน', parent_id: null, icon: 'bed',
        can_view: 1, can_create: 1, can_edit: 1, can_delete: 0, can_export: 1, can_print: 1,
      },
      {
        menu_id: 4, menu_code: 'pharmacy', menu_name: 'Pharmacy', menu_name_th: 'ห้องยา', parent_id: null, icon: 'pill',
        can_view: 1, can_create: 1, can_edit: 1, can_delete: 1, can_export: 1, can_print: 1,
      },
      {
        menu_id: 5, menu_code: 'lab', menu_name: 'Laboratory', menu_name_th: 'ห้องปฏิบัติการ', parent_id: null, icon: 'flask-conical',
        can_view: 0, can_create: 0, can_edit: 0, can_delete: 0, can_export: 0, can_print: 0,
      },
      {
        menu_id: 6, menu_code: 'settings', menu_name: 'Settings', menu_name_th: 'ตั้งค่า', parent_id: null, icon: 'settings',
        can_view: 1, can_create: 1, can_edit: 1, can_delete: 1, can_export: 1, can_print: 1,
        children: [
          { menu_id: 61, menu_code: 'settings-roles', menu_name: 'Roles', menu_name_th: 'บทบาท', parent_id: 6, icon: 'shield', can_view: 1, can_create: 1, can_edit: 1, can_delete: 1, can_export: 1, can_print: 0 },
          { menu_id: 62, menu_code: 'settings-users', menu_name: 'Users', menu_name_th: 'ผู้ใช้งาน', parent_id: 6, icon: 'users', can_view: 1, can_create: 1, can_edit: 1, can_delete: 0, can_export: 1, can_print: 0 },
          { menu_id: 63, menu_code: 'settings-menus', menu_name: 'Menus', menu_name_th: 'เมนู', parent_id: 6, icon: 'menu', can_view: 1, can_create: 1, can_edit: 1, can_delete: 1, can_export: 0, can_print: 0 },
        ],
      },
    ];

    try {
      // Fetch role info
      const roleResponse = await fetch(`/api/settings/roles/${roleId}`);
      const roleContentType = roleResponse.headers.get('content-type');
      
      if (roleContentType && roleContentType.includes('application/json')) {
        const roleResult = await roleResponse.json();
        if (roleResult.success && roleResult.data) {
          setRole(roleResult.data);
        } else {
          setRole(mockRoles[roleId] || { id: roleId, role_code: 'UNKNOWN', role_name: 'Unknown Role' });
        }
      } else {
        setRole(mockRoles[roleId] || { id: roleId, role_code: 'UNKNOWN', role_name: 'Unknown Role' });
      }

      // Fetch menu access
      const menuResponse = await fetch(`/api/settings/roles/${roleId}/menus`);
      const menuContentType = menuResponse.headers.get('content-type');
      
      if (menuContentType && menuContentType.includes('application/json')) {
        const menuResult = await menuResponse.json();
        if (menuResult.success && menuResult.data) {
          setMenus(menuResult.data);
          const allIds = getAllMenuIds(menuResult.data);
          setExpandedMenus(new Set(allIds));
        } else {
          setMenus(mockMenus);
          const allIds = getAllMenuIds(mockMenus);
          setExpandedMenus(new Set(allIds));
        }
      } else {
        setMenus(mockMenus);
        const allIds = getAllMenuIds(mockMenus);
        setExpandedMenus(new Set(allIds));
      }
    } catch (error) {
      console.warn('Failed to fetch data, using mock data:', error);
      setRole(mockRoles[roleId] || { id: roleId, role_code: 'UNKNOWN', role_name: 'Unknown Role' });
      setMenus(mockMenus);
      const allIds = getAllMenuIds(mockMenus);
      setExpandedMenus(new Set(allIds));
    } finally {
      setLoading(false);
    }
  };

  const getAllMenuIds = (items: MenuAccess[]): number[] => {
    let ids: number[] = [];
    items.forEach((item) => {
      ids.push(item.menu_id);
      if (item.children) {
        ids = ids.concat(getAllMenuIds(item.children));
      }
    });
    return ids;
  };

  const toggleExpand = (menuId: number) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev);
      if (next.has(menuId)) {
        next.delete(menuId);
      } else {
        next.add(menuId);
      }
      return next;
    });
  };

  const updatePermission = (menuId: number, permission: keyof typeof permissionLabels, value: number) => {
    const updateMenus = (items: MenuAccess[]): MenuAccess[] => {
      return items.map((item) => {
        if (item.menu_id === menuId) {
          return { ...item, [permission]: value };
        }
        if (item.children) {
          return { ...item, children: updateMenus(item.children) };
        }
        return item;
      });
    };
    setMenus(updateMenus(menus));
    setHasChanges(true);
  };

  const toggleAllPermissions = (menuId: number, enable: boolean) => {
    const updateMenus = (items: MenuAccess[]): MenuAccess[] => {
      return items.map((item) => {
        if (item.menu_id === menuId) {
          return {
            ...item,
            can_view: enable ? 1 : 0,
            can_create: enable ? 1 : 0,
            can_edit: enable ? 1 : 0,
            can_delete: enable ? 1 : 0,
            can_export: enable ? 1 : 0,
            can_print: enable ? 1 : 0,
          };
        }
        if (item.children) {
          return { ...item, children: updateMenus(item.children) };
        }
        return item;
      });
    };
    setMenus(updateMenus(menus));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save each menu access
      const flatMenus = flattenMenus(menus);
      for (const menu of flatMenus) {
        await fetch(`/api/settings/roles/${roleId}/menus/${menu.menu_id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            can_view: menu.can_view,
            can_create: menu.can_create,
            can_edit: menu.can_edit,
            can_delete: menu.can_delete,
            can_export: menu.can_export,
            can_print: menu.can_print,
          }),
        });
      }
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setSaving(false);
    }
  };

  const flattenMenus = (items: MenuAccess[]): MenuAccess[] => {
    let result: MenuAccess[] = [];
    items.forEach((item) => {
      result.push(item);
      if (item.children) {
        result = result.concat(flattenMenus(item.children));
      }
    });
    return result;
  };

  const renderMenuRow = (menu: MenuAccess, level: number = 0) => {
    const hasChildren = menu.children && menu.children.length > 0;
    const isExpanded = expandedMenus.has(menu.menu_id);
    const allEnabled = Boolean(menu.can_view && menu.can_create && menu.can_edit && menu.can_delete && menu.can_export && menu.can_print);
    const noneEnabled = Boolean(!menu.can_view && !menu.can_create && !menu.can_edit && !menu.can_delete && !menu.can_export && !menu.can_print);

    return (
      <div key={menu.menu_id}>
        <div className={`flex items-center border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${level > 0 ? 'bg-slate-25 dark:bg-slate-900/50' : ''}`}>
          {/* Menu Name */}
          <div className="flex-1 flex items-center gap-2 px-4 py-3" style={{ paddingLeft: `${16 + level * 24}px` }}>
            {hasChildren ? (
              <button
                onClick={() => toggleExpand(menu.menu_id)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded transition-colors"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <span className="w-6" />
            )}
            <span className={`text-sm ${noneEnabled ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
              {menu.menu_name_th || menu.menu_name}
            </span>
            <span className="text-xs text-slate-400 font-mono">({menu.menu_code})</span>
          </div>

          {/* Permission Checkboxes */}
          {(Object.keys(permissionLabels) as (keyof typeof permissionLabels)[]).map((perm) => {
            const Icon = permissionIcons[perm];
            const isEnabled = menu[perm] === 1;
            return (
              <div key={perm} className="w-20 flex justify-center py-3">
                <button
                  onClick={() => updatePermission(menu.menu_id, perm, isEnabled ? 0 : 1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isEnabled
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isEnabled ? <Check size={16} /> : <X size={14} />}
                </button>
              </div>
            );
          })}

          {/* Quick Actions */}
          <div className="w-24 flex justify-center gap-1 py-3 pr-4">
            <button
              onClick={() => toggleAllPermissions(menu.menu_id, true)}
              disabled={allEnabled}
              className="px-2 py-1 text-xs font-medium text-success-600 dark:text-success-400 hover:bg-success-50 dark:hover:bg-success-500/10 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              All
            </button>
            <button
              onClick={() => toggleAllPermissions(menu.menu_id, false)}
              disabled={noneEnabled}
              className="px-2 py-1 text-xs font-medium text-critical-600 dark:text-critical-400 hover:bg-critical-50 dark:hover:bg-critical-500/10 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              None
            </button>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && menu.children!.map((child) => renderMenuRow(child, level + 1))}
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-500">Loading menu access...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/settings/roles')}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Menu Access</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                จัดการสิทธิ์เมนูสำหรับ: <span className="font-medium text-primary-500">{role?.role_name}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="px-4 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-1.5">
          <div className="flex gap-1">
            <button
              onClick={() => router.push(`/settings/roles/${roleId}`)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors"
            >
              <Shield size={16} />
              Basic Info
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium">
              <Menu size={16} />
              Menu Access
            </button>
            <button
              onClick={() => router.push(`/settings/roles/${roleId}/permissions`)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors"
            >
              <Key size={16} />
              Permissions
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search menus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Header */}
          <div className="flex items-center border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex-1 px-4 py-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Menu</span>
            </div>
            {(Object.keys(permissionLabels) as (keyof typeof permissionLabels)[]).map((perm) => {
              const Icon = permissionIcons[perm];
              return (
                <div key={perm} className="w-20 flex flex-col items-center py-3">
                  <Icon size={16} className="text-slate-500 mb-1" />
                  <span className="text-xs font-medium text-slate-500">{permissionLabels[perm]}</span>
                </div>
              );
            })}
            <div className="w-24 text-center py-3 pr-4">
              <span className="text-xs font-medium text-slate-500">Quick</span>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[600px] overflow-y-auto">
            {menus.map((menu) => renderMenuRow(menu))}
          </div>
        </div>

        {/* Unsaved Changes Warning */}
        {hasChanges && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-amber-500 text-white rounded-xl shadow-lg flex items-center gap-3">
            <span className="text-sm font-medium">You have unsaved changes</span>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              Save Now
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}