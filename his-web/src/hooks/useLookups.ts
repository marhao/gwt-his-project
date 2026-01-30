// =============================================================================
// File: src/hooks/useLookups.ts
// Description: Lookup data fetching hooks for dropdowns
// =============================================================================

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  lookupApi, 
  LookupItem, 
  PnameLookup, 
  PttypeLookup, 
  SubdistrictLookup,
  AddressSearchResult,
} from '@/lib/api';

// ============================================
// Generic Lookup Hook
// ============================================
interface UseLookupReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

function createLookupHook<T>(
  fetchFn: () => Promise<{ success: boolean; data: T[] }>
) {
  return function useLookup(): UseLookupReturn<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFn();
        setData(response.data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(message);
        console.error('Lookup error:', err);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetch();
    }, [fetch]);

    return { data, loading, error, refresh: fetch };
  };
}

// ============================================
// Individual Lookup Hooks
// ============================================

// คำนำหน้าชื่อ
export function usePnames(sex?: 'M' | 'F'): UseLookupReturn<PnameLookup> {
  const [data, setData] = useState<PnameLookup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await lookupApi.getPnames(sex);
      setData(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch pnames';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [sex]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}

// อาชีพ
export const useOccupations = createLookupHook(lookupApi.getOccupations);

// เชื้อชาติ/สัญชาติ
export const useNationalities = createLookupHook(lookupApi.getNationalities);

// ศาสนา
export const useReligions = createLookupHook(lookupApi.getReligions);

// สถานะสมรส
export const useMarryStatuses = createLookupHook(lookupApi.getMarryStatuses);

// การศึกษา
export const useEducations = createLookupHook(lookupApi.getEducations);

// ความสัมพันธ์
export const useRelationTypes = createLookupHook(lookupApi.getRelationTypes);

// สิทธิการรักษา
export function usePttypes(activeOnly = true): UseLookupReturn<PttypeLookup> {
  const [data, setData] = useState<PttypeLookup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await lookupApi.getPttypes(activeOnly);
      setData(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch pttypes';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}

// ============================================
// Thai Address Hooks
// ============================================

// จังหวัด
export const useProvinces = createLookupHook(lookupApi.getProvinces);

// อำเภอ
export function useDistricts(chwpart: string | null): UseLookupReturn<LookupItem> {
  const [data, setData] = useState<LookupItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!chwpart) {
      setData([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await lookupApi.getDistricts(chwpart);
      setData(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch districts';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [chwpart]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}

// ตำบล
export function useSubdistricts(
  chwpart: string | null, 
  amppart: string | null
): UseLookupReturn<SubdistrictLookup> {
  const [data, setData] = useState<SubdistrictLookup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!chwpart || !amppart) {
      setData([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await lookupApi.getSubdistricts(chwpart, amppart);
      setData(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch subdistricts';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [chwpart, amppart]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}

// ============================================
// Address Search Hook
// ============================================
interface UseAddressSearchReturn {
  results: AddressSearchResult[];
  loading: boolean;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

export function useAddressSearch(debounceMs = 300): UseAddressSearchReturn {
  const [results, setResults] = useState<AddressSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const search = useCallback(async (query: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const response = await lookupApi.searchAddress(query, 20);
        setResults(response.data);
      } catch (err) {
        console.error('Error searching address:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    setSearchTimeout(timeout);
  }, [debounceMs, searchTimeout]);

  const clear = useCallback(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setResults([]);
    setLoading(false);
  }, [searchTimeout]);

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return { results, loading, search, clear };
}

// ============================================
// Combined Thai Address Hook
// ============================================
interface UseThaiAddressReturn {
  provinces: LookupItem[];
  districts: LookupItem[];
  subdistricts: SubdistrictLookup[];
  loadingProvinces: boolean;
  loadingDistricts: boolean;
  loadingSubdistricts: boolean;
  selectedProvince: string | null;
  selectedDistrict: string | null;
  selectedSubdistrict: string | null;
  setProvince: (code: string | null) => void;
  setDistrict: (code: string | null) => void;
  setSubdistrict: (code: string | null) => void;
  getPostalCode: () => string | null;
  reset: () => void;
}

export function useThaiAddress(initialValues?: {
  chwpart?: string | null;
  amppart?: string | null;
  tmbpart?: string | null;
}): UseThaiAddressReturn {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(initialValues?.chwpart || null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(initialValues?.amppart || null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string | null>(initialValues?.tmbpart || null);

  const { data: provinces, loading: loadingProvinces } = useProvinces();
  const { data: districts, loading: loadingDistricts } = useDistricts(selectedProvince);
  const { data: subdistricts, loading: loadingSubdistricts } = useSubdistricts(selectedProvince, selectedDistrict);

  const setProvince = useCallback((code: string | null) => {
    setSelectedProvince(code);
    setSelectedDistrict(null);
    setSelectedSubdistrict(null);
  }, []);

  const setDistrict = useCallback((code: string | null) => {
    setSelectedDistrict(code);
    setSelectedSubdistrict(null);
  }, []);

  const setSubdistrict = useCallback((code: string | null) => {
    setSelectedSubdistrict(code);
  }, []);

  const getPostalCode = useCallback((): string | null => {
    if (!selectedSubdistrict) return null;
    const subdistrict = subdistricts.find(s => s.code === selectedSubdistrict);
    return subdistrict?.pocode || null;
  }, [selectedSubdistrict, subdistricts]);

  const reset = useCallback(() => {
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedSubdistrict(null);
  }, []);

  return {
    provinces,
    districts,
    subdistricts,
    loadingProvinces,
    loadingDistricts,
    loadingSubdistricts,
    selectedProvince,
    selectedDistrict,
    selectedSubdistrict,
    setProvince,
    setDistrict,
    setSubdistrict,
    getPostalCode,
    reset,
  };
}

// ============================================
// All Lookups Hook (for forms)
// ============================================
interface UseAllLookupsReturn {
  pnames: PnameLookup[];
  pttypes: PttypeLookup[];
  occupations: LookupItem[];
  nationalities: LookupItem[];
  religions: LookupItem[];
  marryStatuses: LookupItem[];
  educations: LookupItem[];
  relationTypes: LookupItem[];
  loading: boolean;
}

export function useAllLookups(): UseAllLookupsReturn {
  const pnamesResult = usePnames();
  const pttypesResult = usePttypes();
  const occupationsResult = useOccupations();
  const nationalitiesResult = useNationalities();
  const religionsResult = useReligions();
  const marryStatusesResult = useMarryStatuses();
  const educationsResult = useEducations();
  const relationTypesResult = useRelationTypes();

  const loading = 
    pnamesResult.loading ||
    pttypesResult.loading ||
    occupationsResult.loading ||
    nationalitiesResult.loading ||
    religionsResult.loading ||
    marryStatusesResult.loading ||
    educationsResult.loading ||
    relationTypesResult.loading;

  return {
    pnames: pnamesResult.data,
    pttypes: pttypesResult.data,
    occupations: occupationsResult.data,
    nationalities: nationalitiesResult.data,
    religions: religionsResult.data,
    marryStatuses: marryStatusesResult.data,
    educations: educationsResult.data,
    relationTypes: relationTypesResult.data,
    loading,
  };
}
