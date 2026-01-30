'use client';

import { FC, useState, useCallback } from 'react';
import { getIcon } from '@/components/ui';
import { QuickAction } from '@/types';
import { Command } from 'lucide-react';

// Extended QuickAction type
interface HISQuickAction extends QuickAction {
  badge?: number;
  badgeType?: 'default' | 'warning' | 'danger';
  shortcut?: string;
  description?: string;
  disabled?: boolean;
  isNew?: boolean;
}

interface QuickActionsProps {
  actions: HISQuickAction[];
  title?: string;
  variant?: 'grid' | 'list' | 'compact';
  columns?: 3 | 4 | 6;
}

// Keyboard shortcut display
const ShortcutKey: FC<{ shortcut: string }> = ({ shortcut }) => (
  <div className="flex items-center gap-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
    {shortcut.split('+').map((key, i) => (
      <span key={i} className="flex items-center">
        {i > 0 && <span className="mx-0.5">+</span>}
        {key.toLowerCase() === 'cmd' || key.toLowerCase() === 'ctrl' ? (
          <Command size={10} />
        ) : (
          <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">
            {key}
          </kbd>
        )}
      </span>
    ))}
  </div>
);

// Badge component
const ActionBadge: FC<{ count: number; type?: 'default' | 'warning' | 'danger' }> = ({ 
  count, 
  type = 'default' 
}) => {
  if (count <= 0) return null;
  
  const colors = {
    default: 'bg-primary-500 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-red-500 text-white animate-pulse',
  };
  
  return (
    <span className={`
      absolute -top-1 -right-1 min-w-5 h-5 px-1.5
      flex items-center justify-center
      text-[10px] font-bold rounded-full
      ${colors[type]}
    `}>
      {count > 99 ? '99+' : count}
    </span>
  );
};

export const QuickActionsModern: FC<QuickActionsProps> = ({ 
  actions, 
  title = 'Quick Actions',
  variant = 'grid',
  columns = 6,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);

  // Extended color palette
  const colorConfig: Record<string, { 
    bg: string; 
    bgHover: string;
    text: string; 
    border: string;
    gradient: string;
  }> = {
    primary: {
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      bgHover: 'hover:bg-blue-100 dark:hover:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-500/30',
      gradient: 'from-blue-500 to-blue-600',
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      bgHover: 'hover:bg-emerald-100 dark:hover:bg-emerald-500/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      bgHover: 'hover:bg-amber-100 dark:hover:bg-amber-500/20',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-500/30',
      gradient: 'from-amber-500 to-amber-600',
    },
    critical: {
      bg: 'bg-red-50 dark:bg-red-500/10',
      bgHover: 'hover:bg-red-100 dark:hover:bg-red-500/20',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-500/30',
      gradient: 'from-red-500 to-red-600',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-500/10',
      bgHover: 'hover:bg-purple-100 dark:hover:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-500/30',
      gradient: 'from-purple-500 to-purple-600',
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-500/10',
      bgHover: 'hover:bg-cyan-100 dark:hover:bg-cyan-500/20',
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-200 dark:border-cyan-500/30',
      gradient: 'from-cyan-500 to-cyan-600',
    },
    slate: {
      bg: 'bg-slate-50 dark:bg-slate-500/10',
      bgHover: 'hover:bg-slate-100 dark:hover:bg-slate-500/20',
      text: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-500/30',
      gradient: 'from-slate-500 to-slate-600',
    },
  };

  const getColumnClass = () => {
    switch (columns) {
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-2 lg:grid-cols-4';
      case 6: return 'grid-cols-3 lg:grid-cols-6';
      default: return 'grid-cols-3 lg:grid-cols-6';
    }
  };

  // Grid variant (default)
  const renderGridAction = (action: HISQuickAction) => {
    const colors = colorConfig[action.color] || colorConfig.primary;
    const Icon = getIcon(action.icon);
    const isHovered = hoveredId === action.id;
    const isPressed = pressedId === action.id;

    return (
      <button
        key={action.id}
        onClick={action.onClick}
        disabled={action.disabled}
        onMouseEnter={() => setHoveredId(action.id)}
        onMouseLeave={() => setHoveredId(null)}
        onMouseDown={() => setPressedId(action.id)}
        onMouseUp={() => setPressedId(null)}
        className={`
          relative flex flex-col items-center gap-2 p-4 lg:p-5
          rounded-2xl border transition-all duration-200
          ${colors.bg} ${colors.bgHover} ${colors.border}
          ${action.disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'cursor-pointer'
          }
          ${isPressed ? 'scale-95' : isHovered ? 'scale-105 shadow-lg' : ''}
          group
        `}
      >
        {/* Badge */}
        <ActionBadge count={action.badge || 0} type={action.badgeType} />
        
        {/* New indicator */}
        {action.isNew && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-emerald-500 text-white rounded-full">
            New
          </span>
        )}

        {/* Icon */}
        <div className={`
          w-10 h-10 lg:w-12 lg:h-12 rounded-xl
          flex items-center justify-center
          bg-gradient-to-br ${colors.gradient}
          text-white shadow-lg
          transition-transform duration-200
          ${isHovered ? 'scale-110 rotate-3' : ''}
        `}>
          <Icon size={20} className="lg:w-6 lg:h-6" />
        </div>

        {/* Label */}
        <span className={`text-xs lg:text-sm font-semibold ${colors.text} text-center`}>
          {action.label}
        </span>

        {/* Shortcut */}
        {action.shortcut && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ShortcutKey shortcut={action.shortcut} />
          </div>
        )}
      </button>
    );
  };

  // List variant
  const renderListAction = (action: HISQuickAction) => {
    const colors = colorConfig[action.color] || colorConfig.primary;
    const Icon = getIcon(action.icon);
    const isHovered = hoveredId === action.id;

    return (
      <button
        key={action.id}
        onClick={action.onClick}
        disabled={action.disabled}
        onMouseEnter={() => setHoveredId(action.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={`
          relative flex items-center gap-4 p-4 w-full
          rounded-xl border transition-all duration-200
          ${colors.bg} ${colors.bgHover} ${colors.border}
          ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isHovered ? 'shadow-md translate-x-1' : ''}
          group
        `}
      >
        {/* Icon */}
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          bg-gradient-to-br ${colors.gradient} text-white
        `}>
          <Icon size={18} />
        </div>

        {/* Content */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${colors.text}`}>
              {action.label}
            </span>
            {action.badge && action.badge > 0 && (
              <span className={`
                px-2 py-0.5 text-xs font-bold rounded-full
                ${action.badgeType === 'danger' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : ''}
                ${action.badgeType === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : ''}
                ${!action.badgeType || action.badgeType === 'default' ? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' : ''}
              `}>
                {action.badge}
              </span>
            )}
            {action.isNew && (
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-emerald-500 text-white rounded-full">
                New
              </span>
            )}
          </div>
          {action.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {action.description}
            </p>
          )}
        </div>

        {/* Shortcut & Arrow */}
        <div className="flex items-center gap-3 shrink-0">
          {action.shortcut && <ShortcutKey shortcut={action.shortcut} />}
          <span className="text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-500 transition-colors">
            →
          </span>
        </div>
      </button>
    );
  };

  // Compact variant
  const renderCompactAction = (action: HISQuickAction) => {
    const colors = colorConfig[action.color] || colorConfig.primary;
    const Icon = getIcon(action.icon);
    const isHovered = hoveredId === action.id;

    return (
      <button
        key={action.id}
        onClick={action.onClick}
        disabled={action.disabled}
        onMouseEnter={() => setHoveredId(action.id)}
        onMouseLeave={() => setHoveredId(null)}
        title={action.label}
        className={`
          relative w-12 h-12 rounded-xl
          flex items-center justify-center
          border transition-all duration-200
          ${colors.bg} ${colors.bgHover} ${colors.border}
          ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isHovered ? 'scale-110 shadow-lg' : ''}
        `}
      >
        <ActionBadge count={action.badge || 0} type={action.badgeType} />
        <Icon size={20} className={colors.text} />
      </button>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <span className="text-xs text-slate-400">
          {actions.length} actions
        </span>
      </div>

      {/* Actions */}
      <div className="p-4 lg:p-5">
        {variant === 'grid' && (
          <div className={`grid ${getColumnClass()} gap-3`}>
            {actions.map(renderGridAction)}
          </div>
        )}

        {variant === 'list' && (
          <div className="flex flex-col gap-2">
            {actions.map(renderListAction)}
          </div>
        )}

        {variant === 'compact' && (
          <div className="flex flex-wrap gap-2">
            {actions.map(renderCompactAction)}
          </div>
        )}
      </div>
    </div>
  );
};

// Export original name for compatibility
export { QuickActionsModern as QuickActions };