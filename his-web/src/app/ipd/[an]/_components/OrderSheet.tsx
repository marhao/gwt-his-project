'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Plus, Search, Edit2, Trash2, Save, Check, X, Ban,
  Zap, RefreshCw, PlayCircle, StopCircle, Printer,
  MessageSquare, PanelLeftClose, PanelRightClose, Minimize2, Maximize2,
  Calendar, Clock, User, ChevronDown, ChevronUp, Edit3,
} from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Order, ProgressNote } from '../_types';

// Autocomplete Data
const medicationList = [
  { name: 'NSS 0.9% 1000ml', defaultDose: 'IV drip over 8 hours', defaultFreq: 'TID', defaultRoute: 'IV' },
  { name: 'Paracetamol 500mg', defaultDose: '1-2 tab', defaultFreq: 'Q6H PRN', defaultRoute: 'PO' },
  { name: 'Omeprazole 40mg IV', defaultDose: '1 vial', defaultFreq: 'OD', defaultRoute: 'IV' },
  { name: 'Morphine 10mg', defaultDose: '0.5-1 amp', defaultFreq: 'Q4H PRN', defaultRoute: 'IV' },
];
const labList = [
  { name: 'CBC', description: 'Complete Blood Count' },
  { name: 'BUN, Cr', description: 'Kidney Function' },
  { name: 'Electrolyte', description: 'Na, K, Cl, CO2' },
  { name: 'Cardiac enzyme', description: 'Troponin-T' },
];
const treatmentList = [
  { name: 'Oxygen Cannula', defaultDose: '2-4 L/min' },
  { name: 'EKG Monitor', defaultDose: 'Continuous' },
  { name: 'Foley catheter', defaultDose: 'Strict I/O' },
];
const instructionList = ['รับประทานก่อนอาหาร 30 นาที', 'รับประทานหลังอาหารทันที', 'รับประทานก่อนนอน', 'ฉีดเข้าใต้ผิวหนังบริเวณหน้าท้อง'];
const frequencyOptions = ['OD', 'BID', 'TID', 'QID', 'Q4H', 'Q6H', 'Q8H', 'Q6H PRN', 'Q4H PRN', 'STAT', 'Continuous', 'OD PC', 'OD HS'];
const routeOptions = ['PO', 'IV', 'IM', 'SC', 'SL', 'PR', 'Topical', 'Inhalation'];

const getRouteColor = (route: string) => {
  const colors: Record<string, string> = {
    IV: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400',
    PO: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    IM: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    SC: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  };
  return colors[route] || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
};

// Autocomplete Input Component
const AutocompleteInput = ({ value, onChange, onSelect, options, placeholder, className = '' }: {
  value: string; onChange: (v: string) => void; onSelect?: (opt: any) => void; options: any[]; placeholder: string; className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setSearchQuery(value || ''); }, [value]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const filteredOptions = options.filter(opt => (typeof opt === 'string' ? opt : opt.name).toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); onChange(e.target.value); setIsOpen(true); }} onFocus={() => setIsOpen(true)} placeholder={placeholder} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-52 overflow-y-auto">
          {filteredOptions.slice(0, 8).map((opt, idx) => (
            <button key={idx} type="button" onClick={() => { const name = typeof opt === 'string' ? opt : opt.name; setSearchQuery(name); onChange(name); onSelect?.(opt); setIsOpen(false); }} className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700">
              <div className="font-medium">{typeof opt === 'string' ? opt : opt.name}</div>
              {typeof opt !== 'string' && (opt.description || opt.defaultDose) && <div className="text-xs text-slate-500">{opt.description || opt.defaultDose}</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Order Row Component
const OrderRow = ({ order, onDelete, onDiscontinue, onSave, isEditing, setEditingId }: { order: Order; onDelete: (order: Order) => void; onDiscontinue: (order: Order) => void; onSave: (order: Order) => void; isEditing: boolean; setEditingId: (id: number | null) => void; }) => {
  const [editedOrder, setEditedOrder] = useState<Order>(order);
  const routeColor = getRouteColor(order.route || '');
  useEffect(() => { setEditedOrder(order); }, [order]);
  const handleSave = () => { onSave(editedOrder); setEditingId(null); };
  const handleCancel = () => { setEditedOrder(order); setEditingId(null); };

  if (isEditing && !order.isDiscontinued) {
    return (
      <div className="py-3 px-3 -mx-3 border-b border-slate-200 dark:border-slate-700 last:border-0 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
        <div className="space-y-3">
          <input type="text" value={editedOrder.name} onChange={(e) => setEditedOrder({ ...editedOrder, name: e.target.value })} className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium" />
          {order.type === 'medication' && (
            <div className="grid grid-cols-3 gap-2">
              <input type="text" value={editedOrder.dose || ''} onChange={(e) => setEditedOrder({ ...editedOrder, dose: e.target.value })} placeholder="Dose" className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm" />
              <select value={editedOrder.frequency || ''} onChange={(e) => setEditedOrder({ ...editedOrder, frequency: e.target.value })} className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm">{frequencyOptions.map(f => <option key={f} value={f}>{f}</option>)}</select>
              <select value={editedOrder.route || ''} onChange={(e) => setEditedOrder({ ...editedOrder, route: e.target.value })} className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm">{routeOptions.map(r => <option key={r} value={r}>{r}</option>)}</select>
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <button onClick={handleCancel} className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm flex items-center gap-1.5"><X className="w-4 h-4" /> ยกเลิก</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-1.5"><Check className="w-4 h-4" /> บันทึก</button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex items-start gap-3 py-3 px-3 -mx-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0 group rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/30 transition-colors ${order.isDiscontinued ? 'opacity-60' : ''}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {order.isStat && <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded animate-pulse">STAT</span>}
          <span className={`font-medium text-sm ${order.isDiscontinued ? 'line-through' : ''}`}>{order.name}</span>
          {order.route && <span className={`px-2 py-0.5 text-xs font-bold rounded ${routeColor}`}>{order.route}</span>}
        </div>
        {(order.dose || order.frequency) && <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{order.dose && <span>{order.dose}</span>}{order.frequency && <span className="ml-2 font-medium">{order.frequency}</span>}</div>}
        {order.instruction && !order.isDiscontinued && <div className="text-xs text-slate-500 italic mt-1.5">💊 {order.instruction}</div>}
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{order.startDate}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{order.time}</span>
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{order.prescriber}</span>
        </div>
        {order.isDiscontinued && <div className="mt-2 px-3 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-xs"><span className="font-semibold text-red-500">DC:</span><span className="text-slate-500 ml-2">{order.endDate} {order.endTime} • {order.dcBy} • {order.dcReason}</span></div>}
      </div>
      {!order.isDiscontinued && (
        <div className="flex gap-1 shrink-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditingId(order.id)} className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-500"><Edit2 className="w-4 h-4" /></button>
          {order.orderType === 'continue' && <button onClick={() => onDiscontinue(order)} className="p-2 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-500/20 text-orange-500"><StopCircle className="w-4 h-4" /></button>}
          <button onClick={() => onDelete(order)} className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  );
};

// Collapsed Column
const CollapsedColumn = ({ title, icon: Icon, color, count, onClick }: { title: string; icon: any; color: string; count: number; onClick: () => void; }) => (
  <div onClick={onClick} className="hidden lg:flex w-12 flex-col items-center py-4 cursor-pointer hover:w-14 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700">
    <button className={`p-2 rounded-xl ${color} mb-2`}><Icon className="w-4 h-4 text-white" /></button>
    <div className="text-xs font-bold text-slate-600 dark:text-slate-300" style={{ writingMode: 'vertical-rl' }}>{title}</div>
    <span className="mt-2 px-1.5 py-0.5 rounded text-xs font-bold bg-white dark:bg-slate-700">{count}</span>
    <Maximize2 className="w-4 h-4 mt-2 text-slate-400" />
  </div>
);

// Splitter Component
const Splitter = ({ index, onMouseDown, isDragging }: { index: number; onMouseDown: (index: number) => (e: React.MouseEvent) => void; isDragging: number | null; }) => (
  <div onMouseDown={onMouseDown(index)} className={`hidden lg:flex w-2 flex-col items-center justify-center cursor-col-resize shrink-0 ${isDragging === index ? 'bg-blue-500' : 'bg-slate-300/80 dark:bg-slate-600/80 hover:bg-blue-400'}`}>
    <div className="flex flex-col gap-1">{[...Array(6)].map((_, i) => <div key={i} className={`w-1 h-1 rounded-full ${isDragging === index ? 'bg-white' : 'bg-slate-500'}`} />)}</div>
  </div>
);

interface OrderSheetProps { orders: Order[]; setOrders: React.Dispatch<React.SetStateAction<Order[]>>; progressNotes: ProgressNote[]; setProgressNotes: React.Dispatch<React.SetStateAction<ProgressNote[]>>; }

export function OrderSheet({ orders, setOrders, progressNotes, setProgressNotes }: OrderSheetProps) {
  const [col1Open, setCol1Open] = useState(true);
  const [col2Open, setCol2Open] = useState(true);
  const [col3Open, setCol3Open] = useState(true);
  const [col1Flex, setCol1Flex] = useState(1);
  const [col2Flex, setCol2Flex] = useState(1);
  const [col3Flex, setCol3Flex] = useState(1);
  const [draggingSplitter, setDraggingSplitter] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidths, setStartWidths] = useState({ col1: 0, col2: 0, col3: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileTab, setMobileTab] = useState<'notes' | 'oneday' | 'continue'>('continue');
  const [showAddForm, setShowAddForm] = useState<'oneday' | 'continue' | null>(null);
  const [newOrder, setNewOrder] = useState({ type: 'medication' as 'medication' | 'lab' | 'treatment', name: '', dose: '', frequency: 'TID', route: 'PO', instruction: '', orderType: 'continue' as 'oneday' | 'continue', isStat: false });
  const [newProgressNote, setNewProgressNote] = useState({ subjective: '', objective: '', assessment: '', plan: '' });
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [soapFormCollapsed, setSoapFormCollapsed] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; order: Order | null }>({ isOpen: false, order: null });
  const [dcDialog, setDcDialog] = useState<{ isOpen: boolean; order: Order | null }>({ isOpen: false, order: null });

  const oneDayOrders = orders.filter(o => o.orderType === 'oneday' && !o.isDiscontinued);
  const continueOrders = orders.filter(o => o.orderType === 'continue' && !o.isDiscontinued);
  const discontinuedOrders = orders.filter(o => o.isDiscontinued);

  const handleMouseDown = (splitterIndex: number) => (e: React.MouseEvent) => {
    e.preventDefault(); setDraggingSplitter(splitterIndex); setStartX(e.clientX);
    if (containerRef.current) {
      const cols = containerRef.current.querySelectorAll('[data-column]');
      setStartWidths({ col1: (cols[0] as HTMLElement)?.offsetWidth || 0, col2: (cols[1] as HTMLElement)?.offsetWidth || 0, col3: (cols[2] as HTMLElement)?.offsetWidth || 0 });
    }
  };

  useEffect(() => {
    if (draggingSplitter === null) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const delta = e.clientX - startX;
      const containerWidth = containerRef.current.offsetWidth;
      if (draggingSplitter === 1 && col1Open && col2Open) {
        const newCol1Width = Math.max(150, Math.min(containerWidth * 0.5, startWidths.col1 + delta));
        const newCol2Width = Math.max(150, startWidths.col2 - delta);
        const totalFlex = col1Flex + col2Flex + col3Flex;
        setCol1Flex((newCol1Width / (newCol1Width + newCol2Width + startWidths.col3)) * totalFlex);
        setCol2Flex((newCol2Width / (newCol1Width + newCol2Width + startWidths.col3)) * totalFlex);
      } else if (draggingSplitter === 2 && col2Open && col3Open) {
        const newCol2Width = Math.max(150, Math.min(containerWidth * 0.5, startWidths.col2 + delta));
        const newCol3Width = Math.max(150, startWidths.col3 - delta);
        const totalFlex = col1Flex + col2Flex + col3Flex;
        setCol2Flex((newCol2Width / (startWidths.col1 + newCol2Width + newCol3Width)) * totalFlex);
        setCol3Flex((newCol3Width / (startWidths.col1 + newCol2Width + newCol3Width)) * totalFlex);
      }
    };
    const handleMouseUp = () => setDraggingSplitter(null);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); };
  }, [draggingSplitter, startX, startWidths, col1Flex, col2Flex, col3Flex, col1Open, col2Open, col3Open]);

  const getAutocompleteOptions = () => { if (newOrder.type === 'medication') return medicationList; if (newOrder.type === 'lab') return labList; if (newOrder.type === 'treatment') return treatmentList; return []; };
  const handleMedicationSelect = (opt: any) => { if (typeof opt !== 'string' && opt.defaultDose) setNewOrder({ ...newOrder, name: opt.name, dose: opt.defaultDose || '', frequency: opt.defaultFreq || newOrder.frequency, route: opt.defaultRoute || newOrder.route }); };
  
  const addOrder = () => {
    if (!newOrder.name) return;
    const order: Order = { id: Date.now(), type: newOrder.type, name: newOrder.name, dose: newOrder.dose, frequency: newOrder.frequency, route: newOrder.route, instruction: newOrder.instruction, orderType: newOrder.orderType, startDate: '20/01/67', time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), prescriber: 'นพ.วิชัย', status: newOrder.isStat ? 'pending' : 'active', isStat: newOrder.isStat, isDiscontinued: false };
    setOrders([order, ...orders]);
    setNewOrder({ type: 'medication', name: '', dose: '', frequency: 'TID', route: 'PO', instruction: '', orderType: 'continue', isStat: false });
    setShowAddForm(null);
  };

  const saveProgressNote = () => {
    if (!newProgressNote.subjective && !newProgressNote.objective && !newProgressNote.assessment && !newProgressNote.plan) return;
    const note: ProgressNote = { id: Date.now(), date: '20/01/67', time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), author: 'นพ.วิชัย หัวใจดี', ...newProgressNote, vitalSigns: { bp: '125/78', hr: 72, rr: 18, temp: 36.8, o2sat: 98 } };
    setProgressNotes([note, ...progressNotes]);
    setNewProgressNote({ subjective: '', objective: '', assessment: '', plan: '' });
  };

  const handleInlineSave = (updatedOrder: Order) => { setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o)); };
  const handleDelete = (order: Order) => { setDeleteDialog({ isOpen: true, order }); };
  const confirmDelete = () => { if (deleteDialog.order) setOrders(orders.filter(o => o.id !== deleteDialog.order!.id)); setDeleteDialog({ isOpen: false, order: null }); };
  const handleDiscontinue = (order: Order) => { setDcDialog({ isOpen: true, order }); };
  const confirmDiscontinue = () => { if (dcDialog.order) setOrders(orders.map(o => o.id === dcDialog.order!.id ? { ...o, isDiscontinued: true, status: 'discontinued', endDate: '20/01/67', endTime: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), dcBy: 'นพ.วิชัย', dcReason: 'แพทย์สั่งหยุด' } : o)); setDcDialog({ isOpen: false, order: null }); };

  // Progress Notes Content
  const NotesContent = () => (
    <div className="p-4 space-y-3">
      {/* SOAP Form */}
      <div className={`border border-slate-200/50 dark:border-slate-700/50 rounded-xl overflow-hidden ${soapFormCollapsed ? '' : 'bg-blue-50/30 dark:bg-blue-500/5'}`}>
        <div className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-blue-100/50 dark:hover:bg-slate-700/50" onClick={() => setSoapFormCollapsed(!soapFormCollapsed)}>
          <div className="flex items-center gap-2"><Edit3 className="w-4 h-4 text-blue-500" /><span className="text-sm font-semibold">เขียน Progress Note</span></div>
          {soapFormCollapsed ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </div>
        {!soapFormCollapsed && (
          <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="grid grid-cols-2 gap-3">
              {[{ key: 'subjective', letter: 'S', color: 'bg-blue-500' }, { key: 'objective', letter: 'O', color: 'bg-purple-500' }, { key: 'assessment', letter: 'A', color: 'bg-emerald-500' }, { key: 'plan', letter: 'P', color: 'bg-amber-500' }].map(item => (
                <div key={item.key}>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5"><span className={`w-5 h-5 ${item.color} rounded text-white text-xs flex items-center justify-center font-bold`}>{item.letter}</span></label>
                  <textarea value={(newProgressNote as any)[item.key]} onChange={(e) => setNewProgressNote({...newProgressNote, [item.key]: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm resize-none" rows={2} />
                </div>
              ))}
            </div>
            <button onClick={saveProgressNote} className="w-full mt-3 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Note</button>
          </div>
        )}
      </div>
      {/* Notes List */}
      {progressNotes.map((note, idx) => (
        <div key={note.id} className="p-4 rounded-xl bg-white/80 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/50">
          <div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-blue-600 dark:text-blue-400">#{progressNotes.length - idx} • {note.date} {note.time}</span><span className="text-xs text-slate-500">{note.author}</span></div>
          {note.vitalSigns && <div className="text-sm mb-3 p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-600/50">BP {note.vitalSigns.bp} | HR {note.vitalSigns.hr} | T {note.vitalSigns.temp}°C</div>}
          <div className="space-y-1 text-sm">
            {note.subjective && <div><span className="font-bold text-blue-500">S:</span> {note.subjective}</div>}
            {note.objective && <div><span className="font-bold text-purple-500">O:</span> {note.objective}</div>}
            {note.assessment && <div><span className="font-bold text-emerald-500">A:</span> {note.assessment}</div>}
            {note.plan && <div><span className="font-bold text-amber-500">P:</span> {note.plan}</div>}
          </div>
        </div>
      ))}
      {discontinuedOrders.length > 0 && (
        <div className="mt-4"><div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-500"><Ban className="w-4 h-4" /> Discontinued ({discontinuedOrders.length})</div>
          <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-700/30">{discontinuedOrders.map(order => (<div key={order.id} className="py-2 border-b border-slate-200 dark:border-slate-600 last:border-0"><div className="text-sm line-through text-slate-500">{order.name}</div><div className="text-xs text-slate-400 mt-1">DC: {order.endDate} • {order.dcReason}</div></div>))}</div>
        </div>
      )}
    </div>
  );

  // Orders Content
  const OrdersContent = ({ type }: { type: 'oneday' | 'continue' }) => {
    const isOneday = type === 'oneday';
    const orderList = isOneday ? oneDayOrders : continueOrders;
    const bgColor = isOneday ? 'bg-amber-500' : 'bg-emerald-500';
    return (
      <div className="p-4 space-y-4">
        {showAddForm === type && (
          <div className={`p-4 rounded-xl border ${isOneday ? 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-200/50' : 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-200/50'}`}>
            <div className="space-y-3">
              <div className="flex gap-2">{(isOneday ? [{v:'lab',l:'🔬 Lab'},{v:'medication',l:'💊 ยา'},{v:'treatment',l:'🏥 Tx'}] : [{v:'medication',l:'💊 ยา'},{v:'treatment',l:'🏥 Tx'}]).map(t => (<button key={t.v} onClick={() => setNewOrder({...newOrder, type: t.v as any})} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${newOrder.type === t.v ? `${bgColor} text-white` : 'bg-white dark:bg-slate-700 border border-slate-200'}`}>{t.l}</button>))}</div>
              <AutocompleteInput value={newOrder.name} onChange={(v) => setNewOrder({...newOrder, name: v})} onSelect={handleMedicationSelect} options={getAutocompleteOptions()} placeholder="พิมพ์ค้นหา..." />
              {newOrder.type === 'medication' && <div className="grid grid-cols-3 gap-2"><input type="text" value={newOrder.dose} onChange={(e) => setNewOrder({...newOrder, dose: e.target.value})} placeholder="Dose" className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm" /><select value={newOrder.frequency} onChange={(e) => setNewOrder({...newOrder, frequency: e.target.value})} className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm">{frequencyOptions.map(f => <option key={f} value={f}>{f}</option>)}</select><select value={newOrder.route} onChange={(e) => setNewOrder({...newOrder, route: e.target.value})} className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm">{routeOptions.map(r => <option key={r} value={r}>{r}</option>)}</select></div>}
              {isOneday && <button onClick={() => setNewOrder({...newOrder, isStat: !newOrder.isStat})} className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 ${newOrder.isStat ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-700 border border-slate-200'}`}><Zap className="w-4 h-4" />STAT</button>}
              <div className="flex gap-2"><button onClick={() => setShowAddForm(null)} className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm">ยกเลิก</button><button onClick={addOrder} disabled={!newOrder.name} className={`flex-1 px-4 py-2.5 ${bgColor} text-white rounded-lg text-sm font-semibold ${!newOrder.name ? 'opacity-50' : ''}`}><Check className="w-4 h-4 inline mr-1" />เพิ่ม</button></div>
            </div>
          </div>
        )}
        {!isOneday && <div><div className="text-sm font-bold uppercase tracking-wider mb-2 text-slate-500">📋 General Orders</div><div className="rounded-xl bg-white/80 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/50 p-4">{['Soft diet / Low salt', 'Record V/S q 4 hr', 'Strict I/O', 'Keep O2 sat ≥ 95%'].map((o, i) => <div key={i} className="text-sm py-1.5">• {o}</div>)}</div></div>}
        {(isOneday ? ['lab', 'medication', 'treatment'] : ['medication', 'treatment']).map(orderType => {
          const typeOrders = orderList.filter(o => o.type === orderType);
          if (typeOrders.length === 0) return null;
          return (<div key={orderType}><div className={`text-sm font-bold uppercase tracking-wider mb-2 ${orderType === 'lab' ? 'text-purple-600' : orderType === 'medication' ? 'text-blue-600' : 'text-emerald-600'}`}>{orderType === 'lab' ? '🔬 Laboratory' : orderType === 'medication' ? '💊 Medications' : '🏥 Treatments'}</div><div className="rounded-xl bg-white/80 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/50 p-4">{typeOrders.map(order => <OrderRow key={order.id} order={order} onDelete={handleDelete} onDiscontinue={handleDiscontinue} onSave={handleInlineSave} isEditing={editingOrderId === order.id} setEditingId={setEditingOrderId} />)}</div></div>);
        })}
        {orderList.length === 0 && <div className="text-center py-12 text-slate-400">{isOneday ? <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-30" /> : <RefreshCw className="w-12 h-12 mx-auto mb-3 opacity-30" />}<p className="text-sm">ไม่มี {isOneday ? 'One Day' : 'Continue'} Order</p></div>}
      </div>
    );
  };

  return (
    <>
      <ConfirmDialog open={deleteDialog.isOpen} onClose={() => setDeleteDialog({ isOpen: false, order: null })} onConfirm={confirmDelete} title="ยืนยันการลบ" message={`ต้องการลบ "${deleteDialog.order?.name}"?`} confirmText="ลบ" variant="danger" />
      <ConfirmDialog open={dcDialog.isOpen} onClose={() => setDcDialog({ isOpen: false, order: null })} onConfirm={confirmDiscontinue} title="ยืนยันการ Discontinue" message={`ต้องการหยุด "${dcDialog.order?.name}"?`} confirmText="Discontinue" variant="warning" />

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        {/* Mobile Tabs */}
        <div className="lg:hidden flex border-b border-slate-200/50 dark:border-slate-700/50">
          {[{ id: 'notes', label: 'Progress', icon: MessageSquare, count: progressNotes.length, color: 'blue' }, { id: 'oneday', label: 'One Day', icon: PlayCircle, count: oneDayOrders.length, color: 'amber' }, { id: 'continue', label: 'Continue', icon: RefreshCw, count: continueOrders.length, color: 'emerald' }].map(tab => (
            <button key={tab.id} onClick={() => setMobileTab(tab.id as any)} className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium ${mobileTab === tab.id ? `text-${tab.color}-600 border-b-2 border-${tab.color}-500` : 'text-slate-500'}`}><tab.icon className="w-4 h-4" /><span className="hidden sm:inline">{tab.label}</span><span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-700">{tab.count}</span></button>
          ))}
        </div>
        {/* Mobile Add Button */}
        {mobileTab !== 'notes' && <div className="lg:hidden p-4 border-b border-slate-200/50"><button onClick={() => { setShowAddForm(mobileTab); setNewOrder({...newOrder, orderType: mobileTab}); }} className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 ${mobileTab === 'oneday' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}><Plus className="w-4 h-4" /> เพิ่ม Order</button></div>}
        {/* Mobile Content */}
        <div className={`lg:hidden ${mobileTab === 'notes' ? 'bg-blue-50/30' : mobileTab === 'oneday' ? 'bg-amber-50/50' : 'bg-emerald-50/50'}`}>{mobileTab === 'notes' ? <NotesContent /> : <OrdersContent type={mobileTab} />}</div>

        {/* Desktop 3-Column Layout */}
        <div ref={containerRef} className="hidden lg:flex min-h-[500px]">
          {/* Column 1: Progress Note - Blue */}
          {col1Open ? (
            <div data-column="1" className="flex flex-col bg-blue-50/30 dark:bg-slate-800/50 overflow-hidden min-w-[200px]" style={{ flex: col1Flex }}>
              <div className="sticky top-0 z-10 px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between bg-blue-100/80 dark:bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-center gap-2"><div className="p-1.5 rounded-lg bg-blue-500"><MessageSquare className="w-4 h-4 text-white" /></div><span className="text-sm font-bold">Progress Note</span><span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-200 dark:bg-blue-500/20 text-blue-700">{progressNotes.length}</span></div>
                <button onClick={() => setCol1Open(false)} className="p-1.5 rounded hover:bg-blue-200 dark:hover:bg-slate-700"><PanelLeftClose className="w-4 h-4 text-slate-400" /></button>
              </div>
              <NotesContent />
            </div>
          ) : <CollapsedColumn title="Progress Note" icon={MessageSquare} color="bg-blue-500" count={progressNotes.length} onClick={() => setCol1Open(true)} />}

          {col1Open && col2Open && <Splitter index={1} onMouseDown={handleMouseDown} isDragging={draggingSplitter} />}

          {/* Column 2: One Day - Yellow/Amber */}
          {col2Open ? (
            <div data-column="2" className="flex flex-col bg-amber-50/50 dark:bg-amber-900/10 overflow-hidden min-w-[200px]" style={{ flex: col2Flex }}>
              <div className="sticky top-0 z-10 px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between bg-amber-100/80 dark:bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-center gap-2"><div className="p-1.5 rounded-lg bg-amber-500"><PlayCircle className="w-4 h-4 text-white" /></div><span className="text-sm font-bold">One Day</span><span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-200 dark:bg-amber-500/20 text-amber-700">{oneDayOrders.length}</span></div>
                <div className="flex gap-1"><button onClick={() => { setShowAddForm('oneday'); setNewOrder({...newOrder, orderType: 'oneday'}); }} className={`p-1.5 rounded ${showAddForm === 'oneday' ? 'bg-amber-500 text-white' : 'hover:bg-amber-200'}`}><Plus className="w-4 h-4" /></button><button onClick={() => setCol2Open(false)} className="p-1.5 rounded hover:bg-amber-200"><Minimize2 className="w-4 h-4 text-slate-400" /></button></div>
              </div>
              <OrdersContent type="oneday" />
            </div>
          ) : <CollapsedColumn title="One Day" icon={PlayCircle} color="bg-amber-500" count={oneDayOrders.length} onClick={() => setCol2Open(true)} />}

          {col2Open && col3Open && <Splitter index={2} onMouseDown={handleMouseDown} isDragging={draggingSplitter} />}

          {/* Column 3: Continue - Green */}
          {col3Open ? (
            <div data-column="3" className="flex flex-col bg-emerald-50/50 dark:bg-emerald-900/10 overflow-hidden min-w-[200px]" style={{ flex: col3Flex }}>
              <div className="sticky top-0 z-10 px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between bg-emerald-100/80 dark:bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-center gap-2"><div className="p-1.5 rounded-lg bg-emerald-500"><RefreshCw className="w-4 h-4 text-white" /></div><span className="text-sm font-bold">Continue</span><span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-200 dark:bg-emerald-500/20 text-emerald-700">{continueOrders.length}</span></div>
                <div className="flex gap-1"><button onClick={() => { setShowAddForm('continue'); setNewOrder({...newOrder, orderType: 'continue'}); }} className={`p-1.5 rounded ${showAddForm === 'continue' ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-200'}`}><Plus className="w-4 h-4" /></button><button onClick={() => setCol3Open(false)} className="p-1.5 rounded hover:bg-emerald-200"><PanelRightClose className="w-4 h-4 text-slate-400" /></button></div>
              </div>
              <OrdersContent type="continue" />
            </div>
          ) : <CollapsedColumn title="Continue" icon={RefreshCw} color="bg-emerald-500" count={continueOrders.length} onClick={() => setCol3Open(true)} />}
        </div>
      </div>
    </>
  );
}