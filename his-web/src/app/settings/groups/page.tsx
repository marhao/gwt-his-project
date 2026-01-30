// =============================================================================
// File: src/app/settings/groups/page.tsx
// Description: Groups Management with Tree Structure - จัดการกลุ่มผู้ใช้แบบ Nested
// =============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  UsersRound,
  UserPlus,
  MoreVertical,
  RefreshCw,
  Shield,
  ChevronRight,
  ChevronDown,
  FolderTree,
  Copy,
  StopCircle,
  CheckCircle,
  Folder,
  FolderOpen,
  Building2,
  LayoutGrid,
  List,
  GitBranch,
} from 'lucide-react';

import { AdminLayout } from '@/components/layout';
import { settingsApi } from '@/lib/api';

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

interface Group {
  id: number;
  group_code: string;
  group_name: string;
  description: string | null;
  parent_id: number | null;
  is_active: number;
  created_at: string;
  updated_at: string;
  children?: Group[];
  _count?: {
    users: number;
    roles: number;
    children: number;
  };
}

type ViewMode = 'tree' | 'grid' | 'list';

// =============================================================================
// Tree Node Component
// =============================================================================

interface TreeNodeProps {
  group: Group;
  level: number;
  expandedNodes: Set<number>;
  onToggle: (id: number) => void;
  onContextMenu: (e: React.MouseEvent, group: Group) => void;
  onEdit: (group: Group) => void;
  onAddChild: (group: Group) => void;
}

function TreeNode({ group, level, expandedNodes, onToggle, onContextMenu, onEdit, onAddChild }: TreeNodeProps) {
  const isExpanded = expandedNodes.has(group.id);
  const hasChildren = group.children && group.children.length > 0;
  
  return (
    <div className="select-none">
      <div
        className={`group flex items-center gap-2 py-2 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
          !group.is_active ? 'opacity-50' : ''
        }`}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onContextMenu={(e) => onContextMenu(e, group)}
      >
        {/* Expand/Collapse */}
        <button
          onClick={() => hasChildren && onToggle(group.id)}
          className={`w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${
            hasChildren ? 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500' : 'text-transparent'
          }`}
        >
          {hasChildren && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>

        {/* Icon */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          group.is_active
            ? hasChildren
              ? isExpanded
                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600'
                : 'bg-amber-50 dark:bg-amber-500/10 text-amber-500'
              : 'bg-green-50 dark:bg-green-500/10 text-green-500'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
        }`}>
          {hasChildren ? (
            isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />
          ) : (
            <UsersRound size={16} />
          )}
        </div>

        {/* Group Info */}
        <div className="flex-1 min-w-0" onClick={() => onEdit(group)}>
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-900 dark:text-white truncate">
              {group.group_name}
            </span>
            <span className="text-xs text-slate-400 font-mono">{group.group_code}</span>
            {!group.is_active && (
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-200 dark:bg-slate-700 text-slate-500 rounded">
                Inactive
              </span>
            )}
          </div>
          {group.description && (
            <p className="text-xs text-slate-500 truncate">{group.description}</p>
          )}
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1" title="Members">
            <Users size={12} />
            <span>{group._count?.users || 0}</span>
          </div>
          <div className="flex items-center gap-1" title="Roles">
            <Shield size={12} />
            <span>{group._count?.roles || 0}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddChild(group);
            }}
            className="p-1.5 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg transition-colors"
            title="Add Child Group"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(group);
            }}
            className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={(e) => onContextMenu(e, group)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 border-l-2 border-slate-200 dark:border-slate-700"
            style={{ marginLeft: `${level * 24 + 24}px` }}
          />
          {group.children!.map((child) => (
            <TreeNode
              key={child.id}
              group={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
              onContextMenu={onContextMenu}
              onEdit={onEdit}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Grid Card Component
// =============================================================================

interface GroupCardProps {
  group: Group;
  onContextMenu: (e: React.MouseEvent, group: Group) => void;
  onEdit: (group: Group) => void;
  onManageUsers: (group: Group) => void;
  onManageRoles: (group: Group) => void;
}

function GroupCard({ group, onContextMenu, onEdit, onManageUsers, onManageRoles }: GroupCardProps) {
  return (
    <div
      className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 hover:shadow-lg ${
        group.is_active
          ? 'border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-500'
          : 'border-slate-200 dark:border-slate-700 opacity-60'
      }`}
      onContextMenu={(e) => onContextMenu(e, group)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              group.is_active
                ? 'bg-green-50 dark:bg-green-500/10'
                : 'bg-slate-100 dark:bg-slate-800'
            }`}>
              {group._count?.children ? (
                <FolderTree size={24} className={group.is_active ? 'text-green-500' : 'text-slate-400'} />
              ) : (
                <UsersRound size={24} className={group.is_active ? 'text-green-500' : 'text-slate-400'} />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {group.group_name}
              </h3>
              <p className="text-xs text-slate-500 font-mono">{group.group_code}</p>
            </div>
          </div>
          <button
            onClick={(e) => onContextMenu(e, group)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
          {group.description || 'No description'}
        </p>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Users size={14} />
            <span>{group._count?.users || 0} members</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Shield size={14} />
            <span>{group._count?.roles || 0} roles</span>
          </div>
          {(group._count?.children || 0) > 0 && (
            <div className="flex items-center gap-1.5 text-slate-500">
              <GitBranch size={14} />
              <span>{group._count?.children} sub-groups</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
          group.is_active
            ? 'bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-400'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
        }`}>
          {group.is_active ? 'Active' : 'Inactive'}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(group)}
            className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
            title="Edit Group"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onManageUsers(group)}
            className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg transition-colors"
            title="Manage Members"
          >
            <UserPlus size={16} />
          </button>
          <button
            onClick={() => onManageRoles(group)}
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
// Main Component
// =============================================================================

export default function GroupsPage() {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [flatGroups, setFlatGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  // Context Menu
  const contextMenu = useContextMenu<Group>();

  // Confirm Dialogs
  const deleteDialog = useConfirmDialog<Group>({
    onConfirm: async (group) => {
      await handleDelete(group);
    },
  });

  const deactivateDialog = useConfirmDialog<Group>({
    onConfirm: async (group) => {
      await handleToggleActive(group);
    },
  });

  // Build tree from flat list
  const buildTree = useCallback((items: Group[]): Group[] => {
    const map = new Map<number, Group>();
    const roots: Group[] = [];

    items.forEach((item) => {
      map.set(item.id, { ...item, children: [] });
    });

    items.forEach((item) => {
      const node = map.get(item.id)!;
      if (item.parent_id === null) {
        roots.push(node);
      } else {
        const parent = map.get(item.parent_id);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      }
    });

    return roots;
  }, []);

  // Flatten tree for search/filter
  const flattenTree = useCallback((items: Group[]): Group[] => {
    const result: Group[] = [];
    const traverse = (nodes: Group[]) => {
      for (const node of nodes) {
        result.push(node);
        if (node.children && node.children.length > 0) {
          traverse(node.children);
        }
      }
    };
    traverse(items);
    return result;
  }, []);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);

    // Mock data with nested structure
    const mockGroups: Group[] = [
      { id: 1, group_code: 'ADMIN', group_name: 'Administrators', description: 'System administrators group', parent_id: null, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 5, roles: 3, children: 2 } },
      { id: 2, group_code: 'ADMIN_IT', group_name: 'IT Administrators', description: 'IT department administrators', parent_id: 1, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 3, roles: 2, children: 0 } },
      { id: 3, group_code: 'ADMIN_HR', group_name: 'HR Administrators', description: 'Human resources administrators', parent_id: 1, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 2, roles: 1, children: 0 } },
      { id: 4, group_code: 'MEDICAL', group_name: 'Medical Staff', description: 'All medical personnel', parent_id: null, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 150, roles: 5, children: 3 } },
      { id: 5, group_code: 'DOCTORS', group_name: 'Doctors', description: 'Physicians and surgeons', parent_id: 4, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 45, roles: 2, children: 2 } },
      { id: 6, group_code: 'DOCTOR_OPD', group_name: 'OPD Doctors', description: 'Outpatient department doctors', parent_id: 5, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 20, roles: 1, children: 0 } },
      { id: 7, group_code: 'DOCTOR_IPD', group_name: 'IPD Doctors', description: 'Inpatient department doctors', parent_id: 5, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 25, roles: 1, children: 0 } },
      { id: 8, group_code: 'NURSES', group_name: 'Nurses', description: 'Nursing staff', parent_id: 4, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 80, roles: 2, children: 0 } },
      { id: 9, group_code: 'PHARMACISTS', group_name: 'Pharmacists', description: 'Pharmacy department', parent_id: 4, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 25, roles: 1, children: 0 } },
      { id: 10, group_code: 'FINANCE', group_name: 'Finance', description: 'Finance and accounting department', parent_id: null, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 20, roles: 2, children: 0 } },
      { id: 11, group_code: 'RECEPTION', group_name: 'Reception', description: 'Front desk and registration', parent_id: null, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 15, roles: 1, children: 0 } },
      { id: 12, group_code: 'LAB', group_name: 'Laboratory', description: 'Laboratory technicians', parent_id: null, is_active: 0, created_at: '2024-01-01', updated_at: '2024-01-01', _count: { users: 0, roles: 1, children: 0 } },
    ];

    try {
      const result = await settingsApi.groups.getAll();
      if (result.success && result.data) {
        const data = result.data as unknown as Group[];
        const tree = buildTree(data);
        setGroups(tree);
        setFlatGroups(data);
        // Expand first level by default
        setExpandedNodes(new Set(tree.map(g => g.id)));
      } else {
        const tree = buildTree(mockGroups);
        setGroups(tree);
        setFlatGroups(mockGroups);
        setExpandedNodes(new Set(tree.map(g => g.id)));
      }
    } catch (error) {
      const tree = buildTree(mockGroups);
      setGroups(tree);
      setFlatGroups(mockGroups);
      setExpandedNodes(new Set(tree.map(g => g.id)));
    } finally {
      setLoading(false);
    }
  };

  // Filter groups
  const filteredGroups = flatGroups.filter((group) => {
    const matchesSearch =
      group.group_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActive === 'all' ||
      (filterActive === 'active' && group.is_active === 1) ||
      (filterActive === 'inactive' && group.is_active === 0);

    return matchesSearch && matchesFilter;
  });

  // Filter tree (keep parents if children match)
  const filterTree = useCallback((nodes: Group[], term: string, activeFilter: string): Group[] => {
    return nodes.reduce<Group[]>((acc, node) => {
      const matchesSearch = !term || 
        node.group_code.toLowerCase().includes(term.toLowerCase()) ||
        node.group_name.toLowerCase().includes(term.toLowerCase()) ||
        node.description?.toLowerCase().includes(term.toLowerCase());

      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'active' && node.is_active === 1) ||
        (activeFilter === 'inactive' && node.is_active === 0);

      const filteredChildren = node.children ? filterTree(node.children, term, activeFilter) : [];

      if (matchesSearch && matchesFilter) {
        acc.push({ ...node, children: filteredChildren });
      } else if (filteredChildren.length > 0) {
        acc.push({ ...node, children: filteredChildren });
      }

      return acc;
    }, []);
  }, []);

  const displayedTree = filterTree(groups, searchTerm, filterActive);

  const handleToggleExpand = (id: number) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setExpandedNodes(new Set(flatGroups.map(g => g.id)));
  };

  const handleCollapseAll = () => {
    setExpandedNodes(new Set());
  };

  const handleDelete = async (group: Group) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFlatGroups((prev) => prev.filter((g) => g.id !== group.id));
    setGroups(buildTree(flatGroups.filter((g) => g.id !== group.id)));
  };

  const handleToggleActive = async (group: Group) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newStatus = group.is_active === 1 ? 0 : 1;
    const updated = flatGroups.map((g) =>
      g.id === group.id ? { ...g, is_active: newStatus } : g
    );
    setFlatGroups(updated);
    setGroups(buildTree(updated));
  };

  const handleEdit = (group: Group) => {
    router.push(`/settings/groups/${group.id}`);
  };

  const handleAddChild = (parent: Group) => {
    router.push(`/settings/groups/add?parent=${parent.id}`);
  };

  const handleManageUsers = (group: Group) => {
    router.push(`/settings/groups/${group.id}/users`);
  };

  const handleManageRoles = (group: Group) => {
    router.push(`/settings/groups/${group.id}/roles`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Group Management
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              จัดการกลุ่มผู้ใช้และโครงสร้างองค์กร • {flatGroups.length} groups
            </p>
          </div>
          <button
            onClick={() => router.push('/settings/groups/add')}
            className="px-4 py-2.5 text-sm font-medium text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/25 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Group
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                <UsersRound size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{flatGroups.length}</p>
                <p className="text-xs text-slate-500">Total Groups</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
                <CheckCircle size={20} className="text-success-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {flatGroups.filter((g) => g.is_active === 1).length}
                </p>
                <p className="text-xs text-slate-500">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                <Users size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {flatGroups.reduce((sum, g) => sum + (g._count?.users || 0), 0)}
                </p>
                <p className="text-xs text-slate-500">Total Members</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                <FolderTree size={20} className="text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {groups.length}
                </p>
                <p className="text-xs text-slate-500">Root Groups</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & View Toggle */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
            </div>

            {/* Status Filter */}
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

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('tree')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'tree'
                    ? 'bg-white dark:bg-slate-700 text-green-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Tree View"
              >
                <FolderTree size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-green-500 shadow-sm'
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
                    ? 'bg-white dark:bg-slate-700 text-green-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>

            {/* Tree Actions */}
            {viewMode === 'tree' && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handleExpandAll}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Collapse All
                </button>
              </div>
            )}

            {/* Refresh */}
            <button
              onClick={fetchGroups}
              disabled={loading}
              className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-500">Loading groups...</span>
            </div>
          </div>
        ) : filteredGroups.length === 0 && displayedTree.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <UsersRound size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-500 mb-4">No groups found</p>
            <button
              onClick={() => router.push('/settings/groups/add')}
              className="px-4 py-2 text-sm font-medium text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition-colors"
            >
              Create your first group
            </button>
          </div>
        ) : viewMode === 'tree' ? (
          /* Tree View */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            {displayedTree.map((group) => (
              <TreeNode
                key={group.id}
                group={group}
                level={0}
                expandedNodes={expandedNodes}
                onToggle={handleToggleExpand}
                onContextMenu={(e, g) => contextMenu.open(e, g)}
                onEdit={handleEdit}
                onAddChild={handleAddChild}
              />
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onContextMenu={(e, g) => contextMenu.open(e, g)}
                onEdit={handleEdit}
                onManageUsers={handleManageUsers}
                onManageRoles={handleManageRoles}
              />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Parent</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Members</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Roles</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredGroups.map((group) => {
                  const parent = flatGroups.find(g => g.id === group.parent_id);
                  return (
                    <tr
                      key={group.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                        !group.is_active ? 'opacity-50' : ''
                      }`}
                      onContextMenu={(e) => contextMenu.open(e, group)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            group.is_active ? 'bg-green-50 dark:bg-green-500/10' : 'bg-slate-100 dark:bg-slate-800'
                          }`}>
                            <UsersRound size={18} className={group.is_active ? 'text-green-500' : 'text-slate-400'} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{group.group_name}</p>
                            <p className="text-xs text-slate-500 truncate max-w-50">{group.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-slate-500">{group.group_code}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {parent ? (
                          <span className="text-sm text-slate-500">{parent.group_name}</span>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-slate-900 dark:text-white">{group._count?.users || 0}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-slate-900 dark:text-white">{group._count?.roles || 0}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-lg ${
                          group.is_active
                            ? 'bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}>
                          {group.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(group)}
                            className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleManageUsers(group)}
                            className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg transition-colors"
                          >
                            <UserPlus size={16} />
                          </button>
                          <button
                            onClick={(e) => contextMenu.open(e, group)}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
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
            if (contextMenu.data) handleEdit(contextMenu.data);
            contextMenu.close();
          }}
        >
          Edit Group
        </ContextMenuItem>
        <ContextMenuItem
          icon={Plus}
          onClick={() => {
            if (contextMenu.data) handleAddChild(contextMenu.data);
            contextMenu.close();
          }}
        >
          Add Sub-Group
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem
          icon={UserPlus}
          onClick={() => {
            if (contextMenu.data) handleManageUsers(contextMenu.data);
            contextMenu.close();
          }}
        >
          Manage Members
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
        <ContextMenuItem
          icon={Copy}
          onClick={() => {
            console.log('Duplicate:', contextMenu.data);
            contextMenu.close();
          }}
        >
          Duplicate
        </ContextMenuItem>
        <ContextMenuDivider />

        {contextMenu.data?.is_active === 1 ? (
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
        ) : (
          <ContextMenuItem
            icon={CheckCircle}
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
        title="ลบกลุ่ม"
        message={
          <>
            คุณต้องการลบกลุ่ม <strong>{deleteDialog.data?.group_name}</strong> ใช่หรือไม่?
            {(deleteDialog.data?._count?.users || 0) > 0 && (
              <span className="block text-red-500 mt-2 text-sm">
                ⚠️ มีสมาชิก {deleteDialog.data?._count?.users} คนในกลุ่มนี้
              </span>
            )}
            {(deleteDialog.data?._count?.children || 0) > 0 && (
              <span className="block text-red-500 mt-1 text-sm">
                ⚠️ มีกลุ่มย่อย {deleteDialog.data?._count?.children} กลุ่ม
              </span>
            )}
          </>
        }
        confirmText="ลบกลุ่ม"
      />

      {/* ========== Deactivate Confirm Dialog ========== */}
      <ConfirmDialog
        {...deactivateDialog.dialogProps}
        variant="warning"
        icon={StopCircle}
        title="ปิดใช้งานกลุ่ม"
        message={
          <>
            คุณต้องการปิดใช้งานกลุ่ม <strong>{deactivateDialog.data?.group_name}</strong> ใช่หรือไม่?
            {(deactivateDialog.data?._count?.users || 0) > 0 && (
              <span className="block text-amber-600 mt-2 text-sm">
                ⚠️ สมาชิก {deactivateDialog.data?._count?.users} คนจะไม่ได้รับสิทธิ์จากกลุ่มนี้
              </span>
            )}
          </>
        }
        confirmText="ปิดใช้งาน"
      />
    </AdminLayout>
  );
}
