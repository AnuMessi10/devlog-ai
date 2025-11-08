import { create } from 'zustand';

type SessionUser = {
    id: string;
    email: string;
    name: string | null;
};

type SessionState = {
    user: SessionUser | null;
    setUser: (user: SessionUser | null) => void;
    clear: () => void;
};

export const useSessionStore = create<SessionState>(set => ({
    user: null,
    setUser: user => set({ user }),
    clear: () => set({ user: null }),
}));
