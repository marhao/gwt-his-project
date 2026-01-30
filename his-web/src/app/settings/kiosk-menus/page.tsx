// =============================================================================
// File: src/app/settings/kiosk-menus/page.tsx
// Description: Kiosk Menu Management - Card-based menu display with CRUD
// =============================================================================

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  MoreVertical,
  Grid3X3,
  List,
  RefreshCw,
  Filter,
  Monitor,
  FolderOpen,
  Stethoscope,
  FileText,
  ChevronRight,
  Eye,
  EyeOff,
  GripVertical,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';

// Types
type OpdKiosMenuType = 'G' | 'S' | 'V' | 'M';

interface OpdKiosDepMenu {
  opd_kios_dep_menu_id: number;
  parent_id?: number | null;
  menu_type?: OpdKiosMenuType;
  depcode: string | null;
  description: string | null;
  ovstist: string | null;
  spclty: string | null;
  button_caption: string | null;
  symptom: string | null;
  print_form_name: string | null;
  order_no: number | null;
  button_width: number | null;
  button_height: number | null;
  font_name: string | null;
  font_size: number | null;
  font_color: number | null;
  hospital_department_id: number | null;
  computer_name: string | null;
  is_active?: boolean;
}

// Menu type config
const menuTypeConfig: Record<OpdKiosMenuType, { label: string; labelTh: string; icon: React.ElementType; color: string; bgColor: string }> = {
  G: { label: 'Group', labelTh: 'กลุ่ม', icon: FolderOpen, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-500/10' },
  S: { label: 'Service', labelTh: 'บริการ', icon: Stethoscope, color: 'text-primary-600 dark:text-primary-400', bgColor: 'bg-primary-50 dark:bg-primary-500/10' },
  V: { label: 'Visit', labelTh: 'เยี่ยมชม', icon: Monitor, color: 'text-success-600 dark:text-success-400', bgColor: 'bg-success-50 dark:bg-success-500/10' },
  M: { label: 'Module', labelTh: 'โมดูล', icon: FileText, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-500/10' },
};

// Mock data
const mockMenus: OpdKiosDepMenu[] = [
  { opd_kios_dep_menu_id: 1, parent_id: null, menu_type: 'G', depcode: null, description: 'ห้องตรวจทั่วไป', button_caption: 'ห้องตรวจทั่วไป', ovstist: null, spclty: null, symptom: null, print_form_name: null, order_no: 1, button_width: 200, button_height: 120, font_name: 'Sarabun', font_size: 18, font_color: 0, hospital_department_id: null, computer_name: null, is_active: true },
  { opd_kios_dep_menu_id: 2, parent_id: 1, menu_type: 'S', depcode: '001', description: 'ตรวจโรคทั่วไป', button_caption: 'ตรวจโรคทั่วไป', ovstist: 'W', spclty: '01', symptom: 'ตรวจโรคทั่วไป', print_form_name: 'OPD_TICKET', order_no: 1, button_width: 180, button_height: 100, font_name: 'Sarabun', font_size: 16, font_color: 0, hospital_department_id: 1, computer_name: null, is_active: true },
  { opd_kios_dep_menu_id: 3, parent_id: 1, menu_type: 'S', depcode: '002', description: 'ตรวจโรคเรื้อรัง', button_caption: 'ตรวจโรคเรื้อรัง', ovstist: 'W', spclty: '02', symptom: 'NCD Clinic', print_form_name: 'OPD_TICKET', order_no: 2, button_width: 180, button_height: 100, font_name: 'Sarabun', font_size: 16, font_color: 0, hospital_department_id: 2, computer_name: null, is_active: true },
  { opd_kios_dep_menu_id: 4, parent_id: null, menu_type: 'G', depcode: null, description: 'คลินิกพิเศษ', button_caption: 'คลินิกพิเศษ', ovstist: null, spclty: null, symptom: null, print_form_name: null, order_no: 2, button_width: 200, button_height: 120, font_name: 'Sarabun', font_size: 18, font_color: 0, hospital_department_id: null, computer_name: null, is_active: true },
  { opd_kios_dep_menu_id: 5, parent_id: 4, menu_type: 'S', depcode: '010', description: 'คลินิกหัวใจ', button_caption: 'คลินิกหัวใจ', ovstist: 'W', spclty: '10', symptom: 'หัวใจ', print_form_name: 'OPD_TICKET', order_no: 1, button_width: 180, button_height: 100, font_name: 'Sarabun', font_size: 16, font_color: 0, hospital_department_id: 10, computer_name: null, is_active: true },
  { opd_kios_dep_menu_id: 6, parent_id: 4, menu_type: 'S', depcode: '011', description: 'คลินิกกระดูก', button_caption: 'คลินิกกระดูก', ovstist: 'W', spclty: '11', symptom: 'กระดูกและข้อ', print_form_name: 'OPD_TICKET', order_no: 2, button_width: 180, button_height: 100, font_name: 'Sarabun', font_size: 16, font_color: 0, hospital_department_id: 11, computer_name: null, is_active: false },
  { opd_kios_dep_menu_id: 7, parent_id: null, menu_type: 'G', depcode: null, description: 'ทันตกรรม', button_caption: 'ทันตกรรม', ovstist: null, spclty: null, symptom: null, print_form_name: null, order_no: 3, button_width: 200, button_height: 120, font_name: 'Sarabun', font_size: 18, font_color: 0, hospital_department_id: null, computer_name: null, is_active: true },
  { opd_kios_dep_menu_id: 8, parent_id: 7, menu_type: 'S', depcode: '020', description: 'ถอนฟัน', button_caption: 'ถอนฟัน', ovstist: 'W', spclty: '20', symptom: 'ถอนฟัน', print_form_name: 'DENTAL_TICKET', order_no: 1, button_width: 180, button_height: 100, font_name: 'Sarabun', font_size: 16, font_color: 0, hospital_department_id: 20, computer_name: null, is_active: true },
];

export default function KioskMenusPage() {
  const router = useRouter();
  const [menus, setMenus] = useState<OpdKiosDepMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<OpdKiosMenuType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; menu: OpdKiosDepMenu | null }>({ open: false, menu: null });
  const [contextMenu, setContextMenu] = useState<{ open: boolean; menu: OpdKiosDepMenu | null; x: number; y: number }>({ open: false, menu: null, x: 0, y: 0 });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setMenus(mockMenus);
    // Auto expand all groups
    const groupIds = mockMenus.filter((m) => m.menu_type === 'G').map((m) => m.opd_kios_dep_menu_id);
    setExpandedGroups(new Set(groupIds));
    setLoading(false);
  };

  // Build tree structure
  const menuTree = useMemo(() => {
    const buildTree = (parentId: number | null = null): (OpdKiosDepMenu & { children: OpdKiosDepMenu[] })[] => {
      return menus
        .filter((m) => m.parent_id === parentId)
        .sort((a, b) => (a.order_no || 0) - (b.order_no || 0))
        .map((menu) => ({
          ...menu,
          children: buildTree(menu.opd_kios_dep_menu_id),
        }));
    };
    return buildTree(null);
  }, [menus]);

  // Filter menus
  const filteredMenus = useMemo(() => {
    let filtered = menus;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.button_caption?.toLowerCase().includes(term) ||
          m.description?.toLowerCase().includes(term) ||
          m.depcode?.toLowerCase().includes(term) ||
          m.symptom?.toLowerCase().includes(term)
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter((m) => m.menu_type === filterType);
    }

    return filtered;
  }, [menus, searchTerm, filterType]);

  const toggleGroup = (id: number) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContextMenu = (e: React.MouseEvent, menu: OpdKiosDepMenu) => {
    e.preventDefault();
    setContextMenu({ open: true, menu, x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu({ open: false, menu: null, x: 0, y: 0 });
  };

  const handleDelete = async (menu: OpdKiosDepMenu) => {
    // Simulate delete
    setMenus((prev) => prev.filter((m) => m.opd_kios_dep_menu_id !== menu.opd_kios_dep_menu_id));
    setDeleteModal({ open: false, menu: null });
  };

  const handleToggleActive = (menu: OpdKiosDepMenu) => {
    setMenus((prev) =>
      prev.map((m) =>
        m.opd_kios_dep_menu_id === menu.opd_kios_dep_menu_id ? { ...m, is_active: !m.is_active } : m
      )
    );
  };

  const getChildCount = (parentId: number) => {
    return menus.filter((m) => m.parent_id === parentId).length;
  };

  // Render menu card
  const renderMenuCard = (menu: OpdKiosDepMenu & { children?: OpdKiosDepMenu[] }, isChild: boolean = false) => {
    const config = menuTypeConfig[menu.menu_type || 'S'];
    const Icon = config.icon;
    const isGroup = menu.menu_type === 'G';
    const isExpanded = expandedGroups.has(menu.opd_kios_dep_menu_id);
    const childCount = getChildCount(menu.opd_kios_dep_menu_id);
    const isActive = menu.is_active !== false;

    return (
      <div key={menu.opd_kios_dep_menu_id} className={isChild ? '' : 'mb-4'}>
        <div
          onContextMenu={(e) => handleContextMenu(e, menu)}
          className={`
            group relative bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 cursor-pointer
            ${isActive 
              ? 'border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10' 
              : 'border-slate-200 dark:border-slate-700 opacity-60'
            }
            ${isChild ? 'ml-6' : ''}
          `}
        >
          {/* Drag Handle */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
            <GripVertical size={16} className="text-slate-300 dark:text-slate-600" />
          </div>

          <div className="p-4 pl-8">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon size={28} className={config.color} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className={`font-semibold text-lg ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 line-through'}`}>
                      {menu.button_caption || menu.description}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {menu.description !== menu.button_caption && menu.description}
                    </p>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-2">
                    {!isActive && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full">
                        Hidden
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setContextMenu({ open: true, menu, x: e.clientX, y: e.clientY });
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${config.bgColor} ${config.color}`}>
                    <Icon size={12} />
                    {config.labelTh}
                  </span>

                  {menu.depcode && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-slate-400 dark:text-slate-500">Dep:</span> {menu.depcode}
                    </span>
                  )}

                  {menu.spclty && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-slate-400 dark:text-slate-500">Spclty:</span> {menu.spclty}
                    </span>
                  )}

                  {menu.ovstist && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-slate-400 dark:text-slate-500">Status:</span> {menu.ovstist}
                    </span>
                  )}

                  {isGroup && childCount > 0 && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {childCount} items
                    </span>
                  )}

                  {menu.order_no && (
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      #{menu.order_no}
                    </span>
                  )}
                </div>

                {/* Button Preview */}
                {menu.button_width && menu.button_height && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-slate-400">Preview:</span>
                    <div
                      className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center"
                      style={{
                        width: Math.min(menu.button_width * 0.5, 100),
                        height: Math.min(menu.button_height * 0.5, 60),
                        fontSize: Math.max((menu.font_size || 16) * 0.5, 8),
                      }}
                    >
                      <span className="text-slate-500 dark:text-slate-400 truncate px-1">
                        {menu.button_caption?.substring(0, 10)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Expand Button for Groups */}
              {isGroup && childCount > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGroup(menu.opd_kios_dep_menu_id);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ChevronRight
                    size={20}
                    className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Children */}
        {isGroup && isExpanded && menu.children && menu.children.length > 0 && (
          <div className="mt-2 space-y-2 border-l-2 border-slate-200 dark:border-slate-700">
            {menu.children.map((child) => renderMenuCard(child as OpdKiosDepMenu & { children?: OpdKiosDepMenu[] }, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6" onClick={closeContextMenu}>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Kiosk Menu Management
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              จัดการเมนูตู้ Kiosk • {menus.length} รายการ
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/settings/kiosk-menus/preview')}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Monitor size={16} />
                Preview
              </span>
            </button>
            <button
              onClick={() => router.push('/settings/kiosk-menus/add')}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"
            >
              <span className="flex items-center gap-2">
                <Plus size={16} />
                Add Menu
              </span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search menus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>

            {/* Filter Type */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    filterType === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  All
                </button>
                {Object.entries(menuTypeConfig).map(([type, config]) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as OpdKiosMenuType)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                      filterType === type
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {config.labelTh}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchMenus}
              disabled={loading}
              className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Menu Cards */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-slate-500">Loading menus...</span>
              </div>
            </div>
          ) : filteredMenus.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
              <Monitor size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 mb-4">No menus found</p>
              <button
                onClick={() => router.push('/settings/kiosk-menus/add')}
                className="px-4 py-2 text-sm font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors"
              >
                Create your first menu
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {menuTree.map((menu) => renderMenuCard(menu))}
            </div>
          ) : (
            <div className="space-y-2">
              {menuTree.map((menu) => renderMenuCard(menu))}
            </div>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu.open && contextMenu.menu && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeContextMenu} />
          <div
            className="fixed z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2 min-w-48"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={() => {
                router.push(`/settings/kiosk-menus/${contextMenu.menu?.opd_kios_dep_menu_id}`);
                closeContextMenu();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => {
                // Duplicate logic
                closeContextMenu();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Copy size={16} />
              Duplicate
            </button>
            <button
              onClick={() => {
                handleToggleActive(contextMenu.menu!);
                closeContextMenu();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {contextMenu.menu.is_active !== false ? <EyeOff size={16} /> : <Eye size={16} />}
              {contextMenu.menu.is_active !== false ? 'Hide' : 'Show'}
            </button>
            <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
            <button
              onClick={() => {
                setDeleteModal({ open: true, menu: contextMenu.menu });
                closeContextMenu();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-critical-600 dark:text-critical-400 hover:bg-critical-50 dark:hover:bg-critical-500/10 transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </>
      )}

      {/* Delete Modal */}
      {deleteModal.open && deleteModal.menu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteModal({ open: false, menu: null })} />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Delete Menu</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete <strong>{deleteModal.menu.button_caption}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteModal({ open: false, menu: null })} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteModal.menu!)} className="px-4 py-2 text-sm font-medium text-white bg-critical-500 hover:bg-critical-600 rounded-xl transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}