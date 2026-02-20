// =============================================================================
// File: src/types/death.types.ts
// Description: Type definitions for Death module
// =============================================================================

export interface DeathRecord {
    deathId: number
    hn: string | null
    cid: string | null
    hcode: string | null
    deathDate: string | null
    deathDiag1: string | null
    deathDiag2: string | null
    deathDiag3: string | null
    deathDiag4: string | null
    deathDiagOther: string | null
    deathCause: string | null
    deathPlace: string | null
    lastUpdate: string | null
    lastPttype: string | null
    an: string | null
    nopreg: string | null
    wpreg: number | null
    odisease: string | null
    deathTime: string | null
    deathDiagDate1: string | null
    deathDiagDate2: string | null
    deathDiagDate3: string | null
    deathDiagDate4: string | null
    deathCauseText: string | null
    deathCertId: number | null
    deathCertDate: string | null
    deathCertDoctor: string | null
    deathCertDoctorName: string | null
    deathSource: number | null
    deathNumber: string | null
    newbornDeathCauseId: number | null
    hosGuid: string | null
    autopsyPerform: string | null
    noDetail: string | null
    deathHospcode: string | null
    deathPreg42Day: string | null
    updateDatetime: string | null
    staff: string | null
    doctorDxText: string | null
    deathDiagIcd10: string | null
    extHospitalText: string | null
  }
  
  export interface DeathListItem {
    deathId: number
    hn: string
    fullName?: string
    deathDate: string | null
    deathTime: string | null
    deathCause: string | null
    deathCauseText: string | null
    deathPlaceName?: string
    deathPlace: string | null
    deathDiag1: string | null
    deathDiagIcd10: string | null
    deathCertDoctor: string | null
    doctorName?: string
    deathSourceName?: string
    lastUpdate: string | null
  }
  
  export interface DeathSearchParams {
    deathDateFrom?: string
    deathDateTo?: string
    deathPlace?: string
    deathSource?: number
    query?: string
  }
  
  export interface DeathStats {
    total: number
    thisMonth: number
    thisYear: number
    hospital: number
    home: number
  }
  
  // Lookup types
  export interface DeathPlaceLookup {
    id: string
    name: string
  }
  
  export interface DeathSourceLookup {
    id: number
    name: string
  }
  
  export interface NewbornDeathCauseLookup {
    id: number
    name: string
  }
  
  export interface DeathLookups {
    deathPlaces: DeathPlaceLookup[]
    deathSources: DeathSourceLookup[]
    newbornDeathCauses: NewbornDeathCauseLookup[]
  }
  
  export interface Icd10Item {
    code: string
    name: string
    tname: string
  }
  
  export interface DoctorItem {
    code: string
    name: string
    licenseNo: string
  }