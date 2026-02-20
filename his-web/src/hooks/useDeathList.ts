// =============================================================================
// File: src/hooks/useDeathList.ts
// Description: Hook for fetching death records list with pagination & filters
// =============================================================================

import { useState, useEffect, useCallback } from 'react'
import { deathApi } from '@/lib/api/deathApi'
import type { DeathListItem, DeathSearchParams } from '@/types/death.types'

interface UseDeathListOptions {
  hn: string
  initialLimit?: number
}

interface Pagination {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export function useDeathList({ hn, initialLimit = 20 }: UseDeathListOptions) {
  const [deaths, setDeaths] = useState<DeathListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<DeathSearchParams>({})
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: initialLimit,
    total: 0,
    totalPages: 0,
  })

  const fetchData = useCallback(async () => {
    if (!hn) return
    setLoading(true)
    setError(null)

    try {
      const res = await deathApi.list(hn, {
        ...filters,
        page: pagination.page,
        perPage: pagination.perPage,
      })

      if (res.success) {
        setDeaths(res.data.data || res.data)
        if (res.data.meta) {
          setPagination((prev) => ({
            ...prev,
            total: res.data.meta.total,
            totalPages: res.data.meta.lastPage,
          }))
        }
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล')
    } finally {
      setLoading(false)
    }
  }, [hn, filters, pagination.page, pagination.perPage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  const refresh = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  return {
    deaths,
    loading,
    error,
    pagination,
    setFilters,
    setPage,
    refresh,
  }
}