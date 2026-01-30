'use client';

import { FC } from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md';
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  leftLabel,
  rightLabel,
  leftIcon,
  rightIcon,
  size = 'md',
}) => {
  const sizes = {
    sm: {
      switch: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'translate-x-4',
    },
    md: {
      switch: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
    },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {leftIcon && <span className="text-slate-500 dark:text-slate-400">{leftIcon}</span>}
      {leftLabel && (
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {leftLabel}
        </span>
      )}
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex shrink-0 cursor-pointer rounded-full
          border-2 border-transparent transition-colors duration-200 ease-in-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          ${s.switch}
          ${checked ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block transform rounded-full
            bg-white shadow-lg ring-0 transition duration-200 ease-in-out
            ${s.thumb}
            ${checked ? s.translate : 'translate-x-0'}
          `}
        />
      </button>

      {rightLabel && (
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {rightLabel}
        </span>
      )}
      {rightIcon && <span className="text-slate-500 dark:text-slate-400">{rightIcon}</span>}
    </div>
  );
};
