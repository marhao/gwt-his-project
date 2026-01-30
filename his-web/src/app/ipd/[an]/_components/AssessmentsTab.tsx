'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  FileText, Search, Filter, ChevronRight, Check, Clock, AlertTriangle,
  User, Download, Printer, Eye, Edit, Plus, X, ChevronLeft,
  ClipboardList, Heart, Shield, Activity, Pill, Scale, Users,
  AlertCircle, CheckCircle2, FileQuestion, LayoutGrid, LayoutList,
  ChevronDown, ArrowLeft, MousePointer2, Type,
  MoveRight, Pencil, Undo2, Redo2, Trash2, Save, Loader2, ZoomIn, ZoomOut,
  Eraser,
} from 'lucide-react';

// ============================================
// Types
// ============================================

type AssessmentStatus = 'completed' | 'pending' | 'in_progress' | 'overdue';
type ViewMode = 'list' | 'grid';
type AnnotationTool = 'select' | 'text' | 'arrow' | 'freehand';

interface AssessmentCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  count: number;
}

interface AssessmentForm {
  id: number;
  category: string;
  name: string;
  nameTh: string;
  status: AssessmentStatus;
  score?: string;
  riskLevel?: 'low' | 'moderate' | 'high' | 'critical';
  assessedBy?: string;
  assessedDate?: string;
  assessedTime?: string;
  dueDate?: string;
  version: number;
  lastUpdated?: string;
  notes?: string;
}

interface TextAnnotation {
  id: string;
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
  pageIndex: number;
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
  pageIndex: number;
}

interface FreehandAnnotation {
  id: string;
  type: 'freehand';
  points: { x: number; y: number }[];
  color: string;
  strokeWidth: number;
  pageIndex: number;
}

type AllAnnotation = TextAnnotation | ArrowAnnotation | FreehandAnnotation;

// ============================================
// Constants
// ============================================

const CANVAS_WIDTH = 794;
const CANVAS_HEIGHT = 1123;
const ANNOTATION_COLORS = [
  { color: '#ef4444', name: 'แดง' },
  { color: '#3b82f6', name: 'น้ำเงิน' },
  { color: '#22c55e', name: 'เขียว' },
  { color: '#f59e0b', name: 'ส้ม' },
  { color: '#8b5cf6', name: 'ม่วง' },
  { color: '#0d9488', name: 'Teal' },
  { color: '#000000', name: 'ดำ' },
];
const MAX_HISTORY = 50;

// ============================================
// Mock Data
// ============================================

const categories: AssessmentCategory[] = [
  { id: 'all', name: 'ทั้งหมด', icon: FileText, color: 'slate', count: 15 },
  { id: 'initial', name: 'Initial Assessment', icon: ClipboardList, color: 'blue', count: 2 },
  { id: 'nursing', name: 'Nursing Assessment', icon: Users, color: 'purple', count: 3 },
  { id: 'risk', name: 'Risk Assessment', icon: AlertTriangle, color: 'amber', count: 4 },
  { id: 'pain', name: 'Pain Assessment', icon: Activity, color: 'red', count: 2 },
  { id: 'nutrition', name: 'Nutrition', icon: Scale, color: 'emerald', count: 1 },
  { id: 'medication', name: 'Medication', icon: Pill, color: 'pink', count: 2 },
  { id: 'discharge', name: 'Discharge Planning', icon: Shield, color: 'cyan', count: 1 },
];

const mockAssessments: AssessmentForm[] = [
  { id: 1, category: 'initial', name: 'Initial Nursing Assessment', nameTh: 'แบบประเมินแรกรับทางการพยาบาล', status: 'completed', assessedBy: 'พยาบาลสมหญิง รักดี', assessedDate: '15/01/67', assessedTime: '14:45', version: 1, lastUpdated: '15/01/67 14:45' },
  { id: 2, category: 'initial', name: 'Medical History Assessment', nameTh: 'แบบประเมินประวัติการเจ็บป่วย', status: 'completed', assessedBy: 'นพ.วิชัย หัวใจดี', assessedDate: '15/01/67', assessedTime: '15:00', version: 1, lastUpdated: '15/01/67 15:00' },
  { id: 3, category: 'risk', name: 'Fall Risk Assessment (Morse)', nameTh: 'แบบประเมินความเสี่ยงต่อการพลัดตกหกล้ม', status: 'completed', score: '55/125', riskLevel: 'high', assessedBy: 'พยาบาลสมหญิง รักดี', assessedDate: '15/01/67', assessedTime: '14:50', version: 2, lastUpdated: '17/01/67 08:00', notes: 'ประเมินซ้ำทุก shift' },
  { id: 4, category: 'risk', name: 'Pressure Ulcer Risk (Braden Scale)', nameTh: 'แบบประเมินความเสี่ยงต่อการเกิดแผลกดทับ', status: 'completed', score: '14/23', riskLevel: 'moderate', assessedBy: 'พยาบาลวิไล ใจดี', assessedDate: '15/01/67', assessedTime: '15:00', version: 1, lastUpdated: '15/01/67 15:00' },
  { id: 5, category: 'risk', name: 'DVT Risk Assessment', nameTh: 'แบบประเมินความเสี่ยง DVT', status: 'completed', score: '3/8', riskLevel: 'high', assessedBy: 'นพ.วิชัย หัวใจดี', assessedDate: '15/01/67', assessedTime: '15:30', version: 1, lastUpdated: '15/01/67 15:30' },
  { id: 6, category: 'risk', name: 'Suicide Risk Assessment', nameTh: 'แบบประเมินความเสี่ยงต่อการทำร้ายตนเอง', status: 'completed', score: '0/10', riskLevel: 'low', assessedBy: 'พยาบาลสมหญิง รักดี', assessedDate: '15/01/67', assessedTime: '14:55', version: 1, lastUpdated: '15/01/67 14:55' },
  { id: 7, category: 'pain', name: 'Pain Assessment (NRS)', nameTh: 'แบบประเมินความปวด', status: 'completed', score: '3/10', riskLevel: 'low', assessedBy: 'พยาบาลวิไล ใจดี', assessedDate: '17/01/67', assessedTime: '08:00', version: 5, lastUpdated: '17/01/67 08:00', notes: 'ปวดลดลงจาก 7/10 แรกรับ' },
  { id: 8, category: 'pain', name: 'Chest Pain Assessment', nameTh: 'แบบประเมินอาการเจ็บหน้าอก', status: 'in_progress', assessedBy: 'นพ.วิชัย หัวใจดี', assessedDate: '17/01/67', assessedTime: '09:00', version: 3, lastUpdated: '17/01/67 09:00' },
  { id: 9, category: 'nursing', name: 'Functional Assessment (ADL)', nameTh: 'แบบประเมินความสามารถในการทำกิจวัตรประจำวัน', status: 'completed', score: '85/100', assessedBy: 'พยาบาลสมหญิง รักดี', assessedDate: '15/01/67', assessedTime: '15:00', version: 1, lastUpdated: '15/01/67 15:00' },
  { id: 10, category: 'nursing', name: 'Skin Assessment', nameTh: 'แบบประเมินสภาพผิวหนัง', status: 'completed', assessedBy: 'พยาบาลวิไล ใจดี', assessedDate: '17/01/67', assessedTime: '08:00', version: 2, lastUpdated: '17/01/67 08:00' },
  { id: 11, category: 'nursing', name: 'Neurological Assessment (GCS)', nameTh: 'แบบประเมินระดับความรู้สึกตัว', status: 'completed', score: 'E4V5M6 = 15', assessedBy: 'พยาบาลสมหญิง รักดี', assessedDate: '17/01/67', assessedTime: '08:00', version: 3, lastUpdated: '17/01/67 08:00' },
  { id: 12, category: 'nutrition', name: 'Nutritional Assessment (SGA)', nameTh: 'แบบประเมินภาวะโภชนาการ', status: 'pending', dueDate: '18/01/67', version: 0 },
  { id: 13, category: 'medication', name: 'Medication Reconciliation - Admission', nameTh: 'การสอบทานรายการยาแรกรับ', status: 'completed', assessedBy: 'ภญ.สุภา ยาดี', assessedDate: '15/01/67', assessedTime: '16:00', version: 1, lastUpdated: '15/01/67 16:00' },
  { id: 14, category: 'medication', name: 'High Alert Drug Assessment', nameTh: 'แบบประเมินการใช้ยาความเสี่ยงสูง', status: 'completed', riskLevel: 'high', assessedBy: 'ภญ.สุภา ยาดี', assessedDate: '15/01/67', assessedTime: '16:30', version: 1, lastUpdated: '15/01/67 16:30', notes: 'Enoxaparin, Morphine' },
  { id: 15, category: 'discharge', name: 'Discharge Planning Assessment', nameTh: 'แบบประเมินการวางแผนจำหน่าย', status: 'in_progress', assessedBy: 'พยาบาลสมหญิง รักดี', assessedDate: '16/01/67', assessedTime: '10:00', version: 1, lastUpdated: '16/01/67 10:00' },
];

// ============================================
// Helper Functions & Components
// ============================================

const getStatusConfig = (status: AssessmentStatus) => {
  const configs = {
    completed: { label: 'เสร็จสิ้น', icon: CheckCircle2, bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400' },
    pending: { label: 'รอดำเนินการ', icon: Clock, bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-400' },
    in_progress: { label: 'กำลังดำเนินการ', icon: Edit, bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-400' },
    overdue: { label: 'เกินกำหนด', icon: AlertCircle, bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-700 dark:text-red-400' },
  };
  return configs[status];
};

const getRiskConfig = (risk?: 'low' | 'moderate' | 'high' | 'critical') => {
  if (!risk) return null;
  const configs = {
    low: { label: 'เสี่ยงต่ำ', bg: 'bg-emerald-500' },
    moderate: { label: 'เสี่ยงปานกลาง', bg: 'bg-amber-500' },
    high: { label: 'เสี่ยงสูง', bg: 'bg-orange-500' },
    critical: { label: 'เสี่ยงวิกฤต', bg: 'bg-red-500' },
  };
  return configs[risk];
};

const StatusBadge = ({ status }: { status: AssessmentStatus }) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      <span className="hidden sm:inline">{config.label}</span>
    </span>
  );
};

const RiskBadge = ({ risk }: { risk?: 'low' | 'moderate' | 'high' | 'critical' }) => {
  const config = getRiskConfig(risk);
  if (!config) return null;
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white ${config.bg}`}>{config.label}</span>;
};

const CategoryIcon = ({ category, size = 'md' }: { category: string; size?: 'sm' | 'md' }) => {
  const cat = categories.find(c => c.id === category);
  if (!cat) return null;
  const Icon = cat.icon;
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
    amber: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    red: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    pink: 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400',
    cyan: 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
    slate: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  };
  const sizeClass = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return <div className={`${sizeClass} rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[cat.color]}`}><Icon className={iconSize} /></div>;
};

const CategoryDropdown = ({ selectedCategory, onSelect }: { selectedCategory: string; onSelect: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = categories.find(c => c.id === selectedCategory);
  const Icon = selected?.icon || FileText;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full">
        <Icon className="w-4 h-4 text-teal-500" />
        <span className="flex-1 text-left truncate">{selected?.name}</span>
        <span className="px-1.5 py-0.5 bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded text-xs font-bold">{selected?.count}</span>
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
                <button key={cat.id} onClick={() => { onSelect(cat.id); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                  <CatIcon className="w-4 h-4" />
                  <span className="flex-1 text-left">{cat.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${isActive ? 'bg-teal-200 dark:bg-teal-500/30' : 'bg-slate-200 dark:bg-slate-600'}`}>{cat.count}</span>
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
// Fullscreen A4 Preview (unchanged - already fullscreen)
// ============================================

const FullscreenA4Preview = ({ assessment, onClose }: { assessment: AssessmentForm; onClose: () => void }) => {
  const [zoom, setZoom] = useState(1);
  const [activeTool, setActiveTool] = useState<AnnotationTool>('select');
  const [annotations, setAnnotations] = useState<AllAnnotation[]>([]);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);
  const [annotationColor, setAnnotationColor] = useState('#0d9488');
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentArrow, setCurrentArrow] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);
  const [freehandPoints, setFreehandPoints] = useState<{ x: number; y: number }[]>([]);
  
  const isDrawingRef = useRef(false);
  const drawStartRef = useRef<{ x: number; y: number } | null>(null);
  const activeToolRef = useRef<AnnotationTool>('select');
  const annotationColorRef = useRef('#0d9488');
  const zoomRef = useRef(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [history, setHistory] = useState<AllAnnotation[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  useEffect(() => { activeToolRef.current = activeTool; }, [activeTool]);
  useEffect(() => { annotationColorRef.current = annotationColor; }, [annotationColor]);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  const currentAnnotations = annotations.filter(a => a.pageIndex === 0);
  
  const saveToHistory = useCallback((newAnnotations: AllAnnotation[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...newAnnotations]);
      if (newHistory.length > MAX_HISTORY) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  const addAnnotation = useCallback((annotation: AllAnnotation) => {
    setAnnotations(prev => {
      const newAnnotations = [...prev, annotation];
      saveToHistory(newAnnotations);
      return newAnnotations;
    });
  }, [saveToHistory]);

  const deleteAnnotation = useCallback((id: string) => {
    setAnnotations(prev => {
      const newAnnotations = prev.filter(a => a.id !== id);
      saveToHistory(newAnnotations);
      return newAnnotations;
    });
    setSelectedAnnotationId(null);
    setEditingTextId(null);
  }, [saveToHistory]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setAnnotations(history[newIndex] || []);
      setSelectedAnnotationId(null);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setAnnotations(history[newIndex] || []);
      setSelectedAnnotationId(null);
    }
  }, [historyIndex, history]);

  const clearAllAnnotations = useCallback(() => {
    if (annotations.length === 0) return;
    const confirmed = window.confirm('ต้องการลบ annotation ทั้งหมด?');
    if (!confirmed) return;
    setAnnotations([]);
    saveToHistory([]);
    setSelectedAnnotationId(null);
  }, [annotations.length, saveToHistory]);

  const getCanvasCoords = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: (clientX - rect.left) / zoomRef.current, y: (clientY - rect.top) / zoomRef.current };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (activeTool === 'select') { setSelectedAnnotationId(null); setEditingTextId(null); return; }
    if (activeTool === 'text') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const coords = { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom };
      const newText: TextAnnotation = { id: `text-${Date.now()}`, type: 'text', x: coords.x, y: coords.y, text: '', fontSize: 14, color: annotationColor, pageIndex: 0 };
      addAnnotation(newText);
      setEditingTextId(newText.id);
      setSelectedAnnotationId(newText.id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool !== 'arrow' && activeTool !== 'freehand') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const coords = { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom };
    isDrawingRef.current = true;
    drawStartRef.current = coords;
    if (activeTool === 'arrow') setCurrentArrow({ startX: coords.x, startY: coords.y, endX: coords.x, endY: coords.y });
    else setFreehandPoints([coords]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const coords = { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom };
    if (activeTool === 'arrow' && drawStartRef.current) setCurrentArrow({ startX: drawStartRef.current.x, startY: drawStartRef.current.y, endX: coords.x, endY: coords.y });
    else if (activeTool === 'freehand') setFreehandPoints(prev => [...prev, coords]);
  };

  const handleMouseUp = () => {
    if (!isDrawingRef.current) return;
    if (activeTool === 'arrow' && currentArrow) {
      const dx = currentArrow.endX - currentArrow.startX;
      const dy = currentArrow.endY - currentArrow.startY;
      if (Math.sqrt(dx * dx + dy * dy) > 10) addAnnotation({ id: `arrow-${Date.now()}`, type: 'arrow', ...currentArrow, color: annotationColor, strokeWidth: 2, pageIndex: 0 });
      setCurrentArrow(null);
    } else if (activeTool === 'freehand' && freehandPoints.length > 1) {
      addAnnotation({ id: `freehand-${Date.now()}`, type: 'freehand', points: freehandPoints, color: annotationColor, strokeWidth: 2, pageIndex: 0 });
      setFreehandPoints([]);
    }
    isDrawingRef.current = false;
    drawStartRef.current = null;
  };

  const handleTextChange = (id: string, text: string) => setAnnotations(prev => prev.map(a => a.id === id && a.type === 'text' ? { ...a, text } : a));
  const handleTextBlur = (id: string, text: string) => { if (!text.trim()) deleteAnnotation(id); else saveToHistory(annotations); setEditingTextId(null); };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingTextId) { if (e.key === 'Escape') setEditingTextId(null); return; }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); return; }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); handleRedo(); return; }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedAnnotationId) { e.preventDefault(); deleteAnnotation(selectedAnnotationId); return; }
      if (e.key === 'Escape') { setSelectedAnnotationId(null); setActiveTool('select'); return; }
      if (e.key === 'v' || e.key === 'V') setActiveTool('select');
      if (e.key === 't' || e.key === 'T') setActiveTool('text');
      if (e.key === 'a' || e.key === 'A') setActiveTool('arrow');
      if (e.key === 'd' || e.key === 'D') setActiveTool('freehand');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, deleteAnnotation, selectedAnnotationId, editingTextId]);

  const handleSave = async () => { setIsSaving(true); await new Promise(resolve => setTimeout(resolve, 1000)); setIsSaving(false); setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 2000); };
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handlePrint = () => window.print();
  const isDrawingTool = activeTool === 'arrow' || activeTool === 'freehand';

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm font-medium hidden sm:inline">กลับ</span>
          </button>
          <CategoryIcon category={assessment.category} size="sm" />
          <div className="hidden md:block">
            <h1 className="font-bold text-slate-800 dark:text-white text-base">{assessment.name}</h1>
            <p className="text-xs text-slate-500">{assessment.nameTh}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={assessment.status} />
          {assessment.riskLevel && <RiskBadge risk={assessment.riskLevel} />}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <button onClick={handleZoomOut} disabled={zoom <= 0.5} className="w-7 h-7 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 disabled:opacity-30"><ZoomOut className="w-4 h-4" /></button>
            <span className="w-12 text-center text-xs font-medium text-slate-600 dark:text-slate-300">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} disabled={zoom >= 2} className="w-7 h-7 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 disabled:opacity-30"><ZoomIn className="w-4 h-4" /></button>
          </div>
          <button onClick={handlePrint} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Printer className="w-5 h-5 text-slate-500" /></button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Download className="w-5 h-5 text-slate-500" /></button>
          <button onClick={handleSave} disabled={isSaving} className={`h-9 px-4 flex items-center gap-2 rounded-xl font-medium text-sm shadow-sm transition-all ${saveSuccess ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white'}`}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span className="hidden sm:inline">{saveSuccess ? 'บันทึกแล้ว' : isSaving ? 'กำลังบันทึก...' : 'บันทึก'}</span>
          </button>
          <button onClick={onClose} className="p-2 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg"><X className="w-5 h-5 text-slate-500" /></button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Toolbar */}
        <div className="w-14 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center py-4 gap-2 shrink-0">
          <div className="flex flex-col items-center gap-1 p-1.5 bg-slate-100 dark:bg-slate-700 rounded-xl">
            {[
              { tool: 'select' as const, icon: MousePointer2, title: 'เลือก (V)' },
              { tool: 'text' as const, icon: Type, title: 'ข้อความ (T)' },
              { tool: 'arrow' as const, icon: MoveRight, title: 'ลูกศร (A)' },
              { tool: 'freehand' as const, icon: Pencil, title: 'วาดเส้น (D)' },
            ].map(({ tool, icon: Icon, title }) => (
              <button key={tool} onClick={() => setActiveTool(tool)} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${activeTool === tool ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-600'}`} title={title}><Icon className="w-5 h-5" /></button>
            ))}
          </div>
          <div className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
          <div className="relative">
            <button onClick={() => setShowColorPicker(!showColorPicker)} className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600" style={{ backgroundColor: annotationColor }} />
            {showColorPicker && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowColorPicker(false)} />
                <div className="absolute left-full ml-2 top-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-2 z-20 flex flex-col gap-1">
                  {ANNOTATION_COLORS.map(({ color, name }) => (
                    <button key={color} onClick={() => { setAnnotationColor(color); setShowColorPicker(false); }} className={`w-8 h-8 rounded-lg ${annotationColor === color ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`} style={{ backgroundColor: color }} title={name} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
          <button onClick={handleUndo} disabled={!canUndo} className={`w-10 h-10 rounded-lg flex items-center justify-center ${canUndo ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300'}`}><Undo2 className="w-5 h-5" /></button>
          <button onClick={handleRedo} disabled={!canRedo} className={`w-10 h-10 rounded-lg flex items-center justify-center ${canRedo ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300'}`}><Redo2 className="w-5 h-5" /></button>
          <div className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
          {selectedAnnotationId ? (
            <button onClick={() => deleteAnnotation(selectedAnnotationId)} className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"><Trash2 className="w-5 h-5" /></button>
          ) : currentAnnotations.length > 0 && (
            <button onClick={clearAllAnnotations} className="w-10 h-10 rounded-lg text-slate-400 hover:bg-slate-100"><Eraser className="w-5 h-5" /></button>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-6">
          <div ref={canvasRef} className={`relative bg-white shadow-2xl rounded-lg overflow-hidden mx-auto ${activeTool === 'text' && 'cursor-text'} ${isDrawingTool && 'cursor-crosshair'}`} style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px`, transform: `scale(${zoom})`, transformOrigin: 'top center' }} onClick={handleCanvasClick} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            {/* Document Content */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-8 py-6">
              <div className="flex justify-between">
                <div><h1 className="text-xl font-bold">{assessment.name}</h1><p className="text-slate-300 mt-1">{assessment.nameTh}</p></div>
                <div className="text-right"><div className="text-sm text-slate-300">เอกสารเลขที่</div><div className="font-mono font-bold text-lg">IPD-ASM-{assessment.id.toString().padStart(4, '0')}</div></div>
              </div>
            </div>

            <div className="px-8 py-4 bg-slate-50 border-b border-slate-200">
              <div className="grid grid-cols-4 gap-6 text-sm">
                <div><span className="text-slate-500 block text-xs">ชื่อผู้ป่วย:</span><p className="font-semibold">นายสมชาย ใจดี</p></div>
                <div><span className="text-slate-500 block text-xs">HN:</span><p className="font-mono font-semibold">6712345</p></div>
                <div><span className="text-slate-500 block text-xs">AN:</span><p className="font-mono font-semibold">670001234</p></div>
                <div><span className="text-slate-500 block text-xs">Ward:</span><p className="font-semibold">อายุรกรรม ชาย 1</p></div>
              </div>
            </div>

            <div className="px-8 py-6">
              <div className="flex items-center gap-6 mb-6 pb-4 border-b border-slate-200">
                <div><span className="text-xs text-slate-500 block mb-1">สถานะ</span><StatusBadge status={assessment.status} /></div>
                {assessment.score && <div><span className="text-xs text-slate-500 block mb-1">คะแนน</span><span className="text-xl font-bold">{assessment.score}</span></div>}
                {assessment.riskLevel && <div><span className="text-xs text-slate-500 block mb-1">ระดับความเสี่ยง</span><RiskBadge risk={assessment.riskLevel} /></div>}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-500 text-white flex items-center justify-center text-sm font-bold">1</span>ข้อมูลทั่วไป
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    {['รับทราบสิทธิผู้ป่วย', 'ยืนยันตัวตนผู้ป่วย', 'ประวัติแพ้ยา: Penicillin, Aspirin', 'โรคประจำตัว: HT, DM, DLP'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"><Check className="w-3 h-3 text-white" strokeWidth={3} /></div><span className="text-sm">{item}</span></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-500 text-white flex items-center justify-center text-sm font-bold">2</span>การประเมิน
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-200"><th className="text-left py-2 text-slate-500">หัวข้อ</th><th className="text-center py-2 text-slate-500 w-20">คะแนน</th><th className="text-left py-2 text-slate-500">หมายเหตุ</th></tr></thead>
                    <tbody>
                      {[{ topic: 'ประวัติการพลัดตกหกล้ม', score: 25, note: 'มีประวัติ 1 ครั้ง' }, { topic: 'การใช้ยาที่มีผลต่อการทรงตัว', score: 15, note: 'Morphine PRN' }].map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100"><td className="py-3">{row.topic}</td><td className="py-3 text-center font-semibold">{row.score}</td><td className="py-3 text-slate-500">{row.note}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SVG Annotations Layer */}
            <svg className="absolute inset-0 pointer-events-none" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ zIndex: 1000 }}>
              {currentAnnotations.map(annotation => {
                if (annotation.type === 'arrow') {
                  const a = annotation as ArrowAnnotation;
                  const angle = Math.atan2(a.endY - a.startY, a.endX - a.startX);
                  const arrowLen = 12;
                  return (
                    <g key={a.id} className="pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(a.id); setActiveTool('select'); }}>
                      <line x1={a.startX} y1={a.startY} x2={a.endX} y2={a.endY} stroke={a.color} strokeWidth={2} />
                      <polygon points={`${a.endX},${a.endY} ${a.endX - arrowLen * Math.cos(angle - Math.PI / 6)},${a.endY - arrowLen * Math.sin(angle - Math.PI / 6)} ${a.endX - arrowLen * Math.cos(angle + Math.PI / 6)},${a.endY - arrowLen * Math.sin(angle + Math.PI / 6)}`} fill={a.color} />
                    </g>
                  );
                }
                if (annotation.type === 'freehand') {
                  const f = annotation as FreehandAnnotation;
                  const pathD = f.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                  return <path key={f.id} d={pathD} stroke={f.color} strokeWidth={2} fill="none" strokeLinecap="round" className="pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(f.id); setActiveTool('select'); }} />;
                }
                return null;
              })}
              {currentArrow && <line x1={currentArrow.startX} y1={currentArrow.startY} x2={currentArrow.endX} y2={currentArrow.endY} stroke={annotationColor} strokeWidth={2} strokeDasharray="5,5" />}
              {freehandPoints.length > 1 && <path d={freehandPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} stroke={annotationColor} strokeWidth={2} fill="none" opacity={0.7} />}
            </svg>

            {/* Text Annotations */}
            {currentAnnotations.filter(a => a.type === 'text').map(annotation => {
              const t = annotation as TextAnnotation;
              const isEditing = editingTextId === t.id;
              return (
                <div key={t.id} className={`absolute ${selectedAnnotationId === t.id && !isEditing && 'ring-2 ring-teal-500 rounded'}`} style={{ left: t.x, top: t.y, color: t.color, fontSize: t.fontSize, zIndex: 1001 }} onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(t.id); if (!isEditing) setEditingTextId(t.id); }}>
                  {isEditing ? (
                    <input type="text" value={t.text} onChange={(e) => handleTextChange(t.id, e.target.value)} onBlur={() => handleTextBlur(t.id, t.text)} onKeyDown={(e) => { if (e.key === 'Enter') handleTextBlur(t.id, t.text); if (e.key === 'Escape') setEditingTextId(null); }} autoFocus className="bg-white border-2 border-teal-400 rounded-lg px-2 py-1 min-w-[150px]" style={{ color: t.color, fontSize: t.fontSize }} placeholder="พิมพ์ข้อความ..." />
                  ) : (
                    <span className="cursor-pointer whitespace-nowrap px-1.5 py-0.5 rounded bg-white/80 shadow-sm">{t.text || 'คลิกเพื่อพิมพ์...'}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {activeTool !== 'select' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm shadow-xl flex items-center gap-2">
          {activeTool === 'text' && <><Type className="w-4 h-4 text-teal-400" /> คลิกเพื่อเพิ่มข้อความ</>}
          {activeTool === 'arrow' && <><MoveRight className="w-4 h-4 text-teal-400" /> ลากเพื่อวาดลูกศร</>}
          {activeTool === 'freehand' && <><Pencil className="w-4 h-4 text-teal-400" /> ลากเพื่อวาดเส้น</>}
          <span className="text-slate-400 text-xs ml-2">กด ESC เพื่อยกเลิก</span>
        </div>
      )}
    </div>
  );
};

// ============================================
// Main Component - Dynamic Height
// ============================================

export function AssessmentsTab() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentForm | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredAssessments = useMemo(() => mockAssessments.filter(a => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.nameTh.includes(searchQuery);
    return matchesCategory && matchesSearch;
  }), [selectedCategory, searchQuery]);

  const groupedAssessments = useMemo(() => {
    if (selectedCategory !== 'all') return { [selectedCategory]: filteredAssessments };
    const grouped: Record<string, AssessmentForm[]> = {};
    filteredAssessments.forEach(a => { if (!grouped[a.category]) grouped[a.category] = []; grouped[a.category].push(a); });
    return grouped;
  }, [filteredAssessments, selectedCategory]);

  const stats = useMemo(() => ({ total: mockAssessments.length, completed: mockAssessments.filter(a => a.status === 'completed').length, pending: mockAssessments.filter(a => a.status === 'pending').length, highRisk: mockAssessments.filter(a => a.riskLevel === 'high' || a.riskLevel === 'critical').length }), []);

  const handleSelectAssessment = (assessment: AssessmentForm) => { setSelectedAssessment(assessment); setIsFullscreen(true); };
  const handleCloseFullscreen = () => setIsFullscreen(false);

  if (isFullscreen && selectedAssessment) return <FullscreenA4Preview assessment={selectedAssessment} onClose={handleCloseFullscreen} />;

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 dark:text-white">Assessment Forms</h2>
              <p className="text-xs text-slate-500">แบบประเมินผู้ป่วย</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs">
              <span className="text-slate-500">ทั้งหมด:</span>
              <span className="ml-1 font-bold text-slate-700 dark:text-slate-200">{stats.total}</span>
            </span>
            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-xs">
              <span className="text-emerald-600">เสร็จ:</span>
              <span className="ml-1 font-bold text-emerald-700">{stats.completed}</span>
            </span>
            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-xs">
              <span className="text-amber-600">รอ:</span>
              <span className="ml-1 font-bold text-amber-700">{stats.pending}</span>
            </span>
            {stats.highRisk > 0 && (
              <span className="px-2 py-1 bg-red-100 dark:bg-red-500/20 rounded-lg text-xs">
                <span className="text-red-600">เสี่ยงสูง:</span>
                <span className="ml-1 font-bold text-red-700">{stats.highRisk}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Category Dropdown - Mobile */}
          <div className="md:w-52 shrink-0">
            <CategoryDropdown selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
          </div>
          
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาแบบประเมิน..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
          
          {/* View Mode & Add Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            <button className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/25">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">เพิ่มแบบประเมิน</span>
            </button>
          </div>
        </div>
      </div>

      {/* Assessments List - Dynamic Height */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
        {/* List Header */}
        <div className="px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-800 dark:text-white">รายการแบบประเมิน</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              {filteredAssessments.length} รายการ
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden md:block">คลิกที่รายการเพื่อดูรายละเอียด</p>
        </div>

        {/* Assessment Items */}
        <div className="p-4">
          {Object.entries(groupedAssessments).map(([categoryId, assessments]) => {
            const category = categories.find(c => c.id === categoryId);
            if (!category || assessments.length === 0) return null;
            
            return (
              <div key={categoryId} className="mb-6 last:mb-0">
                {selectedCategory === 'all' && (
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryIcon category={categoryId} size="sm" />
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm">{category.name}</h3>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold text-slate-500">
                      {assessments.length}
                    </span>
                  </div>
                )}
                
                {viewMode === 'list' && (
                  <div className="space-y-2">
                    {assessments.map((assessment) => (
                      <button
                        key={assessment.id}
                        onClick={() => handleSelectAssessment(assessment)}
                        className="w-full p-4 rounded-xl border transition-all text-left hover:shadow-md border-slate-200/50 dark:border-slate-700/50 hover:border-teal-300 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-700/50"
                      >
                        <div className="flex items-center gap-4">
                          <CategoryIcon category={assessment.category} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-slate-800 dark:text-white">{assessment.name}</h4>
                              <StatusBadge status={assessment.status} />
                              {assessment.riskLevel && <RiskBadge risk={assessment.riskLevel} />}
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{assessment.nameTh}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                              {assessment.score && <span className="font-bold text-slate-600 dark:text-slate-300">{assessment.score}</span>}
                              {assessment.assessedBy && (
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />{assessment.assessedBy}
                                </span>
                              )}
                              {assessment.lastUpdated && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />{assessment.lastUpdated}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {assessments.map((assessment) => (
                      <button
                        key={assessment.id}
                        onClick={() => handleSelectAssessment(assessment)}
                        className="p-4 rounded-xl border transition-all text-left hover:shadow-md border-slate-200/50 dark:border-slate-700/50 hover:border-teal-300 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-700/50"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <CategoryIcon category={assessment.category} size="sm" />
                          <StatusBadge status={assessment.status} />
                        </div>
                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1">{assessment.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{assessment.nameTh}</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                          {assessment.score ? (
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{assessment.score}</span>
                          ) : (
                            <span className="text-xs text-slate-400">-</span>
                          )}
                          {assessment.riskLevel && <RiskBadge risk={assessment.riskLevel} />}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredAssessments.length === 0 && (
            <div className="text-center py-12">
              <FileQuestion className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">ไม่พบแบบประเมิน</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}