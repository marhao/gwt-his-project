// =============================================================================
// File: src/hooks/useDeathLookups.ts
// Description: Hook for fetching death-related lookup data
// =============================================================================

import { useState, useEffect } from 'react'
import { deathApi } from '@/lib/api/deathApi'
import type { DeathLookups } from '@/types/death.types'
import type { ApiError } from '@/lib/api/client'

const DEFAULT_LOOKUPS: DeathLookups = {
  deathPlaces: [],
  deathSources: [],
  newbornDeathCauses: [],
}

/**
 * Normalize raw API response (snake_case from DB) → typed lookups
 */
function normalizeLookups(raw: any): DeathLookups {
  return {
    deathPlaces: (raw.deathPlaces || []).map((p: any) => ({
      id: String(p.death_place_id ?? p.id ?? ''),
      name: String(p.death_place_name ?? p.name ?? ''),
    })),
    deathSources: (raw.deathSources || []).map((s: any) => ({
      id: Number(s.death_source_id ?? s.id ?? 0),
      name: String(s.death_source_name ?? s.name ?? ''),
    })),
    newbornDeathCauses: (raw.newbornDeathCauses || []).map((c: any) => ({
      id: Number(c.newborn_death_cause_id ?? c.id ?? 0),
      name: String(c.name ?? ''),
    })),
  }
}

export function useDeathLookups() {
  const [data, setData] = useState<DeathLookups>(DEFAULT_LOOKUPS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetch = async () => {
      try {
        const res = await deathApi.getLookups()
        if (!cancelled && res.success) {
          setData(normalizeLookups(res.data))
        }
      } catch (err: unknown) {
        if (cancelled) return

        const apiErr = err as ApiError
        const message = apiErr?.message || 'Failed to fetch death lookups'
        const status = apiErr?.status || 0

        console.error(`Error fetching death lookups [${status}]: ${message}`)
        setError(message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [])

  return { data, loading, error }
}