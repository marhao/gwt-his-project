'use client';

import { useState, useMemo } from 'react';
import {
  Pill, AlertTriangle, Clock, CheckCircle, XCircle, ChevronDown, ChevronRight, ChevronLeft,
  Syringe, Droplets, Wind, Shield, Calendar, Search, Filter, LayoutList, LayoutGrid,
  PanelLeftClose,
} from 'lucide-react';

// ============================================
// Types
// ============================================

interface MedicationOrder {
  id: number;
  name: string;
  genericName?: string;
  dose: string;
  route: 'PO' | 'IV' | 'SC' | 'IM' | 'INH' | 'TOP' | 'SL';
  frequency: string;
  schedule: string[];
  instruction?: string;
  startDate: string;
  status: 'active' | 'hold' | 'discontinued';
  isHighAlert?: boolean;
  isStat?: boolean;
  isPRN?: boolean;
  prnReason?: string;
  category: 'cardiovascular' | 'anticoagulant' | 'analgesic' | 'gi' | 'diabetes' | 'other';
}

interface MedicationAdministration {
  oderId: number;
  scheduledTime: string;
  scheduledDate: string;
  status: 'given' | 'pending' | 'skipped' | 'late';
  givenTime?: string;
  givenBy?: string;
  note?: string;
}

interface MedicationCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
}

// ============================================
// Mock Data
// ============================================

const categories: MedicationCategory[] = [
  { id: 'all', name: 'ทั้งหมด', icon: Pill, color: 'slate' },
  { id: 'cardiovascular', name: 'Cardiovascular', icon: Pill, color: 'red' },
  { id: 'anticoagulant', name: 'Anticoagulant', icon: Droplets, color: 'rose' },
  { id: 'analgesic', name: 'Analgesic', icon: Pill, color: 'orange' },
  { id: 'gi', name: 'GI Drugs', icon: Pill, color: 'emerald' },
  { id: 'diabetes', name: 'Diabetes', icon: Syringe, color: 'blue' },
  { id: 'other', name: 'Other', icon: Pill, color: 'slate' },
];

const mockMedications: MedicationOrder[] = [
  { id: 1, name: 'Aspirin 81mg', genericName: 'Acetylsalicylic acid', dose: '1 tab (81mg)', route: 'PO', frequency: 'OD เช้า', schedule: ['08:00'], instruction: 'รับประทานหลังอาหาร', startDate: '18/01/67', status: 'active', category: 'cardiovascular' },
  { id: 2, name: 'Clopidogrel 75mg', genericName: 'Clopidogrel bisulfate', dose: '1 tab (75mg)', route: 'PO', frequency: 'OD เช้า', schedule: ['08:00'], startDate: '18/01/67', status: 'active', category: 'cardiovascular' },
  { id: 3, name: 'Atorvastatin 40mg', genericName: 'Atorvastatin calcium', dose: '1 tab (40mg)', route: 'PO', frequency: 'OD HS', schedule: ['21:00'], instruction: 'รับประทานก่อนนอน', startDate: '18/01/67', status: 'active', category: 'cardiovascular' },
  { id: 4, name: 'Enoxaparin 60mg', genericName: 'Enoxaparin sodium', dose: '0.6ml (60mg)', route: 'SC', frequency: 'BID', schedule: ['08:00', '20:00'], instruction: 'ฉีดเข้าใต้ผิวหนังบริเวณหน้าท้อง', startDate: '18/01/67', status: 'active', isHighAlert: true, category: 'anticoagulant' },
  { id: 5, name: 'Heparin 5000 units', genericName: 'Heparin sodium', dose: '5000 units', route: 'IV', frequency: 'STAT', schedule: ['14:30'], startDate: '20/01/67', status: 'active', isHighAlert: true, isStat: true, category: 'anticoagulant' },
  { id: 6, name: 'Omeprazole 40mg', genericName: 'Omeprazole', dose: '1 vial (40mg)', route: 'IV', frequency: 'OD', schedule: ['06:00'], instruction: 'ให้ก่อนอาหารเช้า', startDate: '18/01/67', status: 'active', category: 'gi' },
  { id: 7, name: 'Metoprolol 50mg', genericName: 'Metoprolol tartrate', dose: '1 tab (50mg)', route: 'PO', frequency: 'BID', schedule: ['08:00', '20:00'], startDate: '18/01/67', status: 'active', category: 'cardiovascular' },
  { id: 8, name: 'Amlodipine 5mg', genericName: 'Amlodipine besylate', dose: '1 tab (5mg)', route: 'PO', frequency: 'OD เช้า', schedule: ['08:00'], startDate: '18/01/67', status: 'active', category: 'cardiovascular' },
  { id: 9, name: 'Morphine 10mg/ml', genericName: 'Morphine sulfate', dose: '2-4mg', route: 'IV', frequency: 'Q4H PRN', schedule: [], instruction: 'เมื่อปวดมาก (Pain score ≥ 7)', startDate: '18/01/67', status: 'active', isHighAlert: true, isPRN: true, prnReason: 'Pain score ≥ 7', category: 'analgesic' },
  { id: 10, name: 'Insulin Glargine', genericName: 'Insulin glargine', dose: '10 units', route: 'SC', frequency: 'OD HS', schedule: ['22:00'], instruction: 'ฉีดเข้าใต้ผิวหนัง', startDate: '19/01/67', status: 'active', isHighAlert: true, category: 'diabetes' },
  { id: 11, name: 'Metformin 500mg', genericName: 'Metformin HCl', dose: '1 tab (500mg)', route: 'PO', frequency: 'TID PC', schedule: ['08:00', '12:00', '18:00'], startDate: '18/01/67', status: 'hold', instruction: 'Hold ก่อน CAG', category: 'diabetes' },
];

// Generate mock administrations for multiple days
const generateMockAdministrations = (): MedicationAdministration[] => {
  const today = new Date();
  const formatDate = (d: Date) => `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${(d.getFullYear() + 543).toString().slice(-2)}`;
  
  const todayStr = formatDate(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDate(yesterday);

  return [
    // Today
    { oderId: 1, scheduledTime: '08:00', scheduledDate: todayStr, status: 'given', givenTime: '08:05', givenBy: 'พย.สมหญิง รักดี' },
    { oderId: 2, scheduledTime: '08:00', scheduledDate: todayStr, status: 'given', givenTime: '08:05', givenBy: 'พย.สมหญิง รักดี' },
    { oderId: 4, scheduledTime: '08:00', scheduledDate: todayStr, status: 'given', givenTime: '08:12', givenBy: 'พย.สมหญิง รักดี' },
    { oderId: 6, scheduledTime: '06:00', scheduledDate: todayStr, status: 'given', givenTime: '06:15', givenBy: 'พย.กลางคืน มั่นใจ' },
    { oderId: 7, scheduledTime: '08:00', scheduledDate: todayStr, status: 'given', givenTime: '08:05', givenBy: 'พย.สมหญิง รักดี' },
    { oderId: 8, scheduledTime: '08:00', scheduledDate: todayStr, status: 'given', givenTime: '08:05', givenBy: 'พย.สมหญิง รักดี' },
    { oderId: 5, scheduledTime: '14:30', scheduledDate: todayStr, status: 'pending' },
    { oderId: 3, scheduledTime: '21:00', scheduledDate: todayStr, status: 'pending' },
    { oderId: 4, scheduledTime: '20:00', scheduledDate: todayStr, status: 'pending' },
    { oderId: 7, scheduledTime: '20:00', scheduledDate: todayStr, status: 'pending' },
    { oderId: 10, scheduledTime: '22:00', scheduledDate: todayStr, status: 'pending' },
    // Yesterday
    { oderId: 1, scheduledTime: '08:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '08:10', givenBy: 'พย.วิไล ใจดี' },
    { oderId: 2, scheduledTime: '08:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '08:10', givenBy: 'พย.วิไล ใจดี' },
    { oderId: 3, scheduledTime: '21:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '21:05', givenBy: 'พย.กลางคืน มั่นใจ' },
    { oderId: 4, scheduledTime: '08:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '08:15', givenBy: 'พย.วิไล ใจดี' },
    { oderId: 4, scheduledTime: '20:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '20:00', givenBy: 'พย.กลางคืน มั่นใจ' },
    { oderId: 6, scheduledTime: '06:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '06:20', givenBy: 'พย.กลางคืน มั่นใจ' },
    { oderId: 7, scheduledTime: '08:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '08:10', givenBy: 'พย.วิไล ใจดี' },
    { oderId: 7, scheduledTime: '20:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '20:05', givenBy: 'พย.กลางคืน มั่นใจ' },
    { oderId: 8, scheduledTime: '08:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '08:10', givenBy: 'พย.วิไล ใจดี' },
    { oderId: 10, scheduledTime: '22:00', scheduledDate: yesterdayStr, status: 'given', givenTime: '22:00', givenBy: 'พย.กลางคืน มั่นใจ' },
  ];
};

const timeSlots = ['06:00', '08:00', '12:00', '14:00', '18:00', '20:00', '21:00', '22:00'];

// ============================================
// Helper Components
// ============================================

const RouteIcon = ({ route }: { route: string }) => {
  switch (route) {
    case 'IV': return <Droplets className="w-4 h-4" />;
    case 'SC': case 'IM': return <Syringe className="w-4 h-4" />;
    case 'INH': return <Wind className="w-4 h-4" />;
    default: return <Pill className="w-4 h-4" />;
  }
};

const getRouteColor = (route: string) => {
  switch (route) {
    case 'IV': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
    case 'SC': case 'IM': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400';
    case 'INH': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400';
    default: return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
  }
};

const CollapsedColumn = ({ title, icon: Icon, color, count, onClick }: { title: string; icon: any; color: string; count: number; onClick: () => void }) => (
  <button onClick={onClick} className="w-10 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0">
    <div className={`p-1.5 rounded-lg ${color}`}><Icon className="w-4 h-4 text-white" /></div>
    <span className="mt-2 text-[10px] font-bold text-slate-500 [writing-mode:vertical-lr] rotate-180">{title}</span>
    <span className="mt-2 px-1.5 py-0.5 bg-slate-200 dark:bg-slate-600 rounded text-[10px] font-bold text-slate-600 dark:text-slate-300">{count}</span>
  </button>
);

const CategoryDropdown = ({ selectedCategory, onSelect, counts }: { selectedCategory: string; onSelect: (id: string) => void; counts: Record<string, number> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = categories.find(c => c.id === selectedCategory);
  const Icon = selected?.icon || Pill;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full">
        <Icon className="w-4 h-4 text-violet-500" />
        <span className="flex-1 text-left truncate">{selected?.name}</span>
        <span className="px-1.5 py-0.5 bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded text-xs font-bold">{counts[selectedCategory] || 0}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-20 overflow-hidden max-h-64 overflow-y-auto">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => { onSelect(cat.id); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-violet-50 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                  <CatIcon className="w-4 h-4" />
                  <span className="flex-1 text-left text-sm font-medium">{cat.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${isActive ? 'bg-violet-200 dark:bg-violet-500/30' : 'bg-slate-200 dark:bg-slate-600'}`}>{counts[cat.id] || 0}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================
// Main Component
// ============================================

export function MedicationsTab() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'schedule' | 'list'>('schedule');
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showHoldMeds, setShowHoldMeds] = useState(false);

  const medications = mockMedications;
  const administrations = useMemo(() => generateMockAdministrations(), []);

  // Date helpers
  const formatDate = (date: Date) => `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${(date.getFullYear() + 543).toString().slice(-2)}`;
  const formatDateDisplay = (date: Date) => {
    const days = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };
  const formatShortDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}`;
  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();
  const goToPreviousDay = () => setSelectedDate(prev => { const d = new Date(prev); d.setDate(d.getDate() - 1); return d; });
  const goToNextDay = () => setSelectedDate(prev => { const d = new Date(prev); d.setDate(d.getDate() + 1); return d; });
  const goToToday = () => setSelectedDate(new Date());

  // Filtered data
  const activeMeds = medications.filter(m => m.status === 'active');
  const holdMeds = medications.filter(m => m.status === 'hold');
  const highAlertMeds = activeMeds.filter(m => m.isHighAlert);
  const prnMeds = activeMeds.filter(m => m.isPRN);
  const scheduledMeds = activeMeds.filter(m => !m.isPRN && !m.isStat);

  const filteredMeds = useMemo(() => {
    return scheduledMeds.filter(m => {
      const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
      const matchesSearch = !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.genericName?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [scheduledMeds, selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: scheduledMeds.length };
    scheduledMeds.forEach(m => { counts[m.category] = (counts[m.category] || 0) + 1; });
    return counts;
  }, [scheduledMeds]);

  // Get admin status for specific date
  const getAdminStatus = (medId: number, time: string) => {
    const dateStr = formatDate(selectedDate);
    return administrations.find(a => a.oderId === medId && a.scheduledTime === time && a.scheduledDate === dateStr);
  };

  // Stats
  const stats = { total: activeMeds.length, highAlert: highAlertMeds.length, hold: holdMeds.length, prn: prnMeds.length };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header - Violet/Purple theme */}
      <div className="px-3 md:px-4 py-2 md:py-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 via-violet-50/50 to-purple-50/50 dark:from-slate-800 dark:to-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25"><Pill className="w-4 h-4 md:w-5 md:h-5" /></div>
            <div><h2 className="font-bold text-slate-800 dark:text-white text-sm md:text-base">MAR - Medication Administration</h2><p className="text-[10px] md:text-xs text-slate-500">บันทึกการให้ยา</p></div>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <span className="px-2 py-0.5 md:py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-[10px] md:text-xs"><span className="text-slate-500">Active:</span><span className="ml-1 font-bold text-slate-700 dark:text-slate-200">{stats.total}</span></span>
            {stats.highAlert > 0 && <span className="px-2 py-0.5 md:py-1 bg-rose-100 dark:bg-rose-500/20 rounded-lg text-[10px] md:text-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-rose-500" /><span className="font-bold text-rose-700 dark:text-rose-400">{stats.highAlert}</span></span>}
            {stats.hold > 0 && <span className="px-2 py-0.5 md:py-1 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-[10px] md:text-xs"><span className="text-amber-600">Hold:</span><span className="ml-1 font-bold text-amber-700">{stats.hold}</span></span>}
            {stats.prn > 0 && <span className="px-2 py-0.5 md:py-1 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-[10px] md:text-xs"><span className="text-blue-600">PRN:</span><span className="ml-1 font-bold text-blue-700">{stats.prn}</span></span>}
          </div>
        </div>
      </div>

      {/* High Alert Medications - Rose/Red theme */}
      {highAlertMeds.length > 0 && (
        <div className="mx-3 md:mx-4 mt-3 p-3 bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-500/10 dark:to-red-500/10 rounded-xl border border-rose-200 dark:border-rose-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-rose-500"><Shield className="w-4 h-4 text-white" /></div>
            <span className="text-rose-700 dark:text-rose-400 font-bold text-sm">High Alert Medications</span>
            <span className="text-xs text-rose-600 dark:text-rose-500">ต้องตรวจสอบซ้ำก่อนให้ยา</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {highAlertMeds.map(med => (
              <div key={med.id} className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-500/30 rounded-lg shadow-sm">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span className="text-base font-semibold text-slate-800 dark:text-white">{med.name}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getRouteColor(med.route)}`}>{med.route}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="px-3 md:px-4 py-2 md:py-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
          <div className="xl:hidden flex-shrink-0 md:w-48"><CategoryDropdown selectedCategory={selectedCategory} onSelect={setSelectedCategory} counts={categoryCounts} /></div>
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ค้นหายา..." className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" /></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button onClick={() => setViewMode('schedule')} className={`p-1.5 md:p-2 rounded-md transition-colors ${viewMode === 'schedule' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-700' : 'text-slate-500 hover:text-slate-700'}`}><LayoutGrid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 md:p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-700' : 'text-slate-500 hover:text-slate-700'}`}><LayoutList className="w-4 h-4" /></button>
            </div>
            {/* Date Navigation */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-1">
              <button onClick={goToPreviousDay} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><ChevronLeft className="w-4 h-4 text-slate-500" /></button>
              <div className="flex items-center gap-1.5 px-2 min-w-[100px] justify-center">
                <Calendar className="w-3.5 h-3.5 text-violet-500" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{formatDateDisplay(selectedDate)}</span>
                {isToday(selectedDate) && <span className="px-1 py-0.5 bg-violet-100 dark:bg-violet-500/20 text-violet-600 text-[9px] font-bold rounded">วันนี้</span>}
              </div>
              <button onClick={goToNextDay} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><ChevronRight className="w-4 h-4 text-slate-500" /></button>
            </div>
            {!isToday(selectedDate) && <button onClick={goToToday} className="px-2 py-1.5 text-sm font-semibold text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg">วันนี้</button>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-420px)] min-h-[400px] md:min-h-[450px]">
        {/* Column 1: Categories - Desktop */}
        {categoriesOpen ? (
          <div className="w-44 xl:w-48 border-r border-slate-200 dark:border-slate-700 bg-violet-50/30 dark:bg-slate-800/50 overflow-y-auto hidden xl:flex flex-col shrink-0">
            <div className="px-3 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2"><div className="p-1.5 rounded-lg bg-violet-500"><Filter className="w-3.5 h-3.5 text-white" /></div><span className="text-base font-bold text-slate-800 dark:text-white">หมวดยา</span></div>
              <button onClick={() => setCategoriesOpen(false)} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><PanelLeftClose className="w-4 h-4 text-slate-400" /></button>
            </div>
            <div className="p-2 flex-1 overflow-y-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                const colorMap: Record<string, string> = { red: 'text-red-600 bg-red-50', rose: 'text-rose-600 bg-rose-50', orange: 'text-orange-600 bg-orange-50', emerald: 'text-emerald-600 bg-emerald-50', blue: 'text-blue-600 bg-blue-50', slate: 'text-slate-600 bg-slate-100' };
                return (<button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-sm transition-all mb-1 ${isActive ? `${colorMap[cat.color] || colorMap.slate} font-semibold` : 'text-slate-600 hover:bg-slate-100'}`}><Icon className="w-4 h-4 flex-shrink-0" /><span className="flex-1 text-left truncate text-sm font-medium">{cat.name}</span><span className={`px-1.5 py-0.5 rounded text-xs font-bold ${isActive ? 'bg-white/50' : 'bg-slate-200'}`}>{categoryCounts[cat.id] || 0}</span></button>);
              })}
            </div>
          </div>
        ) : (<div className="hidden xl:block"><CollapsedColumn title="หมวดยา" icon={Filter} color="bg-violet-500" count={categories.length - 1} onClick={() => setCategoriesOpen(true)} /></div>)}

        {/* Column 2: MAR Schedule/List */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Schedule View */}
          {viewMode === 'schedule' && (
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-400 min-w-[180px] border-r border-b border-slate-200 dark:border-slate-700">
                      Medication
                    </th>
                    {timeSlots.map(time => (
                      <th key={time} className="px-1.5 py-3 text-center min-w-[95px] border-b border-slate-200 dark:border-slate-700">
                        <div className="inline-flex flex-col items-center bg-violet-50 dark:bg-violet-500/10 rounded-lg px-2 py-1 border border-violet-100 dark:border-violet-500/20">
                          <span className="text-xs font-bold text-violet-600 dark:text-violet-400">{formatShortDate(selectedDate)}</span>
                          <span className="text-base font-bold text-slate-700 dark:text-slate-200 tracking-wide">{time}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredMeds.map(med => (
                    <tr key={med.id} className={`hover:bg-slate-50 dark:hover:bg-slate-700/50 ${med.isHighAlert ? 'bg-rose-50/50 dark:bg-rose-500/5' : ''}`}>
                      <td className="sticky left-0 bg-white dark:bg-slate-800 px-3 py-2 border-r border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          {med.isHighAlert && <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-800 dark:text-white text-sm">{med.name}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${getRouteColor(med.route)}`}>{med.route}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{med.dose} • {med.frequency}</p>
                          </div>
                        </div>
                      </td>
                      {timeSlots.map(time => {
                        const isScheduled = med.schedule.includes(time);
                        const admin = isScheduled ? getAdminStatus(med.id, time) : null;
                        
                        return (
                          <td key={time} className="px-1.5 py-2 text-center">
                            {isScheduled ? (
                              admin?.status === 'given' ? (
                                <div className="inline-flex flex-col items-center bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-500/20 dark:to-emerald-500/10 rounded-xl p-2 border border-emerald-200 dark:border-emerald-500/30 shadow-sm shadow-emerald-500/10 min-w-[85px]">
                                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/30">
                                    <CheckCircle className="w-4 h-4 text-white" strokeWidth={3} />
                                  </div>
                                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-1.5 tracking-wide">{admin.givenTime}</span>
                                  <div className="flex items-center gap-1 mt-1 px-1.5 py-0.5 bg-emerald-200/50 dark:bg-emerald-500/20 rounded-md">
                                    <div className="w-3 h-3 rounded-full bg-emerald-400 flex items-center justify-center">
                                      <span className="text-[7px] text-white font-bold">N</span>
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 truncate max-w-[60px]" title={admin.givenBy}>{admin.givenBy?.replace('พย.', '')}</span>
                                  </div>
                                </div>
                              ) : admin?.status === 'skipped' ? (
                                <div className="inline-flex flex-col items-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-2 border border-slate-200 dark:border-slate-600 shadow-sm min-w-[85px]">
                                  <div className="w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center shadow-md shadow-slate-400/30">
                                    <XCircle className="w-4 h-4 text-white" strokeWidth={3} />
                                  </div>
                                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1.5">SKIP</span>
                                </div>
                              ) : (
                                <div className="inline-flex flex-col items-center bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-500/20 dark:to-orange-500/10 rounded-xl p-2 border border-amber-200 dark:border-amber-500/30 shadow-sm shadow-amber-500/10 min-w-[85px]">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/30 animate-pulse">
                                    <Clock className="w-4 h-4 text-white" strokeWidth={3} />
                                  </div>
                                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 mt-1.5">DUE</span>
                                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">รอให้ยา</span>
                                </div>
                              )
                            ) : (
                              <span className="text-slate-200 dark:text-slate-700 text-lg">•</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredMeds.length === 0 && (
                <div className="text-center py-12"><Pill className="w-12 h-12 mx-auto text-slate-300 mb-3" /><p className="text-slate-500">ไม่พบรายการยา</p></div>
              )}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="flex-1 overflow-auto p-3 space-y-2">
              {filteredMeds.map(med => (
                <div key={med.id} className={`p-3 rounded-xl border transition-all ${med.isHighAlert ? 'border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-sm'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${med.isHighAlert ? 'bg-rose-100 dark:bg-rose-500/20' : 'bg-violet-100 dark:bg-violet-500/20'}`}>
                        <RouteIcon route={med.route} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {med.isHighAlert && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                          <span className="font-bold text-base text-slate-800 dark:text-white">{med.name}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getRouteColor(med.route)}`}>{med.route}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">{med.genericName}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-sm">
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{med.dose}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">{med.frequency}</span>
                        </div>
                        {med.instruction && <p className="text-xs text-slate-400 mt-1 italic">{med.instruction}</p>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {med.schedule.map(time => {
                        const admin = getAdminStatus(med.id, time);
                        return (
                          <div key={time} className={`flex flex-col items-center px-3 py-2 rounded-xl border shadow-sm min-w-[70px] ${
                            admin?.status === 'given' 
                              ? 'bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-500/20 dark:to-emerald-500/10 border-emerald-200 dark:border-emerald-500/30' 
                              : 'bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 border-slate-200 dark:border-slate-600'
                          }`}>
                            <div className="flex items-center gap-1.5">
                              {admin?.status === 'given' ? (
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                                  <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-500 flex items-center justify-center">
                                  <Clock className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                              )}
                              <span className={`text-sm font-bold tracking-wide ${admin?.status === 'given' ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300'}`}>{time}</span>
                            </div>
                            {admin?.status === 'given' && (
                              <div className="flex items-center gap-1 mt-1 px-1.5 py-0.5 bg-emerald-200/50 dark:bg-emerald-500/20 rounded-md">
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{admin.givenBy?.replace('พย.', '')}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PRN & Hold Medications - Footer Section */}
      <div className="border-t border-slate-200 dark:border-slate-700">
        {/* PRN Medications */}
        {prnMeds.length > 0 && (
          <div className="px-3 md:px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-lg bg-blue-500"><Clock className="w-3.5 h-3.5 text-white" /></div>
              <span className="font-bold text-base text-slate-700 dark:text-slate-300">PRN Medications</span>
              <span className="text-sm text-slate-400">(เมื่อจำเป็น)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {prnMeds.map(med => (
                <div key={med.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${med.isHighAlert ? 'border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                  {med.isHighAlert && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                  <span className="text-base font-semibold text-slate-700 dark:text-slate-200">{med.name}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getRouteColor(med.route)}`}>{med.route}</span>
                  <span className="text-sm text-slate-500">{med.dose}</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs rounded">{med.prnReason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hold Medications */}
        {holdMeds.length > 0 && (
          <div className="px-3 md:px-4 py-2">
            <button onClick={() => setShowHoldMeds(!showHoldMeds)} className="w-full flex items-center justify-between py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-amber-500"><XCircle className="w-3.5 h-3.5 text-white" /></div>
                <span className="font-bold text-base text-amber-700 dark:text-amber-400">Hold Medications ({holdMeds.length})</span>
              </div>
              {showHoldMeds ? <ChevronDown className="w-5 h-5 text-amber-500" /> : <ChevronRight className="w-5 h-5 text-amber-500" />}
            </button>
            {showHoldMeds && (
              <div className="mt-2 space-y-1">
                {holdMeds.map(med => (
                  <div key={med.id} className="flex items-center justify-between py-2 px-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-slate-500 line-through">{med.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getRouteColor(med.route)}`}>{med.route}</span>
                    </div>
                    <span className="text-sm text-amber-600 dark:text-amber-400">{med.instruction}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="px-3 md:px-4 py-2 flex flex-wrap items-center gap-4 text-sm text-slate-500 border-t border-slate-100 dark:border-slate-700">
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Given</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-500" /> Due</span>
          <span className="flex items-center gap-1.5"><XCircle className="w-4 h-4 text-slate-400" /> Skipped</span>
          <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-rose-500" /> High Alert</span>
        </div>
      </div>
    </div>
  );
}