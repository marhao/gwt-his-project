'use client';

import { useState } from 'react';
import { Image as ImageIcon, Calendar, FileText, ExternalLink, Clock, ChevronDown, ChevronRight, Monitor } from 'lucide-react';
import { ImagingResult } from '../_types';

interface XrayTabProps {
  imagingResults?: ImagingResult[];
}

const mockImagingResults: ImagingResult[] = [
  {
    id: 1,
    type: 'Chest X-Ray PA',
    date: '20/01/67 08:30',
    status: 'completed',
    finding: 'Cardiomegaly with mild pulmonary congestion. No pleural effusion. No active pulmonary infiltration.',
  },
  {
    id: 2,
    type: 'Echocardiogram',
    date: '19/01/67 14:00',
    status: 'completed',
    finding: 'EF 45%, moderate LV dysfunction with global hypokinesia. Mild MR. No pericardial effusion. LA mildly dilated.',
  },
  {
    id: 3,
    type: 'Coronary Angiography',
    date: '18/01/67 10:00',
    status: 'completed',
    finding: '90% stenosis proximal LAD, 70% stenosis mid RCA. LCx normal. PCI to LAD recommended.',
  },
  {
    id: 4,
    type: 'CT Chest with contrast',
    date: '20/01/67 15:00',
    status: 'pending',
    finding: '',
  },
  {
    id: 5,
    type: 'Portable CXR',
    date: '19/01/67 06:00',
    status: 'completed',
    finding: 'Stable cardiomegaly. ET tube tip 3cm above carina. NGT tip in stomach.',
  },
];

export function XrayTab({ imagingResults = mockImagingResults }: XrayTabProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([1, 2, 3]);

  // Extract date part (e.g., "20/01/67" from "20/01/67 08:30")
  const getDatePart = (datetime: string) => datetime.split(' ')[0];
  const getTimePart = (datetime: string) => datetime.split(' ')[1] || '';

  // Group by date
  const groupedByDate = imagingResults.reduce((acc, result) => {
    const datePart = getDatePart(result.date);
    if (!acc[datePart]) acc[datePart] = [];
    acc[datePart].push(result);
    return acc;
  }, {} as Record<string, ImagingResult[]>);

  // Sort dates descending
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split('/').map(Number);
    const [dayB, monthB, yearB] = b.split('/').map(Number);
    if (yearA !== yearB) return yearB - yearA;
    if (monthA !== monthB) return monthB - monthA;
    return dayB - dayA;
  });

  const toggleItem = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const completedCount = imagingResults.filter(r => r.status === 'completed').length;
  const pendingCount = imagingResults.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-500" />
            <h3 className="font-semibold text-sm text-slate-800 dark:text-white">X-Ray & Imaging</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500">
              Total: <span className="font-semibold text-slate-700 dark:text-slate-300">{imagingResults.length}</span>
            </span>
            <span className="text-slate-500">
              Completed: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{completedCount}</span>
            </span>
            {pendingCount > 0 && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded font-semibold">
                <Clock className="w-3 h-3" />
                Pending: {pendingCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Timeline by Date */}
      <div className="space-y-3">
        {sortedDates.map((date, dateIdx) => {
          const results = groupedByDate[date];
          const hasPending = results.some(r => r.status === 'pending');
          
          return (
            <div key={date} className="relative">
              {/* Timeline connector */}
              {dateIdx < sortedDates.length - 1 && (
                <div className="absolute left-[15px] top-[40px] bottom-[-12px] w-px bg-slate-200 dark:bg-slate-700" />
              )}
              
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Date Header */}
                <div className="px-3 py-2.5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <div className={`w-[10px] h-[10px] rounded-full flex-shrink-0 ${
                    hasPending ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <span className="font-semibold text-sm text-slate-800 dark:text-white">{date}</span>
                  <span className="text-xs text-slate-400">({results.length} รายการ)</span>
                </div>

                {/* Results */}
                <div>
                  {results.map((result, idx) => {
                    const isExpanded = expandedItems.includes(result.id);
                    
                    return (
                      <div key={result.id} className={`border-b border-slate-100 dark:border-slate-700 last:border-b-0 ${
                        result.status === 'pending' ? 'bg-amber-50/50 dark:bg-amber-500/5' : ''
                      }`}>
                        {/* Result Header */}
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                              result.status === 'pending'
                                ? 'bg-amber-100 dark:bg-amber-500/20'
                                : 'bg-cyan-100 dark:bg-cyan-500/20'
                            }`}>
                              {result.status === 'pending' ? (
                                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-slate-800 dark:text-white">{result.type}</span>
                                <span className="text-xs text-slate-400">{getTimePart(result.date)}</span>
                                {result.status === 'pending' && (
                                  <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded">
                                    รอผล
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {result.status === 'completed' && (
                              <>
                                <button className="flex items-center gap-1 px-2 py-1 text-xs text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded transition-colors">
                                  <Monitor className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">PACS</span>
                                </button>
                                <button
                                  onClick={() => toggleItem(result.id)}
                                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Finding - Expandable */}
                        {isExpanded && result.status === 'completed' && result.finding && (
                          <div className="px-4 pb-3">
                            <div className="ml-11 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-2 border-cyan-500">
                              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Impression
                              </p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                {result.finding}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {imagingResults.length === 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
          <ImageIcon className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500">ยังไม่มีผล X-Ray/Imaging</p>
        </div>
      )}

      {/* Quick Reference */}
      <div className="flex items-center gap-4 text-xs text-slate-500 px-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Pending
        </span>
        <span className="flex items-center gap-1.5">
          <Monitor className="w-3 h-3 text-cyan-500" /> View in PACS
        </span>
      </div>
    </div>
  );
}