import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import React from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatThaiID(value: string): string {
  const cleanValue = value.endsWith('-') ? value.slice(0, -1) : value;
  const numbers = cleanValue.replace(/\D/g, '').slice(0, 13);
  
  let formatted = '';
  for (let i = 0; i < numbers.length; i++) {
    if (i === 1 || i === 5 || i === 10 || i === 12) formatted += '-';
    formatted += numbers[i];
  }
  return formatted;
}

export const formatThaiDate = (dateStr: string, showTime: boolean = false): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  if (showTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.hour12 = false; // Use 24-hour format
  }

  const formatted = date.toLocaleDateString('th-TH', options);
  return formatted.replace(/(\d{2})\s(\S+)\s(\d{4})/, '$1 $2 $3'); // Ensure consistent format
};

export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('th-TH', {
    timeZone: 'Asia/Bangkok',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const getCurrentBangkokDate = (): string => {
  return new Date().toLocaleDateString('en-CA', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const isTodayInBangkok = (dateStr: string): boolean => {
  if (!dateStr) return false;
  return dateStr.split('T')[0] === getCurrentBangkokDate();
};

export const isFutureDate = (dateStr: string): boolean => {
  if (!dateStr) return false;
  return dateStr.split('T')[0] > getCurrentBangkokDate();
};

export const calculateWorkMinutes = (checkIn: string, checkOut: string): number => {
  try {
    const inTime = new Date(`2000-01-01T${checkIn}`);
    const outTime = new Date(`2000-01-01T${checkOut}`);
    if (outTime < inTime) outTime.setDate(outTime.getDate() + 1);
    const diffMs = outTime.getTime() - inTime.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60)));
  } catch {
    return 0;
  }
};

export const formatWorkHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `${hours} ชม.` : `${hours} ชม. ${mins} น.`;
};

export const getStatusDisplay = (status: string, isDarkMode: boolean) => {
  const styles = {
    Present: {
      icon: React.createElement(CheckCircle, { className: "w-4 h-4 text-green-600" }),
      text: 'เข้างาน',
      color: isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
    },
    Late: {
      icon: React.createElement(AlertCircle, { className: "w-4 h-4 text-orange-600" }),
      text: 'สาย',
      color: isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-800'
    },
    Absent: {
      icon: React.createElement(XCircle, { className: "w-4 h-4 text-red-600" }),
      text: 'ขาด',
      color: isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
    },
    Incomplete: {
      icon: React.createElement(Clock, { className: "w-4 h-4 text-blue-600" }),
      text: 'ไม่สมบูรณ์',
      color: isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
    }
  };
  return styles[status as keyof typeof styles] || {
    icon: React.createElement(Clock, { className: "w-4 h-4 text-gray-600" }),
    text: 'ไม่ทราบ',
    color: isDarkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-800'
  };
};

export const getDisplayValue = (val: string) => {
  const displayMap: { [key: string]: string } = {
    all: 'ทุกสถานะ',
    Present: 'เข้างาน',
    Late: 'สาย',
    Absent: 'ขาด',
    Incomplete: 'ไม่สมบูรณ์',
    morning: 'เวรเช้า',
    afternoon: 'เวรบ่าย',
    night: 'เวรดึก'
  };
  return displayMap[val] || val;
};