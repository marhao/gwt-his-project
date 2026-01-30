// src/hooks/useOpdVisitLookups.ts

import { useState, useEffect, useCallback } from 'react';
import { lookupApi } from '@/lib/api/lookups';
import type { 
  OvstistLookup, 
  PttypeLookup, 
  DepartmentLookup, 
  DoctorLookup,
  SpcltyLookup,
} from '@/lib/api/types';

interface UseOpdVisitLookupsResult {
  // Data
  ovstists: OvstistLookup[];
  pttypes: PttypeLookup[];
  departments: DepartmentLookup[];
  doctors: DoctorLookup[];
  spclties: SpcltyLookup[];
  
  // Options formatted for select components
  visitTypeOptions: { value: string; label: string }[];
  pttypeOptions: { value: string; label: string }[];
  departmentOptions: { value: string; label: string }[];
  doctorOptions: { value: string; label: string }[];
  spcltyOptions: { value: string; label: string }[];
  
  // State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  refetch: () => Promise<void>;
  getDoctorsByDepartment: (depcode: string) => DoctorLookup[];
  getDoctorsBySpclty: (spclty: string) => DoctorLookup[];
  getSpcltyByDepartment: (depcode: string) => string | undefined;
}

export function useOpdVisitLookups(): UseOpdVisitLookupsResult {
  const [ovstists, setOvstists] = useState<OvstistLookup[]>([]);
  const [pttypes, setPttypes] = useState<PttypeLookup[]>([]);
  const [departments, setDepartments] = useState<DepartmentLookup[]>([]);
  const [doctors, setDoctors] = useState<DoctorLookup[]>([]);
  const [spclties, setSpclties] = useState<SpcltyLookup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLookups = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await lookupApi.getOpdVisitLookups();
      
      if (response.success && response.data) {
        setOvstists(response.data.ovstists);
        setPttypes(response.data.pttypes);
        setDepartments(response.data.departments);
        setDoctors(response.data.doctors);
        setSpclties(response.data.spclties || []);
      }
    } catch (err) {
      console.error('Failed to fetch OPD visit lookups:', err);
      setError('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLookups();
  }, [fetchLookups]);

  // Format for select components
  const visitTypeOptions = ovstists.map((item) => ({
    value: item.code,
    label: item.label || `${item.code} - ${item.name}`,
  }));

  const pttypeOptions = pttypes.map((item) => ({
    value: item.code,
    label: item.label || `${item.code} - ${item.name}`,
  }));

  const departmentOptions = [
    { value: '', label: 'เลือกห้องตรวจ...' },
    ...departments.map((item) => ({
      value: item.code,
      label: item.label || `${item.code} - ${item.name}`,
    })),
  ];

  const doctorOptions = [
    { value: '', label: 'เลือกแพทย์...' },
    ...doctors.map((item) => ({
      value: item.code,
      label: item.label || item.name,
    })),
  ];

  const spcltyOptions = [
    //{ value: '', label: 'เลือกแผนก/ความเชี่ยวชาญ...' },
    ...spclties.map((item) => ({
      value: item.code,
      label: item.label || `${item.code} - ${item.name}`,
    })),
  ];

  // Filter doctors by department
  const getDoctorsByDepartment = useCallback(
    (depcode: string): DoctorLookup[] => {
      if (!depcode) return doctors;
      return doctors.filter((doc) => doc.depcode === depcode);
    },
    [doctors]
  );

  // Filter doctors by specialty
  const getDoctorsBySpclty = useCallback(
    (spclty: string): DoctorLookup[] => {
      if (!spclty) return doctors;
      return doctors.filter((doc) => doc.specialty === spclty);
    },
    [doctors]
  );

  // Get spclty by department code
  const getSpcltyByDepartment = useCallback(
    (depcode: string): string | undefined => {
      if (!depcode) return undefined;
      const dept = departments.find((d) => d.code === depcode);
      return dept?.spclty;
    },
    [departments]
  );

  return {
    // Data
    ovstists,
    pttypes,
    departments,
    doctors,
    spclties,
    
    // Options
    visitTypeOptions,
    pttypeOptions,
    departmentOptions,
    doctorOptions,
    spcltyOptions,
    
    // State
    isLoading,
    error,
    
    // Actions
    refetch: fetchLookups,
    getDoctorsByDepartment,
    getDoctorsBySpclty,
    getSpcltyByDepartment,
  };
}