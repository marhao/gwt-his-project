'use client';

import { useState } from 'react';
import { TestTube, TrendingUp, TrendingDown, AlertTriangle, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { LabResult } from '../_types';

interface LabTabProps {
  labResults?: LabResult[];
}

const mockLabResults: LabResult[] = [
  {
    id: 1,
    name: 'CBC',
    date: '20/01/67',
    time: '08:00',
    status: 'completed',
    items: [
      { test: 'WBC', result: '12.5', unit: '10³/µL', refRange: '4.0-10.0', flag: 'H' },
      { test: 'RBC', result: '4.2', unit: '10⁶/µL', refRange: '4.0-5.5' },
      { test: 'Hb', result: '11.2', unit: 'g/dL', refRange: '12.0-16.0', flag: 'L' },
      { test: 'Hct', result: '36', unit: '%', refRange: '36-46' },
      { test: 'Platelet', result: '250', unit: '10³/µL', refRange: '150-400' },
    ],
  },
  {
    id: 2,
    name: 'Cardiac Marker',
    date: '20/01/67',
    time: '06:00',
    status: 'completed',
    items: [
      { test: 'Troponin-T', result: '0.85', unit: 'ng/mL', refRange: '<0.01', flag: 'C' },
      { test: 'CK-MB', result: '45', unit: 'U/L', refRange: '<25', flag: 'H' },
      { test: 'BNP', result: '850', unit: 'pg/mL', refRange: '<100', flag: 'H' },
    ],
  },
  {
    id: 3,
    name: 'Kidney Function',
    date: '20/01/67',
    time: '06:00',
    status: 'completed',
    items: [
      { test: 'BUN', result: '28', unit: 'mg/dL', refRange: '7-20', flag: 'H' },
      { test: 'Cr', result: '1.4', unit: 'mg/dL', refRange: '0.7-1.3', flag: 'H' },
      { test: 'eGFR', result: '52', unit: 'mL/min', refRange: '>60', flag: 'L' },
    ],
  },
  {
    id: 4,
    name: 'Electrolyte',
    date: '20/01/67',
    time: '14:00',
    status: 'pending',
    items: [],
  },
  {
    id: 5,
    name: 'CBC',
    date: '19/01/67',
    time: '06:00',
    status: 'completed',
    items: [
      { test: 'WBC', result: '14.2', unit: '10³/µL', refRange: '4.0-10.0', flag: 'H' },
      { test: 'RBC', result: '4.0', unit: '10⁶/µL', refRange: '4.0-5.5' },
      { test: 'Hb', result: '10.8', unit: 'g/dL', refRange: '12.0-16.0', flag: 'L' },
      { test: 'Hct', result: '34', unit: '%', refRange: '36-46', flag: 'L' },
      { test: 'Platelet', result: '245', unit: '10³/µL', refRange: '150-400' },
    ],
  },
  {
    id: 6,
    name: 'Cardiac Marker',
    date: '19/01/67',
    time: '06:00',
    status: 'completed',
    items: [
      { test: 'Troponin-T', result: '1.25', unit: 'ng/mL', refRange: '<0.01', flag: 'C' },
      { test: 'CK-MB', result: '68', unit: 'U/L', refRange: '<25', flag: 'H' },
    ],
  },
  {
    id: 7,
    name: 'CBC',
    date: '18/01/67',
    time: '14:30',
    status: 'completed',
    items: [
      { test: 'WBC', result: '15.8', unit: '10³/µL', refRange: '4.0-10.0', flag: 'H' },
      { test: 'Hb', result: '10.5', unit: 'g/dL', refRange: '12.0-16.0', flag: 'L' },
    ],
  },
];

export function LabTab({ labResults = mockLabResults }: LabTabProps) {
  const [expandedDates, setExpandedDates] = useState<string[]>([labResults[0]?.date || '']);
  const [expandedLabs, setExpandedLabs] = useState<number[]>([1, 2]);

  // Group by date
  const groupedByDate = labResults.reduce((acc, lab) => {
    if (!acc[lab.date]) acc[lab.date] = [];
    acc[lab.date].push(lab);
    return acc;
  }, {} as Record<string, LabResult[]>);

  // Sort dates descending (latest first)
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split('/').map(Number);
    const [dayB, monthB, yearB] = b.split('/').map(Number);
    if (yearA !== yearB) return yearB - yearA;
    if (monthA !== monthB) return monthB - monthA;
    return dayB - dayA;
  });

  const toggleDate = (date: string) => {
    setExpandedDates(prev => 
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  const toggleLab = (labId: number) => {
    setExpandedLabs(prev => 
      prev.includes(labId) ? prev.filter(id => id !== labId) : [...prev, labId]
    );
  };

  // Stats
  const completedCount = labResults.filter(r => r.status === 'completed').length;
  const pendingCount = labResults.filter(r => r.status === 'pending').length;
  const criticalCount = labResults.reduce((count, lab) => 
    count + lab.items.filter(item => item.flag === 'C').length, 0
  );

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TestTube className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-base text-slate-800 dark:text-white">Laboratory Results</h3>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500">
              Total: <span className="font-semibold text-slate-700 dark:text-slate-300">{labResults.length}</span>
            </span>
            <span className="text-slate-500">
              Completed: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{completedCount}</span>
            </span>
            {pendingCount > 0 && (
              <span className="text-slate-500">
                Pending: <span className="font-semibold text-amber-600 dark:text-amber-400">{pendingCount}</span>
              </span>
            )}
            {criticalCount > 0 && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded font-semibold">
                <AlertTriangle className="w-4 h-4" />
                Critical: {criticalCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Timeline by Date */}
      <div className="space-y-3">
        {sortedDates.map((date, dateIdx) => {
          const labs = groupedByDate[date];
          const isExpanded = expandedDates.includes(date);
          const hasCritical = labs.some(lab => lab.items.some(i => i.flag === 'C'));
          const hasPending = labs.some(lab => lab.status === 'pending');
          
          return (
            <div key={date} className="relative">
              {/* Timeline connector */}
              {dateIdx < sortedDates.length - 1 && (
                <div className="absolute left-[17px] top-[48px] bottom-[-12px] w-px bg-slate-200 dark:bg-slate-700" />
              )}
              
              <div className={`bg-white dark:bg-slate-800 rounded-lg border overflow-hidden ${
                hasCritical 
                  ? 'border-l-2 border-l-red-500 border-y border-r border-y-slate-200 border-r-slate-200 dark:border-y-slate-700 dark:border-r-slate-700' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}>
                {/* Date Header */}
                <button
                  onClick={() => toggleDate(date)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  {/* Timeline dot */}
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    hasCritical 
                      ? 'bg-red-500' 
                      : hasPending 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                  }`} />
                  
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base text-slate-800 dark:text-white">{date}</span>
                      <span className="text-sm text-slate-400">({labs.length} รายการ)</span>
                      {hasCritical && (
                        <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold rounded">
                          CRITICAL
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Labs for this date */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-slate-700">
                    {labs.map(lab => {
                      const isLabExpanded = expandedLabs.includes(lab.id);
                      const labHasCritical = lab.items.some(i => i.flag === 'C');
                      const labHasAbnormal = lab.items.some(i => i.flag === 'H' || i.flag === 'L');
                      
                      return (
                        <div key={lab.id} className="border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                          {/* Lab Header */}
                          <button
                            onClick={() => lab.status === 'completed' && toggleLab(lab.id)}
                            disabled={lab.status === 'pending'}
                            className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
                              lab.status === 'completed' ? 'hover:bg-slate-50 dark:hover:bg-slate-700/50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                lab.status === 'pending'
                                  ? 'bg-amber-100 dark:bg-amber-500/20'
                                  : labHasCritical
                                    ? 'bg-red-100 dark:bg-red-500/20'
                                    : 'bg-purple-100 dark:bg-purple-500/20'
                              }`}>
                                {lab.status === 'pending' ? (
                                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                ) : (
                                  <TestTube className={`w-4 h-4 ${
                                    labHasCritical 
                                      ? 'text-red-600 dark:text-red-400' 
                                      : 'text-purple-600 dark:text-purple-400'
                                  }`} />
                                )}
                              </div>
                              <div>
                                <span className="font-medium text-base text-slate-700 dark:text-slate-200">{lab.name}</span>
                                <span className="text-sm text-slate-400 ml-2">{lab.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lab.status === 'pending' ? (
                                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold rounded">
                                  รอผล
                                </span>
                              ) : (
                                <>
                                  {labHasCritical && (
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                  )}
                                  {labHasAbnormal && !labHasCritical && (
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                  )}
                                  {!labHasAbnormal && (
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                  )}
                                  {isLabExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-slate-400" />
                                  )}
                                </>
                              )}
                            </div>
                          </button>

                          {/* Lab Items Table */}
                          {isLabExpanded && lab.status === 'completed' && (
                            <div className="px-4 pb-4">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-slate-400">
                                    <th className="text-left py-2 font-medium">Test</th>
                                    <th className="text-right py-2 font-medium">Result</th>
                                    <th className="text-left py-2 pl-3 font-medium">Unit</th>
                                    <th className="text-left py-2 font-medium">Ref</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {lab.items.map((item, idx) => (
                                    <tr key={idx} className={`border-t border-slate-100 dark:border-slate-700 ${
                                      item.flag === 'C' ? 'bg-red-50 dark:bg-red-500/5' : ''
                                    }`}>
                                      <td className="py-2.5 text-slate-700 dark:text-slate-300">{item.test}</td>
                                      <td className="py-2.5 text-right">
                                        <span className={`inline-flex items-center gap-1.5 font-semibold ${
                                          item.flag === 'C' 
                                            ? 'text-red-600 dark:text-red-400' 
                                            : item.flag === 'H'
                                              ? 'text-red-600 dark:text-red-400'
                                              : item.flag === 'L'
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-slate-700 dark:text-slate-300'
                                        }`}>
                                          {item.result}
                                          {item.flag === 'H' && <TrendingUp className="w-4 h-4" />}
                                          {item.flag === 'L' && <TrendingDown className="w-4 h-4" />}
                                          {item.flag === 'C' && <AlertTriangle className="w-4 h-4" />}
                                        </span>
                                      </td>
                                      <td className="py-2.5 pl-3 text-slate-400">{item.unit}</td>
                                      <td className="py-2.5 text-slate-400 font-mono">{item.refRange}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {labResults.length === 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
          <TestTube className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-base text-slate-500">ยังไม่มีผล Lab</p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-5 text-sm text-slate-500 px-1">
        <span className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-red-500" /> สูง (H)
        </span>
        <span className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-blue-500" /> ต่ำ (L)
        </span>
        <span className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" /> Critical (C)
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> ปกติ
        </span>
      </div>
    </div>
  );
}