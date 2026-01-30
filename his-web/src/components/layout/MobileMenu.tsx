// =============================================================================
// File: src/components/layout/MobileMenu.tsx
// Description: Mobile Menu - Slide-out menu from LEFT with dynamic menus from API
//              Shows on mobile and tablet (below xl: 1280px)
// =============================================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, ChevronRight, LogOut, Moon, Sun } from 'lucide-react';
import { useMenuContext, MenuAccessItem } from '@/components/providers/MenuProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { getIcon } from '@/components/ui';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { menus, isLoading } = useMenuContext();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [expandedMenus, setExpandedMenus] = useState<Set<number | string>>(new Set());

  const toggleExpand = (menuId: number | string) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev);
      if (next.has(menuId)) {
        next.delete(menuId);
      } else {
        next.add(menuId);
      }
      return next;
    });
  };

  const isActive = (menu: MenuAccessItem): boolean => {
    if (menu.route_path === pathname) return true;
    if (menu.route_path && pathname.startsWith(menu.route_path + '/')) return true;
    return false;
  };

  const getMenuKey = (menu: MenuAccessItem, index: number): string => {
    if (menu.id) return `mobile-${menu.id}`;
    if (menu.menu_code) return `mobile-${menu.menu_code}`;
    return `mobile-idx-${index}`;
  };

  const getMenuId = (menu: MenuAccessItem): number | string => {
    return menu.id || menu.menu_code;
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const renderMenuItem = (menu: MenuAccessItem, index: number) => {
    const Icon = getIcon(menu.icon || 'file');
    const hasChildren = menu.children && menu.children.length > 0;
    const menuId = getMenuId(menu);
    const isExpanded = expandedMenus.has(menuId);
    const active = isActive(menu);
    const key = getMenuKey(menu, index);

    // Skip if menu is not viewable
    if (menu.can_view === false) return null;

    if (hasChildren) {
      return (
        <div key={key} className="mb-1">
          <button
            onClick={() => toggleExpand(menuId)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
              ${active
                ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            <Icon size={20} />
            <span className="flex-1 text-left font-medium">
              {menu.menu_name_th || menu.menu_name}
            </span>
            {isExpanded ? (
              <ChevronDown size={18} className="text-slate-400" />
            ) : (
              <ChevronRight size={18} className="text-slate-400" />
            )}
          </button>

          {/* Children */}
          {isExpanded && (
            <div className="mt-1 ml-6 pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-1">
              {menu.children!.map((child, childIndex) => {
                const ChildIcon = getIcon(child.icon || 'file');
                const childActive = isActive(child);
                const childKey = getMenuKey(child, childIndex);

                if (child.can_view === false) return null;

                return (
                  <Link
                    key={childKey}
                    href={child.route_path || '#'}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors
                      ${childActive
                        ? 'bg-primary-500 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    <ChildIcon size={18} />
                    <span className="font-medium">{child.menu_name_th || child.menu_name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // Menu item without children
    return (
      <Link
        key={key}
        href={menu.route_path || '#'}
        onClick={onClose}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl transition-colors mb-1
          ${active
            ? 'bg-primary-500 text-white'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }
        `}
      >
        <Icon size={20} />
        <span className="font-medium">{menu.menu_name_th || menu.menu_name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Backdrop - Shows below xl breakpoint */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden"
          onClick={onClose}
        />
      )}

      {/* Menu Panel - LEFT SIDE - Shows below xl breakpoint */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-50 
          transform transition-transform duration-300 ease-in-out xl:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white">Korat</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">HIS Platform</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-lg">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-slate-500">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-slate-500 mt-2">Loading menus...</span>
            </div>
          ) : menus.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">No menus available</p>
            </div>
          ) : (
            <div className="space-y-1">
              {menus.map((menu, index) => renderMenuItem(menu, index))}
            </div>
          )}
        </nav>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span className="text-sm font-medium">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-critical-600 dark:text-critical-400 hover:bg-critical-50 dark:hover:bg-critical-500/10 rounded-xl transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}