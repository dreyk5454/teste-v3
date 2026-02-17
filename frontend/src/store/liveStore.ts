import { create } from 'zustand';

interface Live {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  isActive: boolean;
  viewers: number;
  creatorId: string;
}

interface Room {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  liveIds: string[];
  viewers: number;
}

interface LiveStore {
  lives: Live[];
  rooms: Room[];
  selectedRoom: Room | null;
  addLive: (live: Live) => void;
  removeLive: (id: string) => void;
  setLives: (lives: Live[]) => void;
  setRooms: (rooms: Room[]) => void;
  selectRoom: (room: Room) => void;
  addLiveToRoom: (roomId: string, live: Live) => void;
  removeLiveFromRoom: (roomId: string, liveId: string) => void;
}

export const useLiveStore = create<LiveStore>((set) => ({
  lives: [],
  rooms: [],
  selectedRoom: null,
  addLive: (live: Live) => set((state) => ({ lives: [...state.lives, live] })),
  removeLive: (id: string) => set((state) => ({ lives: state.lives.filter((l) => l.id !== id) })),
  setLives: (lives: Live[]) => set({ lives }),
  setRooms: (rooms: Room[]) => set({ rooms }),
  selectRoom: (room: Room) => set({ selectedRoom: room }),
  addLiveToRoom: (roomId: string, live: Live) =>
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId ? { ...r, liveIds: [...r.liveIds, live.id] } : r,
      ),
    })),
  removeLiveFromRoom: (roomId: string, liveId: string) =>
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId ? { ...r, liveIds: r.liveIds.filter((id) => id !== liveId) } : r,
      ),
    })),
}));
