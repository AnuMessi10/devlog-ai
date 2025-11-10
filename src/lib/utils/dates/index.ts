// lib/utils/date.ts
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import weekday from 'dayjs/plugin/weekday';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };

// Common date formats
export const DATE_FORMATS = {
    SHORT: 'MMM D, YYYY', // Jan 1, 2024
    LONG: 'MMMM D, YYYY', // January 1, 2024
    FULL: 'dddd, MMMM D, YYYY', // Monday, January 1, 2024
    TIME: 'h:mm A', // 2:30 PM
    DATETIME: 'MMM D, YYYY h:mm A', // Jan 1, 2024 2:30 PM
    ISO: 'YYYY-MM-DD', // 2024-01-01
};

// Utility functions
export function formatDate(date: Date | string, format: string = DATE_FORMATS.SHORT): string {
    return dayjs(date).format(format);
}

export function formatRelative(date: Date | string): string {
    return dayjs(date).fromNow(); // "3 days ago", "in 2 hours"
}

export function formatCalendar(date: Date | string): string {
    return dayjs(date).calendar(null, {
        sameDay: '[Today at] h:mm A',
        nextDay: '[Tomorrow at] h:mm A',
        nextWeek: 'dddd [at] h:mm A',
        lastDay: '[Yesterday at] h:mm A',
        lastWeek: '[Last] dddd [at] h:mm A',
        sameElse: 'MMM D, YYYY',
    });
}

export function getDateRange(range: 'today' | 'week' | 'month' | 'year'): {
    start: Date;
    end: Date;
} {
    const now = dayjs();

    switch (range) {
        case 'today':
            return {
                start: now.startOf('day').toDate(),
                end: now.endOf('day').toDate(),
            };
        case 'week':
            return {
                start: now.startOf('week').toDate(),
                end: now.endOf('week').toDate(),
            };
        case 'month':
            return {
                start: now.startOf('month').toDate(),
                end: now.endOf('month').toDate(),
            };
        case 'year':
            return {
                start: now.startOf('year').toDate(),
                end: now.endOf('year').toDate(),
            };
    }
}

export function isToday(date: Date | string): boolean {
    return dayjs(date).isSame(dayjs(), 'day');
}

export function isThisWeek(date: Date | string): boolean {
    return dayjs(date).isBetween(dayjs().startOf('week'), dayjs().endOf('week'), null, '[]');
}

export function isThisMonth(date: Date | string): boolean {
    return dayjs(date).isSame(dayjs(), 'month');
}

export function getDaysInMonth(date: Date | string = new Date()): number {
    return dayjs(date).daysInMonth();
}

export function getWeekdays(): string[] {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

export function generateCalendarDays(year: number, month: number): Date[] {
    const firstDay = dayjs().year(year).month(month).startOf('month');
    const lastDay = firstDay.endOf('month');
    const startWeekday = firstDay.day();
    const daysInMonth = lastDay.date();

    const days: Date[] = [];

    // Previous month days
    for (let i = 0; i < startWeekday; i++) {
        days.push(firstDay.subtract(startWeekday - i, 'day').toDate());
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(firstDay.date(i).toDate());
    }

    // Next month days to fill grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
        days.push(lastDay.add(i, 'day').toDate());
    }

    return days;
}
