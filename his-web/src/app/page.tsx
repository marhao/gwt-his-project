'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout';
import { StatCard, QuickActions, AppointmentsTable } from '@/components/dashboard';
import { statsConfig, quickActionsConfig, appointmentsConfig } from '@/config/dashboard';
import { useAuth } from '@/components/providers';

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
        {statsConfig.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} delay={index * 50} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions actions={quickActionsConfig} />
      </div>

      {/* Appointments Table */}
      <div>
        <AppointmentsTable appointments={appointmentsConfig} />
      </div>
    </AdminLayout>
  );
}