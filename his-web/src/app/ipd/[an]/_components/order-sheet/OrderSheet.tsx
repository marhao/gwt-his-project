'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, PlayCircle, RefreshCw } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

// Import Types
import { Order, ProgressNote, getCurrentDateTime } from './types';

// Import Panels
import { ProgressNotePanel, ProgressNotePanelMobile } from './ProgressNotePanel';
import { OneDayOrderPanel, OneDayOrderPanelMobile } from './OneDayOrderPanel';
import { ContinueOrderPanel, ContinueOrderPanelMobile } from './ContinueOrderPanel';

// Import Shared Components
import { Splitter } from './shared-components';

// ============================================
// Main OrderSheet Component
// ============================================

interface OrderSheetProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  progressNotes: ProgressNote[];
  setProgressNotes: React.Dispatch<React.SetStateAction<ProgressNote[]>>;
}

export function OrderSheet({ 
  orders, 
  setOrders, 
  progressNotes, 
  setProgressNotes 
}: OrderSheetProps) {
  // Column open/close states
  const [col1Open, setCol1Open] = useState(true);
  const [col2Open, setCol2Open] = useState(true);
  const [col3Open, setCol3Open] = useState(true);

  // Column flex states for resizing
  const [col1Flex, setCol1Flex] = useState(1);
  const [col2Flex, setCol2Flex] = useState(1);
  const [col3Flex, setCol3Flex] = useState(1);

  // Splitter dragging state
  const [draggingSplitter, setDraggingSplitter] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidths, setStartWidths] = useState({ col1: 0, col2: 0, col3: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<'notes' | 'oneday' | 'continue'>('continue');

  // Dialog states
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; order: Order | null }>({ 
    isOpen: false, 
    order: null 
  });
  const [dcDialog, setDcDialog] = useState<{ isOpen: boolean; order: Order | null }>({ 
    isOpen: false, 
    order: null 
  });

  // Computed values
  const discontinuedOrders = orders.filter(o => o.isDiscontinued);
  const oneDayOrdersCount = orders.filter(o => o.orderType === 'oneday' && !o.isDiscontinued).length;
  const continueOrdersCount = orders.filter(o => o.orderType === 'continue' && !o.isDiscontinued).length;

  // ============================================
  // Splitter Drag Handlers
  // ============================================

  const handleMouseDown = (splitterIndex: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setDraggingSplitter(splitterIndex);
    setStartX(e.clientX);
    
    if (containerRef.current) {
      const cols = containerRef.current.querySelectorAll('[data-column]');
      setStartWidths({
        col1: (cols[0] as HTMLElement)?.offsetWidth || 0,
        col2: (cols[1] as HTMLElement)?.offsetWidth || 0,
        col3: (cols[2] as HTMLElement)?.offsetWidth || 0
      });
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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingSplitter, startX, startWidths, col1Flex, col2Flex, col3Flex, col1Open, col2Open, col3Open]);

  // ============================================
  // Order Actions
  // ============================================

  const handleDeleteOrder = (order: Order) => {
    setDeleteDialog({ isOpen: true, order });
  };

  const confirmDelete = () => {
    if (deleteDialog.order) {
      setOrders(prev => prev.filter(o => o.id !== deleteDialog.order!.id));
    }
    setDeleteDialog({ isOpen: false, order: null });
  };

  const handleDiscontinueOrder = (order: Order) => {
    setDcDialog({ isOpen: true, order });
  };

  const confirmDiscontinue = () => {
    if (dcDialog.order) {
      const { date, time } = getCurrentDateTime();
      setOrders(prev => prev.map(o => 
        o.id === dcDialog.order!.id 
          ? { 
              ...o, 
              isDiscontinued: true, 
              status: 'discontinued' as const, 
              endDate: date, 
              endTime: time, 
              dcBy: 'นพ.วิชัย', 
              dcReason: 'แพทย์สั่งหยุด' 
            } 
          : o
      ));
    }
    setDcDialog({ isOpen: false, order: null });
  };

  // ============================================
  // Render
  // ============================================

  return (
    <>
      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, order: null })}
        onConfirm={confirmDelete}
        title="ยืนยันการลบ"
        message={`คุณต้องการลบ "${deleteDialog.order?.name}" ใช่หรือไม่?`}
        confirmText="ลบ"
        variant="danger"
      />

      <ConfirmDialog
        open={dcDialog.isOpen}
        onClose={() => setDcDialog({ isOpen: false, order: null })}
        onConfirm={confirmDiscontinue}
        title="ยืนยันการ Discontinue"
        message={`คุณต้องการหยุด "${dcDialog.order?.name}" ใช่หรือไม่?`}
        confirmText="Discontinue"
        variant="warning"
      />

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        
        {/* ============================================ */}
        {/* Mobile Layout */}
        {/* ============================================ */}
        
        {/* Mobile Tabs */}
        <div className="lg:hidden flex border-b border-slate-200/50 dark:border-slate-700/50">
          {[
            { id: 'notes', label: 'Progress', icon: MessageSquare, count: progressNotes.length, color: 'blue' },
            { id: 'oneday', label: 'One Day', icon: PlayCircle, count: oneDayOrdersCount, color: 'amber' },
            { id: 'continue', label: 'Continue', icon: RefreshCw, count: continueOrdersCount, color: 'emerald' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors ${
                mobileTab === tab.id
                  ? `text-${tab.color}-600 dark:text-${tab.color}-400 border-b-2 border-${tab.color}-500`
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                mobileTab === tab.id 
                  ? `bg-${tab.color}-100 dark:bg-${tab.color}-500/20` 
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile Content */}
        <div className="lg:hidden">
          {mobileTab === 'notes' && (
            <ProgressNotePanelMobile
              progressNotes={progressNotes}
              setProgressNotes={setProgressNotes}
              discontinuedOrders={discontinuedOrders}
            />
          )}
          {mobileTab === 'oneday' && (
            <OneDayOrderPanelMobile
              orders={orders}
              setOrders={setOrders}
              onDeleteOrder={handleDeleteOrder}
              onDiscontinueOrder={handleDiscontinueOrder}
            />
          )}
          {mobileTab === 'continue' && (
            <ContinueOrderPanelMobile
              orders={orders}
              setOrders={setOrders}
              onDeleteOrder={handleDeleteOrder}
              onDiscontinueOrder={handleDiscontinueOrder}
            />
          )}
        </div>

        {/* ============================================ */}
        {/* Desktop Layout - 3 Columns with Splitters */}
        {/* ============================================ */}
        
        <div 
          ref={containerRef} 
          className="hidden lg:flex min-h-[500px]"
        >
          {/* Column 1: Progress Note (Blue) */}
          <ProgressNotePanel
            progressNotes={progressNotes}
            setProgressNotes={setProgressNotes}
            discontinuedOrders={discontinuedOrders}
            isOpen={col1Open}
            onClose={() => setCol1Open(!col1Open)}
            flex={col1Flex}
          />

          {/* Splitter 1 */}
          {col1Open && col2Open && (
            <Splitter 
              index={1} 
              onMouseDown={handleMouseDown} 
              isDragging={draggingSplitter} 
            />
          )}

          {/* Column 2: One Day Order (Yellow/Amber) */}
          <OneDayOrderPanel
            orders={orders}
            setOrders={setOrders}
            isOpen={col2Open}
            onClose={() => setCol2Open(!col2Open)}
            flex={col2Flex}
            onDeleteOrder={handleDeleteOrder}
            onDiscontinueOrder={handleDiscontinueOrder}
          />

          {/* Splitter 2 */}
          {col2Open && col3Open && (
            <Splitter 
              index={2} 
              onMouseDown={handleMouseDown} 
              isDragging={draggingSplitter} 
            />
          )}

          {/* Column 3: Continue Order (Green) */}
          <ContinueOrderPanel
            orders={orders}
            setOrders={setOrders}
            isOpen={col3Open}
            onClose={() => setCol3Open(!col3Open)}
            flex={col3Flex}
            onDeleteOrder={handleDeleteOrder}
            onDiscontinueOrder={handleDiscontinueOrder}
          />
        </div>
      </div>
    </>
  );
}

// Re-export types for convenience
export type { Order, ProgressNote } from './types';