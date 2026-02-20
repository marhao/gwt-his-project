// =============================================================================
// File: src/components/deaths/DeathCard.tsx
// Description: Card view for death records (Mobile)
// =============================================================================

'use client'

import { useState } from 'react'
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Printer,
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
} from 'lucide-react'
import type { DeathListItem } from '@/types/death.types'

interface DeathCardProps {
  record: DeathListItem
  onView: () => void
  onEdit: () => void
  onDelete: () => void
  onContextMenu: (e: React.MouseEvent) => void
}

export const DeathCard: React.FC<DeathCardProps> = ({
  record,
  onView,
  onEdit,
  onDelete,
  onContextMenu,
}) => {
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all cursor-pointer select-none"
      onClick={onView}
      onContextMenu={onContextMenu}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* สาเหตุ */}
            <div className="flex items-center gap-2 flex-wrap">
              {record.deathCause && (
                <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
                  {record.deathCause}
                </span>
              )}
              {record.deathPlaceName && (
                <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded">
                  {record.deathPlaceName}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1.5 line-clamp-2">
              {record.deathCauseText || 'ไม่ระบุสาเหตุ'}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowActions(!showActions)
            }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          >
            <MoreHorizontal size={18} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Info grid */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={14} className="text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400">
            {record.deathDate || '-'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock size={14} className="text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400">
            {record.deathTime ? `${record.deathTime} น.` : '-'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 truncate">
            {record.deathPlaceName || record.deathPlace || '-'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Stethoscope size={14} className="text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 truncate">
            {record.doctorName || record.deathCertDoctor || '-'}
          </span>
        </div>
      </div>

      {/* Action bar */}
      {showActions && (
        <div className="border-t border-slate-100 dark:border-slate-800 p-2 grid grid-cols-4 gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onView() }}
            className="py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex flex-col items-center gap-1"
          >
            <Eye size={16} />
            ดู
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit() }}
            className="py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex flex-col items-center gap-1"
          >
            <Edit size={16} />
            แก้ไข
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex flex-col items-center gap-1"
          >
            <Printer size={16} />
            พิมพ์
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            className="py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg flex flex-col items-center gap-1"
          >
            <Trash2 size={16} />
            ลบ
          </button>
        </div>
      )}
    </div>
  )
}