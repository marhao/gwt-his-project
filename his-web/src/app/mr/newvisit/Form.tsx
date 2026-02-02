"use client"

import { useEffect, useState } from 'react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
    Calendar,
    Clock,
    Save,
    X,
    FileText,
    AlertCircle,
    User,
    Lock,
    Unlock,
    Camera,
    Trash2,
    ChevronDown,
    ChevronUp,
    Phone,
    MapPin,
    CreditCard,
    Stethoscope,
    Building2,
    ClipboardList,
    Shield,
    Activity,
    QrCode,
    Scan,
    History,
    MoreVertical,
    Check,
    ArrowLeft,
    Loader2,
} from 'lucide-react';
import { safeZodResolver } from '@/lib/zod';
import { useOpdVisitLookups } from '@/hooks/useOpdVisitLookups';
import PatientCard from '@/components/features/patient/PatientCard';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import FormField from '@/components/ui/forms/FormField';
import CustomSelect from '@/components/ui/CustomSelect';
import NHSOButon from '@/components/ui/forms/์NHSOButon';
import { type PatientNewVisit as Patient } from '@/lib/types/patient'

const formSchema = z.object({
    // hn: z.string().min(7),
    cid: z.string().optional(),
    visitDate: z.string().optional(),
    visitTime: z.string().optional(),
    visitType: z.string().nonempty(),
    pttype: z.string().nonempty(),
    pttypeName: z.string().optional(),
    chiefComplaint: z.string().nonempty(),
    department: z.string().nonempty(),
    spclty: z.string().nonempty(),
    patientType: z.string().nonempty(),
    urgency: z.string().nonempty(),
    patientStatus: z.string().optional(),
    timeType: z.string().nonempty(),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface FormData {
    cid: string;
    visitDate: string;
    visitTime: string;
    visitType: string;
    pttype: string;
    pttypeName: string;
    chiefComplaint: string;
    department: string;
    spclty: string;
    patientType: string; //ประเภทผู้ป่วย
    urgency: string; //ความเร่งด่วน
    patientStatus: string; //สภาพผู้ป่วย
    timeType: string; //ประเภทเวลา
}

type FormNewVisitProps = {
    patient: Patient | null;
    onClear?: () => void;
}

// Static options (ไม่มีใน database)
const patientStatusOptions = [
    { value: 'walkin', label: 'เดินมา', icon: '🚶' },
    { value: 'wheelchair', label: 'รถเข็น', icon: '🦽' },
    { value: 'stretcher', label: 'เปลนอน', icon: '🛏️' },
];

const FormNewVisit = ({ patient, onClear }: FormNewVisitProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [saving, setSaving] = useState(false);
    // Form data
    const [formData, setFormData] = useState<FormData>({
        cid: '',
        visitDate: new Date().toISOString().split('T')[0],
        visitTime: '',
        visitType: '',
        pttype: '',
        pttypeName: '',
        chiefComplaint: '',
        department: '',
        spclty: '',
        patientType: 'general',
        timeType: 'intime',
        urgency: 'normal',
        patientStatus: 'walkin',
    });
    const [lockLastVisit, setLockLastVisit] = useState(false);
    const { register, setValue, reset, handleSubmit, formState: { errors }} = useForm<FormSchemaType>({
        resolver: safeZodResolver(formSchema),
        defaultValues: {
            cid: '',
            visitDate: new Date().toISOString().split('T')[0],
            visitTime: '',
            visitType: '',
            pttype: '',
            pttypeName: '',
            chiefComplaint: '',
            department: '',
            spclty: '',
            patientType: 'general',
            timeType: 'intime',
            urgency: 'normal',
            patientStatus: 'walkin',
        }
    });

    // ==========================================
    // Lookup data from API
    // ==========================================
    /**
     * visitTypeOptions, 
     * pttypeOptions,
     * departmentOptions,
     * spcltyOptions,
     * isLoading: lookupsLoading,
     * error: lookupsError,
     */
    const lookups = useOpdVisitLookups();

    // ==========================================
    // Set default values when lookups loaded
    // ==========================================
    useEffect(() => {
        if (visitTypeOptions.length > 0 && !formData.visitType) {
        // Find default visit type (e.g., 'W' for Walk-in or first option)
        const defaultVisitType = visitTypeOptions.find(v => v.value === 'W') || visitTypeOptions[0];
        if (defaultVisitType) {
            setFormData(prev => ({
                ...prev,
                visitType: defaultVisitType.value,
            }));
        }
        }
    }, [lookups.visitTypeOptions, formData.visitType]);

    useEffect(() => {
        if (pttypeOptions.length > 0 && !formData.pttype) {
        // Find default pttype (e.g., '10' for ชำระเงินเอง or first option)
        const defaultPttype = pttypeOptions.find(p => p.value === '10') || pttypeOptions[0];
        if (defaultPttype) {
            setFormData(prev => ({
            ...prev,
            pttype: defaultPttype.value,
            pttypeName: defaultPttype.label.split(' - ')[1] || defaultPttype.label,
            }));
        }
        }
    }, [lookups.pttypeOptions, formData.pttype]);

    useEffect(() => {
        if (patient) {
            setValue("cid", patient.cid)
            setValue("pttype", patient.pttype || '')
            setValue("pttypeName", patient.pttypeName || '')

            setFormData((prev) => ({
                ...prev,
                cid: patient.cid || '',
                pttype: patient.pttype || prev.pttype,
                pttypeName: patient.pttypeName || prev.pttypeName,
            }));
        }
    }, [patient])

    useEffect(() => {
        console.log(errors);
    }, [errors])

      // ==========================================
      // Lookup data from API
      // ==========================================
    const {
        visitTypeOptions,
        pttypeOptions,
        departmentOptions,
        spcltyOptions,
        isLoading: lookupsLoading,
        error: lookupsError,
    } = useOpdVisitLookups();

    const handleSave = async (data: FormSchemaType) => {
        if (!patient) return;
        console.log(data);

        try {
            setSaving(true);

            /** Simulate to save data as async: */
            await new Promise((r) => setTimeout(r, 1500));

            /** In production, use: */
            /** TODO: to post data to api */
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }

        // Show success & redirect
    };

    const handleClear = () => {
        reset();
        onClear!();

        // Reset to default values from lookups
        const defaultVisitType = visitTypeOptions.find(v => v.value === 'W') || visitTypeOptions[0];
        const defaultPttype = pttypeOptions.find(p => p.value === '10') || pttypeOptions[0];

        setFormData({
            visitDate: new Date().toISOString().split('T')[0],
            visitTime: '',
            visitType: defaultVisitType?.value || '',
            pttype: defaultPttype?.value || '',
            pttypeName: defaultPttype?.label.split(' - ')[1] || '',
            chiefComplaint: '',
            department: '',
            spclty: '',
            cid: '',
            patientType: 'general',
            timeType: 'intime',
            urgency: 'normal',
            patientStatus: 'walkin',
        });
    };

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <div className="mt-4 lg:mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                    {/* ============================================ */}
                    {/* Left Column - Patient Card (Mobile: Top) */}
                    {/* ============================================ */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                        <div className="lg:sticky lg:top-6 space-y-4">
                            <PatientCard patient={patient} loading={isLoading} />

                            {/* Quick Options - Desktop Only */}
                            {patient && (
                                <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    {/* Header */}
                                    <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">ตัวเลือกด่วน</h3>
                                    </div>

                                    <div className="p-4 space-y-5">
                                        {/* Urgency Selector - Modern Card Style */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                ความเร่งด่วน
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                <input type="hidden" {...register("urgency")} />
                                                {[
                                                    { value: 'normal', label: 'ปกติ', icon: '●', color: 'emerald' },
                                                    { value: 'urgent', label: 'เร่งด่วน', icon: '●', color: 'amber' },
                                                    { value: 'emergency', label: 'ฉุกเฉิน', icon: '●', color: 'red' },
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => {
                                                            setValue("urgency", opt.value)
                                                            setFormData({ ...formData, urgency: opt.value })
                                                        }}
                                                        className={`
                                                            relative group p-3 rounded-xl border-2 transition-all duration-200
                                                            ${formData.urgency === opt.value
                                                                ? opt.color === 'emerald'
                                                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                                                                : opt.color === 'amber'
                                                                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10'
                                                                    : 'border-red-500 bg-red-50 dark:bg-red-500/10 animate-pulse'
                                                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                                            }
                                                        `}
                                                    >
                                                        <div className="flex flex-col items-center gap-1.5">
                                                            <span className={`
                                                                text-lg transition-transform group-hover:scale-110
                                                                ${formData.urgency === opt.value
                                                                    ? opt.color === 'emerald'
                                                                        ? 'text-emerald-500'
                                                                        : opt.color === 'amber'
                                                                        ? 'text-amber-500'
                                                                        : 'text-red-500'
                                                                    : 'text-slate-300 dark:text-slate-600'
                                                                }
                                                            `}>
                                                                {opt.icon}
                                                            </span>
                                                            <span className={`
                                                                text-xs font-medium
                                                                ${formData.urgency === opt.value
                                                                    ? opt.color === 'emerald'
                                                                        ? 'text-emerald-700 dark:text-emerald-400'
                                                                        : opt.color === 'amber'
                                                                        ? 'text-amber-700 dark:text-amber-400'
                                                                        : 'text-red-700 dark:text-red-400'
                                                                    : 'text-slate-600 dark:text-slate-400'
                                                                }
                                                            `}>
                                                                {opt.label}
                                                            </span>
                                                        </div>
                                                        {/* Selected indicator */}
                                                        {formData.urgency === opt.value && (
                                                            <div className={`
                                                                absolute -top-1 -right-1 size-4 rounded-full flex items-center justify-center
                                                                ${opt.color === 'emerald' ? 'bg-emerald-500' : opt.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}
                                                            `}>
                                                                <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-dashed border-slate-200 dark:border-slate-700" />

                                        {/* Patient Status - Icon Cards */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                สภาพผู้ป่วย
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                <input type="hidden" {...register("patientStatus")} />
                                                {patientStatusOptions.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => {
                                                            setValue("patientStatus", opt.value)
                                                            setFormData({ ...formData, patientStatus: opt.value })
                                                        }}
                                                        className={`
                                                            relative group p-3 rounded-xl border-2 transition-all duration-200
                                                            ${formData.patientStatus === opt.value
                                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-sm shadow-primary-500/20'
                                                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                                            }
                                                        `}
                                                    >
                                                        <div className="flex flex-col items-center gap-1.5">
                                                        <span className="text-2xl transition-transform group-hover:scale-110">
                                                            {opt.icon}
                                                        </span>
                                                        <span className={`
                                                            text-xs font-medium
                                                            ${formData.patientStatus === opt.value
                                                                ? 'text-primary-700 dark:text-primary-400'
                                                                : 'text-slate-600 dark:text-slate-400'
                                                            }
                                                        `}>
                                                            {opt.label}
                                                        </span>
                                                        </div>
                                                        {/* Selected indicator */}
                                                        {formData.patientStatus === opt.value && (
                                                        <div className="absolute -top-1 -right-1 size-4 rounded-full bg-primary-500 flex items-center justify-center">
                                                            <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-dashed border-slate-200 dark:border-slate-700" />

                                        {/* Time Type - Toggle Switch Style */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                ประเภทเวลา
                                            </label>
                                            <div className="relative bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                                {/* Sliding background */}
                                                <div
                                                    className={`
                                                        absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-lg shadow-sm
                                                        transition-all duration-300 ease-out
                                                        ${formData.timeType === 'outtime' ? 'left-[calc(50%+2px)]' : 'left-1'}
                                                    `}
                                                />
                                                <div className="relative grid grid-cols-2 gap-1">
                                                    <input type="hidden" {...register("timeType")} />
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            setValue("timeType", 'intime')
                                                            setFormData({ ...formData, timeType: 'intime' })
                                                        }}
                                                        className={`
                                                            relative z-10 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                                                            ${formData.timeType === 'intime'
                                                                ? 'text-primary-600 dark:text-primary-400'
                                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                                            }
                                                        `}
                                                    >
                                                        <div className="flex items-center justify-center gap-2">
                                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                            <span>ในเวลา</span>
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setValue("timeType", 'outtime')
                                                            setFormData({ ...formData, timeType: 'outtime' })
                                                        }}
                                                        className={`
                                                            relative z-10 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                                                            ${formData.timeType === 'outtime'
                                                                ? 'text-primary-600 dark:text-primary-400'
                                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                                            }
                                                        `}
                                                    >
                                                        <div className="flex items-center justify-center gap-2">
                                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                                            </svg>
                                                            <span>นอกเวลา</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ============================================ */}
                    {/* Right Column - Form Sections */}
                    {/* ============================================ */}
                    <div className="lg:col-span-2 order-2 lg:order-1 space-y-4">
                        {/* Visit Type & Rights */}
                        <CollapsibleSection
                            title="ประเภทการมา & สิทธิการรักษา"
                            icon={<Shield size={18} />}
                            badge={formData.pttypeName}
                            badgeColor="blue"
                        >
                            <div className="space-y-4">
                                {/* Visit Type */}
                                <FormField label="ประเภทการมา">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            {...register("visitType")}
                                            readOnly
                                            className="w-16 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center font-mono"
                                        />
                                        <div className="flex-1">
                                            <CustomSelect
                                                options={visitTypeOptions}
                                                value={formData.visitType}
                                                dropdownTitle='เลือกประเภทการมา'
                                                showBackdrop={true}
                                                onChange={(val) => {
                                                    setValue("visitType", val);
                                                    setFormData({ ...formData, visitType: val });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {errors.visitType && (
                                        <p className="mt-2 text-sm text-critical-500">{errors.visitType.message}</p>
                                    )}
                                </FormField>

                                {/* Rights */}
                                <FormField label="สิทธิการรักษา" required>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            {...register("pttype")}
                                            readOnly
                                            className="w-full sm:w-16 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center font-mono"
                                        />
                                        <div className="flex-1">
                                            <CustomSelect
                                                options={pttypeOptions}
                                                value={formData.pttype}
                                                onChange={(val) => {
                                                    const selected = pttypeOptions.find((o) => o.value === val);
                                                    setValue("pttype", val);
                                                    setValue("pttypeName", selected?.label.split(' - ')[1] || '');
                                                    setFormData({
                                                        ...formData,
                                                        pttype: val,
                                                        pttypeName: selected?.label.split(' - ')[1] || '',
                                                    });
                                                }}
                                            />
                                        </div>
                                        <NHSOButon
                                            cid={patient && patient?.cid}
                                            patientName={patient && patient?.name || ''}
                                            onSuccess={(data) => {
                                                /** Set สิทธิการรักษา  */
                                                const pttypeOption = pttypeOptions.find(p => p.value === data);
                                                if (pttypeOption) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        pttype: data,
                                                        pttypeName: pttypeOption.label.split(' - ')[1] || pttypeOption.label,
                                                    }));
                                                }
                                            }}
                                        />
                                    </div>
                                </FormField>

                                {/* Lock Last Visit */}
                                <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        checked={lockLastVisit}
                                        onChange={(e) => setLockLastVisit(e.target.checked)}
                                        className="size-5 rounded border-slate-300 text-primary-500 focus:ring-primary-500/20"
                                    />
                                    <div className="flex items-center gap-2">
                                        {lockLastVisit ? <Lock size={16} className="text-primary-500" /> : <Unlock size={16} className="text-slate-400" />}
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Lock ตามมาครั้งสุดท้าย</span>
                                    </div>
                                </label>
                            </div>
                        </CollapsibleSection>

                        {/* Chief Complaint */}
                        <CollapsibleSection
                            title="อาการสำคัญ"
                            icon={<Activity size={18} />}
                        >
                            <FormField label="อาการสำคัญ (Chief Complaint)" required>
                                <textarea
                                    {...register("chiefComplaint")}
                                    placeholder="ระบุอาการสำคัญที่นำผู้ป่วยมาพบแพทย์..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                                />
                                {errors.chiefComplaint && (
                                    <p className="mt-2 text-sm text-critical-500">{errors.chiefComplaint.message}</p>
                                )}
                            </FormField>
                        </CollapsibleSection>

                        {/* Department & Specialty */}
                        <CollapsibleSection
                            title="ส่งต่อไปห้องตรวจ"
                            icon={<Stethoscope size={18} />}
                        >
                            <div className="space-y-4">
                                {/* Department */}
                                <FormField label="ห้องตรวจ" required>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            {...register("department")}
                                            readOnly
                                            className="w-16 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center font-mono"
                                        />
                                        <div className="flex-1">
                                            <CustomSelect
                                                options={departmentOptions}
                                                value={formData.department}
                                                showBackdrop={true}
                                                dropdownTitle="เลือกห้องตรวจ"
                                                onChange={(val) => {
                                                    setValue("department", val);
                                                    setFormData({ ...formData, department: val });
                                                }}
                                                placeholder="เลือกห้องตรวจ..."
                                            />
                                        </div>
                                    </div>
                                    {errors.department && (
                                        <p className="mt-2 text-sm text-critical-500">{errors.department.message}</p>
                                    )}
                                </FormField>

                                {/* Specialty */}
                                <FormField label="แผนก" required>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            {...register("spclty")}
                                            readOnly
                                            className="w-16 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center font-mono"
                                        />
                                        <div className="flex-1">
                                            <CustomSelect
                                                options={spcltyOptions}
                                                value={formData.spclty}
                                                showBackdrop={true}
                                                dropdownTitle="เลือกแผนก"
                                                onChange={(val) => {
                                                    setValue("spclty", val);
                                                    setFormData({ ...formData, spclty: val });
                                                }}
                                                placeholder="เลือกแผนก..."
                                            />
                                        </div>
                                    </div>
                                </FormField>
                            </div>
                        </CollapsibleSection>

                        {/* CID Verification */}
                        <CollapsibleSection
                            title="ยืนยันตัวตน"
                            icon={<CreditCard size={18} />}
                        >
                            <FormField label="เลขบัตรประชาชน">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        value={formData.cid}
                                        onChange={(e) => setFormData({ ...formData, cid: e.target.value })}
                                        placeholder="#-####-#####-##-#"
                                        className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                    />
                                    <div className="flex gap-2">
                                        <button className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                                            DFL
                                        </button>
                                        <button className="flex-1 sm:flex-none p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                                            <AlertCircle size={20} />
                                        </button>
                                    </div>
                                </div>
                            </FormField>
                        </CollapsibleSection>

                        {/* Mobile: Urgency & Status */}
                        <div className="lg:hidden">
                            <CollapsibleSection
                                title="ตัวเลือกเพิ่มเติม"
                                icon={<Activity size={18} />}
                                defaultOpen={false}
                            >
                                <div className="space-y-5">
                                    {/* Urgency Selector - Modern Card Style */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            ความเร่งด่วน
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                            { value: 'normal', label: 'ปกติ', icon: '●', color: 'emerald' },
                                            { value: 'urgent', label: 'เร่งด่วน', icon: '●', color: 'amber' },
                                            { value: 'emergency', label: 'ฉุกเฉิน', icon: '●', color: 'red' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => setFormData({ ...formData, urgency: opt.value })}
                                                    className={`
                                                        relative p-3 rounded-xl border-2 transition-all duration-200 active:scale-95
                                                        ${formData.urgency === opt.value
                                                            ? opt.color === 'emerald'
                                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                                                            : opt.color === 'amber'
                                                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10'
                                                                : 'border-red-500 bg-red-50 dark:bg-red-500/10 animate-pulse'
                                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex flex-col items-center gap-1">
                                                        <span className={`
                                                            text-base
                                                            ${formData.urgency === opt.value
                                                            ? opt.color === 'emerald'
                                                                ? 'text-emerald-500'
                                                                : opt.color === 'amber'
                                                                ? 'text-amber-500'
                                                                : 'text-red-500'
                                                            : 'text-slate-300 dark:text-slate-600'
                                                            }
                                                        `}>
                                                            {opt.icon}
                                                        </span>
                                                        <span className={`
                                                            text-xs font-medium
                                                            ${formData.urgency === opt.value
                                                            ? opt.color === 'emerald'
                                                                ? 'text-emerald-700 dark:text-emerald-400'
                                                                : opt.color === 'amber'
                                                                ? 'text-amber-700 dark:text-amber-400'
                                                                : 'text-red-700 dark:text-red-400'
                                                            : 'text-slate-600 dark:text-slate-400'
                                                            }
                                                        `}>
                                                            {opt.label}
                                                        </span>
                                                    </div>
                                                    {/* Selected checkmark */}
                                                    {formData.urgency === opt.value && (
                                                        <div className={`
                                                            absolute -top-1 -right-1 size-4 rounded-full flex items-center justify-center
                                                            ${opt.color === 'emerald' ? 'bg-emerald-500' : opt.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}
                                                        `}>
                                                            <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-dashed border-slate-200 dark:border-slate-700" />

                                    {/* Patient Status - Emoji Cards */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            สภาพผู้ป่วย
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {patientStatusOptions.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => setFormData({ ...formData, patientStatus: opt.value })}
                                                    className={`
                                                        relative p-3 rounded-xl border-2 transition-all duration-200 active:scale-95
                                                        ${formData.patientStatus === opt.value
                                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-sm'
                                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex flex-col items-center gap-1">
                                                        <span className="text-xl">{opt.icon}</span>
                                                        <span className={`
                                                            text-xs font-medium
                                                            ${formData.patientStatus === opt.value
                                                                ? 'text-primary-700 dark:text-primary-400'
                                                                : 'text-slate-600 dark:text-slate-400'
                                                            }
                                                        `}>
                                                            {opt.label}
                                                        </span>
                                                    </div>
                                                    {/* Selected checkmark */}
                                                    {formData.patientStatus === opt.value && (
                                                        <div className="absolute -top-1 -right-1 size-4 rounded-full bg-primary-500 flex items-center justify-center">
                                                            <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-dashed border-slate-200 dark:border-slate-700" />

                                    {/* Time Type - Toggle Switch */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            ประเภทเวลา
                                        </label>
                                        <div className="relative bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                            {/* Sliding background */}
                                            <div
                                                className={`
                                                    absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-lg shadow-sm
                                                    transition-all duration-300 ease-out
                                                    ${formData.timeType === 'outtime' ? 'left-[calc(50%+2px)]' : 'left-1'}
                                                `}
                                            />
                                            <div className="relative grid grid-cols-2">
                                                <button
                                                    onClick={() => setFormData({ ...formData, timeType: 'intime' })}
                                                    className={`
                                                        relative z-10 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                                                        ${formData.timeType === 'intime'
                                                            ? 'text-primary-600 dark:text-primary-400'
                                                            : 'text-slate-500 dark:text-slate-400'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center justify-center gap-2">
                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                        <span>ในเวลา</span>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => setFormData({ ...formData, timeType: 'outtime' })}
                                                    className={`
                                                        relative z-10 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                                                        ${formData.timeType === 'outtime'
                                                            ? 'text-primary-600 dark:text-primary-400'
                                                            : 'text-slate-500 dark:text-slate-400'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center justify-center gap-2">
                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                                        </svg>
                                                        <span>นอกเวลา</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CollapsibleSection>
                        </div>

                        {/* Desktop Action Buttons */}
                        <div className="hidden lg:flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium flex items-center gap-2"
                            >
                                <Trash2 size={18} />
                                ล้างข้อมูล
                            </button>
                            <button
                                type="submit"
                                disabled={saving || !patient || !formData.department || !formData.spclty}
                                className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        กำลังบันทึก...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        บันทึกและส่งตรวจ
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================ */}
            {/* Mobile Bottom Action Bar */}
            {/* ============================================ */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 lg:hidden z-40">
                <div className="flex gap-3 max-w-lg mx-auto">
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl transition-colors"
                    >
                        <Trash2 size={20} />
                    </button>
                    <button
                        type="submit"
                        disabled={saving || !patient || !formData.department || !formData.spclty}
                        className="flex-1 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                    >
                        {saving ? (
                            <>
                            <Loader2 className="size-5 animate-spin" />
                            กำลังบันทึก...
                            </>
                        ) : (
                            <>
                            <Check size={20} />
                            บันทึกและส่งตรวจ
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FormNewVisit