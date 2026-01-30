// ============================================
// Types & Interfaces
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
  
  export interface NewOrderForm {
    type: 'medication' | 'lab' | 'treatment';
    name: string;
    dose: string;
    frequency: string;
    route: string;
    instruction: string;
    orderType: 'oneday' | 'continue';
    isStat: boolean;
  }
  
  export interface NewProgressNoteForm {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  }
  
  // ============================================
  // Constants
  // ============================================
  
  export const medicationList = [
    { name: 'NSS 0.9% 1000ml', defaultDose: 'IV drip over 8 hours', defaultFreq: 'TID', defaultRoute: 'IV' },
    { name: 'Paracetamol 500mg', defaultDose: '1-2 tab', defaultFreq: 'Q6H PRN', defaultRoute: 'PO' },
    { name: 'Omeprazole 40mg IV', defaultDose: '1 vial', defaultFreq: 'OD', defaultRoute: 'IV' },
    { name: 'Morphine 10mg', defaultDose: '0.5-1 amp', defaultFreq: 'Q4H PRN', defaultRoute: 'IV' },
    { name: 'Aspirin 81mg', defaultDose: '1 tab', defaultFreq: 'OD PC', defaultRoute: 'PO' },
    { name: 'Clopidogrel 75mg', defaultDose: '1 tab', defaultFreq: 'OD PC', defaultRoute: 'PO' },
    { name: 'Atorvastatin 40mg', defaultDose: '1 tab', defaultFreq: 'OD HS', defaultRoute: 'PO' },
    { name: 'Enoxaparin 60mg', defaultDose: '1 prefilled', defaultFreq: 'BID', defaultRoute: 'SC' },
  ];
  
  export const labList = [
    { name: 'CBC', description: 'Complete Blood Count' },
    { name: 'BUN, Cr', description: 'Kidney Function' },
    { name: 'Electrolyte', description: 'Na, K, Cl, CO2' },
    { name: 'Cardiac enzyme', description: 'Troponin-T, CK-MB' },
    { name: 'LFT', description: 'Liver Function Test' },
    { name: 'Coagulogram', description: 'PT, PTT, INR' },
    { name: 'Lipid Profile', description: 'Cholesterol, TG, HDL, LDL' },
  ];
  
  export const treatmentList = [
    { name: 'Oxygen Cannula', defaultDose: '2-4 L/min' },
    { name: 'EKG Monitor', defaultDose: 'Continuous' },
    { name: 'Foley catheter', defaultDose: 'Strict I/O' },
    { name: 'IV access', defaultDose: 'Hep-lock' },
    { name: 'NPO', defaultDose: 'Nothing by mouth' },
  ];
  
  export const instructionList = [
    'รับประทานก่อนอาหาร 30 นาที',
    'รับประทานหลังอาหารทันที',
    'รับประทานก่อนนอน',
    'ฉีดเข้าใต้ผิวหนังบริเวณหน้าท้อง',
    'ห้ามบดหรือเคี้ยว',
  ];
  
  export const frequencyOptions = ['OD', 'BID', 'TID', 'QID', 'Q4H', 'Q6H', 'Q8H', 'Q6H PRN', 'Q4H PRN', 'STAT', 'Continuous', 'OD PC', 'OD HS'];
  export const routeOptions = ['PO', 'IV', 'IM', 'SC', 'SL', 'PR', 'Topical', 'Inhalation'];
  
  // ============================================
  // Helper Functions
  // ============================================
  
  export const getRouteColor = (route: string) => {
    const colors: Record<string, string> = {
      IV: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400',
      PO: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      IM: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
      SC: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    };
    return colors[route] || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
  };
  
  export const getCurrentDateTime = () => ({
    date: new Date().toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/'),
    time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
  });