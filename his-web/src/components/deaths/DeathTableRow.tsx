// =============================================================================
// File: src/components/deaths/DeathTableRow.tsx
// Description: Table row for death records (Desktop view)
// =============================================================================

'use client'

import { useState } from 'react'
import { MoreHorizontal, Eye, Edit, Trash2, Printer, FileText } from 'lucide-react'
import type { DeathListItem } from '@/types/death.types'

interface DeathTableRowProps {
  record: DeathListItem
  onView: () => void
  onEdit: () => void
  onDelete: () => void
  onContextMenu: (e: React.MouseEvent) => void
}

export const DeathTableRow: React.FC<DeathTableRowProps> = ({
  record,
  onView,
  onEdit,
  onDelete,
  onContextMenu,
}) => {
  const [showActions, setShowActions] = useState(false)

  const placeColor = () => {
    switch (record.deathPlace) {
      case '1':
        return 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
      case '2':
        return 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
      case '3':
        return 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
    }
  }

  return (
    <tr
      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
      onClick={onView}
      onContextMenu={onContextMenu}
    >
      {/* วันที่เสียชีวิต */}
      <td className="px-4 py-3">
        <div>
          <span className="font-medium text-slate-900 dark:text-white text-sm">
            {record.deathDate || '-'}
          </span>
          {record.deathTime && (
            <span className="block text-xs text-slate-500 mt-0.5">{record.deathTime} น.</span>
          )}
        </div>
      </td>

      {/* สาเหตุการตาย */}
      <td className="px-4 py-3">
        <div>
          {record.deathCause && (
            <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
              {record.deathCause}
            </span>
          )}
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1">
            {record.deathCauseText || '-'}
          </p>
        </div>
      </td>

      {/* ICD-10 วินิจฉัย */}
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-slate-600 dark:text-slate-400">
          {record.deathDiag1 || record.deathDiagIcd10 || '-'}
        </span>
      </td>

      {/* สถานที่ */}
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded text-xs font-medium ${placeColor()}`}>
          {record.deathPlaceName || record.deathPlace || '-'}
        </span>
      </td>

      {/* แพทย์ */}
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        {record.doctorName || record.deathCertDoctor || '-'}
      </td>

      {/* อัปเดตล่าสุด */}
      <td className="px-4 py-3 text-sm text-slate-500">
        {record.lastUpdate || '-'}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowActions(!showActions)
            }}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <MoreHorizontal size={16} className="text-slate-400" />
          </button>

          {showActions && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowActions(false)
                }}
              />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                <button
                  onClick={(e) => { e.stopPropagation(); onView() }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Eye size={14} /> ดูรายละเอียด
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit() }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Edit size={14} /> แก้ไข
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <FileText size={14} /> ใบมรณบัตร
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Printer size={14} /> พิมพ์
                </button>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowActions(false)
                    onDelete()
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={14} /> ลบข้อมูล
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}