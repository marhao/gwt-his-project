// =============================================================================
// File: src/app/settings/menus/tree/page.tsx
// Description: Menu Tree Page - Visual tree view with drag & drop reordering
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, ChevronDown, ChevronRight, GripVertical, Edit, Eye, EyeOff, FolderOpen, Folder, RefreshCw, Expand, Shrink } from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import { menuApi } from '@/lib/api';
import { MenuItem } from '@/lib/types';
import { getIcon } from '@/components/ui';

interface TreeNode extends MenuItem {
  children: TreeNode[];
  level: number;
}

export default function MenuTreePage() {
  const router = useRouter();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
  const [draggedItem, setDraggedItem] = useState<TreeNode | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | 'inside' | null>(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await menuApi.getAll();
      if (response.success) {
        setMenus(response.data);
        const rootIds = response.data.filter((m) => !m.parent_id).map((m) => m.id);
        setExpandedNodes(new Set(rootIds));
      }
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    } finally {
      setLoading(false);
    }
  };

  const isMenuActive = (menu: MenuItem): boolean => {
    return Boolean(menu.is_active);
  };

  const buildTree = (parentId: number | null = null, level: number = 0): TreeNode[] => {
    return menus
      .filter((m) => m.parent_id === parentId)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((menu) => ({ ...menu, level, children: buildTree(menu.id, level + 1) }));
  };

  const tree = buildTree();

  const toggleExpand = (id: number) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedNodes(new Set(menus.map((m) => m.id)));
  const collapseAll = () => setExpandedNodes(new Set());

  const handleDragStart = (e: React.DragEvent, item: TreeNode) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(item.id));
  };

  const handleDragOver = (e: React.DragEvent, item: TreeNode) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === item.id) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    if (y < height * 0.25) setDropPosition('before');
    else if (y > height * 0.75) setDropPosition('after');
    else setDropPosition('inside');
    setDragOverItem(item.id);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
    setDropPosition(null);
  };

  const handleDrop = async (e: React.DragEvent, targetItem: TreeNode) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    const isChild = (parentId: number, childId: number): boolean => {
      const parent = menus.find((m) => m.id === parentId);
      if (!parent) return false;
      if (parent.parent_id === childId) return true;
      if (parent.parent_id) return isChild(parent.parent_id, childId);
      return false;
    };

    if (isChild(targetItem.id, draggedItem.id)) {
      setDraggedItem(null);
      setDragOverItem(null);
      setDropPosition(null);
      return;
    }

    try {
      if (dropPosition === 'inside') {
        await menuApi.move(draggedItem.id, targetItem.id);
      } else {
        const siblings = menus.filter((m) => m.parent_id === targetItem.parent_id).sort((a, b) => a.sort_order - b.sort_order);
        const targetIndex = siblings.findIndex((s) => s.id === targetItem.id);
        const newIndex = dropPosition === 'before' ? targetIndex : targetIndex + 1;
        if (draggedItem.parent_id !== targetItem.parent_id) await menuApi.move(draggedItem.id, targetItem.parent_id);
        const reorderedSiblings = siblings.filter((s) => s.id !== draggedItem.id);
        reorderedSiblings.splice(newIndex, 0, draggedItem);
        await menuApi.reorder(reorderedSiblings.map((item, index) => ({ id: item.id, sort_order: index + 1 })));
      }
      fetchMenus();
    } catch (error) {
      console.error('Failed to move menu:', error);
    }

    setDraggedItem(null);
    setDragOverItem(null);
    setDropPosition(null);
  };

  const handleToggleActive = async (menu: MenuItem) => {
    try {
      const active = isMenuActive(menu);
      await menuApi.update(menu.id, { is_active: !active });
      fetchMenus();
    } catch (error) {
      console.error('Failed to toggle menu status:', error);
    }
  };

  const renderTreeNode = (node: TreeNode): React.ReactNode => {
    const Icon = getIcon(node.icon || 'file');
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;
    const isDragging = draggedItem?.id === node.id;
    const isDragOver = dragOverItem === node.id;
    const menuActive = isMenuActive(node);

    return (
      <div key={node.id} className="select-none">
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, node)}
          onDragOver={(e) => handleDragOver(e, node)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, node)}
          className={`group flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-move
            ${isDragging ? 'opacity-50' : ''}
            ${isDragOver && dropPosition === 'before' ? 'border-t-2 border-primary-500' : ''}
            ${isDragOver && dropPosition === 'after' ? 'border-b-2 border-primary-500' : ''}
            ${isDragOver && dropPosition === 'inside' ? 'bg-primary-50 dark:bg-primary-500/10 ring-2 ring-primary-500' : ''}
            hover:bg-slate-50 dark:hover:bg-slate-800/50`}
          style={{ marginLeft: `${node.level * 24}px` }}
        >
          <GripVertical size={16} className="text-slate-300 dark:text-slate-600 cursor-grab" />
          {hasChildren ? (
            <button onClick={() => toggleExpand(node.id)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              {isExpanded ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
            </button>
          ) : <span className="w-6" />}
          {hasChildren ? (isExpanded ? <FolderOpen size={18} className="text-warning-500" /> : <Folder size={18} className="text-warning-500" />) : (
            <div className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
              <Icon size={14} className="text-primary-500" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className={`font-medium ${menuActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 line-through'}`}>{node.menu_name_th || node.menu_name}</span>
            <span className="ml-2 text-xs text-slate-400">{node.menu_code}</span>
          </div>
          {node.route_path && <code className="hidden sm:block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono text-slate-500">{node.route_path}</code>}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => handleToggleActive(node)} className={`p-1.5 rounded-lg transition-colors ${menuActive ? 'text-success-500 hover:bg-success-50 dark:hover:bg-success-500/10' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`} title={menuActive ? 'Hide' : 'Show'}>
              {menuActive ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <button onClick={() => router.push(`/settings/menus/${node.id}`)} className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors" title="Edit">
              <Edit size={14} />
            </button>
          </div>
        </div>
        {hasChildren && isExpanded && <div className="mt-1">{node.children.map((child) => renderTreeNode(child))}</div>}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/settings/menus')} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"><ArrowLeft size={20} /></button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Menu Tree</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">โครงสร้างเมนู • Drag & Drop to reorder</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={expandAll} className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" title="Expand All"><Expand size={18} /></button>
            <button onClick={collapseAll} className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" title="Collapse All"><Shrink size={18} /></button>
            <button onClick={fetchMenus} disabled={loading} className="p-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"><RefreshCw size={18} className={loading ? 'animate-spin' : ''} /></button>
            <button onClick={() => router.push('/settings/menus/add')} className="px-4 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"><span className="flex items-center gap-2"><Plus size={16} />Add Menu</span></button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3"><div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /><span className="text-slate-500">Loading menu tree...</span></div>
            </div>
          ) : tree.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Folder size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 mb-4">No menus found</p>
              <button onClick={() => router.push('/settings/menus/add')} className="px-4 py-2 text-sm font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors">Create your first menu</button>
            </div>
          ) : (
            <div className="space-y-1">{tree.map((node) => renderTreeNode(node))}</div>
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">Tips</h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>• Drag and drop items to reorder or change parent</li>
            <li>• Drop on a menu item to make it a child</li>
            <li>• Drop between items to change order</li>
            <li>• Click the eye icon to show/hide menu</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}