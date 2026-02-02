import { StatCard, Appointment, QuickAction } from '@/lib/types';

export const statsConfig: StatCard[] = [
  {
    id: 'patients',
    label: 'Total Patients',
    value: '1,234',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: 'users',
    color: 'primary',
  },
  {
    id: 'appointments',
    label: 'Appointments',
    value: 48,
    change: -3.2,
    changeLabel: 'vs yesterday',
    icon: 'calendar',
    color: 'success',
  },
  {
    id: 'inpatients',
    label: 'Inpatients',
    value: 132,
    change: 8.1,
    changeLabel: 'vs last week',
    icon: 'bed',
    color: 'warning',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    value: 7,
    change: 25,
    changeLabel: 'vs yesterday',
    icon: 'emergency',
    color: 'critical',
  },
];

export const appointmentsConfig: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientId: 'P-10234',
    time: '09:00 AM',
    type: 'Checkup',
    doctor: 'Dr. Smith',
    status: 'completed',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    patientId: 'P-10235',
    time: '09:30 AM',
    type: 'Follow-up',
    doctor: 'Dr. Williams',
    status: 'in-progress',
  },
  {
    id: '3',
    patientName: 'Emily Davis',
    patientId: 'P-10236',
    time: '10:00 AM',
    type: 'Consultation',
    doctor: 'Dr. Johnson',
    status: 'scheduled',
  },
  {
    id: '4',
    patientName: 'Robert Wilson',
    patientId: 'P-10237',
    time: '10:30 AM',
    type: 'Lab Results',
    doctor: 'Dr. Lee',
    status: 'scheduled',
  },
  {
    id: '5',
    patientName: 'Jennifer Brown',
    patientId: 'P-10238',
    time: '11:00 AM',
    type: 'Checkup',
    doctor: 'Dr. Smith',
    status: 'scheduled',
  },
];

export const quickActionsConfig: QuickAction[] = [
  { id: 'register', label: 'Register', icon: 'userPlus', color: 'primary' },
  { id: 'appointment', label: 'Appointment', icon: 'calendar', color: 'success' },
  { id: 'lab', label: 'Lab Order', icon: 'flask', color: 'warning' },
  { id: 'prescribe', label: 'Prescribe', icon: 'pill', color: 'purple' },
  { id: 'emergency', label: 'Emergency', icon: 'emergency', color: 'critical' },
  { id: 'admit', label: 'Admit', icon: 'bed', color: 'cyan' },
];

export const bedOccupancyConfig = [
  { id: 'general', name: 'General Ward', occupied: 42, total: 50 },
  { id: 'icu', name: 'ICU', occupied: 18, total: 20 },
  { id: 'pediatrics', name: 'Pediatrics', occupied: 22, total: 30 },
  { id: 'maternity', name: 'Maternity', occupied: 15, total: 25 },
  { id: 'surgery', name: 'Surgery', occupied: 35, total: 40 },
];
