'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/layout';
import {
  Shield,
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Loader2,
  Check,
  X,
  Key
} from 'lucide-react';

interface Role {
  id: number;
  role_code: string;
  role_name: string;
  description?: string;
  is_active: boolean;
}

interface UserRole {
  id: number;
  role_id: number;
  role_code: string;
  role_name: string;
}

interface User {
  id: number;
  officer_login: string;
  officer_name: string;
}

export default function UserRolesPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

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
      
      // Fetch user's roles
      const rolesResponse = await fetch(`/api/v1/settings/users/${userId}/roles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (rolesResponse.ok) {
        const rolesData = await rolesResponse.json();
        setUserRoles(rolesData.data || rolesData || []);
      }
      
      // Fetch all available roles
      const allRolesResponse = await fetch('/api/v1/settings/roles/active', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (allRolesResponse.ok) {
        const allRolesData = await allRolesResponse.json();
        setAllRoles(allRolesData.data || allRolesData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoles = async () => {
    if (selectedRoles.length === 0) return;
    
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      for (const roleId of selectedRoles) {
        await fetch(`/api/v1/settings/users/${userId}/roles`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role_id: roleId }),
        });
      }
      
      setShowAddModal(false);
      setSelectedRoles([]);
      fetchData();
    } catch (error) {
      console.error('Error adding roles:', error);
      alert('ไม่สามารถเพิ่มสิทธิ์ได้');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveRole = async (roleId: number) => {
    if (!confirm('ต้องการยกเลิกสิทธิ์นี้?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/settings/users/${userId}/roles/${roleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove role');
      }
      
      fetchData();
    } catch (error) {
      console.error('Error removing role:', error);
      alert('ไม่สามารถยกเลิกสิทธิ์ได้');
    }
  };

  // Available roles (not yet added)
  const availableRoles = allRoles.filter(
    r => !userRoles.some(ur => ur.role_id === r.id)
  );

  // Filtered available roles for modal
  const filteredAvailableRoles = availableRoles.filter(
    r => r.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         r.role_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getRoleColor = (index: number) => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
    ];
    return colors[index % colors.length];
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
                    <h1 className="text-xl font-bold text-gray-900">จัดการสิทธิ์</h1>
                    <p className="text-sm text-gray-500">{user?.officer_name}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowAddModal(true)}
                disabled={availableRoles.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all shadow-md"
              >
                <Plus className="h-5 w-5" />
                <span>เพิ่มสิทธิ์</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">สิทธิ์ที่ได้รับ</p>
                  <p className="text-2xl font-bold text-gray-900">{userRoles.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Key className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">สิทธิ์ที่เหลือ</p>
                  <p className="text-2xl font-bold text-gray-900">{availableRoles.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Roles List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                สิทธิ์การใช้งาน
              </h3>
            </div>
            
            {userRoles.length === 0 ? (
              <div className="p-12 text-center">
                <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีสิทธิ์การใช้งาน</p>
                <p className="text-sm text-gray-500 mb-4">เพิ่มสิทธิ์เพื่อกำหนดการเข้าถึงระบบ</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  disabled={availableRoles.length === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  เพิ่มสิทธิ์
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {userRoles.map((role, index) => (
                  <div
                    key={role.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRoleColor(index)} flex items-center justify-center text-white shadow-lg`}>
                        <Shield className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{role.role_name}</h4>
                        <p className="text-sm text-gray-500">{role.role_code}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveRole(role.role_id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="ยกเลิกสิทธิ์"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Roles Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowAddModal(false);
              setSelectedRoles([]);
              setSearchTerm('');
            }}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  เพิ่มสิทธิ์
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedRoles([]);
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
                  placeholder="ค้นหาสิทธิ์..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {filteredAvailableRoles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p>ไม่พบสิทธิ์ที่สามารถเพิ่มได้</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAvailableRoles.map((role, index) => {
                    const isSelected = selectedRoles.includes(role.id);
                    return (
                      <button
                        key={role.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedRoles(prev => prev.filter(id => id !== role.id));
                          } else {
                            setSelectedRoles(prev => [...prev, role.id]);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getRoleColor(index)} flex items-center justify-center text-white`}>
                            <Shield className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{role.role_name}</p>
                            <p className="text-sm text-gray-500">{role.role_code}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
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
                  เลือก {selectedRoles.length} สิทธิ์
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedRoles([]);
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleAddRoles}
                    disabled={selectedRoles.length === 0 || saving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>กำลังบันทึก...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>เพิ่มสิทธิ์</span>
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
