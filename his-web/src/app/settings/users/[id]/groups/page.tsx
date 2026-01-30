'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/layout';
import {
  UsersRound,
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Star,
  StarOff,
  Loader2,
  Check,
  X
} from 'lucide-react';

interface Group {
  id: number;
  group_code: string;
  group_name: string;
  description?: string;
  is_active: boolean;
}

interface UserGroup {
  id: number;
  group_id: number;
  group_code: string;
  group_name: string;
  is_primary: boolean;
}

interface User {
  id: number;
  officer_login: string;
  officer_name: string;
}

export default function UserGroupsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch user info
      const userResponse = await fetch(`/api/v1/settings/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData.data || userData);
      }
      
      // Fetch user's groups
      const groupsResponse = await fetch(`/api/v1/settings/users/${userId}/groups`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (groupsResponse.ok) {
        const groupsData = await groupsResponse.json();
        setUserGroups(groupsData.data || groupsData || []);
      }
      
      // Fetch all available groups
      const allGroupsResponse = await fetch('/api/v1/settings/groups/active', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (allGroupsResponse.ok) {
        const allGroupsData = await allGroupsResponse.json();
        setAllGroups(allGroupsData.data || allGroupsData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGroups = async () => {
    if (selectedGroups.length === 0) return;
    
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      for (const groupId of selectedGroups) {
        await fetch(`/api/v1/settings/users/${userId}/groups`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ group_id: groupId }),
        });
      }
      
      setShowAddModal(false);
      setSelectedGroups([]);
      fetchData();
    } catch (error) {
      console.error('Error adding groups:', error);
      alert('ไม่สามารถเพิ่มกลุ่มได้');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveGroup = async (groupId: number) => {
    if (!confirm('ต้องการนำออกจากกลุ่มนี้?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/settings/users/${userId}/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove group');
      }
      
      fetchData();
    } catch (error) {
      console.error('Error removing group:', error);
      alert('ไม่สามารถนำออกจากกลุ่มได้');
    }
  };

  const handleTogglePrimary = async (group: UserGroup) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/v1/settings/users/${userId}/groups/${group.group_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_primary: !group.is_primary }),
      });
      
      fetchData();
    } catch (error) {
      console.error('Error updating primary:', error);
    }
  };

  // Available groups (not yet added)
  const availableGroups = allGroups.filter(
    g => !userGroups.some(ug => ug.group_id === g.id)
  );

  // Filtered available groups for modal
  const filteredAvailableGroups = availableGroups.filter(
    g => g.group_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         g.group_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-3">
                  {user && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(user.officer_name || user.officer_login)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">จัดการกลุ่ม</h1>
                    <p className="text-sm text-gray-500">{user?.officer_name}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowAddModal(true)}
                disabled={availableGroups.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 transition-all shadow-md"
              >
                <Plus className="h-5 w-5" />
                <span>เพิ่มในกลุ่ม</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UsersRound className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">สังกัดกลุ่ม</p>
                  <p className="text-2xl font-bold text-gray-900">{userGroups.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">กลุ่มหลัก</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userGroups.filter(g => g.is_primary).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Groups List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <UsersRound className="h-5 w-5 text-purple-600" />
                กลุ่มที่สังกัด
              </h3>
            </div>
            
            {userGroups.length === 0 ? (
              <div className="p-12 text-center">
                <UsersRound className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">ยังไม่ได้สังกัดกลุ่มใดๆ</p>
                <p className="text-sm text-gray-500 mb-4">เพิ่มผู้ใช้เข้ากลุ่มเพื่อจัดการสิทธิ์</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  disabled={availableGroups.length === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  เพิ่มในกลุ่ม
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {userGroups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                          <UsersRound className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{group.group_name}</h4>
                            {group.is_primary && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                <Star className="h-3 w-3" />
                                กลุ่มหลัก
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{group.group_code}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePrimary(group)}
                          className={`p-2 rounded-lg transition-colors ${
                            group.is_primary
                              ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                              : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'
                          }`}
                          title={group.is_primary ? 'ยกเลิกกลุ่มหลัก' : 'ตั้งเป็นกลุ่มหลัก'}
                        >
                          {group.is_primary ? (
                            <Star className="h-5 w-5 fill-current" />
                          ) : (
                            <StarOff className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleRemoveGroup(group.group_id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="นำออกจากกลุ่ม"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Groups Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowAddModal(false);
              setSelectedGroups([]);
              setSearchTerm('');
            }}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <UsersRound className="h-5 w-5 text-purple-600" />
                  เพิ่มในกลุ่ม
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedGroups([]);
                    setSearchTerm('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              {/* Search */}
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ค้นหากลุ่ม..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {filteredAvailableGroups.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UsersRound className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p>ไม่พบกลุ่มที่สามารถเพิ่มได้</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAvailableGroups.map((group) => {
                    const isSelected = selectedGroups.includes(group.id);
                    return (
                      <button
                        key={group.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedGroups(prev => prev.filter(id => id !== group.id));
                          } else {
                            setSelectedGroups(prev => [...prev, group.id]);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <UsersRound className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{group.group_name}</p>
                            <p className="text-sm text-gray-500">{group.group_code}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  เลือก {selectedGroups.length} กลุ่ม
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedGroups([]);
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleAddGroups}
                    disabled={selectedGroups.length === 0 || saving}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>กำลังบันทึก...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>เพิ่มในกลุ่ม</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
