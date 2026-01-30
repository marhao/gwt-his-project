'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout';
import {
  Bed,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Building2,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  LogOut,
  LogIn,
  ChevronRight,
  MoreHorizontal,
  Stethoscope,
  Heart,
  FileText,
  Phone,
  ArrowUpRight,
  RefreshCw,
  Download,
  ClipboardList,
  Pill,
  Banknote,
  Eye,
  UserPlus,
  Home,
  Ambulance,
  X,
  ChevronDown,
  LayoutGrid,
  LayoutList,
  MapPin,
} from 'lucide-react';

// ============================================
// Types
// ============================================

type ViewMode = 'list' | 'card';

interface IptRecord {
  an: string;
  hn: string;
  patient_name: string;
  patient_age: number;
  patient_sex: string;
  regdate: string;
  regtime: string;
  dchdate: string | null;
  dchtime: string | null;
  dchstts: string | null;
  dchtype: string | null;
  ward: string;
  ward_name: string;
  prediag: string;
  pttype: string;
  pttype_name: string;
  admdoctor: string;
  admdoctor_name: string;
  spclty: string;
  spclty_name: string;
  drg: string | null;
  rw: number | null;
  los: number;
  room_no?: string;
  bed_no?: string;
  is_critical?: boolean;
  estimate_discharge_date?: string;
}

interface WardSummary {
  ward: string;
  ward_name: string;
  total: number;
  available: number;
  critical: number;
}

// ============================================
// Mock Data
// ============================================

const mockWards: WardSummary[] = [
  { ward: 'W01', ward_name: 'อายุรกรรมชาย', total: 30, available: 8, critical: 2 },
  { ward: 'W02', ward_name: 'อายุรกรรมหญิง', total: 30, available: 5, critical: 1 },
  { ward: 'W03', ward_name: 'ศัลยกรรม', total: 24, available: 10, critical: 3 },
  { ward: 'W04', ward_name: 'สูติ-นรีเวช', total: 20, available: 12, critical: 0 },
  { ward: 'W05', ward_name: 'กุมารเวชกรรม', total: 20, available: 7, critical: 1 },
  { ward: 'ICU', ward_name: 'ICU', total: 10, available: 2, critical: 8 },
];

const mockIptRecords: IptRecord[] = [
  {
    an: '670001234',
    hn: '6712345',
    patient_name: 'นายสมชาย ใจดี',
    patient_age: 58,
    patient_sex: 'M',
    regdate: '2024-01-15',
    regtime: '14:30:00',
    dchdate: null,
    dchtime: null,
    dchstts: null,
    dchtype: null,
    ward: 'W01',
    ward_name: 'อายุรกรรมชาย',
    prediag: 'Acute myocardial infarction',
    pttype: 'UCS',
    pttype_name: 'บัตรทอง',
    admdoctor: 'D001',
    admdoctor_name: 'นพ.วิชัย หัวใจดี',
    spclty: '01',
    spclty_name: 'อายุรกรรม',
    drg: '12001',
    rw: 2.5,
    los: 5,
    room_no: '301',
    bed_no: 'A',
    is_critical: true,
    estimate_discharge_date: '2024-01-20',
  },
  {
    an: '670001235',
    hn: '6723456',
    patient_name: 'นางสมหญิง รักสุข',
    patient_age: 45,
    patient_sex: 'F',
    regdate: '2024-01-16',
    regtime: '09:15:00',
    dchdate: null,
    dchtime: null,
    dchstts: null,
    dchtype: null,
    ward: 'W02',
    ward_name: 'อายุรกรรมหญิง',
    prediag: 'Type 2 DM with complication',
    pttype: 'SSS',
    pttype_name: 'ประกันสังคม',
    admdoctor: 'D002',
    admdoctor_name: 'พญ.สุดา เยียวยา',
    spclty: '01',
    spclty_name: 'อายุรกรรม',
    drg: '13502',
    rw: 1.2,
    los: 3,
    room_no: '402',
    bed_no: 'B',
    is_critical: false,
    estimate_discharge_date: '2024-01-19',
  },
  {
    an: '670001236',
    hn: '6734567',
    patient_name: 'นายประเสริฐ มั่นคง',
    patient_age: 62,
    patient_sex: 'M',
    regdate: '2024-01-14',
    regtime: '22:45:00',
    dchdate: null,
    dchtime: null,
    dchstts: null,
    dchtype: null,
    ward: 'ICU',
    ward_name: 'ICU',
    prediag: 'Severe sepsis, Pneumonia',
    pttype: 'OFC',
    pttype_name: 'ข้าราชการ',
    admdoctor: 'D003',
    admdoctor_name: 'นพ.เกรียงไกร ฉุกเฉิน',
    spclty: '01',
    spclty_name: 'อายุรกรรม',
    drg: '17201',
    rw: 8.5,
    los: 6,
    room_no: 'ICU',
    bed_no: '3',
    is_critical: true,
  },
  {
    an: '670001237',
    hn: '6745678',
    patient_name: 'ด.ช.ภูมิ เติบโต',
    patient_age: 8,
    patient_sex: 'M',
    regdate: '2024-01-17',
    regtime: '11:00:00',
    dchdate: null,
    dchtime: null,
    dchstts: null,
    dchtype: null,
    ward: 'W05',
    ward_name: 'กุมารเวชกรรม',
    prediag: 'Acute appendicitis',
    pttype: 'UCS',
    pttype_name: 'บัตรทอง',
    admdoctor: 'D004',
    admdoctor_name: 'พญ.นิดา เด็กดี',
    spclty: '03',
    spclty_name: 'ศัลยกรรม',
    drg: '06801',
    rw: 1.8,
    los: 2,
    room_no: '501',
    bed_no: 'C',
    is_critical: false,
    estimate_discharge_date: '2024-01-19',
  },
  {
    an: '670001238',
    hn: '6756789',
    patient_name: 'นางมาลี ครรภ์แก้ว',
    patient_age: 28,
    patient_sex: 'F',
    regdate: '2024-01-17',
    regtime: '03:30:00',
    dchdate: null,
    dchtime: null,
    dchstts: null,
    dchtype: null,
    ward: 'W04',
    ward_name: 'สูติ-นรีเวช',
    prediag: 'Full term pregnancy, labor',
    pttype: 'SSS',
    pttype_name: 'ประกันสังคม',
    admdoctor: 'D005',
    admdoctor_name: 'พญ.วิไล คลอดง่าย',
    spclty: '05',
    spclty_name: 'สูติ-นรีเวชกรรม',
    drg: '14001',
    rw: 0.8,
    los: 1,
    room_no: 'LR',
    bed_no: '2',
    is_critical: false,
    estimate_discharge_date: '2024-01-18',
  },
  {
    an: '670001230',
    hn: '6700001',
    patient_name: 'นายวิชัย ผ่าตัด',
    patient_age: 55,
    patient_sex: 'M',
    regdate: '2024-01-13',
    regtime: '08:00:00',
    dchdate: '2024-01-17',
    dchtime: '10:00:00',
    dchstts: '01',
    dchtype: '1',
    ward: 'W03',
    ward_name: 'ศัลยกรรม',
    prediag: 'Cholecystitis, Gallstone',
    pttype: 'OFC',
    pttype_name: 'ข้าราชการ',
    admdoctor: 'D006',
    admdoctor_name: 'นพ.สุรชัย มีดคม',
    spclty: '03',
    spclty_name: 'ศัลยกรรม',
    drg: '07101',
    rw: 2.1,
    los: 4,
    room_no: '303',
    bed_no: 'A',
    is_critical: false,
  },
];

const dchStatusMap: Record<string, { label: string; color: string }> = {
  '01': { label: 'Complete Recovery', color: 'emerald' },
  '02': { label: 'Improved', color: 'blue' },
  '03': { label: 'Not Improved', color: 'amber' },
  '04': { label: 'Normal Delivery', color: 'emerald' },
  '05': { label: 'Undelivered', color: 'slate' },
  '06': { label: 'Normal Child', color: 'emerald' },
  '07': { label: 'Stillbirth', color: 'red' },
  '08': { label: 'Dead', color: 'red' },
  '09': { label: 'Dead (Autopsy)', color: 'red' },
};

// ============================================
// Helper Functions
// ============================================

const formatDate = (date: string) => {
  const d = new Date(date);
  const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  return `${d.getDate()} ${thaiMonths[d.getMonth()]} ${d.getFullYear() + 543}`;
};

const formatTime = (time: string) => {
  return time.substring(0, 5);
};

const calculateLOS = (regdate: string, dchdate: string | null) => {
  const start = new Date(regdate);
  const end = dchdate ? new Date(dchdate) : new Date();
  const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

// ============================================
// Sub Components
// ============================================

// Stats Card
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; isUp: boolean };
  color: 'primary' | 'emerald' | 'amber' | 'red' | 'blue';
}

const StatsCard = ({ title, value, subtitle, icon, trend, color }: StatsCardProps) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600 shadow-primary-500/25',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/25',
    red: 'from-red-500 to-red-600 shadow-red-500/25',
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{trend.value}% จากเมื่อวาน</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
};

// Ward Card
interface WardCardProps {
  ward: WardSummary;
  onClick?: () => void;
}

const WardCard = ({ ward, onClick }: WardCardProps) => {
  const occupancy = ((ward.total - ward.available) / ward.total) * 100;
  const occupancyColor = occupancy >= 90 ? 'red' : occupancy >= 70 ? 'amber' : 'emerald';

  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all text-left w-full group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-500/10">
            <Building2 size={18} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">{ward.ward_name}</h4>
            <p className="text-xs text-slate-500">{ward.ward}</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
      </div>

      {/* Occupancy Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-slate-500">ครองเตียง</span>
          <span className={`font-medium text-${occupancyColor}-600`}>{occupancy.toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-${occupancyColor}-500 rounded-full transition-all`}
            style={{ width: `${occupancy}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <p className="text-lg font-bold text-slate-900 dark:text-white">{ward.total - ward.available}</p>
          <p className="text-xs text-slate-500">ครอง</p>
        </div>
        <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
          <p className="text-lg font-bold text-emerald-600">{ward.available}</p>
          <p className="text-xs text-slate-500">ว่าง</p>
        </div>
        <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
          <p className="text-lg font-bold text-red-600">{ward.critical}</p>
          <p className="text-xs text-slate-500">วิกฤต</p>
        </div>
      </div>
    </button>
  );
};

// Patient Row
interface PatientRowProps {
  record: IptRecord;
}

const PatientRow = ({ record }: PatientRowProps) => {
  const isAdmitted = !record.dchstts;
  const los = calculateLOS(record.regdate, record.dchdate);

  return (
    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      {/* AN / HN */}
      <td className="px-4 py-3">
        <div>
          <Link
            href={`/ipd/${record.an}`}
            className="font-mono font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            {record.an}
          </Link>
          <p className="text-xs text-slate-500 font-mono">HN: {record.hn}</p>
        </div>
      </td>

      {/* Patient */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
            record.patient_sex === 'M' 
              ? 'bg-blue-100 dark:bg-blue-500/20' 
              : 'bg-pink-100 dark:bg-pink-500/20'
          }`}>
            <User size={18} className={record.patient_sex === 'M' ? 'text-blue-600' : 'text-pink-600'} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Link
                href={`/patients/${record.hn}`}
                className="font-medium text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
              >
                {record.patient_name}
              </Link>
              {record.is_critical && (
                <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
                  <AlertCircle size={10} />
                  วิกฤต
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">
              {record.patient_age} ปี • {record.patient_sex === 'M' ? 'ชาย' : 'หญิง'}
            </p>
          </div>
        </div>
      </td>

      {/* Ward / Room */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Bed size={16} className="text-slate-400" />
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{record.ward_name}</p>
            <p className="text-sm text-slate-500">
              ห้อง {record.room_no} / เตียง {record.bed_no}
            </p>
          </div>
        </div>
      </td>

      {/* Diagnosis */}
      <td className="px-4 py-3">
        <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 max-w-xs">
          {record.prediag}
        </p>
      </td>

      {/* Admit Date / LOS */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-slate-400" />
          <div>
            <p className="text-sm text-slate-900 dark:text-white">{formatDate(record.regdate)}</p>
            <p className="text-xs text-slate-500">{formatTime(record.regtime)} น.</p>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1 text-sm">
          <Clock size={12} className="text-slate-400" />
          <span className={`font-medium ${los > 7 ? 'text-amber-600' : 'text-slate-600 dark:text-slate-400'}`}>
            {los} วัน
          </span>
        </div>
      </td>

      {/* Doctor */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Stethoscope size={16} className="text-slate-400" />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">{record.admdoctor_name}</p>
            <p className="text-xs text-slate-500">{record.spclty_name}</p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        {isAdmitted ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full">
            <span className="size-1.5 bg-blue-500 rounded-full animate-pulse" />
            Admit
          </span>
        ) : (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium rounded-full bg-${dchStatusMap[record.dchstts!]?.color || 'slate'}-100 dark:bg-${dchStatusMap[record.dchstts!]?.color || 'slate'}-500/20 text-${dchStatusMap[record.dchstts!]?.color || 'slate'}-700 dark:text-${dchStatusMap[record.dchstts!]?.color || 'slate'}-400`}>
            <CheckCircle2 size={14} />
            D/C
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/ipd/${record.an}`}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary-600"
            title="ดูรายละเอียด"
          >
            <Eye size={16} />
          </Link>
          <Link
            href={`/ipd/${record.an}/orders`}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary-600"
            title="คำสั่งการรักษา"
          >
            <ClipboardList size={16} />
          </Link>
          <Link
            href={`/ipd/${record.an}/medications`}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary-600"
            title="ยา"
          >
            <Pill size={16} />
          </Link>
          <button
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400"
            title="เพิ่มเติม"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Patient Card Component (for Card View)
const PatientCard = ({ record }: PatientRowProps) => {
  const isAdmitted = !record.dchstts;
  const los = calculateLOS(record.regdate, record.dchdate);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all group">
      {/* Header with Status */}
      <div className={`px-4 py-3 flex items-center justify-between ${
        record.is_critical 
          ? 'bg-gradient-to-r from-red-500 to-red-600' 
          : isAdmitted 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600'
            : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
      }`}>
        <div className="flex items-center gap-2 text-white">
          <Bed size={16} />
          <span className="font-mono font-medium">{record.an}</span>
        </div>
        <div className="flex items-center gap-2">
          {record.is_critical && (
            <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded-full flex items-center gap-1">
              <AlertCircle size={10} />
              วิกฤต
            </span>
          )}
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            isAdmitted 
              ? 'bg-white/20 text-white' 
              : 'bg-white/20 text-white'
          }`}>
            {isAdmitted ? 'Admit' : 'D/C'}
          </span>
        </div>
      </div>

      {/* Patient Info */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${
            record.patient_sex === 'M' 
              ? 'bg-blue-100 dark:bg-blue-500/20' 
              : 'bg-pink-100 dark:bg-pink-500/20'
          }`}>
            <User size={24} className={record.patient_sex === 'M' ? 'text-blue-600' : 'text-pink-600'} />
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={`/patients/${record.hn}`}
              className="font-semibold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 block truncate"
            >
              {record.patient_name}
            </Link>
            <p className="text-sm text-slate-500">
              {record.patient_age} ปี • {record.patient_sex === 'M' ? 'ชาย' : 'หญิง'}
            </p>
            <p className="text-xs text-slate-400 font-mono">HN: {record.hn}</p>
          </div>
        </div>

        {/* Ward & Room */}
        <div className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl mb-3">
          <Building2 size={16} className="text-slate-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">{record.ward_name}</p>
            <p className="text-xs text-slate-500">ห้อง {record.room_no} / เตียง {record.bed_no}</p>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mb-3">
          <p className="text-xs text-slate-500 mb-1">การวินิจฉัย</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
            {record.prediag}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Calendar size={12} />
              <span className="text-xs">วันที่รับ</span>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">{formatDate(record.regdate)}</p>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Clock size={12} />
              <span className="text-xs">LOS</span>
            </div>
            <p className={`text-sm font-medium ${los > 7 ? 'text-amber-600' : 'text-slate-900 dark:text-white'}`}>
              {los} วัน
            </p>
          </div>
        </div>

        {/* Doctor */}
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope size={14} className="text-slate-400" />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">{record.admdoctor_name}</p>
            <p className="text-xs text-slate-500">{record.spclty_name}</p>
          </div>
        </div>

        {/* Rights Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
            {record.pttype_name}
          </span>
          {record.drg && (
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full">
              DRG: {record.drg}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Link
            href={`/ipd/${record.an}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-xl hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors"
          >
            <Eye size={14} />
            ดูรายละเอียด
          </Link>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600">
            <ClipboardList size={16} />
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600">
            <Pill size={16} />
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Main Component
// ============================================

export default function IPDPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWard, setFilterWard] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'admitted' | 'discharged'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isManualViewMode, setIsManualViewMode] = useState(false);

  // Responsive: Auto switch to card view on mobile
  useEffect(() => {
    const handleResize = () => {
      // Only auto-switch if user hasn't manually selected a view
      if (!isManualViewMode) {
        if (window.innerWidth < 1024) {
          setViewMode('card');
        } else {
          setViewMode('list');
        }
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isManualViewMode]);

  // Handle manual view mode change
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setIsManualViewMode(true);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const admitted = mockIptRecords.filter(r => !r.dchstts);
    const discharged = mockIptRecords.filter(r => r.dchstts);
    const critical = admitted.filter(r => r.is_critical);
    const totalBeds = mockWards.reduce((sum, w) => sum + w.total, 0);
    const availableBeds = mockWards.reduce((sum, w) => sum + w.available, 0);

    return {
      admitted: admitted.length,
      discharged: discharged.length,
      critical: critical.length,
      occupancy: ((totalBeds - availableBeds) / totalBeds * 100).toFixed(1),
      availableBeds,
    };
  }, []);

  // Filter records
  const filteredRecords = useMemo(() => {
    return mockIptRecords.filter(record => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          record.an.toLowerCase().includes(query) ||
          record.hn.toLowerCase().includes(query) ||
          record.patient_name.toLowerCase().includes(query) ||
          record.prediag.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Ward filter
      if (filterWard !== 'all' && record.ward !== filterWard) return false;

      // Status filter
      if (filterStatus === 'admitted' && record.dchstts) return false;
      if (filterStatus === 'discharged' && !record.dchstts) return false;

      return true;
    });
  }, [searchQuery, filterWard, filterStatus]);

  return (
    <AdminLayout>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25">
              <Bed size={24} />
            </div>
            งานผู้ป่วยใน (IPD)
          </h1>
          <p className="text-slate-500 mt-1">จัดการข้อมูลผู้ป่วยในและหอผู้ป่วย</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/ipd/admit"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25 transition-all"
          >
            <UserPlus size={18} />
            รับผู้ป่วยเข้า
          </Link>
          <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <RefreshCw size={18} className="text-slate-600 dark:text-slate-400" />
          </button>
          <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download size={18} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="ผู้ป่วยใน (Admit)"
          value={stats.admitted}
          subtitle="รายที่กำลังรักษา"
          icon={<Bed size={24} />}
          color="blue"
        />
        <StatsCard
          title="จำหน่ายวันนี้"
          value={stats.discharged}
          subtitle="D/C ทั้งหมด"
          icon={<LogOut size={24} />}
          color="emerald"
          trend={{ value: 12, isUp: true }}
        />
        <StatsCard
          title="ผู้ป่วยวิกฤต"
          value={stats.critical}
          subtitle="ต้องเฝ้าระวัง"
          icon={<AlertCircle size={24} />}
          color="red"
        />
        <StatsCard
          title="อัตราครองเตียง"
          value={`${stats.occupancy}%`}
          subtitle={`ว่าง ${stats.availableBeds} เตียง`}
          icon={<Activity size={24} />}
          color="amber"
        />
        <StatsCard
          title="รับใหม่วันนี้"
          value={3}
          subtitle="เทียบกับเมื่อวาน"
          icon={<UserPlus size={24} />}
          color="primary"
          trend={{ value: 8, isUp: true }}
        />
      </div>

      {/* Ward Overview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 size={18} className="text-slate-400" />
            ภาพรวมหอผู้ป่วย
          </h2>
          <Link href="/ipd/wards" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            ดูทั้งหมด
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {mockWards.map((ward) => (
            <WardCard key={ward.ward} ward={ward} onClick={() => setFilterWard(ward.ward)} />
          ))}
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหา AN, HN, ชื่อผู้ป่วย, การวินิจฉัย..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2">
              {/* Status Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                {[
                  { key: 'all', label: 'ทั้งหมด' },
                  { key: 'admitted', label: 'Admit' },
                  { key: 'discharged', label: 'D/C' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFilterStatus(item.key as typeof filterStatus)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      filterStatus === item.key
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Ward Filter */}
              <div className="relative">
                <select
                  value={filterWard}
                  onChange={(e) => setFilterWard(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer"
                >
                  <option value="all">หอผู้ป่วยทั้งหมด</option>
                  {mockWards.map((ward) => (
                    <option key={ward.ward} value={ward.ward}>{ward.ward_name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* More Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  showFilters
                    ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-800 text-primary-600'
                    : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Extended Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">วันที่รับเข้า</label>
                <input type="date" className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">แพทย์เจ้าของไข้</label>
                <select className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm">
                  <option>ทั้งหมด</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">สิทธิการรักษา</label>
                <select className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm">
                  <option>ทั้งหมด</option>
                  <option>บัตรทอง</option>
                  <option>ประกันสังคม</option>
                  <option>ข้าราชการ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">สาขา</label>
                <select className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm">
                  <option>ทั้งหมด</option>
                  <option>อายุรกรรม</option>
                  <option>ศัลยกรรม</option>
                  <option>กุมารเวชกรรม</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count & View Toggle */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            พบ <span className="font-semibold text-slate-900 dark:text-white">{filteredRecords.length}</span> รายการ
            {filterWard !== 'all' && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 text-xs font-medium rounded-full">
                {mockWards.find(w => w.ward === filterWard)?.ward_name}
                <button onClick={() => setFilterWard('all')} className="hover:text-primary-900">
                  <X size={12} />
                </button>
              </span>
            )}
          </p>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-700 rounded-lg p-1 border border-slate-200 dark:border-slate-600">
            <button
              onClick={() => handleViewModeChange('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
              }`}
              title="แสดงแบบตาราง"
            >
              <LayoutList size={16} />
            </button>
            <button
              onClick={() => handleViewModeChange('card')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'card'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
              }`}
              title="แสดงแบบการ์ด"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Content - List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">AN / HN</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ผู้ป่วย</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">หอผู้ป่วย</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">การวินิจฉัย</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">วันที่รับ / LOS</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">แพทย์</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">สถานะ</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-32"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredRecords.map((record) => (
                  <PatientRow key={record.an} record={record} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Content - Card View */}
        {viewMode === 'card' && (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredRecords.map((record) => (
                <PatientCard key={record.an} record={record} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredRecords.length === 0 && (
          <div className="py-12 text-center">
            <Bed size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-500">ไม่พบข้อมูลผู้ป่วยที่ค้นหา</p>
          </div>
        )}

        {/* Pagination */}
        {filteredRecords.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-500">แสดง 1-{filteredRecords.length} จาก {filteredRecords.length} รายการ</p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-50" disabled>
                ก่อนหน้า
              </button>
              <button className="px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg">1</button>
              <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-50" disabled>
                ถัดไป
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <LogIn size={20} />, label: 'รับผู้ป่วยเข้า', href: '/ipd/admit', color: 'primary' },
          { icon: <LogOut size={20} />, label: 'จำหน่ายผู้ป่วย', href: '/ipd/discharge', color: 'emerald' },
          { icon: <Ambulance size={20} />, label: 'ส่งต่อ Refer', href: '/ipd/refer', color: 'amber' },
          { icon: <FileText size={20} />, label: 'รายงาน IPD', href: '/ipd/reports', color: 'blue' },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
          >
            <div className={`p-2.5 rounded-xl bg-${action.color}-50 dark:bg-${action.color}-500/10 text-${action.color}-600 dark:text-${action.color}-400 group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <span className="font-medium text-slate-900 dark:text-white">{action.label}</span>
            <ChevronRight size={18} className="ml-auto text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
}