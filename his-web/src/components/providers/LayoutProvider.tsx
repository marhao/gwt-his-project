'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { LayoutMode } from '@/types';

interface LayoutContextType {
  mode: LayoutMode;
  setMode: (mode: LayoutMode) => void;
  toggleMode: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  isMobile: boolean;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [mode, setModeState] = useState<LayoutMode>('sidebar');
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpenState] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check localStorage for saved preferences
    const storedMode = localStorage.getItem('layoutMode') as LayoutMode | null;
    const storedCollapsed = localStorage.getItem('sidebarCollapsed');
    
    if (storedMode) setModeState(storedMode);
    if (storedCollapsed) setSidebarCollapsedState(storedCollapsed === 'true');

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const setMode = (newMode: LayoutMode) => {
    setModeState(newMode);
    localStorage.setItem('layoutMode', newMode);
  };

  const toggleMode = () => {
    setMode(mode === 'sidebar' ? 'horizontal' : 'sidebar');
  };

  const setSidebarCollapsed = (collapsed: boolean) => {
    setSidebarCollapsedState(collapsed);
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const openMobileMenu = () => {
    setMobileMenuOpenState(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpenState(false);
    document.body.style.overflow = '';
  };

  const value: LayoutContextType = {
    mode,
    setMode,
    toggleMode,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
    setMobileMenuOpen: setMobileMenuOpenState,
    openMobileMenu,
    closeMobileMenu,
    isMobile,
  };

  // Always provide context, but show loading state if not mounted
  return (
    <LayoutContext.Provider value={value}>
      {mounted ? children : (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === null) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}