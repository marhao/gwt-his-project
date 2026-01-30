// ============================================
// Modern Button Component (Fixed)

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// ============================================
const Button: React.FC<{
    children?: React.ReactNode; // เปลี่ยนจาก required เป็น optional
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
  }> = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    className = '',
    icon,
  }) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-medium rounded-xl
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98]
    `;
  
    const variants = {
      primary: `
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        text-white
        shadow-lg shadow-purple-500/30
        hover:shadow-xl hover:shadow-purple-500/40
        focus:ring-purple-500
      `,
      secondary: `
        bg-slate-100 dark:bg-slate-800
        text-slate-700 dark:text-slate-300
        hover:bg-slate-200 dark:hover:bg-slate-700
        focus:ring-slate-500
      `,
      ghost: `
        bg-transparent
        text-slate-600 dark:text-slate-400
        hover:bg-slate-100 dark:hover:bg-slate-800
        focus:ring-slate-500
      `,
      danger: `
        bg-gradient-to-r from-red-500 to-rose-500
        text-white
        shadow-lg shadow-red-500/30
        hover:shadow-xl hover:shadow-red-500/40
        focus:ring-red-500
      `,
    };
  
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    };
  
    return (
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          icon
        )}
        {children}
      </motion.button>
    );
  };