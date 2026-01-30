// =============================================================================
// File: components/ui/context-menu/types.ts
// Description: TypeScript types for Context Menu components
// =============================================================================

import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface ContextMenuProps {
  /** Whether the menu is open */
  open: boolean;
  /** Position of the menu (click coordinates) */
  position: Position;
  /** Callback when menu should close */
  onClose: () => void;
  /** Menu items */
  children: ReactNode;
  /** Custom class name */
  className?: string;
  /** Menu width in pixels (default: 192 = 12rem) */
  menuWidth?: number;
  /** Estimated menu height for position calculation */
  menuHeight?: number;
}

export type ContextMenuItemVariant = 'default' | 'danger' | 'success' | 'warning';

export interface ContextMenuItemProps {
  /** Click handler */
  onClick?: () => void;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Menu item content */
  children: ReactNode;
  /** Visual variant */
  variant?: ContextMenuItemVariant;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
  /** Keyboard shortcut hint */
  shortcut?: string;
}

export interface ContextMenuDividerProps {
  /** Custom class name */
  className?: string;
}

export interface ContextMenuLabelProps {
  /** Label content */
  children: ReactNode;
  /** Custom class name */
  className?: string;
}

export interface UseContextMenuReturn {
  /** Whether the menu is open */
  isOpen: boolean;
  /** Current position */
  position: Position;
  /** Data associated with the context menu */
  data: any;
  /** Open the context menu */
  open: (e: React.MouseEvent, data?: any) => void;
  /** Close the context menu */
  close: () => void;
}