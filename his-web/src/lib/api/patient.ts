// src/lib/api/patient.ts

import { api } from './client';
import type { ApiResponse } from './types';
import type {
  PatientListItem,
  PatientDetail,
  PatientFormData,
  PatientSearchParams,
  PatientListResponse,
  PatientStats,
  PatientImageItem,
  PatientImageDetail,
} from './types/patient';

// ============================================
// Internal Response Types
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
  }>;
}

interface PatientApiStatsResponse {
  success: boolean;
  data: PatientStats;
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
    ageText: (data.age_text as string) || '',
    fullAddress: (data.full_address as string) || '',
    // Joined data from lookups
    pttypeName: lookups.pttype_name,
    tmbName: lookups.tmbpart_name,
    ampName: lookups.amppart_name,
    chwName: lookups.chwpart_name,
    nationalityName: lookups.nationality_name,
    religionName: lookups.religion_name,
    occupationName: lookups.occupation_name,
    // Related data
    allergies: data.drugallergy
      ? (data.drugallergy as string)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    photo: data.photo as string | null,
  };
};

// ============================================
// Patient API
// ============================================

export const patientApi = {
  // Get patient list with pagination
  getList: async (params: PatientSearchParams = {}): Promise<PatientListResponse> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', String(params.page));
    if (params.limit) queryParams.append('limit', String(params.limit));
    if (params.search) queryParams.append('search', params.search);
    if (params.pttype) queryParams.append('pttype', params.pttype);
    if (params.chwpart) queryParams.append('chwpart', params.chwpart);
    if (params.amppart) queryParams.append('amppart', params.amppart);
    if (params.isActive !== undefined) queryParams.append('is_active', String(params.isActive));

    const response = await api.get<PatientApiListResponse>(`/patients?${queryParams.toString()}`);

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
      isDead: false,
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
// Patient Image API
// ============================================

export const patientImageApi = {
  // Get all images for a patient
  getByHn: async (hn: string): Promise<PatientImageItem[]> => {
    const response = await api.get<PatientImagesResponse>(`/patients/${hn}/images`);
    return response.data.map((item) => ({
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

export default patientApi;