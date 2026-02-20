// =============================================================================
// File: src/components/deaths/AutocompleteSearch.tsx
// Description: Generic autocomplete search input for lookups (ICD-10, Doctor)
// =============================================================================

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, Loader2 } from 'lucide-react'

export interface AutocompleteOption {
  value: string
  label: string
  sublabel?: string
}

interface AutocompleteSearchProps {
  value: string
  onChange: (value: string) => void
  onSearch: (query: string) => Promise<AutocompleteOption[]>
  onSelect?: (option: AutocompleteOption) => void
  placeholder?: string
  label?: string
  displayValue?: string
  disabled?: boolean
  minChars?: number
  debounceMs?: number
}

export const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  value,
  onChange,
  onSearch,
  onSelect,
  placeholder = 'พิมพ์เพื่อค้นหา...',
  label,
  displayValue,
  disabled = false,
  minChars = 1,
  debounceMs = 300,
}) => {
  const [query, setQuery] = useState(displayValue || value || '')
  const [options, setOptions] = useState<AutocompleteOption[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync displayValue
  useEffect(() => {
    if (displayValue !== undefined) {
      setQuery(displayValue)
    }
  }, [displayValue])

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const doSearch = useCallback(
    async (q: string) => {
      if (q.length < minChars) {
        setOptions([])
        setIsOpen(false)
        return
      }
      setLoading(true)
      try {
        const results = await onSearch(q)
        setOptions(results)
        setIsOpen(results.length > 0)
      } catch {
        setOptions([])
      } finally {
        setLoading(false)
      }
    },
    [onSearch, minChars]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => doSearch(val), debounceMs)
  }

  const handleSelect = (opt: AutocompleteOption) => {
    setQuery(opt.label)
    onChange(opt.value)
    onSelect?.(opt)
    setIsOpen(false)
  }

  const handleClear = () => {
    setQuery('')
    onChange('')
    setOptions([])
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setFocused(true)
            if (options.length > 0) setIsOpen(true)
          }}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 disabled:opacity-50"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading && <Loader2 size={16} className="animate-spin text-slate-400" />}
          {query && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X size={14} className="text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto">
          {options.map((opt, idx) => (
            <button
              key={`${opt.value}-${idx}`}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(opt)}
              className="w-full px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {opt.label}
              </span>
              {opt.sublabel && (
                <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {opt.sublabel}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}