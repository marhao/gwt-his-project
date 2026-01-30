// =============================================================================
// File: src/components/layout/Sidebar.tsx
// Description: Modern Sidebar - Glassmorphism design with smooth animations
//              Hidden scrollbar, portal tooltips, flyout menu for collapsed mode
// =============================================================================

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import {
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Settings,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useMenuContext, MenuAccessItem } from '@/components/providers/MenuProvider';
import { getIcon } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useAuth } from '../providers/AuthProvider';

// ============================================
// Types
// ============================================

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

// ============================================
// Flyout Menu Component (Portal-based) - For Collapsed Mode
// ============================================

interface FlyoutMenuProps {
  menu: MenuAccessItem;
  show: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  pathname: string;
}

const FlyoutMenu: React.FC<FlyoutMenuProps> = ({ menu, show, position, onClose, pathname }) => {
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!show) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Delay to prevent immediate close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);

  if (!mounted || !show) return null;

  const menuName = menu.menu_name_th || menu.menu_name;
  const children = menu.children || [];

  const isChildActive = (child: MenuAccessItem): boolean => {
    if (child.route_path === pathname) return true;
    if (child.route_path && pathname.startsWith(child.route_path + '/')) return true;
    return false;
  };

  // Adjust position to stay within viewport
  const adjustedTop = Math.min(position.top, window.innerHeight - 350);

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-[9999] min-w-[220px] py-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in-0 zoom-in-95 slide-in-from-left-2 duration-150"
      style={{
        top: Math.max(8, adjustedTop),
        left: position.left,
      }}
    >
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
        <span className="text-sm font-semibold text-slate-800 dark:text-white">{menuName}</span>
      </div>

      {/* Menu Items */}
      <div className="py-1 max-h-[300px] overflow-y-auto">
        {children.map((child, idx) => {
          const ChildIcon = getIcon(child.icon || 'file');
          const childName = child.menu_name_th || child.menu_name;
          const isActive = isChildActive(child);

          return (
            <Link
              key={child.id || child.menu_code || idx}
              href={child.route_path || '#'}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 mx-1.5 rounded-lg text-sm transition-all',
                isActive
                  ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <ChildIcon size={16} className="shrink-0" />
              <span className="truncate flex-1">{childName}</span>
              {child.badge_count && child.badge_count > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                  {child.badge_count > 99 ? '99+' : child.badge_count}
                </span>
              )}
            </Link>
          );
        })}

        {children.length === 0 && (
          <div className="px-4 py-4 text-center text-sm text-slate-400">
            ไม่มีเมนูย่อย
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

// ============================================
// Tooltip Component (Portal-based)
// ============================================

interface TooltipProps {
  content: string;
  show: boolean;
  position: { top: number; left: number };
}

const Tooltip: React.FC<TooltipProps> = ({ content, show, position }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !show) return null;

  return createPortal(
    <div
      className="fixed z-[9999] px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-xl shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in-0 zoom-in-95 duration-150"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {content}
      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-700" />
    </div>,
    document.body
  );
};

// ============================================
// Menu Item Component
// ============================================

interface MenuItemProps {
  menu: MenuAccessItem;
  level: number;
  collapsed: boolean;
  isActive: boolean;
  isParentActive: boolean;
  isExpanded: boolean;
  hasChildren: boolean;
  onToggle: () => void;
  onFlyoutOpen: (menu: MenuAccessItem, position: { top: number; left: number }) => void;
  pathname: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  menu,
  level,
  collapsed,
  isActive,
  isParentActive,
  isExpanded,
  hasChildren,
  onToggle,
  onFlyoutOpen,
  pathname,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const itemRef = useRef<HTMLDivElement>(null);

  const Icon = getIcon(menu.icon || 'file');
  const menuName = menu.menu_name_th || menu.menu_name;
  const badge = menu.badge_count;

  const handleMouseEnter = () => {
    if (collapsed && itemRef.current && !hasChildren) {
      const rect = itemRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + rect.height / 2 - 16,
        left: rect.right + 12,
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (collapsed && hasChildren && itemRef.current) {
      e.preventDefault();
      e.stopPropagation();
      const rect = itemRef.current.getBoundingClientRect();
      onFlyoutOpen(menu, {
        top: rect.top,
        left: rect.right + 8,
      });
    } else if (hasChildren) {
      onToggle();
    }
  };

  // Base classes for all menu items
  const baseClasses = cn(
    'group relative flex items-center gap-3 rounded-xl transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50',
    collapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2.5'
  );

  // Style based on level and state
  const getItemClasses = () => {
    if (isActive) {
      if (level > 0) {
        return 'bg-primary-50/80 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium';
      }
      return 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25';
    }
    
    if (isParentActive) {
      return 'bg-primary-50/50 dark:bg-primary-500/5 text-primary-600 dark:text-primary-400';
    }
    
    return 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white';
  };

  const itemContent = (
    <>
      {/* Active indicator for submenu */}
      {isActive && level > 0 && !collapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-500 rounded-r-full" />
      )}

      {/* Icon */}
      <span className={cn(
        'flex items-center justify-center transition-all duration-200 shrink-0',
        isActive && level === 0 ? 'scale-110' : '',
        level > 0 && 'w-5'
      )}>
        {level > 0 && !collapsed ? (
          <span className={cn(
            'w-1.5 h-1.5 rounded-full transition-colors',
            isActive ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
          )} />
        ) : (
          <Icon size={20} />
        )}
      </span>

      {!collapsed && (
        <>
          <span className={cn(
            "flex-1 text-sm truncate transition-colors text-left",
            level > 0 ? 'font-normal' : 'font-medium'
          )}>
            {menuName}
          </span>

          {badge && badge > 0 && (
            <span className={cn(
              "px-1.5 py-0.5 text-xs font-bold rounded-full min-w-[20px] text-center shrink-0",
              isActive && level === 0
                ? "bg-white/20 text-white"
                : "bg-red-500 text-white"
            )}>
              {badge > 99 ? '99+' : badge}
            </span>
          )}

          {hasChildren && (
            <ChevronDown
              size={16}
              className={cn(
                'text-slate-400 transition-transform duration-300 shrink-0',
                isExpanded && 'rotate-180',
                isActive && level === 0 && 'text-white/70'
              )}
            />
          )}
        </>
      )}

      {/* Collapsed: badge indicator */}
      {collapsed && badge && badge > 0 && (
        <span className="absolute -top-1 -right-1 size-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
          {badge > 9 ? '9+' : badge}
        </span>
      )}

      {/* Collapsed: arrow indicator for menus with children */}
      {collapsed && hasChildren && (
        <span className="absolute -right-0.5 top-1/2 -translate-y-1/2">
          <ChevronRight size={12} className="text-slate-400" />
        </span>
      )}

      {/* Active glow effect */}
      {isActive && level === 0 && !collapsed && (
        <span className="absolute inset-0 rounded-xl bg-primary-500/20 blur-xl -z-10" />
      )}
    </>
  );

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasChildren ? (
        <button
          onClick={handleClick}
          className={cn(baseClasses, getItemClasses(), 'w-full')}
        >
          {itemContent}
        </button>
      ) : (
        <Link
          href={menu.route_path || '#'}
          className={cn(baseClasses, getItemClasses())}
        >
          {itemContent}
        </Link>
      )}

      {/* Tooltip only for items without children in collapsed mode */}
      <Tooltip
        content={menuName}
        show={showTooltip && collapsed && !hasChildren}
        position={tooltipPosition}
      />
    </div>
  );
};

// ============================================
// Main Sidebar Component
// ============================================

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { menus, isLoading, error } = useMenuContext();

  const [expandedMenus, setExpandedMenus] = useState<Set<number | string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Flyout state
  const [flyoutMenu, setFlyoutMenu] = useState<MenuAccessItem | null>(null);
  const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuth();

  // Mount check
  useEffect(() => {
    setMounted(true);
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  // Close flyout when sidebar expands
  useEffect(() => {
    if (!collapsed) {
      setFlyoutMenu(null);
    }
  }, [collapsed]);

  const handleLogout = () => {
    logout();
  };

  const handleFlyoutOpen = (menu: MenuAccessItem, position: { top: number; left: number }) => {
    // Toggle flyout - if same menu clicked, close it
    if (flyoutMenu?.id === menu.id || flyoutMenu?.menu_code === menu.menu_code) {
      setFlyoutMenu(null);
    } else {
      setFlyoutMenu(menu);
      setFlyoutPosition(position);
    }
  };

  const handleFlyoutClose = () => {
    setFlyoutMenu(null);
  };

  // Auto-expand active menu on mount
  useEffect(() => {
    const findActiveParent = (items: MenuAccessItem[], parentIds: (number | string)[] = []): (number | string)[] => {
      for (const item of items) {
        if (item.route_path === pathname) {
          return parentIds;
        }
        if (item.children?.length) {
          const found = findActiveParent(item.children, [...parentIds, item.id || item.menu_code]);
          if (found.length > parentIds.length) {
            return found;
          }
        }
      }
      return [];
    };

    const activeParents = findActiveParent(menus);
    if (activeParents.length > 0) {
      setExpandedMenus((prev) => new Set([...prev, ...activeParents]));
    }
  }, [menus, pathname]);

  // Toggle menu expand
  const toggleExpand = useCallback((menuId: number | string) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev);
      if (next.has(menuId)) {
        next.delete(menuId);
      } else {
        next.add(menuId);
      }
      return next;
    });
  }, []);

  // Check active state
  const isActive = useCallback((menu: MenuAccessItem): boolean => {
    if (menu.route_path === pathname) return true;
    if (menu.route_path && pathname.startsWith(menu.route_path + '/')) return true;
    return false;
  }, [pathname]);

  const isParentActive = useCallback((menu: MenuAccessItem): boolean => {
    if (isActive(menu)) return true;
    if (menu.children?.length) {
      return menu.children.some((child) => isParentActive(child));
    }
    return false;
  }, [isActive]);

  // Filter menus by search
  const filterMenus = useCallback((items: MenuAccessItem[], query: string): MenuAccessItem[] => {
    if (!query) return items;

    const lowerQuery = query.toLowerCase();

    return items.reduce<MenuAccessItem[]>((acc, item) => {
      const matchesName = (item.menu_name_th || item.menu_name || '').toLowerCase().includes(lowerQuery);
      const filteredChildren = item.children ? filterMenus(item.children, query) : [];

      if (matchesName || filteredChildren.length > 0) {
        acc.push({
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : item.children,
        });
      }

      return acc;
    }, []);
  }, []);

  const filteredMenus = filterMenus(menus, searchQuery);

  // Get menu key
  const getMenuKey = (menu: MenuAccessItem, index: number): string => {
    if (menu.id) return `menu-${menu.id}`;
    if (menu.menu_code) return `menu-${menu.menu_code}`;
    return `menu-idx-${index}`;
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  // Render menu item recursively
  const renderMenuItem = (menu: MenuAccessItem, index: number, level: number = 0) => {
    if (menu.can_view === false) return null;

    const hasChildren = menu.children && menu.children.length > 0;
    const isExpanded = expandedMenus.has(menu.id || menu.menu_code) || !!(searchQuery && hasChildren);
    const active = isActive(menu);
    const parentActive = isParentActive(menu);
    const key = getMenuKey(menu, index);

    return (
      <div key={key} className="mb-1">
        <MenuItem
          menu={menu}
          level={level}
          collapsed={collapsed}
          isActive={active}
          isParentActive={parentActive && !active}
          isExpanded={isExpanded}
          hasChildren={hasChildren || false}
          onToggle={() => toggleExpand(menu.id || menu.menu_code)}
          onFlyoutOpen={handleFlyoutOpen}
          pathname={pathname}
        />

        {/* Nested Children with smooth animation - Only when not collapsed */}
        {hasChildren && !collapsed && (
          <div
            className={cn(
              'grid transition-all duration-300 ease-in-out',
              isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <div className="mt-1 ml-3 pl-3 border-l-2 border-slate-200/50 dark:border-slate-700/50 space-y-0.5">
                {menu.children!.map((child, childIndex) => renderMenuItem(child, childIndex, level + 1))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen',
          'flex flex-col',
          'bg-white/80 dark:bg-slate-900/80',
          'backdrop-blur-xl',
          'border-r border-slate-200/50 dark:border-slate-800/50',
          'transition-all duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo Section */}
        <div className={cn(
          'h-16 flex items-center shrink-0 border-b border-slate-200/50 dark:border-slate-800/50',
          collapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all group-hover:scale-105">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  GWT-MED
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Sparkles size={10} className="text-amber-500" />
                  Smart Hospital
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Search Section */}
        {!collapsed && (
          <div className="p-3 shrink-0 border-b border-slate-200/50 dark:border-slate-800/50">
            <div className={cn(
              "relative transition-all duration-300",
              searchFocused && "scale-[1.02]"
            )}>
              <Search size={16} className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                searchFocused ? "text-primary-500" : "text-slate-400"
              )} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="ค้นหาเมนู..."
                className={cn(
                  "w-full pl-9 pr-8 py-2.5 rounded-xl text-sm transition-all duration-300",
                  "bg-slate-100/80 dark:bg-slate-800/50",
                  "border border-transparent",
                  "placeholder:text-slate-400",
                  "focus:outline-none focus:bg-white dark:focus:bg-slate-800",
                  "focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20"
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav
          className={cn(
            'flex-1 overflow-y-auto p-3 space-y-1',
            '[&::-webkit-scrollbar]:hidden',
            '[-ms-overflow-style:none]',
            '[scrollbar-width:none]'
          )}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="size-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              {!collapsed && (
                <span className="text-sm text-slate-500">กำลังโหลด...</span>
              )}
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50/80 dark:bg-red-500/10 rounded-xl border border-red-200/50 dark:border-red-500/20">
              {!collapsed && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>
          ) : filteredMenus.length === 0 ? (
            <div className="text-center py-8">
              {!collapsed && (
                <div className="space-y-2">
                  <div className="size-12 mx-auto bg-slate-100/80 dark:bg-slate-800/50 rounded-xl flex items-center justify-center">
                    <Search size={24} className="text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500">
                    {searchQuery ? 'ไม่พบเมนูที่ค้นหา' : 'ไม่มีเมนูในระบบ'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            filteredMenus.map((menu, index) => renderMenuItem(menu, index))
          )}
        </nav>

        {/* User Section */}
        {!collapsed && (
          <div className="p-3 shrink-0 border-t border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/30 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
              <div className="relative">
                <div className="size-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {user?.name || 'ผู้ดูแลระบบ'}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.username || 'admin@hospital.go.th'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className={cn(
          'shrink-0 border-t border-slate-200/50 dark:border-slate-800/50',
          collapsed ? 'p-2' : 'p-3'
        )}>
          <div className={cn(
            'flex items-center',
            collapsed ? 'flex-col gap-2' : 'justify-between'
          )}>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={cn(
                "p-2.5 rounded-xl transition-all active:scale-95",
                isDarkMode
                  ? "text-amber-500 hover:bg-amber-500/10"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 dark:hover:bg-slate-800/50"
              )}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Settings */}
            {!collapsed && (
              <Link
                href="/settings"
                className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 rounded-xl transition-all active:scale-95"
                title="ตั้งค่า"
              >
                <Settings size={18} />
              </Link>
            )}

            {/* Collapse Toggle */}
            <button
              onClick={onToggle}
              className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 rounded-xl transition-all active:scale-95"
              title={collapsed ? 'ขยาย Sidebar' : 'ย่อ Sidebar'}
            >
              {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </button>

            {/* Logout */}
            {!collapsed && (
              <button
                onClick={handleLogout}
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50/80 dark:hover:bg-red-500/10 rounded-xl transition-all active:scale-95"
                title="ออกจากระบบ"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Flyout Menu Portal - For Collapsed Mode */}
      {flyoutMenu && (
        <FlyoutMenu
          menu={flyoutMenu}
          show={true}
          position={flyoutPosition}
          onClose={handleFlyoutClose}
          pathname={pathname}
        />
      )}
    </>
  );
}

export default Sidebar;