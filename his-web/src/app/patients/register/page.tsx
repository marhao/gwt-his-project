// =============================================================================
// File: src/app/patients/[hn]/edit/page.tsx
// Description: Patient Edit Page - Clean Minimal Design (Original Style)
// =============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  X,
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
  Camera,
  Plus,
  ChevronDown,
  ChevronUp,
  Check,
  Loader2,
  Info,
  FileText,
  RefreshCw,
} from 'lucide-react';
import { usePatientDetail } from '@/hooks';
import { usePatientImageManager } from '@/hooks/usePatientImages';
import {
  PatientDetail,
  PatientFormData,
  PNAME_OPTIONS,
  SEX_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  BLOOD_RH_OPTIONS,
  MARRY_STATUS_OPTIONS,
} from '@/lib/types/patient';
import { formatCid } from '@/lib/utils/string-format';
import { formatSmartCard2DbDate } from '@/lib/utils/date-time';
import { PatientImageUpload } from '@/components/ui/patient-image';
import { AdminLayout } from '@/components/layout';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';
import CustomSelect from '@/components/ui/CustomSelect';
import DatePicker from '@/components/ui/date-picker';
import FormField from '@/components/ui/forms/FormField';
import { useSmartCardReader, SmartCardData } from '@/hooks/useSmartCardReader';

// ============================================
// Mock Data
// ============================================
const mockPatient: PatientDetail = {
  hn: '0001234',
  pname: 'นาย',
  fname: 'สมชาย',
  lname: 'ใจดี',
  midname: null,
  fullName: 'นายสมชาย ใจดี',
  sex: 'M',
  birthday: '1979-05-15',
  age: 45,
  ageText: '45 ปี 7 เดือน',
  cid: '1234567890123',
  mobilePhone: '0812345678',
  hometel: '044123456',
  email: 'somchai@email.com',
  addrpart: '123/45',
  moopart: '6',
  road: 'มิตรภาพ',
  tmbpart: '01',
  amppart: '01',
  chwpart: '30',
  poCode: '30000',
  fullAddress: '123/45 หมู่ 6 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000',
  tmbName: 'ในเมือง',
  ampName: 'เมืองนครราชสีมา',
  chwName: 'นครราชสีมา',
  bloodgrp: 'O',
  bloodgroupRh: '+',
  drugallergy: 'Penicillin, Aspirin',
  allergies: ['Penicillin', 'Aspirin'],
  g6pd: 'N',
  pttype: 'UCS',
  pttypeName: 'บัตรทอง 30 บาท',
  lastVisit: '2024-12-15',
  firstday: '2018-03-20',
  death: 'N',
  deathday: null,
  fathername: 'นายสมศักดิ์ ใจดี',
  mathername: 'นางสมหญิง ใจดี',
  spsname: 'นางวิไล ใจดี',
  marrystatus: '2',
  informname: 'นางวิไล ใจดี',
  informtel: '0898765432',
  informrelation: 'คู่สมรส',
  nationality: 'TH',
  nationalityName: 'ไทย',
  religion: '01',
  religionName: 'พุทธ',
  occupation: '001',
  occupationName: 'รับราชการ',
  passportNo: null,
  lastUpdate: '2024-12-15 14:30:00',
  photo: null,
};

// Options
const provinceOptions = [
  { value: '30', label: 'นครราชสีมา' },
  { value: '10', label: 'กรุงเทพมหานคร' },
  { value: '40', label: 'ขอนแก่น' },
];

const pttypeOptions = [
  { value: '10', label: '10 - ชำระเงินเอง' },
  { value: 'UCS', label: 'UCS - บัตรทอง 30 บาท' },
  { value: 'OFC', label: 'OFC - ข้าราชการ' },
  { value: 'SSS', label: 'SSS - ประกันสังคม' },
  { value: 'LGO', label: 'LGO - อปท.' },
];

const religionOptions = [
  { value: '01', label: 'พุทธ' },
  { value: '02', label: 'อิสลาม' },
  { value: '03', label: 'คริสต์' },
  { value: '04', label: 'ฮินดู' },
  { value: '09', label: 'อื่นๆ' },
];

const nationalityOptions = [
  { value: 'TH', label: 'ไทย' },
  { value: 'MM', label: 'เมียนมา' },
  { value: 'LA', label: 'ลาว' },
  { value: 'KH', label: 'กัมพูชา' },
  { value: 'OT', label: 'อื่นๆ' },
];

const relationOptions = [
  { value: 'spouse', label: 'คู่สมรส' },
  { value: 'parent', label: 'บิดา/มารดา' },
  { value: 'child', label: 'บุตร' },
  { value: 'sibling', label: 'พี่น้อง' },
  { value: 'relative', label: 'ญาติ' },
  { value: 'friend', label: 'เพื่อน' },
  { value: 'other', label: 'อื่นๆ' },
];

// ============================================
// Sub Components
// ============================================

// Form Section Component
interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  children,
  collapsible = true,
  defaultOpen = true,
  badge,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => collapsible && setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 ${collapsible ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800' : 'cursor-default'} transition-colors`}
      >
        <div className="flex items-center gap-3">
          <span className="text-slate-500 dark:text-slate-400">{icon}</span>
          <span className="font-semibold text-slate-900 dark:text-white text-sm">{title}</span>
          {badge}
        </div>
        {collapsible && (
          isOpen ? (
            <ChevronUp size={18} className="text-slate-400" />
          ) : (
            <ChevronDown size={18} className="text-slate-400" />
          )
        )}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => (
  <input
    {...props}
    className={`
      w-full px-4 py-2.5 
      bg-slate-50 dark:bg-slate-800 
      border rounded-xl text-sm
      focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
      transition-colors
      ${error 
        ? 'border-red-300 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20' 
        : 'border-slate-200 dark:border-slate-700'
      }
      ${props.disabled ? 'opacity-60 cursor-not-allowed' : ''}
      ${className}
    `}
  />
);

// Allergy Input Component
const AllergyInput: React.FC<{
  allergies: string[];
  onChange: (allergies: string[]) => void;
}> = ({ allergies, onChange }) => {
  const [newAllergy, setNewAllergy] = useState('');

  const handleAdd = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      onChange([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  const handleRemove = (allergy: string) => {
    onChange(allergies.filter((a) => a !== allergy));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="text"
          value={newAllergy}
          onChange={(e) => setNewAllergy(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder="พิมพ์ชื่อยาที่แพ้..."
          className="flex-1"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newAllergy.trim()}
          className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
      
      {allergies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy) => (
            <span
              key={allergy}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg text-sm"
            >
              <AlertCircle size={14} />
              {allergy}
              <button
                type="button"
                onClick={() => handleRemove(allergy)}
                className="ml-1 hover:text-red-900 dark:hover:text-red-100"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
      
      {allergies.length === 0 && (
        <p className="text-sm text-slate-400 italic">ไม่มีประวัติแพ้ยา</p>
      )}
    </div>
  );
};

// ============================================
// Main Component
// ============================================
export default function PatientNewPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams()
  const hn = params.hn as string;
  const isNew = true; //TODO: hn === 'new';

  // Load patient data from API
  const { patient, loading: patientLoading, error: patientError, refresh } = usePatientDetail(isNew ? null : hn);
  
  // Load patient image
  const {
    primaryImage,
    loading: imageLoading,
    upload: uploadImage,
    uploading,
  } = usePatientImageManager(isNew ? null : hn);

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [initialized, setInitialized] = useState(false);
  /** ======================= Smart card reader props ======================= */
  const [isSearching, setIsSearching] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form data
  const [formData, setFormData] = useState<PatientFormData>({
    pname: '',
    fname: '',
    lname: '',
    sex: 'M',
    birthday: '',
    cid: '',
    mobilePhone: '',
    hometel: '',
    email: '',
    addrpart: '',
    moopart: '',
    road: '',
    tmbpart: '',
    amppart: '',
    chwpart: '',
    poCode: '',
    bloodgrp: '',
    bloodgroupRh: '',
    drugallergy: '',
    g6pd: '',
    pttype: '',
    nationality: 'TH',
    religion: '',
    occupation: '',
    marrystatus: '',
    fathername: '',
    mathername: '',
    spsname: '',
    informname: '',
    informtel: '',
    informrelation: '',
  });

  const [allergies, setAllergies] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [localImageChanged, setLocalImageChanged] = useState(false);

  // Discard changes dialog
  const discardDialog = useConfirmDialog({
    onConfirm: async () => {
      router.back();
    },
  });

  // Load patient data from API response
  useEffect(() => {
    if (isNew || !patient || initialized) return;

    setFormData({
      pname: patient.pname || '',
      fname: patient.fname || '',
      lname: patient.lname || '',
      sex: (patient.sex as 'M' | 'F') || 'M',
      birthday: patient.birthday || '',
      cid: patient.cid || '',
      mobilePhone: patient.mobilePhone || '',
      hometel: patient.hometel || '',
      email: patient.email || '',
      addrpart: patient.addrpart || '',
      moopart: patient.moopart || '',
      road: patient.road || '',
      tmbpart: patient.tmbpart || '',
      amppart: patient.amppart || '',
      chwpart: patient.chwpart || '',
      poCode: patient.poCode || '',
      bloodgrp: patient.bloodgrp || '',
      bloodgroupRh: patient.bloodgroupRh || '',
      drugallergy: patient.drugallergy || '',
      g6pd: patient.g6pd || '',
      pttype: patient.pttype || '',
      nationality: patient.nationality || 'TH',
      religion: patient.religion || '',
      occupation: patient.occupation || '',
      marrystatus: patient.marrystatus || '',
      fathername: patient.fathername || '',
      mathername: patient.mathername || '',
      spsname: patient.spsname || '',
      informname: patient.informname || '',
      informtel: patient.informtel || '',
      informrelation: patient.informrelation || '',
    });
    setAllergies(patient.allergies || []);
    setInitialized(true);
  }, [isNew, patient, initialized]);

  // Update photo when primaryImage changes (from API)
  useEffect(() => {
    if (!localImageChanged && primaryImage) {
      setPhoto(primaryImage);
    }
  }, [primaryImage, localImageChanged]);

  /** ======================= Smart card reader actions ======================= */
  const {
    isConnected,
    isReading,
    cardData,
    error,
    readerStatus,
    connect,
    disconnect,
    readCard,
    clearCardData
  } = useSmartCardReader({
    serverUrl: process.env.NEXT_PUBLIC_WS_URL,
    autoConnect: false,
    onCardRead: handleCardRead,
    onError: (err) => {
      setStatusMessage(err);
    },
    onConnect: () => {
      setStatusMessage('เชื่อมต่อเครื่องอ่านบัตรแล้ว - รอเสียบบัตร');
    },
    onDisconnect: () => {
      setStatusMessage('ยกเลิกการเชื่อมต่อแล้ว');
    },
  });

  useEffect(() => {
    const readDataFromCard = async () => {
      if (isReading || isSearching) return;

      /** ตรวจสอบการเชื่อมต่อเครื่องอ่านบัตร */
      if (!isConnected) {
        console.log('กำลังเชื่อมต่อเครื่องอ่านบัตร...');
        /** หากยังไม่ได้เชื่อมต่อให้ทำการเชื่อมต่อ */
        connect();
      } else if (cardData) {
        console.log(`กำลังค้นหาผู้ป่วย CID: ${cardData.cid_formatted || formatCid(cardData.cid)}...`);
        /** ถ้าเสียบบัตรแล้ว ให้ทำการค้นหาผู้ป่วยจากฐานข้อมูล หรือ ใส่ข้อมูลจากบัตรให้ formData state */
        handleCardRead(cardData);
      } else {
        console.log('รอเสียบบัตรประชาชน...');
        /** ถ้าเชื่อมต่อแล้ว แต่ไม่ได้เสียบบัตรให้แจ้งเตือนและรอเสียบบัตร TODO: แจ้งเตือน */
        // 
      }
    };

    if (searchParams.get('cid')) {
      readDataFromCard();
    }
  }, [searchParams]);

  /** Handle if card is been reading */
  async function handleCardRead(data: SmartCardData) {
    if (!data.cid) {
      const errMsg = 'ไม่พบเลขบัตรประชาชนในข้อมูลบัตร';
      setStatusMessage(errMsg);
      return;
    }

    setIsSearching(true);
    setStatusMessage(`กำลังค้นหาผู้ป่วย CID: ${data.cid_formatted || formatCid(data.cid)}...`);

    try {
      if (searchParams.get('cid') === '') { // กรณีกดอ่านบัตร Smart card ที่หน้านี้
          /** ถ้ามีข้อมูลในฐานข้อมูล */
          
      } else { // กรณีอ่านบัตร Smart card จากหน้าส่งตรวจ
        setFormData({
          pname: data?.name_th.prefix || '',
          fname: data?.name_th.firstname || '',
          lname: data?.name_th.lastname || '',
          sex: data?.gender === "1" ? 'M' : 'F',
          birthday: data?.dob ? formatSmartCard2DbDate(data?.dob!) : '',
          cid: data?.cid || '',
          mobilePhone: '',
          hometel: '',
          email: '',
          addrpart: '',
          moopart: '',
          road: '',
          tmbpart: '',
          amppart: '',
          chwpart: '',
          poCode: '',
          bloodgrp: '',
          bloodgroupRh: '',
          drugallergy: '',
          g6pd: '',
          pttype: '',
          nationality: 'TH',
          religion: '',
          occupation: '',
          marrystatus: '',
          fathername: '',
          mathername: '',
          spsname: '',
          informname: '',
          informtel: '',
          informrelation: '',
        });

        const cardPhoto = data?.photo ? `data:image/jpeg;base64,${data?.photo}` : null;
        setPhoto(cardPhoto);
      }
    } catch (err) {
      console.error('Error searching patient:', err);
      const errMsg = 'เกิดข้อผิดพลาดในการค้นหาผู้ป่วย';
      setStatusMessage(errMsg);
    } finally {
      setIsSearching(false);
    }
  };
  /** ======================= Smart card reader actions ======================= */

  // Update form field
  const updateField = useCallback((field: keyof PatientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.pname) newErrors.pname = 'กรุณาเลือกคำนำหน้า';
    if (!formData.fname) newErrors.fname = 'กรุณากรอกชื่อ';
    if (!formData.lname) newErrors.lname = 'กรุณากรอกนามสกุล';
    if (!formData.birthday) newErrors.birthday = 'กรุณาเลือกวันเกิด';
    if (!formData.pttype) newErrors.pttype = 'กรุณาเลือกสิทธิการรักษา';

    if (formData.cid && formData.cid.length !== 13) {
      newErrors.cid = 'เลขบัตรประชาชนต้องมี 13 หลัก';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = async () => {
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      
      const dataToSave = {
        ...formData,
        drugallergy: allergies.join(', '),
      };
      
      console.log('Saving:', dataToSave);
      router.push(isNew ? '/patients' : `/patients/${hn}`);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (isDirty) {
      discardDialog.open(null);
    } else {
      router.back();
    }
  };

  // Handle photo change from PatientImageUpload component
  const handlePhotoChange = (imageData: string | null, width?: number, height?: number) => {
    setPhoto(imageData);
    setLocalImageChanged(true);
    setIsDirty(true);
  };

  // Handle image upload to server
  const handleImageUpload = async (imageData: string, width: number, height: number) => {
    if (!isNew && hn) {
      await uploadImage(imageData, width, height);
    }
  };

  const loading = patientLoading;

  // Error state
  if (!isNew && patientError) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {patientError}
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
            <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Page wrapper with contrasting background */}
      <div className="min-h-screen -m-6 p-6 bg-slate-100 dark:bg-slate-950">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6 pb-24 lg:pb-6">
          {/* ============================================ */}
          {/* Header */}
          {/* ============================================ */}
          <div className="sticky top-0 z-20 -mx-6 px-6 lg:mx-0 lg:px-0 lg:static">
            <div className="bg-white dark:bg-slate-900 lg:bg-primary-600 rounded-none lg:rounded-2xl border-b lg:border-0 border-slate-200 dark:border-slate-800 p-4 lg:p-6 lg:text-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400 lg:text-white" />
                  </button>
                  <div>
                    <h1 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white lg:text-white">
                      {isNew ? 'ลงทะเบียนผู้ป่วยใหม่' : 'แก้ไขข้อมูลผู้ป่วย'}
                    </h1>
                    {!isNew && patient && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 lg:text-white/70">
                        <span className="font-mono">HN: {hn}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{patient.fullName}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{patient.sex === 'M' ? 'ชาย' : 'หญิง'}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{patient.ageText}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Save Button */}
                <div className="hidden lg:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors font-medium"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-white text-primary-600 rounded-xl hover:bg-white/90 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        กำลังบันทึก...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        บันทึก
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* Main Content */}
          {/* ============================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Personal Information */}
              <FormSection
                title="ข้อมูลส่วนตัว"
                icon={<User size={18} />}
                collapsible={false}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormField label="คำนำหน้า" required error={errors.pname}>
                    <CustomSelect
                      options={PNAME_OPTIONS}
                      value={formData.pname}
                      onChange={(val) => updateField('pname', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>

                  <FormField label="ชื่อ" required error={errors.fname} className="lg:col-span-1">
                    <Input
                      type="text"
                      value={formData.fname}
                      onChange={(e) => updateField('fname', e.target.value)}
                      placeholder="ชื่อ"
                      error={!!errors.fname}
                      data-error={!!errors.fname}
                    />
                  </FormField>

                  <FormField label="นามสกุล" required error={errors.lname} className="lg:col-span-2">
                    <Input
                      type="text"
                      value={formData.lname}
                      onChange={(e) => updateField('lname', e.target.value)}
                      placeholder="นามสกุล"
                      error={!!errors.lname}
                      data-error={!!errors.lname}
                    />
                  </FormField>

                  <FormField label="เพศ" required className="sm:col-span-1">
                    <div className="flex gap-2">
                      {SEX_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateField('sex', opt.value)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            formData.sex === opt.value
                              ? opt.value === 'M'
                                ? 'bg-blue-500 text-white'
                                : 'bg-pink-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {opt.value === 'M' ? '♂' : '♀'} {opt.label}
                        </button>
                      ))}
                    </div>
                  </FormField>

                  {/* Date Picker Field */}
                  <FormField label="วันเกิด" required error={errors.birthday}>
                    <DatePicker
                      value={formData.birthday}
                      onChange={(date: string) => updateField('birthday', date)}
                      error={errors.birthday}
                      placeholder="เลือกวันเกิด"
                      disableFutureDates={true}
                      disablePastDates={false}
                    />
                  </FormField>

                  <FormField label="เลขบัตรประชาชน" error={errors.cid} className="sm:col-span-2">
                    <Input
                      type="text"
                      value={formData.cid}
                      onChange={(e) => updateField('cid', e.target.value.replace(/\D/g, '').slice(0, 13))}
                      placeholder="X-XXXX-XXXXX-XX-X"
                      maxLength={13}
                      error={!!errors.cid}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <FormField label="สัญชาติ">
                    <CustomSelect
                      options={nationalityOptions}
                      value={formData.nationality}
                      onChange={(val) => updateField('nationality', val)}
                    />
                  </FormField>

                  <FormField label="ศาสนา">
                    <CustomSelect
                      options={religionOptions}
                      value={formData.religion}
                      onChange={(val) => updateField('religion', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>

                  <FormField label="สถานภาพ">
                    <CustomSelect
                      options={MARRY_STATUS_OPTIONS}
                      value={formData.marrystatus}
                      onChange={(val) => updateField('marrystatus', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Contact Information */}
              <FormSection title="ข้อมูลติดต่อ" icon={<Phone size={18} />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="โทรศัพท์มือถือ">
                    <Input
                      type="tel"
                      value={formData.mobilePhone}
                      onChange={(e) => updateField('mobilePhone', e.target.value.replace(/\D/g, ''))}
                      placeholder="08XXXXXXXX"
                      maxLength={10}
                    />
                  </FormField>

                  <FormField label="โทรศัพท์บ้าน">
                    <Input
                      type="tel"
                      value={formData.hometel}
                      onChange={(e) => updateField('hometel', e.target.value.replace(/\D/g, ''))}
                      placeholder="0XXXXXXXX"
                    />
                  </FormField>

                  <FormField label="อีเมล" error={errors.email} className="sm:col-span-2">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="email@example.com"
                      error={!!errors.email}
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Address */}
              <FormSection title="ที่อยู่" icon={<MapPin size={18} />}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField label="บ้านเลขที่">
                    <Input
                      type="text"
                      value={formData.addrpart}
                      onChange={(e) => updateField('addrpart', e.target.value)}
                      placeholder="123/45"
                    />
                  </FormField>

                  <FormField label="หมู่">
                    <Input
                      type="text"
                      value={formData.moopart}
                      onChange={(e) => updateField('moopart', e.target.value)}
                      placeholder="1"
                    />
                  </FormField>

                  <FormField label="ถนน" className="col-span-2">
                    <Input
                      type="text"
                      value={formData.road}
                      onChange={(e) => updateField('road', e.target.value)}
                      placeholder="ชื่อถนน"
                    />
                  </FormField>

                  <FormField label="จังหวัด" className="col-span-2">
                    <CustomSelect
                      options={provinceOptions}
                      value={formData.chwpart}
                      onChange={(val) => updateField('chwpart', val)}
                      placeholder="เลือกจังหวัด..."
                    />
                  </FormField>

                  <FormField label="รหัสไปรษณีย์" className="col-span-2">
                    <Input
                      type="text"
                      value={formData.poCode}
                      onChange={(e) => updateField('poCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="XXXXX"
                      maxLength={5}
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Medical Information */}
              <FormSection
                title="ข้อมูลทางการแพทย์"
                icon={<Heart size={18} />}
                badge={
                  allergies.length > 0 && (
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                      แพ้ยา {allergies.length} รายการ
                    </span>
                  )
                }
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField label="หมู่เลือด">
                    <CustomSelect
                      options={BLOOD_GROUP_OPTIONS}
                      value={formData.bloodgrp}
                      onChange={(val) => updateField('bloodgrp', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>

                  <FormField label="Rh">
                    <CustomSelect
                      options={BLOOD_RH_OPTIONS}
                      value={formData.bloodgroupRh}
                      onChange={(val) => updateField('bloodgroupRh', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>

                  <FormField label="G6PD" className="col-span-2">
                    <div className="flex gap-2">
                      {[
                        { value: 'N', label: 'ปกติ' },
                        { value: 'Y', label: 'พร่อง' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateField('g6pd', opt.value)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            formData.g6pd === opt.value
                              ? opt.value === 'N'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-amber-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </FormField>
                </div>

                <div className="mt-4">
                  <FormField label="ประวัติแพ้ยา">
                    <AllergyInput
                      allergies={allergies}
                      onChange={(newAllergies) => {
                        setAllergies(newAllergies);
                        setIsDirty(true);
                      }}
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Family Information */}
              <FormSection title="ข้อมูลครอบครัว" icon={<Users size={18} />} defaultOpen={false}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="ชื่อบิดา">
                    <Input
                      type="text"
                      value={formData.fathername}
                      onChange={(e) => updateField('fathername', e.target.value)}
                      placeholder="ชื่อ-นามสกุล บิดา"
                    />
                  </FormField>

                  <FormField label="ชื่อมารดา">
                    <Input
                      type="text"
                      value={formData.mathername}
                      onChange={(e) => updateField('mathername', e.target.value)}
                      placeholder="ชื่อ-นามสกุล มารดา"
                    />
                  </FormField>

                  <FormField label="ชื่อคู่สมรส" className="sm:col-span-2">
                    <Input
                      type="text"
                      value={formData.spsname}
                      onChange={(e) => updateField('spsname', e.target.value)}
                      placeholder="ชื่อ-นามสกุล คู่สมรส"
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Emergency Contact */}
              <FormSection title="ผู้ติดต่อฉุกเฉิน" icon={<AlertCircle size={18} />} defaultOpen={false}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="ชื่อผู้ติดต่อ">
                    <Input
                      type="text"
                      value={formData.informname}
                      onChange={(e) => updateField('informname', e.target.value)}
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </FormField>

                  <FormField label="เบอร์โทรศัพท์">
                    <Input
                      type="tel"
                      value={formData.informtel}
                      onChange={(e) => updateField('informtel', e.target.value.replace(/\D/g, ''))}
                      placeholder="08XXXXXXXX"
                      maxLength={10}
                    />
                  </FormField>

                  <FormField label="ความสัมพันธ์">
                    <CustomSelect
                      options={relationOptions}
                      value={formData.informrelation}
                      onChange={(val) => updateField('informrelation', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>
                </div>
              </FormSection>
            </div>

            {/* Right Column - Photo & Rights */}
            <div className="space-y-6">
              {/* Photo */}
              <FormSection title="รูปถ่าย" icon={<Camera size={18} />} collapsible={false}>
                <div className="flex flex-col items-center gap-4">
                  <div className='border-3 border-gray-300 rounded-full'>
                    <PatientImageUpload
                      hn={isNew ? undefined : hn}
                      currentImage={photo}
                      onImageChange={handlePhotoChange}
                      onUpload={!isNew ? handleImageUpload : undefined}
                      size="lg"
                      editable={true}
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    คลิกที่รูปเพื่อถ่ายรูปหรือเลือกไฟล์
                  </p>
                  {uploading && (
                    <p className="text-xs text-blue-500 flex items-center gap-1">
                      <Loader2 size={12} className="animate-spin" />
                      กำลังอัปโหลด...
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Rights */}
              <FormSection title="สิทธิการรักษา" icon={<Shield size={18} />} collapsible={false}>
                <FormField label="สิทธิการรักษา" required error={errors.pttype}>
                  <CustomSelect
                    options={pttypeOptions}
                    value={formData.pttype}
                    onChange={(val) => updateField('pttype', val)}
                    placeholder="เลือกสิทธิ์..."
                  />
                </FormField>

                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                  <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Info size={14} />
                    สามารถตรวจสอบสิทธิ์ได้ที่หน้าส่งตรวจ
                  </p>
                </div>
              </FormSection>

              {/* Summary - Only show when editing */}
              {!isNew && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">ข้อมูลการลงทะเบียน</h4>
                  <div className="space-y-2 text-xs text-slate-500">
                    <p className="flex items-center gap-2">
                      <Calendar size={12} />
                      ลงทะเบียน: {patient?.firstday || '-'}
                    </p>
                    <p className="flex items-center gap-2">
                      <FileText size={12} />
                      อัปเดตล่าสุด: {patient?.lastUpdate || '-'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ============================================ */}
          {/* Mobile Bottom Action Bar */}
          {/* ============================================ */}
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 lg:hidden z-40">
            <div className="flex gap-3 max-w-lg mx-auto">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    บันทึก
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ============================================ */}
          {/* Discard Changes Dialog */}
          {/* ============================================ */}
          <ConfirmDialog
            {...discardDialog.dialogProps}
            variant="warning"
            title="ยกเลิกการแก้ไข?"
            message="คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก ต้องการยกเลิกการแก้ไขหรือไม่?"
            confirmText="ยกเลิก"
            cancelText="แก้ไขต่อ"
          />
        </form>
      </div>
    </AdminLayout>
  );
}