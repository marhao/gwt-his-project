'use client';

import {
  User, AlertTriangle, Heart, Stethoscope, Clock, Shield, Phone, Bed, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Patient } from '../_types';
import { useState } from 'react';

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const isCritical = patient.isCritical;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // Container ไม่มี border/rounded เพราะ parent มีแล้ว
    <div className={`overflow-hidden transition-all ${
      isCritical 
        ? 'bg-red-50 dark:bg-red-950/30' 
        : 'bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80'
    }`}>
      {/* Critical Banner - Mobile & Desktop */}
      {isCritical && (
        <div className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-white text-xs font-bold tracking-wide">CRITICAL PATIENT - ผู้ป่วยวิกฤต</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </div>
      )}

      {/* Normal Patient - Subtle accent bar (at top of unified card) */}
      {!isCritical && (
        <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      )}

      <div className="p-3 lg:px-4">
        {/* ==================== MOBILE LAYOUT (< 1024px) ==================== */}
        <div className="lg:hidden">
          {/* Row 1: Avatar + Name + Expand Button */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                patient.sex === 'M' 
                  ? 'from-blue-500 to-indigo-600' 
                  : 'from-pink-500 to-rose-500'
              } flex items-center justify-center shadow-md ${
                isCritical ? 'ring-2 ring-red-400 ring-offset-2' : ''
              }`}>
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded shadow">
                {patient.bloodType}
              </span>
            </div>

            {/* Name + Basic Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white truncate">{patient.name}</h2>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 ${
                  patient.sex === 'M' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' 
                    : 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400'
                }`}>
                  {patient.sex === 'M' ? 'ชาย' : 'หญิง'} {patient.age}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                <span className="font-mono">AN: {patient.an}</span>
                <span>•</span>
                <span>{patient.ward}</span>
                <span className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px] font-bold">
                  {patient.room}-{patient.bed}
                </span>
              </div>
            </div>

            {/* Expand Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>
          </div>

          {/* Row 2: Essential Info (Always Visible on Mobile) */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Diagnosis */}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${
              isCritical ? 'bg-red-100 dark:bg-red-500/20' : 'bg-slate-100 dark:bg-slate-700'
            }`}>
              <Heart className={`w-3.5 h-3.5 ${isCritical ? 'text-red-500' : 'text-rose-500'}`} />
              <span className={`text-xs font-semibold truncate max-w-[150px] ${
                isCritical ? 'text-red-700 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'
              }`}>
                {patient.diagnosis}
              </span>
            </div>

            {/* Allergy */}
            {patient.allergies.length > 0 && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                <div className="flex gap-1">
                  {patient.allergies.slice(0, 2).map((allergy, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">
                      {allergy}
                    </span>
                  ))}
                  {patient.allergies.length > 2 && (
                    <span className="text-[10px] text-red-600 font-semibold">+{patient.allergies.length - 2}</span>
                  )}
                </div>
              </div>
            )}

            {/* LOS */}
            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
              patient.los >= 7 
                ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' 
                : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
            }`}>
              LOS {patient.los}d
            </span>

            {/* Insurance */}
            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-semibold">
              {patient.pttypeName}
            </span>
          </div>

          {/* Expanded Content (Mobile) */}
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700' : 'max-h-0'
          }`}>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {/* Doctor */}
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-[10px] text-slate-400">แพทย์</p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{patient.admDoctor}</p>
                </div>
              </div>

              {/* Admit Date */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] text-slate-400">วันที่ Admit</p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{patient.regdate} {patient.regtime}</p>
                </div>
              </div>

              {/* HN */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] text-slate-400">HN</p>
                  <p className="text-xs font-mono font-medium text-slate-700 dark:text-slate-200">{patient.hn}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <div>
                  <p className="text-[10px] text-slate-400">ติดต่อฉุกเฉิน</p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{patient.emergencyContact}</p>
                </div>
              </div>

              {/* U/D */}
              <div className="col-span-2">
                <p className="text-[10px] text-slate-400 mb-1">โรคประจำตัว (U/D)</p>
                <div className="flex flex-wrap gap-1">
                  {patient.underlyingDiseases.map((disease, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs">
                      {disease}
                    </span>
                  ))}
                  {patient.underlyingDiseases.length === 0 && (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </div>
              </div>

              {/* DRG/RW */}
              <div className="col-span-2 flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xs text-slate-500">DRG: <span className="font-bold text-slate-700 dark:text-slate-300">{patient.drg}</span></span>
                <span className="text-xs text-slate-500">RW: <span className="font-bold text-slate-700 dark:text-slate-300">{patient.rw.toFixed(2)}</span></span>
                <span className="text-xs text-slate-500">Specialty: <span className="font-bold text-slate-700 dark:text-slate-300">{patient.spclty}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== DESKTOP LAYOUT (>= 1024px) ==================== */}
        <div className="hidden lg:block">
          {/* Row 1: Avatar + Name + Critical + IDs + Ward + Allergy + Phone */}
          <div className="flex items-center gap-4">
            {/* Avatar - Compact */}
            <div className="relative flex-shrink-0">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${
                patient.sex === 'M' 
                  ? 'from-blue-500 to-indigo-600' 
                  : 'from-pink-500 to-rose-500'
              } flex items-center justify-center shadow ${
                isCritical ? 'ring-2 ring-red-400 ring-offset-1' : ''
              }`}>
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 px-1 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded">
                {patient.bloodType}
              </span>
            </div>

            {/* Name + Sex/Age */}
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-base font-bold text-slate-800 dark:text-white truncate">{patient.name}</h2>
              <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                patient.sex === 'M' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' 
                  : 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400'
              }`}>
                {patient.sex === 'M' ? 'ชาย' : 'หญิง'} {patient.age}ปี
              </span>
            </div>

            {/* Separator */}
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 flex-shrink-0" />

            {/* IDs - Compact */}
            <div className="flex items-center gap-3 text-sm flex-shrink-0">
              <span className="text-slate-400">HN: <span className="font-semibold text-slate-700 dark:text-slate-200">{patient.hn}</span></span>
              <span className="text-slate-400">AN: <span className="font-semibold text-slate-700 dark:text-slate-200">{patient.an}</span></span>
            </div>

            {/* Separator */}
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 flex-shrink-0" />

            {/* Ward & Bed */}
            <div className="flex items-center gap-2 text-sm flex-shrink-0">
              <Bed className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-300">{patient.ward}</span>
              <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs font-bold text-slate-700 dark:text-slate-300">
                {patient.room}-{patient.bed}
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Allergy - Right Side */}
            {patient.allergies.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <div className="flex gap-1">
                  {patient.allergies.map((allergy, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Phone */}
            <div className="flex items-center gap-1.5 text-sm text-slate-500 flex-shrink-0">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span className="font-medium">{patient.emergencyContact}</span>
            </div>
          </div>

          {/* Divider */}
          <div className={`my-2.5 border-t ${isCritical ? 'border-red-200 dark:border-red-500/20' : 'border-slate-100 dark:border-slate-700'}`} />

          {/* Row 2: Doctor + Diagnosis + Insurance + Admit + LOS + U/D + DRG/RW */}
          <div className="flex items-center gap-4 text-sm">
            {/* Doctor */}
            <div className="flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-blue-500" />
              <span className="text-slate-600 dark:text-slate-300">{patient.admDoctor}</span>
            </div>

            {/* Separator */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />

            {/* Diagnosis */}
            <div className="flex items-center gap-1.5">
              <Heart className={`w-4 h-4 ${isCritical ? 'text-red-500' : 'text-rose-500'}`} />
              <span className={`font-semibold ${isCritical ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>
                {patient.diagnosis}
              </span>
            </div>

            {/* Separator */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />

            {/* Insurance */}
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded text-xs font-semibold">
                {patient.pttypeName}
              </span>
            </div>

            {/* Separator */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />

            {/* Admit Date */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-4 h-4" />
              <span>{patient.regdate} {patient.regtime}</span>
            </div>

            {/* LOS */}
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
              patient.los >= 7 
                ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' 
                : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
            }`}>
              LOS {patient.los}d
            </span>

            {/* Separator */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />

            {/* Underlying Diseases */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-xs">U/D:</span>
              {patient.underlyingDiseases.length > 0 ? (
                patient.underlyingDiseases.map((disease, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs">
                    {disease}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">-</span>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* DRG & RW - Right aligned */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>DRG: <span className="font-bold text-slate-700 dark:text-slate-300">{patient.drg}</span></span>
              <span>RW: <span className="font-bold text-slate-700 dark:text-slate-300">{patient.rw.toFixed(2)}</span></span>
              <span>Specialty: <span className="font-bold text-slate-700 dark:text-slate-300">{patient.spclty}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}