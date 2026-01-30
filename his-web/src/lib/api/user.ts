// src/lib/api/user.ts

import { api } from './client';
import type { ApiResponse } from './types';
import type { Role, Group } from './types/settings';

// ============================================
// User API
// ============================================

export const userApi = {
  // Get all users
  getAll: (params?: { page?: number; limit?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.search) query.set('search', params.search);
    const queryString = query.toString();
    return api.get<ApiResponse<unknown[]>>(`/users${queryString ? `?${queryString}` : ''}`);
  },

  // Get user by ID
  getById: (id: number) => api.get<ApiResponse<unknown>>(`/users/${id}`),

  // Create user
  create: (data: unknown) => api.post<ApiResponse<unknown>>('/users', data),

  // Update user
  update: (id: number, data: unknown) => api.put<ApiResponse<unknown>>(`/users/${id}`, data),

  // Delete user
  delete: (id: number) => api.delete<ApiResponse<void>>(`/users/${id}`),

  // Get user roles
  getRoles: (userId: number) => api.get<ApiResponse<Role[]>>(`/users/${userId}/roles`),

  // Assign roles to user
  assignRoles: (userId: number, roleIds: number[]) =>
    api.put<ApiResponse<void>>(`/users/${userId}/roles`, { roleIds }),

  // Get user groups
  getGroups: (userId: number) => api.get<ApiResponse<Group[]>>(`/users/${userId}/groups`),

  // Assign groups to user
  assignGroups: (userId: number, groupIds: number[]) =>
    api.put<ApiResponse<void>>(`/users/${userId}/groups`, { groupIds }),
};

export default userApi;