// =============================================================================
// File: src/components/deaths/DeathStatsCards.tsx
// Description: Stats cards for death records overview
// =============================================================================

'use client'

import { Skull, CalendarDays, Building2, Home } from 'lucide-react'
import type { DeathStats } from '@/types/death.types'

interface StatsCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  color: 'slate' | 'red' | 'amber' | 'blue'
  loading?: boolean
}

const colorMap = {
  slate: 'from-slate-500 to-slate-600 shadow-slate-500/30',
  red: 'from-red-500 to-red-600 shadow-red-500/30',
  amber: 'from-amber-500 to-amber-600 shadow-amber-500/30',
  blue: 'from-blue-500 to-blue-600 shadow-blue-500/30',
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, color, loading }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          {loading ? '—' : typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      <div className={`size-12 rounded-xl bg-linear-to-br ${colorMap[color]} shadow-lg flex items-center justify-center text-white`}>
        {icon}
      </div>
    </div>
  </div>
)

interface DeathStatsCardsProps {
  stats: DeathStats | null
  loading?: boolean
}

export const DeathStatsCards: React.FC<DeathStatsCardsProps> = ({ stats, loading }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <StatsCard
      label="เสียชีวิตทั้งหมด"
      value={stats?.total ?? 0}
      icon={<Skull size={20} />}
      color="slate"
      loading={loading}
    />
    <StatsCard
      label="เดือนนี้"
      value={stats?.thisMonth ?? 0}
      icon={<CalendarDays size={20} />}
      color="red"
      loading={loading}
    />
    <StatsCard
      label="เสียชีวิตในรพ."
      value={stats?.hospital ?? 0}
      icon={<Building2 size={20} />}
      color="blue"
      loading={loading}
    />
    <StatsCard
      label="เสียชีวิตที่บ้าน"
      value={stats?.home ?? 0}
      icon={<Home size={20} />}
      color="amber"
      loading={loading}
    />
  </div>
)