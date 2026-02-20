import { ApiResponse, MenuItem, Role, RoleMenuAccess, Group, Permission } from '@/types';
import { 
  PatientListItem, 
  PatientDetail, 
  PatientFormData, 
  PatientSearchParams, 
  PatientListResponse, 
  PatientStats 
} from '@/types/patient.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api/v1';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

interface ApiError {
  message: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.authToken = token;
  }

  private getToken(): string | null {
    if (this.authToken) {
      return this.authToken;
    }
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.authToken = storedToken;
        return storedToken;
      }
    }
    return null;
  }

  clearToken() {
    this.authToken = null;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, token } = options;

    const authToken = token || this.getToken();

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || 'An error occurred',
          status: response.status,
        };

        if (response.status === 401) {
          this.clearToken();
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }
          }
        }

        throw error;
      }

      return data as T;
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      throw {
        message: 'Network error. Please check your connection.',
        status: 0,
      } as ApiError;
    }
  }

  get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  put<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  patch<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

// ============================================
// Auth API
// ============================================
export const authApi = {
  login: (username: string, password: string) =>
    api.post<{
      success: boolean;
      data: {
        token: string;
        expiresIn: number;
        user: {
          officerId: number;
          username: string;
          name: string;
          role: string;
          department: string | null;
          permissions: string[];
        };
        loginInfo: {
          clientIP: string;
          serverIP: string;
          serverMAC: string;
          serverHostname: string;
          loginTime: string;
        };
      };
    }>('/auth/login', { username, password }),

  logout: () => {
    api.clearToken();
    return api.post('/auth/logout');
  },

  refreshToken: () => api.post<{ token: string }>('/auth/refresh'),

  me: () => api.get<{ success: boolean; data: { user: unknown } }>('/auth/me'),
};

// ============================================
// Lookup Item Interface
// ============================================
export interface LookupItem {
  code: string;
  name: string;
}

export interface PnameLookup extends LookupItem {
  ename?: string;
  sex?: string;
}

export interface PttypeLookup extends LookupItem {
  is_active: boolean;
  pcode?: string;
  nhso_code?: string;
}

export interface SubdistrictLookup extends LookupItem {
  pocode?: string;
  full_name?: string;
}

export interface OvstistLookup extends LookupItem {
  ovstist: string;
  name: string;
}

export interface AddressSearchResult {
  code: string;
  name: string;
  full_name: string;
  chwpart: string;
  amppart: string;
  tmbpart: string;
  pocode: string;
}

// ============================================
// Lookup API
// ============================================
export const lookupApi = {
  // คำนำหน้าชื่อ
  getPnames: (sex?: 'M' | 'F') =>
    api.get<{ success: boolean; data: PnameLookup[] }>(
      `/lookups/pnames${sex ? `?sex=${sex}` : ''}`
    ),

  // อาชีพ
  getOccupations: () =>
    api.get<{ success: boolean; data: LookupItem[] }>('/lookups/occupations'),

  // เชื้อชาติ/สัญชาติ
  getNationalities: () =>
    api.get<{ success: boolean; data: LookupItem[] }>('/lookups/nationalities'),

  // ศาสนา
  getReligions: () =>
    api.get<{ success: boolean; data: LookupItem[] }>('/lookups/religions'),

  // สถานะสมรส
  getMarryStatuses: () =>
    api.get<{ success: boolean; data: LookupItem[] }>('/lookups/marry-statuses'),

  // การศึกษา
  getEducations: () =>
    api.get<{ success: boolean; data: LookupItem[] }>('/lookups/educations'),

  // สิทธิการรักษา
  getPttypes: (activeOnly = true) =>
    api.get<{ success: boolean; data: PttypeLookup[] }>(
      `/lookups/pttypes?active=${activeOnly}`
    ),

  // ความสัมพันธ์
  getRelationTypes: () =>
    api.get<{ success: boolean; data: LookupItem[] }>('/lookups/relation-types'),

  // จังหวัด
  getProvinces: () =>
    api.get<{ success: boolean; data: LookupItem[] }>('/lookups/provinces'),

  // อำเภอ
  getDistricts: (chwpart: string) =>
    api.get<{ success: boolean; data: LookupItem[] }>(
      `/lookups/districts?chwpart=${chwpart}`
    ),

  // ตำบล
  getSubdistricts: (chwpart: string, amppart: string) =>
    api.get<{ success: boolean; data: SubdistrictLookup[] }>(
      `/lookups/subdistricts?chwpart=${chwpart}&amppart=${amppart}`
    ),

  // ค้นหาที่อยู่
  searchAddress: (q: string, limit = 20) =>
    api.get<{ success: boolean; data: AddressSearchResult[] }>(
      `/lookups/search-address?q=${encodeURIComponent(q)}&limit=${limit}`
    ),

   // ประเภทการมา
   getOvstists: () =>
    api.get<{ success: boolean; data: OvstistLookup[] }>('/lookups/ovstists'),

};

// ============================================
// Patient API Response Types
// ============================================
interface PatientApiListResponse {
  success: boolean;
  data: Array<{
    hn: string;
    cid: string | null;
    full_name: string;
    sex: 'M' | 'F' | null;
    age: number | null;
    birthday: string | null;
    phone: string | null;
    pttype: string | null;
    pttype_name?: string;
    bloodgrp: string | null;
    has_allergy: boolean;
    last_visit: string | null;
    is_dead: boolean;
  }>;
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

interface PatientApiDetailResponse {
  success: boolean;
  data: Record<string, unknown> & {
    lookups?: {
      pname_name?: string;
      pttype_name?: string;
      occupation_name?: string;
      nationality_name?: string;
      religion_name?: string;
      education_name?: string;
      marrystatus_name?: string;
      chwpart_name?: string;
      amppart_name?: string;
      tmbpart_name?: string;
    };
  };
}

interface PatientApiSearchResponse {
  success: boolean;
  data: Array<{
    hn: string;
    cid: string | null;
    full_name: string;
    sex: 'M' | 'F' | null;
    age: number | null;
    birthday: string | null;
    pttype: string | null;
    death?: string | null; 
  }>;
}

interface PatientApiStatsResponse {
  success: boolean;
  data: PatientStats;
}

// ============================================
// Transform Functions
// ============================================
const transformPatientListItem = (item: PatientApiListResponse['data'][0]): PatientListItem => ({
  hn: item.hn,
  fullName: item.full_name,
  cid: item.cid,
  sex: item.sex,
  age: item.age,
  birthday: item.birthday,
  phone: item.phone,
  pttype: item.pttype,
  pttypeName: item.pttype_name,
  bloodgrp: item.bloodgrp,
  hasAllergy: item.has_allergy,
  lastVisit: item.last_visit,
  isDead: item.is_dead,
});

const transformPatientDetail = (data: PatientApiDetailResponse['data']): PatientDetail => {
  const lookups = data.lookups || {};
  
  return {
    hn: data.hn as string,
    pname: data.pname as string | null,
    fname: data.fname as string | null,
    lname: data.lname as string | null,
    midname: data.midname as string | null,
    sex: data.sex as 'M' | 'F' | '1' | '2' | null,
    birthday: data.birthday as string | null,
    cid: data.cid as string | null,
    mobilePhone: data.mobile_phone_number as string | null,
    hometel: data.hometel as string | null,
    email: data.email as string | null,
    addrpart: data.addrpart as string | null,
    moopart: data.moopart as string | null,
    road: data.road as string | null,
    tmbpart: data.tmbpart as string | null,
    amppart: data.amppart as string | null,
    chwpart: data.chwpart as string | null,
    poCode: data.po_code as string | null,
    bloodgrp: data.bloodgrp as string | null,
    bloodgroupRh: data.bloodgroup_rh as string | null,
    drugallergy: data.drugallergy as string | null,
    g6pd: data.g6pd as 'Y' | 'N' | null,
    pttype: data.pttype as string | null,
    lastVisit: data.last_visit as string | null,
    firstday: data.firstday as string | null,
    death: data.death as 'Y' | 'N' | null,
    deathday: data.deathday as string | null,
    fathername: data.fathername as string | null,
    mathername: data.mathername as string | null,
    spsname: data.spsname as string | null,
    marrystatus: data.marrystatus as string | null,
    informname: data.informname as string | null,
    informtel: data.informtel as string | null,
    informrelation: data.informrelation as string | null,
    nationality: data.nationality as string | null,
    religion: data.religion as string | null,
    occupation: data.occupation as string | null,
    passportNo: data.passport_no as string | null,
    lastUpdate: data.last_update as string | null,
    // Computed fields
    fullName: [data.pname, data.fname, data.lname].filter(Boolean).join(' '),
    age: data.age as number | null,
    ageText: data.age_text as string || '',
    fullAddress: data.full_address as string || '',
    // Joined data from lookups
    pttypeName: lookups.pttype_name,
    tmbName: lookups.tmbpart_name,
    ampName: lookups.amppart_name,
    chwName: lookups.chwpart_name,
    nationalityName: lookups.nationality_name,
    religionName: lookups.religion_name,
    occupationName: lookups.occupation_name,
    // Related data
    allergies: data.drugallergy ? (data.drugallergy as string).split(',').map(s => s.trim()).filter(Boolean) : [],
    photo: data.photo as string | null,
    isDead: data.death === 'Y',
  };
};

// ============================================
// Patient API
// ============================================
export const patientApi = {
  // Get patient list with pagination
  getList: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    pttype?: string;
    chwpart?: string;
    amppart?: string;
    isActive?: boolean;
  } = {}): Promise<PatientListResponse> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', String(params.page));
    if (params.limit) queryParams.append('limit', String(params.limit));
    if (params.search) queryParams.append('search', params.search);
    if (params.pttype) queryParams.append('pttype', params.pttype);
    if (params.chwpart) queryParams.append('chwpart', params.chwpart);
    if (params.amppart) queryParams.append('amppart', params.amppart);
    if (params.isActive !== undefined) queryParams.append('is_active', String(params.isActive));

    const response = await api.get<PatientApiListResponse>(
      `/patients?${queryParams.toString()}`
    );

    return {
      data: response.data.map(transformPatientListItem),
      pagination: {
        page: response.meta.current_page,
        limit: response.meta.per_page,
        total: response.meta.total,
        totalPages: response.meta.last_page,
      },
    };
  },

  // Get patient detail by HN
  getByHn: async (hn: string): Promise<{ success: boolean; data: PatientDetail }> => {
    const response = await api.get<PatientApiDetailResponse>(`/patients/${hn}`);
    return {
      success: response.success,
      data: transformPatientDetail(response.data),
    };
  },
  // Get patient detail by CID
  getByCid: async (cid: string): Promise<{ success: boolean; data: PatientDetail }> => {
    const response = await api.get<PatientApiDetailResponse>(`/patients/cid/${cid}`);
    return {
      success: response.success,
      data: transformPatientDetail(response.data),
    };
  },

  // Quick search patients
  search: async (q: string, limit = 10): Promise<PatientListItem[]> => {
    if (!q || q.length < 2) return [];
    
    const response = await api.get<PatientApiSearchResponse>(
      `/patients/search?q=${encodeURIComponent(q)}&limit=${limit}`
    );

    return response.data.map((item) => ({
      hn: item.hn,
      fullName: item.full_name,
      cid: item.cid,
      sex: item.sex,
      age: item.age,
      birthday: item.birthday,
      phone: null,
      pttype: item.pttype,
      bloodgrp: null,
      hasAllergy: false,
      lastVisit: null,
      isDead: item.death === 'Y',
    }));
  },

  // Create new patient
  create: async (data: PatientFormData): Promise<ApiResponse<{ hn: string }>> => {
    return api.post<ApiResponse<{ hn: string }>>('/patients', {
      pname: data.pname,
      fname: data.fname,
      lname: data.lname,
      sex: data.sex,
      birthday: data.birthday,
      cid: data.cid,
      mobile_phone_number: data.mobilePhone,
      hometel: data.hometel,
      email: data.email,
      addrpart: data.addrpart,
      moopart: data.moopart,
      road: data.road,
      tmbpart: data.tmbpart,
      amppart: data.amppart,
      chwpart: data.chwpart,
      po_code: data.poCode,
      bloodgrp: data.bloodgrp,
      bloodgroup_rh: data.bloodgroupRh,
      drugallergy: data.drugallergy,
      g6pd: data.g6pd,
      pttype: data.pttype,
      nationality: data.nationality,
      religion: data.religion,
      occupation: data.occupation,
      marrystatus: data.marrystatus,
      fathername: data.fathername,
      mathername: data.mathername,
      spsname: data.spsname,
      informname: data.informname,
      informtel: data.informtel,
      informrelation: data.informrelation,
    });
  },

  // Update patient
  update: async (hn: string, data: Partial<PatientFormData>): Promise<ApiResponse<void>> => {
    const payload: Record<string, unknown> = {};
    
    if (data.pname !== undefined) payload.pname = data.pname;
    if (data.fname !== undefined) payload.fname = data.fname;
    if (data.lname !== undefined) payload.lname = data.lname;
    if (data.sex !== undefined) payload.sex = data.sex;
    if (data.birthday !== undefined) payload.birthday = data.birthday;
    if (data.cid !== undefined) payload.cid = data.cid;
    if (data.mobilePhone !== undefined) payload.mobile_phone_number = data.mobilePhone;
    if (data.hometel !== undefined) payload.hometel = data.hometel;
    if (data.email !== undefined) payload.email = data.email;
    if (data.addrpart !== undefined) payload.addrpart = data.addrpart;
    if (data.moopart !== undefined) payload.moopart = data.moopart;
    if (data.road !== undefined) payload.road = data.road;
    if (data.tmbpart !== undefined) payload.tmbpart = data.tmbpart;
    if (data.amppart !== undefined) payload.amppart = data.amppart;
    if (data.chwpart !== undefined) payload.chwpart = data.chwpart;
    if (data.poCode !== undefined) payload.po_code = data.poCode;
    if (data.bloodgrp !== undefined) payload.bloodgrp = data.bloodgrp;
    if (data.bloodgroupRh !== undefined) payload.bloodgroup_rh = data.bloodgroupRh;
    if (data.drugallergy !== undefined) payload.drugallergy = data.drugallergy;
    if (data.g6pd !== undefined) payload.g6pd = data.g6pd;
    if (data.pttype !== undefined) payload.pttype = data.pttype;
    if (data.nationality !== undefined) payload.nationality = data.nationality;
    if (data.religion !== undefined) payload.religion = data.religion;
    if (data.occupation !== undefined) payload.occupation = data.occupation;
    if (data.marrystatus !== undefined) payload.marrystatus = data.marrystatus;
    if (data.fathername !== undefined) payload.fathername = data.fathername;
    if (data.mathername !== undefined) payload.mathername = data.mathername;
    if (data.spsname !== undefined) payload.spsname = data.spsname;
    if (data.informname !== undefined) payload.informname = data.informname;
    if (data.informtel !== undefined) payload.informtel = data.informtel;
    if (data.informrelation !== undefined) payload.informrelation = data.informrelation;

    return api.put<ApiResponse<void>>(`/patients/${hn}`, payload);
  },

  // Delete patient
  delete: async (hn: string): Promise<ApiResponse<void>> => {
    return api.delete<ApiResponse<void>>(`/patients/${hn}`);
  },

  // Get patient statistics
  getStats: async (): Promise<PatientStats> => {
    const response = await api.get<PatientApiStatsResponse>('/patients/stats');
    return response.data;
  },
};

// ============================================
// Patient Image Types
// ============================================
interface PatientImageItem {
  hn: string;
  imageName: string;
  width: number | null;
  height: number | null;
  captureDate: string | null;
}

interface PatientImageDetail extends PatientImageItem {
  image: string; // Base64 encoded
}

interface PatientImagesResponse {
  success: boolean;
  data: Array<{
    hn: string;
    image_name: string;
    width: number | null;
    height: number | null;
    capture_date: string | null;
  }>;
}

interface PatientImageApiResponse {
  success: boolean;
  data: {
    hn: string;
    image_name: string;
    image: string;
    width: number | null;
    height: number | null;
    capture_date: string | null;
  };
}

// ============================================
// Patient Image API
// ============================================
export const patientImageApi = {
  // Get all images for a patient
  getByHn: async (hn: string): Promise<PatientImageItem[]> => {
    const response = await api.get<PatientImagesResponse>(`/patients/${hn}/images`);
    return response.data.map(item => ({
      hn: item.hn,
      imageName: item.image_name,
      width: item.width,
      height: item.height,
      captureDate: item.capture_date,
    }));
  },

  // Get profile image (primary image)
  getProfileImage: async (hn: string): Promise<PatientImageDetail | null> => {
    try {
      const response = await api.get<PatientImageApiResponse>(`/patients/${hn}/image`);
      return {
        hn: response.data.hn,
        imageName: response.data.image_name,
        image: response.data.image,
        width: response.data.width,
        height: response.data.height,
        captureDate: response.data.capture_date,
      };
    } catch {
      return null;
    }
  },

  // Get raw image URL for img src
  getProfileImageUrl: (hn: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api/v1';
    return `${baseUrl}/patients/${hn}/image/raw`;
  },

  // Upload profile image
  upload: async (
    hn: string,
    imageData: string,
    width?: number,
    height?: number
  ): Promise<{ success: boolean; message: string }> => {
    const response = await api.post<{ success: boolean; message: string }>(`/patients/${hn}/image`, {
      image: imageData,
      width,
      height,
    });
    return response;
  },

  // Delete profile image
  delete: async (hn: string): Promise<void> => {
    await api.delete(`/patients/${hn}/image`);
  },
};

// ============================================
// Helper: Transform menu from API response (camelCase) to snake_case
// ============================================
const transformMenuFromApi = (menu: Record<string, unknown>): MenuItem => ({
  id: menu.id as number,
  menu_code: (menu.menuCode || menu.menu_code) as string,
  menu_name: (menu.menuName || menu.menu_name) as string,
  menu_name_th: (menu.menuNameTh || menu.menu_name_th) as string | null,
  parent_id: (menu.parentId ?? menu.parent_id ?? null) as number | null,
  icon: (menu.icon || null) as string | null,
  route_path: (menu.routePath || menu.route_path) as string | null,
  sort_order: (menu.sortOrder ?? menu.sort_order ?? 0) as number,
  is_active: Boolean(menu.isActive ?? menu.is_active),
});

// ============================================
// Menu API
// ============================================
export const menuApi = {
  // =========================================
  // Public Menu Operations
  // =========================================

  // Get all menus (with transform from camelCase to snake_case)
  getAll: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>('/settings/menus');
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  // Get active menus only
  getActive: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>('/settings/menus/active');
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  // Get menu tree (active only)
  getTree: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>('/settings/menus/tree');
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  // Get full menu tree (including inactive)
  getFullTree: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>('/settings/menus/tree/full');
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  // Get menu by ID
  getById: async (id: number): Promise<ApiResponse<MenuItem>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>>>(`/settings/menus/${id}`);
    return {
      ...response,
      data: transformMenuFromApi(response.data),
    };
  },

  // Get menu by code
  getByCode: async (code: string): Promise<ApiResponse<MenuItem>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>>>(`/settings/menus/code/${code}`);
    return {
      ...response,
      data: transformMenuFromApi(response.data),
    };
  },

  // Get menus by parent ID (use null for root)
  getByParentId: async (parentId: number | null): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get<ApiResponse<Record<string, unknown>[]>>(
      `/settings/menus/parent/${parentId === null ? 'null' : parentId}`
    );
    return {
      ...response,
      data: response.data.map(transformMenuFromApi),
    };
  },

  // =========================================
  // CRUD Operations
  // =========================================

  // Create menu
  create: (data: {
    menu_code: string;
    menu_name: string;
    menu_name_th?: string;
    parent_id?: number | null;
    icon?: string;
    route_path?: string;
    sort_order?: number;
    is_active?: number;
  }) => api.post<ApiResponse<MenuItem>>('/settings/menus', data),

  // Update menu
  update: (id: number, data: Partial<MenuItem>) =>
    api.put<ApiResponse<MenuItem>>(`/settings/menus/${id}`, data),

  // Delete menu
  delete: (id: number) => api.delete<ApiResponse<void>>(`/settings/menus/${id}`),

  // =========================================
  // Bulk Operations
  // =========================================

  // Reorder menus
  reorder: (items: { id: number; sort_order: number }[]) =>
    api.post<ApiResponse<void>>('/settings/menus/reorder', { items }),

  // Move menu to new parent
  move: (id: number, parentId: number | null) =>
    api.put<ApiResponse<MenuItem>>(`/settings/menus/${id}/move`, { parent_id: parentId }),

  // =========================================
  // User Menu Access (by user ID)
  // =========================================

  // Get user menu access
  getUserAccess: (userId: number) =>
    api.get<ApiResponse<MenuItem[]>>(`/settings/menus/user/${userId}/access`),

  // Get user menu tree
  getUserTree: (userId: number) =>
    api.get<ApiResponse<MenuItem[]>>(`/settings/menus/user/${userId}/tree`),

  // Check user menu access
  checkUserAccess: (userId: number, menuCode: string) =>
    api.get<ApiResponse<{
      has_access: boolean;
      can_view: boolean;
      can_create: boolean;
      can_edit: boolean;
      can_delete: boolean;
      can_export: boolean;
      can_print: boolean;
    }>>(`/settings/menus/user/${userId}/check/${menuCode}`),

  // =========================================
  // Current User Menu Access (my)
  // =========================================

  // Get my menu access (current logged in user)
  getMyAccess: () => api.get<ApiResponse<MenuItem[]>>('/settings/menus/my/access'),

  // Get my menu tree (current logged in user)
  getMyTree: () => api.get<ApiResponse<MenuItem[]>>('/settings/menus/my/tree'),

  // Check my menu access (current logged in user)
  checkMyAccess: (menuCode: string) =>
    api.get<ApiResponse<{
      has_access: boolean;
      can_view: boolean;
      can_create: boolean;
      can_edit: boolean;
      can_delete: boolean;
      can_export: boolean;
      can_print: boolean;
    }>>(`/settings/menus/my/check/${menuCode}`),

  // =========================================
  // Alias for backward compatibility
  // =========================================
  getUserMenus: () => api.get<ApiResponse<MenuItem[]>>('/settings/menus/my/tree'),
};

// ============================================
// Role API (Legacy - use settingsApi.roles instead)
// ============================================
export const roleApi = {
  // Get all roles
  getAll: () => api.get<ApiResponse<Role[]>>('/roles'),

  // Get role by ID
  getById: (id: number) => api.get<ApiResponse<Role>>(`/roles/${id}`),

  // Create role
  create: (data: Partial<Role>) => api.post<ApiResponse<Role>>('/roles', data),

  // Update role
  update: (id: number, data: Partial<Role>) =>
    api.put<ApiResponse<Role>>(`/roles/${id}`, data),

  // Delete role
  delete: (id: number) => api.delete<ApiResponse<void>>(`/roles/${id}`),

  // Get role menu access
  getMenuAccess: (roleId: number) =>
    api.get<ApiResponse<RoleMenuAccess[]>>(`/roles/${roleId}/menus`),

  // Update role menu access
  updateMenuAccess: (roleId: number, menuAccess: RoleMenuAccess[]) =>
    api.put<ApiResponse<void>>(`/roles/${roleId}/menus`, { menuAccess }),
};

// ============================================
// Group API (Legacy - use settingsApi.groups instead)
// ============================================
export const groupApi = {
  // Get all groups
  getAll: () => api.get<ApiResponse<Group[]>>('/groups'),

  // Get group by ID
  getById: (id: number) => api.get<ApiResponse<Group>>(`/groups/${id}`),

  // Create group
  create: (data: Partial<Group>) => api.post<ApiResponse<Group>>('/groups', data),

  // Update group
  update: (id: number, data: Partial<Group>) =>
    api.put<ApiResponse<Group>>(`/groups/${id}`, data),

  // Delete group
  delete: (id: number) => api.delete<ApiResponse<void>>(`/groups/${id}`),

  // Get group roles
  getRoles: (groupId: number) => api.get<ApiResponse<Role[]>>(`/groups/${groupId}/roles`),

  // Assign roles to group
  assignRoles: (groupId: number, roleIds: number[]) =>
    api.put<ApiResponse<void>>(`/groups/${groupId}/roles`, { roleIds }),
};

// ============================================
// Permission API (Legacy - use settingsApi.permissions instead)
// ============================================
export const permissionApi = {
  // Get all permissions
  getAll: () => api.get<ApiResponse<Permission[]>>('/permissions'),

  // Get permission by ID
  getById: (id: number) => api.get<ApiResponse<Permission>>(`/permissions/${id}`),

  // Create permission
  create: (data: Partial<Permission>) =>
    api.post<ApiResponse<Permission>>('/permissions', data),

  // Update permission
  update: (id: number, data: Partial<Permission>) =>
    api.put<ApiResponse<Permission>>(`/permissions/${id}`, data),

  // Delete permission
  delete: (id: number) => api.delete<ApiResponse<void>>(`/permissions/${id}`),
};

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

// ============================================
// Settings API (New - matches backend routes)
// ============================================
export const settingsApi = {
  // =========================================
  // Roles
  // =========================================
  roles: {
    getAll: () => api.get<ApiResponse<Role[]>>('/settings/roles'),
    
    getActive: () => api.get<ApiResponse<Role[]>>('/settings/roles/active'),
    
    getById: (id: number) => api.get<ApiResponse<Role>>(`/settings/roles/${id}`),
    
    getWithDetails: (id: number) => api.get<ApiResponse<Role>>(`/settings/roles/${id}/details`),
    
    getMenuAccess: (id: number) => api.get<ApiResponse<RoleMenuAccess[]>>(`/settings/roles/${id}/menus`),
    
    getPermissions: (id: number) => api.get<ApiResponse<Permission[]>>(`/settings/roles/${id}/permissions`),
    
    create: (data: {
      role_code: string;
      role_name: string;
      description?: string;
      is_active?: number;
    }) => api.post<ApiResponse<Role>>('/settings/roles', data),
    
    update: (id: number, data: {
      role_code?: string;
      role_name?: string;
      description?: string;
      is_active?: number;
    }) => api.put<ApiResponse<Role>>(`/settings/roles/${id}`, data),
    
    delete: (id: number) => api.delete<ApiResponse<void>>(`/settings/roles/${id}`),
    
    setMenuAccess: (roleId: number, menuId: number, access: {
      can_view?: number;
      can_create?: number;
      can_edit?: number;
      can_delete?: number;
      can_export?: number;
      can_print?: number;
    }) => api.post<ApiResponse<void>>(`/settings/roles/${roleId}/menus/${menuId}`, access),
    
    removeMenuAccess: (roleId: number, menuId: number) => 
      api.delete<ApiResponse<void>>(`/settings/roles/${roleId}/menus/${menuId}`),
    
    addPermission: (roleId: number, permissionId: number) => 
      api.post<ApiResponse<void>>(`/settings/roles/${roleId}/permissions/${permissionId}`),
    
    removePermission: (roleId: number, permissionId: number) => 
      api.delete<ApiResponse<void>>(`/settings/roles/${roleId}/permissions/${permissionId}`),
  },

  // =========================================
  // Groups
  // =========================================
  groups: {
    getAll: () => api.get<ApiResponse<Group[]>>('/settings/groups'),
    
    getActive: () => api.get<ApiResponse<Group[]>>('/settings/groups/active'),
    
    getTree: () => api.get<ApiResponse<Group[]>>('/settings/groups/tree'),
    
    getById: (id: number) => api.get<ApiResponse<Group>>(`/settings/groups/${id}`),
    
    getWithRoles: (id: number) => api.get<ApiResponse<Group>>(`/settings/groups/${id}/roles`),
    
    create: (data: {
      group_code: string;
      group_name: string;
      description?: string;
      parent_id?: number;
      is_active?: number;
    }) => api.post<ApiResponse<Group>>('/settings/groups', data),
    
    update: (id: number, data: {
      group_code?: string;
      group_name?: string;
      description?: string;
      parent_id?: number | null;
      is_active?: number;
    }) => api.put<ApiResponse<Group>>(`/settings/groups/${id}`, data),
    
    delete: (id: number) => api.delete<ApiResponse<void>>(`/settings/groups/${id}`),
    
    addRole: (groupId: number, roleId: number) => 
      api.post<ApiResponse<void>>(`/settings/groups/${groupId}/roles/${roleId}`),
    
    removeRole: (groupId: number, roleId: number) => 
      api.delete<ApiResponse<void>>(`/settings/groups/${groupId}/roles/${roleId}`),
  },

  // =========================================
  // Menu Items (use menuApi for full functionality)
  // =========================================
  menus: {
    // Basic CRUD - for full menu operations, use menuApi instead
    getAll: () => menuApi.getAll(),
    getTree: () => menuApi.getTree(),
    getById: (id: number) => menuApi.getById(id),
    create: (data: {
      menu_code: string;
      menu_name: string;
      menu_name_th?: string;
      parent_id?: number;
      icon?: string;
      route_path?: string;
      sort_order?: number;
      is_active?: number;
    }) => menuApi.create(data),
    update: (id: number, data: Partial<MenuItem>) => menuApi.update(id, data),
    delete: (id: number) => menuApi.delete(id),
  },

  // =========================================
  // Permissions
  // =========================================
  permissions: {
    getAll: () => api.get<ApiResponse<Permission[]>>('/settings/permissions'),
    
    getById: (id: number) => api.get<ApiResponse<Permission>>(`/settings/permissions/${id}`),
    
    create: (data: {
      permission_code: string;
      permission_name: string;
      description?: string;
    }) => api.post<ApiResponse<Permission>>('/settings/permissions', data),
    
    update: (id: number, data: {
      permission_code?: string;
      permission_name?: string;
      description?: string;
    }) => api.put<ApiResponse<Permission>>(`/settings/permissions/${id}`, data),
    
    delete: (id: number) => api.delete<ApiResponse<void>>(`/settings/permissions/${id}`),
  },

  // =========================================
  // User Settings
  // =========================================
  users: {
    getGroups: (userId: number) => api.get<ApiResponse<Group[]>>(`/settings/users/${userId}/groups`),
    
    getRoles: (userId: number) => api.get<ApiResponse<Role[]>>(`/settings/users/${userId}/roles`),
    
    getEffectiveRoles: (userId: number) => api.get<ApiResponse<Role[]>>(`/settings/users/${userId}/effective-roles`),
    
    getMenuAccess: (userId: number) => api.get<ApiResponse<MenuItem[]>>(`/settings/users/${userId}/menu-access`),
    
    getPermissions: (userId: number) => api.get<ApiResponse<Permission[]>>(`/settings/users/${userId}/permissions`),
    
    checkMenuAccess: (userId: number, menuCode: string) => 
      api.get<ApiResponse<RoleMenuAccess>>(`/settings/users/${userId}/check-menu/${menuCode}`),
    
    checkPermission: (userId: number, permissionCode: string) => 
      api.get<ApiResponse<{ permission_code: string; has_permission: boolean }>>(`/settings/users/${userId}/check-permission/${permissionCode}`),
    
    addGroup: (userId: number, groupId: number, isPrimary?: number) => 
      api.post<ApiResponse<void>>(`/settings/users/${userId}/groups/${groupId}`, { is_primary: isPrimary }),
    
    removeGroup: (userId: number, groupId: number) => 
      api.delete<ApiResponse<void>>(`/settings/users/${userId}/groups/${groupId}`),
    
    setPrimaryGroup: (userId: number, groupId: number) => 
      api.put<ApiResponse<void>>(`/settings/users/${userId}/groups/${groupId}/primary`),
    
    addRole: (userId: number, roleId: number) => 
      api.post<ApiResponse<void>>(`/settings/users/${userId}/roles/${roleId}`),
    
    removeRole: (userId: number, roleId: number) => 
      api.delete<ApiResponse<void>>(`/settings/users/${userId}/roles/${roleId}`),
  },

  // =========================================
  // Current User Access (my)
  // =========================================
  my: {
    getEffectiveRoles: () => api.get<ApiResponse<Role[]>>('/settings/my/effective-roles'),
    
    getMenuAccess: () => api.get<ApiResponse<MenuItem[]>>('/settings/my/menu-access'),
    
    getPermissions: () => api.get<ApiResponse<Permission[]>>('/settings/my/permissions'),
    
    checkMenuAccess: (menuCode: string) => 
      api.get<ApiResponse<RoleMenuAccess>>(`/settings/my/check-menu/${menuCode}`),
    
    checkPermission: (permissionCode: string) => 
      api.get<ApiResponse<{ permission_code: string; has_permission: boolean }>>(`/settings/my/check-permission/${permissionCode}`),
  },
};

export default api;