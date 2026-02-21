// Quick Action Button

const QuickAction: React.FC<{
    icon: React.ReactNode;
    label: string;
    color: 'blue' | 'purple' | 'emerald' | 'amber';
    onClick: () => void;
    disabled?: boolean;
}> = ({ icon, label, color, onClick, disabled = false }) => {
    const colorClasses = {
        blue: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/20 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-500/20 dark:hover:to-blue-600/30 shadow-blue-100',
        purple: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/20 border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-500/20 dark:hover:to-purple-600/30 shadow-purple-100',
        emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-600/20 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:from-emerald-100 hover:to-emerald-200 dark:hover:from-emerald-500/20 dark:hover:to-emerald-600/30 shadow-emerald-100',
        amber: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-500/10 dark:to-amber-600/20 border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-500/20 dark:hover:to-amber-600/30 shadow-amber-100',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border shadow-sm transition-all hover:scale-105 hover:shadow-md ${colorClasses[color]}`}
        >
            <div className="size-10 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
};

export default QuickAction;