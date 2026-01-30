// =============================================================================
// File: src/app/settings/groups/[id]/users/page.tsx
// Description: Manage Group Members - จัดการสมาชิกในกลุ่ม
// =============================================================================

'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  UserPlus,
  UserMinus,
  Users,
  Check,
  X,
  Loader2,
  RefreshCw,
  Star,
  StarOff,
  Mail,
  Phone,
} from 'lucide-react';

import { AdminLayout } from '@/components/layout';
import { settingsApi } from '@/lib/api';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';

interface GroupMember {
  id: number;
  username: string;
  full_name: string;
  email: string | null;
  is_primary: number;
}

interface AvailableUser {
  id: number;
  officer_login: string;
  officer_name: string;
  officer_email: string | null;
  officer_phone: string | null;
  officer_position?: string;
  is_active: boolean;
}

interface Group {
  id: number;
  group_code: string;
  group_name: string;
  description: string | null;
}

export default function GroupUsersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const groupId = parseInt(id);

  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [availableUsers, setAvailableUsers] = useState<AvailableUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addSearchTerm, setAddSearchTerm] = useState('');
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [addingUser, setAddingUser] = useState<number | null>(null);
  const [removingUser, setRemovingUser] = useState<number | null>(null);

  const removeDialog = useConfirmDialog<GroupMember>({
    onConfirm: async (member) => {
      await handleRemoveMember(member);
    },
  });

  useEffect(() => {
    fetchGroupAndMembers();
  }, [groupId]);

  const fetchGroupAndMembers = async () => {
    setLoading(true);
    try {
      // Fetch group details
      const groupResult = await settingsApi.groups.getById(groupId);
      if (groupResult.success && groupResult.data) {
        setGroup(groupResult.data as unknown as Group);
      }

      // Fetch members - use direct API call since we need custom endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/api/v1/settings/groups/${groupId}/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const membersResult = await response.json();
      if (membersResult.success) {
        setMembers(membersResult.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch group data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableUsers = async () => {
    setLoadingUsers(true);
    try {
      // Fetch all officers from settings/users endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/api/v1/settings/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (result.data) {
        // Filter out users already in the group
        const memberIds = members.map(m => m.id);
        const available = (result.data || []).filter(
          (user: AvailableUser) => !memberIds.includes(user.id)
        );
        setAvailableUsers(available);
      }
    } catch (error) {
      console.error('Failed to fetch available users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAddMember = async (user: AvailableUser) => {
    setAddingUser(user.id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/api/v1/settings/groups/${groupId}/users/${user.id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_primary: 0 }),
        }
      );
      const result = await response.json();
      if (result.message) {
        // Add to members list
        setMembers(prev => [...prev, {
          id: user.id,
          username: user.officer_login,
          full_name: user.officer_name,
          email: user.officer_email,
          is_primary: 0,
        }]);
        // Remove from available
        setAvailableUsers(prev => prev.filter(u => u.id !== user.id));
      }
    } catch (error) {
      console.error('Failed to add member:', error);
    } finally {
      setAddingUser(null);
    }
  };

  const handleRemoveMember = async (member: GroupMember) => {
    setRemovingUser(member.id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/api/v1/settings/groups/${groupId}/users/${member.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const result = await response.json();
      if (result.message) {
        setMembers(prev => prev.filter(m => m.id !== member.id));
      }
    } catch (error) {
      console.error('Failed to remove member:', error);
    } finally {
      setRemovingUser(null);
    }
  };

  const handleTogglePrimary = async (member: GroupMember) => {
    // This would require an API endpoint to update is_primary
    // For now, just show the concept
    console.log('Toggle primary for:', member);
  };

  const filteredMembers = members.filter(member =>
    member.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableUsers = availableUsers.filter(user =>
    user.officer_login?.toLowerCase().includes(addSearchTerm.toLowerCase()) ||
    user.officer_name?.toLowerCase().includes(addSearchTerm.toLowerCase()) ||
    user.officer_email?.toLowerCase().includes(addSearchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-24">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-500">Loading group members...</span>
          </div>
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
            <button
              onClick={() => router.back()}
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Group Members
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                จัดการสมาชิกในกลุ่ม <span className="text-green-500 font-medium">{group?.group_name}</span>
                {' '}• {members.length} members
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowAddPanel(!showAddPanel);
              if (!showAddPanel && availableUsers.length === 0) {
                fetchAvailableUsers();
              }
            }}
            className={`px-4 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-all ${
              showAddPanel
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                : 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/25'
            }`}
          >
            {showAddPanel ? <X size={18} /> : <UserPlus size={18} />}
            {showAddPanel ? 'Close' : 'Add Members'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Members */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users size={18} className="text-green-500" />
                  Current Members
                </h2>
                <button
                  onClick={fetchGroupAndMembers}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {filteredMembers.length === 0 ? (
                <div className="p-8 text-center">
                  <Users size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-slate-500 text-sm">No members in this group</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium">
                            {member.full_name?.charAt(0) || member.username?.charAt(0) || '?'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-slate-900 dark:text-white">
                                {member.full_name || member.username}
                              </p>
                              {member.is_primary === 1 && (
                                <Star size={14} className="text-amber-500 fill-amber-500" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500">@{member.username}</p>
                            {member.email && (
                              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                <Mail size={10} />
                                {member.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleTogglePrimary(member)}
                            className={`p-2 rounded-lg transition-colors ${
                              member.is_primary === 1
                                ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10'
                                : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                            }`}
                            title={member.is_primary === 1 ? 'Primary group' : 'Set as primary'}
                          >
                            {member.is_primary === 1 ? <Star size={16} className="fill-amber-500" /> : <StarOff size={16} />}
                          </button>
                          <button
                            onClick={() => removeDialog.open(member)}
                            disabled={removingUser === member.id}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            title="Remove from group"
                          >
                            {removingUser === member.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <UserMinus size={16} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Members Panel */}
          {showAddPanel && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <UserPlus size={18} className="text-blue-500" />
                    Add Members
                  </h2>
                  <button
                    onClick={fetchAvailableUsers}
                    disabled={loadingUsers}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <RefreshCw size={16} className={loadingUsers ? 'animate-spin' : ''} />
                  </button>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users to add..."
                    value={addSearchTerm}
                    onChange={(e) => setAddSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="max-h-[500px] overflow-y-auto">
                {loadingUsers ? (
                  <div className="p-8 text-center">
                    <Loader2 size={24} className="mx-auto text-blue-500 animate-spin mb-3" />
                    <p className="text-slate-500 text-sm">Loading users...</p>
                  </div>
                ) : filteredAvailableUsers.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                    <p className="text-slate-500 text-sm">
                      {addSearchTerm ? 'No users found' : 'All users are already members'}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredAvailableUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                              {user.officer_name?.charAt(0) || user.officer_login?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {user.officer_name || user.officer_login}
                              </p>
                              <p className="text-xs text-slate-500">@{user.officer_login}</p>
                              {user.officer_email && (
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                  <Mail size={10} />
                                  {user.officer_email}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddMember(user)}
                            disabled={addingUser === user.id}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {addingUser === user.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Check size={14} />
                            )}
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Placeholder when add panel is hidden */}
          {!showAddPanel && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 flex flex-col items-center justify-center">
              <UserPlus size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 text-center mb-4">
                Click "Add Members" to add users to this group
              </p>
              <button
                onClick={() => {
                  setShowAddPanel(true);
                  if (availableUsers.length === 0) {
                    fetchAvailableUsers();
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition-colors"
              >
                Add Members
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Remove Confirm Dialog */}
      <ConfirmDialog
        {...removeDialog.dialogProps}
        variant="danger"
        title="นำออกจากกลุ่ม"
        message={
          <>
            คุณต้องการนำ <strong>{removeDialog.data?.full_name || removeDialog.data?.username}</strong> ออกจากกลุ่ม <strong>{group?.group_name}</strong> ใช่หรือไม่?
          </>
        }
        confirmText="นำออก"
      />
    </AdminLayout>
  );
}
