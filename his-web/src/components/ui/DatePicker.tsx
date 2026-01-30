import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { formatThaiDate, isFutureDate, isTodayInBangkok } from '@/lib/utils';

interface DatePickerProps {
  selectedDate: string; // e.g., "2025-09-29" or "2025-09-29T08:00:00.000Z"
  calendarViewDate: string; // e.g., "2025-09-29"
  setSelectedDate: (date: string) => void; // Returns date or datetime string
  setCalendarViewDate: (date: string) => void; // Returns date string (YYYY-MM-DD)
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDarkMode: boolean;
  minDate?: string; // Minimum selectable date (YYYY-MM-DD format)
  maxDate?: string; // Maximum selectable date (YYYY-MM-DD format)
  disablePastDates?: boolean; // Disable dates before today
  disableFutureDates?: boolean; // Disable dates after today
  enableTime?: boolean; // Enable time selection
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  calendarViewDate,
  setSelectedDate,
  setCalendarViewDate,
  isOpen,
  setIsOpen,
  isDarkMode,
  minDate,
  maxDate,
  disablePastDates = false,
  disableFutureDates = true,
  enableTime = false
}) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const [selectedTime, setSelectedTime] = useState<{ hours: string; minutes: string }>({
    hours: '',
    minutes: ''
  });

  // Initialize time from selectedDate if enableTime is true
  useEffect(() => {
    if (enableTime && selectedDate) {
      const date = new Date(selectedDate);
      if (!isNaN(date.getTime())) {
        setSelectedTime({
          hours: date.getHours().toString().padStart(2, '0'),
          minutes: date.getMinutes().toString().padStart(2, '0')
        });
      }
    } else {
      setSelectedTime({ hours: '', minutes: '' });
    }
  }, [selectedDate, enableTime]);

  // Smart positioning logic
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const calendarHeight = enableTime ? 550 : 400; // Increased for time picker

      if (spaceBelow < calendarHeight && spaceAbove > spaceBelow) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen, enableTime]);

  // Set trigger ref from parent component
  const setTriggerRef = (element: HTMLElement | null) => {
    if (element) {
      triggerRef.current = element;
    }
  };

  useEffect(() => {
    if ((DatePicker as any).setTriggerRef) {
      (DatePicker as any).setTriggerRef = setTriggerRef;
    }
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setIsOpen]);

  // Helper function to check if a date should be disabled
  const isDateDisabled = (dateStr: string): boolean => {
    const today = new Date().toISOString().split('T')[0];
    
    if (disablePastDates && dateStr < today) {
      return true;
    }
    
    if (disableFutureDates && isFutureDate(dateStr)) {
      return true;
    }
    
    if (minDate && dateStr < minDate) {
      return true;
    }
    
    if (maxDate && dateStr > maxDate) {
      return true;
    }
    
    return false;
  };

  // Generate calendar
  const generateCalendar = () => {
    const [year, month, day] = calendarViewDate.split('-').map(Number);
    const currentDate = new Date(year, month - 1, day);
    currentDate.setHours(0, 0, 0, 0);
    const calendarYear = currentDate.getFullYear();
    const calendarMonth = currentDate.getMonth();
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    const weeks = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
    }
    return { weeks, currentMonth: calendarMonth, currentYear: calendarYear };
  };

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    const [year, month, day] = calendarViewDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    if (direction === 'prev') date.setMonth(date.getMonth() - 1);
    else date.setMonth(date.getMonth() + 1);
    const newCalendarDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    setCalendarViewDate(newCalendarDate);
  };

  // Select date and optionally time
  const selectDate = (date: Date) => {
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);
    const year = selected.getFullYear();
    const month = (selected.getMonth() + 1).toString().padStart(2, '0');
    const day = selected.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    if (isDateDisabled(dateStr)) {
      return;
    }

    if (enableTime) {
      const hours = selectedTime.hours || '00';
      const minutes = selectedTime.minutes || '00';
      const dateTimeStr = `${dateStr}T${hours}:${minutes}:00.000Z`;
      setSelectedDate(dateTimeStr);
    } else {
      setSelectedDate(dateStr);
      setCalendarViewDate(dateStr);
    }
    setIsOpen(false);
  };

  // Handle time selection from dropdowns or grid
  const handleTimeSelect = (hours: string, minutes: string) => {
    setSelectedTime({ hours, minutes });

    if (selectedDate || calendarViewDate) {
      const baseDate = selectedDate ? selectedDate.split('T')[0] : calendarViewDate;
      const dateTimeStr = `${baseDate}T${hours}:${minutes}:00.000Z`;
      setSelectedDate(dateTimeStr);
    }
  };

  // Generate time options (every 15 minutes)
  const generateTimeOptions = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = ['00', '15', '30', '45'];
    return { hours, minutes };
  };

  // Common shift times for quick selection
  const commonShiftTimes = [
    { hours: '08', minutes: '00', label: '08:00 (Morning Start)' },
    { hours: '09', minutes: '00', label: '09:00' },
    { hours: '12', minutes: '00', label: '12:00 (Midday)' },
    { hours: '17', minutes: '00', label: '17:00 (Evening)' },
    { hours: '20', minutes: '00', label: '20:00 (Night Start)' },
    { hours: '23', minutes: '00', label: '23:00' }
  ];

  const { weeks, currentMonth, currentYear } = generateCalendar();
  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const dayNames = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
  const { hours: hourOptions, minutes: minuteOptions } = generateTimeOptions();

  if (!isOpen) return null;

  return (
    <div 
      className={`
        absolute z-50 border rounded-xl shadow-lg p-4 min-w-[320px] max-w-sm
        ${position === 'top' 
          ? 'bottom-full mb-2' 
          : 'top-full mt-2'
        }
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `} 
      ref={datePickerRef}
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* Header with month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => navigateMonth('prev')}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="text-center flex-1">
          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {monthNames[currentMonth]} {currentYear + 543}
          </h3>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatThaiDate(selectedDate, enableTime)}
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => navigateMonth('next')}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div 
            key={index} 
            className={`text-center py-2 text-xs font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((date, dayIndex) => {
              const isCurrentMonth = date.getMonth() === currentMonth;
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const dateStr = `${year}-${month}-${day}`;

              const isSelected = dateStr === (enableTime ? selectedDate.split('T')[0] : selectedDate);
              const isToday = isTodayInBangkok(dateStr);
              const isDisabled = isDateDisabled(dateStr);
              
              return (
                <button
                  key={dayIndex}
                  type="button"
                  onClick={() => !isDisabled && selectDate(date)}
                  disabled={isDisabled}
                  className={`
                    w-10 h-10 text-sm rounded-lg transition-all duration-200 font-medium
                    ${isDisabled
                      ? (isDarkMode
                          ? 'text-gray-700 cursor-not-allowed bg-gray-800'
                          : 'text-gray-300 cursor-not-allowed bg-gray-50'
                        )
                      : isSelected
                        ? 'bg-blue-600 text-white font-semibold shadow-md'
                        : isToday
                          ? (isDarkMode
                              ? 'bg-blue-900/40 text-blue-300 font-semibold border border-blue-500'
                              : 'bg-blue-100 text-blue-700 font-semibold border border-blue-300'
                            )
                          : isCurrentMonth
                            ? (isDarkMode
                                ? 'text-white hover:bg-gray-700 hover:text-blue-300'
                                : 'text-gray-900 hover:bg-gray-100 hover:text-blue-600'
                              )
                            : (isDarkMode
                                ? 'text-gray-600 hover:bg-gray-800 hover:text-gray-400'
                                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                              )
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Time picker */}
      {enableTime && (
        <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              เลือกเวลา
            </label>
            <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          {/* Time dropdowns */}
          <div className="flex gap-2 mb-3">
            <select
              value={selectedTime.hours}
              onChange={(e) => handleTimeSelect(e.target.value, selectedTime.minutes)}
              className={`w-24 px-2 py-1 rounded-lg border text-sm ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="" disabled>ชั่วโมง</option>
              {hourOptions.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
            <span className={`self-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              :
            </span>
            <select
              value={selectedTime.minutes}
              onChange={(e) => handleTimeSelect(selectedTime.hours, e.target.value)}
              className={`w-24 px-2 py-1 rounded-lg border text-sm ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="" disabled>นาที</option>
              {minuteOptions.map(minute => (
                <option key={minute} value={minute}>{minute}</option>
              ))}
            </select>
          </div>
          {/* Quick select time grid */}
          <div className="grid grid-cols-3 gap-2">
            {commonShiftTimes.map(({ hours, minutes, label }) => (
              <button
                key={`${hours}:${minutes}`}
                type="button"
                onClick={() => handleTimeSelect(hours, minutes)}
                className={`
                  px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200
                  ${selectedTime.hours === hours && selectedTime.minutes === minutes
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer with quick actions */}
      <div className={`flex items-center justify-between mt-4 pt-3 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <button
          type="button"
          onClick={() => {
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];
            if (!isDateDisabled(todayStr)) {
              selectDate(today);
            }
          }}
          disabled={isDateDisabled(new Date().toISOString().split('T')[0])}
          className={`
            text-sm font-medium px-3 py-1 rounded-md transition-colors duration-200
            ${isDateDisabled(new Date().toISOString().split('T')[0])
              ? (isDarkMode 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-gray-400 cursor-not-allowed'
                )
              : (isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20' 
                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                )
            }
          `}
        >
          วันนี้
        </button>
        
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={`
            text-sm px-3 py-1 rounded-md transition-colors duration-200
            ${isDarkMode 
              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          ปิด
        </button>
      </div>

      <div 
        className={`
          absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45
          ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          ${position === 'top' 
            ? 'top-full -mt-1.5 border-r border-b' 
            : 'bottom-full -mb-1.5 border-l border-t'
          }
        `}
      />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;