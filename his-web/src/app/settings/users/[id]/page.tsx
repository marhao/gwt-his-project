// =============================================================================
// File: src/app/settings/users/[id]/page.tsx
// Description: User Detail Page - Modern Responsive Design (Patient Style)
// =============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  MoreVertical,
  User,
  Phone,
  Mail,
  Key,
  Calendar,
  Shield,
  UsersRound,
  Activity,
  Clock,
  ChevronRight,
  Copy,
  Check,
  Trash2,
  StopCircle,
  CheckCircle,
  XCircle,
  Building2,
  RefreshCw,
  Plus,
  Search,
  X,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '@/components/ui/confirm-dialog';

// =============================================================================
// Types
// =============================================================================

interface Officer {
  id: number;
  officer_id?: number;
  officer_login: string;
  officer_login_name?: string;
  officer_name: string;
  officer_position?: string;
  officer_email?: string;
  officer_phone?: string;
  officer_active?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  groups?: OfficerGroup[];
  roles?: OfficerRole[];
}

interface OfficerGroup {
  id: number;
  group_id: number;
  group_code: string;
  group_name: string;
  is_primary: boolean;
}

interface OfficerRole {
  id: number;
  role_id: number;
  role_code: string;
  role_name: string;
}

interface AvailableRole {
  id: number;
  role_code: string;
  role_name: string;
  role_description?: string;
}

interface AvailableGroup {
  id: number;
  group_code: string;
  group_name: string;
  group_description?: string;
}

// =============================================================================
// Custom Checkbox Component
// =============================================================================
const ModernCheckbox: React.FC<{
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'purple' | 'green';
  disabled?: boolean;
}> = ({ checked, onChange, label, description, icon, color = 'blue', disabled }) => {
  const colorClasses = {
    blue: {
      checked: 'border-primary-500 bg-primary-500',
      ring: 'ring-primary-500/20',
      icon: 'text-primary-600 dark:text-primary-400',
      bg: 'bg-primary-50 dark:bg-primary-500/10',
    },
    purple: {
      checked: 'border-purple-500 bg-purple-500',
      ring: 'ring-purple-500/20',
      icon: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-500/10',
    },
    green: {
      checked: 'border-emerald-500 bg-emerald-500',
      ring: 'ring-emerald-500/20',
      icon: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
  };

  const colors = colorClasses[color];

  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`
        w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all
        ${checked 
          ? `${colors.bg} border-2 ${colors.checked.split(' ')[0]} ring-2 ${colors.ring}` 
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Checkbox */}
      <div
        className={`
          size-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all
          ${checked 
            ? colors.checked + ' border-transparent' 
            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
          }
        `}
      >
        {checked && <Check size={12} className="text-white" strokeWidth={3} />}
      </div>
      
      {/* Icon */}
      {icon && (
        <div className={`size-9 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
          <span className={colors.icon}>{icon}</span>
        </div>
      )}
      
      {/* Label */}
      <div className="flex-1 text-left min-w-0">
        <p className={`text-sm font-medium truncate ${checked ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
          {label}
        </p>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{description}</p>
        )}
      </div>
    </button>
  );
};

// =============================================================================
// Selection Panel Component
// =============================================================================
const SelectionPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  items: { id: number; code: string; name: string; description?: string }[];
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
  onSave: () => void;
  saving: boolean;
  loading: boolean;
  color: 'blue' | 'purple';
  itemIcon: React.ReactNode;
}> = ({ isOpen, onClose, title, icon, items, selectedIds, onToggle, onSave, saving, loading, color, itemIcon }) => {
  const [search, setSearch] = useState('');
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.code.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCount = selectedIds.size;
  const hasChanges = selectedCount > 0;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed inset-x-4 bottom-4 top-20 lg:inset-auto lg:right-4 lg:top-4 lg:bottom-4 lg:w-100 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-4 lg:slide-in-from-right-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`size-10 rounded-xl flex items-center justify-center ${color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400' : 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400'}`}>
              {icon}
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">{title}</h2>
              <p className="text-xs text-slate-500">เลือก {selectedCount} รายการ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหา..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-slate-400" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Search size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">ไม่พบรายการ</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <ModernCheckbox
                key={item.id}
                checked={selectedIds.has(item.id)}
                onChange={() => onToggle(item.id)}
                label={item.name}
                description={item.code}
                icon={itemIcon}
                color={color}
                disabled={saving}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={onSave}
            disabled={saving || !hasChanges}
            className={`
              w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all
              ${hasChanges
                ? color === 'purple' 
                  ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            {saving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                บันทึก ({selectedCount} รายการ)
              </>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={saving}
            className="w-full py-2.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </>
  );
};

// =============================================================================
// Sub Components
// =============================================================================

// Info Item Component
const InfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  copyable?: boolean;
}> = ({ icon, label, value, copyable }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
      <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className={`text-sm font-medium ${value ? 'text-slate-900 dark:text-white' : 'text-slate-400'} truncate`}>
          {value || '-'}
        </p>
      </div>
      {copyable && value && (
        <button
          onClick={handleCopy}
          className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-slate-400" />}
        </button>
      )}
    </div>
  );
};

// Section Card Component
const SectionCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, icon, children, action }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 dark:text-slate-400">{icon}</span>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{title}</h3>
      </div>
      {action}
    </div>
    <div className="p-2">{children}</div>
  </div>
);

// Quick Action Button
const QuickAction: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}> = ({ icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:scale-105 ${color}`}
  >
    <div className="size-10 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

// =============================================================================
// Main Component
// =============================================================================

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  const [user, setUser] = useState<Officer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'groups' | 'roles'>('info');

  // Selection Panels State
  const [showRolesPanel, setShowRolesPanel] = useState(false);
  const [showGroupsPanel, setShowGroupsPanel] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<AvailableRole[]>([]);
  const [availableGroups, setAvailableGroups] = useState<AvailableGroup[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<Set<number>>(new Set());
  const [selectedGroupIds, setSelectedGroupIds] = useState<Set<number>>(new Set());
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [savingRoles, setSavingRoles] = useState(false);
  const [savingGroups, setSavingGroups] = useState(false);

  // Confirm Dialogs
  const deleteDialog = useConfirmDialog<Officer>({
    onConfirm: async (officer) => {
      await handleDelete(officer);
    },
  });

  const deactivateDialog = useConfirmDialog<Officer>({
    onConfirm: async (officer) => {
      await handleToggleActive(officer);
    },
  });

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/settings/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      setUser(data.data || data);
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  // Fetch available roles
  const fetchAvailableRoles = useCallback(async () => {
    try {
      setLoadingRoles(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/settings/roles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const roles = data.data || data || [];
      setAvailableRoles(roles);
      
      // Set initially selected (roles user already has)
      const userRoleIds = new Set<number>();
      if (user?.roles) {
        user.roles.forEach(r => userRoleIds.add(r.role_id));
      }
      setSelectedRoleIds(userRoleIds);
    } catch (err) {
      console.error('Error fetching roles:', err);
    } finally {
      setLoadingRoles(false);
    }
  }, [user?.roles]);

  // Fetch available groups
  const fetchAvailableGroups = useCallback(async () => {
    try {
      setLoadingGroups(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/settings/groups', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const groups = data.data || data || [];
      setAvailableGroups(groups);
      
      // Set initially selected (groups user already has)
      const userGroupIds = new Set<number>();
      if (user?.groups) {
        user.groups.forEach(g => userGroupIds.add(g.group_id));
      }
      setSelectedGroupIds(userGroupIds);
    } catch (err) {
      console.error('Error fetching groups:', err);
    } finally {
      setLoadingGroups(false);
    }
  }, [user?.groups]);

  // Open roles panel
  const openRolesPanel = () => {
    setShowRolesPanel(true);
    fetchAvailableRoles();
  };

  // Open groups panel
  const openGroupsPanel = () => {
    setShowGroupsPanel(true);
    fetchAvailableGroups();
  };

  // Toggle role selection
  const toggleRoleSelection = (roleId: number) => {
    setSelectedRoleIds(prev => {
      const next = new Set(prev);
      if (next.has(roleId)) {
        next.delete(roleId);
      } else {
        next.add(roleId);
      }
      return next;
    });
  };

  // Toggle group selection
  const toggleGroupSelection = (groupId: number) => {
    setSelectedGroupIds(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  // Save roles
  const saveRoles = async () => {
    try {
      setSavingRoles(true);
      const token = localStorage.getItem('token');
      
      // Get current user role IDs
      const currentRoleIds = new Set(user?.roles?.map(r => r.role_id) || []);
      
      // Roles to add (in selected but not in current)
      const toAdd = [...selectedRoleIds].filter(id => !currentRoleIds.has(id));
      
      // Roles to remove (in current but not in selected)
      const toRemove = [...currentRoleIds].filter(id => !selectedRoleIds.has(id));
      
      // Add new roles
      for (const roleId of toAdd) {
        await fetch(`/api/v1/settings/users/${userId}/roles`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role_id: roleId }),
        });
      }
      
      // Remove roles
      for (const roleId of toRemove) {
        await fetch(`/api/v1/settings/users/${userId}/roles/${roleId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      
      await fetchUser();
      setShowRolesPanel(false);
    } catch (err) {
      console.error('Error saving roles:', err);
    } finally {
      setSavingRoles(false);
    }
  };

  // Save groups
  const saveGroups = async () => {
    try {
      setSavingGroups(true);
      const token = localStorage.getItem('token');
      
      // Get current user group IDs
      const currentGroupIds = new Set(user?.groups?.map(g => g.group_id) || []);
      
      // Groups to add (in selected but not in current)
      const toAdd = [...selectedGroupIds].filter(id => !currentGroupIds.has(id));
      
      // Groups to remove (in current but not in selected)
      const toRemove = [...currentGroupIds].filter(id => !selectedGroupIds.has(id));
      
      // Add new groups
      for (const groupId of toAdd) {
        await fetch(`/api/v1/settings/users/${userId}/groups`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ group_id: groupId }),
        });
      }
      
      // Remove groups
      for (const groupId of toRemove) {
        await fetch(`/api/v1/settings/users/${userId}/groups/${groupId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      
      await fetchUser();
      setShowGroupsPanel(false);
    } catch (err) {
      console.error('Error saving groups:', err);
    } finally {
      setSavingGroups(false);
    }
  };

  // Quick remove role
  const handleRemoveRole = async (roleId: number) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/v1/settings/users/${userId}/roles/${roleId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchUser();
  };

  // Quick remove group
  const handleRemoveGroup = async (groupId: number) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/v1/settings/users/${userId}/groups/${groupId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchUser();
  };

  const handleDelete = async (officer: Officer) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/v1/settings/users/${officer.id || officer.officer_id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    router.push('/settings/users');
  };

  const handleToggleActive = async (officer: Officer) => {
    const token = localStorage.getItem('token');
    const isActive = officer.officer_active === 'Y' || officer.is_active;
    await fetch(`/api/v1/settings/users/${officer.id || officer.officer_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ officer_active: isActive ? 'N' : 'Y' }),
    });
    fetchUser();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const isUserActive = (u: Officer) => {
    return u.officer_active === 'Y' || u.is_active === true;
  };

  // Loading State
  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Not Found State
  if (!user) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">ไม่พบข้อมูลผู้ใช้</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">ID: {userId}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl"
          >
            กลับ
          </button>
        </div>
      </AdminLayout>
    );
  }

  const active = isUserActive(user);
  const loginName = user.officer_login || user.officer_login_name || '';
  const displayName = user.officer_name || loginName;

  return (
    <AdminLayout>
      <div className="space-y-6 pb-24 lg:pb-6">
        {/* ============================================ */}
        {/* Header */}
        {/* ============================================ */}
        <div className="bg-linear-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl p-4 lg:p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 size-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 size-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          {/* Content */}
          <div className="relative">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">กลับ</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchUser}
                  disabled={loading}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => router.push(`/settings/users/${userId}/edit`)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {showMoreMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(false)} />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                        <button
                          onClick={() => {
                            router.push(`/settings/users/${userId}/edit`);
                            setShowMoreMenu(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <Edit size={14} /> แก้ไขข้อมูล
                        </button>
                        <button
                          onClick={() => {
                            router.push(`/settings/users/${userId}/groups`);
                            setShowMoreMenu(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <UsersRound size={14} /> จัดการกลุ่ม
                        </button>
                        <button
                          onClick={() => {
                            router.push(`/settings/users/${userId}/roles`);
                            setShowMoreMenu(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <Shield size={14} /> จัดการสิทธิ์
                        </button>
                        <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                        {active ? (
                          <button
                            onClick={() => {
                              deactivateDialog.open(user);
                              setShowMoreMenu(false);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                          >
                            <StopCircle size={14} /> ปิดใช้งาน
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleToggleActive(user);
                              setShowMoreMenu(false);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                          >
                            <CheckCircle size={14} /> เปิดใช้งาน
                          </button>
                        )}
                        <button
                          onClick={() => {
                            deleteDialog.open(user);
                            setShowMoreMenu(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 size={14} /> ลบผู้ใช้
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div
                  className={`size-20 lg:size-24 backdrop-blur rounded-2xl flex items-center justify-center text-2xl font-bold ${
                    active ? 'bg-white/20' : 'bg-slate-500/50'
                  }`}
                >
                  {getInitials(displayName)}
                </div>
                <div className="lg:hidden">
                  <h1 className="text-xl font-bold">{displayName}</h1>
                  <p className="text-white/80 font-mono">@{loginName}</p>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="hidden lg:block text-2xl font-bold mb-1">{displayName}</h1>
                <p className="hidden lg:block text-white/80 font-mono mb-3">@{loginName}</p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      active ? 'bg-emerald-500/30 text-emerald-100' : 'bg-slate-500/30 text-slate-200'
                    }`}
                  >
                    {active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {active ? 'ใช้งานอยู่' : 'ไม่ใช้งาน'}
                  </span>
                  {user.groups && user.groups.length > 0 && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {user.groups.length} กลุ่ม
                    </span>
                  )}
                  {user.roles && user.roles.length > 0 && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {user.roles.length} สิทธิ์
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* Quick Actions - Mobile */}
        {/* ============================================ */}
        <div className="lg:hidden grid grid-cols-3 gap-2">
          <QuickAction
            icon={<Edit size={20} className="text-amber-600" />}
            label="แก้ไข"
            color="bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-600"
            onClick={() => router.push(`/settings/users/${userId}/edit`)}
          />
          <QuickAction
            icon={<UsersRound size={20} className="text-purple-600" />}
            label="กลุ่ม"
            color="bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 text-purple-600"
            onClick={openGroupsPanel}
          />
          <QuickAction
            icon={<Shield size={20} className="text-blue-600" />}
            label="สิทธิ์"
            color="bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-600"
            onClick={openRolesPanel}
          />
        </div>

        {/* ============================================ */}
        {/* Tab Navigation - Mobile */}
        {/* ============================================ */}
        <div className="lg:hidden flex border-b border-slate-200 dark:border-slate-800">
          {[
            { id: 'info', label: 'ข้อมูล', icon: User },
            { id: 'groups', label: 'กลุ่ม', icon: UsersRound },
            { id: 'roles', label: 'สิทธิ์', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'info' | 'groups' | 'roles')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================ */}
        {/* Main Content */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info Cards */}
          <div className={`lg:col-span-2 space-y-6 ${activeTab !== 'info' && 'hidden lg:block'}`}>
            {/* Basic Info */}
            <SectionCard title="ข้อมูลทั่วไป" icon={<User size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <InfoItem icon={<Key size={18} />} label="ชื่อเข้าระบบ" value={loginName} copyable />
                <InfoItem icon={<User size={18} />} label="ชื่อ-นามสกุล" value={user.officer_name} />
                <InfoItem icon={<Building2 size={18} />} label="ตำแหน่ง" value={user.officer_position} />
                <InfoItem icon={<Mail size={18} />} label="อีเมล" value={user.officer_email} copyable />
                <InfoItem icon={<Phone size={18} />} label="เบอร์โทร" value={user.officer_phone} />
              </div>
            </SectionCard>

            {/* Groups - Desktop */}
            <div className="hidden lg:block">
              <SectionCard
                title="กลุ่มที่สังกัด"
                icon={<UsersRound size={18} />}
                action={
                  <button
                    onClick={openGroupsPanel}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-lg hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors"
                  >
                    <Plus size={14} />
                    เพิ่ม
                  </button>
                }
              >
                {user.groups && user.groups.length > 0 ? (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {user.groups.map((group) => (
                      <div
                        key={group.id}
                        className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl flex items-center justify-between group/item"
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                            <UsersRound size={18} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{group.group_name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{group.group_code}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {group.is_primary && (
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                              กลุ่มหลัก
                            </span>
                          )}
                          <button
                            onClick={() => handleRemoveGroup(group.group_id)}
                            className="p-1.5 opacity-0 group-hover/item:opacity-100 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 rounded-lg transition-all"
                            title="ลบออกจากกลุ่ม"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <div className="size-16 mx-auto mb-3 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center">
                      <UsersRound size={28} className="text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">ยังไม่ได้สังกัดกลุ่มใดๆ</p>
                    <button
                      onClick={openGroupsPanel}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <Plus size={16} />
                      เพิ่มในกลุ่ม
                    </button>
                  </div>
                )}
              </SectionCard>
            </div>

            {/* Roles - Desktop */}
            <div className="hidden lg:block">
              <SectionCard
                title="สิทธิ์การใช้งาน"
                icon={<Shield size={18} />}
                action={
                  <button
                    onClick={openRolesPanel}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-lg hover:bg-primary-200 dark:hover:bg-primary-500/30 transition-colors"
                  >
                    <Plus size={14} />
                    เพิ่ม
                  </button>
                }
              >
                {user.roles && user.roles.length > 0 ? (
                  <div className="p-2 flex flex-wrap gap-2">
                    {user.roles.map((role) => (
                      <div
                        key={role.id}
                        className="group/role flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20 hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors"
                      >
                        <Shield size={14} className="text-primary-600 dark:text-primary-400" />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{role.role_name}</span>
                        <button
                          onClick={() => handleRemoveRole(role.role_id)}
                          className="p-1 opacity-0 group-hover/role:opacity-100 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 rounded-md transition-all"
                          title="ลบสิทธิ์"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <div className="size-16 mx-auto mb-3 bg-primary-100 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center">
                      <Shield size={28} className="text-primary-400" />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">ยังไม่มีสิทธิ์การใช้งาน</p>
                    <button
                      onClick={openRolesPanel}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <Plus size={16} />
                      เพิ่มสิทธิ์
                    </button>
                  </div>
                )}
              </SectionCard>
            </div>
          </div>

          {/* Groups - Mobile Tab */}
          <div className={`lg:hidden space-y-6 ${activeTab !== 'groups' && 'hidden'}`}>
            <SectionCard
              title="กลุ่มที่สังกัด"
              icon={<UsersRound size={18} />}
              action={
                <button
                  onClick={openGroupsPanel}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-lg"
                >
                  <Plus size={14} />
                  เพิ่ม
                </button>
              }
            >
              {user.groups && user.groups.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {user.groups.map((group) => (
                    <div
                      key={group.id}
                      className="p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                          <UsersRound size={18} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{group.group_name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{group.group_code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {group.is_primary && (
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                            หลัก
                          </span>
                        )}
                        <button
                          onClick={() => handleRemoveGroup(group.group_id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 rounded-lg"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <UsersRound size={32} className="mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm text-slate-400 mb-3">ยังไม่ได้สังกัดกลุ่มใดๆ</p>
                  <button
                    onClick={openGroupsPanel}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-xl"
                  >
                    <Plus size={16} />
                    เพิ่มในกลุ่ม
                  </button>
                </div>
              )}
            </SectionCard>
          </div>

          {/* Roles - Mobile Tab */}
          <div className={`lg:hidden space-y-6 ${activeTab !== 'roles' && 'hidden'}`}>
            <SectionCard
              title="สิทธิ์การใช้งาน"
              icon={<Shield size={18} />}
              action={
                <button
                  onClick={openRolesPanel}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-lg"
                >
                  <Plus size={14} />
                  เพิ่ม
                </button>
              }
            >
              {user.roles && user.roles.length > 0 ? (
                <div className="p-2 flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <div
                      key={role.id}
                      className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20"
                    >
                      <Shield size={14} className="text-primary-600 dark:text-primary-400" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{role.role_name}</span>
                      <button
                        onClick={() => handleRemoveRole(role.role_id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 rounded-md"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Shield size={32} className="mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm text-slate-400 mb-3">ยังไม่มีสิทธิ์การใช้งาน</p>
                  <button
                    onClick={openRolesPanel}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl"
                  >
                    <Plus size={16} />
                    เพิ่มสิทธิ์
                  </button>
                </div>
              )}
            </SectionCard>
          </div>

          {/* Right Column - Actions & System Info */}
          <div className={`space-y-6 ${activeTab !== 'info' && 'lg:block hidden'}`}>
            {/* Quick Actions - Desktop */}
            <div className="hidden lg:block">
              <SectionCard title="ดำเนินการ" icon={<Activity size={18} />}>
                <div className="grid grid-cols-2 gap-2 p-2">
                  <button
                    onClick={() => router.push(`/settings/users/${userId}/edit`)}
                    className="flex flex-col items-center gap-2 p-4 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
                  >
                    <Edit size={24} />
                    <span className="text-xs font-medium">แก้ไขข้อมูล</span>
                  </button>
                  <button
                    onClick={openGroupsPanel}
                    className="flex flex-col items-center gap-2 p-4 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors"
                  >
                    <UsersRound size={24} />
                    <span className="text-xs font-medium">จัดการกลุ่ม</span>
                  </button>
                  <button
                    onClick={openRolesPanel}
                    className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  >
                    <Shield size={24} />
                    <span className="text-xs font-medium">จัดการสิทธิ์</span>
                  </button>
                  {active ? (
                    <button
                      onClick={() => deactivateDialog.open(user)}
                      className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <StopCircle size={24} />
                      <span className="text-xs font-medium">ปิดใช้งาน</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleActive(user)}
                      className="flex flex-col items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
                    >
                      <CheckCircle size={24} />
                      <span className="text-xs font-medium">เปิดใช้งาน</span>
                    </button>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* System Info */}
            <SectionCard title="ข้อมูลระบบ" icon={<Activity size={18} />}>
              <div className="space-y-1">
                <InfoItem icon={<Calendar size={18} />} label="วันที่สร้าง" value={formatDate(user.created_at)} />
                <InfoItem icon={<Clock size={18} />} label="แก้ไขล่าสุด" value={formatDate(user.updated_at)} />
                <InfoItem icon={<Activity size={18} />} label="เข้าสู่ระบบล่าสุด" value={formatDate(user.last_login)} />
              </div>
            </SectionCard>

            {/* Delete Action - Desktop */}
            <div className="hidden lg:block">
              <button
                onClick={() => deleteDialog.open(user)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors"
              >
                <Trash2 size={18} />
                <span className="font-medium">ลบผู้ใช้</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* Mobile Bottom Action Bar */}
        {/* ============================================ */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 lg:hidden z-40">
          <button
            onClick={() => router.push(`/settings/users/${userId}/edit`)}
            className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30"
          >
            <Edit size={20} />
            แก้ไขข้อมูลผู้ใช้
          </button>
        </div>
      </div>

      {/* ========== Delete Confirm Dialog ========== */}
      <ConfirmDialog
        {...deleteDialog.dialogProps}
        variant="danger"
        title="ลบผู้ใช้"
        message={
          <>
            คุณต้องการลบ <strong>{user.officer_name}</strong> ใช่หรือไม่?
            <span className="block text-red-500 mt-2 text-sm">⚠️ การลบผู้ใช้จะไม่สามารถกู้คืนได้</span>
          </>
        }
        confirmText="ลบผู้ใช้"
      />

      {/* ========== Deactivate Confirm Dialog ========== */}
      <ConfirmDialog
        {...deactivateDialog.dialogProps}
        variant="warning"
        icon={StopCircle}
        title="ปิดใช้งานผู้ใช้"
        message={
          <>
            คุณต้องการปิดใช้งาน <strong>{user.officer_name}</strong> ใช่หรือไม่?
            <span className="block text-amber-600 mt-2 text-sm">⚠️ ผู้ใช้จะไม่สามารถเข้าสู่ระบบได้</span>
          </>
        }
        confirmText="ปิดใช้งาน"
      />

      {/* ========== Roles Selection Panel ========== */}
      <SelectionPanel
        isOpen={showRolesPanel}
        onClose={() => setShowRolesPanel(false)}
        title="เลือกสิทธิ์การใช้งาน"
        icon={<Shield size={20} />}
        items={availableRoles.map(r => ({ id: r.id, code: r.role_code, name: r.role_name, description: r.role_description }))}
        selectedIds={selectedRoleIds}
        onToggle={toggleRoleSelection}
        onSave={saveRoles}
        saving={savingRoles}
        loading={loadingRoles}
        color="blue"
        itemIcon={<Shield size={16} />}
      />

      {/* ========== Groups Selection Panel ========== */}
      <SelectionPanel
        isOpen={showGroupsPanel}
        onClose={() => setShowGroupsPanel(false)}
        title="เลือกกลุ่มผู้ใช้"
        icon={<UsersRound size={20} />}
        items={availableGroups.map(g => ({ id: g.id, code: g.group_code, name: g.group_name, description: g.group_description }))}
        selectedIds={selectedGroupIds}
        onToggle={toggleGroupSelection}
        onSave={saveGroups}
        saving={savingGroups}
        loading={loadingGroups}
        color="purple"
        itemIcon={<UsersRound size={16} />}
      />
    </AdminLayout>
  );
}
