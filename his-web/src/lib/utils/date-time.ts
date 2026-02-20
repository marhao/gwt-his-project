// ============================================
// DateTime Utility Functions
// ============================================

import { MONTH_TH_NAMES, MONTH_TH_SHNAMES } from "../constants/date-time";

export const formatThaiDate = (dateStr: string, includeTime = false): string => {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate();
    const month = MONTH_TH_NAMES[date.getMonth()];
    const year = date.getFullYear() + 543;

    if (includeTime) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day} ${month} ${year} ${hours}:${minutes}`;
    }

    return `${day} ${month} ${year}`;
};

export const formatThaiDateShort = (dateStr: string): string => {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate();
    const month = MONTH_TH_SHNAMES[date.getMonth()];
    const year = date.getFullYear() + 543;

    return `${day} ${month} ${year}`;
};

export const formatSmartCard2DbDate = (dateStr: string): string => {
    const [year, month, date] = dateStr.split('-');
    return `${parseInt(year) -543}-${month}-${date}`;
}

export const isFutureDate = (dateStr: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return date > today;
};

export const isTodayInBangkok = (dateStr: string): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
};

/** Calculate age */
export const calculateAge = (birthday: string): string => {
    if (!birthday) return '';

    const birthDate = new Date(birthday);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
        years--;
        months += 12;
    }
    
    if (today.getDate() < birthDate.getDate()) {
        months--;
    }
    
    if (years < 1) return `${months} เดือน`;

    return months > 0 ? `${years} ปี ${months} เดือน` : `${years} ปี`;
};