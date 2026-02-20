// =============================================================================
// File: src/hooks/useDeathRecord.ts
// Description: Hook for fetching a single death record by HN
// =============================================================================

import { useState, useEffect, useCallback } from 'react'
import { deathApi } from '@/lib/api/deathApi'
import type { DeathRecord } from '@/types/death.types'
import type { ApiError } from '@/lib/api/client'

export function useDeathRecord(hn: string) {
  const [data, setData] = useState<DeathRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const fetchData = useCallback(async () => {
    if (!hn) return
    setLoading(true)
    setError(null)
    setNotFound(false)

    try {
      const res = await deathApi.list(hn)
      if (res.success) {
        const records = res.data?.data || res.data
        if (Array.isArray(records) && records.length > 0) {
          setData(records[0])
        } else {
          setNotFound(true)
        }
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError
      if (apiErr?.status === 404) {
        setNotFound(true)
      } else {
        setError(apiErr?.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล')
      }
    } finally {
      setLoading(false)
    }
  }, [hn])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refresh = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  return { data, loading, error, notFound, refresh }
}