// =============================================================================
// File: src/types/dashboard.ts
// Description: Extended types for HIS Dashboard components
// =============================================================================

// Base StatCard type (original)
export interface StatCard {
  icon: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  color: 'primary' | 'success' | 'warning' | 'critical';
}

// Extended StatCard for HIS Dashboard
export interface HISStatCard extends Omit<StatCard, 'color'> {
  // Extended color options
  color: 'primary' | 'success' | 'warning' | 'critical' | 'info' | 'purple' | 'neutral';
  
  // Real-time features
  isLive?: boolean;
  lastUpdated?: Date | string;
  
  // Trend visualization
  sparklineData?: number[];
  
  // Additional HIS info
  subtitle?: string;
  target?: number;          // For progress ring
  unit?: string;            // e.g., "เตียง", "ราย", "฿"
  
  // Visual variants
  variant?: 'default' | 'gradient' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  
  // Interactions
  onClick?: () => void;
  onRefresh?: () => void;
}

// Dashboard summary data
export interface DashboardSummary {
  opd: {
    total: number;
    waiting: number;
    examining: number;
    completed: number;
    trend: number[];
  };
  ipd: {
    total: number;
    occupied: number;
    available: number;
    pendingDischarge: number;
    occupancyRate: number;
  };
  er: {
    total: number;
    critical: number;
    urgent: number;
    normal: number;
    averageWaitTime: number;
  };
  pharmacy: {
    waiting: number;
    dispensing: number;
    completed: number;
    trend: number[];
  };
  lab: {
    pending: number;
    processing: number;
    completed: number;
    criticalResults: number;
  };
  revenue: {
    today: number;
    target: number;
    mtd: number;
    mtdTarget: number;
  };
}

// Real-time update payload
export interface DashboardRealtimeUpdate {
  type: 'opd' | 'ipd' | 'er' | 'pharmacy' | 'lab' | 'revenue';
  data: Partial<DashboardSummary[keyof DashboardSummary]>;
  timestamp: string;
}

// Alert/Notification for dashboard
export interface DashboardAlert {
  id: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  title: string;
  message: string;
  module?: string;
  timestamp: Date;
  isRead?: boolean;
  action?: {
    label: string;
    href: string;
  };
}