// =============================================================================
// File: src/app/settings/users/page.tsx
// Description: Users Management with Pagination - จัดการผู้ใช้งานระบบ
// =============================================================================

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Edit,
  Trash2,
  Users,
  UsersRound,
  MoreVertical,
  RefreshCw,
  Shield,
  LayoutGrid,
  List,
  Mail,
  Key,
  UserCheck,
  UserX,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { AdminLayout } from '@/components/layout';

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

// =============================================================================
// Types
// =============================================================================

interface User {
  officer_id: number;
  officer_name: string;
  officer_login_name: string;
  officer_email: string | null;
  officer_active: string;
  groups?: { group_id: number; group_name: string }[];
  roles?: { role_id: number; role_name: string }[];
}

interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

type ViewMode = 'grid' | 'list';

// =============================================================================
// User Card Component
// =============================================================================

interface UserCardProps {
  user: User;
  onContextMenu: (e: React.MouseEvent, user: User) => void;
  onEdit: (user: User) => void;
  onManageGroups: (user: User) => void;
  onManageRoles: (user: User) => void;
}

function UserCard({ user, onContextMenu, onEdit, onManageGroups, onManageRoles }: UserCardProps) {
  const isActive = user.officer_active === 'Y';

  return (
    <div
      className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 hover:shadow-lg ${
        isActive
          ? 'border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-500'
          : 'border-slate-200 dark:border-slate-700 opacity-60'
      }`}
      onContextMenu={(e) => onContextMenu(e, user)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg ${
                isActive
                  ? 'bg-linear-to-br from-primary-500 to-primary-600'
                  : 'bg-slate-400'
              }`}
            >
              {user.officer_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {user.officer_name || 'N/A'}
              </h3>
              <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                <Key size={12} />
                {user.officer_login_name}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => onContextMenu(e, user)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        {user.officer_email && (
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <Mail size={14} />
            <span className="truncate">{user.officer_email}</span>
          </div>
        )}

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <UsersRound size={14} />
            <span>{user.groups?.length || 0} groups</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Shield size={14} />
            <span>{user.roles?.length || 0} roles</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-lg ${
            isActive
              ? 'bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
            title="Edit User"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onManageGroups(user)}
            className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg transition-colors"
            title="Manage Groups"
          >
            <UsersRound size={16} />
          </button>
          <button
            onClick={() => onManageRoles(user)}
            className="p-2 text-slate-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors"
            title="Manage Roles"
          >
            <Shield size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Pagination Component
// =============================================================================

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

function Pagination({ meta, onPageChange }: PaginationProps) {
  const { current_page, last_page, total, per_page } = meta;
  const start = (current_page - 1) * per_page + 1;
  const end = Math.min(current_page * per_page, total);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (last_page <= maxVisible + 2) {
      for (let i = 1; i <= last_page; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (current_page > 3) pages.push('...');
      
      const startPage = Math.max(2, current_page - 1);
      const endPage = Math.min(last_page - 1, current_page + 1);
      
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      
      if (current_page < last_page - 2) pages.push('...');
      
      pages.push(last_page);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Showing <span className="font-medium text-slate-900 dark:text-white">{start}</span> to{' '}
        <span className="font-medium text-slate-900 dark:text-white">{end}</span> of{' '}
        <span className="font-medium text-slate-900 dark:text-white">{total}</span> users
      </div>

      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={current_page === 1}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="First Page"
        >
          <ChevronsLeft size={18} />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous Page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`min-w-9 h-9 px-3 text-sm font-medium rounded-lg transition-all ${
                  current_page === page
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next Page"
        >
          <ChevronRight size={18} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(last_page)}
          disabled={current_page === last_page}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Last Page"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0,
    per_page: 20,
    current_page: 1,
    last_page: 1,
  });

  // Context Menu
  const contextMenu = useContextMenu<User>();

  // Confirm Dialogs
  const deleteDialog = useConfirmDialog<User>({
    onConfirm: async (user) => {
      await handleDelete(user);
    },
  });

  const deactivateDialog = useConfirmDialog<User>({
    onConfirm: async (user) => {
      await handleToggleActive(user);
    },
  });

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch users when page, search, or filter changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearch, filterActive]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        search: debouncedSearch,
        status: filterActive,
      });

      const res = await fetch(`/api/v1/settings/users?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const result = await res.json();
        setUsers(result.data || []);
        if (result.meta) {
          setMeta(result.meta);
        }
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Stats (from current page data + meta total)
  const stats = useMemo(() => {
    return {
      total: meta.total,
      active: users.filter((u) => u.officer_active === 'Y').length,
      inactive: users.filter((u) => u.officer_active !== 'Y').length,
      withGroups: users.filter((u) => u.groups && u.groups.length > 0).length,
    };
  }, [users, meta.total]);

  const handleDelete = async (user: User) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // After delete, refetch
    fetchUsers();
  };

  const handleToggleActive = async (user: User) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // After toggle, refetch
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    router.push(`/settings/users/${user.officer_id}/edit`);
  };

  const handleView = (user: User) => {
    router.push(`/settings/users/${user.officer_id}`);
  };

  const handleManageGroups = (user: User) => {
    router.push(`/settings/users/${user.officer_id}/groups`);
  };

  const handleManageRoles = (user: User) => {
    router.push(`/settings/users/${user.officer_id}/roles`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (status: 'all' | 'active' | 'inactive') => {
    setFilterActive(status);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <AdminLayout>
      <div className="min-h-screen pb-24 lg:pb-6">
        {/* ============================================ */}
        {/* Header - Sticky on mobile */}
        {/* ============================================ */}
        <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 -mx-4 px-4 lg:mx-0 lg:px-0 lg:bg-transparent lg:border-0 lg:static">
          <div className="py-3 lg:py-0 lg:mb-6">
            {/* Mobile Header */}
            <div className="flex items-center justify-between lg:hidden">
              <h1 className="font-bold text-slate-900 dark:text-white">จัดการผู้ใช้งาน</h1>
              <span className="text-sm text-slate-500">{meta.total} users</span>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Users Management
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  จัดการผู้ใช้งานระบบ • {meta.total} users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-0">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                <Users size={20} className="text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{meta.total}</p>
                <p className="text-xs text-slate-500">Total Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
                <UserCheck size={20} className="text-success-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.active}</p>
                <p className="text-xs text-slate-500">Active (this page)</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <UserX size={20} className="text-slate-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.inactive}</p>
                <p className="text-xs text-slate-500">Inactive (this page)</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                <UsersRound size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.withGroups}</p>
                <p className="text-xs text-slate-500">With Groups</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & View Toggle */}
        <div className="mt-4 lg:mt-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search users by name, login or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              {['all', 'active', 'inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status as 'all' | 'active' | 'inactive')}
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

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-500">Loading users...</span>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <Users size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-500 mb-4">No users found</p>
            <p className="text-sm text-slate-400">
              {searchTerm || filterActive !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No users available'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {users.map((user, index) => (
              <UserCard
                key={user.officer_id ?? `user-${index}`}
                user={user}
                onContextMenu={contextMenu.open}
                onEdit={handleEdit}
                onManageGroups={handleManageGroups}
                onManageRoles={handleManageRoles}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Groups
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Roles
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((user, index) => {
                  const isActive = user.officer_active === 'Y';
                  return (
                    <tr
                      key={user.officer_id ?? `user-row-${index}`}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        !isActive ? 'opacity-60' : ''
                      }`}
                      onClick={() => handleView(user)}
                      onContextMenu={(e) => contextMenu.open(e, user)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold ${
                              isActive
                                ? 'bg-linear-to-br from-primary-500 to-primary-600'
                                : 'bg-slate-400'
                            }`}
                          >
                            {user.officer_name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              {user.officer_name || 'N/A'}
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                              {user.officer_login_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {user.officer_email || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-lg ${
                            isActive
                              ? 'bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {user.groups && user.groups.length > 0 ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                            {user.groups.length} groups
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {user.roles && user.roles.length > 0 ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                            {user.roles.length} roles
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(user);
                            }}
                            className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleManageGroups(user);
                            }}
                            className="p-1.5 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg transition-colors"
                            title="Manage Groups"
                          >
                            <UsersRound size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              contextMenu.open(e, user);
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && users.length > 0 && meta.last_page > 1 && (
          <Pagination meta={meta} onPageChange={handlePageChange} />
        )}
      </div>

      {/* ========== Context Menu ========== */}
      <ContextMenu
        open={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={contextMenu.close}
      >
        <ContextMenuItem
          icon={Eye}
          onClick={() => {
            if (contextMenu.data) handleView(contextMenu.data);
            contextMenu.close();
          }}
        >
          View Details
        </ContextMenuItem>
        <ContextMenuItem
          icon={Edit}
          onClick={() => {
            if (contextMenu.data) handleEdit(contextMenu.data);
            contextMenu.close();
          }}
        >
          Edit User
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem
          icon={UsersRound}
          onClick={() => {
            if (contextMenu.data) handleManageGroups(contextMenu.data);
            contextMenu.close();
          }}
        >
          Manage Groups
        </ContextMenuItem>
        <ContextMenuItem
          icon={Shield}
          onClick={() => {
            if (contextMenu.data) handleManageRoles(contextMenu.data);
            contextMenu.close();
          }}
        >
          Manage Roles
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem
          icon={contextMenu.data?.officer_active === 'Y' ? UserX : UserCheck}
          variant={contextMenu.data?.officer_active === 'Y' ? 'warning' : 'success'}
          onClick={() => {
            if (contextMenu.data) {
              deactivateDialog.open(contextMenu.data);
            }
            contextMenu.close();
          }}
        >
          {contextMenu.data?.officer_active === 'Y' ? 'Deactivate' : 'Activate'}
        </ContextMenuItem>
        <ContextMenuItem
          icon={Trash2}
          variant="danger"
          onClick={() => {
            if (contextMenu.data) {
              deleteDialog.open(contextMenu.data);
            }
            contextMenu.close();
          }}
        >
          Delete User
        </ContextMenuItem>
      </ContextMenu>

      {/* ========== Delete Confirm Dialog ========== */}
      <ConfirmDialog
        {...deleteDialog.dialogProps}
        variant="danger"
        title="ลบผู้ใช้"
        message={
          <>
            คุณต้องการลบ <strong>{deleteDialog.data?.officer_name}</strong> ใช่หรือไม่?
            <span className="block text-red-500 mt-2 text-sm">
              ⚠️ การกระทำนี้ไม่สามารถย้อนกลับได้
            </span>
          </>
        }
        confirmText="ลบผู้ใช้"
      />

      {/* ========== Deactivate Confirm Dialog ========== */}
      <ConfirmDialog
        {...deactivateDialog.dialogProps}
        variant={deactivateDialog.data?.officer_active === 'Y' ? 'warning' : 'success'}
        title={deactivateDialog.data?.officer_active === 'Y' ? 'ปิดใช้งานผู้ใช้' : 'เปิดใช้งานผู้ใช้'}
        message={
          <>
            คุณต้องการ{deactivateDialog.data?.officer_active === 'Y' ? 'ปิด' : 'เปิด'}ใช้งาน{' '}
            <strong>{deactivateDialog.data?.officer_name}</strong> ใช่หรือไม่?
          </>
        }
        confirmText={deactivateDialog.data?.officer_active === 'Y' ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
      />
    </AdminLayout>
  );
}
