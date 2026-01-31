"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

const CollapsibleSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    badge?: string;
    badgeColor?: 'blue' | 'amber' | 'red' | 'emerald';
}> = ({ title, icon, children, defaultOpen = true, badge, badgeColor = 'blue' }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const badgeColors = {
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
        amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
        red: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
        emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="text-slate-500 dark:text-slate-400">{icon}</span>
                    <span className="font-medium text-slate-900 dark:text-white text-sm lg:text-base">{title}</span>
                    {badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColors[badgeColor]}`}>
                        {badge}
                        </span>
                    )}
                </div>
                {isOpen ? (
                    <ChevronUp size={18} className="text-slate-400" />
                ) : (
                    <ChevronDown size={18} className="text-slate-400" />
                )}
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

export default CollapsibleSection;