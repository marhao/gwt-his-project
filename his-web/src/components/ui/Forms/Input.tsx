"use client"

import { cn } from "@/lib/utils";

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => (
    <input
        {...props}
        className={cn(`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors
            ${error 
                ? 'border-red-300 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-slate-200 dark:border-slate-700'
            }
            ${props.disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `, className)}
    />
);

export default Input;