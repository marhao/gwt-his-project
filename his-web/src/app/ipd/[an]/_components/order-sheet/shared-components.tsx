'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Maximize2 } from 'lucide-react';

// ============================================
// Autocomplete Input
// ============================================

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (option: any) => void;
  options: any[];
  placeholder: string;
  className?: string;
}

export function AutocompleteInput({ 
  value, 
  onChange, 
  onSelect, 
  options, 
  placeholder, 
  className = '' 
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    setSearchQuery(value || ''); 
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    (typeof opt === 'string' ? opt : opt.name)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSelect = (opt: any) => {
    const name = typeof opt === 'string' ? opt : opt.name;
    setSearchQuery(name);
    onChange(name);
    onSelect?.(opt);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { 
            setSearchQuery(e.target.value); 
            onChange(e.target.value); 
            setIsOpen(true); 
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-52 overflow-y-auto">
          {filteredOptions.slice(0, 8).map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(opt)}
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white"
            >
              <div className="font-medium">
                {typeof opt === 'string' ? opt : opt.name}
              </div>
              {typeof opt !== 'string' && (opt.description || opt.defaultDose) && (
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {opt.description || opt.defaultDose}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Splitter Component
// ============================================

interface SplitterProps {
  index: number;
  onMouseDown: (index: number) => (e: React.MouseEvent) => void;
  isDragging: number | null;
}

export function Splitter({ index, onMouseDown, isDragging }: SplitterProps) {
  const isActive = isDragging === index;
  
  return (
    <div
      onMouseDown={onMouseDown(index)}
      className={`hidden lg:flex w-2 flex-col items-center justify-center cursor-col-resize transition-colors shrink-0 ${
        isActive 
          ? 'bg-blue-500' 
          : 'bg-slate-300/80 dark:bg-slate-600/80 hover:bg-blue-400 dark:hover:bg-blue-500'
      }`}
    >
      <div className="flex flex-col gap-1">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-slate-500'}`} 
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// Collapsed Column
// ============================================

interface CollapsedColumnProps {
  title: string;
  icon: any;
  color: string;
  count: number;
  onClick: () => void;
}

export function CollapsedColumn({ title, icon: Icon, color, count, onClick }: CollapsedColumnProps) {
  return (
    <div
      onClick={onClick}
      className="hidden lg:flex w-12 flex-col items-center py-4 cursor-pointer transition-all hover:w-14 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700"
    >
      <button className={`p-2 rounded-xl ${color} mb-2`}>
        <Icon className="w-4 h-4 text-white" />
      </button>
      <div 
        className="text-xs font-bold text-center text-slate-600 dark:text-slate-300" 
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {title}
      </div>
      <span className="mt-2 px-1.5 py-0.5 rounded text-xs font-bold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300">
        {count}
      </span>
      <Maximize2 className="w-4 h-4 mt-2 text-slate-400" />
    </div>
  );
}

// ============================================
// Panel Header
// ============================================

interface PanelHeaderProps {
  title: string;
  icon: any;
  iconBgColor: string;
  count: number;
  badgeColor: string;
  headerBgColor: string;
  children?: React.ReactNode;
}

export function PanelHeader({ 
  title, 
  icon: Icon, 
  iconBgColor, 
  count, 
  badgeColor,
  headerBgColor,
  children 
}: PanelHeaderProps) {
  return (
    <div className={`sticky top-0 z-10 px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between ${headerBgColor} backdrop-blur-sm`}>
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${iconBgColor}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-bold text-slate-800 dark:text-white">{title}</span>
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${badgeColor}`}>
          {count}
        </span>
      </div>
      {children && (
        <div className="flex gap-1">
          {children}
        </div>
      )}
    </div>
  );
}