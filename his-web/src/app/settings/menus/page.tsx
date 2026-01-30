// =============================================================================
// File: src/app/settings/menus/page.tsx
// Description: Menu List Page - DataTable with search, filter, and tree view
// =============================================================================

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  GripVertical,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import { menuApi } from '@/lib/api';
import { MenuItem } from '@/types';
import { getIcon } from '@/components/ui';

export default function MenuListPage() {
  const router = useRouter();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [selectedMenus, setSelectedMenus] = useState<Set<number>>(new Set());
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; menu: MenuItem | null }>({
    open: false,
    menu: null,
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await menuApi.getAll();
      if (response.success) {
        setMenus(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    } finally {
      setLoading(false);
    }
  };

  const isMenuActive = (menu: MenuItem): boolean => {
    return Boolean(menu.is_active);
  };

  // Build tree structure
  const menuTree = useMemo(() => {
    const buildTree = (parentId: number | null = null): MenuItem[] => {
      return menus
        .filter((m) => m.parent_id === parentId)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((menu) => ({
          ...menu,
          children: buildTree(menu.id),
        }));
    };
    return buildTree(null);
  }, [menus]);

  // Filter menus
  const filteredMenus = useMemo(() => {
    let filtered = menus;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.menu_name.toLowerCase().includes(term) ||
          m.menu_name_th?.toLowerCase().includes(term) ||
          m.menu_code.toLowerCase().includes(term) ||
          m.route_path?.toLowerCase().includes(term)
      );
    }

    if (filterActive !== 'all') {
      filtered = filtered.filter((m) => {
        const active = isMenuActive(m);
        return filterActive === 'active' ? active : !active;
      });
    }

    return filtered;
  }, [menus, searchTerm, filterActive]);

  // Flatten tree for display with level info
  const flattenedMenus = useMemo(() => {
    const result: (MenuItem & { level: number })[] = [];

    const flatten = (items: MenuItem[], level: number = 0) => {
      items.forEach((item) => {
        const filtered = filteredMenus.find((f) => f.id === item.id);
        if (filtered || !searchTerm) {
          result.push({ ...item, level });
          if (item.children && expandedRows.has(item.id)) {
            flatten(item.children, level + 1);
          }
        }
      });
    };

    if (searchTerm) {
      filteredMenus.forEach((menu) => {
        result.push({ ...menu, level: 0 });
      });
    } else {
      flatten(menuTree);
    }

    return result;
  }, [menuTree, filteredMenus, expandedRows, searchTerm]);

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelect = (id: number) => {
    setSelectedMenus((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedMenus.size === flattenedMenus.length) {
      setSelectedMenus(new Set());
    } else {
      setSelectedMenus(new Set(flattenedMenus.map((m) => m.id)));
    }
  };

  const handleDelete = async (menu: MenuItem) => {
    try {
      await menuApi.delete(menu.id);
      setDeleteModal({ open: false, menu: null });
      fetchMenus();
    } catch (error) {
      console.error('Failed to delete menu:', error);
    }
  };

  const handleToggleActive = async (menu: MenuItem) => {
    try {
      const active = isMenuActive(menu);
      await menuApi.update(menu.id, { is_active: !active });
      fetchMenus();
    } catch (error) {
      console.error('Failed to toggle menu status:', error);
    }
  };

  const getParentName = (parentId: number | null) => {
    if (!parentId) return '-';
    const parent = menus.find((m) => m.id === parentId);
    return parent?.menu_name_th || parent?.menu_name || '-';
  };

  const hasChildren = (menuId: number) => {
    return menus.some((m) => m.parent_id === menuId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Menu Management
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              จัดการเมนูระบบ • {menus.length} รายการ
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/settings/menus/tree')}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <GripVertical size={16} />
                Tree View
              </span>
            </button>
            <button
              onClick={() => router.push('/settings/menus/add')}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"
            >
              <span className="flex items-center gap-2">
                <Plus size={16} />
                Add Menu
              </span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search menus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value as typeof filterActive)}
                className="px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              onClick={fetchMenus}
              disabled={loading}
              className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedMenus.size === flattenedMenus.length && flattenedMenus.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary-500 focus:ring-primary-500/20"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Menu</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">Route</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">Parent</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-slate-500">Loading menus...</span>
                      </div>
                    </td>
                  </tr>
                ) : flattenedMenus.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <div className="text-slate-500">No menus found</div>
                    </td>
                  </tr>
                ) : (
                  flattenedMenus.map((menu) => {
                    const Icon = getIcon(menu.icon || 'file');
                    const hasChildMenus = hasChildren(menu.id);
                    const isExpanded = expandedRows.has(menu.id);
                    const menuActive = isMenuActive(menu);

                    return (
                      <tr key={menu.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedMenus.has(menu.id)}
                            onChange={() => toggleSelect(menu.id)}
                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary-500 focus:ring-primary-500/20"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3" style={{ paddingLeft: `${menu.level * 24}px` }}>
                            {hasChildMenus && !searchTerm ? (
                              <button onClick={() => toggleExpand(menu.id)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                {isExpanded ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                              </button>
                            ) : (
                              <span className="w-6" />
                            )}
                            <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                              <Icon size={18} className="text-primary-500" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">{menu.menu_name_th || menu.menu_name}</p>
                              {menu.menu_name_th && <p className="text-xs text-slate-500">{menu.menu_name}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono text-slate-600 dark:text-slate-400">{menu.menu_code}</code>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-sm text-slate-600 dark:text-slate-400">{menu.route_path || '-'}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm text-slate-600 dark:text-slate-400">{getParentName(menu.parent_id)}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400">{menu.sort_order}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleToggleActive(menu)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                              menuActive
                                ? 'bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {menuActive ? <><Eye size={12} />Active</> : <><EyeOff size={12} />Hidden</>}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => router.push(`/settings/menus/${menu.id}`)} className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => setDeleteModal({ open: true, menu })} className="p-2 text-slate-400 hover:text-critical-500 hover:bg-critical-50 dark:hover:bg-critical-500/10 rounded-lg transition-colors" title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {selectedMenus.size > 0 && (
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">{selectedMenus.size} selected</span>
                <button onClick={() => setSelectedMenus(new Set())} className="text-sm text-primary-500 hover:text-primary-600">Clear selection</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal.open && deleteModal.menu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteModal({ open: false, menu: null })} />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Delete Menu</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete <strong>{deleteModal.menu.menu_name_th || deleteModal.menu.menu_name}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteModal({ open: false, menu: null })} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteModal.menu!)} className="px-4 py-2 text-sm font-medium text-white bg-critical-500 hover:bg-critical-600 rounded-xl transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}