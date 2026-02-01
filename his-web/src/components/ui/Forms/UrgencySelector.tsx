// Urgency Selector Component
const UrgencySelector: React.FC<{
    value: string;
    onChange: (value: string) => void;
}> = ({ value, onChange }) => {
    const options = [
        { value: 'normal', label: 'ปกติ', color: 'emerald', icon: '🟢' },
        { value: 'urgent', label: 'เร่งด่วน', color: 'amber', icon: '🟡' },
        { value: 'emergency', label: 'ฉุกเฉิน', color: 'red', icon: '🔴' },
    ];

    return (
        <div className="flex gap-2">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`
                        flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                        flex items-center justify-center gap-2
                        ${value === opt.value
                        ? opt.color === 'emerald'
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                            : opt.color === 'amber'
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                            : 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }
                    `}
                >
                    <span>{opt.icon}</span>
                    <span className="hidden sm:inline">{opt.label}</span>
                </button>
            ))}
        </div>
    );
};

export default UrgencySelector;