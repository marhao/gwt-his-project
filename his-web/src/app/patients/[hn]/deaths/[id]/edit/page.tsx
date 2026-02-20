// =============================================================================
// File: src/app/patients/[hn]/deaths/[id]/edit/page.tsx
// Description: Edit Death Record Page
// =============================================================================

'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { AdminLayout } from '@/components/layout'
import { DeathForm } from '@/components/deaths/DeathForm'
import { useDeathLookups } from '@/hooks/useDeathLookups'
import { deathApi } from '@/lib/api/deathApi'
import type { DeathRecord } from '@/types/death.types'
import type { ApiError } from '@/lib/api/client'
import { useEffect } from 'react'

export default function EditDeathPage() {
  const router = useRouter()
  const params = useParams()
  const hn = params.hn as string
  const id = Number(params.id)

  const [record, setRecord] = useState<DeathRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: lookups } = useDeathLookups()

  // Fetch record
  useEffect(() => {
    let cancelled = false

    const fetch = async () => {
      try {
        const res = await deathApi.getById(id)
        if (!cancelled && res.success) {
          setRecord(res.data)
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const apiErr = err as ApiError
          setError(apiErr?.message || 'ไม่พบข้อมูล')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [id])

  const handleSubmit = async (data: Partial<DeathRecord>) => {
    setSaving(true)
    setError(null)

    try {
      const res = await deathApi.update(id, data)
      if (res.success) {
        router.push(`/patients/${hn}/deaths`)
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError
      setError(apiErr?.message || 'เกิดข้อผิดพลาดในการบันทึก')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.push(`/patients/${hn}/deaths`)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ============================================ */}
        {/* Header */}
        {/* ============================================ */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              แก้ไขข้อมูลการเสียชีวิต
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              HN: <span className="font-mono font-medium">{hn}</span>
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* Error Banner */}
        {/* ============================================ */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl flex items-start gap-3">
            <div className="size-5 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              !
            </div>
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-400">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-xs text-red-600 dark:text-red-400 underline mt-1"
              >
                ปิด
              </button>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* Content */}
        {/* ============================================ */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={28} className="animate-spin text-primary-500" />
          </div>
        ) : !record ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              ไม่พบข้อมูล
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              ไม่พบข้อมูลการเสียชีวิตที่ต้องการแก้ไข
            </p>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              กลับ
            </button>
          </div>
        ) : (
          <DeathForm
            initialData={record}
            hn={hn}
            lookups={lookups}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
          />
        )}
      </div>
    </AdminLayout>
  )
}