'use client';

import { useState } from 'react';
import { 
  MessageSquare, PanelLeftClose, Save, Ban,
  ChevronDown, ChevronUp, Edit3 
} from 'lucide-react';
import { ProgressNote, NewProgressNoteForm, Order, getCurrentDateTime } from './types';
import { PanelHeader, CollapsedColumn } from './shared-components';

// ============================================
// SOAP Form Component
// ============================================

interface SOAPFormProps {
  newNote: NewProgressNoteForm;
  setNewNote: (note: NewProgressNoteForm) => void;
  onSave: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

function SOAPForm({ newNote, setNewNote, onSave, isCollapsed, setIsCollapsed }: SOAPFormProps) {
  const hasDraft = newNote.subjective || newNote.objective || newNote.assessment || newNote.plan;

  const soapFields = [
    { key: 'subjective', letter: 'S', color: 'bg-blue-500', label: 'Subjective' },
    { key: 'objective', letter: 'O', color: 'bg-purple-500', label: 'Objective' },
    { key: 'assessment', letter: 'A', color: 'bg-emerald-500', label: 'Assessment' },
    { key: 'plan', letter: 'P', color: 'bg-amber-500', label: 'Plan' },
  ];

  return (
    <div className={`border border-slate-200/50 dark:border-slate-700/50 rounded-xl overflow-hidden ${!isCollapsed ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''}`}>
      {/* Header - Clickable to toggle */}
      <div
        className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-blue-100/50 dark:hover:bg-slate-700/50 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            เขียน Progress Note
          </span>
          {isCollapsed && hasDraft && (
            <span className="px-1.5 py-0.5 bg-blue-500 text-white text-[10px] rounded font-bold">
              มี Draft
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <span className="text-xs text-slate-400">คลิกเพื่อย่อ</span>
          )}
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Form Content */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="grid grid-cols-2 gap-3">
            {soapFields.map(item => (
              <div key={item.key}>
                <label className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <span className={`w-5 h-5 ${item.color} rounded text-white text-xs flex items-center justify-center font-bold`}>
                    {item.letter}
                  </span>
                  <span>{item.label}</span>
                </label>
                <textarea
                  value={(newNote as any)[item.key]}
                  onChange={(e) => setNewNote({ ...newNote, [item.key]: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white resize-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  rows={2}
                  placeholder={`${item.label}...`}
                />
              </div>
            ))}
          </div>
          <button
            onClick={onSave}
            className="w-full mt-3 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
          >
            <Save className="w-4 h-4" /> Save Note
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// Progress Note Card
// ============================================

interface NoteCardProps {
  note: ProgressNote;
  index: number;
  total: number;
}

function NoteCard({ note, index, total }: NoteCardProps) {
  return (
    <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          #{total - index} • {note.date} {note.time}
        </span>
        <span className="text-xs text-slate-500">{note.author}</span>
      </div>

      {/* Vital Signs */}
      {note.vitalSigns && (
        <div className="text-sm mb-3 p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-600/50 text-slate-600 dark:text-slate-300">
          BP {note.vitalSigns.bp} | HR {note.vitalSigns.hr} | T {note.vitalSigns.temp}°C | O2 {note.vitalSigns.o2sat}%
        </div>
      )}

      {/* SOAP Content */}
      <div className="space-y-2 text-sm">
        {note.subjective && (
          <div>
            <span className="font-bold text-blue-500">S:</span>{' '}
            <span className="text-slate-600 dark:text-slate-300">{note.subjective}</span>
          </div>
        )}
        {note.objective && (
          <div>
            <span className="font-bold text-purple-500">O:</span>{' '}
            <span className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{note.objective}</span>
          </div>
        )}
        {note.assessment && (
          <div>
            <span className="font-bold text-emerald-500">A:</span>{' '}
            <span className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{note.assessment}</span>
          </div>
        )}
        {note.plan && (
          <div>
            <span className="font-bold text-amber-500">P:</span>{' '}
            <span className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{note.plan}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Discontinued Orders Section
// ============================================

interface DiscontinuedOrdersProps {
  orders: Order[];
}

function DiscontinuedOrders({ orders }: DiscontinuedOrdersProps) {
  if (orders.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-500">
        <Ban className="w-4 h-4" /> 
        Discontinued ({orders.length})
      </div>
      <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-700/30">
        {orders.map(order => (
          <div key={order.id} className="py-2 border-b border-slate-200 dark:border-slate-600 last:border-0">
            <div className="text-sm line-through text-slate-500">{order.name}</div>
            <div className="text-xs text-slate-400 mt-1">
              DC: {order.endDate} {order.endTime} • {order.dcBy} • {order.dcReason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Main ProgressNotePanel Component
// ============================================

interface ProgressNotePanelProps {
  progressNotes: ProgressNote[];
  setProgressNotes: React.Dispatch<React.SetStateAction<ProgressNote[]>>;
  discontinuedOrders: Order[];
  isOpen: boolean;
  onClose: () => void;
  flex: number;
}

export function ProgressNotePanel({
  progressNotes,
  setProgressNotes,
  discontinuedOrders,
  isOpen,
  onClose,
  flex,
}: ProgressNotePanelProps) {
  const [soapFormCollapsed, setSoapFormCollapsed] = useState(false);
  const [newNote, setNewNote] = useState<NewProgressNoteForm>({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });

  const saveProgressNote = () => {
    if (!newNote.subjective && !newNote.objective && !newNote.assessment && !newNote.plan) {
      return;
    }

    const { date, time } = getCurrentDateTime();
    const note: ProgressNote = {
      id: Date.now(),
      date,
      time,
      author: 'นพ.วิชัย หัวใจดี',
      ...newNote,
      vitalSigns: { bp: '125/78', hr: 72, rr: 18, temp: 36.8, o2sat: 98 },
    };

    setProgressNotes(prev => [note, ...prev]);
    setNewNote({ subjective: '', objective: '', assessment: '', plan: '' });
  };

  // Collapsed State
  if (!isOpen) {
    return (
      <CollapsedColumn
        title="Progress Note"
        icon={MessageSquare}
        color="bg-blue-500"
        count={progressNotes.length}
        onClick={onClose}
      />
    );
  }

  return (
    <div
      data-column="1"
      className="flex flex-col bg-blue-50/30 dark:bg-slate-800/50 overflow-hidden min-w-[200px]"
      style={{ flex }}
    >
      {/* Header */}
      <PanelHeader
        title="Progress Note"
        icon={MessageSquare}
        iconBgColor="bg-blue-500"
        count={progressNotes.length}
        badgeColor="bg-blue-200 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400"
        headerBgColor="bg-blue-100/80 dark:bg-slate-800/90"
      >
        <button
          onClick={onClose}
          className="p-1.5 rounded hover:bg-blue-200 dark:hover:bg-slate-700"
        >
          <PanelLeftClose className="w-4 h-4 text-slate-400" />
        </button>
      </PanelHeader>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* SOAP Form */}
        <SOAPForm
          newNote={newNote}
          setNewNote={setNewNote}
          onSave={saveProgressNote}
          isCollapsed={soapFormCollapsed}
          setIsCollapsed={setSoapFormCollapsed}
        />

        {/* Notes List */}
        {progressNotes.map((note, idx) => (
          <NoteCard
            key={note.id}
            note={note}
            index={idx}
            total={progressNotes.length}
          />
        ))}

        {/* Discontinued Orders */}
        <DiscontinuedOrders orders={discontinuedOrders} />
      </div>
    </div>
  );
}

// ============================================
// Mobile Version
// ============================================

interface ProgressNotePanelMobileProps {
  progressNotes: ProgressNote[];
  setProgressNotes: React.Dispatch<React.SetStateAction<ProgressNote[]>>;
  discontinuedOrders: Order[];
}

export function ProgressNotePanelMobile({
  progressNotes,
  setProgressNotes,
  discontinuedOrders,
}: ProgressNotePanelMobileProps) {
  const [soapFormCollapsed, setSoapFormCollapsed] = useState(false);
  const [newNote, setNewNote] = useState<NewProgressNoteForm>({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });

  const saveProgressNote = () => {
    if (!newNote.subjective && !newNote.objective && !newNote.assessment && !newNote.plan) {
      return;
    }

    const { date, time } = getCurrentDateTime();
    const note: ProgressNote = {
      id: Date.now(),
      date,
      time,
      author: 'นพ.วิชัย หัวใจดี',
      ...newNote,
      vitalSigns: { bp: '125/78', hr: 72, rr: 18, temp: 36.8, o2sat: 98 },
    };

    setProgressNotes(prev => [note, ...prev]);
    setNewNote({ subjective: '', objective: '', assessment: '', plan: '' });
  };

  return (
    <div className="bg-blue-50/30 dark:bg-blue-500/5 p-4 space-y-3">
      <SOAPForm
        newNote={newNote}
        setNewNote={setNewNote}
        onSave={saveProgressNote}
        isCollapsed={soapFormCollapsed}
        setIsCollapsed={setSoapFormCollapsed}
      />

      {progressNotes.map((note, idx) => (
        <NoteCard
          key={note.id}
          note={note}
          index={idx}
          total={progressNotes.length}
        />
      ))}

      <DiscontinuedOrders orders={discontinuedOrders} />
    </div>
  );
}