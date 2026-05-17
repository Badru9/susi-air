import { computed } from 'vue';
import { addDays, format, parseISO } from 'date-fns';

interface FlightHourEntry {
  date: string;
  hours: number;
}

interface ChartPoint {
  date: Date;
  value: number;
}

export function useRollingSum(flightHours: FlightHourEntry[]) {
  const hoursMap = computed(() =>
    Object.fromEntries(flightHours.map((e) => [e.date, e.hours])),
  );

  function rollingSum(centerDate: Date, windowDays: number): ChartPoint[] {
    return Array.from({ length: 15 }, (_, i) => {
      const D = addDays(centerDate, i - 7); // X-axis range: today ±7 days
      let sum = 0;
      for (let j = 0; j < windowDays; j++) {
        const d = format(addDays(D, -j), 'yyyy-MM-dd');
        sum += hoursMap.value[d] ?? 0;
      }
      return { date: D, value: sum };
    });
  }

  return { rollingSum };
}