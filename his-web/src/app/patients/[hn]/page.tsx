// =============================================================================
// File: src/app/patients/[hn]/page.tsx
// Description: Patient Detail/Profile Page - Modern Responsive Design
// =============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  Printer,
  MoreVertical,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Heart,
  Droplet,
  AlertCircle,
  Shield,
  Users,
  FileText,
  History,
  Stethoscope,
  Pill,
  Activity,
  Clock,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Share2,
  RefreshCw,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import { PatientDetail } from '@/types/patient.types';
import { usePatientDetail } from '@/hooks';
import { patientApi } from '@/lib/api';
import { usePatientImageManager } from '@/hooks/usePatientImages';
import { PatientImageUpload } from '@/components/ui/patient-image';

// ============================================
// Sub Components
// ============================================

// Info Item
const InfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  copyable?: boolean;
  link?: string;
}> = ({ icon, label, value, copyable, link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const content = (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
      <div className="size-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0 shadow-sm">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className={`text-sm font-medium ${value ? 'text-slate-900 dark:text-white' : 'text-slate-400'} truncate`}>
          {value || '-'}
        </p>
      </div>
      {copyable && value && (
        <button
          onClick={handleCopy}
          className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-slate-400" />}
        </button>
      )}
      {link && (
        <span className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
          <ExternalLink size={14} className="text-slate-400" />
        </span>
      )}
    </div>
  );

  if (link && !copyable) {
    return <a href={link}>{content}</a>;
  }

  return content;
};

// Section Card
const SectionCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, icon, children, action }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
    <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-lg bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
          {icon}
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{title}</h3>
      </div>
      {action}
    </div>
    <div className="p-2">{children}</div>
  </div>
);

// Quick Action Button
const QuickAction: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'purple' | 'emerald' | 'amber';
  onClick: () => void;
  disabled?: boolean;
}> = ({ icon, label, color, onClick, disabled = false }) => {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/20 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-500/20 dark:hover:to-blue-600/30 shadow-blue-100',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/20 border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-500/20 dark:hover:to-purple-600/30 shadow-purple-100',
    emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-600/20 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:from-emerald-100 hover:to-emerald-200 dark:hover:from-emerald-500/20 dark:hover:to-emerald-600/30 shadow-emerald-100',
    amber: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-500/10 dark:to-amber-600/20 border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-500/20 dark:hover:to-amber-600/30 shadow-amber-100',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border shadow-sm transition-all hover:scale-105 hover:shadow-md ${colorClasses[color]}`}
    >
      <div className="size-10 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

// ============================================
// Main Component
// ============================================
export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const hn = params.hn as string;

  // Use API hook
  const { patient, loading, error, refresh } = usePatientDetail(hn);

  // Patient image management
  const {
    primaryImage,
    loading: imageLoading,
    upload: uploadImage,
    uploading,
  } = usePatientImageManager(hn);

  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'documents'>('info');
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Handle image upload
  const handleImageUpload = async (imageData: string, width?: number, height?: number) => {
    await uploadImage(imageData, width, height);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !patient) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {error || 'ไม่พบข้อมูลผู้ป่วย'}
          </h2>
          <p className="text-slate-500 mt-1">HN: {hn}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => refresh()}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl flex items-center gap-2"
            >
              <RefreshCw size={16} />
              ลองใหม่
            </button>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-primary-500 text-white rounded-xl"
            >
              กลับ
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Prepare allergies array
  const allergies = patient.allergies || [];

  return (
    <AdminLayout>
      <div className="space-y-6 pb-24 lg:pb-6 bg-gradient-to-br from-slate-50 via-white to-slate-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -mx-4 px-4 lg:-mx-6 lg:px-6 -mt-4 pt-4 lg:-mt-6 lg:pt-6 min-h-screen">
        {/* ============================================ */}
        {/* Header */}
        {/* ============================================ */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 dark:from-primary-700 dark:via-primary-600 dark:to-primary-800 rounded-2xl p-4 lg:p-6 text-white relative overflow-hidden shadow-xl shadow-primary-500/20 dark:shadow-primary-900/30">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 size-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 size-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          {/* Content */}
          <div className="relative">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">กลับ</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/patients/${patient.hn}/edit`)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  <Printer size={18} />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {showMoreMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(false)} />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                          <Share2 size={14} /> แชร์ข้อมูล
                        </button>
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                          <FileText size={14} /> ส่งออก PDF
                        </button>
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <Trash2 size={14} /> ลบข้อมูล
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
              {/* Avatar with Image Upload */}
              <div className="flex items-center gap-4">
                <PatientImageUpload
                  hn={hn}
                  currentImage={primaryImage}
                  onUpload={handleImageUpload}
                  size="lg"
                  editable={true}
                  className="ring-4 ring-white/30 rounded-full"
                />
                <div className="lg:hidden">
                  <h1 className="text-xl font-bold">{patient.fullName}</h1>
                  <p className="text-white/80 font-mono">HN: {patient.hn}</p>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="hidden lg:block text-2xl font-bold mb-1">{patient.fullName}</h1>
                <p className="hidden lg:block text-white/80 font-mono mb-3">HN: {patient.hn}</p>
                <div className="flex flex-wrap gap-2">

                  {patient.death && (
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20 shadow-sm flex items-center gap-1.5 animate-pulse">
                      <span className="size-2 rounded-full bg-red-400" />
                      เสียชีวิต
                    </span>
                  )}
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/10 shadow-sm">
                    {patient.sex === 'M' || patient.sex === '1' ? 'ชาย' : 'หญิง'}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/10 shadow-sm">
                    {patient.ageText}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/10 shadow-sm">
                    {patient.bloodgrp}{patient.bloodgroupRh}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/10 shadow-sm">
                    {patient.pttypeName}
                  </span>
                </div>
              </div>

              {/* Warnings (Death / Allergy) */}
              {(patient.death === 'Y' || allergies.length > 0) && (
                <div className="lg:ml-auto flex flex-col gap-2">
                  {patient.death === 'Y' && (
                    <div className="p-3 bg-black/30 border border-white/20 rounded-xl">
                      <div className="flex items-center gap-2 text-white font-semibold text-sm">
                        <span className="size-2.5 rounded-full bg-red-400 animate-pulse" />
                        ผู้ป่วยเสียชีวิตแล้ว
                      </div>
                    </div>
                  )}
                  {allergies.length > 0 && (
                    <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-xl">
                      <div className="flex items-center gap-2 text-red-100 font-medium text-sm mb-1">
                        <AlertCircle size={16} />
                        แพ้ยา
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {allergies.map((allergy, i) => (
                          <span key={i} className="px-2 py-0.5 bg-red-500/30 rounded text-xs">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* Quick Actions - Mobile */}
        {/* ============================================ */}
        <div className="lg:hidden grid grid-cols-4 gap-2 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <QuickAction
            icon={<Stethoscope size={20} />}
            label="ส่งตรวจ"
            color="blue"
            onClick={() => {
              if (!patient.death) router.push(`/mr/newvisit?hn=${patient.hn}`);
            }}
            disabled={!!patient.death}
          />
          <QuickAction
            icon={<History size={20} />}
            label="ประวัติ"
            color="purple"
            onClick={() => setActiveTab('history')}
          />
          <QuickAction
            icon={<Pill size={20} />}
            label="สั่งยา"
            color="emerald"
            onClick={() => { }}
          />
          <QuickAction
            icon={<FileText size={20} />}
            label="เอกสาร"
            color="amber"
            onClick={() => setActiveTab('documents')}
          />
        </div>

        {/* ============================================ */}
        {/* Tab Navigation - Mobile */}
        {/* ============================================ */}
        <div className="lg:hidden flex bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-1">
          {[
            { id: 'info', label: 'ข้อมูล', icon: User },
            { id: 'history', label: 'ประวัติ', icon: History },
            { id: 'documents', label: 'เอกสาร', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================ */}
        {/* Main Content */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info Cards */}
          <div className={`lg:col-span-2 space-y-6 ${activeTab !== 'info' && 'hidden lg:block'}`}>
            {/* Personal Info */}
            <SectionCard title="ข้อมูลส่วนตัว" icon={<User size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <InfoItem
                  icon={<CreditCard size={18} />}
                  label="เลขบัตรประชาชน"
                  value={patient.cid ? `${patient.cid.substring(0, 1)}-${patient.cid.substring(1, 5)}-${patient.cid.substring(5, 10)}-${patient.cid.substring(10, 12)}-${patient.cid.substring(12)}` : null}
                  copyable
                />
                <InfoItem
                  icon={<Calendar size={18} />}
                  label="วันเกิด"
                  value={patient.birthday}
                />
                <InfoItem
                  icon={<Shield size={18} />}
                  label="สัญชาติ"
                  value={patient.nationalityName}
                />
                <InfoItem
                  icon={<Heart size={18} />}
                  label="ศาสนา"
                  value={patient.religionName}
                />
                <InfoItem
                  icon={<Users size={18} />}
                  label="สถานภาพ"
                  value={patient.marrystatus === '2' ? 'สมรส' : patient.marrystatus === '1' ? 'โสด' : '-'}
                />
                <InfoItem
                  icon={<FileText size={18} />}
                  label="อาชีพ"
                  value={patient.occupationName}
                />
              </div>
            </SectionCard>

            {/* Contact Info */}
            <SectionCard title="ข้อมูลติดต่อ" icon={<Phone size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <InfoItem
                  icon={<Phone size={18} />}
                  label="โทรศัพท์มือถือ"
                  value={patient.mobilePhone}
                  link={patient.mobilePhone ? `tel:${patient.mobilePhone}` : undefined}
                  copyable
                />
                <InfoItem
                  icon={<Phone size={18} />}
                  label="โทรศัพท์บ้าน"
                  value={patient.hometel}
                />
                <InfoItem
                  icon={<Mail size={18} />}
                  label="อีเมล"
                  value={patient.email}
                  link={patient.email ? `mailto:${patient.email}` : undefined}
                />
              </div>
              <div className="mt-1">
                <InfoItem
                  icon={<MapPin size={18} />}
                  label="ที่อยู่"
                  value={patient.fullAddress}
                />
              </div>
            </SectionCard>

            {/* Medical Info */}
            <SectionCard
              title="ข้อมูลทางการแพทย์"
              icon={<Activity size={18} />}
              action={
                patient.allergies.length > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium flex items-center gap-1">
                    <AlertCircle size={12} />
                    แพ้ยา
                  </span>
                )
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <InfoItem
                  icon={<Droplet size={18} />}
                  label="หมู่เลือด"
                  value={patient.bloodgrp ? `${patient.bloodgrp} (Rh${patient.bloodgroupRh})` : null}
                />
                <InfoItem
                  icon={<Shield size={18} />}
                  label="G6PD"
                  value={patient.g6pd === 'Y' ? 'พร่อง' : patient.g6pd === 'N' ? 'ปกติ' : '-'}
                />
              </div>
              {patient.allergies.length > 0 && (
                <div className="mt-3 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl">
                  <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">ประวัติแพ้ยา</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Family Info */}
            <SectionCard title="ข้อมูลครอบครัว" icon={<Users size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <InfoItem
                  icon={<User size={18} />}
                  label="บิดา"
                  value={patient.fathername}
                />
                <InfoItem
                  icon={<User size={18} />}
                  label="มารดา"
                  value={patient.mathername}
                />
                <InfoItem
                  icon={<Heart size={18} />}
                  label="คู่สมรส"
                  value={patient.spsname}
                />
              </div>
            </SectionCard>

            {/* Emergency Contact */}
            <SectionCard title="ผู้ติดต่อฉุกเฉิน" icon={<AlertCircle size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <InfoItem
                  icon={<User size={18} />}
                  label="ชื่อ"
                  value={patient.informname}
                />
                <InfoItem
                  icon={<Users size={18} />}
                  label="ความสัมพันธ์"
                  value={patient.informrelation}
                />
                <InfoItem
                  icon={<Phone size={18} />}
                  label="เบอร์โทร"
                  value={patient.informtel}
                  link={patient.informtel ? `tel:${patient.informtel}` : undefined}
                />
              </div>
            </SectionCard>
          </div>

          {/* Right Column - Actions & History */}
          <div className={`space-y-6 ${activeTab === 'info' && 'hidden lg:block'}`}>
            {/* Quick Actions - Desktop */}
            <div className="hidden lg:block">
              <SectionCard title="ดำเนินการ" icon={<Activity size={18} />}>
                <div className="grid grid-cols-2 gap-2 p-2">
                  <button
                    onClick={() => {
                      if (!patient.death) router.push(`/mr/newvisit?hn=${patient.hn}`);
                    }}
                    disabled={!!patient.death}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors shadow-sm ${patient.death
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/20 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-500/20 dark:hover:to-blue-600/30 hover:shadow-md'
                      }`}
                  >
                    <Stethoscope size={24} />
                    <span className="text-xs font-medium">ส่งตรวจ OPD</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/20 text-purple-600 dark:text-purple-400 rounded-xl hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-500/20 dark:hover:to-purple-600/30 transition-colors shadow-sm hover:shadow-md">
                    <Pill size={24} />
                    <span className="text-xs font-medium">สั่งยา</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-600/20 text-emerald-600 dark:text-emerald-400 rounded-xl hover:from-emerald-100 hover:to-emerald-200 dark:hover:from-emerald-500/20 dark:hover:to-emerald-600/30 transition-colors shadow-sm hover:shadow-md">
                    <Calendar size={24} />
                    <span className="text-xs font-medium">นัดหมาย</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-500/10 dark:to-amber-600/20 text-amber-600 dark:text-amber-400 rounded-xl hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-500/20 dark:hover:to-amber-600/30 transition-colors shadow-sm hover:shadow-md">
                    <FileText size={24} />
                    <span className="text-xs font-medium">ใบรับรอง</span>
                  </button>
                </div>
              </SectionCard>
            </div>

            {/* Visit History */}
            <div className={activeTab !== 'history' ? 'hidden lg:block' : ''}>
              <SectionCard
                title="ประวัติการมาพบแพทย์"
                icon={<History size={18} />}
                action={
                  <button
                    onClick={() => router.push(`/patients/${patient.hn}/visits`)}
                    className="text-xs text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1"
                  >
                    ดูทั้งหมด <ChevronRight size={14} />
                  </button>
                }
              >
                <div className="p-4 text-center text-slate-400">
                  <History size={32} className="mx-auto mb-2" />
                  <p className="text-sm">
                    {patient.lastVisit
                      ? `มาพบแพทย์ล่าสุด: ${patient.lastVisit}`
                      : 'ยังไม่มีประวัติการมาพบแพทย์'}
                  </p>
                </div>
              </SectionCard>
            </div>

            {/* Documents - Mobile Tab */}
            <div className={activeTab !== 'documents' ? 'hidden lg:block' : ''}>
              <SectionCard title="เอกสาร" icon={<FileText size={18} />}>
                <div className="p-4 text-center text-slate-400">
                  <FileText size={32} className="mx-auto mb-2" />
                  <p className="text-sm">ยังไม่มีเอกสาร</p>
                </div>
              </SectionCard>
            </div>

            {/* Metadata */}
            <div className="hidden lg:block text-xs text-slate-500 dark:text-slate-400 space-y-1 px-2 py-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
              <p className="flex items-center gap-2">
                <Calendar size={12} className="text-slate-400" />
                ลงทะเบียน: {patient.firstday}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={12} className="text-slate-400" />
                อัปเดตล่าสุด: {patient.lastUpdate}
              </p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* Mobile Bottom Action Bar */}
        {/* ============================================ */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 lg:hidden z-40 shadow-lg shadow-slate-900/10">
          <button
            onClick={() => router.push(`/mr/newvisit?hn=${patient.hn}`)}
            disabled={!!patient.death}
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-shadow ${patient.death
              ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40'
              }`}
          >
            <Stethoscope size={20} />
            ส่งตรวจผู้ป่วย
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}