'use client';

import { FC, ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'critical' | 'default';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  pulse = false,
}) => {
  const variants = {
    primary: 'bg-primary-500 text-white',
    success: 'bg-success-500 text-white',
    warning: 'bg-warning-500 text-slate-900',
    critical: 'bg-critical-500 text-white',
    default: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-0.5 text-xs',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center font-semibold rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${pulse ? 'animate-pulse-subtle' : ''}
      `}
    >
      {children}
    </span>
  );
};
