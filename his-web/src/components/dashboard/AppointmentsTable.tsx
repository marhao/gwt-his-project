'use client';

import { FC, useState, useMemo } from 'react';
import { 
  Search, MoreHorizontal, Phone, Calendar,
  Clock, CheckCircle2, XCircle, Loader2,
  ChevronDown, ChevronUp, Stethoscope,
  RefreshCw, Download, Eye, Edit, Trash2,
  MapPin, CreditCard, FileText, ChevronRight
} from 'lucide-react';
import { Appointment } from '@/types';

// Extended Appointment type for HIS
interface HISAppointment extends Appointment {
  patientPhone?: string;
  patientAvatar?: string;
  priority?: 'normal' | 'urgent' | 'emergency';
  waitTime?: number;
  room?: string;
  notes?: string;
  insurance?: string;
}

interface AppointmentsTableProps {
  appointments: HISAppointment[];
  title?: string;
  isLoading?: boolean;
  isLive?: boolean;
  onRefresh?: () => void;
  onViewAll?: () => void;
  onRowClick?: (appointment: HISAppointment) => void;
  onEdit?: (appointment: HISAppointment) => void;
  onDelete?: (appointment: HISAppointment) => void;
  onCall?: (appointment: HISAppointment) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  maxRows?: number;
}

// Status configuration
const statusConfig = {
  scheduled: { 
    label: 'นัดหมาย', 
    icon: Calendar,
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-200 dark:border-slate-700',
    animate: false,
  },
  waiting: { 
    label: 'รอตรวจ', 
    icon: Clock,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/30',
    animate: false,
  },
  'in-progress': { 
    label: 'กำลังตรวจ', 
    icon: Loader2,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/30',
    animate: true,
  },
  completed: { 
    label: 'เสร็จสิ้น', 
    icon: CheckCircle2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/30',
    animate: false,
  },
  cancelled: { 
    label: 'ยกเลิก', 
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-500/30',
    animate: false,
  },
};

// Priority configuration
const priorityConfig = {
  normal: null,
  urgent: { 
    label: 'ด่วน', 
    class: 'bg-amber-500 text-white',
    cardBorder: 'border-l-amber-500',
  },
  emergency: { 
    label: 'ฉุกเฉิน', 
    class: 'bg-red-500 text-white animate-pulse',
    cardBorder: 'border-l-red-500',
  },
};

// Patient Avatar Component
const PatientAvatar: FC<{ name: string; avatar?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  name, 
  avatar,
  size = 'md' 
}) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  
  const sizeClasses = {
    sm: 'size-8 text-xs',
    md: 'size-10 text-sm',
    lg: 'size-12 text-base',
  };
  
  if (avatar) {
    return (
      <img 
        src={avatar} 
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }
  
  const colors = [
    'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 
    'bg-amber-500', 'bg-cyan-500', 'bg-pink-500'
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  
  return (
    <div className={`${sizeClasses[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}>
      {initials}
    </div>
  );
};

// Wait Time Display
const WaitTime: FC<{ minutes?: number }> = ({ minutes }) => {
  if (minutes === undefined) return null;
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  let colorClass = 'text-emerald-600 dark:text-emerald-400';
  if (minutes > 30) colorClass = 'text-amber-600 dark:text-amber-400';
  if (minutes > 60) colorClass = 'text-red-600 dark:text-red-400';
  
  return (
    <span className={`text-xs font-medium ${colorClass}`}>
      รอ {hours > 0 ? `${hours} ชม. ${mins} น.` : `${mins} นาที`}
    </span>
  );
};

// Live Indicator
const LiveIndicator: FC = () => (
  <div className="flex items-center gap-1.5">
    <span className="relative flex size-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
      Live
    </span>
  </div>
);

// Priority Badge
const PriorityBadge: FC<{ priority?: 'normal' | 'urgent' | 'emergency' }> = ({ priority }) => {
  if (!priority || priority === 'normal') return null;
  const config = priorityConfig[priority];
  if (!config) return null;
  
  return (
    <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded ${config.class}`}>
      {config.label}
    </span>
  );
};

// Status Badge
const StatusBadge: FC<{ status: keyof typeof statusConfig }> = ({ status }) => {
  const config = statusConfig[status] || statusConfig.scheduled;
  const Icon = config.icon;
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon size={12} className={config.animate ? 'animate-spin' : ''} />
      <span>{config.label}</span>
    </div>
  );
};

// Mobile Card Component
const AppointmentCard: FC<{
  appointment: HISAppointment;
  onTap?: () => void;
  onCall?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}> = ({ appointment, onTap, onCall, onEdit, onDelete, isExpanded, onToggleExpand }) => {
  const status = statusConfig[appointment.status as keyof typeof statusConfig] || statusConfig.scheduled;
  const priority = priorityConfig[appointment.priority || 'normal'];
  
  return (
    <div 
      className={`
        bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800
        overflow-hidden transition-all duration-200
        ${priority?.cardBorder ? `border-l-4 ${priority.cardBorder}` : ''}
        ${appointment.priority === 'emergency' ? 'shadow-lg shadow-red-500/10' : 'shadow-sm'}
      `}
    >
      {/* Main Content - Tappable */}
      <div 
        className="p-4 cursor-pointer active:bg-slate-50 dark:active:bg-slate-800/50"
        onClick={onTap || onToggleExpand}
      >
        {/* Header: Patient + Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <PatientAvatar name={appointment.patientName} avatar={appointment.patientAvatar} size="md" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                  {appointment.patientName}
                </h4>
                <PriorityBadge priority={appointment.priority} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {appointment.patientId}
              </p>
            </div>
          </div>
          <StatusBadge status={appointment.status as keyof typeof statusConfig} />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {/* Time */}
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Clock size={14} className="text-slate-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white font-mono">
                {appointment.time}
              </p>
              {appointment.waitTime !== undefined && appointment.status === 'waiting' && (
                <WaitTime minutes={appointment.waitTime} />
              )}
            </div>
          </div>

          {/* Doctor */}
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Stethoscope size={14} className="text-slate-500" />
            </div>
            <div className="min-w-0">
              <p className="text-slate-700 dark:text-slate-300 truncate">
                {appointment.doctor}
              </p>
              {appointment.room && (
                <p className="text-xs text-slate-400">ห้อง {appointment.room}</p>
              )}
            </div>
          </div>
        </div>

        {/* Type & Expand indicator */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
            {appointment.type}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand?.();
            }}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-800">
          <div className="pt-3 space-y-3">
            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {appointment.patientPhone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">{appointment.patientPhone}</span>
                </div>
              )}
              {appointment.insurance && (
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">{appointment.insurance}</span>
                </div>
              )}
            </div>
            
            {appointment.notes && (
              <div className="flex items-start gap-2 text-sm">
                <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">{appointment.notes}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              {onCall && appointment.patientPhone && (
                <button
                  onClick={(e) => { e.stopPropagation(); onCall(); }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Phone size={16} />
                  โทร
                </button>
              )}
              {onEdit && (
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(); }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors"
                >
                  <Edit size={16} />
                  แก้ไข
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                  className="flex items-center justify-center px-3 py-2.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Desktop Table Row
const TableRow: FC<{
  appointment: HISAppointment;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onRowClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}> = ({ appointment, isExpanded, onToggleExpand, onRowClick, onEdit, onDelete }) => {
  const status = statusConfig[appointment.status as keyof typeof statusConfig] || statusConfig.scheduled;
  const StatusIcon = status.icon;
  const [showActions, setShowActions] = useState(false);

  return (
    <>
      <tr
        onClick={() => onRowClick?.() || onToggleExpand?.()}
        className={`
          hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors
          ${appointment.priority === 'emergency' ? 'bg-red-50/50 dark:bg-red-500/5' : ''}
          ${appointment.priority === 'urgent' ? 'bg-amber-50/50 dark:bg-amber-500/5' : ''}
        `}
      >
        {/* Patient */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <PatientAvatar name={appointment.patientName} avatar={appointment.patientAvatar} />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {appointment.patientName}
                </p>
                <PriorityBadge priority={appointment.priority} />
              </div>
              <p className="text-xs text-slate-500 font-mono">{appointment.patientId}</p>
            </div>
          </div>
        </td>

        {/* Time */}
        <td className="px-5 py-4">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
              {appointment.time}
            </span>
            {appointment.waitTime !== undefined && appointment.status === 'waiting' && (
              <WaitTime minutes={appointment.waitTime} />
            )}
          </div>
        </td>

        {/* Type */}
        <td className="px-5 py-4">
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {appointment.type}
          </span>
          {appointment.room && (
            <p className="text-xs text-slate-400 mt-0.5">ห้อง {appointment.room}</p>
          )}
        </td>

        {/* Doctor */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Stethoscope size={12} className="text-slate-500" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {appointment.doctor}
            </span>
          </div>
        </td>

        {/* Status */}
        <td className="px-5 py-4">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
            <StatusIcon size={12} className={status.animate ? 'animate-spin' : ''} />
            {status.label}
          </div>
        </td>

        {/* Actions */}
        <td className="px-5 py-4 text-right">
          <div className="relative inline-block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <MoreHorizontal size={16} className="text-slate-400" />
            </button>
            
            {showActions && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActions(false);
                  }} 
                />
                <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick?.();
                      setShowActions(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Eye size={14} /> ดูรายละเอียด
                  </button>
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                        setShowActions(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Edit size={14} /> แก้ไข
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                        setShowActions(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <Trash2 size={14} /> ยกเลิก
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded Row */}
      {isExpanded && (
        <tr>
          <td colSpan={6} className="px-5 py-4 bg-slate-50 dark:bg-slate-800/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {appointment.patientPhone && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">โทรศัพท์</p>
                  <a href={`tel:${appointment.patientPhone}`} className="flex items-center gap-1.5 text-primary-600 hover:underline">
                    <Phone size={12} />
                    {appointment.patientPhone}
                  </a>
                </div>
              )}
              {appointment.insurance && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">สิทธิการรักษา</p>
                  <p className="text-slate-700 dark:text-slate-300">{appointment.insurance}</p>
                </div>
              )}
              {appointment.room && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">ห้องตรวจ</p>
                  <p className="text-slate-700 dark:text-slate-300">{appointment.room}</p>
                </div>
              )}
              {appointment.notes && (
                <div className="col-span-2 md:col-span-4">
                  <p className="text-xs text-slate-400 mb-1">หมายเหตุ</p>
                  <p className="text-slate-700 dark:text-slate-300">{appointment.notes}</p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// Main Component
export const AppointmentsTableModern: FC<AppointmentsTableProps> = ({ 
  appointments,
  title = "นัดหมายวันนี้",
  isLoading = false,
  isLive = false,
  onRefresh,
  onViewAll,
  onRowClick,
  onEdit,
  onDelete,
  onCall,
  showSearch = true,
  showFilters = true,
  maxRows,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    let filtered = appointments;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(apt => 
        apt.patientName.toLowerCase().includes(query) ||
        apt.patientId.toLowerCase().includes(query) ||
        apt.doctor.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }
    
    if (maxRows) {
      filtered = filtered.slice(0, maxRows);
    }
    
    return filtered;
  }, [appointments, searchQuery, statusFilter, maxRows]);

  // Status counts
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: appointments.length };
    appointments.forEach(apt => {
      counts[apt.status] = (counts[apt.status] || 0) + 1;
    });
    return counts;
  }, [appointments]);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const filterButtons = [
    { key: 'all', label: 'ทั้งหมด' },
    { key: 'waiting', label: 'รอตรวจ' },
    { key: 'in-progress', label: 'กำลังตรวจ' },
    { key: 'completed', label: 'เสร็จสิ้น' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 lg:px-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">
              {title}
            </h3>
            {isLive && <LiveIndicator />}
            <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-full">
              {appointments.length} รายการ
            </span>
          </div>
          
          <div className="flex items-center gap-1 lg:gap-2">
            {onRefresh && (
              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600"
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
            )}
            <button className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600">
              <Download size={16} />
            </button>
            {onViewAll && (
              <button 
                onClick={onViewAll}
                className="text-xs lg:text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1"
              >
                ดูทั้งหมด
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Search & Filters */}
        {(showSearch || showFilters) && (
          <div className="space-y-3">
            {showSearch && (
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="ค้นหาผู้ป่วย, HN, แพทย์..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
            )}
            
            {showFilters && (
              <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
                {filterButtons.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key)}
                    className={`
                      px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all shrink-0
                      ${statusFilter === key
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {label}
                    <span className={`ml-1.5 ${statusFilter === key ? 'text-white/80' : 'text-slate-400'}`}>
                      ({statusCounts[key] || 0})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-primary-500" />
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Calendar size={40} strokeWidth={1.5} />
          <p className="mt-2 text-sm">ไม่พบข้อมูลนัดหมาย</p>
        </div>
      ) : (
        <>
          {/* Mobile: Card Layout */}
          <div className="lg:hidden p-4 space-y-3">
            {filteredAppointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                onTap={() => onRowClick?.(apt)}
                onCall={() => onCall?.(apt)}
                onEdit={() => onEdit?.(apt)}
                onDelete={() => onDelete?.(apt)}
                isExpanded={expandedId === apt.id}
                onToggleExpand={() => setExpandedId(expandedId === apt.id ? null : apt.id)}
              />
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    ผู้ป่วย
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    เวลา
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    ประเภท
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    แพทย์
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-5 py-3 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAppointments.map((apt) => (
                  <TableRow
                    key={apt.id}
                    appointment={apt}
                    isExpanded={expandedId === apt.id}
                    onToggleExpand={() => setExpandedId(expandedId === apt.id ? null : apt.id)}
                    onRowClick={() => onRowClick?.(apt)}
                    onEdit={() => onEdit?.(apt)}
                    onDelete={() => onDelete?.(apt)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export { AppointmentsTableModern as AppointmentsTable };