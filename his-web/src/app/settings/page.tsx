'use client';

import { useRouter } from 'next/navigation';
import {
  UserCog,
  Shield,
  Users,
  Menu,
  Lock,
  Building,
  Cog,
  ChevronRight,
  FileBarChart,
  Box,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout';

interface SettingCard {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const settingsCards: SettingCard[] = [
  {
    id: 'users',
    title: 'User Management',
    titleTh: 'จัดการผู้ใช้งาน',
    description: 'Manage system users, their profiles and credentials',
    icon: UserCog,
    href: '/settings/users',
    color: 'bg-blue-500',
  },
  {
    id: 'roles',
    title: 'Role Management',
    titleTh: 'จัดการบทบาท',
    description: 'Configure roles and their permissions',
    icon: Shield,
    href: '/settings/roles',
    color: 'bg-purple-500',
  },
  {
    id: 'groups',
    title: 'Group Management',
    titleTh: 'จัดการกลุ่มผู้ใช้',
    description: 'Organize users into groups for easier management',
    icon: Users,
    href: '/settings/groups',
    color: 'bg-green-500',
  },
  {
    id: 'menus',
    title: 'Menu Management',
    titleTh: 'จัดการเมนู',
    description: 'Configure navigation menus and their structure',
    icon: Menu,
    href: '/settings/menus',
    color: 'bg-orange-500',
  },
  {
    id: 'permissions',
    title: 'Permissions',
    titleTh: 'จัดการสิทธิ์',
    description: 'Define and manage system permissions',
    icon: Lock,
    href: '/settings/permissions',
    color: 'bg-red-500',
  },
  {
    id: 'access',
    title: 'Access Control',
    titleTh: 'ควบคุมการเข้าถึง',
    description: 'Configure role-based access to menus and features',
    icon: FileBarChart,
    href: '/settings/access',
    color: 'bg-indigo-500',
  },
  {
    id: 'hospital',
    title: 'Hospital Info',
    titleTh: 'ข้อมูลโรงพยาบาล',
    description: 'Update hospital information and branding',
    icon: Building,
    href: '/settings/hospital',
    color: 'bg-teal-500',
  },
  {
    id: 'system',
    title: 'System Settings',
    titleTh: 'ตั้งค่าระบบ',
    description: 'Configure system-wide settings and preferences',
    icon: Cog,
    href: '/settings/system',
    color: 'bg-slate-500',
  },
];

export default function SettingsPage() {
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            ตั้งค่าระบบ • Manage system configuration
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {settingsCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => router.push(card.href)}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-left hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {card.titleTh}
                    </p>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all mt-1"
                  />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-2">
                  {card.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            System Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">--</p>
              <p className="text-sm text-slate-500">Total Users</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">--</p>
              <p className="text-sm text-slate-500">Active Roles</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">--</p>
              <p className="text-sm text-slate-500">User Groups</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">--</p>
              <p className="text-sm text-slate-500">Menu Items</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}