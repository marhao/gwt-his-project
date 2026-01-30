// =============================================================================
// File: src/app/settings/roles/add/page.tsx
// Description: Add New Role Form
// =============================================================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Shield } from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import { settingsApi } from '@/lib/api';

interface FormData {
  role_code: string;
  role_name: string;
  description: string;
  is_active: number;
}

export default function AddRolePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    role_code: '',
    role_name: '',
    description: '',
    is_active: 1,
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.role_code.trim()) {
      newErrors.role_code = 'Role code is required';
    } else if (!/^[A-Z_]+$/.test(formData.role_code)) {
      newErrors.role_code = 'Role code must be uppercase letters and underscores only';
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

    setLoading(true);
    try {
      const result = await settingsApi.roles.create({
        role_code: formData.role_code,
        role_name: formData.role_name,
        description: formData.description || undefined,
        is_active: formData.is_active,
      });

      if (result.success) {
        router.push('/settings/roles');
      } else {
        setErrors({ submit: 'Failed to create role' });
      }
    } catch (error: unknown) {
      const message = error && typeof error === 'object' && 'message' in error 
        ? (error as { message: string }).message 
        : 'Failed to create role';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Role</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">สร้างบทบาทใหม่</p>
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                <Shield size={20} className="text-primary-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Role Information</h2>
            </div>

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
                    placeholder="e.g., ADMIN, DOCTOR"
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
                    placeholder="e.g., Administrator"
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
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Role description..."
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
              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Create Role
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}