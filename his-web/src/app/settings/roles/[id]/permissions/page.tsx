// =============================================================================
// File: src/app/settings/roles/[id]/permissions/page.tsx
// Description: Role Permissions Management
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Shield, Key, Menu, Check, RefreshCw, Search } from 'lucide-react';
import { AdminLayout } from '@/components/layout';

interface Permission {
  id: number;
  permission_code: string;
  permission_name: string;
  description: string | null;
  module: string;
  is_assigned: boolean;
}

interface Role {
  id: number;
  role_code: string;
  role_name: string;
}

const moduleColors: Record<string, { bg: string; text: string }> = {
  system: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400' },
  opd: { bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-600 dark:text-primary-400' },
  ipd: { bg: 'bg-purple-50 dark:bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400' },
  pharmacy: { bg: 'bg-success-50 dark:bg-success-500/10', text: 'text-success-600 dark:text-success-400' },
  lab: { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
  billing: { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
  reports: { bg: 'bg-pink-50 dark:bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400' },
};

export default function RolePermissionsPage() {
  const router = useRouter();
  const params = useParams();
  const roleId = Number(params.id);

  const [role, setRole] = useState<Role | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState<string>('all');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (roleId) fetchData();
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

    // Mock permissions data
    const mockPermissions: Permission[] = [
      { id: 1, permission_code: 'SYSTEM_ADMIN', permission_name: 'System Administrator', description: 'Full system access', module: 'system', is_assigned: true },
      { id: 2, permission_code: 'USER_MANAGE', permission_name: 'User Management', description: 'Manage users', module: 'system', is_assigned: true },
      { id: 3, permission_code: 'OPD_REGISTER', permission_name: 'OPD Registration', description: 'Register patients', module: 'opd', is_assigned: true },
      { id: 4, permission_code: 'OPD_DOCTOR', permission_name: 'OPD Doctor', description: 'Doctor access', module: 'opd', is_assigned: false },
      { id: 5, permission_code: 'IPD_ADMIT', permission_name: 'IPD Admission', description: 'Admit patients', module: 'ipd', is_assigned: true },
      { id: 6, permission_code: 'PHARMACY_DISPENSE', permission_name: 'Pharmacy Dispense', description: 'Dispense meds', module: 'pharmacy', is_assigned: true },
      { id: 7, permission_code: 'LAB_ORDER', permission_name: 'Lab Order', description: 'Order lab tests', module: 'lab', is_assigned: false },
      { id: 8, permission_code: 'BILLING_CREATE', permission_name: 'Create Bills', description: 'Create bills', module: 'billing', is_assigned: true },
    ];

    try {
      // Fetch role
      const roleRes = await fetch(`/api/settings/roles/${roleId}`);
      const roleContentType = roleRes.headers.get('content-type');
      
      if (roleContentType && roleContentType.includes('application/json')) {
        const roleData = await roleRes.json();
        if (roleData.success && roleData.data) {
          setRole(roleData.data);
        } else {
          setRole(mockRoles[roleId] || { id: roleId, role_code: 'UNKNOWN', role_name: 'Unknown Role' });
        }
      } else {
        setRole(mockRoles[roleId] || { id: roleId, role_code: 'UNKNOWN', role_name: 'Unknown Role' });
      }

      // Fetch permissions
      const permRes = await fetch(`/api/settings/roles/${roleId}/permissions`);
      const permContentType = permRes.headers.get('content-type');
      
      if (permContentType && permContentType.includes('application/json')) {
        const permData = await permRes.json();
        if (permData.success && permData.data) {
          setPermissions(permData.data);
        } else {
          setPermissions(mockPermissions);
        }
      } else {
        setPermissions(mockPermissions);
      }
    } catch (error) {
      console.warn('Failed to fetch data, using mock data:', error);
      setRole(mockRoles[roleId] || { id: roleId, role_code: 'UNKNOWN', role_name: 'Unknown Role' });
      setPermissions(mockPermissions);
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = (id: number) => {
    setPermissions((prev) => prev.map((p) => (p.id === id ? { ...p, is_assigned: !p.is_assigned } : p)));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const perm of permissions) {
        const method = perm.is_assigned ? 'POST' : 'DELETE';
        await fetch(`/api/settings/roles/${roleId}/permissions/${perm.id}`, { method });
      }
      setHasChanges(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const modules = Array.from(new Set(permissions.map((p) => p.module)));

  const filtered = permissions.filter((p) => {
    const matchSearch = p.permission_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.permission_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchModule = filterModule === 'all' || p.module === filterModule;
    return matchSearch && matchModule;
  });

  const grouped = filtered.reduce((acc, p) => {
    if (!acc[p.module]) acc[p.module] = [];
    acc[p.module].push(p);
    return acc;
  }, {} as Record<string, Permission[]>);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/settings/roles')} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Permissions</h1>
              <p className="text-sm text-slate-500 mt-1">Role: <span className="text-primary-500 font-medium">{role?.role_name}</span></p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="p-2.5 text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
              <RefreshCw size={18} />
            </button>
            <button onClick={handleSave} disabled={saving || !hasChanges} className="px-4 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-600 disabled:opacity-50 flex items-center gap-2">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
              Save
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-1.5">
          <div className="flex gap-1">
            <button onClick={() => router.push(`/settings/roles/${roleId}`)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-medium">
              <Shield size={16} /> Basic Info
            </button>
            <button onClick={() => router.push(`/settings/roles/${roleId}/menus`)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-medium">
              <Menu size={16} /> Menu Access
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium">
              <Key size={16} /> Permissions
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{permissions.length}</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p className="text-2xl font-bold text-success-500">{permissions.filter((p) => p.is_assigned).length}</p>
            <p className="text-xs text-slate-500">Assigned</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p className="text-2xl font-bold text-slate-400">{permissions.filter((p) => !p.is_assigned).length}</p>
            <p className="text-xs text-slate-500">Unassigned</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
            </div>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 overflow-x-auto">
              <button onClick={() => setFilterModule('all')} className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${filterModule === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>All</button>
              {modules.map((m) => (
                <button key={m} onClick={() => setFilterModule(m)} className={`px-3 py-2 text-sm font-medium rounded-lg capitalize whitespace-nowrap ${filterModule === m ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>{m}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions by Module */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([module, perms]) => {
            const colors = moduleColors[module] || moduleColors.system;
            return (
              <div key={module} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className={`px-4 py-3 ${colors.bg} border-b border-slate-200 dark:border-slate-700`}>
                  <h3 className={`font-semibold capitalize ${colors.text}`}>{module}</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {perms.map((perm) => (
                    <div key={perm.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{perm.permission_name}</p>
                        <p className="text-xs text-slate-500">{perm.description}</p>
                        <p className="text-xs text-slate-400 font-mono mt-1">{perm.permission_code}</p>
                      </div>
                      <button
                        onClick={() => togglePermission(perm.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          perm.is_assigned
                            ? 'bg-success-500 text-white shadow-lg shadow-success-500/25'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Check size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Unsaved Warning */}
        {hasChanges && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-amber-500 text-white rounded-xl shadow-lg flex items-center gap-3 z-50">
            <span className="text-sm font-medium">Unsaved changes</span>
            <button onClick={handleSave} className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium">Save</button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}