// =============================================================================
// File: src/components/layout/AdminLayout.tsx
// Description: Admin Layout - Main layout wrapper with sidebar/horizontal toggle
//              Using xl breakpoint (1280px) for desktop, below uses mobile menu
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { HorizontalNav } from './HorizontalNav';
import { MobileMenu } from './MobileMenu';

type LayoutMode = 'sidebar' | 'horizontal';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('sidebar');

  // Load layout preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('layoutMode') as LayoutMode;
    if (savedMode && (savedMode === 'sidebar' || savedMode === 'horizontal')) {
      setLayoutMode(savedMode);
    }
  }, []);

  // Save layout preference to localStorage
  const handleLayoutModeChange = (mode: LayoutMode) => {
    setLayoutMode(mode);
    localStorage.setItem('layoutMode', mode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Sidebar - Desktop only (xl: 1280px+) in sidebar mode */}
      {layoutMode === 'sidebar' && (
        <div className="hidden xl:block">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
      )}

      {/* Mobile Menu - Shows on tablet and mobile (below xl) */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`
          relative z-10
          transition-all duration-300 ease-in-out
          ${layoutMode === 'sidebar' 
            ? (sidebarCollapsed ? 'xl:ml-20' : 'xl:ml-64')
            : 'xl:ml-0'
          }
        `}
      >
        {/* Header */}
        <Header 
          onMenuClick={() => setMobileMenuOpen(true)} 
          layoutMode={layoutMode}
          onLayoutModeChange={handleLayoutModeChange}
        />

        {/* Horizontal Navigation - Desktop (xl+) in horizontal mode */}
        {layoutMode === 'horizontal' && (
          <div className="hidden xl:block sticky top-16 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="px-4 py-2">
              <HorizontalNav />
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="p-4 xl:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}