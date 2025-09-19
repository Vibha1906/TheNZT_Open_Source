import { create } from 'zustand';

interface TimelineItem {
  title: string;
  created_at: string;
  id: string;
}

interface TimelineGroup {
  timeline: string;
  data: TimelineItem[];
}

export type SessionHistoryData = TimelineGroup[];

interface SessionHistoryState {
  sessionHistoryData: SessionHistoryData;
  setSessionHistoryData: (
    data: SessionHistoryData | ((prev: SessionHistoryData) => SessionHistoryData)
  ) => void;
  clearSessionHistoryData: () => void;
}

export const useSessionHistoryStore = create<SessionHistoryState>((set, get) => ({
  sessionHistoryData: [],
  setSessionHistoryData: (data) => {
    const current = get().sessionHistoryData;
    const next = typeof data === 'function' ? data(current) : data;
    set({ sessionHistoryData: next });
  },
  clearSessionHistoryData: () => set({ sessionHistoryData: [] }),
}));
