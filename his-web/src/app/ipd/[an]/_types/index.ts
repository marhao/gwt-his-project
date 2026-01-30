// ============================================
// IPD Detail - Shared Types
// ============================================

// Tab Types
export type TabType = 
  | 'overview' 
  | 'orders' 
  | 'medications' 
  | 'lab' 
  | 'xray' 
  | 'vitals' 
  | 'nursing'
  | 'assessments' 
  | 'records' 
  | 'finance';

// ============================================
// Patient Types
// ============================================

export interface Patient {
  an: string;
  hn: string;
  cid: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
  bloodType: string;
  allergies: string[];
  underlyingDiseases: string[];
  regdate: string;
  regtime: string;
  ward: string;
  wardCode: string;
  room: string;
  bed: string;
  diagnosis: string;
  pttype: string;
  pttypeName: string;
  admDoctor: string;
  inchargeDoctor: string;
  spclty: string;
  isCritical: boolean;
  los: number;
  drg: string;
  rw: number;
  emergencyContact: string;
}

// IPT Record - จากหน้า IPD List (app/ipd/page.tsx)
export interface IptRecord {
  an: string;
  hn: string;
  cid?: string;
  patient_name: string;
  patient_age: number;
  patient_sex: string;
  blood_type?: string;
  regdate: string;
  regtime: string;
  dchdate: string | null;
  dchtime: string | null;
  dchstts: string | null;
  dchtype: string | null;
  ward: string;
  ward_name: string;
  room_no?: string;
  bed_no?: string;
  prediag: string;
  pttype: string;
  pttype_name: string;
  admdoctor: string;
  admdoctor_name: string;
  incharge_doctor?: string;
  spclty: string;
  spclty_name: string;
  drg: string | null;
  rw: number | null;
  los: number;
  is_critical?: boolean;
  allergies?: string[];
  underlying_diseases?: string[];
  emergency_contact?: string;
  estimate_discharge_date?: string;
}

// Helper function: แปลง IptRecord → Patient
export function iptRecordToPatient(record: IptRecord): Patient {
  return {
    an: record.an,
    hn: record.hn,
    cid: record.cid || '',
    name: record.patient_name,
    age: record.patient_age,
    sex: record.patient_sex as 'M' | 'F',
    bloodType: record.blood_type || 'N/A',
    allergies: record.allergies || [],
    underlyingDiseases: record.underlying_diseases || [],
    regdate: record.regdate,
    regtime: record.regtime,
    ward: record.ward_name,
    wardCode: record.ward,
    room: record.room_no || '',
    bed: record.bed_no || '',
    diagnosis: record.prediag,
    pttype: record.pttype,
    pttypeName: record.pttype_name,
    admDoctor: record.admdoctor_name,
    inchargeDoctor: record.incharge_doctor || record.admdoctor_name,
    spclty: record.spclty_name,
    isCritical: record.is_critical ?? false,
    los: record.los,
    drg: record.drg || '',
    rw: record.rw || 0,
    emergencyContact: record.emergency_contact || '',
  };
}

// ============================================
// Order Types
// ============================================

export interface Order {
  id: number;
  type: 'medication' | 'lab' | 'treatment';
  name: string;
  dose?: string;
  frequency?: string;
  route?: string;
  instruction?: string;
  orderType: 'oneday' | 'continue';
  startDate: string;
  time: string;
  prescriber: string;
  status: 'active' | 'pending' | 'completed' | 'discontinued';
  isStat: boolean;
  isDiscontinued: boolean;
  endDate?: string;
  endTime?: string;
  dcBy?: string;
  dcReason?: string;
}

// ============================================
// Progress Note
// ============================================

export interface ProgressNote {
  id: number;
  date: string;
  time: string;
  author: string;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  vitalSigns?: {
    bp: string;
    hr: number;
    rr: number;
    temp: number;
    o2sat: number;
  };
}

// ============================================
// Vital Signs
// ============================================

export interface VitalSign {
  datetime: string;
  temp: number;
  pulse: number;
  rr: number;
  bp_sys: number;
  bp_dia: number;
  o2sat: number;
  pain?: number;
  recorded_by: string;
}

// ============================================
// Lab Results
// ============================================

export interface LabResult {
  id: number;
  name: string;
  date: string;
  time: string;
  status: 'pending' | 'completed';
  items: {
    test: string;
    result: string;
    unit: string;
    refRange: string;
    flag?: 'H' | 'L' | 'C';
  }[];
}

// ============================================
// Imaging / X-Ray
// ============================================

export interface ImagingResult {
  id: number;
  type: string;
  date: string;
  status: 'pending' | 'completed';
  finding: string;
  imageUrl?: string;
}

// ============================================
// Assessment Forms
// ============================================

export interface AssessmentForm {
  id: number;
  name: string;
  status: 'pending' | 'completed';
  score?: string;
  assessedBy?: string;
  assessedDate?: string;
}

// ============================================
// Medical Records
// ============================================

export interface MedicalRecord {
  id: number;
  type: string;
  date: string;
  author: string;
  content?: string;
}

// ============================================
// Nursing Types
// ============================================

export interface NursingTask {
  id: number;
  type: 'medication' | 'lab' | 'procedure' | 'vital_signs' | 'assessment' | 'care';
  name: string;
  scheduled_time: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'completed' | 'overdue' | 'skipped';
  completed_time?: string;
  completed_by?: string;
  notes?: string;
}

export interface IOEntry {
  id: number;
  datetime: string;
  type: 'intake' | 'output';
  category: string;
  route: string;
  amount: number;
  unit: string;
  recorded_by: string;
}

export interface NursingNote {
  id: number;
  datetime: string;
  category: 'observation' | 'intervention' | 'evaluation' | 'communication';
  content: string;
  author: string;
}

// ============================================
// MAR (Medication Administration Record)
// ============================================

export interface MAREntry {
  id: number;
  order_id: number;
  medication_name: string;
  dose: string;
  route: string;
  scheduled_time: string;
  actual_time?: string;
  status: 'pending' | 'given' | 'held' | 'refused' | 'omitted';
  administered_by?: string;
  notes?: string;
}

// ============================================
// Ward Summary (for IPD List page)
// ============================================

export interface WardSummary {
  ward: string;
  ward_name: string;
  total: number;
  available: number;
  critical: number;
}