// src/components/nhso/NhsoRightsModal.tsx
'use client';

import { useState } from 'react';
import { 
  X, 
  Shield, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  Calendar,
  User,
  RefreshCw,
  Copy,
  Check,
  Clock,
  XCircle,
} from 'lucide-react';
import type { NhsoPersonalFund } from '@/lib/api/types/nhso';

interface NhsoRightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
  rights: NhsoPersonalFund | null;
  patientName?: string;
  patientCid?: string;
  onRetry?: () => void;
  onApplyRights?: (rights: NhsoPersonalFund) => void;
}

// Helper functions
const safeString = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (obj.rightName) return String(obj.rightName);
    if (obj.insclName) return String(obj.insclName);
    if (obj.hname) return String(obj.hname);
    if (obj.name) return String(obj.name);
    if (obj.codeWithName) return String(obj.codeWithName);
    if (obj.statusDesc) return String(obj.statusDesc);
    return '';
  }
  return String(value);
};

const safeCode = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (obj.rightId) return String(obj.rightId);
    if (obj.inscl) return String(obj.inscl);
    if (obj.hcode) return String(obj.hcode);
    if (obj.code) return String(obj.code);
    return '';
  }
  return String(value);
};

type RightType = 'UCS' | 'SSS' | 'OFC' | 'OTHER';

const getRightType = (rights: NhsoPersonalFund | null): RightType => {
  if (!rights) return 'OTHER';
  const r = rights as Record<string, unknown>;
  const mainInscl = r.mainInscl as Record<string, unknown> | undefined;
  const rightId = mainInscl?.rightId as string | undefined;
  
  if (rightId === 'UCS') return 'UCS';
  if (rightId?.startsWith('S') || rightId === 'SSS') return 'SSS';
  if (rightId === 'OFC') return 'OFC';
  return 'OTHER';
};

const getRightTypeInfo = (rightType: RightType) => {
  switch (rightType) {
    case 'UCS':
      return { 
        label: 'บัตรทอง', 
        bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
        borderColor: 'border-emerald-200 dark:border-emerald-500/30',
        textColor: 'text-emerald-700 dark:text-emerald-400',
        badgeColor: 'bg-emerald-500',
        buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
      };
    case 'SSS':
      return { 
        label: 'ประกันสังคม', 
        bgColor: 'bg-blue-50 dark:bg-blue-500/10',
        borderColor: 'border-blue-200 dark:border-blue-500/30',
        textColor: 'text-blue-700 dark:text-blue-400',
        badgeColor: 'bg-blue-500',
        buttonColor: 'bg-blue-500 hover:bg-blue-600',
      };
    case 'OFC':
      return { 
        label: 'ข้าราชการ', 
        bgColor: 'bg-amber-50 dark:bg-amber-500/10',
        borderColor: 'border-amber-200 dark:border-amber-500/30',
        textColor: 'text-amber-700 dark:text-amber-400',
        badgeColor: 'bg-amber-500',
        buttonColor: 'bg-amber-500 hover:bg-amber-600',
      };
    default:
      return { 
        label: 'อื่นๆ', 
        bgColor: 'bg-slate-50 dark:bg-slate-500/10',
        borderColor: 'border-slate-200 dark:border-slate-500/30',
        textColor: 'text-slate-700 dark:text-slate-400',
        badgeColor: 'bg-slate-500',
        buttonColor: 'bg-slate-500 hover:bg-slate-600',
      };
  }
};

export function NhsoRightsModal({ 
  isOpen, 
  onClose, 
  isLoading, 
  error, 
  rights,
  patientName,
  patientCid,
  onRetry,
  onApplyRights,
}: NhsoRightsModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!isOpen) return null;

  const formatDate = (dateStr?: unknown) => {
    const str = safeString(dateStr);
    if (!str) return '-';
    try {
      return new Date(str).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return str;
    }
  };

  const rightType = getRightType(rights);
  const rightTypeInfo = getRightTypeInfo(rightType);
  const r = rights as Record<string, unknown> | null;

  // Extract data
  const mainRight = {
    name: safeString(r?.mainInscl) || '-',
    code: safeCode(r?.mainInscl),
  };

  const subRight = {
    name: safeString(r?.subInscl) || '',
    code: safeCode(r?.subInscl),
  };

  const personData = r?.personData as Record<string, unknown> | undefined;
  const age = personData?.age as { years?: number } | undefined;

  // Hospitals
  const hospMain = r?.hospMain as Record<string, unknown> | undefined;
  const hospSub = r?.hospSub as Record<string, unknown> | undefined;

  // Status
  const isActive = r?.flag === '0' || r?.flag === 0 || r?.fundFlag === '1' || r?.fundFlag === 1;
  const fundStatus = r?.fundStatus as Record<string, unknown> | undefined;
  const statusText = fundStatus ? safeString(fundStatus) : '';

  // Dates
  const startDate = r?.startDateTime || r?.startDate;
  const expireDate = r?.expireDateTime || r?.expireDate;
  const searchDate = r?.searchDate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className={`
          relative px-6 py-5 text-white shrink-0
          ${error 
            ? 'bg-gradient-to-r from-red-500 to-red-600' 
            : isActive 
              ? rightType === 'UCS' 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                : rightType === 'SSS'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                  : rightType === 'OFC'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                    : 'bg-gradient-to-r from-slate-500 to-slate-600'
              : 'bg-gradient-to-r from-slate-500 to-slate-600'
          }
        `}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          {/* Icon & Title */}
          <div className="flex items-center gap-4">
            <div className="size-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : error ? (
                <XCircle size={24} />
              ) : isActive ? (
                <CheckCircle2 size={24} />
              ) : (
                <Shield size={24} />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isLoading 
                  ? 'กำลังตรวจสอบสิทธิ์...' 
                  : error 
                    ? 'ไม่สามารถตรวจสอบได้'
                    : isActive
                      ? 'ตรวจสอบสิทธิ์สำเร็จ'
                      : 'ผลการตรวจสอบสิทธิ์'
                }
              </h2>
              <p className="text-white/80 text-sm">สำนักงานหลักประกันสุขภาพแห่งชาติ (สปสช.)</p>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Loading State */}
          {isLoading && (
            <div className="py-12 text-center">
              <Loader2 size={48} className="animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">กำลังตรวจสอบสิทธิ์การรักษา...</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">กรุณารอสักครู่</p>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="py-8">
              <div className="flex flex-col items-center text-center">
                <div className="size-16 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={32} className="text-red-500" />
                </div>
                <p className="text-red-600 dark:text-red-400 font-medium mb-2">เกิดข้อผิดพลาด</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{error}</p>
                
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    ลองใหม่อีกครั้ง
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Success State - Rights Data */}
          {!isLoading && !error && rights && (
            <div className="space-y-4">
              {/* Patient Info */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="size-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <User size={20} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white truncate">
                    {safeString(personData?.fullName) || patientName || '-'}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-mono">{safeString(personData?.pid) || patientCid || '-'}</span>
                    {safeString(personData?.sexDesc) && (
                      <>
                        <span>•</span>
                        <span>{safeString(personData?.sexDesc)}</span>
                      </>
                    )}
                    {age?.years && (
                      <>
                        <span>•</span>
                        <span>{age.years} ปี</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Rights Card */}
              <div className={`p-4 rounded-xl border-2 ${rightTypeInfo.bgColor} ${rightTypeInfo.borderColor}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 ${rightTypeInfo.badgeColor} text-white text-xs font-bold rounded-full`}>
                        {rightTypeInfo.label}
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${rightTypeInfo.textColor}`}>
                      {mainRight.name}
                    </p>
                    {mainRight.code && (
                      <p className="text-xs text-slate-400 font-mono mt-0.5">รหัส: {mainRight.code}</p>
                    )}
                  </div>
                  
                  {/* Status Badge - Pill style */}
                  <span className={`
                    shrink-0 px-3 py-1.5 rounded-full text-xs font-bold
                    ${isActive 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-red-500 text-white'
                    }
                  `}>
                    {isActive ? 'ใช้งานได้' : 'ไม่พร้อมใช้'}
                  </span>
                </div>

                {/* Sub Right */}
                {subRight.name && (
                  <div className="pt-3 border-t border-slate-200/50 dark:border-slate-600/30">
                    <p className="text-xs text-slate-500 dark:text-slate-400">สิทธิย่อย</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {subRight.name}
                    </p>
                  </div>
                )}

                {/* Status Description */}
                {statusText && (
                  <div className="pt-3 border-t border-slate-200/50 dark:border-slate-600/30">
                    <p className="text-xs text-slate-500 dark:text-slate-400">สถานะ</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{statusText}</p>
                  </div>
                )}
              </div>

              {/* Hospitals Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Building2 size={16} />
                  สถานบริการ
                </h4>

                {/* UCS: Grid 2 columns for หลัก + รอง */}
                {rightType === 'UCS' && (hospMain || hospSub) && (
                  <div className="grid grid-cols-2 gap-3">
                    {/* หน่วยบริการหลัก */}
                    {hospMain && (() => {
                      const mainName = safeString(hospMain);
                      const mainCode = safeCode(hospMain);
                      return (
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">หลัก</p>
                            {mainCode && (
                              <button
                                onClick={() => handleCopy(mainCode, 'hospMain')}
                                className="p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded transition-colors"
                              >
                                {copiedField === 'hospMain' ? <Check size={12} /> : <Copy size={12} />}
                              </button>
                            )}
                          </div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {mainName}
                          </p>
                          {mainCode && (
                            <p className="text-xs text-slate-400 font-mono">{mainCode}</p>
                          )}
                        </div>
                      );
                    })()}

                    {/* หน่วยบริการรอง */}
                    {hospSub && (() => {
                      const subName = safeString(hospSub);
                      const subCode = safeCode(hospSub);
                      return (
                        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">รอง</p>
                            {subCode && (
                              <button
                                onClick={() => handleCopy(subCode, 'hospSub')}
                                className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded transition-colors"
                              >
                                {copiedField === 'hospSub' ? <Check size={12} /> : <Copy size={12} />}
                              </button>
                            )}
                          </div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {subName}
                          </p>
                          {subCode && (
                            <p className="text-xs text-slate-400 font-mono">{subCode}</p>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* SSS: Only main hospital */}
                {rightType === 'SSS' && hospMain && (() => {
                  const mainName = safeString(hospMain);
                  const mainCode = safeCode(hospMain);
                  return (
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20">
                      <div className="size-9 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 size={18} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">สถานพยาบาลหลัก</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {mainName}
                        </p>
                        {mainCode && (
                          <p className="text-xs text-slate-400 font-mono">รหัส: {mainCode}</p>
                        )}
                      </div>
                      {mainCode && (
                        <button
                          onClick={() => handleCopy(mainCode, 'hospMain')}
                          className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
                        >
                          {copiedField === 'hospMain' ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* OFC: Department */}
                {rightType === 'OFC' && r?.departmentName && (() => {
                  const deptName = safeString(r.departmentName);
                  const deptCode = safeString(r.departmentCode);
                  return (
                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-200 dark:border-amber-500/20">
                      <div className="size-9 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 size={18} className="text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">หน่วยงานต้นสังกัด</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {deptName}
                        </p>
                        {deptCode && (
                          <p className="text-xs text-slate-400 font-mono">รหัส: {deptCode}</p>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* OTHER: show any available hospital */}
                {rightType === 'OTHER' && hospMain && (() => {
                  const mainName = safeString(hospMain);
                  const mainCode = safeCode(hospMain);
                  return (
                    <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="size-9 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 size={18} className="text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400">หน่วยบริการหลัก</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {mainName}
                        </p>
                        {mainCode && (
                          <p className="text-xs text-slate-400 font-mono">รหัส: {mainCode}</p>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar size={14} />
                    <span className="text-xs">วันที่เริ่มสิทธิ์</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {formatDate(startDate)}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                    <Clock size={14} />
                    <span className="text-xs">วันที่หมดอายุ</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {formatDate(expireDate)}
                  </p>
                </div>
              </div>

              {/* Search Date */}
              {searchDate && (
                <div className="text-center text-xs text-slate-400">
                  ตรวจสอบเมื่อ: {formatDate(searchDate)}
                </div>
              )}
            </div>
          )}

          {/* No Rights Found */}
          {!isLoading && !error && !rights && (
            <div className="py-8 text-center">
              <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400">ไม่พบข้อมูลสิทธิ์การรักษา</p>
            </div>
          )}
        </div>

        {/* Sticky Bottom Buttons */}
        {!isLoading && !error && rights && (
          <div className="shrink-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                ปิด
              </button>
              {onApplyRights && isActive && (
                <button
                  onClick={() => onApplyRights(rights)}
                  className={`flex-1 px-4 py-3 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${rightTypeInfo.buttonColor}`}
                >
                  <CheckCircle2 size={18} />
                  ใช้สิทธิ์นี้
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NhsoRightsModal;