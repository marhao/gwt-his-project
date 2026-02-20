'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers';
import { ToggleSwitch } from '@/components/ui';

const HeaderLogin = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex justify-end p-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <Sun className="w-4 h-4 text-warning-500" />
                <ToggleSwitch
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    size="sm"
                />
                <Moon className="w-4 h-4 text-slate-400" />
            </div>
        </div>
    )
}

export default HeaderLogin