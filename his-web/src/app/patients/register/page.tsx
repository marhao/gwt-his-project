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
import { type FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod'
import {
  usePatientDetail,
  useProvinces,
  useDistricts,
  useSubdistricts,
  useThaiAddress,
  useNationalities,
  useOccupations,
  useEducations,
  usePttypes,
} from '@/hooks';
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
import { extractAddressFromSmartCard, formatCid } from '@/lib/utils/string-format';
import { formatSmartCard2DbDate } from '@/lib/utils/date-time';
import { safeZodResolver } from '@/lib/utils/zod';
import { patientApi } from '@/lib/api';
import { useSmartCardReader, SmartCardData } from '@/hooks/useSmartCardReader';
import { PatientImageUpload } from '@/components/ui/patient-image';
import { AdminLayout } from '@/components/layout';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';
import CustomSelect from '@/components/ui/CustomSelect';
import DatePicker from '@/components/ui/date-picker';
import FormField from '@/components/ui/forms/FormField';
import FormSection from '@/components/ui/forms/FormSection';
import AllergyInput from '@/components/ui/forms/AllergyInput';
import Input from '@/components/ui/forms/Input';

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
  { value: 'คู่สมรส', label: 'คู่สมรส' },
  { value: 'บิดา/มารดา', label: 'บิดา/มารดา' },
  { value: 'บุตร', label: 'บุตร' },
  { value: 'พี่น้อง', label: 'พี่น้อง' },
  { value: 'ญาติ', label: 'ญาติ' },
  { value: 'เพื่อน', label: 'เพื่อน' },
  { value: 'อื่นๆ', label: 'อื่นๆ' },
];

const patientSchema = z.object({
  pname: z.string().nonempty("กรุณาระบุคำนำหน้า"),
  fname: z.string().nonempty("กรุณาระบุชื่อ"),
  lname: z.string().nonempty("กรุณาระบุสกุล"),
  sex: z.string().nonempty("กรุณาระบุเพศ"),
  birthday: z.string().nonempty("กรุณาระบุวันที่เกิด"),
  cid: z.string().nonempty("กรุณาระบุเลขบัตรประชาชน"),
  occupation: z.string().optional().default('000'),
  education: z.string().optional().default('000'),
  nationality: z.string().nonempty("กรุณาระบุสัญชาติ"),
  citizenship: z.string().nonempty("กรุณาระบุgเชื้อชาติ"),
  religion: z.string().nonempty("กรุณาระบุศาสนา"),
  marrystatus: z.string().nonempty("กรุณาระบุสถานภาพ"),
  pttype: z.string().nonempty("กรุณาระบุสิทธิการรักษา"),
  bloodgrp: z.string().nonempty("กรุณาระบุหมู่เลือด"),
  bloodgroupRh: z.string().optional().default(''),
  addrpart: z.string().nonempty("กรุณาระบุบ้านเลขที่"),
  moopart: z.string().optional().default(''),
  road: z.string().optional().default(''),
  tmbpart: z.string().optional().default(''),
  amppart: z.string().nonempty("กรุณาระบุอำเภอ"),
  chwpart: z.string().nonempty("กรุณาระบุจังหวัด"),
  poCode: z.string().nonempty("กรุณาระบุรหัสไปรษณีย์").min(5, "รหัสไปรษณีย์ต้องมี 5 ตัว").max(5, "รหัสไปรษณีย์ต้องมี 5 ตัว"),
  mobilePhone: z.string().nonempty("กรุณาระบุโทรศัพท์มือถือ"),
  hometel: z.string().optional().default(''),
  email: z.string().optional().default(''),
  drugallergy: z.string().optional().default(''),
  g6pd: z.string().optional().default('N'),
  informname: z.string().nonempty("กรุณาระบุชื่อผู้ติดต่อ"),
  informtel: z.string().nonempty("กรุณาระบุเบอร์โทรศัพท์ผู้ติดต่อ"),
  informrelation: z.string().nonempty("กรุณาระบุความสัมพันธ์ผู้ติดต่อ"),
  fathername: z.string().optional().default(''),
  mathername: z.string().optional().default(''),
  spsname: z.string().optional().default(''),
});

type PatientSchemaType = z.infer<typeof patientSchema>

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
  // const [errors, setErrors] = useState<Record<string, string>>({});
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

  const { register, reset, setValue, watch, handleSubmit, formState: { errors }} = useForm<PatientSchemaType>({
    resolver: safeZodResolver(patientSchema),
  });

  // Thai address lookup options
  const { data: provinces } = useProvinces();
  const { data: disricts } = useDistricts(watch("chwpart"));
  const { data: subdisricts } = useSubdistricts(watch("chwpart") || '', watch("amppart") || '');
  const { data: nationalities } = useNationalities();
  const { data: occupations } = useOccupations();
  const { data: educations } = useEducations();
  const { data: pttypes } = usePttypes();

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
        setValue("pname", data?.name_th.prefix || '');
        setValue("fname", data?.name_th.firstname || '');
        setValue("lname", data?.name_th.lastname || '');
        setValue("sex", data?.gender === "1" ? 'M' : 'F');
        setValue("birthday", data?.dob ? formatSmartCard2DbDate(data?.dob!) : '');
        setValue("cid", data?.cid || '');

        /** ดึงข้อมูลที่อยู่ */
        const { addrPart, mooPart, tmbPart, ampPart, chwPart } = extractAddressFromSmartCard(data.address)!;
        const _province = provinces.find(prov => prov.name.includes(chwPart));
        setValue("addrpart", addrPart);
        setValue("moopart", mooPart);
        setValue("chwpart", _province?.code!);

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
  // const updateField = useCallback((field: keyof PatientFormData, value: string) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  //   setIsDirty(true);
  //   if (errors[field]) {
  //     setErrors((prev) => {
  //       const newErrors = { ...prev };
  //       delete newErrors[field];
  //       return newErrors;
  //     });
  //   }
  // }, [errors]);

  // Validate form
  // const validate = (): boolean => {
  //   const newErrors: Record<string, string> = {};

  //   if (!formData.pname) newErrors.pname = 'กรุณาเลือกคำนำหน้า';
  //   if (!formData.fname) newErrors.fname = 'กรุณากรอกชื่อ';
  //   if (!formData.lname) newErrors.lname = 'กรุณากรอกนามสกุล';
  //   if (!formData.birthday) newErrors.birthday = 'กรุณาเลือกวันเกิด';
  //   if (!formData.pttype) newErrors.pttype = 'กรุณาเลือกสิทธิการรักษา';

  //   if (formData.cid && formData.cid.length !== 13) {
  //     newErrors.cid = 'เลขบัตรประชาชนต้องมี 13 หลัก';
  //   }

  //   if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // Handle save
  const handleSave = async (data: PatientSchemaType) => {
    // if (!validate()) {
    //   const firstError = document.querySelector('[data-error="true"]');
    //   firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //   return;
    // }
    console.log(data);

    try {
      setSaving(true);

      await new Promise((r) => setTimeout(r, 1500));

      /** Manipulate drugallergy data as string with delimitor (,) */
      const dataToSave = {
        ...data,
        drugallergy: allergies.join(', '),
      };

      console.log('Saving:', dataToSave);
      const response = patientApi.create(dataToSave as PatientFormData);
      console.log(response);

      // router.push(isNew ? '/patients' : `/patients/${hn}`);
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

  const haveErrors = (errObj: FieldErrors, checkingArr: string[]): boolean => {
    return Object.keys(errObj).some((error => checkingArr.includes(error)));
  }

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
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6 pb-24 lg:pb-6">
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
                  <FormField label="คำนำหน้า" required error={errors.pname?.message}>
                    <input type="hidden" {...register("pname")} />
                    <CustomSelect
                      options={PNAME_OPTIONS}
                      value={watch("pname")}
                      onChange={(val) => setValue('pname', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>

                  <FormField label="ชื่อ" required error={errors.fname?.message} className="lg:col-span-1">
                    <Input
                      type="text"
                      {...register("fname")}
                      placeholder="ชื่อ"
                      error={!!errors.fname}
                      data-error={!!errors.fname}
                    />
                  </FormField>

                  <FormField label="นามสกุล" required error={errors.lname?.message} className="lg:col-span-2">
                    <Input
                      type="text"
                      {...register("lname")}
                      placeholder="นามสกุล"
                      error={!!errors.lname}
                      data-error={!!errors.lname}
                    />
                  </FormField>

                  <FormField label="เพศ" required className="sm:col-span-1">
                    <div className="flex gap-2">
                      <input type="hidden" {...register("sex")} />
                      {SEX_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setValue('sex', opt.value)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            watch("sex") === opt.value
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
                  <FormField label="วันเกิด" required error={errors.birthday?.message}>
                    <input type="hidden" {...register("birthday")} />
                    <DatePicker
                      value={watch("birthday")}
                      onChange={(date: string) => setValue('birthday', date)}
                      error={errors.birthday?.message}
                      placeholder="เลือกวันเกิด"
                      disableFutureDates={true}
                      disablePastDates={false}
                    />
                  </FormField>

                  <FormField label="เลขบัตรประชาชน" error={errors.cid?.message} className="sm:col-span-2">
                    <Input
                      type="text"
                      {...register("cid")}
                      onChange={(e) => setValue('cid', e.target.value.replace(/\D/g, '').slice(0, 13))}
                      placeholder="X-XXXX-XXXXX-XX-X"
                      maxLength={13}
                      error={!!errors.cid}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <FormField label="สัญชาติ" error={errors.nationality?.message}>
                    <input type="hidden" {...register("nationality")} />
                    <CustomSelect
                      options={
                        nationalities
                          .map(nation => ({ value: nation.code, label: `${nation.code}-${nation.name}`}))
                          .sort((a, b) => parseInt(a.value) - parseInt(b.value))
                      }
                      value={watch("nationality")}
                      onChange={(val) => setValue('nationality', val)}
                    />
                  </FormField>

                  <FormField label="เชื้อชาติ" error={errors.citizenship?.message}>
                    <input type="hidden" {...register("citizenship")} />
                    <CustomSelect
                      options={
                        nationalities
                          .map(nation => ({ value: nation.code, label: `${nation.code}-${nation.name}`}))
                          .sort((a, b) => parseInt(a.value) - parseInt(b.value))
                      }
                      value={watch("citizenship")}
                      onChange={(val) => setValue('citizenship', val)}
                    />
                  </FormField>

                  <FormField label="ศาสนา" error={errors.religion?.message}>
                    <input type="hidden" {...register("religion")} />
                    <CustomSelect
                      options={religionOptions}
                      value={watch("religion")}
                      onChange={(val) => setValue('religion', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>
                </div>

                {/* อาชีพ/การศึกษา */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <FormField label="สถานภาพ" error={errors.marrystatus?.message}>
                    <input type="hidden" {...register("marrystatus")} />
                    <CustomSelect
                      options={MARRY_STATUS_OPTIONS}
                      value={watch("marrystatus")}
                      onChange={(val) => setValue('marrystatus', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>
                  <FormField label="อาชีพ" error={errors.occupation?.message}>
                    <input type="hidden" {...register("occupation")} />
                    <CustomSelect
                      options={
                        occupations.map(occ => ({ value: occ.code, label: occ.name }))
                      }
                      value={watch("occupation")}
                      onChange={(val) => setValue('occupation', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>

                  <FormField label="การศึกษา" error={errors.occupation?.message}>
                    <input type="hidden" {...register("education")} />
                    <CustomSelect
                      options={
                        educations.map(occ => ({ value: occ.code, label: occ.name }))
                      }
                      value={watch("education")}
                      onChange={(val) => setValue('education', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Contact Information */}
              <FormSection title="ข้อมูลติดต่อ" icon={<Phone size={18} />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="โทรศัพท์มือถือ" error={errors.mobilePhone?.message}>
                    <Input
                      type="tel"
                      {...register("mobilePhone")}
                      onChange={(e) => setValue('mobilePhone', e.target.value.replace(/\D/g, ''))}
                      placeholder="08XXXXXXXX"
                      maxLength={10}
                    />
                  </FormField>

                  <FormField label="โทรศัพท์บ้าน">
                    <Input
                      type="tel"
                      {...register("hometel")}
                      onChange={(e) => setValue('hometel', e.target.value.replace(/\D/g, ''))}
                      placeholder="0XXXXXXXX"
                    />
                  </FormField>

                  <FormField label="อีเมล" className="sm:col-span-2">
                    <Input
                      type="email"
                      {...register("email")}
                      onChange={(e) => setValue('email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Address */}
              <FormSection title="ที่อยู่" icon={<MapPin size={18} />}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField label="บ้านเลขที่" error={errors.addrpart?.message}>
                    <Input
                      type="text"
                      {...register("addrpart")}
                      placeholder="123/45"
                    />
                  </FormField>

                  <FormField label="หมู่">
                    <Input
                      type="text"
                      {...register("moopart")}
                      placeholder="1"
                    />
                  </FormField>

                  <FormField label="ถนน" className="col-span-2">
                    <Input
                      type="text"
                      {...register("road")}
                      placeholder="ชื่อถนน"
                    />
                  </FormField>

                  <FormField label="จังหวัด" className="col-span-2" error={errors.chwpart?.message}>
                    <input type="hidden" {...register("chwpart")} />
                    <CustomSelect
                      options={provinces.map(prov => ({ value: prov.code, label: `${prov.code}-${prov.name}` }))}
                      value={watch("chwpart")}
                      onChange={(val) => setValue('chwpart', val)}
                      placeholder="เลือกจังหวัด..."
                    />
                  </FormField>

                  <FormField label="อำเภอ" className="col-span-2" error={errors.amppart?.message}>
                    <input type="hidden" {...register("amppart")} />
                    <CustomSelect
                      options={
                        disricts
                          .map(dis => ({ value: dis.code, label: `${dis.code}-${dis.name}` }))
                          .sort((a, b) => parseInt(a.value) - parseInt(b.value))
                      }
                      value={watch("amppart")!}
                      onChange={(val) => {
                        setValue('amppart', val);
                      }}
                      placeholder="เลือกอำเภอ..."
                    />
                  </FormField>

                  <FormField label="ตำบล" className="col-span-2">
                    <input type="hidden" {...register("tmbpart")} />
                    <CustomSelect
                      options={
                        subdisricts
                          .map(sub => ({ value: sub.code, label: `${sub.code}-${sub.name}` }))
                          .sort((a, b) => parseInt(a.value) - parseInt(b.value))
                      }
                      value={watch("tmbpart")!}
                      onChange={(val) => setValue('tmbpart', val)}
                      placeholder="เลือกตำบล..."
                    />
                  </FormField>

                  <FormField label="รหัสไปรษณีย์" className="col-span-2" error={errors.poCode?.message}>
                    <Input
                      type="text"
                      {...register("poCode")}
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
                  <FormField label="หมู่เลือด" error={errors.bloodgrp?.message}>
                    <input type="hidden" {...register("bloodgrp")} />
                    <CustomSelect
                      options={BLOOD_GROUP_OPTIONS}
                      value={watch("bloodgrp")}
                      onChange={(val) => setValue('bloodgrp', val)}
                      placeholder="เลือก..."
                    />
                  </FormField>

                  <FormField label="Rh">
                    <input type="hidden" {...register("bloodgroupRh")} />
                    <CustomSelect
                      options={BLOOD_RH_OPTIONS}
                      value={watch("bloodgroupRh")!}
                      onChange={(val) => setValue('bloodgroupRh', val)}
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
                          onClick={() => setValue('g6pd', opt.value)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            watch("g6pd") === opt.value
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
                  <FormField label="ประวัติแพ้ยา" error={errors.drugallergy?.message}>
                    <AllergyInput
                      allergies={allergies}
                      onChange={(_allergies) => {
                        setValue('drugallergy', _allergies.join(","))
                        setAllergies(_allergies);
                        setIsDirty(true);
                      }}
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Family Information */}
              <FormSection
                title="ข้อมูลครอบครัว"
                icon={<Users size={18} />}
                defaultOpen={false}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="ชื่อบิดา">
                    <Input
                      type="text"
                      {...register("fathername")}
                      placeholder="ชื่อ-นามสกุล บิดา"
                    />
                  </FormField>

                  <FormField label="ชื่อมารดา">
                    <Input
                      type="text"
                      {...register("mathername")}
                      placeholder="ชื่อ-นามสกุล มารดา"
                    />
                  </FormField>

                  <FormField label="ชื่อคู่สมรส" className="sm:col-span-2">
                    <Input
                      type="text"
                      {...register("spsname")}
                      placeholder="ชื่อ-นามสกุล คู่สมรส"
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Emergency Contact */}
              <FormSection
                title="ผู้ติดต่อฉุกเฉิน"
                icon={<AlertCircle size={18} />}
                defaultOpen={haveErrors(errors, ["informname", "informtel", "informrelation"])}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="ชื่อผู้ติดต่อ" error={errors.informname?.message}>
                    <Input
                      type="text"
                      {...register("informname")}
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </FormField>

                  <FormField label="เบอร์โทรศัพท์"error={errors.informtel?.message}>
                    <Input
                      type="tel"
                      {...register("informtel")}
                      onChange={(e) => setValue('informtel', e.target.value.replace(/\D/g, ''))}
                      placeholder="08XXXXXXXX"
                      maxLength={10}
                    />
                  </FormField>

                  <FormField label="ความสัมพันธ์"error={errors.informrelation?.message}>
                    <input type='hidden' {...register("informrelation")} />
                    <CustomSelect
                      options={relationOptions}
                      value={watch("informrelation")}
                      onChange={(val) => setValue('informrelation', val)}
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
                <FormField label="สิทธิการรักษา" required error={errors.pttype?.message}>
                  <input type='hidden' {...register("pttype")} />
                  <CustomSelect
                    options={
                      pttypes.map(right => ({ value: right.code, label: `${right.code}-${right.name}` }))
                    }
                    value={watch("pttype")}
                    onChange={(val) => setValue('pttype', val)}
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