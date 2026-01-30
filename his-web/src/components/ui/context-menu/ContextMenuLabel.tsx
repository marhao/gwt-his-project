// =============================================================================
// File: components/ui/context-menu/ContextMenuLabel.tsx
// Description: Label/header for grouping menu items
// =============================================================================

import { type ContextMenuLabelProps } from './types';
import { cn } from '@/lib/utils';

export function ContextMenuLabel({ children, className }: ContextMenuLabelProps) {
  return (
    <div
      className={cn(
        'px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider',
        className
      )}
    >
      {children}
    </div>
  );
}