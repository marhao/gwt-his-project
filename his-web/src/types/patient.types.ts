// =============================================================================
// File: src/types/patient.types.ts
// Description: Patient module type definitions
// =============================================================================

// ============================================
// Base Patient Interface (from DB)
// ============================================
export interface Patient {
  /** Primary Key */
  hn: string;
  
  /** ข้อมูลส่วนตัว */
  pname: string | null;        // คำนำหน้า
  fname: string | null;        // ชื่อ
  lname: string | null;        // นามสกุล
  midname?: string | null;     // ชื่อกลาง
  sex: 'M' | 'F' | '1' | '2' | null;
  birthday: string | null;     // YYYY-MM-DD
  cid: string | null;          // เลขบัตรประชาชน 13 หลัก
  
  /** ข้อมูลติดต่อ */
  mobilePhone: string | null;  // mobile_phone_number
  hometel: string | null;
  email: string | null;
  
  /** ที่อยู่ */
  addrpart: string | null;     // บ้านเลขที่
  moopart: string | null;      // หมู่
  road: string | null;         // ถนน
  tmbpart: string | null;      // ตำบล code
  amppart: string | null;      // อำเภอ code
  chwpart: string | null;      // จังหวัด code
  poCode: string | null;       // รหัสไปรษณีย์
  
  /** ข้อมูลทางการแพทย์ */
  bloodgrp: string | null;     // หมู่เลือด
  bloodgroupRh: string | null; // Rh
  drugallergy: string | null;  // แพ้ยา
  g6pd: 'Y' | 'N' | null;      // G6PD
  
  /** ข้อมูลสิทธิ์ */
  pttype: string | null;       // รหัสสิทธิ์
  
  /** สถานะ */
  lastVisit: string | null;    // วันที่มาล่าสุด
  firstday: string | null;     // วันที่ลงทะเบียน
  death: 'Y' | 'N' | null;
  deathday: string | null;
  
  /** ข้อมูลครอบครัว */
  fathername: string | null;
  mathername: string | null;   // mother name (typo in DB)
  spsname: string | null;      // spouse name
  marrystatus: string | null;
  
  /** ผู้ติดต่อฉุกเฉิน */
  informname: string | null;
  informtel: string | null;
  informrelation: string | null;
  
  /** อื่นๆ */
  nationality: string | null;
  religion: string | null;
  occupation: string | null;
  passportNo: string | null;
  
  /** Metadata */
  lastUpdate: string | null;
}

// ============================================
// Patient List Item (สำหรับแสดงในรายการ)
// ============================================
export interface PatientListItem {
  hn: string;
  fullName: string;           // computed: pname + fname + lname
  cid: string | null;
  sex: 'M' | 'F' | null;
  age: number | null;         // computed from birthday
  birthday: string | null;
  phone: string | null;       // mobile or hometel
  pttype: string | null;
  pttypeName?: string;        // joined
  bloodgrp: string | null;
  hasAllergy: boolean;
  lastVisit: string | null;
  isDead: boolean;
  photo?: string | null;
}

// ============================================
// Patient Detail (สำหรับหน้า Profile)
// ============================================
export interface PatientDetail extends Patient {
  /** Computed fields */
  fullName: string;
  age: number | null;
  ageText: string;            // "45 ปี 3 เดือน"
  fullAddress: string;
  
  /** Joined data */
  pttypeName?: string;
  tmbName?: string;           // ชื่อตำบล
  ampName?: string;           // ชื่ออำเภอ
  chwName?: string;           // ชื่อจังหวัด
  nationalityName?: string;
  religionName?: string;
  occupationName?: string;
  
  /** Related data */
  allergies: string[];        // parsed from drugallergy
  
  /** Photo */
  photo?: string | null;
}

// ============================================
// Patient Form Data (สำหรับ Create/Edit)
// ============================================
export interface PatientFormData {
  // Required
  pname: string;
  fname: string;
  lname: string;
  sex: 'M' | 'F';
  birthday: string;
  cid: string;
  
  // Contact
  mobilePhone: string;
  hometel: string;
  email: string;
  
  // Address
  addrpart: string;
  moopart: string;
  road: string;
  tmbpart: string;
  amppart: string;
  chwpart: string;
  poCode: string;
  
  // Medical
  bloodgrp: string;
  bloodgroupRh: string;
  drugallergy: string;
  g6pd: string;
  
  // Rights
  pttype: string;
  
  // Optional
  nationality: string;
  religion: string;
  occupation: string;
  marrystatus: string;
  
  // Family
  fathername: string;
  mathername: string;
  spsname: string;
  
  // Emergency Contact
  informname: string;
  informtel: string;
  informrelation: string;
}

// ============================================
// Search & Filter
// ============================================
export interface PatientSearchParams {
  query?: string;             // ค้นหา HN, ชื่อ, CID
  sex?: 'M' | 'F' | 'all';
  pttype?: string;
  chwpart?: string;
  amppart?: string;
  hasAllergy?: boolean;
  isDead?: boolean;
  ageFrom?: number;
  ageTo?: number;
  lastVisitFrom?: string;
  lastVisitTo?: string;
}

export interface PatientSortParams {
  field: 'hn' | 'fname' | 'lastVisit' | 'birthday' | 'firstday';
  direction: 'asc' | 'desc';
}

export interface PatientListParams {
  search?: PatientSearchParams;
  sort?: PatientSortParams;
  page: number;
  limit: number;
}

// ============================================
// API Response
// ============================================
export interface PatientListResponse {
  data: PatientListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Statistics
// ============================================
export interface PatientStats {
  total: number;
  newThisMonth: number;
  visitedToday: number;
  withAllergy: number;
  byGender: {
    male: number;
    female: number;
  };
  byPttype: {
    code: string;
    name: string;
    count: number;
  }[];
}

// ============================================
// Constants
// ============================================
export const PNAME_OPTIONS = [
  { value: 'นาย', label: 'นาย' },
  { value: 'นาง', label: 'นาง' },
  { value: 'นางสาว', label: 'นางสาว' },
  { value: 'ด.ช.', label: 'ด.ช.' },
  { value: 'ด.ญ.', label: 'ด.ญ.' },
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Miss', label: 'Miss' },
];

export const SEX_OPTIONS = [
  { value: 'M', label: 'ชาย' },
  { value: 'F', label: 'หญิง' },
];

export const BLOOD_GROUP_OPTIONS = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'AB', label: 'AB' },
  { value: 'O', label: 'O' },
];

export const BLOOD_RH_OPTIONS = [
  { value: '+', label: 'Rh+' },
  { value: '-', label: 'Rh-' },
];

export const MARRY_STATUS_OPTIONS = [
  { value: '1', label: 'โสด' },
  { value: '2', label: 'สมรส' },
  { value: '3', label: 'หม้าย' },
  { value: '4', label: 'หย่า' },
  { value: '5', label: 'แยกกันอยู่' },
  { value: '9', label: 'ไม่ระบุ' },
];