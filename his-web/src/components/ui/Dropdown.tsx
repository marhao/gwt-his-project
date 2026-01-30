'use client';

import { FC, useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

export const Dropdown: FC<DropdownProps> = ({ trigger, items, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu */}
      <div
        className={`
          dropdown-menu
          ${align === 'right' ? 'right-0 left-auto' : 'left-0'}
          ${isOpen ? 'open' : ''}
        `}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href || '#'}
            className="dropdown-item"
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
              setIsOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

// Navigation Dropdown specifically for horizontal menu
interface NavDropdownProps {
  label: string;
  icon?: ReactNode;
  items: DropdownItem[];
  badge?: string | number;
  badgeColor?: 'primary' | 'success' | 'warning' | 'critical';
}

export const NavDropdown: FC<NavDropdownProps> = ({
  label,
  icon,
  items,
  badge,
  badgeColor = 'primary',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const badgeColors = {
    primary: 'bg-primary-500 text-white',
    success: 'bg-success-500 text-white',
    warning: 'bg-warning-500 text-slate-900',
    critical: 'bg-critical-500 text-white',
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          nav-item-horizontal
          ${isOpen ? 'bg-slate-100 dark:bg-slate-800' : ''}
        `}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        <span>{label}</span>
        {badge && (
          <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${badgeColors[badgeColor]}`}>
            {badge}
          </span>
        )}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          dropdown-menu min-w-44
          ${isOpen ? 'open' : ''}
        `}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href || '#'}
            className="dropdown-item"
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
              setIsOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};
