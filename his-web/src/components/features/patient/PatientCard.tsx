"use client"

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

// TODO: Duplicated in OpdNewVisitResponsive page
interface Patient {
    hn: string;
    name: string;
    cid: string;
    gender: string;
    age: string;
    birthDate: string;
    phone: string;
    address: string;
    photo: string | null;
    bloodType?: string;
    allergies?: string[];
    lastVisit?: string;
    pttypeName?: string;
}

const PatientCard: React.FC<{
    patient: Patient | null;
    loading: boolean;
    onCapture?: () => void;
}> = ({ patient, loading, onCapture }) => {
    if (loading) {
        return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse">
            <div className="flex gap-4">
            <div className="size-20 lg:size-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            <div className="flex-1 space-y-2">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
            </div>
            </div>
        </div>
        );
    }

    if (!patient) {
        return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 lg:p-8">
            <div className="text-center">
            <div className="size-16 lg:size-20 mx-auto bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-3">
                <User size={32} className="text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                ค้นหา HN เพื่อแสดงข้อมูลผู้ป่วย
            </p>
            </div>
        </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Patient Header */}
        <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-start gap-4">
            {/* Photo */}
            <div className="relative shrink-0">
                <div className="size-20 lg:size-24 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center overflow-hidden">
                {patient.photo ? (
                    <img src={patient.photo} alt={patient.name} className="size-full object-cover" />
                ) : (
                    <User size={32} className="text-white/60" />
                )}
                </div>
                <button
                onClick={onCapture}
                className="absolute -bottom-1 -right-1 size-8 bg-white text-primary-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                <Camera size={14} />
                </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                <div>
                    <h3 className="font-bold text-lg truncate">{patient.name}</h3>
                    <p className="text-white/80 text-sm font-mono">HN: {patient.hn}</p>
                </div>
                {patient.bloodType && (
                    <span className="px-2 py-1 bg-white/20 rounded-lg text-xs font-bold">
                    {patient.bloodType}
                    </span>
                )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-white/20 rounded-lg">{patient.gender}</span>
                <span className="px-2 py-1 bg-white/20 rounded-lg">{patient.age}</span>
                </div>
            </div>
            </div>
        </div>

        {/* Patient Details */}
        <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
            <CreditCard size={16} className="text-slate-400 shrink-0" />
            <span className="text-slate-600 dark:text-slate-400 font-mono">{patient.cid}</span>
            </div>
            {patient.phone && (
            <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-slate-400 shrink-0" />
                <a href={`tel:${patient.phone}`} className="text-primary-600 dark:text-primary-400">
                {patient.phone}
                </a>
            </div>
            )}
            <div className="flex items-start gap-3 text-sm">
            <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <span className="text-slate-600 dark:text-slate-400 line-clamp-2">{patient.address}</span>
            </div>

            {/* Allergies Warning */}
            {patient.allergies && patient.allergies.length > 0 && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
                <AlertCircle size={16} />
                <span>แพ้ยา</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                {patient.allergies.map((allergy, i) => (
                    <span key={i} className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded text-xs">
                    {allergy}
                    </span>
                ))}
                </div>
            </div>
            )}

            {/* Last Visit */}
            {patient.lastVisit && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <History size={12} />
                <span>มาครั้งสุดท้าย: {patient.lastVisit}</span>
            </div>
            )}
        </div>
        </div>
    );
};

export default PatientCard;