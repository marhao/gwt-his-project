'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Calendar,
    Clock,
    X,
    AlertCircle,
    ClipboardList,
    MoreVertical,
    ArrowLeft,
    Loader2,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import { useOpdVisitLookups } from '@/hooks/useOpdVisitLookups';
import SeachBar from './SeachBar';
import FormNewVisit from './Form';
import { type PatientNewVisit as Patient } from '@/lib/types/patient'

// ============================================
// Main Component
// ============================================
export default function OpdNewVisitResponsive() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ==========================================
    // Lookup data from API
    // ==========================================
    const { pttypeOptions, isLoading: lookupsLoading, error: lookupsError } = useOpdVisitLookups();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showMoreActions, setShowMoreActions] = useState(false);
    const [clearSearchbar, setClearSearchbar] = useState(false);
    // Patient data
    const [patient, setPatient] = useState<Patient | null>(null);

    // Update time
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // ==========================================
    // Loading State
    // ==========================================
    if (lookupsLoading) {
        return (
        <AdminLayout>
            <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <Loader2 className="size-10 text-primary-500 animate-spin mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400">กำลังโหลดข้อมูล...</p>
            </div>
            </div>
        </AdminLayout>
        );
    }

    // ==========================================
    // Error State
    // ==========================================
    if (lookupsError) {
            return (
                <AdminLayout>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <AlertCircle className="size-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-500 mb-4">{lookupsError}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                            >
                                ลองใหม่
                            </button>
                        </div>
                    </div>
                </AdminLayout>
            );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen pb-24 lg:pb-6">
                {/* ============================================ */}
                {/* Header - Sticky on mobile */}
                {/* ============================================ */}
                <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 -mx-4 px-4 lg:mx-0 lg:px-0 lg:bg-transparent lg:border-0 lg:static">
                    <div className="py-3 lg:py-0 lg:mb-6">
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between lg:hidden">
                        <button
                            onClick={() => router.back()}
                            className="p-2 -ml-2 text-slate-600 dark:text-slate-400"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="font-bold text-slate-900 dark:text-white">ส่งตรวจผู้ป่วยนอก</h1>
                        <button
                            onClick={() => setShowMoreActions(!showMoreActions)}
                            className="p-2 -mr-2 text-slate-600 dark:text-slate-400"
                        >
                            <MoreVertical size={20} />
                        </button>
                        </div>

                        {/* Desktop Header */}
                        <div className="hidden lg:flex items-center justify-between bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl p-4 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                            <ClipboardList size={24} className="text-white" />
                            </div>
                            <div>
                            <h1 className="text-xl font-bold text-white">ส่งตรวจผู้ป่วยนอก (OPD)</h1>
                            <p className="text-white/70 text-sm">ลงทะเบียนส่งตรวจผู้ป่วยใหม่</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right text-white">
                            <div className="text-2xl font-bold font-mono">
                                {currentTime.toLocaleTimeString('th-TH')}
                            </div>
                            <div className="text-sm text-white/70">
                                {currentTime.toLocaleDateString('th-TH', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                                })}
                            </div>
                            </div>
                            <button
                            onClick={() => router.back()}
                            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                            <X size={20} />
                            </button>
                        </div>
                        </div>
                    </div>

                    {/* Search Bar - Always visible */}
                    <div className="py-3 lg:py-0 lg:mb-6">
                        <div className="bg-white dark:bg-slate-900 lg:bg-slate-50 lg:dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm lg:shadow-none">

                        {/* Main Search Row */}
                        <SeachBar
                            hn={searchParams.get('hn') || ''}
                            pttypeOptions={pttypeOptions}
                            onSuccess={(patient) => {
                                setPatient(patient);
                            }}
                            reset={clearSearchbar}
                        />

                        {/* Date/Time Bar - Mobile Only */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50 lg:hidden">
                            <div className="flex items-center gap-3">
                            {/* Date Chip */}
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <Calendar size={14} className="text-slate-400" />
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                    {currentTime.toLocaleDateString('th-TH', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: '2-digit'
                                    })}
                                </span>
                            </div>

                            {/* Time Chip */}
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary-50 dark:bg-primary-500/10 rounded-lg">
                                <Clock size={14} className="text-primary-500" />
                                <span className="text-xs font-mono font-semibold text-primary-600 dark:text-primary-400">
                                    {currentTime.toLocaleTimeString('th-TH', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            </div>

                            {/* Quick Status Indicator */}
                            <div className="flex items-center gap-1">
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs text-slate-400">Online</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                {/* ============================================ */}
                {/* Main Content */}
                {/* ============================================ */}
                <FormNewVisit
                    patient={patient}
                    onClear={() => {
                        setPatient(null)
                        // TODO: clear search bar
                        setClearSearchbar(true)
                    }}
                />
            </div>
        </AdminLayout>
    );
}