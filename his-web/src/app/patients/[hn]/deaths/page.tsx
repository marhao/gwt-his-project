// =============================================================================
// File: src/app/patients/[hn]/deaths/page.tsx
// Description: Death Record Detail Page for a specific patient
//              - ถ้ามีข้อมูล → แสดงรายละเอียด (responsive 2-col desktop)
//              - ถ้ายังไม่มี → แสดง empty state + ปุ่มบันทึก
// =============================================================================

'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Printer,
  FileText,
  RefreshCw,
  MoreHorizontal,
} from 'lucide-react'
import { AdminLayout } from '@/components/layout'
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog'
import { DeathDetailView, DeathEmptyState } from '@/components/deaths'
import { useDeathRecord } from '@/hooks/useDeathRecord'
import { useDeathLookups } from '@/hooks/useDeathLookups'
import { deathApi } from '@/lib/api/deathApi'
import type { DeathRecord } from '@/types/death.types'

export default function PatientDeathPage() {
  const router = useRouter()
  const params = useParams()
  const hn = params.hn as string

  const [showActions, setShowActions] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Data hooks
  const { data: record, loading, error, notFound, refresh } = useDeathRecord(hn)
  const { data: lookups } = useDeathLookups()

  // Confirm Delete
  const deleteDialog = useConfirmDialog<DeathRecord>({
    onConfirm: async (rec) => {
      setDeleting(true)
      try {
        await deathApi.delete(rec.deathId)
        await refresh()
      } catch (err) {
        console.error('Error deleting death record:', err)
      } finally {
        setDeleting(false)
      }
    },
  })

  const handleCreate = () => {
    router.push(`/patients/${hn}/deaths/create`)
  }

  const handleEdit = () => {
    if (record) {
      router.push(`/patients/${hn}/deaths/${record.deathId}/edit`)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ============================================ */}
        {/* Header */}
        {/* ============================================ */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.push(`/patients/${hn}`)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
            >
              <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
                ข้อมูลการเสียชีวิต
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                HN: <span className="font-mono font-medium">{hn}</span>
              </p>
            </div>
          </div>

          {/* Actions (show only when record exists) */}
          {record && !loading && (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={refresh}
                disabled={loading}
                className="hidden sm:flex p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                title="รีเฟรช"
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleEdit}
                className="p-2.5 sm:px-4 sm:py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30"
              >
                <Edit size={16} />
                <span className="hidden sm:inline">แก้ไข</span>
              </button>

              {/* More Actions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <MoreHorizontal size={18} />
                </button>

                {showActions && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowActions(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                      <button
                        onClick={() => setShowActions(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Printer size={14} /> พิมพ์
                      </button>
                      <button
                        onClick={() => setShowActions(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <FileText size={14} /> ใบมรณบัตร
                      </button>
                      <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                      <button
                        onClick={() => {
                          setShowActions(false)
                          if (record) deleteDialog.open(record)
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <Trash2 size={14} /> ลบข้อมูล
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* Content */}
        {/* ============================================ */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={28} className="animate-spin text-primary-500" />
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-800">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={refresh}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw size={16} />
              ลองใหม่
            </button>
          </div>
        ) : notFound || !record ? (
          <DeathEmptyState onCreateClick={handleCreate} />
        ) : (
          <DeathDetailView record={record} lookups={lookups} />
        )}

        {/* ============================================ */}
        {/* Delete Confirm Dialog */}
        {/* ============================================ */}
        <ConfirmDialog
          {...deleteDialog.dialogProps}
          variant="danger"
          title="ยืนยันการลบข้อมูล"
          message={
            deleteDialog.data ? (
              <>
                คุณต้องการลบข้อมูลการเสียชีวิต วันที่{' '}
                <strong>{deleteDialog.data.deathDate}</strong> ใช่หรือไม่?
                <br />
                <span className="text-red-500">
                  การดำเนินการนี้ไม่สามารถย้อนกลับได้
                </span>
              </>
            ) : (
              ''
            )
          }
          confirmText="ลบข้อมูล"
        />
      </div>
    </AdminLayout>
  )
}