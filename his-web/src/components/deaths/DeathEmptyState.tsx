// =============================================================================
// File: src/components/deaths/DeathEmptyState.tsx
// Description: Empty state when no death record exists for a patient
// =============================================================================

'use client'

import { Skull, Plus } from 'lucide-react'

interface DeathEmptyStateProps {
  onCreateClick: () => void
}

export const DeathEmptyState: React.FC<DeathEmptyStateProps> = ({ onCreateClick }) => (
  <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
    <div className="size-20 mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-5">
      <Skull size={40} className="text-slate-300 dark:text-slate-600" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
      ไม่มีข้อมูลการเสียชีวิต
    </h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
      ยังไม่มีการบันทึกข้อมูลการเสียชีวิตสำหรับผู้ป่วยรายนี้
    </p>
    <button
      onClick={onCreateClick}
      className="px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors inline-flex items-center gap-2 shadow-lg shadow-primary-500/30"
    >
      <Plus size={16} />
      บันทึกการเสียชีวิต
    </button>
  </div>
)