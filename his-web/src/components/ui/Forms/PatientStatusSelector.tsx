// Patient Status Selector
const PatientStatusSelector: React.FC<{
    options: any[];
    value: string;
    onChange: (value: string) => void;
}> = ({ options, value, onChange }) => {
    return (
        <div className="flex gap-2">
        {options.map((opt) => (
            <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={`
                    flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                    flex flex-col items-center gap-1
                    ${value === opt.value
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }
                `}
            >
            <span className="text-lg">{opt.icon}</span>
            <span className="text-xs">{opt.label}</span>
            </button>
        ))}
        </div>
    );
};

export default PatientStatusSelector;