// =============================================================================
// File: src/app/settings/roles/[id]/page.tsx
// Description: Edit Role - Basic Information
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Shield, Trash2, Key, Menu } from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import { settingsApi } from '@/lib/api';

interface Role {
  id: number;
  role_code: string;
  role_name: string;
  description: string | null;
  is_active: number;
}

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const roleId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState<Role>({
    id: 0,
    role_code: '',
    role_name: '',
    description: '',
    is_active: 1,
  });

  useEffect(() => {
    if (roleId) {
      fetchRole();
    }
  }, [roleId]);

  const fetchRole = async () => {
    setLoading(true);
    
    // Mock data for development
    const mockRoles: Record<number, Role> = {
      1: { id: 1, role_code: 'ADMIN', role_name: 'Administrator', description: 'Full system access', is_active: 1 },
      2: { id: 2, role_code: 'DOCTOR', role_name: 'Doctor', description: 'Medical staff access', is_active: 1 },
      3: { id: 3, role_code: 'NURSE', role_name: 'Nurse', description: 'Nursing staff access', is_active: 1 },
      4: { id: 4, role_code: 'PHARMACIST', role_name: 'Pharmacist', description: 'Pharmacy access', is_active: 1 },
      5: { id: 5, role_code: 'CASHIER', role_name: 'Cashier', description: 'Finance and billing access', is_active: 1 },
      6: { id: 6, role_code: 'RECEPTION', role_name: 'Receptionist', description: 'Front desk access', is_active: 1 },
      7: { id: 7, role_code: 'LAB', role_name: 'Lab Technician', description: 'Laboratory access', is_active: 0 },
    };

    try {
      const result: any = await settingsApi.roles.getById(roleId);
      
      if (result.success && result.data) {
        setFormData(result.data);
      } else {
        console.warn('API error, using mock data');
        setFormData(mockRoles[roleId] || { id: roleId, role_code: 'UNKNOWN', role_name: 'Unknown Role', description: '', is_active: 1 });
      }
    } catch (error) {
      console.warn('Failed to fetch role, using mock data:', error);
      setFormData(mockRoles[roleId] || { id: roleId, role_code: 'UNKNOWN', role_name: 'Unknown Role', description: '', is_active: 1 });
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.role_code.trim()) {
      newErrors.role_code = 'Role code is required';
    }

    if (!formData.role_name.trim()) {
      newErrors.role_name = 'Role name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const result = await settingsApi.roles.update(roleId, {
        role_code: formData.role_code,
        role_name: formData.role_name,
        description: formData.description || undefined,
        is_active: formData.is_active,
      });

      if (result.success) {
        router.push('/settings/roles');
      } else {
        setErrors({ submit: 'Failed to update role' });
      }
    } catch (error: unknown) {
      const message = error && typeof error === 'object' && 'message' in error 
        ? (error as { message: string }).message 
        : 'Failed to update role';
      setErrors({ submit: message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await settingsApi.roles.delete(roleId);
      router.push('/settings/roles');
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };

  const handleChange = (field: keyof Role, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-500">Loading role...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Role</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">แก้ไขบทบาท: {formData.role_name}</p>
            </div>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2.5 text-critical-500 hover:bg-critical-50 dark:hover:bg-critical-500/10 rounded-xl transition-colors"
            title="Delete Role"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-1.5">
          <div className="flex gap-1">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium">
              <Shield size={16} />
              Basic Info
            </button>
            <button
              onClick={() => router.push(`/settings/roles/${roleId}/menus`)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors"
            >
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="p-4 bg-critical-50 dark:bg-critical-500/10 border border-critical-200 dark:border-critical-500/20 rounded-xl">
              <p className="text-sm text-critical-600 dark:text-critical-400">{errors.submit}</p>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Role Information</h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Role Code <span className="text-critical-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.role_code}
                    onChange={(e) => handleChange('role_code', e.target.value.toUpperCase())}
                    className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all ${
                      errors.role_code ? 'border-critical-300 dark:border-critical-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.role_code && <p className="mt-1 text-xs text-critical-500">{errors.role_code}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Role Name <span className="text-critical-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.role_name}
                    onChange={(e) => handleChange('role_name', e.target.value)}
                    className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all ${
                      errors.role_name ? 'border-critical-300 dark:border-critical-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.role_name && <p className="mt-1 text-xs text-critical-500">{errors.role_name}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="is_active"
                      checked={formData.is_active === 1}
                      onChange={() => handleChange('is_active', 1)}
                      className="w-4 h-4 text-primary-500 focus:ring-primary-500/20"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="is_active"
                      checked={formData.is_active === 0}
                      onChange={() => handleChange('is_active', 0)}
                      className="w-4 h-4 text-primary-500 focus:ring-primary-500/20"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Inactive</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
        </form>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Delete Role</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete <strong>{formData.role_name}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-critical-500 hover:bg-critical-600 rounded-xl transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}