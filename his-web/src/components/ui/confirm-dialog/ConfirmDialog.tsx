// =============================================================================
// File: components/ui/confirm-dialog/ConfirmDialog.tsx
// Description: Reusable confirmation dialog component
// =============================================================================

'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertTriangle,
  Trash2,
  Info,
  CheckCircle,
  X,
  Loader2,
} from 'lucide-react';
import { type ConfirmDialogProps, type ConfirmDialogVariant } from './types';
import { cn } from '@/lib/utils';

const variantConfig: Record<
  ConfirmDialogVariant,
  {
    icon: typeof AlertTriangle;
    iconBg: string;
    iconColor: string;
    headerBg: string;
    buttonBg: string;
    buttonHover: string;
  }
> = {
  danger: {
    icon: Trash2,
    iconBg: 'bg-red-100 dark:bg-red-500/20',
    iconColor: 'text-red-600 dark:text-red-400',
    headerBg: 'bg-red-50 dark:bg-red-500/10',
    buttonBg: 'bg-red-500',
    buttonHover: 'hover:bg-red-600',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    headerBg: 'bg-amber-50 dark:bg-amber-500/10',
    buttonBg: 'bg-amber-500',
    buttonHover: 'hover:bg-amber-600',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-100 dark:bg-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    headerBg: 'bg-blue-50 dark:bg-blue-500/10',
    buttonBg: 'bg-blue-500',
    buttonHover: 'hover:bg-blue-600',
  },
  success: {
    icon: CheckCircle,
    iconBg: 'bg-green-100 dark:bg-green-500/20',
    iconColor: 'text-green-600 dark:text-green-400',
    headerBg: 'bg-green-50 dark:bg-green-500/10',
    buttonBg: 'bg-green-500',
    buttonHover: 'hover:bg-green-600',
  },
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  variant = 'danger',
  icon: CustomIcon,
  confirmText,
  cancelText = 'ยกเลิก',
  loading = false,
  disabled = false,
  children,
}: ConfirmDialogProps) {
  const config = variantConfig[variant];
  const Icon = CustomIcon || config.icon;

  // Default confirm text based on variant
  const defaultConfirmText = {
    danger: 'ลบ',
    warning: 'ยืนยัน',
    info: 'ตกลง',
    success: 'ยืนยัน',
  };

  const finalConfirmText = confirmText || defaultConfirmText[variant];

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, loading]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleConfirm = useCallback(async () => {
    if (loading || disabled) return;
    await onConfirm();
  }, [onConfirm, loading, disabled]);

  if (!open) return null;

  const dialogContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={loading ? undefined : onClose}
      />

      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className={cn(
          'relative w-full max-w-md',
          'bg-white dark:bg-slate-800',
          'rounded-2xl shadow-2xl overflow-hidden',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
      >
        {/* Header */}
        <div className={cn('p-6', config.headerBg)}>
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                config.iconBg
              )}
            >
              <Icon className={cn('w-6 h-6', config.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                id="confirm-dialog-title"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                {title}
              </h3>
              {message && (
                <p
                  id="confirm-dialog-description"
                  className="text-sm text-slate-600 dark:text-slate-300 mt-1"
                >
                  {message}
                </p>
              )}
            </div>
            {/* Close button */}
            {!loading && (
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Custom content */}
        {children && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
            {children}
          </div>
        )}

        {/* Actions */}
        <div className="p-4 flex gap-3 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            disabled={loading}
            className={cn(
              'flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
              'bg-white dark:bg-slate-700',
              'text-slate-700 dark:text-slate-200',
              'border border-slate-200 dark:border-slate-600',
              'hover:bg-slate-100 dark:hover:bg-slate-600',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || disabled}
            className={cn(
              'flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors',
              'flex items-center justify-center gap-2',
              config.buttonBg,
              config.buttonHover,
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                กำลังดำเนินการ...
              </>
            ) : (
              <>
                <Icon className="w-4 h-4" />
                {finalConfirmText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Render in portal
  if (typeof window === 'undefined') return null;
  return createPortal(dialogContent, document.body);
}