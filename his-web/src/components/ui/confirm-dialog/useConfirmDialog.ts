// =============================================================================
// File: components/ui/confirm-dialog/useConfirmDialog.ts
// Description: Custom hook for managing confirm dialog state
// =============================================================================

'use client';

import { useState, useCallback } from 'react';
import { type UseConfirmDialogOptions, type UseConfirmDialogReturn } from './types';

export function useConfirmDialog<T = any>(
  options: UseConfirmDialogOptions<T> = {}
): UseConfirmDialogReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const open = useCallback((itemData?: T) => {
    setData(itemData ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    if (loading) return; // Prevent closing while loading
    setIsOpen(false);
    // Keep data briefly for close animation
    setTimeout(() => setData(null), 200);
    options.onClose?.();
  }, [loading, options]);

  const confirm = useCallback(async () => {
    if (loading || !data) return;

    try {
      setLoading(true);
      await options.onConfirm?.(data);
      setIsOpen(false);
      setTimeout(() => setData(null), 200);
    } catch (error) {
      console.error('Confirm action failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [data, loading, options]);

  return {
    isOpen,
    data,
    loading,
    open,
    close,
    confirm,
    dialogProps: {
      open: isOpen,
      onClose: close,
      onConfirm: confirm,
      loading,
    },
  };
}