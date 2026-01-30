'use client';

import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Activity, Save, X, Heart, Clock } from 'lucide-react';
import { VitalSign } from '../_types';

interface VitalsTabProps {
  vitalSigns: VitalSign[];
  setVitalSigns: React.Dispatch<React.SetStateAction<VitalSign[]>>;
}

export function VitalsTab({ vitalSigns, setVitalSigns }: VitalsTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVital, setNewVital] = useState<Partial<VitalSign>>({
    temp: 36.5,
    pulse: 80,
    rr: 18,
    bp_sys: 120,
    bp_dia: 80,
    o2sat: 98,
    pain: 0,
  });

  const handleAddVital = () => {
    const vital: VitalSign = {
      datetime: new Date().toLocaleString('th-TH'),
      temp: newVital.temp || 36.5,
      pulse: newVital.pulse || 80,
      rr: newVital.rr || 18,
      bp_sys: newVital.bp_sys || 120,
      bp_dia: newVital.bp_dia || 80,
      o2sat: newVital.o2sat || 98,
      pain: newVital.pain,
      recorded_by: 'พยาบาล',
    };
    setVitalSigns([vital, ...vitalSigns]);
    setShowAddForm(false);
    setNewVital({ temp: 36.5, pulse: 80, rr: 18, bp_sys: 120, bp_dia: 80, o2sat: 98, pain: 0 });
  };

  const getVitalStatus = (type: string, value: number) => {
    const ranges: Record<string, { low: number; high: number }> = {
      temp: { low: 36, high: 37.5 },
      pulse: { low: 60, high: 100 },
      rr: { low: 12, high: 20 },
      bp_sys: { low: 90, high: 140 },
      bp_dia: { low: 60, high: 90 },
      o2sat: { low: 95, high: 100 },
    };
    const range = ranges[type];
    if (!range) return 'normal';
    if (value < range.low) return 'low';
    if (value > range.high) return 'high';
    return 'normal';
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'low': return 'text-blue-600 dark:text-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-200 dark:border-blue-500/30';
      case 'high': return 'text-red-600 dark:text-red-400 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-500/10 dark:to-rose-500/10 border border-red-200 dark:border-red-500/30';
      default: return 'text-emerald-600 dark:text-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-200 dark:border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-200">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">Vital Signs Record</h3>
            <p className="text-sm text-slate-500">บันทึกและติดตามสัญญาณชีพ</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-rose-200 transition-all btn-hover-lift"
        >
          <Plus className="w-4 h-4" />
          บันทึกใหม่
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="glass rounded-3xl p-6 shadow-xl shadow-slate-200/30 border border-white/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white">บันทึก Vital Signs ใหม่</h4>
              <p className="text-sm text-slate-500">New Entry</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { key: 'temp', label: 'T °C', step: 0.1, gradient: 'from-orange-500 to-amber-500' },
              { key: 'pulse', label: 'PR /min', gradient: 'from-pink-500 to-rose-500' },
              { key: 'rr', label: 'RR /min', gradient: 'from-blue-500 to-indigo-500' },
              { key: 'bp_sys', label: 'BP Sys', gradient: 'from-red-500 to-rose-500' },
              { key: 'bp_dia', label: 'BP Dia', gradient: 'from-red-400 to-rose-400' },
              { key: 'o2sat', label: 'O₂Sat %', gradient: 'from-cyan-500 to-sky-500' },
              { key: 'pain', label: 'Pain (0-10)', min: 0, max: 10, gradient: 'from-purple-500 to-violet-500' },
            ].map(({ key, label, step, min, max, gradient }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-slate-500 block mb-2 flex items-center gap-1">
                  <div className={`w-5 h-5 rounded bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{label.charAt(0)}</span>
                  </div>
                  {label}
                </label>
                <input
                  type="number"
                  step={step || 1}
                  min={min}
                  max={max}
                  value={newVital[key as keyof typeof newVital] || ''}
                  onChange={(e) => setNewVital({ ...newVital, [key]: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2.5 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-semibold border-2 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              ยกเลิก
            </button>
            <button
              onClick={handleAddVital}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all"
            >
              <Save className="w-4 h-4" />
              บันทึก
            </button>
          </div>
        </div>
      )}

      {/* Vitals Table */}
      <div className="glass rounded-3xl shadow-xl shadow-slate-200/30 border border-white/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    วันเวลา
                  </div>
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold text-slate-500 uppercase">T °C</th>
                <th className="px-5 py-4 text-center text-xs font-bold text-slate-500 uppercase">PR</th>
                <th className="px-5 py-4 text-center text-xs font-bold text-slate-500 uppercase">RR</th>
                <th className="px-5 py-4 text-center text-xs font-bold text-slate-500 uppercase">BP</th>
                <th className="px-5 py-4 text-center text-xs font-bold text-slate-500 uppercase">O₂Sat</th>
                <th className="px-5 py-4 text-center text-xs font-bold text-slate-500 uppercase">Pain</th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">ผู้บันทึก</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {vitalSigns.map((vs, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">{vs.datetime}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold ${getStatusStyle(getVitalStatus('temp', vs.temp))}`}>
                      {vs.temp}
                      {getVitalStatus('temp', vs.temp) === 'high' && <TrendingUp className="w-3 h-3" />}
                      {getVitalStatus('temp', vs.temp) === 'low' && <TrendingDown className="w-3 h-3" />}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold ${getStatusStyle(getVitalStatus('pulse', vs.pulse))}`}>
                      {vs.pulse}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold ${getStatusStyle(getVitalStatus('rr', vs.rr))}`}>
                      {vs.rr}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold ${getStatusStyle(getVitalStatus('bp_sys', vs.bp_sys))}`}>
                      {vs.bp_sys}/{vs.bp_dia}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold ${getStatusStyle(getVitalStatus('o2sat', vs.o2sat))}`}>
                      {vs.o2sat}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {vs.pain !== undefined ? (
                      <span className={`px-3 py-1.5 rounded-xl text-sm font-bold ${
                        vs.pain >= 7 
                          ? 'bg-gradient-to-br from-red-50 to-rose-50 text-red-600 border border-red-200' 
                          : vs.pain >= 4 
                          ? 'bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 border border-amber-200' 
                          : 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 border border-emerald-200'
                      }`}>
                        {vs.pain}/10
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{vs.recorded_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {vitalSigns.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">ยังไม่มีข้อมูล Vital Signs</p>
            <p className="text-slate-400 text-sm mt-1">คลิกปุ่ม "บันทึกใหม่" เพื่อเริ่มต้น</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="glass rounded-2xl p-4 shadow-lg border border-white/60">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Legend</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-200"></span>
            <span className="text-slate-600 dark:text-slate-400">ปกติ</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-200"></span>
            <span className="text-slate-600 dark:text-slate-400">ต่ำกว่าปกติ</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 shadow-lg shadow-red-200"></span>
            <span className="text-slate-600 dark:text-slate-400">สูงกว่าปกติ</span>
          </span>
        </div>
      </div>
    </div>
  );
}