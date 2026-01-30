'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { AdminLayout } from '@/components/layout';
import CustomSelect from '@/components/ui/CustomSelect';
import { SearchablePatientSelect } from '@/components/ui';
import { PatientListItem } from '@/types/patient.types';
import { patientApi, patientImageApi } from '@/lib/api';
import type { NhsoPersonalFund } from '@/lib/api/types/nhso';

import { SmartCardButton } from '@/components/ui/SmartCardButton';
import { SmartCardData } from '@/hooks/useSmartCardReader';
import { useOpdVisitLookups } from '@/hooks/useOpdVisitLookups';
import { NhsoLoginModal, NhsoRightsModal } from '@/components/nhso';
import { nhsoApi } from '@/lib/api/index';

// Types
interface Patient {
  hn: string;
  name: string;
  age: string;
  gender: string;
  birthDate: string;
  address: string;
  cid: string;
  phone: string;
  photo: string | null;
  bloodType?: string;
  allergies?: string[];
  lastVisit?: string;
  pttypeName?: string;
}

interface FormData {
  visitDate: string;
  visitTime: string;
  visitType: string;
  pttype: string;
  pttypeName: string;
  chiefComplaint: string;
  department: string;
  spclty: string;
  cid: string;
  patientType: string;
  timeType: string;
  urgency: string;
  patientStatus: string;
}

// Static options (ไม่มีใน database)
const patientStatusOptions = [
  { value: 'walkin', label: 'เดินมา', icon: '🚶' },
  { value: 'wheelchair', label: 'รถเข็น', icon: '🦽' },
  { value: 'stretcher', label: 'เปลนอน', icon: '🛏️' },
];

// ============================================
// Sub Components
// ============================================

// Patient Card Component (Mobile-first)
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

// Collapsible Section Component
const CollapsibleSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  badgeColor?: 'blue' | 'amber' | 'red' | 'emerald';
}> = ({ title, icon, children, defaultOpen = true, badge, badgeColor = 'blue' }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const badgeColors = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    red: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-slate-500 dark:text-slate-400">{icon}</span>
          <span className="font-medium text-slate-900 dark:text-white text-sm lg:text-base">{title}</span>
          {badge && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColors[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp size={18} className="text-slate-400" />
        ) : (
          <ChevronDown size={18} className="text-slate-400" />
        )}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

// Form Field Component
const FormField: React.FC<{
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ label, required, children, className = '' }) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

// Urgency Selector Component
const UrgencySelector: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const options = [
    { value: 'normal', label: 'ปกติ', color: 'emerald', icon: '🟢' },
    { value: 'urgent', label: 'เร่งด่วน', color: 'amber', icon: '🟡' },
    { value: 'emergency', label: 'ฉุกเฉิน', color: 'red', icon: '🔴' },
  ];

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
            flex items-center justify-center gap-2
            ${value === opt.value
              ? opt.color === 'emerald'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : opt.color === 'amber'
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }
          `}
        >
          <span>{opt.icon}</span>
          <span className="hidden sm:inline">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

// Patient Status Selector
const PatientStatusSelector: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {patientStatusOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
            flex flex-col items-center gap-1
            ${value === opt.value
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }
          `}
        >
          <span className="text-lg">{opt.icon}</span>
          <span className="text-xs">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

// ============================================
// Main Component
// ============================================
export default function OpdNewVisitResponsive() {
  const router = useRouter();

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

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchHn, setSearchHn] = useState('');
  const [selectedPatientItem, setSelectedPatientItem] = useState<PatientListItem | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lockLastVisit, setLockLastVisit] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  // Patient data
  const [patient, setPatient] = useState<Patient | null>(null);
  
  // Smart Card photo (fallback when no photo in DB)
  const [smartCardPhoto, setSmartCardPhoto] = useState<string | null>(null);

  // NHSO states
  const [showNhsoLoginModal, setShowNhsoLoginModal] = useState(false);
  const [showNhsoRightsModal, setShowNhsoRightsModal] = useState(false);
  const [nhsoLoading, setNhsoLoading] = useState(false);
  const [nhsoError, setNhsoError] = useState<string | null>(null);
  const [nhsoRights, setNhsoRights] = useState<NhsoPersonalFund | null>(null);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    visitDate: new Date().toISOString().split('T')[0],
    visitTime: '',
    visitType: '',
    pttype: '',
    pttypeName: '',
    chiefComplaint: '',
    department: '',
    spclty: '',
    cid: '',
    patientType: 'general',
    timeType: 'intime',
    urgency: 'normal',
    patientStatus: 'walkin',
  });

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
  }, [visitTypeOptions, formData.visitType]);

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
  }, [pttypeOptions, formData.pttype]);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle patient selection from search
  const handlePatientSelect = async (
    hn: string, 
    patientItem: PatientListItem | null,
    cardPhoto?: string | null
  ) => {
    setSearchHn(hn);
    setSelectedPatientItem(patientItem);

    // Store smart card photo for fallback
    if (cardPhoto) {
      setSmartCardPhoto(cardPhoto);
    }

    if (!hn || !patientItem) {
      setPatient(null);
      return;
    }

    setLoading(true);
    try {
      // Fetch full patient details and image in parallel
      const [detailResponse, imageData] = await Promise.all([
        patientApi.getByHn(hn),
        patientImageApi.getProfileImage(hn).catch(() => null),
      ]);

      if (detailResponse.success && detailResponse.data) {
        const detail = detailResponse.data;

        // Build photo URL or base64 data
        // Priority: DB image > Smart Card image > null
        let photoUrl: string | null = null;
        if (imageData?.image) {
          // Image from database (base64 encoded)
          photoUrl = imageData.image.startsWith('data:')
            ? imageData.image
            : `data:image/jpeg;base64,${imageData.image}`;
        } else if (cardPhoto) {
          // Fallback to Smart Card photo
          photoUrl = cardPhoto.startsWith('data:')
            ? cardPhoto
            : `data:image/jpeg;base64,${cardPhoto}`;
        }

        setPatient({
          hn: detail.hn,
          name: detail.fullName,
          gender: String(detail.sex) === '1' ? 'ชาย' : String(detail.sex) === '2' ? 'หญิง' : '-',
          age: detail.ageText || `${detail.age || 0} ปี`,
          birthDate: detail.birthday || '',
          address: detail.fullAddress || '',
          cid: detail.cid ? detail.cid.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5') : '',
          phone: detail.mobilePhone || detail.hometel || '',
          photo: photoUrl,
          bloodType: detail.bloodgrp ? `${detail.bloodgrp}${detail.bloodgroupRh || ''}` : undefined,
          allergies: detail.allergies || [],
          lastVisit: detail.lastVisit || undefined,
          pttypeName: detail.pttypeName,
        });

        // Update form with patient's pttype
        const patientPttype = pttypeOptions.find(p => p.value === detail.pttype);
        setFormData((prev) => ({
          ...prev,
          cid: detail.cid || '',
          pttype: detail.pttype || prev.pttype,
          pttypeName: patientPttype?.label.split(' - ')[1] || detail.pttypeName || prev.pttypeName,
        }));
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!patient) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    // Show success & redirect
  };

  const handleClear = () => {
    setPatient(null);
    setSearchHn('');
    setSelectedPatientItem(null);
    setSmartCardPhoto(null);

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

  const handleNewPatientFromCard = (cardData: SmartCardData) => {
    router.push(`/patients/register?cid=${cardData.cid}`);
  };

  // ==========================================
  // NHSO Functions
  // ==========================================
  
  /**
   * Get clean CID (remove dashes)
   */
  const getCleanCid = (): string => {
    const cid = formData.cid || patient?.cid || '';
    return cid.replace(/-/g, '');
  };

  /**
   * Check if NHSO button should be enabled
   */
  const canCheckNhso = (): boolean => {
    const cleanCid = getCleanCid();
    return cleanCid.length === 13 && !!patient;
  };

  /**
   * Handle NHSO button click
   */
  const handleNHSO = async () => {
    const cleanCid = getCleanCid();
    
    if (!cleanCid || cleanCid.length !== 13) {
      return;
    }

    // Check if we have a valid token
    const tokenStatus = await nhsoApi.getTokenStatus();
    
    if (!tokenStatus.success || tokenStatus.data?.needsRelogin) {
      // No token or expired - show login modal
      setShowNhsoLoginModal(true);
    } else {
      // Have valid token - search directly
      await searchNhsoRights(cleanCid);
    }
  };

  /**
   * Handle successful NHSO login
   */
  const handleNhsoLoginSuccess = async (username: string) => {
    const cleanCid = getCleanCid();
    if (cleanCid) {
      await searchNhsoRights(cleanCid);
    }
  };

  /**
   * Search NHSO rights by CID
   */
  const searchNhsoRights = async (cid: string) => {
    setShowNhsoRightsModal(true);
    setNhsoLoading(true);
    setNhsoError(null);
    setNhsoRights(null);

    try {
      const result = await nhsoApi.searchByPid(cid);

      if (result.success && result.data) {
        setNhsoRights(result.data);
      } else {
        setNhsoError(result.message || 'ไม่สามารถตรวจสอบสิทธิ์ได้');
      }
    } catch (err) {
      setNhsoError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการตรวจสอบ');
    } finally {
      setNhsoLoading(false);
    }
  };

  /**
   * Retry NHSO search
   */
  const handleNhsoRetry = () => {
    const cleanCid = getCleanCid();
    if (cleanCid) {
      searchNhsoRights(cleanCid);
    }
  };

  /**
   * Apply NHSO rights to form
   */
  const handleApplyNhsoRights = (rights: NhsoPersonalFund) => {
    // Map NHSO rights to pttype if possible
    // This mapping depends on your hospital's pttype configuration
    const nhsoToPttypeMap: Record<string, string> = {
      'UCS': 'T1',    // บัตรทอง
      'OFC': 'A7',    // ข้าราชการ  
      'SSS': 'B1',    // ประกันสังคม
      'LGO': 'A1',    // อปท.
      // Add more mappings as needed
    };

    const mappedPttype = rights.mainInscl ? nhsoToPttypeMap[rights.mainInscl] : null;
    
    if (mappedPttype) {
      const pttypeOption = pttypeOptions.find(p => p.value === mappedPttype);
      if (pttypeOption) {
        setFormData(prev => ({
          ...prev,
          pttype: mappedPttype,
          pttypeName: pttypeOption.label.split(' - ')[1] || pttypeOption.label,
        }));
      }
    }

    // Close modal
    setShowNhsoRightsModal(false);
  };
  

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
              <div className="flex items-center gap-2">
                {/* Patient Search - Full width on mobile */}
                <div className="flex-1 min-w-0">
                  <SearchablePatientSelect
                    value={searchHn}
                    onChange={handlePatientSelect}
                    placeholder="ค้นหา HN, ชื่อ, เลขบัตร..."
                    disabled={loading}
                    initialPatient={selectedPatientItem}
                    limit={20}
                    className="w-full"
                  />
                </div>

                {/* Action Buttons - Compact on mobile */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* QR Code Button */}
                  <button
                    className="
                      size-11 rounded-xl flex items-center justify-center
                      bg-slate-100 dark:bg-slate-800 
                      text-slate-600 dark:text-slate-400 
                      hover:bg-slate-200 dark:hover:bg-slate-700 
                      active:scale-95 transition-all
                    "
                    title="สแกน QR Code"
                  >
                    <QrCode size={20} />
                  </button>

                  {/* Smart Card Button */}
                  <SmartCardButton
                    onPatientFound={handlePatientSelect}
                    onNewPatient={handleNewPatientFromCard}
                    onError={(err) => console.error(err)}
                    disabled={loading}
                    serverUrl={process.env.NEXT_PUBLIC_WS_URL}
                    className="size-11"
                  />
                </div>
              </div>

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
        <div className="mt-4 lg:mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

            {/* ============================================ */}
            {/* Left Column - Patient Card (Mobile: Top) */}
            {/* ============================================ */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="lg:sticky lg:top-6 space-y-4">
                <PatientCard patient={patient} loading={loading} />

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
                          {[
                            { value: 'normal', label: 'ปกติ', icon: '●', color: 'emerald' },
                            { value: 'urgent', label: 'เร่งด่วน', icon: '●', color: 'amber' },
                            { value: 'emergency', label: 'ฉุกเฉิน', icon: '●', color: 'red' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setFormData({ ...formData, urgency: opt.value })}
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
                          {patientStatusOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setFormData({ ...formData, patientStatus: opt.value })}
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
                            <button
                              onClick={() => setFormData({ ...formData, timeType: 'intime' })}
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
                              onClick={() => setFormData({ ...formData, timeType: 'outtime' })}
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
                        value={formData.visitType}
                        readOnly
                        className="w-16 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center font-mono"
                      />
                      <div className="flex-1">
                        <CustomSelect
                          options={visitTypeOptions}
                          value={formData.visitType}
                          dropdownTitle='เลือกประเภทการมา'
                          showBackdrop={true}
                          onChange={(val) => setFormData({ ...formData, visitType: val })}
                        />
                      </div>
                    </div>
                  </FormField>

                  {/* Rights */}
                  <FormField label="สิทธิการรักษา" required>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={formData.pttype}
                        readOnly
                        className="w-full sm:w-16 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center font-mono"
                      />
                      <div className="flex-1">
                        <CustomSelect
                          options={pttypeOptions}
                          value={formData.pttype}
                          onChange={(val) => {
                            const selected = pttypeOptions.find((o) => o.value === val);
                            setFormData({
                              ...formData,
                              pttype: val,
                              pttypeName: selected?.label.split(' - ')[1] || '',
                            });
                          }}
                        />
                      </div>
                      <button
                        onClick={handleNHSO}
                        disabled={!canCheckNhso()}
                        className={`
                          px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap
                          transition-all duration-200 flex items-center gap-2
                          ${canCheckNhso()
                            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                          }
                        `}
                        title={!canCheckNhso() ? 'กรุณาเลือกผู้ป่วยที่มีเลขบัตรประชาชนก่อน' : 'ตรวจสอบสิทธิ์ สปสช.'}
                      >
                        <Shield size={16} />
                        NHSO
                      </button>
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
                    value={formData.chiefComplaint}
                    onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                    placeholder="ระบุอาการสำคัญที่นำผู้ป่วยมาพบแพทย์..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                  />
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
                        value={formData.department ? formData.department.substring(0, 3) : '###'}
                        readOnly
                        className="w-16 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center font-mono"
                      />
                      <div className="flex-1">
                        <CustomSelect
                          options={departmentOptions}
                          value={formData.department}
                          showBackdrop={true}
                          dropdownTitle="เลือกห้องตรวจ"
                          onChange={(val) => setFormData({ ...formData, department: val })}
                          placeholder="เลือกห้องตรวจ..."
                        />
                      </div>
                    </div>
                  </FormField>

                  {/* Specialty */}
                  <FormField label="แผนก" required>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.spclty ? formData.spclty.substring(0, 3) : '###'}
                        readOnly
                        className="w-16 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center font-mono"
                      />
                      <div className="flex-1">
                        <CustomSelect
                          options={spcltyOptions}
                          value={formData.spclty}
                          showBackdrop={true}
                          dropdownTitle="เลือกแผนก"
                          onChange={(val) => setFormData({ ...formData, spclty: val })}
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
                  onClick={handleClear}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  ล้างข้อมูล
                </button>
                <button
                  onClick={handleSave}
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
              onClick={handleClear}
              className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl transition-colors"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={handleSave}
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
      </div>

      {/* ============================================ */}
      {/* NHSO Modals */}
      {/* ============================================ */}
      
      {/* Login Modal */}
      <NhsoLoginModal
        isOpen={showNhsoLoginModal}
        onClose={() => setShowNhsoLoginModal(false)}
        onSuccess={handleNhsoLoginSuccess}
      />

      {/* Rights Result Modal */}
      <NhsoRightsModal
        isOpen={showNhsoRightsModal}
        onClose={() => setShowNhsoRightsModal(false)}
        isLoading={nhsoLoading}
        error={nhsoError}
        rights={nhsoRights}
        patientName={patient?.name}
        patientCid={patient?.cid}
        onRetry={handleNhsoRetry}
        onApplyRights={handleApplyNhsoRights}
      />
    </AdminLayout>
  );
}