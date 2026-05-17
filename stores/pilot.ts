import { defineStore } from 'pinia';
import mockData from '../data/mock-flight-hours.json';
import mockDocuments from '../data/mock-documents.json';
import { addDays, format } from 'date-fns';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FlightHourEntry {
  date: string;
  hours: number;
}

interface ChartBoundEntry {
  limit: number;
  max: number;
  windowDays: number;
  displayRangeDays: number;
  /** Optional color injected at runtime based on usage ratio */
  color?: string;
}

type ChartToggleKey = '1w' | '1m' | '3m' | '6m' | '1y';

interface Document {
  id: string;
  label: string;
  expiryDate: string;
}

interface Flight {
  date: string;
  time: string;
  departure: { icao: string; city: string };
  arrival: { icao: string; city: string };
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

interface PilotStoreState {
  pilot: { name: string; avatar: string; totalFlightHours: number } | null;
  limits: { daily: number; weekly: number; monthly: number; annual: number };
  chartBounds: Record<ChartToggleKey, ChartBoundEntry>;
  flightHours: FlightHourEntry[];
  documents: Document[];
  upcomingFlight: Flight | null;
  news: NewsItem[];
  today: string;
}

// ─── Color thresholds ─────────────────────────────────────────────────────────

const CHART_COLORS = {
  safe: '#28a745', // < 75% of limit
  warn: '#ffc107', // 75–90% of limit
  danger: '#dc3545', // > 90% of limit
} as const;

function colorForRatio(ratio: number): string {
  if (ratio >= 0.9) return CHART_COLORS.danger;
  if (ratio >= 0.75) return CHART_COLORS.warn;
  return CHART_COLORS.safe;
}

// ─── Default chartBounds fallback (overwritten by loadMockData) ───────────────

const DEFAULT_CHART_BOUNDS: Record<ChartToggleKey, ChartBoundEntry> = {
  '1w': { limit: 40, max: 45, windowDays: 7, displayRangeDays: 7 },
  '1m': { limit: 100, max: 125, windowDays: 30, displayRangeDays: 7 },
  '3m': { limit: 300, max: 325, windowDays: 90, displayRangeDays: 7 },
  '6m': { limit: 600, max: 625, windowDays: 180, displayRangeDays: 7 },
  '1y': { limit: 1050, max: 1200, windowDays: 365, displayRangeDays: 7 },
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const usePilotStore = defineStore('pilot', {
  state: (): PilotStoreState => ({
    pilot: null,
    limits: { daily: 8, weekly: 40, monthly: 100, annual: 1050 },
    chartBounds: { ...DEFAULT_CHART_BOUNDS },
    flightHours: [],
    documents: [],
    upcomingFlight: {
      date: '2026-06-01',
      time: '07:30',
      departure: { icao: 'HLP', city: 'Jakarta' },
      arrival: { icao: 'CJN', city: 'Pangandaran' },
    },
    news: [
      {
        id: 1,
        title: 'New Safety Protocols',
        date: '2026-05-28',
        excerpt: 'Important updates regarding flight safety procedures...',
      },
      {
        id: 2,
        title: 'Fleet Expansion Plans',
        date: '2026-05-25',
        excerpt: 'Susi Air to acquire new aircraft in Q3 2026...',
      },
      {
        id: 3,
        title: 'Pilot Training Schedule',
        date: '2026-05-20',
        excerpt: 'Revised training schedule for June is now available...',
      },
    ],
    today: '2026-05-31',
  }),

  actions: {
    loadMockData() {
      this.pilot = {
        name: mockData.pilot.name,
        avatar:
          'https://images.unsplash.com/photo-1698223532694-2020d939dbd3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        totalFlightHours: mockData.pilot.totalFlightHours,
      };
      this.limits = mockData.limits;
      this.chartBounds = mockData.chartBounds as Record<
        ChartToggleKey,
        ChartBoundEntry
      >;
      this.flightHours = mockData.flightHours;
      this.documents = mockDocuments.documents;

      // Compute and inject colors based on current hours vs limits
      this._refreshChartColors();
    },

    /**
     * Recomputes the `color` field on each chartBounds entry based on the
     * pilot's current rolling-sum ratio vs the limit for that window.
     * Call after loadMockData or whenever flightHours changes.
     */
    _refreshChartColors() {
      const todayDate = new Date(this.today);
      const keys = Object.keys(this.chartBounds) as ChartToggleKey[];

      for (const key of keys) {
        const bound = this.chartBounds[key];
        const sum = this.hoursInWindow(bound.windowDays);
        this.chartBounds[key] = {
          ...bound,
          color: colorForRatio(sum / bound.limit),
        };
      }
    },

    login(username: string) {
      this.loadMockData();

      if (this.pilot) {
        this.pilot.name = username;
      } else {
        this.pilot = {
          name: username ?? 'John Doe',
          avatar:
            'https://images.unsplash.com/photo-1698223532694-2020d939dbd3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          totalFlightHours: 0,
        };
      }
    },

    logout() {
      this.pilot = null;
    },
  },

  getters: {
    /**
     * O(n) build once, O(1) lookup.
     * Returns a plain object: { 'yyyy-MM-dd': hours }
     */
    hoursMap: (state): Record<string, number> =>
      Object.fromEntries(state.flightHours.map((e) => [e.date, e.hours])),

    /**
     * Rolling sum of flight hours over the last `days` days (inclusive of today).
     * Uses `this` to access sibling getter — required in Pinia options API.
     */
    hoursInWindow(): (days: number) => number {
      return (days: number): number => {
        const todayDate = new Date(this.today);
        let sum = 0;
        for (let i = 0; i < days; i++) {
          const d = format(addDays(todayDate, -i), 'yyyy-MM-dd');
          sum += this.hoursMap[d] ?? 0;
        }
        return sum;
      };
    },
  },
});
