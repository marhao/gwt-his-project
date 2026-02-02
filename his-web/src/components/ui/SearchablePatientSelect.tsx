// src/components/ui/SearchablePatientSelect.tsx
// Searchable patient select component with dropdown
// Supports external updates from Smart Card reader

import React, { useState, useEffect, useRef } from 'react';
import { User, ChevronDown, Loader2, X, Search, AlertCircle } from 'lucide-react';
import { patientApi } from '@/lib/api';
import { PatientListItem } from '@/lib/types/patient';

export interface SearchablePatientSelectProps {
  value: string;
  onChange: (hn: string, patient: PatientListItem | null, cardPhoto?: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  initialPatient?: PatientListItem | null;
  className?: string;
  limit?: number;
}

const SearchablePatientSelect: React.FC<SearchablePatientSelectProps> = ({
  value,
  onChange,
  placeholder = "พิมพ์ HN หรือชื่อเพื่อค้นหาผู้ป่วย...",
  disabled = false,
  initialPatient = null,
  className = "",
  limit = 20,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<PatientListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientListItem | null>(initialPatient);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ============================================
  // Sync with external changes (Smart Card, etc.)
  // ============================================
  useEffect(() => {
    // When initialPatient changes from external source (e.g., Smart Card)
    if (initialPatient && initialPatient.hn) {
      setSelectedPatient(initialPatient);
      setSearchTerm(`${initialPatient.hn} - ${initialPatient.fullName}`);
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  }, [initialPatient]);

  // Sync when value changes externally (e.g., clear from parent)
  useEffect(() => {
    if (!value && selectedPatient) {
      // Value cleared from parent
      setSelectedPatient(null);
      setSearchTerm('');
    } else if (value && initialPatient && initialPatient.hn === value && selectedPatient?.hn !== value) {
      // Value set from parent with matching initialPatient
      setSelectedPatient(initialPatient);
      setSearchTerm(`${initialPatient.hn} - ${initialPatient.fullName}`);
    }
  }, [value, initialPatient]);

  // Calculate dropdown position
  const calculateDropdownPosition = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 320; // max-h-80 = 320px
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setDropdownPosition('top');
    } else {
      setDropdownPosition('bottom');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      calculateDropdownPosition();
      
      const handleReposition = () => {
        if (isOpen) {
          calculateDropdownPosition();
        }
      };

      window.addEventListener('resize', handleReposition);
      window.addEventListener('scroll', handleReposition, true);
      
      return () => {
        window.removeEventListener('resize', handleReposition);
        window.removeEventListener('scroll', handleReposition, true);
      };
    }
  }, [isOpen]);

  // Search patients when searchTerm changes
  useEffect(() => {
    const performSearch = async () => {
      // Don't search if we have a selected patient and searchTerm matches
      if (selectedPatient && searchTerm === `${selectedPatient.hn} - ${selectedPatient.fullName}`) {
        return;
      }

      if (searchTerm.length < 2) {
        setPatients([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const result = await patientApi.search(searchTerm, limit);
        setPatients(result);
      } catch (err) {
        console.error('Error searching patients:', err);
        setError('เกิดข้อผิดพลาดในการค้นหา');
        setPatients([]);
      }
      
      setLoading(false);
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, limit, selectedPatient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsOpen(true);
    setFocusedIndex(-1);
    
    // Clear selection if user modifies the input
    if (selectedPatient && term !== `${selectedPatient.hn} - ${selectedPatient.fullName}`) {
      setSelectedPatient(null);
      onChange('', null);
    }
  };

  const handlePatientSelect = (patient: PatientListItem) => {
    setSelectedPatient(patient);
    setSearchTerm(`${patient.hn} - ${patient.fullName}`);
    setIsOpen(false);
    setFocusedIndex(-1);
    onChange(patient.hn, patient);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || patients.length === 0) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < patients.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : patients.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && patients[focusedIndex]) {
          handlePatientSelect(patients[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSelection = () => {
    setSelectedPatient(null);
    setSearchTerm('');
    setPatients([]);
    setIsOpen(false);
    onChange('', null);
    inputRef.current?.focus();
  };

  const getSexLabel = (sex: string | null) => {
    if (sex === 'M' || sex === '1') return 'ชาย';
    if (sex === 'F' || sex === '2') return 'หญิง';
    return '';
  };

  const getSexColor = (sex: string | null) => {
    if (sex === 'M' || sex === '1') return 'text-blue-600 dark:text-blue-400';
    if (sex === 'F' || sex === '2') return 'text-pink-600 dark:text-pink-400';
    return 'text-slate-500';
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            // Only open dropdown if not already selected or if typing
            if (!selectedPatient && searchTerm.length >= 2 && patients.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-10 pr-12 py-3 border rounded-xl transition-colors duration-200
            bg-white dark:bg-slate-800 
            border-slate-200 dark:border-slate-700 
            text-slate-900 dark:text-white 
            placeholder-slate-400 dark:placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${selectedPatient ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30' : ''}`}
        />

        {/* Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading && (
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
          )}
          {selectedPatient && !loading && (
            <button
              type="button"
              onClick={clearSelection}
              disabled={disabled}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {!selectedPatient && (
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-slate-400 ${
              isOpen ? 'rotate-180' : ''
            }`} />
          )}
        </div>
      </div>

      {/* Selected Patient Indicator */}
      {selectedPatient && (
        <div className="absolute -top-2 left-3 px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full font-medium">
          เลือกแล้ว
        </div>
      )}

      {/* Dropdown */}
      {isOpen && !selectedPatient && (
        <div 
          ref={dropdownRef}
          className={`absolute z-50 w-full border rounded-xl shadow-xl max-h-80 overflow-auto ${
            dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
          } bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700`}
        >
          {loading && (
            <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
              กำลังค้นหาผู้ป่วย...
            </div>
          )}

          {error && !loading && (
            <div className="px-4 py-4 text-center text-sm text-red-500 dark:text-red-400 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {!loading && !error && patients.length === 0 && searchTerm.length >= 2 && (
            <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <User className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              ไม่พบผู้ป่วย &quot;{searchTerm}&quot;
            </div>
          )}

          {!loading && !error && patients.length === 0 && searchTerm.length < 2 && (
            <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              พิมพ์อย่างน้อย 2 ตัวอักษรเพื่อค้นหา
            </div>
          )}

          {!loading && !error && patients.map((patient, index) => (
            <button
              key={patient.hn}
              type="button"
              onClick={() => handlePatientSelect(patient)}
              className={`w-full px-4 py-3 text-left transition-colors duration-150 border-b border-slate-100 dark:border-slate-700 last:border-b-0 ${
                index === focusedIndex
                  ? 'bg-primary-50 dark:bg-primary-500/20 text-primary-900 dark:text-primary-100'
                  : selectedPatient?.hn === patient.hn
                    ? 'bg-primary-100 dark:bg-primary-600/20 text-primary-900 dark:text-primary-100'
                    : 'text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{patient.fullName}</span>
                    {patient.hasAllergy && (
                      <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs rounded">
                        แพ้ยา
                      </span>
                    )}
                    {patient.isDead && (
                      <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs rounded">
                        เสียชีวิต
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm mt-0.5">
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      HN: {patient.hn}
                    </span>
                    {patient.sex && (
                      <span className={getSexColor(patient.sex)}>
                        {getSexLabel(patient.sex)}
                      </span>
                    )}
                    {patient.age && (
                      <span className="text-slate-500 dark:text-slate-400">
                        {patient.age} ปี
                      </span>
                    )}
                  </div>
                  {patient.cid && (
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      CID: {patient.cid.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5')}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { SearchablePatientSelect };
export default SearchablePatientSelect;