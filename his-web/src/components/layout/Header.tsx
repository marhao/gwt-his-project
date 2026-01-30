// =============================================================================
// File: src/components/layout/Header.tsx
// Description: Header - Modern glassmorphism top navigation bar
//              Using xl breakpoint (1280px) for desktop
// =============================================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Search,
  PanelLeft,
  PanelTop,
  Command,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

type LayoutMode = 'sidebar' | 'horizontal';

interface HeaderProps {
  onMenuClick?: () => void;
  layoutMode?: LayoutMode;
  onLayoutModeChange?: (mode: LayoutMode) => void;
}

export function Header({ onMenuClick, layoutMode = 'sidebar', onLayoutModeChange }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const toggleLayoutMode = () => {
    const newMode = layoutMode === 'sidebar' ? 'horizontal' : 'sidebar';
    onLayoutModeChange?.(newMode);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button - Shows below xl (1280px) */}
          <button
            onClick={onMenuClick}
            className="xl:hidden p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl transition-all active:scale-95"
          >
            <Menu size={22} />
          </button>

          {/* Logo - Show on mobile/tablet OR when in horizontal mode on desktop */}
          <Link 
            href="/" 
            className={`flex items-center gap-3 group ${
              layoutMode === 'horizontal' ? 'flex' : 'xl:hidden flex'
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Korat</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">HIS Platform</p>
            </div>
          </Link>

          {/* Divider - Only in horizontal mode on desktop */}
          {layoutMode === 'horizontal' && (
            <div className="hidden xl:block h-8 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent mx-2" />
          )}

          {/* Search Bar - Tablet and Desktop */}
          <div className="hidden md:flex items-center">
            <div className={`relative transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
              <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? 'text-primary-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-20 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-primary-500/50 focus:bg-white dark:focus:bg-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
              {/* Keyboard shortcut hint */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-xs text-slate-400">
                <kbd className="px-1.5 py-0.5 bg-slate-200/80 dark:bg-slate-700/80 rounded text-[10px] font-medium">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-slate-200/80 dark:bg-slate-700/80 rounded text-[10px] font-medium">K</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1.5">
          {/* Layout Mode Toggle - Desktop Only (xl+) */}
          {onLayoutModeChange && (
            <div className="hidden xl:flex items-center bg-slate-100/80 dark:bg-slate-800/80 rounded-xl p-1 border border-slate-200/50 dark:border-slate-700/50">
              <button
                onClick={() => onLayoutModeChange('sidebar')}
                className={`p-2 rounded-lg transition-all ${
                  layoutMode === 'sidebar'
                    ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                title="Sidebar Layout"
              >
                <PanelLeft size={18} />
              </button>
              <button
                onClick={() => onLayoutModeChange('horizontal')}
                className={`p-2 rounded-lg transition-all ${
                  layoutMode === 'horizontal'
                    ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                title="Horizontal Layout"
              >
                <PanelTop size={18} />
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-all active:scale-95"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2.5 text-slate-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-all active:scale-95"
            title="Notifications"
          >
            <Bell size={20} />
            {/* Notification badge with pulse animation */}
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`flex items-center gap-2.5 p-1.5 pl-3 rounded-xl transition-all active:scale-[0.98] ${
                userMenuOpen 
                  ? 'bg-primary-50 dark:bg-primary-500/10' 
                  : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role || 'Guest'}</p>
              </div>
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
              <ChevronDown
                size={16}
                className={`hidden sm:block text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-slate-900/50 py-2 z-50 overflow-hidden">
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 shrink-0">
                      <span className="text-white font-bold text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-slate-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.username}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
                      <User size={16} className="group-hover:text-primary-500 transition-colors" />
                    </div>
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
                      <Settings size={16} className="group-hover:text-primary-500 transition-colors" />
                    </div>
                    <span>Settings</span>
                  </Link>
                </div>

                {/* Layout Toggle - Tablet and Mobile (below xl) */}
                {onLayoutModeChange && (
                  <div className="xl:hidden border-t border-slate-200/50 dark:border-slate-700/50 py-2">
                    <button
                      onClick={toggleLayoutMode}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
                        {layoutMode === 'sidebar' ? (
                          <PanelTop size={16} className="group-hover:text-primary-500 transition-colors" />
                        ) : (
                          <PanelLeft size={16} className="group-hover:text-primary-500 transition-colors" />
                        )}
                      </div>
                      <span>{layoutMode === 'sidebar' ? 'Horizontal Layout' : 'Sidebar Layout'}</span>
                    </button>
                  </div>
                )}

                {/* Logout */}
                <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
                      <LogOut size={16} />
                    </div>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}