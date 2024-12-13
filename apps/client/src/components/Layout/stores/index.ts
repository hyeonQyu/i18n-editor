import { create } from 'zustand/react';

interface LayoutStore {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  sidebarOpened: false,
  toggleSidebar: () => set(({ sidebarOpened }) => ({ sidebarOpened: !sidebarOpened })),
}));
