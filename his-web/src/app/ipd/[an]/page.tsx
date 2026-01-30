'use client';

import { useState, use, useEffect } from 'react';
import {
  Activity, ClipboardList, Pill, TestTube, Heart, Users, FileText, History, Scale, Image as ImageIcon,
  Calendar, Clock,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';

// Components
import { PatientHeader } from './_components/PatientHeader';
import { CompactStickyHeader } from './_components/CompactStickyHeader';
import { OverviewTab } from './_components/OverviewTab';
import { VitalsTab } from './_components/VitalsTab';
import { XrayTab } from './_components/XrayTab';
import { LabTab } from './_components/LabTab';
import { MedicationsTab } from './_components/MedicationsTab';
import { NursingTab } from './_components/NursingTab';
import { AssessmentsTab } from './_components/AssessmentsTab';
import { TPRChartTab } from './_components/TPRChartTab';

// OrderSheet from separated structure
import { OrderSheet } from './_components/order-sheet';

// Types
import { Patient, Order, ProgressNote, VitalSign, TabType } from './_types';

// ============================================
// Global Styles (simplified)
// ============================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
  
  .ipd-detail * { font-family: 'Kanit', sans-serif; }
  .ipd-detail .font-mono { font-family: 'JetBrains Mono', monospace; }
  
  .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
  .scrollbar-thin::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
  .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
`;

// ============================================
// Mock Data - Multiple Patients (lookup by AN)
// ============================================

const mockPatients: Record<string, Patient> = {
  '670001234': {
    an: '670001234',
    hn: '6712345',
    cid: '1234567890123',
    name: 'นายสมชาย ใจดี',
    age: 58,
    sex: 'M',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Aspirin'],
    underlyingDiseases: ['HT', 'DM', 'DLP'],
    regdate: '15/01/67',
    regtime: '14:30',
    ward: 'อายุรกรรม ชาย 1',
    wardCode: 'W01',
    room: '301',
    bed: 'A',
    diagnosis: 'Acute myocardial infarction',
    pttype: 'UCS',
    pttypeName: 'บัตรทอง',
    admDoctor: 'นพ.วิชัย หัวใจดี',
    inchargeDoctor: 'นพ.สุรชัย รักษาดี',
    spclty: 'อายุรกรรม',
    isCritical: true,
    los: 5,
    drg: '12001',
    rw: 2.5,
    emergencyContact: '081-234-5678',
  },
  '670001235': {
    an: '670001235',
    hn: '6723456',
    cid: '2345678901234',
    name: 'นางสมหญิง รักสุข',
    age: 45,
    sex: 'F',
    bloodType: 'A+',
    allergies: ['Sulfa'],
    underlyingDiseases: ['DM', 'Obesity'],
    regdate: '16/01/67',
    regtime: '09:15',
    ward: 'อายุรกรรม หญิง 1',
    wardCode: 'W02',
    room: '402',
    bed: 'B',
    diagnosis: 'Type 2 DM with complication',
    pttype: 'SSS',
    pttypeName: 'ประกันสังคม',
    admDoctor: 'พญ.สุดา เยียวยา',
    inchargeDoctor: 'พญ.สุดา เยียวยา',
    spclty: 'อายุรกรรม',
    isCritical: false,
    los: 3,
    drg: '13502',
    rw: 1.2,
    emergencyContact: '089-876-5432',
  },
  '670001236': {
    an: '670001236',
    hn: '6734567',
    cid: '3456789012345',
    name: 'นายประเสริฐ มั่นคง',
    age: 62,
    sex: 'M',
    bloodType: 'B+',
    allergies: [],
    underlyingDiseases: ['HT', 'CKD Stage 3'],
    regdate: '14/01/67',
    regtime: '22:45',
    ward: 'ICU',
    wardCode: 'ICU',
    room: 'ICU',
    bed: '3',
    diagnosis: 'Severe sepsis, Pneumonia',
    pttype: 'OFC',
    pttypeName: 'ข้าราชการ',
    admDoctor: 'นพ.เกรียงไกร ฉุกเฉิน',
    inchargeDoctor: 'นพ.เกรียงไกร ฉุกเฉิน',
    spclty: 'อายุรกรรม',
    isCritical: true,
    los: 6,
    drg: '17201',
    rw: 8.5,
    emergencyContact: '082-345-6789',
  },
  '670001237': {
    an: '670001237',
    hn: '6745678',
    cid: '4567890123456',
    name: 'ด.ช.ภูมิ เติบโต',
    age: 8,
    sex: 'M',
    bloodType: 'AB+',
    allergies: ['Ibuprofen'],
    underlyingDiseases: [],
    regdate: '17/01/67',
    regtime: '11:00',
    ward: 'กุมารเวชกรรม',
    wardCode: 'W05',
    room: '501',
    bed: 'C',
    diagnosis: 'Acute appendicitis',
    pttype: 'UCS',
    pttypeName: 'บัตรทอง',
    admDoctor: 'พญ.นิดา เด็กดี',
    inchargeDoctor: 'นพ.สุรชัย มีดคม',
    spclty: 'ศัลยกรรม',
    isCritical: false,
    los: 2,
    drg: '06801',
    rw: 1.8,
    emergencyContact: '083-456-7890',
  },
  '670001238': {
    an: '670001238',
    hn: '6756789',
    cid: '5678901234567',
    name: 'นางมาลี ครรภ์แก้ว',
    age: 28,
    sex: 'F',
    bloodType: 'O-',
    allergies: [],
    underlyingDiseases: [],
    regdate: '17/01/67',
    regtime: '03:30',
    ward: 'สูติ-นรีเวช',
    wardCode: 'W04',
    room: 'LR',
    bed: '2',
    diagnosis: 'Full term pregnancy, labor',
    pttype: 'SSS',
    pttypeName: 'ประกันสังคม',
    admDoctor: 'พญ.วิไล คลอดง่าย',
    inchargeDoctor: 'พญ.วิไล คลอดง่าย',
    spclty: 'สูติ-นรีเวชกรรม',
    isCritical: false,
    los: 1,
    drg: '14001',
    rw: 0.8,
    emergencyContact: '084-567-8901',
  },
};

// Default patient if AN not found
const defaultPatient: Patient = {
  an: 'N/A',
  hn: 'N/A',
  cid: 'N/A',
  name: 'ไม่พบข้อมูลผู้ป่วย',
  age: 0,
  sex: 'M',
  bloodType: 'N/A',
  allergies: [],
  underlyingDiseases: [],
  regdate: '-',
  regtime: '-',
  ward: '-',
  wardCode: '-',
  room: '-',
  bed: '-',
  diagnosis: '-',
  pttype: '-',
  pttypeName: '-',
  admDoctor: '-',
  inchargeDoctor: '-',
  spclty: '-',
  isCritical: false,
  los: 0,
  drg: '-',
  rw: 0,
  emergencyContact: '-',
};

// Helper function to get patient by AN
const getPatientByAN = (an: string): Patient => {
  return mockPatients[an] || defaultPatient;
};

const mockOrders: Order[] = [
  { id: 1, type: 'lab', name: 'CBC', orderType: 'oneday', startDate: '20/01/67', time: '06:00', prescriber: 'นพ.วิชัย', status: 'completed', isStat: true, isDiscontinued: false },
  { id: 2, type: 'lab', name: 'Cardiac Enzyme (Troponin-T)', orderType: 'oneday', startDate: '20/01/67', time: '06:00', prescriber: 'นพ.วิชัย', status: 'pending', isStat: true, isDiscontinued: false },
  { id: 3, type: 'lab', name: 'Electrolyte', orderType: 'oneday', startDate: '20/01/67', time: '06:00', prescriber: 'นพ.วิชัย', status: 'pending', isStat: false, isDiscontinued: false },
  { id: 4, type: 'medication', name: 'Aspirin 81mg', dose: '1 tab', frequency: 'OD PC', route: 'PO', instruction: 'รับประทานหลังอาหารเช้า', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'active', isStat: false, isDiscontinued: false },
  { id: 5, type: 'medication', name: 'Clopidogrel 75mg', dose: '1 tab', frequency: 'OD PC', route: 'PO', instruction: 'รับประทานหลังอาหารเช้า', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'active', isStat: false, isDiscontinued: false },
  { id: 6, type: 'medication', name: 'Atorvastatin 40mg', dose: '1 tab', frequency: 'OD HS', route: 'PO', instruction: 'รับประทานก่อนนอน', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'active', isStat: false, isDiscontinued: false },
  { id: 7, type: 'medication', name: 'Enoxaparin 60mg', dose: '1 prefilled', frequency: 'BID', route: 'SC', instruction: 'ฉีดเข้าใต้ผิวหนังบริเวณหน้าท้อง', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'active', isStat: false, isDiscontinued: false },
  { id: 8, type: 'medication', name: 'Omeprazole 40mg', dose: '1 vial', frequency: 'OD', route: 'IV', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'active', isStat: false, isDiscontinued: false },
  { id: 9, type: 'treatment', name: 'O2 Cannula 3 L/min', dose: 'Keep O2 sat ≥ 95%', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'active', isStat: false, isDiscontinued: false },
  { id: 10, type: 'treatment', name: 'EKG Monitor', dose: 'Continuous', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'active', isStat: false, isDiscontinued: false },
  { id: 11, type: 'medication', name: 'Morphine 10mg IV', dose: '0.5 amp', frequency: 'Q4H PRN', route: 'IV', instruction: 'เมื่อปวดมาก', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'active', isStat: false, isDiscontinued: false },
  { id: 100, type: 'medication', name: 'Metformin 500mg', dose: '1 tab', frequency: 'TID PC', route: 'PO', orderType: 'continue', startDate: '18/01/67', time: '14:30', prescriber: 'นพ.วิชัย', status: 'discontinued', isStat: false, isDiscontinued: true, endDate: '19/01/67', endTime: '10:00', dcBy: 'นพ.วิชัย', dcReason: 'Hold ยาก่อน CAG' },
];

const mockProgressNotes: ProgressNote[] = [
  {
    id: 1, date: '20/01/67', time: '08:00', author: 'นพ.วิชัย หัวใจดี',
    subjective: 'เจ็บหน้าอกน้อยลง ยังมี chest discomfort เล็กน้อย',
    objective: 'V/S stable, BP 125/78, HR 72, no dyspnea\nHeart: regular rhythm, no murmur\nLung: clear both sides',
    assessment: '1. NSTEMI - improving\n2. HT - controlled\n3. DM - hold Metformin',
    plan: '1. Continue DAPT, anticoagulation\n2. Plan CAG tomorrow\n3. Keep NPO after MN',
    vitalSigns: { bp: '125/78', hr: 72, rr: 18, temp: 36.8, o2sat: 98 },
  },
  {
    id: 2, date: '19/01/67', time: '20:00', author: 'นพ.สุรชัย รักษาดี',
    subjective: 'เจ็บหน้าอก แน่นๆ ร้าวไปแขนซ้าย มา 2 ชม.ก่อนมา',
    objective: 'V/S: BP 145/92, HR 88, RR 20, T 37.0, O2sat 96%\nGA: anxious, diaphoresis\nHeart: regular rhythm, S3 gallop',
    assessment: '1. NSTEMI high risk\n2. HT emergency\n3. Underlying DM, DLP',
    plan: '1. Start DAPT + anticoagulation\n2. Serial cardiac enzyme\n3. Plan CAG',
    vitalSigns: { bp: '145/92', hr: 88, rr: 20, temp: 37.0, o2sat: 96 },
  },
];

const mockVitalSigns: VitalSign[] = [
  { datetime: '20/01/67 08:00', temp: 36.8, pulse: 72, rr: 18, bp_sys: 125, bp_dia: 78, o2sat: 98, pain: 2, recorded_by: 'พยาบาลสมหญิง' },
  { datetime: '20/01/67 04:00', temp: 36.6, pulse: 68, rr: 16, bp_sys: 118, bp_dia: 72, o2sat: 99, pain: 1, recorded_by: 'พยาบาลสมชาย' },
  { datetime: '19/01/67 20:00', temp: 37.0, pulse: 88, rr: 20, bp_sys: 145, bp_dia: 92, o2sat: 96, pain: 6, recorded_by: 'พยาบาลวิไล' },
  { datetime: '19/01/67 16:00', temp: 37.2, pulse: 92, rr: 22, bp_sys: 152, bp_dia: 95, o2sat: 95, pain: 7, recorded_by: 'พยาบาลสมศรี' },
];

// ============================================
// Tab Configuration
// ============================================

const tabs: { id: TabType; label: string; shortLabel: string; icon: any; color: string }[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'ภาพรวม', icon: Activity, color: 'slate' },
  { id: 'orders', label: 'Order Sheet', shortLabel: 'Orders', icon: ClipboardList, color: 'blue' },
  { id: 'medications', label: 'MAR', shortLabel: 'MAR', icon: Pill, color: 'purple' },
  { id: 'lab', label: 'Lab', shortLabel: 'Lab', icon: TestTube, color: 'pink' },
  { id: 'xray', label: 'X-Ray/Imaging', shortLabel: 'X-Ray', icon: ImageIcon, color: 'cyan' },
  { id: 'vitals', label: 'Vital Signs', shortLabel: 'V/S', icon: Heart, color: 'red' },
  { id: 'nursing', label: 'Nursing', shortLabel: 'Nursing', icon: Users, color: 'teal' },
  { id: 'assessments', label: 'Assessments', shortLabel: 'Assess', icon: FileText, color: 'amber' },
  { id: 'records', label: 'Records', shortLabel: 'Records', icon: History, color: 'indigo' },
  { id: 'finance', label: 'Finance', shortLabel: 'Finance', icon: Scale, color: 'emerald' },
];

// ============================================
// Main Page Component
// ============================================

interface IPDDetailPageProps {
  params: Promise<{ an: string }>;
}

export default function IPDDetailPage({ params }: IPDDetailPageProps) {
  // Unwrap params Promise (Next.js 15+)
  const { an } = use(params);
  
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [progressNotes, setProgressNotes] = useState<ProgressNote[]>(mockProgressNotes);
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>(mockVitalSigns);
  
  // Track scroll to show/hide compact header
  const [showCompactHeader, setShowCompactHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show compact header when scrolled past 150px (approx height of full header)
      setShowCompactHeader(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get patient by AN from URL params
  const patient = getPatientByAN(an);

  const activeOrders = orders.filter(o => !o.isDiscontinued);

  // Get badge counts
  const getBadge = (tabId: TabType): number | undefined => {
    switch (tabId) {
      case 'orders': return activeOrders.length;
      case 'medications': return activeOrders.filter(o => o.type === 'medication').length;
      case 'lab': return activeOrders.filter(o => o.type === 'lab').length;
      default: return undefined;
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab patient={patient} orders={orders} vitalSigns={vitalSigns} />;
      case 'orders':
        return <OrderSheet orders={orders} setOrders={setOrders} progressNotes={progressNotes} setProgressNotes={setProgressNotes} />;
      case 'vitals':
        return <TPRChartTab />;
      case 'xray':
        return <XrayTab />;
      case 'lab':
        return <LabTab />;
      case 'medications':
        return <MedicationsTab />;
      case 'nursing':
        return <NursingTab />;
      case 'assessments':
        return <AssessmentsTab />;
      case 'records':
        return (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-12 text-center">
            <div className="w-16 h-16 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-semibold">Medical Records</p>
            <p className="text-slate-400 text-sm mt-1">กำลังพัฒนา...</p>
          </div>
        );
      case 'finance':
        return (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-12 text-center">
            <div className="w-16 h-16 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-semibold">Finance & Billing</p>
            <p className="text-slate-400 text-sm mt-1">กำลังพัฒนา...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <style>{globalStyles}</style>

      {/* ลบ bg-slate-50 ออก ให้โปร่งใส เห็น background จาก AdminLayout */}
      <div className="ipd-detail min-h-screen">
        <div className="space-y-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 dark:text-white">IPD Chart</h1>
                <p className="text-xs text-slate-500">AN: {patient.an}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-300">20/01/2567</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-300">15:30</span>
            </div>
          </div>

          {/* Full Patient Header - Not Sticky (scroll away) */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm overflow-hidden">
            <PatientHeader patient={patient} />
          </div>

          {/* Sticky Header - Tab always visible, Compact info shows on scroll */}
          <div className="sticky top-0 z-50">
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg overflow-hidden">
              
              {/* Compact Patient Info - Animated show/hide */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showCompactHeader ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <CompactStickyHeader patient={patient} />
                {/* Divider */}
                <div className="border-t border-slate-200/80 dark:border-slate-700/80" />
              </div>
              
              {/* Tab Navigation - Always visible */}
              <div className="p-1.5 bg-slate-50/80 dark:bg-slate-900/50">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-1 min-w-max">
                    {tabs.map((tab) => {
                      const badge = getBadge(tab.id);
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
                            isActive
                              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700/50'
                          }`}
                        >
                          <tab.icon className="w-4 h-4" />
                          <span className="hidden sm:inline">{tab.label}</span>
                          <span className="sm:hidden">{tab.shortLabel}</span>
                          {badge !== undefined && (
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              isActive
                                ? 'bg-white/20'
                                : 'bg-slate-200/80 dark:bg-slate-600/80 text-slate-600 dark:text-slate-300'
                            }`}>
                              {badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Footer Stats */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-slate-500">Continue:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{activeOrders.filter(o => o.orderType === 'continue').length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-slate-500">One Day:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{activeOrders.filter(o => o.orderType === 'oneday').length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-slate-500">STAT:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{activeOrders.filter(o => o.isStat).length}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Total Active:</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold shadow-sm">
                  {activeOrders.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}