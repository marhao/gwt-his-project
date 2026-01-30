// src/lib/api/lookups.ts

import { api } from './client';
import type {
  ApiResponse,
  LookupItem,
  PnameLookup,
  PttypeLookup,
  SubdistrictLookup,
  OvstistLookup,
  DepartmentLookup,
  DoctorLookup,
  SpcltyLookup,
  AddressSearchResult,
  OpdVisitLookups,
  PatientRegistrationLookups,
} from './types';

// ============================================
// Lookup API
// ============================================

export const lookupApi = {
  // =========================================
  // Personal Info Lookups
  // =========================================

  // คำนำหน้าชื่อ
  getPnames: (sex?: 'M' | 'F') =>
    api.get<ApiResponse<PnameLookup[]>>(
      `/lookups/pnames${sex ? `?sex=${sex}` : ''}`
    ),

  // อาชีพ
  getOccupations: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/occupations'),

  // เชื้อชาติ/สัญชาติ
  getNationalities: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/nationalities'),

  // ศาสนา
  getReligions: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/religions'),

  // สถานะสมรส
  getMarryStatuses: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/marry-statuses'),

  // การศึกษา
  getEducations: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/educations'),

  // สิทธิการรักษา
  getPttypes: (activeOnly = true) =>
    api.get<ApiResponse<PttypeLookup[]>>(
      `/lookups/pttypes?active=${activeOnly}`
    ),

  // ความสัมพันธ์
  getRelationTypes: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/relation-types'),

  // =========================================
  // Thai Address Lookups
  // =========================================

  // จังหวัด
  getProvinces: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/provinces'),

  // อำเภอ
  getDistricts: (chwpart: string) =>
    api.get<ApiResponse<LookupItem[]>>(
      `/lookups/districts?chwpart=${chwpart}`
    ),

  // ตำบล
  getSubdistricts: (chwpart: string, amppart: string) =>
    api.get<ApiResponse<SubdistrictLookup[]>>(
      `/lookups/subdistricts?chwpart=${chwpart}&amppart=${amppart}`
    ),

  // ค้นหาที่อยู่
  searchAddress: (q: string, limit = 20) =>
    api.get<ApiResponse<AddressSearchResult[]>>(
      `/lookups/address/search?q=${encodeURIComponent(q)}&limit=${limit}`
    ),

  // =========================================
  // Static Lookups
  // =========================================

  // หมู่เลือด
  getBloodGroups: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/blood-groups'),

  // Rh
  getBloodGroupRhs: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/blood-group-rhs'),

  // เพศ
  getSexes: () =>
    api.get<ApiResponse<LookupItem[]>>('/lookups/sexes'),

  // =========================================
  // OPD Visit Lookups
  // =========================================

  // ประเภทการมา
  getOvstists: () =>
    api.get<ApiResponse<OvstistLookup[]>>('/lookups/ovstists'),

  // แผนก/ห้องตรวจ
  getDepartments: (activeOnly = true) =>
    api.get<ApiResponse<DepartmentLookup[]>>(
      `/lookups/departments?active=${activeOnly}`
    ),

  // แพทย์
  getDoctors: (depcode?: string, activeOnly = true) => {
    const params = new URLSearchParams();
    if (depcode) params.append('depcode', depcode);
    params.append('active', String(activeOnly));
    return api.get<ApiResponse<DoctorLookup[]>>(
      `/lookups/doctors?${params.toString()}`
    );
  },

  // ความเชี่ยวชาญ
  getSpclties: () =>
    api.get<ApiResponse<SpcltyLookup[]>>('/lookups/spclties'),

  // ห้องตรวจ (clinic rooms)
  getClinics: (depcode?: string) =>
    api.get<ApiResponse<LookupItem[]>>(
      `/lookups/clinics${depcode ? `?depcode=${depcode}` : ''}`
    ),

  // =========================================
  // Combined Lookups (for specific pages)
  // =========================================

  // OPD ส่งตรวจ - ดึงทั้งหมดในครั้งเดียว
  getOpdVisitLookups: () =>
    api.get<ApiResponse<OpdVisitLookups>>('/lookups/opd-visit'),

  // ลงทะเบียนผู้ป่วย - ดึงทั้งหมดในครั้งเดียว
  getPatientRegistrationLookups: () =>
    api.get<ApiResponse<PatientRegistrationLookups>>('/lookups/patient-registration'),
};

export default lookupApi;