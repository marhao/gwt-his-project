// =============================================================================
// File: src/components/layout/Navbar.tsx
// Description: Top Navbar for Admin Layout
// =============================================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  HelpCircle,
  MessageSquare,
  Calendar,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

interface NavbarProps {
  sidebarCollapsed?: boolean;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

// ============================================
// Mock Data
// ============================================

const mockNotifications: NotificationItem[] = [
  { id: '1', title: 'ผู้ป่วยใหม่', message: 'มีผู้ป่วยลงทะเบียนใหม่ 5 ราย', time: '5 นาทีที่แล้ว', read: false, type: 'info' },
  { id: '2', title: 'แจ้งเตือนนัดหมาย', message: 'มีนัดหมายวันนี้ 12 รายการ', time: '30 นาทีที่แล้ว', read: false, type: 'warning' },
  { id: '3', title: 'สำเร็จ', message: 'ส่งออกรายงานเรียบร้อย', time: '1 ชั่วโมงที่แล้ว', read: true, type: 'success' },
];

// ============================================
// Navbar Component
// ============================================

export function Navbar({ sidebarCollapsed }: NavbarProps) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Check dark mode
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  // Get page title from pathname
  const getPageTitle = (): string => {
    const routes: Record<string, string> = {
      '/': 'หน้าหลัก',
      '/patients': 'ทะเบียนผู้ป่วย',
      '/opd': 'งานผู้ป่วยนอก',
      '/ipd': 'งานผู้ป่วยใน',
      '/appointments': 'นัดหมาย',
      '/reports': 'รายงาน',
      '/settings': 'ตั้งค่าระบบ',
    };

    // Check exact match first
    if (routes[pathname]) return routes[pathname];

    // Check partial match
    for (const [path, title] of Object.entries(routes)) {
      if (pathname.startsWith(path + '/')) return title;
    }

    return 'Korat HIS';
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className={cn(
      'sticky top-0 z-30 h-16',
      'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg',
      'border-b border-slate-200/50 dark:border-slate-800/50',
      // Hide on mobile (hamburger menu in sidebar handles it)
      'hidden lg:flex items-center justify-between px-6'
    )}>
      {/* Left Section - Page Title & Breadcrumb */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>หน้าหลัก</span>
            {pathname !== '/' && (
              <>
                <span>/</span>
                <span className="text-primary-600 dark:text-primary-400">{getPageTitle()}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาผู้ป่วย, HN, เลขบัตรประชาชน..."
            className={cn(
              'w-full pl-11 pr-4 py-2.5',
              'bg-slate-100 dark:bg-slate-800',
              'border-0 rounded-xl',
              'text-sm placeholder:text-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/30',
              'transition-shadow'
            )}
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-mono rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* Quick Actions */}
        <div className="hidden xl:flex items-center gap-1 mr-2 pr-2 border-r border-slate-200 dark:border-slate-700">
          <Link
            href="/appointments"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="นัดหมาย"
          >
            <Calendar size={18} />
          </Link>
          <Link
            href="/opd"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="OPD"
          >
            <Activity size={18} />
          </Link>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Help */}
        <button
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="ช่วยเหลือ"
        >
          <HelpCircle size={18} />
        </button>

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              'relative p-2 rounded-lg transition-colors',
              showNotifications
                ? 'text-primary-600 bg-primary-50 dark:bg-primary-500/10'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">การแจ้งเตือน</h3>
                <button className="text-xs text-primary-600 hover:text-primary-700">
                  ทำเครื่องหมายว่าอ่านแล้ว
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors',
                      !notification.read && 'bg-primary-50/50 dark:bg-primary-500/5'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'size-2 rounded-full mt-2 shrink-0',
                        notification.type === 'info' && 'bg-blue-500',
                        notification.type === 'warning' && 'bg-amber-500',
                        notification.type === 'success' && 'bg-emerald-500',
                        notification.type === 'error' && 'bg-red-500'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50">
                <Link
                  href="/notifications"
                  className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  ดูทั้งหมด
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div ref={userMenuRef} className="relative ml-2">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={cn(
              'flex items-center gap-3 p-1.5 pr-3 rounded-xl transition-colors',
              showUserMenu
                ? 'bg-slate-100 dark:bg-slate-800'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            <div className="relative">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-900 dark:text-white">Admin</p>
              <p className="text-xs text-slate-500">ผู้ดูแลระบบ</p>
            </div>
            <ChevronDown size={16} className={cn(
              'text-slate-400 transition-transform',
              showUserMenu && 'rotate-180'
            )} />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <p className="font-medium text-slate-900 dark:text-white">ผู้ดูแลระบบ</p>
                <p className="text-sm text-slate-500">admin@hospital.go.th</p>
              </div>
              <div className="p-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <User size={16} />
                  โปรไฟล์
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Settings size={16} />
                  ตั้งค่า
                </Link>
                <Link
                  href="/messages"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <MessageSquare size={16} />
                  ข้อความ
                </Link>
              </div>
              <div className="p-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  ออกจากระบบ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;