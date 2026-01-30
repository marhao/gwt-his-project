// =============================================================================
// File: components/ui/context-menu/ContextMenu.tsx
// Description: Main Context Menu wrapper component with auto-positioning
// =============================================================================

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { type ContextMenuProps } from './types';
import { cn } from '@/lib/utils';

export function ContextMenu({
  open,
  position,
  onClose,
  children,
  className,
  menuWidth = 192,
  menuHeight = 280,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate position to keep menu within viewport
  const calculatePosition = useCallback(
    (clickX: number, clickY: number) => {
      const padding = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = clickX;
      let y = clickY;

      // Check right edge
      if (clickX + menuWidth + padding > viewportWidth) {
        x = clickX - menuWidth;
      }

      // Check bottom edge
      if (clickY + menuHeight + padding > viewportHeight) {
        y = viewportHeight - menuHeight - padding;
      }

      // Prevent going past left edge
      if (x < padding) {
        x = padding;
      }

      // Prevent going past top edge
      if (y < padding) {
        y = padding;
      }

      return { x, y };
    },
    [menuWidth, menuHeight]
  );

  // Update position when menu opens or position changes
  useEffect(() => {
    if (open) {
      const newPosition = calculatePosition(position.x, position.y);
      setAdjustedPosition(newPosition);
    }
  }, [open, position, calculatePosition]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Use setTimeout to avoid immediate close on the same click that opened the menu
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      onClose();
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const menuContent = (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div
        ref={menuRef}
        role="menu"
        aria-orientation="vertical"
        className={cn(
          'fixed z-50 min-w-48 overflow-hidden',
          'bg-white dark:bg-slate-900',
          'border border-slate-200 dark:border-slate-700',
          'rounded-xl shadow-xl',
          'py-1.5',
          'animate-in fade-in-0 zoom-in-95 duration-150',
          className
        )}
        style={{
          left: adjustedPosition.x,
          top: adjustedPosition.y,
          maxHeight: 'calc(100vh - 16px)',
          overflowY: 'auto',
        }}
      >
        {children}
      </div>
    </>
  );

  // Render in portal to avoid z-index issues
  return createPortal(menuContent, document.body);
}