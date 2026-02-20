// src/lib/api/types/patient.ts

// ============================================
// Patient List Types
// ============================================

export interface PatientListItem {
    hn: string;
    fullName: string;
    cid: string | null;
    sex: 'M' | 'F' | '1' | '2' | null;
    age: number | null;
    birthday: string | null;
    phone: string | null;
    pttype: string | null;
    pttypeName?: string;
    bloodgrp: string | null;
    hasAllergy: boolean;
    lastVisit: string | null;
    isDead: boolean;
  }
  
  export interface PatientListResponse {
    data: PatientListItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }
  
  export interface PatientSearchParams {
    page?: number;
    limit?: number;
    search?: string;
    pttype?: string;
    chwpart?: string;
    amppart?: string;
    isActive?: boolean;
  }
  
  // ============================================
  // Patient Detail Types
  // ============================================
  
  export interface PatientDetail {
    hn: string;
    pname: string | null;
    fname: string | null;
    lname: string | null;
    midname: string | null;
    sex: 'M' | 'F' | '1' | '2' | null;
    birthday: string | null;
    cid: string | null;
    mobilePhone: string | null;
    hometel: string | null;
    email: string | null;
    addrpart: string | null;
    moopart: string | null;
    road: string | null;
    tmbpart: string | null;
    amppart: string | null;
    chwpart: string | null;
    poCode: string | null;
    bloodgrp: string | null;
    bloodgroupRh: string | null;
    drugallergy: string | null;
    g6pd: 'Y' | 'N' | null;
    pttype: string | null;
    lastVisit: string | null;
    firstday: string | null;
    death: 'Y' | 'N' | null;
    deathday: string | null;
    fathername: string | null;
    mathername: string | null;
    spsname: string | null;
    marrystatus: string | null;
    informname: string | null;
    informtel: string | null;
    informrelation: string | null;
    nationality: string | null;
    religion: string | null;
    occupation: string | null;
    passportNo: string | null;
    lastUpdate: string | null;
    // Computed fields
    fullName: string;
    age: number | null;
    ageText: string;
    fullAddress: string;
    // Joined data from lookups
    pttypeName?: string;
    tmbName?: string;
    ampName?: string;
    chwName?: string;
    nationalityName?: string;
    religionName?: string;
    occupationName?: string;
    // Related data
    allergies: string[];
    photo: string | null;
    isDead: boolean;
  }
  
  // ============================================
  // Patient Form Types
  // ============================================
  
  export interface PatientFormData {
    pname?: string;
    fname?: string;
    lname?: string;
    sex?: string;
    birthday?: string;
    cid?: string;
    mobilePhone?: string;
    hometel?: string;
    email?: string;
    addrpart?: string;
    moopart?: string;
    road?: string;
    tmbpart?: string;
    amppart?: string;
    chwpart?: string;
    poCode?: string;
    bloodgrp?: string;
    bloodgroupRh?: string;
    drugallergy?: string;
    g6pd?: string;
    pttype?: string;
    nationality?: string;
    religion?: string;
    occupation?: string;
    marrystatus?: string;
    fathername?: string;
    mathername?: string;
    spsname?: string;
    informname?: string;
    informtel?: string;
    informrelation?: string;
  }
  
  // ============================================
  // Patient Stats Types
  // ============================================
  
  export interface PatientStats {
    total: number;
    active: number;
    newThisMonth: number;
    newToday: number;
  }
  
  // ============================================
  // Patient Image Types
  // ============================================
  
  export interface PatientImageItem {
    hn: string;
    imageName: string;
    width: number | null;
    height: number | null;
    captureDate: string | null;
  }
  
  export interface PatientImageDetail extends PatientImageItem {
    image: string; // Base64 encoded
  }