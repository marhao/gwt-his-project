'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  Activity, ThermometerSun, Heart, Wind, Droplets, X,
  ArrowLeft, MousePointer2, Type, MoveRight, Pencil, Undo2, Redo2,
  Trash2, Save, Loader2, ZoomIn, ZoomOut, Eraser, Printer, Download,
  Check, ChevronLeft, ChevronRight, TrendingUp,
  Pill, Beaker, Maximize2, BarChart3, Scale, Utensils,
} from 'lucide-react';

// ============================================
// Types
// ============================================

type AnnotationTool = 'select' | 'text' | 'arrow' | 'freehand';
type DayRange = 1 | 3 | 5 | 7;
type Shift = 'night' | 'morning' | 'afternoon';

interface VitalReading {
  time: string;
  temperature?: number;
  pulse?: number;
  respiratoryRate?: number;
  bpSystolic?: number;
  bpDiastolic?: number;
  sosScore?: number;
  o2Saturation?: number;
  o2Therapy?: string;
  painScore?: number;
}

interface ShiftFluid {
  shift: Shift;
  oralFluid?: number;
  parenteral?: number;
  totalIntake?: number;
  urine?: number;
  drainage?: number;
  totalOutput?: number;
}

interface MedicationRecord {
  time: string;
  continuousDose?: string;
  prnDose?: string;
}

interface TPRDayRecord {
  id: number;
  date: string;
  dateShort: string;
  dayAdmission: number;
  dayAfterOperation?: number;
  vitals: VitalReading[];
  fluids: ShiftFluid[];
  medications: MedicationRecord[];
  weight?: number;
  height?: number;
  diet?: string;
  stool?: string;
  patientType?: 'CI' | 'SI' | 'MI' | 'CL';
}

interface TextAnnotation {
  id: string;
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
}

interface ArrowAnnotation {
  id: string;
  type: 'arrow';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  strokeWidth: number;
}

interface FreehandAnnotation {
  id: string;
  type: 'freehand';
  points: { x: number; y: number }[];
  color: string;
  strokeWidth: number;
}

type AllAnnotation = TextAnnotation | ArrowAnnotation | FreehandAnnotation;

// ============================================
// Constants
// ============================================

const TIME_SLOTS = ['02:00', '06:00', '10:00', '14:00', '18:00', '22:00'];
const TIME_LABELS = ['2', '6', '10', '14', '18', '22'];
const SHIFTS: { key: Shift; labelTh: string; timeRange: string }[] = [
  { key: 'night', labelTh: 'ดึก', timeRange: '22-06' },
  { key: 'morning', labelTh: 'เช้า', timeRange: '06-14' },
  { key: 'afternoon', labelTh: 'บ่าย', timeRange: '14-22' },
];
const TEMP_MIN = 35;
const TEMP_MAX = 41;
const PULSE_MIN = 40;
const PULSE_MAX = 140;
const ANNOTATION_COLORS = [
  { color: '#0d9488', name: 'Teal' },
  { color: '#0891b2', name: 'Cyan' },
  { color: '#3b82f6', name: 'Blue' },
  { color: '#6366f1', name: 'Indigo' },
  { color: '#8b5cf6', name: 'Violet' },
  { color: '#64748b', name: 'Slate' },
  { color: '#1e293b', name: 'Dark' },
];
const MAX_HISTORY = 50;
const DAY_RANGE_OPTIONS: { value: DayRange; label: string }[] = [
  { value: 1, label: '1 วัน' },
  { value: 3, label: '3 วัน' },
  { value: 5, label: '5 วัน' },
  { value: 7, label: '7 วัน' },
];

const PATIENT_TYPES = {
  CI: { label: 'CI', fullLabel: 'ผู้ป่วยหนัก', bg: 'bg-red-600 dark:bg-red-500' },
  SI: { label: 'SI', fullLabel: 'ผู้ป่วยกึ่งหนัก', bg: 'bg-amber-600 dark:bg-amber-500' },
  MI: { label: 'MI', fullLabel: 'ผู้ป่วยระดับปานกลาง', bg: 'bg-sky-600 dark:bg-sky-500' },
  CL: { label: 'CL', fullLabel: 'ผู้ป่วยระยะพักฟื้น', bg: 'bg-emerald-600 dark:bg-emerald-500' },
};

const MEDICATION_CODES = [
  { code: 'Mi', name: 'MO-IR or MO syrup' },
  { code: 'Ms', name: 'MST' },
  { code: 'M', name: 'Morphine IV' },
  { code: 'P', name: 'Pethidine' },
  { code: 'T', name: 'Tramadol' },
  { code: 'F', name: 'Fentanyl' },
  { code: 'D', name: 'Diclofenac' },
];

// ============================================
// Mock Data Generator
// ============================================

const generateMockTPRRecords = (): TPRDayRecord[] => {
  const records: TPRDayRecord[] = [];
  const baseDate = new Date(2024, 0, 21);
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    const isFebrile = i >= 7 && i <= 8;
    const isRecovering = i >= 3 && i <= 6;
    const isStable = i < 3;
    
    const vitals: VitalReading[] = TIME_SLOTS.map((time, idx) => {
      let baseTemp = 37.0, basePulse = 75, basePain = 2;
      
      if (isFebrile) {
        baseTemp = 38.2 + Math.random() * 0.8;
        basePulse = 95 + Math.random() * 15;
        basePain = 5 + Math.floor(Math.random() * 3);
      } else if (isRecovering) {
        baseTemp = 37.2 + Math.random() * 0.5;
        basePulse = 78 + Math.random() * 12;
        basePain = 3 + Math.floor(Math.random() * 2);
      } else if (isStable) {
        baseTemp = 36.5 + Math.random() * 0.4;
        basePulse = 70 + Math.random() * 10;
        basePain = 1 + Math.floor(Math.random() * 2);
      }
      
      if (idx >= 2 && idx <= 4) { baseTemp += 0.2; basePulse += 5; }
      
      return {
        time,
        temperature: Math.round(baseTemp * 10) / 10,
        pulse: Math.round(basePulse),
        respiratoryRate: 16 + Math.floor(Math.random() * 6),
        bpSystolic: 115 + Math.floor(Math.random() * 25),
        bpDiastolic: 70 + Math.floor(Math.random() * 15),
        sosScore: isFebrile ? 3 : isRecovering ? 2 : 1,
        o2Saturation: 96 + Math.floor(Math.random() * 4),
        o2Therapy: isFebrile || isRecovering ? 'Cannula 3L' : undefined,
        painScore: basePain,
      };
    });
    
    const fluids: ShiftFluid[] = SHIFTS.map(shift => {
      const oral = 200 + Math.floor(Math.random() * 300);
      const parenteral = 300 + Math.floor(Math.random() * 400);
      const urine = 400 + Math.floor(Math.random() * 400);
      const drainage = Math.floor(Math.random() * 100);
      return { shift: shift.key, oralFluid: oral, parenteral, totalIntake: oral + parenteral, urine, drainage, totalOutput: urine + drainage };
    });
    
    const medications: MedicationRecord[] = TIME_SLOTS.map(time => ({
      time,
      continuousDose: i > 5 ? 'M 2mg' : undefined,
      prnDose: Math.random() > 0.7 ? 'T 50mg' : undefined,
    }));
    
    records.push({
      id: i + 1,
      date: `${day}/${month}/2567`,
      dateShort: `${day}/${month}`,
      dayAdmission: 10 - i,
      dayAfterOperation: i <= 6 ? 7 - i : undefined,
      vitals, fluids, medications,
      weight: 65, height: 170,
      diet: i > 7 ? 'NPO' : i > 5 ? 'Clear liquid' : i > 3 ? 'Soft diet' : 'Regular',
      stool: Math.random() > 0.5 ? '1' : '-',
      patientType: i > 7 ? 'CI' : i > 5 ? 'SI' : i > 2 ? 'MI' : 'CL',
    });
  }
  return records;
};

const mockTPRRecords = generateMockTPRRecords();

// ============================================
// Helper Components
// ============================================

const PatientTypeBadge = ({ type, size = 'sm' }: { type?: 'CI' | 'SI' | 'MI' | 'CL'; size?: 'sm' | 'lg' }) => {
  if (!type) return null;
  const config = PATIENT_TYPES[type];
  return (
    <span className={`${config.bg} text-white font-semibold rounded ${size === 'lg' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'}`} title={config.fullLabel}>
      {config.label}
    </span>
  );
};

// ============================================
// TPR Graph Component (Soft Colors)
// ============================================

const TPRGraph = ({ records, dayRange, width = 1000, height = 300 }: { records: TPRDayRecord[]; dayRange: DayRange; width?: number; height?: number }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: any } | null>(null);
  
  const padding = { top: 25, right: 45, bottom: 20, left: 50 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;
  const dayWidth = graphWidth / dayRange;
  const timeSlotWidth = dayWidth / 6;
  
  const tempToY = (temp: number) => padding.top + graphHeight - ((temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN) * graphHeight);
  const pulseToY = (pulse: number) => padding.top + graphHeight - ((pulse - PULSE_MIN) / (PULSE_MAX - PULSE_MIN) * graphHeight);
  const getX = (dayIndex: number, timeIndex: number) => padding.left + (dayIndex * dayWidth) + (timeIndex * timeSlotWidth) + (timeSlotWidth / 2);
  
  const displayRecords = records.slice(0, dayRange).reverse();
  
  const tempPoints: { x: number; y: number; value: number; record: TPRDayRecord; vital: VitalReading }[] = [];
  const pulsePoints: { x: number; y: number; value: number; record: TPRDayRecord; vital: VitalReading }[] = [];
  
  displayRecords.forEach((record, dayIndex) => {
    record.vitals.forEach((vital, timeIndex) => {
      const x = getX(dayIndex, timeIndex);
      if (vital.temperature) tempPoints.push({ x, y: tempToY(vital.temperature), value: vital.temperature, record, vital });
      if (vital.pulse) pulsePoints.push({ x, y: pulseToY(vital.pulse), value: vital.pulse, record, vital });
    });
  });
  
  const tempPath = tempPoints.length > 1 ? `M ${tempPoints.map(p => `${p.x},${p.y}`).join(' L ')}` : '';
  const pulsePath = pulsePoints.length > 1 ? `M ${pulsePoints.map(p => `${p.x},${p.y}`).join(' L ')}` : '';

  return (
    <div className="relative">
      <svg width={width} height={height} className="font-sans">
        <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} className="fill-slate-50 dark:fill-slate-800/50" stroke="currentColor" strokeOpacity={0.1} />
        
        {displayRecords.map((_, dayIndex) => {
          if (dayIndex === 0) return null;
          const x = padding.left + (dayIndex * dayWidth);
          return <line key={`day-sep-${dayIndex}`} x1={x} y1={padding.top} x2={x} y2={padding.top + graphHeight} className="stroke-teal-400 dark:stroke-teal-600" strokeWidth={1} strokeDasharray="4,4" />;
        })}
        
        {displayRecords.map((_, dayIndex) => (
          TIME_SLOTS.map((_, timeIndex) => {
            if (timeIndex === 0) return null;
            const x = padding.left + (dayIndex * dayWidth) + (timeIndex * timeSlotWidth);
            return <line key={`time-${dayIndex}-${timeIndex}`} x1={x} y1={padding.top} x2={x} y2={padding.top + graphHeight} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth={0.5} />;
          })
        ))}
        
        {[35, 36, 37, 38, 39, 40, 41].map(temp => (
          <g key={`temp-${temp}`}>
            <line x1={padding.left} y1={tempToY(temp)} x2={padding.left + graphWidth} y2={tempToY(temp)} className={temp === 37 ? 'stroke-emerald-400 dark:stroke-emerald-500' : 'stroke-slate-200 dark:stroke-slate-700'} strokeWidth={temp === 37 ? 1.5 : 0.5} strokeDasharray={temp === 37 ? '0' : '2,2'} />
            <text x={padding.left - 5} y={tempToY(temp) + 4} textAnchor="end" fontSize={9} className="fill-slate-500 dark:fill-slate-400">{temp}</text>
          </g>
        ))}
        
        {[40, 60, 80, 100, 120, 140].map((pulse, idx) => (
          <text key={`pulse-${pulse}`} x={padding.left - 28} y={tempToY([35, 36, 37, 38, 39, 40, 41][idx] || 35) + 4} textAnchor="end" fontSize={9} className="fill-rose-400 dark:fill-rose-300">{pulse}</text>
        ))}
        
        <line x1={padding.left} y1={tempToY(38)} x2={padding.left + graphWidth} y2={tempToY(38)} className="stroke-rose-300 dark:stroke-rose-400" strokeWidth={1} strokeDasharray="4,2" />
        
        {tempPath && <path d={tempPath} fill="none" className="stroke-teal-500 dark:stroke-teal-400" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}
        
        {tempPoints.map((p, i) => (
          <circle key={`temp-pt-${i}`} cx={p.x} cy={p.y} r={dayRange <= 3 ? 5 : 3} className={`cursor-pointer transition-transform hover:scale-125 ${p.value >= 38 ? 'fill-rose-500 dark:fill-rose-400' : 'fill-teal-500 dark:fill-teal-400'}`} onMouseEnter={() => setHoveredPoint({ x: p.x, y: p.y, data: { type: 'temp', ...p } })} onMouseLeave={() => setHoveredPoint(null)} />
        ))}
        
        {pulsePath && <path d={pulsePath} fill="none" className="stroke-rose-400 dark:stroke-rose-300" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />}
        
        {pulsePoints.map((p, i) => (
          <g key={`pulse-pt-${i}`} className="cursor-pointer" onMouseEnter={() => setHoveredPoint({ x: p.x, y: p.y, data: { type: 'pulse', ...p } })} onMouseLeave={() => setHoveredPoint(null)}>
            <line x1={p.x - 3} y1={p.y - 3} x2={p.x + 3} y2={p.y + 3} className="stroke-rose-400 dark:stroke-rose-300" strokeWidth={2} />
            <line x1={p.x + 3} y1={p.y - 3} x2={p.x - 3} y2={p.y + 3} className="stroke-rose-400 dark:stroke-rose-300" strokeWidth={2} />
          </g>
        ))}
        
        <g transform={`translate(${padding.left + 5}, ${padding.top + 5})`}>
          <rect x={0} y={0} width={120} height={22} rx={4} className="fill-white/90 dark:fill-slate-800/90" stroke="currentColor" strokeOpacity={0.1} />
          <circle cx={12} cy={11} r={4} className="fill-teal-500 dark:fill-teal-400" />
          <text x={20} y={14} fontSize={9} className="fill-teal-600 dark:fill-teal-300">Temp (°C)</text>
          <g transform="translate(75, 11)">
            <line x1={-3} y1={-3} x2={3} y2={3} className="stroke-rose-400 dark:stroke-rose-300" strokeWidth={1.5} />
            <line x1={3} y1={-3} x2={-3} y2={3} className="stroke-rose-400 dark:stroke-rose-300" strokeWidth={1.5} />
          </g>
          <text x={85} y={14} fontSize={9} className="fill-rose-500 dark:fill-rose-300">Pulse</text>
        </g>
      </svg>
      
      {hoveredPoint && (
        <div className="absolute bg-slate-800 dark:bg-slate-700 text-white px-2.5 py-1.5 rounded-lg text-xs pointer-events-none z-50 shadow-lg" style={{ left: hoveredPoint.x, top: hoveredPoint.y - 45, transform: 'translateX(-50%)' }}>
          <div className="font-medium">{hoveredPoint.data.record.dateShort} {hoveredPoint.data.vital.time}</div>
          <div className={hoveredPoint.data.type === 'temp' ? 'text-teal-300' : 'text-rose-300'}>
            {hoveredPoint.data.type === 'temp' ? `${hoveredPoint.data.value}°C` : `${hoveredPoint.data.value} bpm`}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// Vitals Table Component
// ============================================

const VitalsTable = ({ records, dayRange }: { records: TPRDayRecord[]; dayRange: DayRange }) => {
  const displayRecords = records.slice(0, dayRange).reverse();
  const cellWidth = dayRange <= 3 ? 'w-10' : 'w-8';
  const fontSize = dayRange <= 3 ? 'text-xs' : 'text-[10px]';
  
  const rows = [
    { key: 'rr', label: 'Respiratory rate', getValue: (v: VitalReading) => v.respiratoryRate, color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'sys', label: 'BP Systolic', getValue: (v: VitalReading) => v.bpSystolic, color: 'text-violet-600 dark:text-violet-400' },
    { key: 'dia', label: '   Diastolic', getValue: (v: VitalReading) => v.bpDiastolic, color: 'text-violet-500 dark:text-violet-300' },
    { key: 'sos', label: 'SOS score', getValue: (v: VitalReading) => v.sosScore, color: '', getColor: (val?: number) => val !== undefined ? (val >= 3 ? 'text-red-600 dark:text-red-400' : val >= 2 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400') : '' },
    { key: 'o2sat', label: 'O₂ saturation', getValue: (v: VitalReading) => v.o2Saturation, color: 'text-cyan-600 dark:text-cyan-400', getColor: (val?: number) => val !== undefined && val < 95 ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : 'text-cyan-600 dark:text-cyan-400' },
    { key: 'o2th', label: 'O₂ therapy', getValue: (v: VitalReading) => v.o2Therapy, color: 'text-slate-500 dark:text-slate-400 text-[9px]' },
  ];
  
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${fontSize}`}>
        <tbody>
          {rows.map(row => (
            <tr key={row.key} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="py-1.5 px-2 font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap w-24 border-r border-slate-200 dark:border-slate-700">{row.label}</td>
              {displayRecords.map(record => record.vitals.map((vital, idx) => {
                const val = row.getValue(vital);
                const colorClass = row.getColor ? row.getColor(val as number) : row.color;
                return (
                  <td key={`${record.id}-${row.key}-${idx}`} className={`${cellWidth} text-center py-1.5 border-r border-slate-100 dark:border-slate-700/50 font-medium ${colorClass}`}>
                    {val ?? '-'}
                  </td>
                );
              }))}
            </tr>
          ))}
          
          <tr className="border-b-2 border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10">
            <td className="py-2 px-2 font-medium bg-amber-50 dark:bg-amber-900/20 whitespace-nowrap border-r border-slate-200 dark:border-slate-700">
              <div className="text-amber-700 dark:text-amber-400 font-semibold text-[11px]">Pain scale</div>
              <div className="flex gap-0.5 mt-1">{[2,4,6,8].map(l => <div key={l} className={`w-1.5 rounded-sm ${l<=2?'bg-emerald-400 h-1':l<=4?'bg-yellow-400 h-1.5':l<=6?'bg-amber-400 h-2':'bg-red-400 h-2.5'}`}/>)}</div>
            </td>
            {displayRecords.map(record => record.vitals.map((vital, idx) => {
              const pain = vital.painScore;
              return (
                <td key={`${record.id}-pain-${idx}`} className={`${cellWidth} text-center py-1.5 border-r border-amber-100 dark:border-amber-800/30`}>
                  {pain !== undefined ? (
                    <div className="flex flex-col items-center">
                      <span className={`font-bold ${pain<=2?'text-emerald-600 dark:text-emerald-400':pain<=4?'text-yellow-600 dark:text-yellow-400':pain<=6?'text-amber-600 dark:text-amber-400':'text-red-600 dark:text-red-400'}`}>{pain}</span>
                      <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-0.5 overflow-hidden">
                        <div className={`h-full rounded-full ${pain<=2?'bg-emerald-500':pain<=4?'bg-yellow-500':pain<=6?'bg-amber-500':'bg-red-500'}`} style={{width:`${(pain/10)*100}%`}}/>
                      </div>
                    </div>
                  ) : '-'}
                </td>
              );
            }))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ============================================
// Medication Table Component
// ============================================

const MedicationTable = ({ records, dayRange }: { records: TPRDayRecord[]; dayRange: DayRange }) => {
  const displayRecords = records.slice(0, dayRange).reverse();
  const cellWidth = dayRange <= 3 ? 'w-10' : 'w-8';
  const fontSize = dayRange <= 3 ? 'text-xs' : 'text-[10px]';
  
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${fontSize}`}>
        <tbody>
          <tr className="bg-violet-500 dark:bg-violet-600 text-white">
            <td colSpan={1 + displayRecords.length * 6} className="py-1.5 px-2 font-semibold text-xs">
              <Pill className="w-3 h-3 inline mr-1.5" />Medication
            </td>
          </tr>
          {['continuous dose', 'prn dose'].map((label, rowIdx) => (
            <tr key={label} className="border-b border-slate-200 dark:border-slate-700 hover:bg-violet-50/30 dark:hover:bg-violet-900/10">
              <td className="py-1.5 px-2 font-medium text-slate-700 dark:text-slate-300 bg-violet-50 dark:bg-violet-900/20 whitespace-nowrap w-24 border-r border-slate-200 dark:border-slate-700">{label}</td>
              {displayRecords.map(record => record.medications.map((med, idx) => (
                <td key={`${record.id}-med${rowIdx}-${idx}`} className={`${cellWidth} text-center py-1.5 border-r border-violet-100 dark:border-violet-800/30 text-violet-700 dark:text-violet-300 font-medium`}>
                  {rowIdx === 0 ? (med.continuousDose || '-') : (med.prnDose || '-')}
                </td>
              )))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================
// Fluid Balance Table Component
// ============================================

const FluidTable = ({ records, dayRange }: { records: TPRDayRecord[]; dayRange: DayRange }) => {
  const displayRecords = records.slice(0, dayRange).reverse();
  const fontSize = dayRange <= 3 ? 'text-xs' : 'text-[10px]';
  const shiftColSpan = 2;
  const cellWidth = dayRange <= 3 ? 'w-20' : 'w-16';
  
  const getDayTotals = (record: TPRDayRecord) => {
    const totalIntake = record.fluids.reduce((sum, f) => sum + (f.totalIntake || 0), 0);
    const totalOutput = record.fluids.reduce((sum, f) => sum + (f.totalOutput || 0), 0);
    return { totalIntake, totalOutput, balance: totalIntake - totalOutput };
  };
  
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${fontSize}`}>
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800">
            <th className="py-1.5 px-2 text-left font-semibold text-slate-700 dark:text-slate-300 w-24 border-r border-slate-200 dark:border-slate-700" rowSpan={2}>
              <Droplets className="w-3.5 h-3.5 inline mr-1 text-cyan-600 dark:text-cyan-400" />Fluid
            </th>
            {displayRecords.map(record => (
              <th key={`h-${record.id}`} colSpan={6} className="py-1 text-center font-semibold text-slate-600 dark:text-slate-400 border-r border-slate-300 dark:border-slate-600 border-b border-slate-200 dark:border-slate-700">{record.dateShort}</th>
            ))}
          </tr>
          <tr className="bg-slate-50 dark:bg-slate-800/50">
            {displayRecords.map(record => SHIFTS.map((shift, idx) => (
              <th key={`${record.id}-sh-${idx}`} colSpan={shiftColSpan} className={`py-1 text-center font-medium border-r ${idx===2?'border-slate-300 dark:border-slate-600':'border-slate-200 dark:border-slate-700'} text-slate-600 dark:text-slate-400`}>
                {shift.labelTh}<span className="block text-[8px] text-slate-400 dark:text-slate-500">{shift.timeRange}</span>
              </th>
            )))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-cyan-500 dark:bg-cyan-600 text-white">
            <td colSpan={1 + displayRecords.length * 6} className="py-1 px-2 font-semibold text-xs">
              <Droplets className="w-3 h-3 inline mr-1" />Fluid Intake (ml)
            </td>
          </tr>
          {['Oral fluid', 'Parenteral'].map((label, rowIdx) => (
            <tr key={label} className="border-b border-slate-200 dark:border-slate-700 hover:bg-cyan-50/30 dark:hover:bg-cyan-900/10">
              <td className="py-1.5 px-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 pl-3 font-medium">{label}</td>
              {displayRecords.map(record => record.fluids.map((fluid, idx) => (
                <td key={`${record.id}-in${rowIdx}-${idx}`} colSpan={shiftColSpan} className={`${cellWidth} text-center py-1.5 border-r ${idx===2?'border-slate-300 dark:border-slate-600':'border-slate-200 dark:border-slate-700'} text-cyan-700 dark:text-cyan-300 font-medium`}>
                  {rowIdx === 0 ? (fluid.oralFluid || '-') : (fluid.parenteral || '-')}
                </td>
              )))}
            </tr>
          ))}
          <tr className="border-b-2 border-cyan-200 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-900/20">
            <td className="py-1.5 px-2 font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-800/30 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 pl-3">Total</td>
            {displayRecords.map(record => record.fluids.map((fluid, idx) => (
              <td key={`${record.id}-tin-${idx}`} colSpan={shiftColSpan} className={`${cellWidth} text-center py-1.5 border-r ${idx===2?'border-cyan-200 dark:border-cyan-700':'border-cyan-100 dark:border-cyan-800'} text-cyan-800 dark:text-cyan-200 font-bold`}>{fluid.totalIntake || '-'}</td>
            )))}
          </tr>
          
          <tr className="bg-amber-500 dark:bg-amber-600 text-white">
            <td colSpan={1 + displayRecords.length * 6} className="py-1 px-2 font-semibold text-xs">
              <Beaker className="w-3 h-3 inline mr-1" />Fluid Output (ml)
            </td>
          </tr>
          {['Urine', 'Drainage'].map((label, rowIdx) => (
            <tr key={label} className="border-b border-slate-200 dark:border-slate-700 hover:bg-amber-50/30 dark:hover:bg-amber-900/10">
              <td className="py-1.5 px-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 pl-3 font-medium">{label}</td>
              {displayRecords.map(record => record.fluids.map((fluid, idx) => (
                <td key={`${record.id}-out${rowIdx}-${idx}`} colSpan={shiftColSpan} className={`${cellWidth} text-center py-1.5 border-r ${idx===2?'border-slate-300 dark:border-slate-600':'border-slate-200 dark:border-slate-700'} text-amber-700 dark:text-amber-300 font-medium`}>
                  {rowIdx === 0 ? (fluid.urine || '-') : (fluid.drainage || '-')}
                </td>
              )))}
            </tr>
          ))}
          <tr className="border-b-2 border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
            <td className="py-1.5 px-2 font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-800/30 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 pl-3">Total</td>
            {displayRecords.map(record => record.fluids.map((fluid, idx) => (
              <td key={`${record.id}-tout-${idx}`} colSpan={shiftColSpan} className={`${cellWidth} text-center py-1.5 border-r ${idx===2?'border-amber-200 dark:border-amber-700':'border-amber-100 dark:border-amber-800'} text-amber-800 dark:text-amber-200 font-bold`}>{fluid.totalOutput || '-'}</td>
            )))}
          </tr>
          
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <td className="py-1.5 px-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 font-medium">Stool</td>
            {displayRecords.map(record => (
              <td key={`${record.id}-stool`} colSpan={6} className="text-center py-1.5 border-r border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">{record.stool || '-'}</td>
            ))}
          </tr>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <td className="py-1.5 px-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 font-medium">ประเภทผู้ป่วย</td>
            {displayRecords.map(record => (
              <td key={`${record.id}-pt`} colSpan={6} className="text-center py-2 border-r border-slate-300 dark:border-slate-600"><PatientTypeBadge type={record.patientType} size="lg" /></td>
            ))}
          </tr>
          <tr className="bg-slate-100 dark:bg-slate-800">
            <td className="py-2 px-2 font-bold text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 border-r border-slate-200 dark:border-slate-700">I/O Balance</td>
            {displayRecords.map(record => {
              const t = getDayTotals(record);
              return (
                <td key={`${record.id}-bal`} colSpan={6} className="text-center py-2 border-r border-slate-300 dark:border-slate-600">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t.totalIntake} - {t.totalOutput} = </span>
                  <span className={`font-bold ${t.balance>=0?'text-emerald-600 dark:text-emerald-400':'text-red-600 dark:text-red-400'}`}>{t.balance>=0?'+':''}{t.balance} ml</span>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ============================================
// Patient Info Row
// ============================================

const PatientInfoRow = ({ records, dayRange }: { records: TPRDayRecord[]; dayRange: DayRange }) => {
  const displayRecords = records.slice(0, dayRange).reverse();
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <tbody>
          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <td className="py-2 px-2 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 whitespace-nowrap w-24 border-r border-slate-200 dark:border-slate-700">
              <Scale className="w-3.5 h-3.5 inline mr-1 text-emerald-600 dark:text-emerald-400" />Wt/Ht/Diet
            </td>
            {displayRecords.map(record => (
              <td key={`${record.id}-wt`} colSpan={6} className="text-center py-2 border-r border-slate-300 dark:border-slate-600">
                <span className="text-slate-500 dark:text-slate-400 text-[10px]">Wt:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300 ml-0.5">{record.weight}kg</span>
                <span className="text-slate-300 dark:text-slate-600 mx-1.5">/</span>
                <span className="text-slate-500 dark:text-slate-400 text-[10px]">Ht:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300 ml-0.5">{record.height}cm</span>
                <span className="text-slate-300 dark:text-slate-600 mx-1.5">/</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 rounded">
                  <Utensils className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">{record.diet}</span>
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ============================================
// Header Row
// ============================================

const HeaderRow = ({ records, dayRange }: { records: TPRDayRecord[]; dayRange: DayRange }) => {
  const displayRecords = records.slice(0, dayRange).reverse();
  const cellWidth = dayRange <= 3 ? 'w-10' : 'w-8';
  const fontSize = dayRange <= 3 ? 'text-xs' : 'text-[10px]';
  
  return (
    <div className={`overflow-x-auto bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-700 dark:to-cyan-700 text-white rounded-t-xl ${fontSize}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-2 text-left font-semibold w-24 border-r border-teal-500 dark:border-teal-600">Date</th>
            {displayRecords.map(record => (
              <th key={`d-${record.id}`} colSpan={6} className="py-2 px-1 text-center font-bold border-r border-teal-500 dark:border-teal-600 bg-teal-700/30 dark:bg-teal-800/30">{record.date}</th>
            ))}
          </tr>
          <tr className="bg-teal-700/20 dark:bg-teal-800/20">
            <th className="py-1 px-2 text-left text-teal-100 font-medium border-r border-teal-500 dark:border-teal-600">Day Admission</th>
            {displayRecords.map(record => (
              <th key={`a-${record.id}`} colSpan={6} className="py-1 px-1 text-center border-r border-teal-500 dark:border-teal-600">
                <span className="bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-bold text-xs">Day {record.dayAdmission}</span>
              </th>
            ))}
          </tr>
          <tr className="bg-teal-700/10 dark:bg-teal-800/10">
            <th className="py-1 px-2 text-left text-teal-100 font-medium border-r border-teal-500 dark:border-teal-600">after Operation</th>
            {displayRecords.map(record => (
              <th key={`o-${record.id}`} colSpan={6} className="py-1 px-1 text-center border-r border-teal-500 dark:border-teal-600">
                {record.dayAfterOperation ? <span className="bg-amber-400 dark:bg-amber-500 text-amber-900 dark:text-amber-100 px-2 py-0.5 rounded font-bold text-xs">POD {record.dayAfterOperation}</span> : '-'}
              </th>
            ))}
          </tr>
          <tr className="bg-teal-800/30 dark:bg-teal-900/30">
            <th className="py-1.5 px-2 text-left font-medium border-r border-teal-500 dark:border-teal-600">
              <span className="text-teal-200">Pulse</span><span className="text-white ml-2">C°</span>
            </th>
            {displayRecords.map(record => TIME_LABELS.map((time, idx) => (
              <th key={`t-${record.id}-${idx}`} className={`${cellWidth} py-1.5 text-center font-bold border-r border-teal-500/50 dark:border-teal-600/50`}>{time}</th>
            )))}
          </tr>
        </thead>
      </table>
    </div>
  );
};

// ============================================
// Legend Component
// ============================================

const Legend = () => (
  <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
    <div className="grid grid-cols-2 gap-6">
      <div className="border-r border-slate-200 dark:border-slate-700 pr-4">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">ประเภทผู้ป่วย :</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(PATIENT_TYPES).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`${cfg.bg} text-white px-2 py-0.5 rounded font-semibold text-[10px]`}>{key}</span>
              <span className="text-slate-600 dark:text-slate-400">= {cfg.fullLabel}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Medication :</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          {MEDICATION_CODES.map(m => (
            <div key={m.code} className="flex items-center gap-2">
              <span className="text-violet-600 dark:text-violet-400 font-bold min-w-[20px]">{m.code}</span>
              <span className="text-slate-600 dark:text-slate-400">= {m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center gap-6 text-xs">
      <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-teal-500 dark:bg-teal-400" /><span className="text-teal-700 dark:text-teal-300">= Temperature</span></div>
      <div className="flex items-center gap-1.5"><span className="text-rose-400 dark:text-rose-300 font-bold">×</span><span className="text-rose-600 dark:text-rose-300">= Pulse</span></div>
      <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-emerald-400 dark:bg-emerald-500" /><span className="text-emerald-600 dark:text-emerald-400">= 37°C line</span></div>
    </div>
  </div>
);

// ============================================
// Day Range Selector
// ============================================

const DayRangeSelector = ({ value, onChange }: { value: DayRange; onChange: (range: DayRange) => void }) => (
  <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
    {DAY_RANGE_OPTIONS.map(opt => (
      <button key={opt.value} onClick={() => onChange(opt.value)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${value === opt.value ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600'}`}>
        {opt.label}
      </button>
    ))}
  </div>
);

// ============================================
// Fullscreen TPR Chart
// ============================================

const FullscreenTPRChart = ({ records, initialDayRange = 7, onClose }: { records: TPRDayRecord[]; initialDayRange?: DayRange; onClose: () => void }) => {
  const [dayRange, setDayRange] = useState<DayRange>(initialDayRange);
  const [startIndex, setStartIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const displayedRecords = useMemo(() => records.slice(startIndex, startIndex + dayRange), [records, startIndex, dayRange]);
  const canGoBack = startIndex + dayRange < records.length;
  const canGoForward = startIndex > 0;
  
  const handleGoBack = useCallback(() => { if (canGoBack) setStartIndex(prev => Math.min(prev + 1, records.length - dayRange)); }, [canGoBack, records.length, dayRange]);
  const handleGoForward = useCallback(() => { if (canGoForward) setStartIndex(prev => Math.max(prev - 1, 0)); }, [canGoForward]);
  
  useEffect(() => { if (startIndex + dayRange > records.length) setStartIndex(Math.max(0, records.length - dayRange)); }, [dayRange, records.length, startIndex]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handleGoBack();
      if (e.key === 'ArrowRight') handleGoForward();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleGoBack, handleGoForward]);

  const handleSave = async () => { setIsSaving(true); await new Promise(r => setTimeout(r, 1000)); setIsSaving(false); setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 2000); };
  
  const dateRangeText = displayedRecords.length > 0 ? `${displayedRecords[displayedRecords.length - 1]?.dateShort} - ${displayedRecords[0]?.dateShort}` : '';
  const canvasWidth = 150 + (dayRange * 6 * (dayRange <= 3 ? 42 : 34));

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm font-medium hidden sm:inline">กลับ</span>
          </button>
          <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold text-slate-800 dark:text-white text-base">ฟอร์มปรอท - TPR Chart</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{dayRange} วัน • {dateRangeText}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handleGoBack} disabled={!canGoBack} className={`p-2 rounded-lg ${canGoBack ? 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'}`}><ChevronLeft className="w-5 h-5" /></button>
          <DayRangeSelector value={dayRange} onChange={setDayRange} />
          <button onClick={handleGoForward} disabled={!canGoForward} className={`p-2 rounded-lg ${canGoForward ? 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'}`}><ChevronRight className="w-5 h-5" /></button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <button onClick={() => setZoom(p => Math.max(p - 0.1, 0.5))} className="w-7 h-7 rounded flex items-center justify-center hover:bg-white dark:hover:bg-slate-600"><ZoomOut className="w-4 h-4" /></button>
            <span className="w-12 text-center text-xs font-medium text-slate-600 dark:text-slate-300">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(p => Math.min(p + 0.1, 2))} className="w-7 h-7 rounded flex items-center justify-center hover:bg-white dark:hover:bg-slate-600"><ZoomIn className="w-4 h-4" /></button>
          </div>
          <button onClick={() => window.print()} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Printer className="w-5 h-5 text-slate-500 dark:text-slate-400" /></button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Download className="w-5 h-5 text-slate-500 dark:text-slate-400" /></button>
          <button onClick={handleSave} disabled={isSaving} className={`h-9 px-4 flex items-center gap-2 rounded-xl font-medium text-sm ${saveSuccess ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'}`}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span className="hidden sm:inline">{saveSuccess ? 'บันทึกแล้ว' : 'บันทึก'}</span>
          </button>
          <button onClick={onClose} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"><X className="w-5 h-5 text-slate-500 dark:text-slate-400" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl mx-auto border border-slate-200 dark:border-slate-700" style={{ width: `${Math.max(canvasWidth, 900)}px`, transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
          <div className="text-center py-3 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-b border-slate-200 dark:border-slate-700 rounded-t-2xl">
            <h1 className="text-lg font-bold text-teal-700 dark:text-teal-300">ฟอร์มปรอท โรงพยาบาล</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">TPR Chart - Temperature, Pulse, Respiration</p>
          </div>
          
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div><span className="text-slate-500 dark:text-slate-400">ชื่อ:</span> <span className="font-semibold text-slate-800 dark:text-slate-200">นายสมชาย ใจดี</span></div>
              <div><span className="text-slate-500 dark:text-slate-400">HN:</span> <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">6712345</span></div>
              <div><span className="text-slate-500 dark:text-slate-400">AN:</span> <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">670001234</span></div>
              <div><span className="text-slate-500 dark:text-slate-400">Ward:</span> <span className="font-semibold text-slate-800 dark:text-slate-200">อายุรกรรม ชาย 1</span></div>
            </div>
          </div>
          
          <HeaderRow records={displayedRecords} dayRange={dayRange} />
          <div className="border-b border-slate-200 dark:border-slate-700 p-2"><TPRGraph records={displayedRecords} dayRange={dayRange} width={Math.max(canvasWidth - 20, 880)} height={280} /></div>
          <VitalsTable records={displayedRecords} dayRange={dayRange} />
          <MedicationTable records={displayedRecords} dayRange={dayRange} />
          <PatientInfoRow records={displayedRecords} dayRange={dayRange} />
          <FluidTable records={displayedRecords} dayRange={dayRange} />
          <div className="p-4"><Legend /></div>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-3">
        <span className="text-slate-300">← → เลื่อนวัน</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-300">ESC ปิด</span>
      </div>
    </div>
  );
};

// ============================================
// Main TPR Chart Tab Component
// ============================================

export function TPRChartTab() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dayRange, setDayRange] = useState<DayRange>(7);

  const latestRecord = mockTPRRecords[0];
  const latestVitals = latestRecord.vitals[latestRecord.vitals.length - 1];

  if (isFullscreen) return <FullscreenTPRChart records={mockTPRRecords} initialDayRange={dayRange} onClose={() => setIsFullscreen(false)} />;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-teal-50/50 dark:from-slate-800 dark:to-teal-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 dark:text-white text-base">ฟอร์มปรอท - TPR Chart</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Temperature, Pulse, Respiration Record</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div className="px-3 py-1.5 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center gap-2">
                <ThermometerSun className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-sm font-bold text-teal-700 dark:text-teal-300">{latestVitals?.temperature?.toFixed(1)}°C</span>
              </div>
              <div className="px-3 py-1.5 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                <span className="text-sm font-bold text-rose-600 dark:text-rose-300">{latestVitals?.pulse} bpm</span>
              </div>
              <PatientTypeBadge type={latestRecord.patientType} size="lg" />
            </div>
            <button onClick={() => setIsFullscreen(true)} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-105">
              <Maximize2 className="w-4 h-4" /><span className="hidden md:inline">ดูฟอร์มเต็ม</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-teal-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">แสดงแนวโน้ม</span>
        </div>
        <DayRangeSelector value={dayRange} onChange={setDayRange} />
      </div>

      <div className="p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 overflow-x-auto">
        <TPRGraph records={mockTPRRecords.slice(0, dayRange)} dayRange={dayRange} width={dayRange === 1 ? 500 : dayRange === 3 ? 650 : dayRange === 5 ? 800 : 950} height={200} />
      </div>

      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span>ข้อมูล {mockTPRRecords.length} วัน</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span>ล่าสุด: {latestRecord.date}</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span>Day {latestRecord.dayAdmission}</span>
          </div>
          <button onClick={() => setIsFullscreen(true)} className="flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
            ดูรายละเอียด<ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}