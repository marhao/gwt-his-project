// =============================================================================
// File: src/components/layout/HorizontalNavModern.tsx
// Description: Modern Horizontal Navigation for HIS - Clean medical aesthetic
// Updated: Sky blue hover effects for better visual appeal
// =============================================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Circle } from 'lucide-react';
import { useMenuContext, MenuAccessItem } from '@/components/providers/MenuProvider';
import { getIcon } from '@/components/ui';

export function HorizontalNav() {
  const pathname = usePathname();
  const { menus, isLoading } = useMenuContext();
  const [openDropdown, setOpenDropdown] = useState<number | string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (menu: MenuAccessItem): boolean => {
    if (menu.route_path === pathname) return true;
    if (menu.route_path && pathname.startsWith(menu.route_path + '/')) return true;
    return false;
  };

  const isParentActive = (menu: MenuAccessItem): boolean => {
    if (isActive(menu)) return true;
    if (menu.children?.length) {
      return menu.children.some((child) => isParentActive(child));
    }
    return false;
  };

  const getMenuKey = (menu: MenuAccessItem, index: number): string => {
    return menu.id ? `nav-${menu.id}` : menu.menu_code ? `nav-${menu.menu_code}` : `nav-idx-${index}`;
  };

  const getMenuId = (menu: MenuAccessItem): number | string => menu.id || menu.menu_code;

  const toggleDropdown = (menuId: number | string) => {
    setOpenDropdown((prev) => (prev === menuId ? null : menuId));
  };

  if (isLoading) {
    return (
      <nav className="hidden lg:flex items-center gap-2">
        {/* Skeleton loading with sky blue tint */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-9 w-24 rounded-lg bg-sky-100 dark:bg-sky-900/30 animate-pulse"
          />
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
      {menus.map((menu, index) => {
        const Icon = getIcon(menu.icon || 'file');
        const hasChildren = menu.children && menu.children.length > 0;
        const active = isActive(menu);
        const parentActive = isParentActive(menu);
        const key = getMenuKey(menu, index);
        const menuId = getMenuId(menu);
        const isHovered = hoveredItem === key;
        const isOpen = openDropdown === menuId;

        if (menu.can_view === false) return null;

        // Base styles for nav items
        const baseStyles = `
          relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium
          transition-all duration-200 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50
        `;

        // Active state - sky blue gradient
        const activeStyles = `
          bg-gradient-to-r from-sky-500/15 to-sky-400/10
          dark:from-sky-500/25 dark:to-sky-400/15
          text-sky-700 dark:text-sky-300
          shadow-sm shadow-sky-500/10
        `;

        // Hover state - sky blue colors
        const inactiveStyles = `
          text-slate-600 dark:text-slate-400
          hover:bg-sky-50 dark:hover:bg-sky-900/40
          hover:text-sky-700 dark:hover:text-sky-300
          hover:shadow-sm hover:shadow-sky-500/10
        `;

        if (hasChildren) {
          return (
            <div key={key} className="relative">
              <button
                onClick={() => toggleDropdown(menuId)}
                onMouseEnter={() => setHoveredItem(key)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  ${baseStyles}
                  ${parentActive ? activeStyles : inactiveStyles}
                  group
                `}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {/* Active indicator line - sky blue gradient */}
                {parentActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-sky-500 to-sky-400 rounded-full" />
                )}

                {/* Icon with hover animation */}
                <span className={`
                  transition-transform duration-200
                  ${isHovered ? 'scale-110' : 'scale-100'}
                `}>
                  <Icon size={18} strokeWidth={parentActive ? 2.5 : 2} />
                </span>

                <span className="whitespace-nowrap">
                  {menu.menu_name_th || menu.menu_name}
                </span>

                {/* Chevron with rotation */}
                <ChevronDown
                  size={14}
                  className={`
                    transition-transform duration-200 ease-out
                    ${isOpen ? 'rotate-180' : ''}
                    opacity-60
                  `}
                />

                {/* Notification badge */}
                {menu.badge_count && menu.badge_count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                    {menu.badge_count > 99 ? '99+' : menu.badge_count}
                  </span>
                )}
              </button>

              {/* Dropdown Menu with Animation */}
              <div
                className={`
                  absolute top-full left-0 mt-2 min-w-56 z-50
                  transition-all duration-200 ease-out origin-top-left
                  ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }
                `}
              >
                <div className="
                  bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                  border border-sky-100 dark:border-sky-800/50
                  rounded-2xl shadow-xl shadow-sky-900/10 dark:shadow-black/30
                  py-2 overflow-hidden
                ">
                  {/* Dropdown header */}
                  <div className="px-4 py-2 border-b border-sky-50 dark:border-sky-900/50">
                    <p className="text-xs font-medium text-sky-500 dark:text-sky-400 uppercase tracking-wider">
                      {menu.menu_name_th || menu.menu_name}
                    </p>
                  </div>

                  {/* Dropdown items */}
                  <div className="py-1">
                    {menu.children!.map((child, childIndex) => {
                      const ChildIcon = getIcon(child.icon || 'file');
                      const childActive = isActive(child);
                      const childKey = getMenuKey(child, childIndex);

                      if (child.can_view === false) return null;

                      return (
                        <Link
                          key={childKey}
                          href={child.route_path || '#'}
                          onClick={() => setOpenDropdown(null)}
                          className={`
                            flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl
                            text-sm transition-all duration-150 group/item
                            ${childActive
                              ? 'bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-sky-50/80 dark:hover:bg-sky-900/50 hover:text-sky-700 dark:hover:text-sky-300'
                            }
                          `}
                        >
                          {/* Icon container with sky blue */}
                          <span className={`
                            flex items-center justify-center w-8 h-8 rounded-lg
                            transition-all duration-150
                            ${childActive
                              ? 'bg-sky-100 dark:bg-sky-500/25 text-sky-600 dark:text-sky-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 group-hover/item:bg-sky-100 dark:group-hover/item:bg-sky-900/60 group-hover/item:text-sky-600 dark:group-hover/item:text-sky-400'
                            }
                          `}>
                            <ChildIcon size={16} />
                          </span>

                          <span className="flex-1 font-medium">
                            {child.menu_name_th || child.menu_name}
                          </span>

                          {/* Status indicator */}
                          {child.is_new && (
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-500/20 rounded-full">
                              New
                            </span>
                          )}

                          {/* Arrow indicator on hover */}
                          <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-sky-500">
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // Menu item without children
        return (
          <Link
            key={key}
            href={menu.route_path || '#'}
            onMouseEnter={() => setHoveredItem(key)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`
              ${baseStyles}
              ${active ? activeStyles : inactiveStyles}
              group
            `}
          >
            {/* Active indicator line - sky blue */}
            {active && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-sky-500 to-sky-400 rounded-full" />
            )}

            {/* Icon with hover animation */}
            <span className={`
              transition-transform duration-200
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}>
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
            </span>

            <span className="whitespace-nowrap">
              {menu.menu_name_th || menu.menu_name}
            </span>

            {/* Status dot for important modules */}
            {menu.has_notification && (
              <Circle
                size={8}
                className="fill-sky-500 text-sky-500 animate-pulse"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}