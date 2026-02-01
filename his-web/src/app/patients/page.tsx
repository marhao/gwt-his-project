// =============================================================================
// File: src/app/patients/page.tsx
// Description: Patient List Page - Fixed Filter Layout + DatePicker from UI
// =============================================================================

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  User,
  Phone,
  Calendar,
  CreditCard,
  AlertCircle,
  X,
  RefreshCw,
  Users,
  UserPlus,
  Activity,
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  Eye,
  Edit,
  Trash2,
  Printer,
  History,
  Droplet,
  Stethoscope,
  Copy,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuDivider,
  ContextMenuLabel,
  useContextMenu,
} from '@/components/ui/context-menu';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';
import DatePicker from '@/components/ui/date-picker/DatePicker';
import { PatientListItem, PatientSearchParams, PatientStats } from '@/types/patient';
import { usePatientList, usePatientStats, usePttypes } from '@/hooks';
import { patientApi } from '@/lib/api';

// ============================================
// Sub Components
// ============================================

// Stats Card
interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'amber' | 'purple';
  trend?: { value: number; isUp: boolean };
  loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, color, trend, loading }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/30',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/30',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/30',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/30',
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <p className={`text-xs mt-1 ${trend.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend.isUp ? '↑' : '↓'} {trend.value}% จากเดือนที่แล้ว
            </p>
          )}
        </div>
        <div className={`size-12 rounded-xl bg-linear-to-br ${colors[color]} shadow-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Patient Avatar
const PatientAvatar: React.FC<{ name: string; sex: 'M' | 'F' | null; size?: 'sm' | 'md' | 'lg' }> = ({
  name,
  sex,
  size = 'md',
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  const sizeClasses = {
    sm: 'size-8 text-xs',
    md: 'size-10 text-sm',
    lg: 'size-12 text-base',
  };

  const bgColor = sex === 'F' ? 'bg-pink-500' : 'bg-blue-500';

  return (
    <div className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}>
      {initials}
    </div>
  );
};

// Allergy Badge
const AllergyBadge: React.FC<{ hasAllergy: boolean }> = ({ hasAllergy }) => {
  if (!hasAllergy) return null;
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs font-medium">
      <AlertCircle size={10} />
      แพ้ยา
    </span>
  );
};

// Patient Card (Mobile)
const PatientCard: React.FC<{
  patient: PatientListItem;
  onView: () => void;
  onEdit: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onDelete: () => void;
}> = ({ patient, onView, onEdit, onContextMenu, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all cursor-pointer select-none"
      onClick={onView}
      onContextMenu={onContextMenu}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <PatientAvatar name={patient.fullName} sex={patient.sex} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                {patient.fullName}
              </h3>
              <AllergyBadge hasAllergy={patient.hasAllergy} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              HN: {patient.hn}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <User size={12} />
                {patient.sex === 'M' ? 'ชาย' : 'หญิง'}, {patient.age} ปี
              </span>
              <span className="flex items-center gap-1">
                <Droplet size={12} />
                {patient.bloodgrp || '-'}
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <MoreHorizontal size={18} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm">
          <CreditCard size={14} className="text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 truncate">
            {patient.pttypeName || patient.pttype}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone size={14} className="text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 truncate">
            {patient.phone || '-'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm col-span-2">
          <Calendar size={14} className="text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400">
            มาล่าสุด: {patient.lastVisit || '-'}
          </span>
        </div>
      </div>

      {showActions && (
        <div className="border-t border-slate-100 dark:border-slate-800 p-2 grid grid-cols-4 gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onView(); }}
            className="py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex flex-col items-center gap-1"
          >
            <Eye size={16} />
            ดู
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
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
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg flex flex-col items-center gap-1"
          >
            <Trash2 size={16} />
            ลบ
          </button>
        </div>
      )}
    </div>
  );
};

// Patient Table Row (Desktop)
const PatientTableRow: React.FC<{
  patient: PatientListItem;
  onView: () => void;
  onEdit: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onDelete: () => void;
}> = ({ patient, onView, onEdit, onContextMenu, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr
      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
      onClick={onView}
      onContextMenu={onContextMenu}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <PatientAvatar name={patient.fullName} sex={patient.sex} size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.fullName}
              </span>
              <AllergyBadge hasAllergy={patient.hasAllergy} />
            </div>
            <span className="text-xs text-slate-500 font-mono">HN: {patient.hn}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 font-mono text-sm text-slate-600 dark:text-slate-400">
        {patient.cid ? `${patient.cid.substring(0, 1)}-${patient.cid.substring(1, 5)}-***` : '-'}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className={`size-6 rounded-full flex items-center justify-center text-xs ${patient.sex === 'F' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
            {patient.sex === 'F' ? '♀' : '♂'}
          </span>
          <span>{patient.age} ปี</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-600 dark:text-slate-400">
          {patient.bloodgrp || '-'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        {patient.phone || '-'}
      </td>
      <td className="px-4 py-3">
        <span className="px-2 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded text-xs font-medium">
          {patient.pttypeName || patient.pttype}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-slate-500">
        {patient.lastVisit || '-'}
      </td>
      <td className="px-4 py-3">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <MoreHorizontal size={16} className="text-slate-400" />
          </button>
          
          {showActions && (
            <>
              <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowActions(false); }} />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                <button
                  onClick={(e) => { e.stopPropagation(); onView(); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Eye size={14} /> ดูข้อมูล
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Edit size={14} /> แก้ไข
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <History size={14} /> ประวัติ
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Printer size={14} /> พิมพ์
                </button>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={(e) => { e.stopPropagation(); setShowActions(false); onDelete(); }}
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
  );
};

// ============================================
// Filter Sidebar Component (Fixed Layout - No Scrollbar)
// ============================================
const FilterSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  filters: PatientSearchParams;
  onFiltersChange: (filters: PatientSearchParams) => void;
  pttypeOptions?: Array<{ code: string; name: string }>;
}> = ({ isOpen, onClose, filters, onFiltersChange, pttypeOptions = [] }) => {
  
  const updateFilter = <K extends keyof PatientSearchParams>(key: K, value: PatientSearchParams[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined && v !== '' && v !== 'all').length;

  // Mobile Overlay
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
        onClick={onClose} 
      />
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 right-0 lg:top-4
        h-screen lg:h-auto lg:max-h-[calc(100vh-8rem)]
        w-80 lg:w-72
        bg-white dark:bg-slate-900 
        border-l lg:border border-slate-200 dark:border-slate-800
        lg:rounded-2xl
        shadow-xl lg:shadow-none
        z-50 lg:z-auto
        flex flex-col
      `}>
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

        {/* Filter Content - No overflow, natural height */}
        <div className="p-4 space-y-5">
          
          {/* Sex Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              เพศ
            </label>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'ทั้งหมด' },
                { value: 'M', label: 'ชาย' },
                { value: 'F', label: 'หญิง' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateFilter('sex', opt.value as any)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    (filters.sex || 'all') === opt.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pttype Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              สิทธิการรักษา
            </label>
            <select
              value={filters.pttype || ''}
              onChange={(e) => updateFilter('pttype', e.target.value || undefined)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="">ทั้งหมด</option>
              {pttypeOptions.map((pt) => (
                <option key={pt.code} value={pt.code}>
                  {pt.name}
                </option>
              ))}
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              ช่วงอายุ (ปี)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="จาก"
                min={0}
                max={150}
                value={filters.ageFrom || ''}
                onChange={(e) => updateFilter('ageFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <span className="text-slate-400">—</span>
              <input
                type="number"
                placeholder="ถึง"
                min={0}
                max={150}
                value={filters.ageTo || ''}
                onChange={(e) => updateFilter('ageTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>

          {/* Has Allergy */}
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={filters.hasAllergy || false}
              onChange={(e) => updateFilter('hasAllergy', e.target.checked || undefined)}
              className="size-5 rounded border-slate-300 text-primary-500 focus:ring-primary-500/20"
            />
            <div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                เฉพาะผู้ป่วยแพ้ยา
              </span>
              <p className="text-xs text-slate-500">
                แสดงเฉพาะผู้ป่วยที่มีประวัติแพ้ยา
              </p>
            </div>
          </label>

          {/* Last Visit Date Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              มาพบแพทย์ล่าสุด
            </label>
            <div className="space-y-2">
              <DatePicker
                value={filters.lastVisitFrom || ''}
                onChange={(date) => updateFilter('lastVisitFrom', date || undefined)}
                placeholder="ตั้งแต่วันที่..."
                disableFutureDates={true}
              />
              <DatePicker
                value={filters.lastVisitTo || ''}
                onChange={(date) => updateFilter('lastVisitTo', date || undefined)}
                placeholder="ถึงวันที่..."
                disableFutureDates={true}
                minDate={filters.lastVisitFrom}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
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
  );
};

// ============================================
// Main Page Component
// ============================================
export default function PatientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<PatientSearchParams>({});
  const [deleting, setDeleting] = useState(false);

  // Use hooks for data fetching
  const {
    patients,
    loading,
    error,
    pagination,
    setFilters: setApiFilters,
    setPage,
    refresh,
  } = usePatientList({ initialLimit: 20 });

  const { stats, loading: statsLoading } = usePatientStats();
  const { data: pttypeOptions } = usePttypes();

  // Context Menu Hook
  const contextMenu = useContextMenu<PatientListItem>();

  // Confirm Dialog Hook for Delete
  const deleteDialog = useConfirmDialog<PatientListItem>({
    onConfirm: async (patient) => {
      setDeleting(true);
      try {
        await patientApi.delete(patient.hn);
        await refresh();
      } catch (err) {
        console.error('Error deleting patient:', err);
      } finally {
        setDeleting(false);
      }
    },
  });

  // Apply filters when search or filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setApiFilters({
        query: searchQuery || undefined,
        sex: filters.sex,
        pttype: filters.pttype,
        hasAllergy: filters.hasAllergy,
        ageFrom: filters.ageFrom,
        ageTo: filters.ageTo,
        lastVisitFrom: filters.lastVisitFrom,
        lastVisitTo: filters.lastVisitTo,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters, setApiFilters]);

  // Filter patients client-side for additional filters not supported by API
  const filteredPatients = useMemo(() => {
    let result = patients;

    // Client-side filtering for filters not supported by API
    if (filters.sex && filters.sex !== 'all') {
      result = result.filter((p) => p.sex === filters.sex);
    }

    if (filters.hasAllergy) {
      result = result.filter((p) => p.hasAllergy);
    }

    if (filters.ageFrom) {
      result = result.filter((p) => (p.age || 0) >= filters.ageFrom!);
    }

    if (filters.ageTo) {
      result = result.filter((p) => (p.age || 0) <= filters.ageTo!);
    }

    if (filters.lastVisitFrom) {
      result = result.filter((p) => p.lastVisit && p.lastVisit >= filters.lastVisitFrom!);
    }

    if (filters.lastVisitTo) {
      result = result.filter((p) => p.lastVisit && p.lastVisit <= filters.lastVisitTo!);
    }

    return result;
  }, [patients, filters]);

  const handleRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  const handleView = (patient: PatientListItem) => {
    router.push(`/patients/${patient.hn}`);
  };

  const handleEdit = (patient: PatientListItem) => {
    router.push(`/patients/${patient.hn}/edit`);
  };

  const handleCopyHN = async (hn: string) => {
    await navigator.clipboard.writeText(hn);
  };

  const handleNewVisit = (patient: PatientListItem) => {
    router.push(`/opd/newvisit?hn=${patient.hn}`);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined && v !== '' && v !== 'all').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ============================================ */}
        {/* Header */}
        {/* ============================================ */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              ทะเบียนผู้ป่วย
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              จัดการข้อมูลผู้ป่วยในระบบ
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Upload size={16} />
              <span className="hidden sm:inline">นำเข้า</span>
            </button>
            <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Download size={16} />
              <span className="hidden sm:inline">ส่งออก</span>
            </button>
            <button
              onClick={() => router.push('/patients/new')}
              className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">ลงทะเบียนใหม่</span>
            </button>
          </div>
        </div>

        {/* ============================================ */}
        {/* Stats Cards */}
        {/* ============================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            label="ผู้ป่วยทั้งหมด" 
            value={stats?.total ?? pagination.total} 
            icon={<Users size={20} />} 
            color="blue" 
            loading={statsLoading} 
          />
          <StatsCard 
            label="ลงทะเบียนเดือนนี้" 
            value={stats?.newThisMonth ?? 0} 
            icon={<UserPlus size={20} />} 
            color="emerald" 
            trend={{ value: 12, isUp: true }} 
            loading={statsLoading} 
          />
          <StatsCard 
            label="มาพบแพทย์วันนี้" 
            value={stats?.visitedToday ?? 0} 
            icon={<Activity size={20} />} 
            color="amber" 
            loading={statsLoading} 
          />
          <StatsCard 
            label="มีประวัติแพ้ยา" 
            value={stats?.withAllergy ?? 0} 
            icon={<Heart size={20} />} 
            color="purple" 
            loading={statsLoading} 
          />
        </div>

        {/* ============================================ */}
        {/* Search & Actions Bar */}
        {/* ============================================ */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ค้นหา HN, ชื่อ, เลขบัตรประชาชน, เบอร์โทร..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-colors flex items-center gap-2 ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <SlidersHorizontal size={18} />
                {activeFilterCount > 0 && (
                  <span className={`size-5 rounded-full text-xs font-bold flex items-center justify-center ${
                    showFilters ? 'bg-white text-primary-600' : 'bg-primary-500 text-white'
                  }`}>
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <div className="hidden sm:flex border-l border-slate-200 dark:border-slate-700 pl-2 gap-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400'
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400'
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              {filters.sex && filters.sex !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                  เพศ: {filters.sex === 'M' ? 'ชาย' : 'หญิง'}
                  <button onClick={() => setFilters({ ...filters, sex: undefined })} className="hover:text-primary-800">
                    <X size={12} />
                  </button>
                </span>
              )}
              {filters.pttype && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                  สิทธิ์: {filters.pttype}
                  <button onClick={() => setFilters({ ...filters, pttype: undefined })} className="hover:text-primary-800">
                    <X size={12} />
                  </button>
                </span>
              )}
              {filters.hasAllergy && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                  แพ้ยา
                  <button onClick={() => setFilters({ ...filters, hasAllergy: undefined })} className="hover:text-red-800">
                    <X size={12} />
                  </button>
                </span>
              )}
              {(filters.ageFrom || filters.ageTo) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                  อายุ: {filters.ageFrom || '0'} - {filters.ageTo || '∞'} ปี
                  <button onClick={() => setFilters({ ...filters, ageFrom: undefined, ageTo: undefined })} className="hover:text-primary-800">
                    <X size={12} />
                  </button>
                </span>
              )}
              {(filters.lastVisitFrom || filters.lastVisitTo) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                  วันที่มา: {filters.lastVisitFrom || '...'} - {filters.lastVisitTo || '...'}
                  <button onClick={() => setFilters({ ...filters, lastVisitFrom: undefined, lastVisitTo: undefined })} className="hover:text-primary-800">
                    <X size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={() => setFilters({})}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
              >
                ล้างทั้งหมด
              </button>
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* Content Area with Filter Sidebar */}
        {/* ============================================ */}
        <div className="flex gap-6 items-start">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500">
                แสดง <span className="font-medium text-slate-900 dark:text-white">{filteredPatients.length}</span> รายการ
                {searchQuery && <span> สำหรับ "{searchQuery}"</span>}
              </p>
              <p className="text-xs text-slate-400 hidden lg:block">
                💡 คลิกขวาเพื่อเปิดเมนู
              </p>
            </div>

            {/* Loading / Empty / Content */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw size={24} className="animate-spin text-primary-500" />
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="size-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                  <Users size={32} className="text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">ไม่พบข้อมูลผู้ป่วย</h3>
                <p className="text-sm text-slate-500">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
              </div>
            ) : (
              <>
                {/* Mobile: Card View */}
                <div className="lg:hidden space-y-3">
                  {filteredPatients.map((patient) => (
                    <PatientCard
                      key={patient.hn}
                      patient={patient}
                      onView={() => handleView(patient)}
                      onEdit={() => handleEdit(patient)}
                      onContextMenu={(e) => contextMenu.open(e, patient)}
                      onDelete={() => deleteDialog.open(patient)}
                    />
                  ))}
                </div>

                {/* Desktop: Table or Grid */}
                <div className="hidden lg:block">
                  {viewMode === 'list' ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ผู้ป่วย</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">เลขบัตรประชาชน</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">เพศ/อายุ</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">หมู่เลือด</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">โทรศัพท์</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">สิทธิ์</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">มาล่าสุด</th>
                              <th className="px-4 py-3 w-12"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredPatients.map((patient) => (
                              <PatientTableRow
                                key={patient.hn}
                                patient={patient}
                                onView={() => handleView(patient)}
                                onEdit={() => handleEdit(patient)}
                                onContextMenu={(e) => contextMenu.open(e, patient)}
                                onDelete={() => deleteDialog.open(patient)}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredPatients.map((patient) => (
                        <PatientCard
                          key={patient.hn}
                          patient={patient}
                          onView={() => handleView(patient)}
                          onEdit={() => handleEdit(patient)}
                          onContextMenu={(e) => contextMenu.open(e, patient)}
                          onDelete={() => deleteDialog.open(patient)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================ */}
            {/* Pagination */}
            {/* ============================================ */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500">
                  หน้า {pagination.page} จาก {pagination.totalPages} ({pagination.total.toLocaleString()} รายการ)
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(pagination.page - 1)}
                    disabled={pagination.page <= 1 || loading}
                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {/* Page numbers */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageStart = Math.max(1, Math.min(pagination.page - 2, pagination.totalPages - 4));
                      const pageNum = pageStart + i;
                      if (pageNum > pagination.totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          disabled={loading}
                          className={`min-w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                            pageNum === pagination.page
                              ? 'bg-primary-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setPage(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages || loading}
                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filter Sidebar - Desktop (Inline) */}
          <div className="hidden lg:block shrink-0">
            {showFilters && (
              <FilterSidebar
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                filters={filters}
                onFiltersChange={setFilters}
                pttypeOptions={pttypeOptions}
              />
            )}
          </div>
        </div>

        {/* Filter Sidebar - Mobile (Overlay) */}
        <div className="lg:hidden">
          <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            onFiltersChange={setFilters}
            pttypeOptions={pttypeOptions}
          />
        </div>

        {/* ============================================ */}
        {/* Context Menu */}
        {/* ============================================ */}
        <ContextMenu
          open={contextMenu.isOpen}
          position={contextMenu.position}
          onClose={contextMenu.close}
        >
          <ContextMenuLabel>{contextMenu.data?.fullName}</ContextMenuLabel>
          <ContextMenuDivider />
          <ContextMenuItem icon={Eye} onClick={() => { if (contextMenu.data) handleView(contextMenu.data); contextMenu.close(); }}>
            ดูข้อมูล
          </ContextMenuItem>
          <ContextMenuItem icon={Edit} onClick={() => { if (contextMenu.data) handleEdit(contextMenu.data); contextMenu.close(); }}>
            แก้ไขข้อมูล
          </ContextMenuItem>
          <ContextMenuItem icon={Stethoscope} variant="success" onClick={() => { if (contextMenu.data) handleNewVisit(contextMenu.data); contextMenu.close(); }}>
            ส่งตรวจ OPD
          </ContextMenuItem>
          <ContextMenuDivider />
          <ContextMenuItem icon={Copy} shortcut="⌘C" onClick={() => { if (contextMenu.data) handleCopyHN(contextMenu.data.hn); contextMenu.close(); }}>
            คัดลอก HN
          </ContextMenuItem>
          <ContextMenuItem icon={History} onClick={contextMenu.close}>ดูประวัติการรักษา</ContextMenuItem>
          <ContextMenuItem icon={Printer} onClick={contextMenu.close}>พิมพ์ประวัติ</ContextMenuItem>
          <ContextMenuItem icon={QrCode} onClick={contextMenu.close}>QR Code ผู้ป่วย</ContextMenuItem>
          <ContextMenuDivider />
          <ContextMenuItem icon={Trash2} variant="danger" onClick={() => { if (contextMenu.data) deleteDialog.open(contextMenu.data); contextMenu.close(); }}>
            ลบข้อมูล
          </ContextMenuItem>
        </ContextMenu>

        {/* ============================================ */}
        {/* Delete Confirm Dialog */}
        {/* ============================================ */}
        <ConfirmDialog
          {...deleteDialog.dialogProps}
          variant="danger"
          title="ยืนยันการลบข้อมูล"
          message={
            deleteDialog.data ? (
              <>
                คุณต้องการลบข้อมูลผู้ป่วย <strong>{deleteDialog.data.fullName}</strong> (HN: {deleteDialog.data.hn}) ใช่หรือไม่?
                <br />
                <span className="text-red-500">การดำเนินการนี้ไม่สามารถย้อนกลับได้</span>
              </>
            ) : ''
          }
          confirmText="ลบข้อมูล"
        />
      </div>
    </AdminLayout>
  );
}