// =============================================================================
// File: components/ui/context-menu/ContextMenuDivider.tsx
// Description: Divider line for context menu
// =============================================================================

import { type ContextMenuDividerProps } from './types';
import { cn } from '@/lib/utils';

export function ContextMenuDivider({ className }: ContextMenuDividerProps) {
  return (
    <div
      role="separator"
      className={cn(
        'border-t border-slate-200 dark:border-slate-700 my-1.5',
        className
      )}
    />
  );
}