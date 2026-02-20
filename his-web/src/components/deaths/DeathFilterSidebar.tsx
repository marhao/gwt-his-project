// =============================================================================
// File: src/components/deaths/DeathFilterSidebar.tsx
// Description: Filter sidebar for death records
// =============================================================================

'use client'

import { Filter, X } from 'lucide-react'
import DatePicker from '@/components/ui/date-picker/DatePicker'
import type { DeathSearchParams } from '@/types/death.types'
import type { DeathPlaceLookup, DeathSourceLookup } from '@/types/death.types'

interface DeathFilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: DeathSearchParams
  onFiltersChange: (filters: DeathSearchParams) => void
  deathPlaces?: DeathPlaceLookup[]
  deathSources?: DeathSourceLookup[]
}

export const DeathFilterSidebar: React.FC<DeathFilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  deathPlaces = [],
  deathSources = [],
}) => {
  const updateFilter = <K extends keyof DeathSearchParams>(
    key: K,
    value: DeathSearchParams[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== '' && v !== 'all'
  ).length

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className="
          fixed lg:sticky top-0 right-0 lg:top-4
          h-screen lg:h-auto lg:max-h-[calc(100vh-8rem)]
          w-80 lg:w-72
          bg-white dark:bg-slate-900
          border-l lg:border border-slate-200 dark:border-slate-800
          lg:rounded-2xl
          shadow-xl lg:shadow-none
          z-50 lg:z-auto
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-500" />
            <span className="font-semibold text-slate-900 dark:text-white">ตัวกรอง</span>
            {activeFilterCount > 0 && (
              <span className="size-5 bg-primary-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-5">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              วันที่เสียชีวิต
            </label>
            <div className="space-y-2">
              <DatePicker
                value={filters.deathDateFrom || ''}
                onChange={(date) => updateFilter('deathDateFrom', date || undefined)}
                placeholder="ตั้งแต่วันที่..."
                disableFutureDates={true}
              />
              <DatePicker
                value={filters.deathDateTo || ''}
                onChange={(date) => updateFilter('deathDateTo', date || undefined)}
                placeholder="ถึงวันที่..."
                disableFutureDates={true}
                minDate={filters.deathDateFrom}
              />
            </div>
          </div>

          {/* Death Place */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              สถานที่เสียชีวิต
            </label>
            <select
              value={filters.deathPlace || ''}
              onChange={(e) => updateFilter('deathPlace', e.target.value || undefined)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="">ทั้งหมด</option>
              {deathPlaces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Death Source */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              แหล่งข้อมูล
            </label>
            <select
              value={filters.deathSource ?? ''}
              onChange={(e) =>
                updateFilter(
                  'deathSource',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="">ทั้งหมด</option>
              {deathSources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 mt-auto shrink-0">
          <button
            type="button"
            onClick={clearFilters}
            disabled={activeFilterCount === 0}
            className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      </aside>
    </>
  )
}