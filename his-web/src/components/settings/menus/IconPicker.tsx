'use client';

import { useState, useMemo } from 'react';
import { X, Search, Check } from 'lucide-react';
import { Icons, getIcon } from '@/components/ui';

interface IconPickerProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
  onClose: () => void;
}

export function IconPicker({ selectedIcon, onSelect, onClose }: IconPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const allIcons = Object.keys(Icons);

  const filteredIcons = useMemo(() => {
    if (!searchTerm) return allIcons;
    const term = searchTerm.toLowerCase();
    return allIcons.filter((name) => name.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Select Icon</h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Icons Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredIcons.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No icons found</p>
            </div>
          ) : (
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {filteredIcons.map((iconName) => {
                const Icon = getIcon(iconName);
                const isSelected = selectedIcon === iconName;

                return (
                  <button
                    key={iconName}
                    onClick={() => onSelect(iconName)}
                    className={`
                      relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all
                      ${
                        isSelected
                          ? 'bg-primary-50 dark:bg-primary-500/10 ring-2 ring-primary-500'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                      }
                    `}
                    title={iconName}
                  >
                    {isSelected && (
                      <span className="absolute top-1 right-1">
                        <Check size={12} className="text-primary-500" />
                      </span>
                    )}
                    <Icon
                      size={24}
                      className={
                        isSelected
                          ? 'text-primary-500'
                          : 'text-slate-600 dark:text-slate-400'
                      }
                    />
                    <span className="text-[10px] text-slate-400 truncate max-w-full">
                      {iconName}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {filteredIcons.length} icons available
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}