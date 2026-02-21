// Info Item

import { useState } from "react";
import { ExternalLink, Copy, Check } from 'lucide-react';

const InfoItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | null | undefined;
    copyable?: boolean;
    link?: string;
}> = ({ icon, label, value, copyable, link }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
            if (value) {
                await navigator.clipboard.writeText(value);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
    };

    const content = (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
            <div className="size-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0 shadow-sm">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                <p className={`text-sm font-medium ${value ? 'text-slate-900 dark:text-white' : 'text-slate-400'} truncate`}>
                    {value || '-'}
                </p>
            </div>
            {copyable && value && (
                <button
                    onClick={handleCopy}
                    className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-slate-400" />}
                </button>
            )}
            {link && (
                <span className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                    <ExternalLink size={14} className="text-slate-400" />
                </span>
            )}
        </div>
    );

    if (link && !copyable) {
        return <a href={link}>{content}</a>;
    }

    return content;
};

export default InfoItem;