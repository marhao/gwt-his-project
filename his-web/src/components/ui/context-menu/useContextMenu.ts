// =============================================================================
// File: components/ui/context-menu/useContextMenu.ts
// Description: Custom hook for managing context menu state
// =============================================================================

'use client';

import { useState, useCallback } from 'react';
import { type Position, type UseContextMenuReturn } from './types';

export function useContextMenu<T = any>(): UseContextMenuReturn & { data: T | null } {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((e: React.MouseEvent, itemData?: T) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition({ x: e.clientX, y: e.clientY });
    setData(itemData ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Keep data for a moment in case it's needed during close animation
    setTimeout(() => setData(null), 200);
  }, []);

  return {
    isOpen,
    position,
    data,
    open,
    close,
  };
}