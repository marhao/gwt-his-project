"use client"

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

// Form Section Component
interface FormSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    collapsible?: boolean;
    defaultOpen?: boolean;
    badge?: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
    title,
    icon,
    children,
    collapsible = true,
    defaultOpen = true,
    badge,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useEffect(() => {
        if (defaultOpen) {
            setIsOpen(defaultOpen)
        }
    }, [defaultOpen]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <button
                type="button"
                onClick={() => collapsible && setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50
                    ${collapsible ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800' : 'cursor-default'}
                    transition-colors
                `}
            >
                <div className="flex items-center gap-3">
                    <span className="text-slate-500 dark:text-slate-400">{icon}</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{title}</span>
                    {badge}
                </div>
                {collapsible && (
                    isOpen ? (
                        <ChevronUp size={18} className="text-slate-400" />
                    ) : (
                        <ChevronDown size={18} className="text-slate-400" />
                    )
                )}
            </button>

            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

export default FormSection;