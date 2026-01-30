'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Copy, Check } from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import { Icons, getIcon } from '@/components/ui';

export default function IconLibraryPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group icons by category
  const iconCategories: Record<string, string[]> = {
    navigation: ['dashboard', 'home', 'menu', 'sidebar', 'horizontal', 'chevronDown', 'chevronRight', 'chevronLeft'],
    medical: ['stethoscope', 'pill', 'flask', 'microscope', 'syringe', 'bed', 'heart', 'emergency'],
    users: ['users', 'user', 'userCog', 'userPlus'],
    files: ['file', 'folder', 'clipboardList', 'fileBarChart'],
    actions: ['plus', 'search', 'edit', 'trash', 'eye', 'eyeOff', 'logout', 'lock'],
    ui: ['bell', 'settings', 'cog', 'sun', 'moon', 'loader', 'alertCircle'],
    business: ['calendar', 'creditCard', 'receipt', 'chart', 'box', 'building', 'shield'],
    misc: ['list', 'trendingUp', 'trendingDown', 'activity'],
  };

  const allIcons = Object.keys(Icons);

  const filteredIcons = useMemo(() => {
    let icons = allIcons;

    if (selectedCategory !== 'all') {
      icons = iconCategories[selectedCategory] || [];
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      icons = icons.filter((name) => name.toLowerCase().includes(term));
    }

    return icons;
  }, [searchTerm, selectedCategory]);

  const handleCopy = (iconName: string) => {
    navigator.clipboard.writeText(iconName);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Icon Library</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              ไลบรารีไอคอน • {filteredIcons.length} icons
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All
              </button>
              {Object.keys(iconCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          {filteredIcons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No icons found</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {filteredIcons.map((iconName) => {
                const Icon = getIcon(iconName);
                const isCopied = copiedIcon === iconName;

                return (
                  <button
                    key={iconName}
                    onClick={() => handleCopy(iconName)}
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title={`Click to copy: ${iconName}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isCopied
                          ? 'bg-success-100 dark:bg-success-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10'
                      }`}
                    >
                      {isCopied ? (
                        <Check size={24} className="text-success-500" />
                      ) : (
                        <Icon
                          size={24}
                          className="text-slate-600 dark:text-slate-400 group-hover:text-primary-500 transition-colors"
                        />
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-full">
                      {iconName}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Usage Guide */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">How to Use</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                1. Import the icon helper:
              </p>
              <code className="block p-3 bg-slate-900 dark:bg-slate-950 rounded-lg text-sm text-green-400 font-mono">
                {`import { getIcon } from '@/components/ui';`}
              </code>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                2. Use in your component:
              </p>
              <code className="block p-3 bg-slate-900 dark:bg-slate-950 rounded-lg text-sm text-green-400 font-mono whitespace-pre">
{`const Icon = getIcon('dashboard');
return <Icon size={20} className="text-primary-500" />;`}
              </code>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                3. Or import directly from lucide-react:
              </p>
              <code className="block p-3 bg-slate-900 dark:bg-slate-950 rounded-lg text-sm text-green-400 font-mono">
                {`import { LayoutDashboard } from 'lucide-react';`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}