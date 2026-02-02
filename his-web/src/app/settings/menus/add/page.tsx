// =============================================================================
// File: src/app/settings/menus/add/page.tsx
// Description: Add Menu Page - Form to create new menu item
// =============================================================================

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import { menuApi } from '@/lib/api';
import { MenuItem } from '@/lib/types';
import { getIcon } from '@/components/ui';
import CustomSelect from '@/components/ui/CustomSelect';
import { IconPicker } from '@/components/settings/menus/IconPicker';

export default function AddMenuPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [parentMenus, setParentMenus] = useState<MenuItem[]>([]);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    menu_code: '',
    menu_name: '',
    menu_name_th: '',
    parent_id: null as number | null,
    icon: 'file',
    route_path: '',
    sort_order: 0,
    is_active: 1,
  });

  useEffect(() => {
    fetchParentMenus();
  }, []);

  const fetchParentMenus = async () => {
    try {
      const response = await menuApi.getAll();
      if (response.success) {
        const roots = response.data.filter(
          (m) => m.parent_id === null || response.data.find((p) => p.id === m.parent_id)?.parent_id === null
        );
        setParentMenus(roots);
      }
    } catch (error) {
      console.error('Failed to fetch parent menus:', error);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.menu_code.trim()) {
      newErrors.menu_code = 'Menu code is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.menu_code)) {
      newErrors.menu_code = 'Menu code must be lowercase letters, numbers, and hyphens only';
    }

    if (!formData.menu_name.trim()) {
      newErrors.menu_name = 'Menu name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await menuApi.create(formData);
      if (response.success) {
        router.push('/settings/menus');
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      setErrors({ submit: err.message || 'Failed to create menu' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const SelectedIcon = getIcon(formData.icon);

  // Convert parentMenus to CustomSelect options format
  const parentMenuOptions = useMemo(() => {
    return parentMenus.map((menu) => ({
      value: menu.id.toString(),
      label: `${menu.parent_id ? '└─ ' : ''}${menu.menu_name_th || menu.menu_name}`,
    }));
  }, [parentMenus]);

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add Menu</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">เพิ่มเมนูใหม่ในระบบ</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="p-4 bg-critical-50 dark:bg-critical-500/10 border border-critical-200 dark:border-critical-500/20 rounded-xl">
              <p className="text-sm text-critical-600 dark:text-critical-400">{errors.submit}</p>
            </div>
          )}

          {/* Basic Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Menu Code <span className="text-critical-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.menu_code}
                  onChange={(e) => handleChange('menu_code', e.target.value.toLowerCase())}
                  placeholder="e.g., settings-users"
                  className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all ${
                    errors.menu_code ? 'border-critical-300 dark:border-critical-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.menu_code && <p className="mt-1 text-xs text-critical-500">{errors.menu_code}</p>}
                <p className="mt-1 text-xs text-slate-500">Unique identifier (lowercase, hyphens allowed)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => handleChange('sort_order', parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
                <p className="mt-1 text-xs text-slate-500">Display order (lower = first)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Menu Name (EN) <span className="text-critical-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.menu_name}
                  onChange={(e) => handleChange('menu_name', e.target.value)}
                  placeholder="e.g., User Management"
                  className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all ${
                    errors.menu_name ? 'border-critical-300 dark:border-critical-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.menu_name && <p className="mt-1 text-xs text-critical-500">{errors.menu_name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Menu Name (TH)</label>
                <input
                  type="text"
                  value={formData.menu_name_th}
                  onChange={(e) => handleChange('menu_name_th', e.target.value)}
                  placeholder="e.g., จัดการผู้ใช้งาน"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Navigation Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Navigation Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Parent Menu</label>
                <CustomSelect
                  options={parentMenuOptions}
                  value={formData.parent_id?.toString() || ''}
                  onChange={(val) => handleChange('parent_id', val ? parseInt(val) : null)}
                  placeholder="-- Root Menu --"
                />
                <p className="mt-1 text-xs text-slate-500">Leave empty for root-level menu</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Route Path</label>
                <input
                  type="text"
                  value={formData.route_path}
                  onChange={(e) => handleChange('route_path', e.target.value)}
                  placeholder="e.g., /settings/users"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
                <p className="mt-1 text-xs text-slate-500">URL path for navigation</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Icon</label>
                <button
                  type="button"
                  onClick={() => setShowIconPicker(true)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-left flex items-center gap-3 hover:border-primary-300 dark:hover:border-primary-500 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                    <SelectedIcon size={18} className="text-primary-500" />
                  </div>
                  <span className="text-slate-600 dark:text-slate-400">{formData.icon}</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="is_active"
                      checked={formData.is_active === 1}
                      onChange={() => handleChange('is_active', 1)}
                      className="w-4 h-4 text-primary-500 focus:ring-primary-500/20"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="is_active"
                      checked={formData.is_active === 0}
                      onChange={() => handleChange('is_active', 0)}
                      className="w-4 h-4 text-primary-500 focus:ring-primary-500/20"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Inactive</span>
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
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Menu
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {showIconPicker && (
        <IconPicker
          selectedIcon={formData.icon}
          onSelect={(icon) => {
            handleChange('icon', icon);
            setShowIconPicker(false);
          }}
          onClose={() => setShowIconPicker(false)}
        />
      )}
    </AdminLayout>
  );
}