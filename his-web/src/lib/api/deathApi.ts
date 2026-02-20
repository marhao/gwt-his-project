// =============================================================================
// File: src/lib/api/deathApi.ts
// Description: API service for Death module
// =============================================================================

import api from './client'
import type {
  DeathRecord,
  DeathLookups,
  Icd10Item,
  DoctorItem,
} from '@/types/death.types'

// Helper: build query string from object
function toQuery(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ''
  )
  if (entries.length === 0) return ''
  const qs = entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&')
  return `?${qs}`
}

const BASE = '/deaths'
const LOOKUPS_BASE = '' // client baseUrl already has /api/v1

export const deathApi = {
  // CRUD
  async list(hn: string, params?: Record<string, unknown>) {
    const query = toQuery({ hn, ...params })
    return api.get<{ success: boolean; data: any }>(`${BASE}${query}`)
  },

  async getById(id: number) {
    return api.get<{ success: boolean; data: DeathRecord }>(`${BASE}/${id}`)
  },

  async create(data: Partial<DeathRecord>) {
    return api.post<{ success: boolean; data: DeathRecord }>(BASE, data)
  },

  async update(id: number, data: Partial<DeathRecord>) {
    return api.put<{ success: boolean; data: DeathRecord }>(`${BASE}/${id}`, data)
  },

  async delete(id: number) {
    return api.delete<{ success: boolean; message: string }>(`${BASE}/${id}`)
  },

  // Lookups (static, โหลดครั้งเดียว)
  async getLookups() {
    return api.get<{ success: boolean; data: DeathLookups }>('/lookups/deaths')
  },

  // Search (autocomplete)
  async searchIcd10(q: string, limit = 20) {
    const query = toQuery({ q, limit })
    return api.get<{ success: boolean; data: Icd10Item[] }>(`/lookups/icd10${query}`)
  },

  async searchDoctors(q: string, limit = 20) {
    const query = toQuery({ q, limit })
    return api.get<{ success: boolean; data: DoctorItem[] }>(`/lookups/doctors${query}`)
  },

  async searchPatients(q: string, limit = 20) {
    const query = toQuery({ q, limit })
    return api.get<{ success: boolean; data: any[] }>(`/lookups/patients${query}`)
  },
}