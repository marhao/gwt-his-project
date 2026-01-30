// src/lib/api/types/common.ts

// ============================================
// Common API Types
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }
  
  export interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  }
  
  export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    meta: PaginationMeta;
  }
  
  // ============================================
  // Lookup Types
  // ============================================
  
  export interface LookupItem {
    code: string;
    name: string;
  }
  
  export interface LookupItemWithLabel extends LookupItem {
    label: string;
  }
  
  export interface PnameLookup extends LookupItem {
    ename?: string;
    sex?: string;
  }
  
  export interface PttypeLookup extends LookupItem {
    is_active: boolean;
    pcode?: string;
    nhso_code?: string;
    label?: string;
  }
  
  export interface SubdistrictLookup extends LookupItem {
    pocode?: string;
    full_name?: string;
  }
  
  export interface OvstistLookup extends LookupItem {
    label?: string;
  }
  
  export interface DepartmentLookup extends LookupItem {
    isActive?: boolean;
    label?: string;
    spclty?: string;
  }
  
  export interface DoctorLookup extends LookupItem {
    licenseNo?: string | null;
    depcode?: string | null;
    specialty?: string | null;
    isActive?: boolean;
    label?: string;
  }
  
  export interface SpcltyLookup extends LookupItem {
    label?: string;
  }
  
  export interface AddressSearchResult {
    addressid?: string;
    code: string;
    name: string;
    full_name: string;
    chwpart: string;
    amppart: string;
    tmbpart: string;
    pocode: string;
  }
  
  // ============================================
  // Combined Lookup Types
  // ============================================
  
  export interface OpdVisitLookups {
    ovstists: OvstistLookup[];
    pttypes: PttypeLookup[];
    departments: DepartmentLookup[];
    doctors: DoctorLookup[];
    spclties: SpcltyLookup[];
  }
  
  export interface PatientRegistrationLookups {
    pnames: PnameLookup[];
    occupations: LookupItem[];
    nationalities: LookupItem[];
    religions: LookupItem[];
    marryStatuses: LookupItem[];
    educations: LookupItem[];
    pttypes: PttypeLookup[];
    provinces: LookupItem[];
    bloodGroups: LookupItem[];
    bloodGroupRhs: LookupItem[];
    sexes: LookupItem[];
  }