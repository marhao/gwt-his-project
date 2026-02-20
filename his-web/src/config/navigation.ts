import { NavGroup } from '@/lib/types';

export const navigationConfig: NavGroup[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        href: '/',
      },
      {
        id: 'emergency',
        label: 'Emergency',
        icon: 'emergency',
        href: '/emergency',
        badge: 3,
        badgeColor: 'critical',
      },
    ],
  },
  {
    id: 'patients',
    label: 'Patient Management',
    items: [
      {
        id: 'patients',
        label: 'Patients',
        icon: 'users',
        href: '/patients',
        children: [
          { id: 'patients-list', label: 'All Patients', icon: 'list', href: '/patients' },
          { id: 'patients-register', label: 'Register Patient', icon: 'plus', href: '/patients/register' },
          { id: 'patients-records', label: 'Medical Records', icon: 'file', href: '/patients/records' },
        ],
      },
      {
        id: 'appointments',
        label: 'Appointments',
        icon: 'calendar',
        href: '/appointments',
        badge: 12,
        badgeColor: 'primary',
      },
      {
        id: 'inpatient',
        label: 'Inpatient',
        icon: 'bed',
        href: '/inpatient',
        badge: 24,
        badgeColor: 'warning',
      },
    ],
  },
  {
    id: 'clinical',
    label: 'Clinical',
    items: [
      {
        id: 'doctors',
        label: 'Doctors & Staff',
        icon: 'stethoscope',
        href: '/doctors',
      },
      {
        id: 'pharmacy',
        label: 'Pharmacy',
        icon: 'pill',
        href: '/pharmacy',
        children: [
          { id: 'pharmacy-dispense', label: 'Dispense', icon: 'pill', href: '/pharmacy/dispense' },
          { id: 'pharmacy-prescriptions', label: 'Prescriptions', icon: 'file', href: '/pharmacy/prescriptions' },
          { id: 'pharmacy-stock', label: 'Stock', icon: 'box', href: '/pharmacy/stock' },
        ],
      },
      {
        id: 'laboratory',
        label: 'Laboratory',
        icon: 'flask',
        href: '/laboratory',
        badge: 5,
        badgeColor: 'success',
      },
    ],
  },
  {
    id: 'admin',
    label: 'Administration',
    items: [
      {
        id: 'billing',
        label: 'Billing',
        icon: 'creditCard',
        href: '/billing',
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: 'chart',
        href: '/reports',
        children: [
          { id: 'reports-daily', label: 'Daily Reports', icon: 'file', href: '/reports/daily' },
          { id: 'reports-monthly', label: 'Monthly Reports', icon: 'file', href: '/reports/monthly' },
          { id: 'reports-analytics', label: 'Analytics', icon: 'chart', href: '/reports/analytics' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        href: '/settings',
      },
    ],
  },
];

// Flattened navigation for horizontal menu
export const horizontalNavConfig = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/' },
  { id: 'emergency', label: 'Emergency', icon: 'emergency', href: '/emergency', badge: 3, badgeColor: 'critical' as const },
  {
    id: 'patients',
    label: 'Patients',
    icon: 'users',
    children: [
      { id: 'patients-list', label: 'All Patients', href: '/patients' },
      { id: 'patients-register', label: 'Register Patient', href: '/patients/register' },
      { id: 'patients-records', label: 'Medical Records', href: '/patients/records' },
    ],
  },
  { id: 'appointments', label: 'Appointments', icon: 'calendar', href: '/appointments', badge: 12, badgeColor: 'primary' as const },
  { id: 'inpatient', label: 'Inpatient', icon: 'bed', href: '/inpatient', badge: 24, badgeColor: 'warning' as const },
  {
    id: 'clinical',
    label: 'Clinical',
    icon: 'stethoscope',
    children: [
      { id: 'doctors', label: 'Doctors & Staff', href: '/doctors' },
      { id: 'pharmacy', label: 'Pharmacy', href: '/pharmacy' },
      { id: 'laboratory', label: 'Laboratory', href: '/laboratory' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'settings',
    children: [
      { id: 'billing', label: 'Billing', href: '/billing' },
      { id: 'reports', label: 'Reports', href: '/reports' },
      { id: 'settings', label: 'Settings', href: '/settings' },
    ],
  },
];
