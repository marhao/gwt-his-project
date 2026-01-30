'use client';

import { useState } from 'react';
import {
  Clock, CheckCircle, XCircle, AlertTriangle, User, Pill, TestTube, Stethoscope,
  Droplets, Thermometer, Heart, Activity, FileText, Plus, ChevronRight,
  Syringe, Clipboard, Bell, Coffee, Moon, Sun, Timer, TrendingUp, TrendingDown,
  Edit3, MessageSquare, AlertCircle, Check, X,
} from 'lucide-react';

// Types
interface NursingTask {
  id: number;
  type: 'medication' | 'lab' | 'procedure' | 'vital' | 'care' | 'assessment';
  title: string;
  description?: string;
  scheduledTime: string;
  status: 'pending' | 'completed' | 'overdue' | 'skipped';
  priority: 'routine' | 'urgent' | 'stat';
  completedTime?: string;
  completedBy?: string;
  note?: string;
}

interface IORecord {
  id: number;
  time: string;
  intake: { type: string; amount: number; route: string }[];
  output: { type: string; amount: number }[];
}

interface NursingNote {
  id: number;
  time: string;
  author: string;
  content: string;
  category: 'observation' | 'intervention' | 'evaluation' | 'communication';
}

// Mock Data
const mockTasks: NursingTask[] = [
  // Morning Tasks
  { id: 1, type: 'vital', title: 'Vital Signs', description: 'Record V/S', scheduledTime: '06:00', status: 'completed', priority: 'routine', completedTime: '06:05', completedBy: 'พยาบาลสมหญิง' },
  { id: 2, type: 'medication', title: 'Omeprazole 40mg IV', description: 'ก่อนอาหารเช้า', scheduledTime: '06:00', status: 'completed', priority: 'routine', completedTime: '06:10', completedBy: 'พยาบาลสมหญิง' },
  { id: 3, type: 'lab', title: 'CBC, Cardiac Enzyme', description: 'STAT Lab', scheduledTime: '06:00', status: 'completed', priority: 'stat', completedTime: '06:15', completedBy: 'พยาบาลสมหญิง' },
  { id: 4, type: 'medication', title: 'Aspirin 81mg PO', description: 'หลังอาหารเช้า', scheduledTime: '08:00', status: 'completed', priority: 'routine', completedTime: '08:05', completedBy: 'พยาบาลสมหญิง' },
  { id: 5, type: 'medication', title: 'Clopidogrel 75mg PO', description: 'หลังอาหารเช้า', scheduledTime: '08:00', status: 'completed', priority: 'routine', completedTime: '08:05', completedBy: 'พยาบาลสมหญิง' },
  { id: 6, type: 'medication', title: 'Enoxaparin 60mg SC', description: 'ฉีดหน้าท้อง', scheduledTime: '08:00', status: 'completed', priority: 'urgent', completedTime: '08:10', completedBy: 'พยาบาลสมหญิง' },
  { id: 7, type: 'medication', title: 'Metoprolol 50mg PO', description: 'Check HR > 60', scheduledTime: '08:00', status: 'completed', priority: 'routine', completedTime: '08:05', completedBy: 'พยาบาลสมหญิง' },
  { id: 8, type: 'vital', title: 'Vital Signs', description: 'Record V/S', scheduledTime: '10:00', status: 'completed', priority: 'routine', completedTime: '10:05', completedBy: 'พยาบาลสมหญิง' },
  
  // Afternoon Tasks
  { id: 9, type: 'medication', title: 'Metformin 500mg PO', description: 'หลังอาหารกลางวัน (HOLD)', scheduledTime: '12:00', status: 'skipped', priority: 'routine', note: 'Hold ก่อน CAG' },
  { id: 10, type: 'vital', title: 'Vital Signs', description: 'Record V/S', scheduledTime: '14:00', status: 'pending', priority: 'routine' },
  { id: 11, type: 'procedure', title: 'Coronary Angiography', description: 'เตรียมตัวก่อน CAG', scheduledTime: '14:30', status: 'pending', priority: 'urgent' },
  { id: 12, type: 'lab', title: 'Electrolyte', description: 'Pre-CAG', scheduledTime: '14:00', status: 'pending', priority: 'routine' },
  
  // Evening Tasks
  { id: 13, type: 'medication', title: 'Metformin 500mg PO', description: 'หลังอาหารเย็น (HOLD)', scheduledTime: '18:00', status: 'pending', priority: 'routine' },
  { id: 14, type: 'vital', title: 'Vital Signs', description: 'Record V/S', scheduledTime: '18:00', status: 'pending', priority: 'routine' },
  { id: 15, type: 'medication', title: 'Enoxaparin 60mg SC', description: 'ฉีดหน้าท้อง', scheduledTime: '20:00', status: 'pending', priority: 'urgent' },
  { id: 16, type: 'medication', title: 'Metoprolol 50mg PO', description: 'Check HR > 60', scheduledTime: '20:00', status: 'pending', priority: 'routine' },
  { id: 17, type: 'medication', title: 'Atorvastatin 40mg PO', description: 'ก่อนนอน', scheduledTime: '21:00', status: 'pending', priority: 'routine' },
  { id: 18, type: 'vital', title: 'Vital Signs', description: 'Record V/S', scheduledTime: '22:00', status: 'pending', priority: 'routine' },
  { id: 19, type: 'medication', title: 'Insulin Glargine 10u SC', description: 'ก่อนนอน', scheduledTime: '22:00', status: 'pending', priority: 'urgent' },
  
  // Assessments
  { id: 20, type: 'assessment', title: 'Fall Risk Assessment', description: 'ประเมินความเสี่ยงพลัดตก', scheduledTime: '08:00', status: 'completed', priority: 'routine', completedTime: '08:30', completedBy: 'พยาบาลสมหญิง' },
  { id: 21, type: 'assessment', title: 'Pain Assessment', description: 'ประเมินความปวด', scheduledTime: '08:00', status: 'completed', priority: 'routine', completedTime: '08:30', completedBy: 'พยาบาลสมหญิง' },
  { id: 22, type: 'care', title: 'Bed Bath', description: 'อาบน้ำบนเตียง', scheduledTime: '09:00', status: 'completed', priority: 'routine', completedTime: '09:30', completedBy: 'ผู้ช่วยพยาบาล' },
];

const mockIORecords: IORecord[] = [
  {
    id: 1,
    time: '06:00-14:00',
    intake: [
      { type: 'NSS 0.9%', amount: 500, route: 'IV' },
      { type: 'Water', amount: 200, route: 'Oral' },
      { type: 'Soft diet', amount: 300, route: 'Oral' },
    ],
    output: [
      { type: 'Urine', amount: 450 },
    ],
  },
];

const mockNursingNotes: NursingNote[] = [
  { id: 1, time: '08:30', author: 'พยาบาลสมหญิง', content: 'ผู้ป่วยรู้สึกตัวดี ไม่มีอาการเจ็บหน้าอก V/S stable O2 sat 98% RA', category: 'observation' },
  { id: 2, time: '10:00', author: 'พยาบาลสมหญิง', content: 'แพทย์มาตรวจ วางแผน CAG วันนี้ 14:30 น. อธิบายขั้นตอนให้ผู้ป่วยและญาติทราบ', category: 'communication' },
  { id: 3, time: '12:00', author: 'พยาบาลสมหญิง', content: 'ผู้ป่วยรับประทานอาหารกลางวันได้ 80% งดน้ำหลังเที่ยง เตรียม CAG', category: 'intervention' },
];

// Time slots for shift
const timeSlots = {
  morning: ['06:00', '08:00', '10:00', '12:00'],
  afternoon: ['14:00', '16:00', '18:00'],
  night: ['20:00', '22:00', '00:00', '02:00', '04:00'],
};

export function NursingTab() {
  const [selectedShift, setSelectedShift] = useState<'morning' | 'afternoon' | 'night'>('morning');
  const [tasks, setTasks] = useState<NursingTask[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<NursingTask | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [activeView, setActiveView] = useState<'tasks' | 'io' | 'notes'>('tasks');
  const [newNote, setNewNote] = useState('');

  // Current time for highlighting
  const currentHour = new Date().getHours();
  const getCurrentShift = () => {
    if (currentHour >= 6 && currentHour < 14) return 'morning';
    if (currentHour >= 14 && currentHour < 22) return 'afternoon';
    return 'night';
  };

  // Filter tasks by time range
  const getTasksForShift = (shift: 'morning' | 'afternoon' | 'night') => {
    const ranges = {
      morning: { start: 6, end: 14 },
      afternoon: { start: 14, end: 22 },
      night: { start: 22, end: 6 },
    };
    const range = ranges[shift];
    
    return tasks.filter(task => {
      const hour = parseInt(task.scheduledTime.split(':')[0]);
      if (shift === 'night') {
        return hour >= 22 || hour < 6;
      }
      return hour >= range.start && hour < range.end;
    });
  };

  // Get tasks grouped by time
  const getTasksByTime = (shiftTasks: NursingTask[]) => {
    const grouped: Record<string, NursingTask[]> = {};
    shiftTasks.forEach(task => {
      if (!grouped[task.scheduledTime]) {
        grouped[task.scheduledTime] = [];
      }
      grouped[task.scheduledTime].push(task);
    });
    return grouped;
  };

  // Stats
  const shiftTasks = getTasksForShift(selectedShift);
  const completedCount = shiftTasks.filter(t => t.status === 'completed').length;
  const pendingCount = shiftTasks.filter(t => t.status === 'pending').length;
  const overdueCount = shiftTasks.filter(t => t.status === 'overdue').length;
  const skippedCount = shiftTasks.filter(t => t.status === 'skipped').length;

  // Task type icon
  const TaskIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'medication': return <Pill className="w-4 h-4" />;
      case 'lab': return <TestTube className="w-4 h-4" />;
      case 'procedure': return <Stethoscope className="w-4 h-4" />;
      case 'vital': return <Activity className="w-4 h-4" />;
      case 'care': return <Heart className="w-4 h-4" />;
      case 'assessment': return <Clipboard className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Task type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400';
      case 'lab': return 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400';
      case 'procedure': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400';
      case 'vital': return 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400';
      case 'care': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'assessment': return 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400';
    }
  };

  // Status badge
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed':
        return <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-lg"><CheckCircle className="w-3.5 h-3.5" /> Done</span>;
      case 'pending':
        return <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium rounded-lg"><Clock className="w-3.5 h-3.5" /> Pending</span>;
      case 'overdue':
        return <span className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium rounded-lg animate-pulse"><AlertTriangle className="w-3.5 h-3.5" /> Overdue</span>;
      case 'skipped':
        return <span className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs font-medium rounded-lg"><XCircle className="w-3.5 h-3.5" /> Skipped</span>;
      default:
        return null;
    }
  };

  // Complete task handler
  const handleCompleteTask = (taskId: number) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, status: 'completed' as const, completedTime: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), completedBy: 'พยาบาลปัจจุบัน' }
        : t
    ));
    setShowCompleteModal(false);
    setSelectedTask(null);
  };

  // Skip task handler
  const handleSkipTask = (taskId: number, reason: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, status: 'skipped' as const, note: reason }
        : t
    ));
    setShowCompleteModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="space-y-4">
      {/* Header with Shift Selection */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-slate-800 dark:text-white">Nursing Workstation</h3>
              <p className="text-sm text-slate-500">พยาบาลสมหญิง ใจดี • Ward อายุรกรรมชาย 1</p>
            </div>
          </div>

          {/* Shift Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
            <button
              onClick={() => setSelectedShift('morning')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedShift === 'morning'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span className="hidden sm:inline">เช้า</span>
              <span className="text-xs opacity-75">06-14</span>
            </button>
            <button
              onClick={() => setSelectedShift('afternoon')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedShift === 'afternoon'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span className="hidden sm:inline">บ่าย</span>
              <span className="text-xs opacity-75">14-22</span>
            </button>
            <button
              onClick={() => setSelectedShift('night')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedShift === 'night'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span className="hidden sm:inline">ดึก</span>
              <span className="text-xs opacity-75">22-06</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{completedCount}</div>
            <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70">เสร็จแล้ว</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-500/10 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</div>
            <div className="text-xs text-amber-600/70 dark:text-amber-400/70">รอดำเนินการ</div>
          </div>
          <div className="bg-red-50 dark:bg-red-500/10 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{overdueCount}</div>
            <div className="text-xs text-red-600/70 dark:text-red-400/70">เลยกำหนด</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">{skippedCount}</div>
            <div className="text-xs text-slate-500">งด/Skip</div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveView('tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'tasks'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Clipboard className="w-4 h-4" />
          งานประจำเวร
        </button>
        <button
          onClick={() => setActiveView('io')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'io'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Droplets className="w-4 h-4" />
          I/O Chart
        </button>
        <button
          onClick={() => setActiveView('notes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'notes'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          <FileText className="w-4 h-4" />
          บันทึกการพยาบาล
        </button>
      </div>

      {/* Tasks View */}
      {activeView === 'tasks' && (
        <div className="space-y-4">
          {/* Timeline */}
          {Object.entries(getTasksByTime(shiftTasks))
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([time, timeTasks]) => {
              const allCompleted = timeTasks.every(t => t.status === 'completed' || t.status === 'skipped');
              const hasUrgent = timeTasks.some(t => t.priority === 'urgent' || t.priority === 'stat');
              
              return (
                <div key={time} className="relative">
                  {/* Time Header */}
                  <div className="sticky top-0 z-10 flex items-center gap-3 mb-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      allCompleted
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                        : hasUrgent
                          ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      <Clock className="w-4 h-4" />
                      {time}
                    </div>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    <span className="text-xs text-slate-400">{timeTasks.length} งาน</span>
                  </div>

                  {/* Tasks Grid */}
                  <div className="grid gap-2">
                    {timeTasks.map(task => (
                      <div
                        key={task.id}
                        className={`bg-white dark:bg-slate-800 rounded-xl border p-4 transition-all hover:shadow-md cursor-pointer ${
                          task.status === 'completed'
                            ? 'border-emerald-200 dark:border-emerald-500/30'
                            : task.status === 'overdue'
                              ? 'border-red-300 dark:border-red-500/50 bg-red-50 dark:bg-red-500/5'
                              : task.status === 'skipped'
                                ? 'border-slate-200 dark:border-slate-700 opacity-60'
                                : task.priority === 'stat'
                                  ? 'border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/5'
                                  : task.priority === 'urgent'
                                    ? 'border-amber-200 dark:border-amber-500/30'
                                    : 'border-slate-200 dark:border-slate-700'
                        }`}
                        onClick={() => {
                          if (task.status === 'pending') {
                            setSelectedTask(task);
                            setShowCompleteModal(true);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            {/* Type Icon */}
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTypeColor(task.type)}`}>
                              <TaskIcon type={task.type} />
                            </div>
                            
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                {task.priority === 'stat' && (
                                  <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded animate-pulse">STAT</span>
                                )}
                                {task.priority === 'urgent' && (
                                  <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded">URGENT</span>
                                )}
                                <span className={`font-medium text-sm ${task.status === 'skipped' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                                  {task.title}
                                </span>
                              </div>
                              {task.description && (
                                <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
                              )}
                              {task.completedTime && (
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                                  ✓ {task.completedTime} โดย {task.completedBy}
                                </p>
                              )}
                              {task.note && task.status === 'skipped' && (
                                <p className="text-xs text-slate-400 mt-1 italic">หมายเหตุ: {task.note}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <StatusBadge status={task.status} />
                            {task.status === 'pending' && (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* I/O Chart View */}
      {activeView === 'io' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-base text-slate-800 dark:text-white">Intake / Output Chart</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-lg">
              <Plus className="w-4 h-4" /> เพิ่ม I/O
            </button>
          </div>
          
          <div className="p-4">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Intake</span>
                </div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">1,000 ml</div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-500/10 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-medium">Output</span>
                </div>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">450 ml</div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">Balance</span>
                </div>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">+550 ml</div>
              </div>
            </div>

            {/* I/O Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">เวลา</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">Intake</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-600 dark:text-slate-400">ml</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">Output</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-600 dark:text-slate-400">ml</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                <tr>
                  <td className="px-4 py-3 text-slate-800 dark:text-white font-medium">06:00</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">NSS 0.9% (IV)</td>
                  <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400 font-medium">500</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Urine</td>
                  <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400 font-medium">200</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-800 dark:text-white font-medium">08:00</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Water (Oral)</td>
                  <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400 font-medium">200</td>
                  <td className="px-4 py-3 text-slate-400">-</td>
                  <td className="px-4 py-3 text-right text-slate-400">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-800 dark:text-white font-medium">08:30</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Soft diet (Oral)</td>
                  <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400 font-medium">300</td>
                  <td className="px-4 py-3 text-slate-400">-</td>
                  <td className="px-4 py-3 text-right text-slate-400">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-800 dark:text-white font-medium">10:00</td>
                  <td className="px-4 py-3 text-slate-400">-</td>
                  <td className="px-4 py-3 text-right text-slate-400">-</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Urine</td>
                  <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400 font-medium">250</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 dark:bg-slate-800/50 font-semibold">
                  <td className="px-4 py-3 text-slate-800 dark:text-white">รวม</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400">1,000</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">450</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Nursing Notes View */}
      {activeView === 'notes' && (
        <div className="space-y-4">
          {/* Add Note Form */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <Edit3 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="บันทึกการพยาบาล..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    {['observation', 'intervention', 'evaluation', 'communication'].map(cat => (
                      <button
                        key={cat}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
                      >
                        {cat === 'observation' && '👁️ สังเกต'}
                        {cat === 'intervention' && '💉 การพยาบาล'}
                        {cat === 'evaluation' && '📊 ประเมิน'}
                        {cat === 'communication' && '💬 สื่อสาร'}
                      </button>
                    ))}
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg">
                    <Plus className="w-4 h-4" /> บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-3">
            {mockNursingNotes.map(note => (
              <div key={note.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    note.category === 'observation' ? 'bg-blue-100 dark:bg-blue-500/20' :
                    note.category === 'intervention' ? 'bg-purple-100 dark:bg-purple-500/20' :
                    note.category === 'evaluation' ? 'bg-emerald-100 dark:bg-emerald-500/20' :
                    'bg-amber-100 dark:bg-amber-500/20'
                  }`}>
                    {note.category === 'observation' && <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                    {note.category === 'intervention' && <Syringe className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                    {note.category === 'evaluation' && <Clipboard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                    {note.category === 'communication' && <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">{note.time}</span>
                      <span className="text-xs text-slate-500">{note.author}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{note.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete Task Modal */}
      {showCompleteModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(selectedTask.type)}`}>
                <TaskIcon type={selectedTask.type} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-800 dark:text-white">{selectedTask.title}</h3>
                <p className="text-sm text-slate-500">{selectedTask.scheduledTime} • {selectedTask.description}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <textarea
                placeholder="หมายเหตุ (ถ้ามี)..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white resize-none"
                rows={2}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCompleteModal(false);
                  setSelectedTask(null);
                }}
                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-xl"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleSkipTask(selectedTask.id, 'แพทย์สั่งงด')}
                className="flex-1 px-4 py-2.5 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" /> งด/Skip
              </button>
              <button
                onClick={() => handleCompleteTask(selectedTask.id)}
                className="flex-1 px-4 py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" /> เสร็จสิ้น
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 px-1">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500" /> ยา
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-pink-500" /> Lab
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500" /> หัตถการ
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" /> V/S
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500" /> ดูแล
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500" /> ประเมิน
        </span>
      </div>
    </div>
  );
}