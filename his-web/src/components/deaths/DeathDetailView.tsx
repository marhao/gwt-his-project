// =============================================================================
// File: src/components/deaths/DeathDetailView.tsx
// Description: Detail view for a death record - responsive desktop/mobile
// =============================================================================

'use client'

import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  FileText,
  Hash,
  Building2,
  User,
  Baby,
  Clipboard,
  AlertCircle,
  Activity,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react'
import type { DeathRecord } from '@/types/death.types'
import type { DeathLookups } from '@/types/death.types'

// ============================================
// Sub Components
// ============================================

interface InfoItemProps {
  icon: React.ReactNode
  iconBg?: string
  label: string
  value: React.ReactNode
  mono?: boolean
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  iconBg = 'bg-slate-100 dark:bg-slate-800',
  label,
  value,
  mono,
}) => (
  <div className="flex items-start gap-3">
    <div className={`size-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`text-base font-medium text-slate-900 dark:text-white mt-0.5 ${mono ? 'font-mono' : ''}`}>
        {value || <span className="text-slate-300 dark:text-slate-600">—</span>}
      </p>
    </div>
  </div>
)

interface SectionCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children, className = '' }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden ${className}`}>
    <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
      {icon}
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
)

interface DiagRowProps {
  code: string | null
  label: string
  date?: string | null
}

const DiagRow: React.FC<DiagRowProps> = ({ code, label, date }) => {
  if (!code) return null
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-sm px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-semibold text-slate-700 dark:text-slate-300">
          {code}
        </span>
        <span className="text-base text-slate-600 dark:text-slate-400">{label}</span>
      </div>
      {date && <span className="text-sm text-slate-400 tabular-nums">{date}</span>}
    </div>
  )
}

const PlaceBadge: React.FC<{ code: string | null; name?: string }> = ({ code, name }) => {
  if (!name) return <span className="text-slate-300 dark:text-slate-600">—</span>

  const colorMap: Record<string, string> = {
    '1': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    '2': 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    '3': 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    '4': 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${colorMap[code || ''] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
      {name}
    </span>
  )
}

// ============================================
// Main Component
// ============================================

interface DeathDetailViewProps {
  record: DeathRecord
  lookups: DeathLookups
}

export const DeathDetailView: React.FC<DeathDetailViewProps> = ({ record, lookups }) => {
  const deathPlaceName = lookups.deathPlaces.find((p) => p.id === record.deathPlace)?.name
  const deathSourceName = lookups.deathSources.find((s) => s.id === record.deathSource)?.name
  const newbornCauseName = lookups.newbornDeathCauses.find(
    (c) => c.id === record.newbornDeathCauseId
  )?.name

  const hasDiag =
    record.deathDiag1 ||
    record.deathDiag2 ||
    record.deathDiag3 ||
    record.deathDiag4 ||
    record.deathDiagOther ||
    record.deathDiagIcd10

  return (
    <div className="space-y-6">
      {/* ============================================ */}
      {/* Row 1: ข้อมูลหลัก + สาเหตุ (side by side on desktop) */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ข้อมูลการเสียชีวิต */}
        <SectionCard title="ข้อมูลการเสียชีวิต" icon={<Activity size={18} className="text-blue-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoItem
              icon={<Calendar size={16} className="text-blue-500" />}
              iconBg="bg-blue-50 dark:bg-blue-500/10"
              label="วันที่เสียชีวิต"
              value={record.deathDate}
            />
            <InfoItem
              icon={<Clock size={16} className="text-blue-500" />}
              iconBg="bg-blue-50 dark:bg-blue-500/10"
              label="เวลา"
              value={record.deathTime ? `${record.deathTime} น.` : null}
            />
            <InfoItem
              icon={<MapPin size={16} className="text-blue-500" />}
              iconBg="bg-blue-50 dark:bg-blue-500/10"
              label="สถานที่เสียชีวิต"
              value={<PlaceBadge code={record.deathPlace} name={deathPlaceName} />}
            />
            <InfoItem
              icon={<Building2 size={16} className="text-blue-500" />}
              iconBg="bg-blue-50 dark:bg-blue-500/10"
              label="รหัสสถานพยาบาล"
              value={record.deathHospcode}
              mono
            />
            <InfoItem
              icon={<FileText size={16} className="text-blue-500" />}
              iconBg="bg-blue-50 dark:bg-blue-500/10"
              label="แหล่งข้อมูล"
              value={deathSourceName}
            />
            <InfoItem
              icon={<User size={16} className="text-blue-500" />}
              iconBg="bg-blue-50 dark:bg-blue-500/10"
              label="AN (Admission)"
              value={record.an}
              mono
            />
          </div>
        </SectionCard>

        {/* สาเหตุการตาย */}
        <SectionCard title="สาเหตุการตาย" icon={<HeartPulse size={18} className="text-red-500" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InfoItem
                icon={<AlertCircle size={16} className="text-red-500" />}
                iconBg="bg-red-50 dark:bg-red-500/10"
                label="รหัส ICD-10 สาเหตุ"
                value={record.deathCause}
                mono
              />
              <InfoItem
                icon={<Hash size={16} className="text-red-400" />}
                iconBg="bg-red-50 dark:bg-red-500/10"
                label="โรคอื่นที่เกี่ยวข้อง"
                value={record.odisease}
                mono
              />
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <InfoItem
                icon={<Clipboard size={16} className="text-red-400" />}
                iconBg="bg-red-50 dark:bg-red-500/10"
                label="รายละเอียดสาเหตุ"
                value={record.deathCauseText}
              />
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <InfoItem
                icon={<Stethoscope size={16} className="text-red-400" />}
                iconBg="bg-red-50 dark:bg-red-500/10"
                label="วินิจฉัยของแพทย์"
                value={record.doctorDxText}
              />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ============================================ */}
      {/* Row 2: ICD-10 วินิจฉัย + ใบมรณบัตร (side by side) */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* รหัสวินิจฉัย */}
        <SectionCard title="รหัสวินิจฉัย ICD-10" icon={<ShieldCheck size={18} className="text-indigo-500" />}>
          {hasDiag ? (
            <div>
              <DiagRow code={record.deathDiag1} label="วินิจฉัยที่ 1" date={record.deathDiagDate1} />
              <DiagRow code={record.deathDiag2} label="วินิจฉัยที่ 2" date={record.deathDiagDate2} />
              <DiagRow code={record.deathDiag3} label="วินิจฉัยที่ 3" date={record.deathDiagDate3} />
              <DiagRow code={record.deathDiag4} label="วินิจฉัยที่ 4" date={record.deathDiagDate4} />
              <DiagRow code={record.deathDiagOther} label="อื่นๆ" />
              <DiagRow code={record.deathDiagIcd10} label="ICD-10 หลัก" />
            </div>
          ) : (
            <p className="text-base text-slate-400 text-center py-6">ไม่มีรหัสวินิจฉัย</p>
          )}
        </SectionCard>

        {/* ใบมรณบัตร */}
        <SectionCard title="ใบมรณบัตร" icon={<FileText size={18} className="text-emerald-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoItem
              icon={<Hash size={16} className="text-emerald-500" />}
              iconBg="bg-emerald-50 dark:bg-emerald-500/10"
              label="เลขที่ใบมรณบัตร"
              value={record.deathNumber}
              mono
            />
            <InfoItem
              icon={<Calendar size={16} className="text-emerald-500" />}
              iconBg="bg-emerald-50 dark:bg-emerald-500/10"
              label="วันที่ออก"
              value={record.deathCertDate}
            />
            <InfoItem
              icon={<User size={16} className="text-emerald-500" />}
              iconBg="bg-emerald-50 dark:bg-emerald-500/10"
              label="แพทย์ผู้ออก"
              value={
                record.deathCertDoctor ? (
                  <span>
                    {record.deathCertDoctorName || record.deathCertDoctor}
                    {record.deathCertDoctorName && (
                      <span className="text-sm text-slate-400 ml-1.5">({record.deathCertDoctor})</span>
                    )}
                  </span>
                ) : null
              }
            />
            <InfoItem
              icon={<Stethoscope size={16} className="text-emerald-500" />}
              iconBg="bg-emerald-50 dark:bg-emerald-500/10"
              label="ชันสูตรพลิกศพ"
              value={
                record.autopsyPerform === 'Y'
                  ? <span className="text-emerald-600 dark:text-emerald-400">มี</span>
                  : record.autopsyPerform === 'N'
                    ? <span className="text-slate-500">ไม่มี</span>
                    : null
              }
            />
          </div>
        </SectionCard>
      </div>

      {/* ============================================ */}
      {/* Row 3: ข้อมูลเพิ่มเติม (full width) */}
      {/* ============================================ */}
      <SectionCard title="ข้อมูลเพิ่มเติม" icon={<Clipboard size={18} className="text-violet-500" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <InfoItem
            icon={<Baby size={16} className="text-violet-500" />}
            iconBg="bg-violet-50 dark:bg-violet-500/10"
            label="สาเหตุตายทารกแรกเกิด"
            value={newbornCauseName}
          />
          <InfoItem
            icon={<FileText size={16} className="text-violet-500" />}
            iconBg="bg-violet-50 dark:bg-violet-500/10"
            label="ตั้งครรภ์ถึง 42 วันหลังคลอด"
            value={
              record.deathPreg42Day === 'Y'
                ? <span className="text-amber-600 dark:text-amber-400">ใช่</span>
                : record.deathPreg42Day === 'N'
                  ? 'ไม่ใช่'
                  : null
            }
          />
          <InfoItem
            icon={<ShieldCheck size={16} className="text-violet-500" />}
            iconBg="bg-violet-50 dark:bg-violet-500/10"
            label="สิทธิครั้งสุดท้าย"
            value={record.lastPttype}
            mono
          />
          <InfoItem
            icon={<Building2 size={16} className="text-violet-500" />}
            iconBg="bg-violet-50 dark:bg-violet-500/10"
            label="หมายเหตุจาก รพ. อื่น"
            value={record.extHospitalText}
          />
          <InfoItem
            icon={<User size={16} className="text-violet-500" />}
            iconBg="bg-violet-50 dark:bg-violet-500/10"
            label="ผู้บันทึก"
            value={record.staff}
          />
          <InfoItem
            icon={<Clock size={16} className="text-violet-500" />}
            iconBg="bg-violet-50 dark:bg-violet-500/10"
            label="อัปเดตล่าสุด"
            value={record.updateDatetime}
          />
        </div>
      </SectionCard>
    </div>
  )
}