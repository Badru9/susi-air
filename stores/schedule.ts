import { defineStore } from 'pinia';
import mockSchedules from '../data/mock-schedules.json';
import { addMonths, format, startOfMonth } from 'date-fns';

type DutyCode =
  | 'DTY'
  | 'RLV'
  | 'SCK'
  | 'TRV'
  | 'TRX'
  | 'ADM'
  | 'FER'
  | 'MED'
  | 'REC'
  | 'ULV';

interface ScheduleStoreState {
  currentMonth: string; // YYYY-MM-DD format for consistency
  schedule: Record<string, DutyCode>;
}

export const useScheduleStore = defineStore('schedule', {
  state: (): ScheduleStoreState => ({
    currentMonth: '2026-05-01', // Starting at May 2026
    schedule: {},
  }),
  actions: {
    loadMockData() {
      const anyMock: any = mockSchedules;
      if (anyMock && Array.isArray(anyMock.schedules)) {
        const map: Record<string, DutyCode> = {};
        anyMock.schedules.forEach((s: any) => {
          if (
            s &&
            typeof s.duty_date === 'string' &&
            typeof s.duty_type === 'string'
          ) {
            // Cast duty_type to DutyCode if possible
            map[s.duty_date] = s.duty_type as DutyCode;
          }
        });
        this.schedule = map;
      } else if (anyMock && typeof anyMock === 'object') {
        // Fallback: try to pick only string->DutyCode entries
        const map: Record<string, DutyCode> = {};
        Object.entries(anyMock).forEach(([k, v]) => {
          if (typeof k === 'string' && typeof v === 'string') {
            map[k] = v as DutyCode;
          }
        });
        this.schedule = map;
      } else {
        this.schedule = {};
      }
    },
    prevMonth() {
      const newMonth = addMonths(new Date(this.currentMonth), -1);
      this.currentMonth = format(startOfMonth(newMonth), 'yyyy-MM-dd');
    },
    nextMonth() {
      const newMonth = addMonths(new Date(this.currentMonth), 1);
      this.currentMonth = format(startOfMonth(newMonth), 'yyyy-MM-dd');
    },
  },
  getters: {
    currentMonthDate: (state) => new Date(state.currentMonth),
  },
});
