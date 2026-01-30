'use client';

import { useState, useEffect } from 'react';
import { Edit2, Trash2, StopCircle, Check, X, Calendar, Clock, User } from 'lucide-react';
import { Order, getRouteColor, frequencyOptions, routeOptions } from './types';

interface OrderRowProps {
  order: Order;
  onDelete: (order: Order) => void;
  onDiscontinue: (order: Order) => void;
  onSave: (order: Order) => void;
  isEditing: boolean;
  setEditingId: (id: number | null) => void;
}

export function OrderRow({ 
  order, 
  onDelete, 
  onDiscontinue, 
  onSave, 
  isEditing, 
  setEditingId 
}: OrderRowProps) {
  const [editedOrder, setEditedOrder] = useState<Order>(order);
  const routeColor = getRouteColor(order.route || '');

  useEffect(() => {
    setEditedOrder(order);
  }, [order]);

  const handleSave = () => {
    onSave(editedOrder);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditedOrder(order);
    setEditingId(null);
  };

  // ============================================
  // Editing Mode
  // ============================================
  if (isEditing && !order.isDiscontinued) {
    return (
      <div className="py-3 px-3 -mx-3 border-b border-slate-200 dark:border-slate-700 last:border-0 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
        <div className="space-y-3">
          {/* Name */}
          <input
            type="text"
            value={editedOrder.name}
            onChange={(e) => setEditedOrder({ ...editedOrder, name: e.target.value })}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white font-medium"
          />

          {/* Medication specific fields */}
          {order.type === 'medication' && (
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={editedOrder.dose || ''}
                onChange={(e) => setEditedOrder({ ...editedOrder, dose: e.target.value })}
                placeholder="Dose"
                className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
              />
              <select
                value={editedOrder.frequency || ''}
                onChange={(e) => setEditedOrder({ ...editedOrder, frequency: e.target.value })}
                className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
              >
                {frequencyOptions.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select
                value={editedOrder.route || ''}
                onChange={(e) => setEditedOrder({ ...editedOrder, route: e.target.value })}
                className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
              >
                {routeOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          )}

          {/* Instruction */}
          <input
            type="text"
            value={editedOrder.instruction || ''}
            onChange={(e) => setEditedOrder({ ...editedOrder, instruction: e.target.value })}
            placeholder="วิธีใช้ยา / หมายเหตุ"
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
          />

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
            >
              <X className="w-4 h-4" /> ยกเลิก
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> บันทึก
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Display Mode
  // ============================================
  return (
    <div className={`flex items-start gap-3 py-3 px-3 -mx-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0 group rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/30 transition-colors ${order.isDiscontinued ? 'opacity-60' : ''}`}>
      <div className="flex-1 min-w-0">
        {/* Name & Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {order.isStat && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded animate-pulse">
              STAT
            </span>
          )}
          <span className={`font-medium text-sm text-slate-800 dark:text-white ${order.isDiscontinued ? 'line-through' : ''}`}>
            {order.name}
          </span>
          {order.route && (
            <span className={`px-2 py-0.5 text-xs font-bold rounded ${routeColor}`}>
              {order.route}
            </span>
          )}
        </div>

        {/* Dose & Frequency */}
        {(order.dose || order.frequency) && (
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {order.dose && <span>{order.dose}</span>}
            {order.frequency && (
              <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">
                {order.frequency}
              </span>
            )}
          </div>
        )}

        {/* Instruction */}
        {order.instruction && !order.isDiscontinued && (
          <div className="text-xs text-slate-500 dark:text-slate-400 italic mt-1.5">
            💊 {order.instruction}
          </div>
        )}

        {/* Date/Time/Prescriber */}
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {order.startDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {order.time}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {order.prescriber}
          </span>
        </div>

        {/* Discontinued Info */}
        {order.isDiscontinued && (
          <div className="mt-2 px-3 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-xs">
            <span className="font-semibold text-red-500">DC:</span>
            <span className="text-slate-500 ml-2">
              {order.endDate} {order.endTime} • {order.dcBy} • {order.dcReason}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {!order.isDiscontinued && (
        <div className="flex gap-1 shrink-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditingId(order.id)}
            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-500"
            title="แก้ไข"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {order.orderType === 'continue' && (
            <button
              onClick={() => onDiscontinue(order)}
              className="p-2 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-500/20 text-orange-500"
              title="Discontinue"
            >
              <StopCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(order)}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500"
            title="ลบ"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}