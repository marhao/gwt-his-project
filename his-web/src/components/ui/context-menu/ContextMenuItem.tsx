// =============================================================================
// File: components/ui/context-menu/ContextMenuItem.tsx
// Description: Individual menu item component
// =============================================================================

'use client';

import { type ContextMenuItemProps } from './types';
import { cn } from '@/lib/utils';

const variantStyles = {
  default: 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800',
  danger: 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10',
  success: 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10',
  warning: 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10',
};

export function ContextMenuItem({
  onClick,
  icon: Icon,
  children,
  variant = 'default',
  disabled = false,
  className,
  shortcut,
}: ContextMenuItemProps) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
        'focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800',
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {Icon && <Icon size={16} className="flex-shrink-0" />}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && (
        <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto pl-4">
          {shortcut}
        </span>
      )}
    </button>
  );
}