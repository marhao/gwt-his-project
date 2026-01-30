// =============================================================================
// File: src/app/settings/roles/page.tsx
// Description: Roles Management - ตัวอย่างการใช้ ContextMenu + ConfirmDialog
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  ShieldX,
  Users,
  MoreVertical,
  RefreshCw,
  Key,
  Menu,
  Copy,
  StopCircle,
} from 'lucide-react';

import { AdminLayout } from '@/components/layout';
import { settingsApi } from '@/lib/api';

// Import reusable components
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuDivider,
  useContextMenu,
} from '@/components/ui/context-menu';

import {
  ConfirmDialog,
  useConfirmDialog,
} from '@/components/ui/confirm-dialog';

interface Role {
  id: number;
  role_code: string;
  role_name: string;
  description: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
  _count?: {
    users: number;
    menus: number;
    permissions: number;
  };
}

export default function RolesPage() {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  // Context Menu
  const contextMenu = useContextMenu<Role>();

  // Confirm Dialogs
  const deleteDialog = useConfirmDialog<Role>({
    onConfirm: async (role) => {
      await handleDelete(role);
    },
  });

  const deactivateDialog = useConfirmDialog<Role>({
    onConfirm: async (role) => {
      await handleToggleActive(role);
    },
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);

    const mockRoles: Role[] = [
      { id: 1, role_code: 'ADMIN', role_name: 'Administrator', description: 'Full system access', is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 5, menus: 25, permissions: 50 } },
      { id: 2, role_code: 'DOCTOR', role_name: 'Doctor', description: 'Medical staff access', is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 45, menus: 15, permissions: 30 } },
      { id: 3, role_code: 'NURSE', role_name: 'Nurse', description: 'Nursing staff access', is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 120, menus: 12, permissions: 25 } },
      { id: 4, role_code: 'PHARMACIST', role_name: 'Pharmacist', description: 'Pharmacy access', is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 15, menus: 8, permissions: 20 } },
      { id: 5, role_code: 'CASHIER', role_name: 'Cashier', description: 'Finance and billing access', is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 20, menus: 6, permissions: 15 } },
      { id: 6, role_code: 'RECEPTION', role_name: 'Receptionist', description: 'Front desk access', is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 30, menus: 5, permissions: 12 } },
      { id: 7, role_code: 'LAB', role_name: 'Lab Technician', description: 'Laboratory access', is_active: 0, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 0, menus: 4, permissions: 10 } },
    ];

    try {
      const result: any = await settingsApi.roles.getAll();
      if (result.success && result.data) {
        setRoles(result.data);
      } else {
        setRoles(mockRoles);
      }
    } catch (error) {
      setRoles(mockRoles);
    } finally {
      setLoading(false);
    }
  };

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.role_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActive === 'all' ||
      (filterActive === 'active' && role.is_active === 1) ||
      (filterActive === 'inactive' && role.is_active === 0);

    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (role: Role) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await fetch(`/api/settings/roles/${role.id}`, { method: 'DELETE' });
    setRoles((prev) => prev.filter((r) => r.id !== role.id));
  };

  const handleToggleActive = async (role: Role) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newStatus = role.is_active === 1 ? 0 : 1;
    await fetch(`/api/settings/roles/${role.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: newStatus }),
    });
    setRoles((prev) =>
      prev.map((r) => (r.id === role.id ? { ...r, is_active: newStatus } : r))
    );
  };

  const handleDuplicate = (role: Role) => {
    console.log('Duplicate role:', role);
    contextMenu.close();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Role Management
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              จัดการบทบาทและสิทธิ์การเข้าถึง • {roles.length} roles
            </p>
          </div>
          <button
            onClick={() => router.push('/settings/roles/add')}
            className="px-4 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Role
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                <Shield size={20} className="text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{roles.length}</p>
                <p className="text-xs text-slate-500">Total Roles</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
                <ShieldCheck size={20} className="text-success-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {roles.filter((r) => r.is_active === 1).length}
                </p>
                <p className="text-xs text-slate-500">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                <Users size={20} className="text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {roles.reduce((sum, r) => sum + (r._count?.users || 0), 0)}
                </p>
                <p className="text-xs text-slate-500">Total Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
                <Key size={20} className="text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {roles.reduce((sum, r) => sum + (r._count?.permissions || 0), 0)}
                </p>
                <p className="text-xs text-slate-500">Permissions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              {['all', 'active', 'inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterActive(status as 'all' | 'active' | 'inactive')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                    filterActive === status
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button
              onClick={fetchRoles}
              disabled={loading}
              className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Roles Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-500">Loading roles...</span>
            </div>
          </div>
        ) : filteredRoles.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <Shield size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-500 mb-4">No roles found</p>
            <button
              onClick={() => router.push('/settings/roles/add')}
              className="px-4 py-2 text-sm font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors"
            >
              Create your first role
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                  role.is_active === 1
                    ? 'border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-500'
                    : 'border-slate-200 dark:border-slate-700 opacity-60'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        role.is_active === 1
                          ? 'bg-primary-50 dark:bg-primary-500/10'
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}>
                        {role.is_active === 1 ? (
                          <ShieldCheck size={24} className="text-primary-500" />
                        ) : (
                          <ShieldX size={24} className="text-slate-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {role.role_name}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono">{role.role_code}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => contextMenu.open(e, role)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {role.description || 'No description'}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Users size={14} />
                      <span>{role._count?.users || 0} users</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Menu size={14} />
                      <span>{role._count?.menus || 0} menus</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Key size={14} />
                      <span>{role._count?.permissions || 0} permissions</span>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                    role.is_active === 1
                      ? 'bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {role.is_active === 1 ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => router.push(`/settings/roles/${role.id}`)}
                      className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
                      title="Edit Role"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => router.push(`/settings/roles/${role.id}/permissions`)}
                      className="p-2 text-slate-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors"
                      title="Manage Permissions"
                    >
                      <Key size={16} />
                    </button>
                    <button
                      onClick={() => router.push(`/settings/roles/${role.id}/menus`)}
                      className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors"
                      title="Manage Menu Access"
                    >
                      <Menu size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========== Context Menu ========== */}
      <ContextMenu
        open={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={contextMenu.close}
      >
        <ContextMenuItem
          icon={Edit}
          onClick={() => {
            router.push(`/settings/roles/${contextMenu.data?.id}`);
            contextMenu.close();
          }}
        >
          Edit Role
        </ContextMenuItem>
        <ContextMenuItem
          icon={Key}
          onClick={() => {
            router.push(`/settings/roles/${contextMenu.data?.id}/permissions`);
            contextMenu.close();
          }}
        >
          Manage Permissions
        </ContextMenuItem>
        <ContextMenuItem
          icon={Menu}
          onClick={() => {
            router.push(`/settings/roles/${contextMenu.data?.id}/menus`);
            contextMenu.close();
          }}
        >
          Menu Access
        </ContextMenuItem>
        <ContextMenuItem
          icon={Copy}
          onClick={() => contextMenu.data && handleDuplicate(contextMenu.data)}
        >
          Duplicate
        </ContextMenuItem>
        <ContextMenuDivider />

        {/* Deactivate - แสดงเฉพาะ role ที่ active */}
        {contextMenu.data?.is_active === 1 && (
          <ContextMenuItem
            icon={StopCircle}
            variant="warning"
            onClick={() => {
              if (contextMenu.data) {
                deactivateDialog.open(contextMenu.data);
                contextMenu.close();
              }
            }}
          >
            Deactivate
          </ContextMenuItem>
        )}

        {/* Activate - แสดงเฉพาะ role ที่ inactive */}
        {contextMenu.data?.is_active === 0 && (
          <ContextMenuItem
            icon={ShieldCheck}
            variant="success"
            onClick={() => {
              if (contextMenu.data) {
                handleToggleActive(contextMenu.data);
                contextMenu.close();
              }
            }}
          >
            Activate
          </ContextMenuItem>
        )}

        {/* Delete */}
        <ContextMenuItem
          icon={Trash2}
          variant="danger"
          onClick={() => {
            if (contextMenu.data) {
              deleteDialog.open(contextMenu.data);
              contextMenu.close();
            }
          }}
        >
          Delete
        </ContextMenuItem>
      </ContextMenu>

      {/* ========== Delete Confirm Dialog ========== */}
      <ConfirmDialog
        {...deleteDialog.dialogProps}
        variant="danger"
        title="ลบ Role"
        message={
          <>
            คุณต้องการลบ <strong>{deleteDialog.data?.role_name}</strong> ใช่หรือไม่?
            {(deleteDialog.data?._count?.users || 0) > 0 && (
              <span className="block text-red-500 mt-2 text-sm">
                ⚠️ มีผู้ใช้ {deleteDialog.data?._count?.users} คนที่ใช้ role นี้อยู่
              </span>
            )}
          </>
        }
        confirmText="ลบ Role"
      />

      {/* ========== Deactivate Confirm Dialog ========== */}
      <ConfirmDialog
        {...deactivateDialog.dialogProps}
        variant="warning"
        icon={StopCircle}
        title="ปิดใช้งาน Role"
        message={
          <>
            คุณต้องการปิดใช้งาน <strong>{deactivateDialog.data?.role_name}</strong> ใช่หรือไม่?
            {(deactivateDialog.data?._count?.users || 0) > 0 && (
              <span className="block text-amber-600 mt-2 text-sm">
                ⚠️ ผู้ใช้ {deactivateDialog.data?._count?.users} คนจะไม่สามารถใช้งานสิทธิ์นี้ได้
              </span>
            )}
          </>
        }
        confirmText="ปิดใช้งาน"
      />
    </AdminLayout>
  );
}