// =============================================================================
// File: components/ui/confirm-dialog/types.ts
// Description: TypeScript types for ConfirmDialog components
// =============================================================================

import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export type ConfirmDialogVariant = 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Callback when user confirms */
  onConfirm: () => void | Promise<void>;
  /** Dialog title */
  title: string;
  /** Dialog message/description */
  message?: ReactNode;
  /** Visual variant */
  variant?: ConfirmDialogVariant;
  /** Custom icon (overrides variant icon) */
  icon?: LucideIcon;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Whether confirm action is loading */
  loading?: boolean;
  /** Disable confirm button */
  disabled?: boolean;
  /** Additional content below message */
  children?: ReactNode;
}

export interface UseConfirmDialogOptions<T = any> {
  /** Called when user confirms */
  onConfirm?: (data: T) => void | Promise<void>;
  /** Called when dialog closes */
  onClose?: () => void;
}

export interface UseConfirmDialogReturn<T = any> {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Data associated with the dialog */
  data: T | null;
  /** Whether confirm action is loading */
  loading: boolean;
  /** Open the dialog */
  open: (data?: T) => void;
  /** Close the dialog */
  close: () => void;
  /** Confirm action */
  confirm: () => Promise<void>;
  /** Dialog props to spread */
  dialogProps: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    loading: boolean;
  };
}