// =============================================================================
// File: src/app/settings/groups/add/page.tsx
// Description: Add New Group - สร้างกลุ่มผู้ใช้ใหม่
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Users,
  FolderTree,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import { AdminLayout } from '@/components/layout';
import { settingsApi } from '@/lib/api';

interface GroupForm {
  group_code: string;
  group_name: string;
  description: string;
  parent_id: number | null;
  is_active: number;
}

interface ParentGroup {
  id: number;
  group_code: string;
  group_name: string;
  parent_id: number | null;
}

export default function AddGroupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentIdParam = searchParams.get('parent');

  const [form, setForm] = useState<GroupForm>({
    group_code: '',
    group_name: '',
    description: '',
    parent_id: parentIdParam ? parseInt(parentIdParam) : null,
    is_active: 1,
  });

  const [parentGroups, setParentGroups] = useState<ParentGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingParents, setLoadingParents] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchParentGroups();
  }, []);

  const fetchParentGroups = async () => {
    setLoadingParents(true);
    try {
      const result = await settingsApi.groups.getAll();
      if (result.success && result.data) {
        setParentGroups(result.data as ParentGroup[]);
      }
    } catch (error) {
      // Use empty list on error
      setParentGroups([]);
    } finally {
      setLoadingParents(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.group_code.trim()) {
      newErrors.group_code = 'Group code is required';
    } else if (!/^[A-Z0-9_]+$/.test(form.group_code)) {
      newErrors.group_code = 'Group code must be uppercase letters, numbers, and underscores only';
    }

    if (!form.group_name.trim()) {
      newErrors.group_name = 'Group name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const result = await settingsApi.groups.create({
        group_code: form.group_code,
        group_name: form.group_name,
        description: form.description || undefined,
        parent_id: form.parent_id || undefined,
        is_active: form.is_active,
      });

      if (result.success) {
        router.push('/settings/groups');
      } else {
        setErrors({ submit: 'Failed to create group' });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to create group. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof GroupForm, value: string | number | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Build indented parent options
  const buildParentOptions = (groups: ParentGroup[], parentId: number | null = null, level = 0): { value: number; label: string }[] => {
    const result: { value: number; label: string }[] = [];
    const children = groups.filter((g) => g.parent_id === parentId);

    for (const child of children) {
      result.push({
        value: child.id,
        label: '—'.repeat(level) + (level > 0 ? ' ' : '') + child.group_name,
      });
      result.push(...buildParentOptions(groups, child.id, level + 1));
    }

    return result;
  };

  const parentOptions = buildParentOptions(parentGroups);
  const selectedParent = parentGroups.find((g) => g.id === form.parent_id);

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Add New Group
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              สร้างกลุ่มผู้ใช้ใหม่
              {selectedParent && (
                <span className="text-green-500"> • ภายใต้ {selectedParent.group_name}</span>
              )}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
            {/* Group Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                {form.parent_id ? (
                  <FolderTree size={40} className="text-green-500" />
                ) : (
                  <Users size={40} className="text-green-500" />
                )}
              </div>
            </div>

            {/* Group Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Group Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.group_code}
                onChange={(e) => handleChange('group_code', e.target.value.toUpperCase())}
                placeholder="e.g., ADMIN_IT"
                className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 transition-all ${
                  errors.group_code
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-green-500/20 focus:border-green-500'
                }`}
              />
              {errors.group_code && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.group_code}
                </p>
              )}
              <p className="mt-1.5 text-xs text-slate-500">
                Unique identifier. Use uppercase letters, numbers, and underscores.
              </p>
            </div>

            {/* Group Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Group Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.group_name}
                onChange={(e) => handleChange('group_name', e.target.value)}
                placeholder="e.g., IT Administrators"
                className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.group_name
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-green-500/20 focus:border-green-500'
                }`}
              />
              {errors.group_name && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.group_name}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe this group's purpose..."
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
              />
            </div>

            {/* Parent Group */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Parent Group
              </label>
              <select
                value={form.parent_id ?? ''}
                onChange={(e) => handleChange('parent_id', e.target.value ? parseInt(e.target.value) : null)}
                disabled={loadingParents}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              >
                <option value="">— No parent (Root group) —</option>
                {parentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                Select a parent to create a nested group structure.
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="is_active"
                    checked={form.is_active === 1}
                    onChange={() => handleChange('is_active', 1)}
                    className="w-4 h-4 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="is_active"
                    checked={form.is_active === 0}
                    onChange={() => handleChange('is_active', 0)}
                    className="w-4 h-4 text-slate-500 focus:ring-slate-500"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create Group
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
