'use client';

import { useState } from 'react';
import {
  X,
  Shield,
  User,
  Calendar,
  MapPin,
  Building2,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileCheck,
  Heart,
  BadgeCheck,
  ChevronRight,
  Copy,
  Printer,
  Download,
  RefreshCw,
  Info,
  Phone,
  Home,
  Users,
  Banknote,
  Hospital,
  Activity,
  Sparkles,
} from 'lucide-react';

// Types based on the JSON structure
interface NHSOResult {
  id: number;
  personData: {
    pid: string;
    subPid: string;
    titleName: string;
    fname: string;
    lname: string;
    motherId: string;
    fatherId: string;
    nation: string;
    birthDate: string;
    sex: string;
    homeAddress: {
      adressNo: string;
    };
    addressCatm: {
      catm: string;
      name: string;
      changwatName: string;
      amphurName: string;
      tumbonName: string;
      moobanName: string;
      moo: string;
    };
    catm: string;
    transDate: string;
    statusDola: string;
    parseBirthDate: string;
    fullName: string;
    age: {
      years: number;
      days: number;
      months: number;
    };
    fullAddress: string;
    sexDesc: string;
    parseBirthDateOptional: string;
    displayBirthDate: string;
    birthDateStatus: string;
  };
  mainInscl: {
    rightId: string;
    rightName: string;
    codeWithName: string;
  };
  subInscl: {
    inscl: string;
    insclName: string;
    mainInscl: string;
    right: {
      rightId: string;
      rightName: string;
      codeWithName: string;
    };
    codeWithName: string;
  };
  claimMainType: string;
  hospMain: {
    hcode: string;
    hname: string;
  };
  transDate: string;
  startDateTime: string;
  additionalHmains: string[];
  ownerPid: string;
  sourceData: string;
  fundType: string;
  fundFlag: string;
  startDateStr: string;
  searchDate: string;
  searchTime: string;
  createBy: string;
  createDate: string;
  subPid: string;
  pid: string;
}

// Mock data from the provided JSON
const mockNHSOResult: NHSOResult = {
  id: 246704437,
  personData: {
    pid: '5301700046738',
    subPid: '73',
    titleName: '003',
    fname: 'สุพัฒน์',
    lname: 'เที่ยงเหลา',
    motherId: '0            ',
    fatherId: '5301790013117',
    nation: '099',
    birthDate: '25250429',
    sex: '1',
    homeAddress: {
      adressNo: '89              ',
    },
    addressCatm: {
      catm: '30290301',
      name: 'ปลักอีแรด',
      changwatName: 'นครราชสีมา',
      amphurName: 'ลำทะเมนชัย',
      tumbonName: 'ช่องแมว',
      moobanName: 'ปลักอีแรด',
      moo: '01',
    },
    catm: '30290301',
    transDate: '2017-04-14T17:00:04',
    statusDola: '0',
    parseBirthDate: '1982-04-29',
    fullName: 'สุพัฒน์ เที่ยงเหลา',
    age: {
      years: 43,
      days: 21,
      months: 8,
    },
    fullAddress:
      'บ้านเลขที่ 89 หมู่ 01 หมู่บ้าน ปลักอีแรด ตำบล ช่องแมว อำเภอ ลำทะเมนชัย จังหวัด นครราชสีมา',
    sexDesc: 'ชาย',
    parseBirthDateOptional: '1982-04-29',
    displayBirthDate: 'เมษายน 2525',
    birthDateStatus: 'VALID',
  },
  mainInscl: {
    rightId: 'SSS',
    rightName: 'สิทธิประกันสังคม',
    codeWithName: '(SSS) สิทธิประกันสังคม',
  },
  subInscl: {
    inscl: 'S1',
    insclName: 'สิทธิเบิกกองทุนประกันสังคม (ผู้ประกันตน)',
    mainInscl: 'SSS',
    right: {
      rightId: 'SSS',
      rightName: 'สิทธิประกันสังคม',
      codeWithName: '(SSS) สิทธิประกันสังคม',
    },
    codeWithName: '(S1) สิทธิเบิกกองทุนประกันสังคม (ผู้ประกันตน)',
  },
  claimMainType: 'PP',
  hospMain: {
    hcode: '11743',
    hname: 'รพ.ทั่วไปขนาดใหญ่เปาโล สมุทรปราการ',
  },
  transDate: '2024-12-01T00:01:02',
  startDateTime: '2024-12-01T00:00:00',
  additionalHmains: [],
  ownerPid: '5301700046738',
  sourceData: 'SSS',
  fundType: 'Y',
  fundFlag: '1',
  startDateStr: '25671201',
  searchDate: '2026-01-19',
  searchTime: '04:03:38.911863146',
  createBy: '11',
  createDate: '2024-12-01T01:20:57',
  subPid: '73',
  pid: '5301700046738',
};

// Helper functions
const formatCID = (cid: string) => {
  return cid.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5');
};

const formatThaiDate = (dateStr: string) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatThaiDateTime = (dateStr: string) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get right type color based on insurance type
const getRightTypeStyle = (rightId: string) => {
  const styles: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    UCS: {
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-500/30',
      gradient: 'from-amber-500 to-orange-500',
    },
    SSS: {
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-500/30',
      gradient: 'from-blue-500 to-cyan-500',
    },
    OFC: {
      bg: 'bg-purple-50 dark:bg-purple-500/10',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-500/30',
      gradient: 'from-purple-500 to-pink-500',
    },
    LGO: {
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      gradient: 'from-emerald-500 to-teal-500',
    },
  };
  return styles[rightId] || styles.UCS;
};

// ============================================
// Sub Components
// ============================================

// Info Row Component
const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
  copyable?: boolean;
}> = ({ icon, label, value, className = '', copyable }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof value === 'string') {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="size-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
        <span className="text-slate-500 dark:text-slate-400">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{value}</p>
          {copyable && (
            <button
              onClick={handleCopy}
              className="p-1 text-slate-400 hover:text-primary-500 transition-colors"
            >
              {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge: React.FC<{
  status: 'valid' | 'expired' | 'pending';
  text: string;
}> = ({ status, text }) => {
  const styles = {
    valid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
    expired: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
  };

  const icons = {
    valid: <CheckCircle2 size={14} />,
    expired: <AlertTriangle size={14} />,
    pending: <Clock size={14} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {icons[status]}
      {text}
    </span>
  );
};

// Card Section Component
const CardSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
}> = ({ title, icon, children, className = '', headerRight }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden ${className}`}>
    <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 dark:text-slate-400">{icon}</span>
        <h3 className="font-medium text-slate-900 dark:text-white text-sm">{title}</h3>
      </div>
      {headerRight}
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// ============================================
// Main Component
// ============================================
interface NHSOCheckResultProps {
  data?: NHSOResult;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (data: NHSOResult) => void;
}

export default function NHSOCheckResult({
  data = mockNHSOResult,
  isOpen,
  onClose,
  onConfirm,
}: NHSOCheckResultProps) {
  const [loading, setLoading] = useState(false);
  const rightStyle = getRightTypeStyle(data.mainInscl.rightId);

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  const handleConfirm = () => {
    onConfirm?.(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* ============================================ */}
        {/* Header */}
        {/* ============================================ */}
        <div className={`relative px-6 py-5 bg-gradient-to-r ${rightStyle.gradient} text-white overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 size-40 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 size-32 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
          </div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="size-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Shield size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold">ผลการตรวจสอบสิทธิ์</h2>
                <p className="text-white/80 text-sm mt-0.5">สำนักงานหลักประกันสุขภาพแห่งชาติ (สปสช.)</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Status Row */}
          <div className="relative mt-4 flex items-center gap-3 flex-wrap">
            <StatusBadge status="valid" text="สิทธิ์ใช้งานได้" />
            <span className="text-white/60 text-xs">
              ตรวจสอบเมื่อ {data.searchDate} เวลา {data.searchTime.split('.')[0]}
            </span>
          </div>
        </div>

        {/* ============================================ */}
        {/* Content */}
        {/* ============================================ */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          
          {/* Main Right Card */}
          <div className={`relative p-5 rounded-2xl border-2 ${rightStyle.border} ${rightStyle.bg} overflow-hidden`}>
            {/* Decorative */}
            <div className="absolute top-0 right-0 opacity-5">
              <Sparkles size={120} />
            </div>
            
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className={`size-16 bg-gradient-to-br ${rightStyle.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <BadgeCheck size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${rightStyle.bg} ${rightStyle.text} border ${rightStyle.border}`}>
                      {data.mainInscl.rightId}
                    </span>
                    <span className={`text-xs ${rightStyle.text}`}>{data.subInscl.inscl}</span>
                  </div>
                  <h3 className={`mt-2 text-lg font-bold ${rightStyle.text}`}>
                    {data.mainInscl.rightName}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {data.subInscl.insclName}
                  </p>
                </div>
              </div>

              {/* Right Details */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">รหัสกองทุน</p>
                  <p className="font-mono font-bold text-slate-900 dark:text-white">{data.claimMainType}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fund Type</p>
                  <p className="font-mono font-bold text-slate-900 dark:text-white">{data.fundType}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">วันที่เริ่มสิทธิ์</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {formatThaiDate(data.startDateTime)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">แหล่งข้อมูล</p>
                  <p className="font-mono text-sm font-medium text-slate-900 dark:text-white">{data.sourceData}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <CardSection title="ข้อมูลผู้ป่วย" icon={<User size={16} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow
                icon={<User size={14} />}
                label="ชื่อ-นามสกุล"
                value={data.personData.fullName}
              />
              <InfoRow
                icon={<CreditCard size={14} />}
                label="เลขบัตรประชาชน"
                value={<span className="font-mono">{formatCID(data.personData.pid)}</span>}
                copyable
              />
              <InfoRow
                icon={<Calendar size={14} />}
                label="วันเกิด"
                value={data.personData.displayBirthDate}
              />
              <InfoRow
                icon={<Activity size={14} />}
                label="อายุ"
                value={`${data.personData.age.years} ปี ${data.personData.age.months} เดือน ${data.personData.age.days} วัน`}
              />
              <InfoRow
                icon={<Users size={14} />}
                label="เพศ"
                value={data.personData.sexDesc}
              />
              <InfoRow
                icon={<FileCheck size={14} />}
                label="สถานะวันเกิด"
                value={
                  <StatusBadge
                    status={data.personData.birthDateStatus === 'VALID' ? 'valid' : 'pending'}
                    text={data.personData.birthDateStatus === 'VALID' ? 'ยืนยันแล้ว' : 'รอยืนยัน'}
                  />
                }
              />
            </div>
          </CardSection>

          {/* Address Information */}
          <CardSection title="ที่อยู่ตามทะเบียนราษฎร์" icon={<MapPin size={16} />}>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Home size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {data.personData.fullAddress}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 dark:text-slate-400">จังหวัด</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                    {data.personData.addressCatm.changwatName}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 dark:text-slate-400">อำเภอ</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                    {data.personData.addressCatm.amphurName}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 dark:text-slate-400">ตำบล</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                    {data.personData.addressCatm.tumbonName}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 dark:text-slate-400">รหัสตำบล</p>
                  <p className="text-sm font-mono font-medium text-slate-900 dark:text-white mt-1">
                    {data.personData.addressCatm.catm}
                  </p>
                </div>
              </div>
            </div>
          </CardSection>

          {/* Hospital Information */}
          <CardSection
            title="หน่วยบริการหลัก"
            icon={<Hospital size={16} />}
            headerRight={
              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-medium">
                ลงทะเบียนแล้ว
              </span>
            }
          >
            <div className="flex items-start gap-4">
              <div className="size-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                <Building2 size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-mono">
                    {data.hospMain.hcode}
                  </span>
                </div>
                <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                  {data.hospMain.hname}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  หน่วยบริการประจำตัว
                </p>
              </div>
            </div>
          </CardSection>

          {/* Transaction Info */}
          <CardSection title="ข้อมูลการตรวจสอบ" icon={<Clock size={16} />}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Transaction ID</p>
                <p className="font-mono font-medium text-slate-900 dark:text-white mt-1">{data.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">วันที่ Transaction</p>
                <p className="font-medium text-slate-900 dark:text-white mt-1">
                  {formatThaiDateTime(data.transDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">วันที่สร้างข้อมูล</p>
                <p className="font-medium text-slate-900 dark:text-white mt-1">
                  {formatThaiDateTime(data.createDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">ผู้สร้างข้อมูล</p>
                <p className="font-mono font-medium text-slate-900 dark:text-white mt-1">{data.createBy}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Sub PID</p>
                <p className="font-mono font-medium text-slate-900 dark:text-white mt-1">{data.subPid}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Fund Flag</p>
                <p className="font-mono font-medium text-slate-900 dark:text-white mt-1">{data.fundFlag}</p>
              </div>
            </div>
          </CardSection>

        </div>

        {/* ============================================ */}
        {/* Footer Actions */}
        {/* ============================================ */}
        <div className="px-4 lg:px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Secondary Actions */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                <span className="sm:hidden lg:inline">ตรวจสอบใหม่</span>
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Printer size={16} />
                <span className="sm:hidden lg:inline">พิมพ์</span>
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Download size={16} />
                <span className="sm:hidden lg:inline">ดาวน์โหลด</span>
              </button>
            </div>

            {/* Primary Actions */}
            <div className="flex-1 flex items-center gap-3 order-1 sm:order-2 sm:justify-end">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                ปิด
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r ${rightStyle.gradient} text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium flex items-center justify-center gap-2 shadow-lg`}
              >
                <CheckCircle2 size={18} />
                ใช้สิทธิ์นี้
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================
// Standalone Page Version
// ============================================
export function NHSOCheckResultPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Demo Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
        >
          เปิด Modal ตรวจสอบสิทธิ์
        </button>

        {/* Modal */}
        <NHSOCheckResult
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(data) => {
            console.log('Selected right:', data);
            alert(`เลือกใช้สิทธิ์: ${data.mainInscl.rightName}`);
          }}
        />
      </div>
    </div>
  );
}