import { defineStore } from 'pinia';
import mockData from '~/data/mock-flight-hours.json';
import mockDocuments from '~/data/mock-documents.json';
import { addDays, format } from 'date-fns'; // Assume date-fns is installed or use built-in Date ops

interface FlightHourEntry {
  date: string;
  hours: number;
}

interface Document {
  id: number;
  name: string;
  expiryDate: string;
}

interface Flight {
  date: string;
  time: string;
  departure: {
    icao: string;
    city: string;
  };
  arrival: {
    icao: string;
    city: string;
  };
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

interface PilotStoreState {
  pilot: { name: string; avatar: string; totalHours: number } | null;
  limits: { daily: number; weekly: number; monthly: number; annual: number };
  flightHours: FlightHourEntry[];
  documents: Document[];
  upcomingFlight: Flight | null;
  news: NewsItem[];
  today: string; // Hardcoded '31 May 2026'
}

export const usePilotStore = defineStore('pilot', {
  state: (): PilotStoreState => ({
    pilot: null,
    limits: { daily: 8, weekly: 40, monthly: 100, annual: 1050 },
    flightHours: [],
    documents: [],
    upcomingFlight: {
      date: '2026-06-01',
      time: '07:30',
      departure: { icao: 'HLP', city: 'Jakarta' },
      arrival: { icao: 'CJN', city: 'Pangandaran' },
    },
    news: [
      { id: 1, title: 'New Safety Protocols', date: '2026-05-28', excerpt: 'Important updates regarding flight safety procedures...' },
      { id: 2, title: 'Fleet Expansion Plans', date: '2026-05-25', excerpt: 'Susi Air to acquire new aircraft in Q3 2026...' },
      { id: 3, title: 'Pilot Training Schedule', date: '2026-05-20', excerpt: 'Revised training schedule for June is now available...' },
    ],
    today: '2026-05-31', // Hardcoded today as 31 May 2026
  }),
  actions: {
    loadMockData() {
      this.pilot = mockData.pilot;
      this.limits = mockData.limits;
      this.flightHours = mockData.flightHours;
      this.documents = mockDocuments.documents; // Assuming mock-documents.json structure
    },
    // Mock login for now
    login(username: string) {
      if (this.pilot) {
        this.pilot.name = username; // Update pilot name on login
      } else {
        this.pilot = { name: username, avatar: '/images/avatar.png', totalHours: 0 };
      }
    },
    logout() {
      this.pilot = null;
    },
  },
  getters: {
    hoursMap: (state) => {
      return Object.fromEntries(state.flightHours.map((e) => [e.date, e.hours]));
    },
    hoursInWindow: (state) => (days: number): number => {
      let sum = 0;
      const todayDate = new Date(state.today);
      for (let i = 0; i < days; i++) {
        const d = format(addDays(todayDate, -i), 'yyyy-MM-dd');
        sum += state.hoursMap[d] ?? 0;
      }
      return sum;
    },
  },
});
