import { computed } from 'vue';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  format,
} from 'date-fns';

import { isToday } from 'date-fns';

export function useCalendar(currentMonth: Date, schedule: Record<string, string>, today: Date) {
  const daysInMonth = computed(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 }); // Sunday end

    return eachDayOfInterval({ start: weekStart, end: weekEnd }).map((date) => ({
      date,
      isCurrentMonth: isSameMonth(date, currentMonth),
      formattedDate: format(date, 'yyyy-MM-dd'),
      dayOfMonth: format(date, 'd'),
      isToday: isToday(date),
      dutyCode: schedule[format(date, 'yyyy-MM-dd')] || null
    }));
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return { daysInMonth, weekDays };
}