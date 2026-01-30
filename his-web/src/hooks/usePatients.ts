// =============================================================================
// File: src/hooks/usePatients.ts
// Description: Patient data fetching hooks
// =============================================================================

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { patientApi } from '@/lib/api';
import { 
  PatientListItem, 
  PatientDetail, 
  PatientSearchParams, 
  PatientStats,
  PatientListResponse,
} from '@/types/patient.types';

// ============================================
// usePatientList - Get paginated patient list
// ============================================
interface UsePatientListOptions {
  initialPage?: number;
  initialLimit?: number;
  autoFetch?: boolean;
}

interface UsePatientListReturn {
  patients: PatientListItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: PatientSearchParams;
  setFilters: (filters: PatientSearchParams) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refresh: () => Promise<void>;
}

export function usePatientList(options: UsePatientListOptions = {}): UsePatientListReturn {
  const { initialPage = 1, initialLimit = 20, autoFetch = true } = options;

  const [patients, setPatients] = useState<PatientListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<PatientSearchParams>({});

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await patientApi.getList({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.query,
        pttype: filters.pttype,
        chwpart: filters.chwpart,
        amppart: filters.amppart,
        isActive: filters.isDead === undefined ? undefined : !filters.isDead,
      });

      setPatients(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch patients';
      setError(message);
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    if (autoFetch) {
      fetchPatients();
    }
  }, [fetchPatients, autoFetch]);

  const setPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setPagination(prev => ({ ...prev, page: 1, limit }));
  }, []);

  const handleSetFilters = useCallback((newFilters: PatientSearchParams) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  return {
    patients,
    loading,
    error,
    pagination,
    filters,
    setFilters: handleSetFilters,
    setPage,
    setLimit,
    refresh: fetchPatients,
  };
}

// ============================================
// usePatientDetail - Get single patient detail
// ============================================
interface UsePatientDetailReturn {
  patient: PatientDetail | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function usePatientDetail(hn: string | null): UsePatientDetailReturn {
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = useCallback(async () => {
    if (!hn) {
      setPatient(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await patientApi.getByHn(hn);
      setPatient(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch patient';
      setError(message);
      console.error('Error fetching patient:', err);
    } finally {
      setLoading(false);
    }
  }, [hn]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  return {
    patient,
    loading,
    error,
    refresh: fetchPatient,
  };
}

// ============================================
// usePatientSearch - Quick search patients
// ============================================
interface UsePatientSearchReturn {
  results: PatientListItem[];
  loading: boolean;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

export function usePatientSearch(debounceMs = 300): UsePatientSearchReturn {
  const [results, setResults] = useState<PatientListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const search = useCallback(async (query: string) => {
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Debounce the search
    const timeout = setTimeout(async () => {
      try {
        const data = await patientApi.search(query, 10);
        setResults(data);
      } catch (err) {
        console.error('Error searching patients:', err);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return {
    results,
    loading,
    search,
    clear,
  };
}

// ============================================
// usePatientStats - Get patient statistics
// ============================================
interface UsePatientStatsReturn {
  stats: PatientStats | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function usePatientStats(): UsePatientStatsReturn {
  const [stats, setStats] = useState<PatientStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await patientApi.getStats();
      setStats(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch stats';
      setError(message);
      console.error('Error fetching patient stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  };
}
