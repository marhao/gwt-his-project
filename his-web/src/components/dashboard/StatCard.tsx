'use client';

import { FC, useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, RefreshCw } from 'lucide-react';
import { getIcon } from '@/components/ui';
import { StatCard as StatCardType } from '@/types';

// Extended stat type for HIS
interface HISStatCard extends StatCardType {
  // Real-time indicator
  isLive?: boolean;
  lastUpdated?: Date | string;
  
  // Trend data for sparkline
  sparklineData?: number[];
  
  // Additional HIS info
  subtitle?: string;
  target?: number;
  unit?: string;
  
  // Visual options
  variant?: 'default' | 'gradient' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  
  // Actions
  onClick?: () => void;
  onRefresh?: () => void;
}

interface StatCardProps {
  stat: HISStatCard;
  delay?: number;
}

// Mini Sparkline Component
const Sparkline: FC<{ data: number[]; color: string; height?: number }> = ({ 
  data, 
  color,
  height = 32 
}) => {
  if (!data || data.length < 2) return null;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');
  
  return (
    <svg 
      viewBox={`0 0 100 ${height}`} 
      className="w-full h-8 opacity-60"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`sparkline-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <polygon
        points={`0,${height} ${points} 100,${height}`}
        fill={`url(#sparkline-${color})`}
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

// Live Indicator
const LiveIndicator: FC<{ isLive?: boolean }> = ({ isLive }) => {
  if (!isLive) return null;
  
  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
        Live
      </span>
    </div>
  );
};

// Progress Ring for target
const ProgressRing: FC<{ progress: number; color: string; size?: number }> = ({ 
  progress, 
  color,
  size = 44 
}) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export const StatCardModern: FC<StatCardProps> = ({ stat, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const Icon = getIcon(stat.icon);
  
  // Extended color palette for HIS
  const colorClasses = {
    primary: {
      bg: 'bg-blue-100 dark:bg-blue-500/20',
      bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-500/30',
      hex: '#3b82f6',
    },
    success: {
      bg: 'bg-emerald-100 dark:bg-emerald-500/20',
      bgGradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      hex: '#10b981',
    },
    warning: {
      bg: 'bg-amber-100 dark:bg-amber-500/20',
      bgGradient: 'bg-gradient-to-br from-amber-500 to-amber-600',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-500/30',
      hex: '#f59e0b',
    },
    critical: {
      bg: 'bg-red-100 dark:bg-red-500/20',
      bgGradient: 'bg-gradient-to-br from-red-500 to-red-600',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-500/30',
      hex: '#ef4444',
    },
    // Additional HIS colors
    info: {
      bg: 'bg-cyan-100 dark:bg-cyan-500/20',
      bgGradient: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-200 dark:border-cyan-500/30',
      hex: '#06b6d4',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-500/20',
      bgGradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-500/30',
      hex: '#8b5cf6',
    },
    neutral: {
      bg: 'bg-slate-100 dark:bg-slate-500/20',
      bgGradient: 'bg-gradient-to-br from-slate-500 to-slate-600',
      text: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-500/30',
      hex: '#64748b',
    },
  };

  const colors = colorClasses[stat.color as keyof typeof colorClasses] || colorClasses.primary;
  const variant = stat.variant || 'default';
  const size = stat.size || 'md';
  
  // Change calculation
  const change = stat.change;
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change !== undefined && change === 0;
  
  // Target progress
  const targetProgress = stat.target && typeof stat.value === 'number' 
    ? (stat.value / stat.target) * 100 
    : undefined;

  // Handle refresh
  const handleRefresh = async () => {
    if (stat.onRefresh) {
      setIsRefreshing(true);
      await stat.onRefresh();
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4 lg:p-5',
    lg: 'p-5 lg:p-6',
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return `${colors.bgGradient} text-white border-0 shadow-lg shadow-${stat.color}-500/25`;
      case 'outline':
        return `bg-transparent border-2 ${colors.border}`;
      case 'glass':
        return 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50';
      default:
        return 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800';
    }
  };

  const isGradient = variant === 'gradient';

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        transition-all duration-300 ease-out
        ${sizeClasses[size]}
        ${getVariantClasses()}
        ${stat.onClick ? 'cursor-pointer' : ''}
        ${isHovered ? 'scale-[1.02] shadow-xl' : 'shadow-sm'}
        animate-slide-up
      `}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={stat.onClick}
    >
      {/* Background decoration */}
      {!isGradient && (
        <div 
          className={`
            absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.07]
            transition-transform duration-500
            ${colors.bgGradient}
            ${isHovered ? 'scale-150' : 'scale-100'}
          `} 
        />
      )}

      {/* Header: Live indicator & Refresh */}
      <div className="flex items-center justify-between mb-3">
        <LiveIndicator isLive={stat.isLive} />
        
        {stat.onRefresh && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRefresh();
            }}
            className={`
              p-1 rounded-lg transition-all
              ${isGradient 
                ? 'hover:bg-white/20 text-white/80' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'
              }
            `}
          >
            <RefreshCw 
              size={14} 
              className={isRefreshing ? 'animate-spin' : ''} 
            />
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Label */}
          <p className={`
            text-xs lg:text-sm font-medium truncate
            ${isGradient ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}
          `}>
            {stat.label}
          </p>
          
          {/* Value */}
          <div className="mt-1 flex items-baseline gap-1.5">
            <p className={`
              text-2xl lg:text-3xl font-bold tracking-tight
              ${isGradient ? 'text-white' : 'text-slate-900 dark:text-white'}
            `}>
              {stat.value}
            </p>
            {stat.unit && (
              <span className={`
                text-sm font-medium
                ${isGradient ? 'text-white/70' : 'text-slate-400'}
              `}>
                {stat.unit}
              </span>
            )}
          </div>

          {/* Subtitle */}
          {stat.subtitle && (
            <p className={`
              mt-0.5 text-xs
              ${isGradient ? 'text-white/60' : 'text-slate-400'}
            `}>
              {stat.subtitle}
            </p>
          )}

          {/* Change indicator */}
          {change !== undefined && (
            <div className="mt-2 lg:mt-3 flex items-center gap-1.5">
              {isPositive && (
                <div className={`
                  flex items-center gap-1 px-1.5 py-0.5 rounded-full
                  ${isGradient ? 'bg-white/20' : 'bg-emerald-100 dark:bg-emerald-500/20'}
                `}>
                  <TrendingUp size={12} className={isGradient ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'} />
                  <span className={`text-xs font-semibold ${isGradient ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    +{change}%
                  </span>
                </div>
              )}
              {isNegative && (
                <div className={`
                  flex items-center gap-1 px-1.5 py-0.5 rounded-full
                  ${isGradient ? 'bg-white/20' : 'bg-red-100 dark:bg-red-500/20'}
                `}>
                  <TrendingDown size={12} className={isGradient ? 'text-white' : 'text-red-600 dark:text-red-400'} />
                  <span className={`text-xs font-semibold ${isGradient ? 'text-white' : 'text-red-600 dark:text-red-400'}`}>
                    {change}%
                  </span>
                </div>
              )}
              {isNeutral && (
                <div className={`
                  flex items-center gap-1 px-1.5 py-0.5 rounded-full
                  ${isGradient ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-500/20'}
                `}>
                  <Minus size={12} className={isGradient ? 'text-white' : 'text-slate-500'} />
                  <span className={`text-xs font-semibold ${isGradient ? 'text-white' : 'text-slate-500'}`}>
                    0%
                  </span>
                </div>
              )}
              {stat.changeLabel && (
                <span className={`
                  text-xs
                  ${isGradient ? 'text-white/60' : 'text-slate-400'}
                `}>
                  {stat.changeLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Icon or Progress Ring */}
        <div className="shrink-0">
          {targetProgress !== undefined ? (
            <ProgressRing 
              progress={targetProgress} 
              color={colors.hex}
              size={size === 'lg' ? 52 : 44}
            />
          ) : (
            <div
              className={`
                flex items-center justify-center rounded-xl
                transition-all duration-300
                ${size === 'lg' ? 'w-14 h-14' : 'w-11 h-11 lg:w-12 lg:h-12'}
                ${isGradient 
                  ? 'bg-white/20' 
                  : colors.bg
                }
                ${isHovered ? 'scale-110 rotate-3' : ''}
              `}
            >
              <Icon 
                size={size === 'lg' ? 24 : 20} 
                className={isGradient ? 'text-white' : colors.text}
                strokeWidth={2}
              />
            </div>
          )}
        </div>
      </div>

      {/* Sparkline */}
      {stat.sparklineData && stat.sparklineData.length > 1 && (
        <div className="mt-3 -mx-1">
          <Sparkline 
            data={stat.sparklineData} 
            color={isGradient ? 'rgba(255,255,255,0.8)' : colors.hex}
            height={28}
          />
        </div>
      )}

      {/* Hover shine effect */}
      <div 
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-300
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          -translate-x-full
          ${isHovered ? 'opacity-100 translate-x-full' : ''}
        `}
        style={{ 
          transition: 'transform 0.6s ease-out, opacity 0.3s',
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)'
        }}
      />
    </div>
  );
};

// Export the original for backward compatibility
export { StatCardModern as StatCard };