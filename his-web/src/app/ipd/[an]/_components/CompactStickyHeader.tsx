'use client';

import { AlertTriangle, User } from 'lucide-react';
import { Patient } from '../_types';

interface CompactStickyHeaderProps {
  patient: Patient;
}

export function CompactStickyHeader({ patient }: CompactStickyHeaderProps) {
  const isCritical = patient.isCritical;

  return (
    <div className={`w-full flex items-center justify-between gap-3 px-4 py-2 ${
      isCritical 
        ? 'bg-red-50 dark:bg-red-950/50' 
        : 'bg-white/95 dark:bg-slate-800/95'
    }`}>
      {/* Left: Avatar + Name + AN */}
      <div className="flex items-center gap-3 min-w-0 h-14 flex-1">
        {/* Mini Avatar */}
        <div className={`relative shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
          patient.sex === 'M' 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
            : 'bg-gradient-to-br from-pink-500 to-rose-500'
        } ${isCritical ? 'ring-2 ring-red-400 ring-offset-1' : ''}`}>
          {patient.name.charAt(0)}
        </div>

        {/* Name + IDs */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-800 dark:text-white truncate max-w-[150px] sm:max-w-none">
              {patient.name}
            </span>
            {isCritical && (
              <span className="shrink-0 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded animate-pulse">
                CRITICAL
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>AN: <span className="font-semibold text-slate-700 dark:text-slate-300">{patient.an}</span></span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">HN: <span className="font-semibold text-slate-700 dark:text-slate-300">{patient.hn}</span></span>
          </div>
        </div>
      </div>

      {/* Right: Allergy (Most Important!) */}
      {patient.allergies.length > 0 && (
        <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
          <span className="hidden sm:inline text-[11px] font-semibold text-red-600 dark:text-red-400">แพ้:</span>
          <div className="flex gap-1">
            {patient.allergies.slice(0, 2).map((allergy, idx) => (
              <span key={idx} className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">
                {allergy}
              </span>
            ))}
            {patient.allergies.length > 2 && (
              <span className="text-[10px] text-red-600 dark:text-red-400 font-bold">+{patient.allergies.length - 2}</span>
            )}
          </div>
        </div>
      )}

      {/* No Allergy Badge */}
      {patient.allergies.length === 0 && (
        <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">NKA</span>
        </div>
      )}
    </div>
  );
}