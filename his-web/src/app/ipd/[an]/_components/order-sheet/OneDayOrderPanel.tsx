'use client';

import { useState } from 'react';
import { PlayCircle, Plus, Minimize2, Zap, Check, RefreshCw } from 'lucide-react';
import { 
  Order, NewOrderForm, 
  medicationList, labList, treatmentList, 
  frequencyOptions, routeOptions, getCurrentDateTime 
} from './types';
import { PanelHeader, CollapsedColumn, AutocompleteInput } from './shared-components';
import { OrderRow } from './OrderRow';

// ============================================
// Add Order Form Component
// ============================================

interface AddOrderFormProps {
  newOrder: NewOrderForm;
  setNewOrder: (order: NewOrderForm) => void;
  onAdd: () => void;
  onCancel: () => void;
  type: 'oneday' | 'continue';
}

function AddOrderForm({ newOrder, setNewOrder, onAdd, onCancel, type }: AddOrderFormProps) {
  const isOneday = type === 'oneday';
  const bgColor = isOneday ? 'bg-amber-500' : 'bg-emerald-500';
  const containerBg = isOneday 
    ? 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-200/50' 
    : 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-200/50';

  const typeOptions = isOneday
    ? [{ v: 'lab', l: '🔬 Lab' }, { v: 'medication', l: '💊 ยา' }, { v: 'treatment', l: '🏥 Tx' }]
    : [{ v: 'medication', l: '💊 ยา' }, { v: 'treatment', l: '🏥 Tx' }];

  const getAutocompleteOptions = () => {
    if (newOrder.type === 'medication') return medicationList;
    if (newOrder.type === 'lab') return labList;
    if (newOrder.type === 'treatment') return treatmentList;
    return [];
  };

  const handleMedicationSelect = (opt: any) => {
    if (typeof opt !== 'string' && opt.defaultDose) {
      setNewOrder({
        ...newOrder,
        name: opt.name,
        dose: opt.defaultDose || '',
        frequency: opt.defaultFreq || newOrder.frequency,
        route: opt.defaultRoute || newOrder.route,
      });
    }
  };

  return (
    <div className={`p-4 rounded-xl border ${containerBg}`}>
      <div className="space-y-3">
        {/* Type Selection */}
        <div className="flex gap-2">
          {typeOptions.map(t => (
            <button
              key={t.v}
              onClick={() => setNewOrder({ ...newOrder, type: t.v as any })}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                newOrder.type === t.v
                  ? `${bgColor} text-white`
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <AutocompleteInput
          value={newOrder.name}
          onChange={(v) => setNewOrder({ ...newOrder, name: v })}
          onSelect={handleMedicationSelect}
          options={getAutocompleteOptions()}
          placeholder="พิมพ์ค้นหา..."
        />

        {/* Medication Specific Fields */}
        {newOrder.type === 'medication' && (
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={newOrder.dose}
              onChange={(e) => setNewOrder({ ...newOrder, dose: e.target.value })}
              placeholder="Dose"
              className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
            />
            <select
              value={newOrder.frequency}
              onChange={(e) => setNewOrder({ ...newOrder, frequency: e.target.value })}
              className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
            >
              {frequencyOptions.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <select
              value={newOrder.route}
              onChange={(e) => setNewOrder({ ...newOrder, route: e.target.value })}
              className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
            >
              {routeOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        )}

        {/* STAT Button (One Day only) */}
        {isOneday && (
          <button
            onClick={() => setNewOrder({ ...newOrder, isStat: !newOrder.isStat })}
            className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors ${
              newOrder.isStat
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Zap className="w-4 h-4" />
            STAT
          </button>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            ยกเลิก
          </button>
          <button
            onClick={onAdd}
            disabled={!newOrder.name}
            className={`flex-1 px-4 py-2.5 ${bgColor} hover:opacity-90 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-opacity ${
              !newOrder.name ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Check className="w-4 h-4" />
            เพิ่ม
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Order List Component
// ============================================

interface OrderListProps {
  orders: Order[];
  type: 'oneday' | 'continue';
  editingOrderId: number | null;
  setEditingOrderId: (id: number | null) => void;
  onDelete: (order: Order) => void;
  onDiscontinue: (order: Order) => void;
  onSave: (order: Order) => void;
}

function OrderList({
  orders,
  type,
  editingOrderId,
  setEditingOrderId,
  onDelete,
  onDiscontinue,
  onSave,
}: OrderListProps) {
  const isOneday = type === 'oneday';
  const orderTypes = isOneday 
    ? ['lab', 'medication', 'treatment'] 
    : ['medication', 'treatment'];

  const typeConfig: Record<string, { label: string; color: string }> = {
    lab: { label: '🔬 Laboratory', color: 'text-purple-600 dark:text-purple-400' },
    medication: { label: '💊 Medications', color: 'text-blue-600 dark:text-blue-400' },
    treatment: { label: '🏥 Treatments', color: 'text-emerald-600 dark:text-emerald-400' },
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        {isOneday ? (
          <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
        ) : (
          <RefreshCw className="w-12 h-12 mx-auto mb-3 opacity-30" />
        )}
        <p className="text-sm">ไม่มี {isOneday ? 'One Day' : 'Continue'} Order</p>
      </div>
    );
  }

  return (
    <>
      {orderTypes.map(orderType => {
        const typeOrders = orders.filter(o => o.type === orderType);
        if (typeOrders.length === 0) return null;

        const config = typeConfig[orderType];

        return (
          <div key={orderType}>
            <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${config.color}`}>
              {config.label}
            </div>
            <div className="rounded-xl bg-white/80 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/50 p-4">
              {typeOrders.map(order => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onDelete={onDelete}
                  onDiscontinue={onDiscontinue}
                  onSave={onSave}
                  isEditing={editingOrderId === order.id}
                  setEditingId={setEditingOrderId}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

// ============================================
// Main OneDayOrderPanel Component
// ============================================

interface OneDayOrderPanelProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  isOpen: boolean;
  onClose: () => void;
  flex: number;
  onDeleteOrder: (order: Order) => void;
  onDiscontinueOrder: (order: Order) => void;
}

export function OneDayOrderPanel({
  orders,
  setOrders,
  isOpen,
  onClose,
  flex,
  onDeleteOrder,
  onDiscontinueOrder,
}: OneDayOrderPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [newOrder, setNewOrder] = useState<NewOrderForm>({
    type: 'lab',
    name: '',
    dose: '',
    frequency: 'STAT',
    route: 'IV',
    instruction: '',
    orderType: 'oneday',
    isStat: false,
  });

  const oneDayOrders = orders.filter(o => o.orderType === 'oneday' && !o.isDiscontinued);

  const addOrder = () => {
    if (!newOrder.name) return;

    const { date, time } = getCurrentDateTime();
    const order: Order = {
      id: Date.now(),
      type: newOrder.type,
      name: newOrder.name,
      dose: newOrder.dose,
      frequency: newOrder.frequency,
      route: newOrder.route,
      instruction: newOrder.instruction,
      orderType: 'oneday',
      startDate: date,
      time,
      prescriber: 'นพ.วิชัย',
      status: newOrder.isStat ? 'pending' : 'active',
      isStat: newOrder.isStat,
      isDiscontinued: false,
    };

    setOrders(prev => [order, ...prev]);
    setNewOrder({
      type: 'lab',
      name: '',
      dose: '',
      frequency: 'STAT',
      route: 'IV',
      instruction: '',
      orderType: 'oneday',
      isStat: false,
    });
    setShowAddForm(false);
  };

  const handleSaveOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  // Collapsed State
  if (!isOpen) {
    return (
      <CollapsedColumn
        title="One Day"
        icon={PlayCircle}
        color="bg-amber-500"
        count={oneDayOrders.length}
        onClick={onClose}
      />
    );
  }

  return (
    <div
      data-column="2"
      className="flex flex-col bg-amber-50/50 dark:bg-amber-900/10 overflow-hidden min-w-[200px]"
      style={{ flex }}
    >
      {/* Header */}
      <PanelHeader
        title="One Day"
        icon={PlayCircle}
        iconBgColor="bg-amber-500"
        count={oneDayOrders.length}
        badgeColor="bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
        headerBgColor="bg-amber-100/80 dark:bg-slate-800/90"
      >
        <button
          onClick={() => setShowAddForm(true)}
          className={`p-1.5 rounded transition-colors ${
            showAddForm 
              ? 'bg-amber-500 text-white' 
              : 'hover:bg-amber-200 dark:hover:bg-slate-700'
          }`}
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="p-1.5 rounded hover:bg-amber-200 dark:hover:bg-slate-700"
        >
          <Minimize2 className="w-4 h-4 text-slate-400" />
        </button>
      </PanelHeader>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Add Form */}
        {showAddForm && (
          <AddOrderForm
            newOrder={newOrder}
            setNewOrder={setNewOrder}
            onAdd={addOrder}
            onCancel={() => setShowAddForm(false)}
            type="oneday"
          />
        )}

        {/* Order List */}
        <OrderList
          orders={oneDayOrders}
          type="oneday"
          editingOrderId={editingOrderId}
          setEditingOrderId={setEditingOrderId}
          onDelete={onDeleteOrder}
          onDiscontinue={onDiscontinueOrder}
          onSave={handleSaveOrder}
        />
      </div>
    </div>
  );
}

// ============================================
// Mobile Version
// ============================================

interface OneDayOrderPanelMobileProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onDeleteOrder: (order: Order) => void;
  onDiscontinueOrder: (order: Order) => void;
}

export function OneDayOrderPanelMobile({
  orders,
  setOrders,
  onDeleteOrder,
  onDiscontinueOrder,
}: OneDayOrderPanelMobileProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [newOrder, setNewOrder] = useState<NewOrderForm>({
    type: 'lab',
    name: '',
    dose: '',
    frequency: 'STAT',
    route: 'IV',
    instruction: '',
    orderType: 'oneday',
    isStat: false,
  });

  const oneDayOrders = orders.filter(o => o.orderType === 'oneday' && !o.isDiscontinued);

  const addOrder = () => {
    if (!newOrder.name) return;

    const { date, time } = getCurrentDateTime();
    const order: Order = {
      id: Date.now(),
      type: newOrder.type,
      name: newOrder.name,
      dose: newOrder.dose,
      frequency: newOrder.frequency,
      route: newOrder.route,
      instruction: newOrder.instruction,
      orderType: 'oneday',
      startDate: date,
      time,
      prescriber: 'นพ.วิชัย',
      status: newOrder.isStat ? 'pending' : 'active',
      isStat: newOrder.isStat,
      isDiscontinued: false,
    };

    setOrders(prev => [order, ...prev]);
    setNewOrder({
      type: 'lab',
      name: '',
      dose: '',
      frequency: 'STAT',
      route: 'IV',
      instruction: '',
      orderType: 'oneday',
      isStat: false,
    });
    setShowAddForm(false);
  };

  const handleSaveOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  return (
    <div className="bg-amber-50/50 dark:bg-amber-500/5">
      {/* Add Button */}
      <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-amber-500 text-white"
        >
          <Plus className="w-4 h-4" /> เพิ่ม Order
        </button>
      </div>

      <div className="p-4 space-y-4">
        {showAddForm && (
          <AddOrderForm
            newOrder={newOrder}
            setNewOrder={setNewOrder}
            onAdd={addOrder}
            onCancel={() => setShowAddForm(false)}
            type="oneday"
          />
        )}

        <OrderList
          orders={oneDayOrders}
          type="oneday"
          editingOrderId={editingOrderId}
          setEditingOrderId={setEditingOrderId}
          onDelete={onDeleteOrder}
          onDiscontinue={onDiscontinueOrder}
          onSave={handleSaveOrder}
        />
      </div>
    </div>
  );
}