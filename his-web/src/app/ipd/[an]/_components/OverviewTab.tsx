'use client';

import {
  Activity, ClipboardList, Heart, AlertTriangle, Calendar, Pill, TestTube, 
  Stethoscope, TrendingUp, Thermometer, Wind, Droplets, Zap,
  ChevronRight, Bed, UserCheck, FileText,
} from 'lucide-react';
import { Patient, Order, VitalSign } from '../_types';

interface OverviewTabProps {
  patient: Patient;
  orders: Order[];
  vitalSigns: VitalSign[];
}

export function OverviewTab({ patient, orders, vitalSigns }: OverviewTabProps) {
  const activeOrders = orders.filter(o => !o.isDiscontinued);
  const latestVitals = vitalSigns[0];
  const statOrders = activeOrders.filter(o => o.isStat);
  const medications = activeOrders.filter(o => o.type === 'medication');
  const labs = activeOrders.filter(o => o.type === 'lab');
  const treatments = activeOrders.filter(o => o.type === 'treatment');

  return (
    <div className="space-y-5">
      {/* Quick Stats - Clean Professional Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* LOS */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Length of Stay</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{patient.los} <span className="text-base font-normal text-slate-400">วัน</span></p>
            </div>
            <div className="w-11 h-11 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
              <Bed className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
            Admit: {patient.regdate}
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Active Orders</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{activeOrders.length}</p>
            </div>
            <div className="w-11 h-11 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 transition-colors">
              <ClipboardList className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-3 text-xs">
            <span className="text-slate-400">Continue: <span className="text-slate-600 dark:text-slate-300 font-semibold">{activeOrders.filter(o => o.orderType === 'continue').length}</span></span>
            <span className="text-slate-400">1-Day: <span className="text-slate-600 dark:text-slate-300 font-semibold">{activeOrders.filter(o => o.orderType === 'oneday').length}</span></span>
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Medications</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{medications.length}</p>
            </div>
            <div className="w-11 h-11 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
              <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-3 text-xs">
            <span className="text-slate-400">IV: <span className="text-slate-600 dark:text-slate-300 font-semibold">{medications.filter(m => m.route === 'IV').length}</span></span>
            <span className="text-slate-400">PO: <span className="text-slate-600 dark:text-slate-300 font-semibold">{medications.filter(m => m.route === 'PO').length}</span></span>
          </div>
        </div>

        {/* RW */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Relative Weight</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{patient.rw.toFixed(2)}</p>
            </div>
            <div className="w-11 h-11 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
            DRG: <span className="text-slate-600 dark:text-slate-300 font-semibold">{patient.drg}</span>
          </div>
        </div>
      </div>

      {/* STAT Orders Alert - More Prominent */}
      {statOrders.length > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl overflow-hidden shadow-lg shadow-red-500/20">
          <div className="px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-bold text-red-600">
                  {statOrders.length}
                </span>
              </div>
              <div>
                <h3 className="text-white font-bold text-base">STAT Orders</h3>
                <p className="text-red-100 text-sm">ต้องดำเนินการทันที</p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-white/80 text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Urgent
            </span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 space-y-2">
            {statOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    order.type === 'lab' 
                      ? 'bg-pink-100 dark:bg-pink-500/20' 
                      : 'bg-purple-100 dark:bg-purple-500/20'
                  }`}>
                    {order.type === 'lab' ? (
                      <TestTube className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    ) : (
                      <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-800 dark:text-white">{order.name}</p>
                    <p className="text-xs text-slate-500">{order.startDate} {order.time} • {order.prescriber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg animate-pulse">STAT</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Latest Vital Signs - Redesigned */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-500/10 dark:to-pink-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-white">Vital Signs</h3>
                {latestVitals && (
                  <p className="text-xs text-slate-500">{latestVitals.datetime}</p>
                )}
              </div>
            </div>
            {latestVitals && (
              <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-lg text-xs text-slate-500 border border-slate-200 dark:border-slate-600">
                {latestVitals.recorded_by}
              </span>
            )}
          </div>
          
          {latestVitals ? (
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3">
                {/* Blood Pressure */}
                <div className={`p-4 rounded-xl text-center transition-all ${
                  latestVitals.bp_sys > 140 || latestVitals.bp_sys < 90
                    ? 'bg-red-50 dark:bg-red-500/10 ring-2 ring-red-200 dark:ring-red-500/30'
                    : 'bg-slate-50 dark:bg-slate-700/50'
                }`}>
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Blood Pressure</p>
                  <p className={`text-xl font-bold mt-1 ${
                    latestVitals.bp_sys > 140 || latestVitals.bp_sys < 90
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-800 dark:text-white'
                  }`}>
                    {latestVitals.bp_sys}/{latestVitals.bp_dia}
                  </p>
                  <p className="text-xs text-slate-400">mmHg</p>
                </div>

                {/* Heart Rate */}
                <div className={`p-4 rounded-xl text-center transition-all ${
                  latestVitals.pulse > 100 || latestVitals.pulse < 60
                    ? 'bg-red-50 dark:bg-red-500/10 ring-2 ring-red-200 dark:ring-red-500/30'
                    : 'bg-slate-50 dark:bg-slate-700/50'
                }`}>
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Heart Rate</p>
                  <p className={`text-xl font-bold mt-1 ${
                    latestVitals.pulse > 100 || latestVitals.pulse < 60
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-800 dark:text-white'
                  }`}>
                    {latestVitals.pulse}
                  </p>
                  <p className="text-xs text-slate-400">/min</p>
                </div>

                {/* Temperature */}
                <div className={`p-4 rounded-xl text-center transition-all ${
                  latestVitals.temp > 37.5
                    ? 'bg-red-50 dark:bg-red-500/10 ring-2 ring-red-200 dark:ring-red-500/30'
                    : 'bg-slate-50 dark:bg-slate-700/50'
                }`}>
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                    <Thermometer className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Temperature</p>
                  <p className={`text-xl font-bold mt-1 ${
                    latestVitals.temp > 37.5
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-800 dark:text-white'
                  }`}>
                    {latestVitals.temp}
                  </p>
                  <p className="text-xs text-slate-400">°C</p>
                </div>

                {/* Respiratory Rate */}
                <div className={`p-4 rounded-xl text-center transition-all ${
                  latestVitals.rr > 20 || latestVitals.rr < 12
                    ? 'bg-red-50 dark:bg-red-500/10 ring-2 ring-red-200 dark:ring-red-500/30'
                    : 'bg-slate-50 dark:bg-slate-700/50'
                }`}>
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center">
                    <Wind className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Resp. Rate</p>
                  <p className={`text-xl font-bold mt-1 ${
                    latestVitals.rr > 20 || latestVitals.rr < 12
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-800 dark:text-white'
                  }`}>
                    {latestVitals.rr}
                  </p>
                  <p className="text-xs text-slate-400">/min</p>
                </div>

                {/* O2 Saturation */}
                <div className={`p-4 rounded-xl text-center transition-all ${
                  latestVitals.o2sat < 95
                    ? 'bg-red-50 dark:bg-red-500/10 ring-2 ring-red-200 dark:ring-red-500/30'
                    : 'bg-slate-50 dark:bg-slate-700/50'
                }`}>
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">O₂ Sat</p>
                  <p className={`text-xl font-bold mt-1 ${
                    latestVitals.o2sat < 95
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-800 dark:text-white'
                  }`}>
                    {latestVitals.o2sat}
                  </p>
                  <p className="text-xs text-slate-400">%</p>
                </div>

                {/* Pain Score */}
                <div className={`p-4 rounded-xl text-center transition-all ${
                  (latestVitals.pain ?? 0) >= 7
                    ? 'bg-red-50 dark:bg-red-500/10 ring-2 ring-red-200 dark:ring-red-500/30'
                    : 'bg-slate-50 dark:bg-slate-700/50'
                }`}>
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pain Score</p>
                  <p className={`text-xl font-bold mt-1 ${
                    (latestVitals.pain ?? 0) >= 7
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-800 dark:text-white'
                  }`}>
                    {latestVitals.pain ?? '-'}
                  </p>
                  <p className="text-xs text-slate-400">/10</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">ยังไม่มีข้อมูล Vital Signs</p>
            </div>
          )}
        </div>

        {/* Problem List - Redesigned */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-white">Problem List</h3>
              <p className="text-xs text-slate-500">Diagnosis & Conditions</p>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            {/* Principal Diagnosis */}
            <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-500/10 dark:to-rose-500/10 rounded-xl border border-red-100 dark:border-red-500/20">
              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm">PDx</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-800 dark:text-white">{patient.diagnosis}</p>
                  <p className="text-xs text-slate-500 mt-1">Principal Diagnosis</p>
                </div>
              </div>
            </div>

            {/* Underlying Diseases */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Underlying Diseases</p>
              {patient.underlyingDiseases.map((disease, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <span className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300">{disease}</span>
                </div>
              ))}
            </div>

            {/* Allergies */}
            {patient.allergies.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-sm text-red-600 dark:text-red-400">Drug Allergy</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold shadow-sm">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Orders Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-white">Active Orders</h3>
              <p className="text-xs text-slate-500">รายการสั่งการรักษาที่ Active อยู่</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-medium">
              Continue <span className="font-bold">{activeOrders.filter(o => o.orderType === 'continue').length}</span>
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium">
              1-Day <span className="font-bold">{activeOrders.filter(o => o.orderType === 'oneday').length}</span>
            </span>
          </div>
        </div>
        
        <div className="p-4">
          {activeOrders.length > 0 ? (
            <div className="grid gap-2">
              {activeOrders.slice(0, 8).map(order => (
                <div key={order.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    order.type === 'medication' ? 'bg-purple-100 dark:bg-purple-500/20' :
                    order.type === 'lab' ? 'bg-pink-100 dark:bg-pink-500/20' :
                    'bg-blue-100 dark:bg-blue-500/20'
                  }`}>
                    {order.type === 'medication' ? (
                      <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    ) : order.type === 'lab' ? (
                      <TestTube className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    ) : (
                      <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-slate-800 dark:text-white truncate">{order.name}</p>
                      {order.route && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          order.route === 'IV' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' :
                          order.route === 'PO' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                          'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                        }`}>
                          {order.route}
                        </span>
                      )}
                    </div>
                    {(order.dose || order.frequency) && (
                      <p className="text-xs text-slate-500 mt-0.5">{order.dose} {order.frequency && `• ${order.frequency}`}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {order.isStat && (
                      <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-md animate-pulse">STAT</span>
                    )}
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      order.orderType === 'continue' 
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                    }`}>
                      {order.orderType === 'continue' ? 'Continue' : '1-Day'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
              ))}
              {activeOrders.length > 8 && (
                <button className="w-full py-3 text-center text-sm text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors">
                  ดูทั้งหมด +{activeOrders.length - 8} รายการ →
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">ไม่มี Active Orders</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Info Footer */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <UserCheck className="w-5 h-5 text-blue-500" />
          <div className="text-sm">
            <p className="text-slate-500 text-xs">แพทย์เจ้าของไข้</p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">{patient.admDoctor}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <Bed className="w-5 h-5 text-purple-500" />
          <div className="text-sm">
            <p className="text-slate-500 text-xs">Ward / Bed</p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">{patient.ward} / {patient.room}-{patient.bed}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <TestTube className="w-5 h-5 text-pink-500" />
          <div className="text-sm">
            <p className="text-slate-500 text-xs">Lab Orders</p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">{labs.length} รายการ</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <Stethoscope className="w-5 h-5 text-teal-500" />
          <div className="text-sm">
            <p className="text-slate-500 text-xs">Treatments</p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">{treatments.length} รายการ</p>
          </div>
        </div>
      </div>
    </div>
  );
}