// Form Field Component
const FormField: React.FC<{
    label: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}> = ({ label, required, children, className = '' }) => (
    <div className={`space-y-1.5 ${className}`}>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {children}
    </div>
);

export default FormField;