// =============================================================================
// File: src/components/deaths/DeathForm.tsx
// Description: Reusable form for creating/editing death records
//              Layout matches DeathDetailView sections
// =============================================================================

'use client'

import { useState, useCallback } from 'react'
import {
  Activity,
  AlertCircle,
  ShieldCheck,
  FileText,
  Clipboard,
  HeartPulse,
  Save,
  Loader2,
} from 'lucide-react'
import DatePicker from '@/components/ui/date-picker/DatePicker'
import CustomSelect, { type Option as SelectOption } from '@/components/ui/CustomSelect'
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog'
import { deathApi } from '@/lib/api/deathApi'
import type { DeathRecord, DeathLookups } from '@/types/death.types'

// ============================================
// Sub Components
// ============================================

interface SectionCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
    <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 rounded-t-2xl flex items-center gap-2">
      {icon && <span className="text-slate-400">{icon}</span>}
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
    </div>
    <div className="p-5 overflow-visible">{children}</div>
  </div>
)

interface FieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

const Field: React.FC<FieldProps> = ({ label, required, children, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
)

const inputClass =
  'w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 disabled:opacity-50'

const textareaClass =
  'w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 disabled:opacity-50 resize-none'

// ============================================
// Main Form Component
// ============================================

interface DeathFormProps {
  initialData?: DeathRecord | null
  hn: string
  lookups: DeathLookups
  onSubmit: (data: Partial<DeathRecord>) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export const DeathForm: React.FC<DeathFormProps> = ({
  initialData,
  hn,
  lookups,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const isEdit = !!initialData

  // Display names for autocomplete fields (show name, submit code)
  const [doctorDisplayName, setDoctorDisplayName] = useState(
    initialData?.deathCertDoctorName || initialData?.deathCertDoctor || ''
  )

  // Form state
  const [form, setForm] = useState<Partial<DeathRecord>>({
    hn,
    deathDate: initialData?.deathDate || '',
    deathTime: initialData?.deathTime || '',
    deathPlace: initialData?.deathPlace || '',
    deathHospcode: initialData?.deathHospcode || '',
    deathSource: initialData?.deathSource ?? undefined,
    an: initialData?.an || '',
    deathCause: initialData?.deathCause || '',
    deathCauseText: initialData?.deathCauseText || '',
    odisease: initialData?.odisease || '',
    doctorDxText: initialData?.doctorDxText || '',
    deathDiag1: initialData?.deathDiag1 || '',
    deathDiag2: initialData?.deathDiag2 || '',
    deathDiag3: initialData?.deathDiag3 || '',
    deathDiag4: initialData?.deathDiag4 || '',
    deathDiagOther: initialData?.deathDiagOther || '',
    deathDiagDate1: initialData?.deathDiagDate1 || '',
    deathDiagDate2: initialData?.deathDiagDate2 || '',
    deathDiagDate3: initialData?.deathDiagDate3 || '',
    deathDiagDate4: initialData?.deathDiagDate4 || '',
    deathNumber: initialData?.deathNumber || '',
    deathCertDate: initialData?.deathCertDate || '',
    deathCertDoctor: initialData?.deathCertDoctor || '',
    autopsyPerform: initialData?.autopsyPerform || '',
    newbornDeathCauseId: initialData?.newbornDeathCauseId ?? undefined,
    deathPreg42Day: initialData?.deathPreg42Day || '',
    lastPttype: initialData?.lastPttype || '',
    extHospitalText: initialData?.extHospitalText || '',
  })

  const updateField = <K extends keyof DeathRecord>(key: K, value: DeathRecord[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // ICD-10 search handler
  const searchIcd10 = useCallback(async (q: string): Promise<SelectOption[]> => {
    const res = await deathApi.searchIcd10(q)
    if (!res.success) return []
    return res.data.map((item) => ({
      value: item.code,
      label: `${item.code} — ${item.tname || item.name}`,
      description: item.tname ? item.name : undefined,
    }))
  }, [])

  // Doctor search handler
  const searchDoctors = useCallback(async (q: string): Promise<SelectOption[]> => {
    const res = await deathApi.searchDoctors(q)
    if (!res.success) return []
    return res.data.map((item) => ({
      value: item.code,
      label: item.name,
      description: `รหัส: ${item.code}`,
    }))
  }, [])

  // Confirm dialog
  const saveDialog = useConfirmDialog<Partial<DeathRecord>>({
    onConfirm: async (formData) => {
      await onSubmit(formData)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveDialog.open(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ============================================ */}
      {/* Row 1: ข้อมูลหลัก + สาเหตุ */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ข้อมูลการเสียชีวิต */}
        <SectionCard title="ข้อมูลการเสียชีวิต" icon={<Activity size={18} className="text-blue-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="วันที่เสียชีวิต" required>
              <DatePicker
                value={form.deathDate || ''}
                onChange={(date) => updateField('deathDate', date || '')}
                placeholder="เลือกวันที่..."
                disableFutureDates
              />
            </Field>

            <Field label="เวลา">
              <input
                type="time"
                value={form.deathTime || ''}
                onChange={(e) => updateField('deathTime', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="สถานที่เสียชีวิต">
              <CustomSelect
                options={lookups.deathPlaces.map((p) => ({
                  value: p.id,
                  label: p.name,
                }))}
                value={form.deathPlace || ''}
                onChange={(val) => updateField('deathPlace', val)}
                placeholder="— เลือกสถานที่ —"
                searchable
                clearable
                usePortal={false}
                size="md"
              />
            </Field>

            <Field label="รหัสสถานพยาบาล">
              <input
                type="text"
                value={form.deathHospcode || ''}
                onChange={(e) => updateField('deathHospcode', e.target.value)}
                placeholder="รหัส 5-9 หลัก"
                maxLength={9}
                className={inputClass}
              />
            </Field>

            <Field label="แหล่งข้อมูล">
              <CustomSelect
                options={lookups.deathSources.map((s) => ({
                  value: String(s.id),
                  label: s.name,
                }))}
                value={form.deathSource != null ? String(form.deathSource) : ''}
                onChange={(val) => updateField('deathSource', val ? Number(val) : null)}
                placeholder="— เลือกแหล่งข้อมูล —"
                searchable
                clearable
                usePortal={false}
                size="md"
              />
            </Field>

            <Field label="AN (Admission)">
              <input
                type="text"
                value={form.an || ''}
                onChange={(e) => updateField('an', e.target.value)}
                maxLength={9}
                className={`${inputClass} font-mono`}
              />
            </Field>
          </div>
        </SectionCard>

        {/* สาเหตุการตาย */}
        <SectionCard title="สาเหตุการตาย" icon={<HeartPulse size={18} className="text-red-500" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="รหัส ICD-10 สาเหตุ">
                <CustomSelect
                  options={[]}
                  value={form.deathCause || ''}
                  onChange={(val) => updateField('deathCause', val)}
                  onSearch={searchIcd10}
                  placeholder="พิมพ์รหัสหรือชื่อโรค..."
                  displayValue={form.deathCause || ''}
                  searchable
                  clearable
                  usePortal={false}
                  size="md"
                />
              </Field>

              <Field label="โรคอื่นที่เกี่ยวข้อง">
                <CustomSelect
                  options={[]}
                  value={form.odisease || ''}
                  onChange={(val) => updateField('odisease', val)}
                  onSearch={searchIcd10}
                  placeholder="พิมพ์รหัสหรือชื่อโรค..."
                  displayValue={form.odisease || ''}
                  searchable
                  clearable
                  usePortal={false}
                  size="md"
                />
              </Field>
            </div>

            <Field label="รายละเอียดสาเหตุ">
              <textarea
                value={form.deathCauseText || ''}
                onChange={(e) => updateField('deathCauseText', e.target.value)}
                rows={3}
                maxLength={250}
                placeholder="ระบุรายละเอียดสาเหตุการตาย..."
                className={textareaClass}
              />
            </Field>

            <Field label="วินิจฉัยของแพทย์">
              <textarea
                value={form.doctorDxText || ''}
                onChange={(e) => updateField('doctorDxText', e.target.value)}
                rows={3}
                placeholder="วินิจฉัยของแพทย์..."
                className={textareaClass}
              />
            </Field>
          </div>
        </SectionCard>
      </div>

      {/* ============================================ */}
      {/* Row 2: ICD-10 วินิจฉัย + ใบมรณบัตร */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* รหัสวินิจฉัย */}
        <SectionCard title="รหัสวินิจฉัย ICD-10" icon={<ShieldCheck size={18} className="text-indigo-500" />}>
          <div className="space-y-4">
            {([
              { key: 'deathDiag1' as const, dateKey: 'deathDiagDate1' as const, label: 'วินิจฉัยที่ 1' },
              { key: 'deathDiag2' as const, dateKey: 'deathDiagDate2' as const, label: 'วินิจฉัยที่ 2' },
              { key: 'deathDiag3' as const, dateKey: 'deathDiagDate3' as const, label: 'วินิจฉัยที่ 3' },
              { key: 'deathDiag4' as const, dateKey: 'deathDiagDate4' as const, label: 'วินิจฉัยที่ 4' },
            ]).map(({ key, dateKey, label }) => (
              <div key={key} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                <div className="sm:col-span-3">
                  <Field label={label}>
                    <CustomSelect
                      options={[]}
                      value={form[key] || ''}
                      onChange={(val) => updateField(key, val)}
                      onSearch={searchIcd10}
                      placeholder="รหัส ICD-10..."
                      displayValue={form[key] || ''}
                      searchable
                      clearable
                      usePortal={false}
                      size="md"
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="วันที่วินิจฉัย">
                    <DatePicker
                      value={form[dateKey] || ''}
                      onChange={(date) => updateField(dateKey, date || '')}
                      placeholder="วันที่..."
                      disableFutureDates
                    />
                  </Field>
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <Field label="วินิจฉัยอื่นๆ">
                <CustomSelect
                  options={[]}
                  value={form.deathDiagOther || ''}
                  onChange={(val) => updateField('deathDiagOther', val)}
                  onSearch={searchIcd10}
                  placeholder="รหัส ICD-10..."
                  displayValue={form.deathDiagOther || ''}
                  searchable
                  clearable
                  usePortal={false}
                  size="md"
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* ใบมรณบัตร */}
        <SectionCard title="ใบมรณบัตร" icon={<FileText size={18} className="text-emerald-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="เลขที่ใบมรณบัตร">
              <input
                type="text"
                value={form.deathNumber || ''}
                onChange={(e) => updateField('deathNumber', e.target.value)}
                maxLength={25}
                className={`${inputClass} font-mono`}
              />
            </Field>

            <Field label="วันที่ออกใบมรณบัตร">
              <DatePicker
                value={form.deathCertDate || ''}
                onChange={(date) => updateField('deathCertDate', date || '')}
                placeholder="เลือกวันที่..."
                disableFutureDates
              />
            </Field>

            <Field label="แพทย์ผู้ออก" className="sm:col-span-2">
              <CustomSelect
                options={[]}
                value={form.deathCertDoctor || ''}
                onChange={(val) => {
                  updateField('deathCertDoctor', val)
                  if (!val) setDoctorDisplayName('')
                }}
                onSearch={searchDoctors}
                onSelectOption={(opt) => setDoctorDisplayName(opt.label)}
                placeholder="พิมพ์ชื่อหรือรหัสแพทย์..."
                displayValue={doctorDisplayName}
                searchable
                clearable
                usePortal={false}
                size="md"
              />
            </Field>

            <Field label="ชันสูตรพลิกศพ">
              <CustomSelect
                options={[
                  { value: 'Y', label: 'มี' },
                  { value: 'N', label: 'ไม่มี' },
                ]}
                value={form.autopsyPerform || ''}
                onChange={(val) => updateField('autopsyPerform', val)}
                placeholder="— เลือก —"
                clearable
                usePortal={false}
                size="md"
              />
            </Field>
          </div>
        </SectionCard>
      </div>

      {/* ============================================ */}
      {/* Row 3: ข้อมูลเพิ่มเติม */}
      {/* ============================================ */}
      <SectionCard title="ข้อมูลเพิ่มเติม" icon={<Clipboard size={18} className="text-violet-500" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="สาเหตุตายทารกแรกเกิด">
              <CustomSelect
                options={lookups.newbornDeathCauses.map((c) => ({
                  value: String(c.id),
                  label: c.name,
                }))}
                value={form.newbornDeathCauseId != null ? String(form.newbornDeathCauseId) : ''}
                onChange={(val) => updateField('newbornDeathCauseId', val ? Number(val) : null)}
                placeholder="— ไม่ระบุ —"
                searchable
                clearable
                usePortal={false}
                size="md"
              />
          </Field>

          <Field label="ตั้งครรภ์ถึง 42 วันหลังคลอด">
              <CustomSelect
                options={[
                  { value: 'Y', label: 'ใช่' },
                  { value: 'N', label: 'ไม่ใช่' },
                ]}
                value={form.deathPreg42Day || ''}
                onChange={(val) => updateField('deathPreg42Day', val)}
                placeholder="— เลือก —"
                clearable
                usePortal={false}
                size="md"
              />
          </Field>

          <Field label="สิทธิครั้งสุดท้าย">
            <input
              type="text"
              value={form.lastPttype || ''}
              onChange={(e) => updateField('lastPttype', e.target.value)}
              maxLength={2}
              className={`${inputClass} font-mono`}
            />
          </Field>

          <Field label="หมายเหตุจาก รพ. อื่น" className="sm:col-span-2 lg:col-span-3">
            <textarea
              value={form.extHospitalText || ''}
              onChange={(e) => updateField('extHospitalText', e.target.value)}
              rows={2}
              placeholder="หมายเหตุ..."
              className={textareaClass}
            />
          </Field>
        </div>
      </SectionCard>

      {/* ============================================ */}
      {/* Actions */}
      {/* ============================================ */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          disabled={loading || !form.deathDate}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {isEdit ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
        </button>
      </div>

      {/* Confirm Save Dialog */}
      <ConfirmDialog
        {...saveDialog.dialogProps}
        title={isEdit ? 'ยืนยันการแก้ไข' : 'ยืนยันการบันทึก'}
        message={isEdit ? 'คุณต้องการบันทึกการแก้ไขข้อมูลการเสียชีวิตนี้หรือไม่?' : 'คุณต้องการบันทึกข้อมูลการเสียชีวิตนี้หรือไม่?'}
        variant="info"
        confirmText={isEdit ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
        icon={Save}
      />
    </form>
  )
}