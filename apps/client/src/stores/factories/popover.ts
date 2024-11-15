import { create } from 'zustand/react';

interface PopoverStore {
  anchorElement: HTMLElement | null;
  open: (element: HTMLElement) => void;
  close: () => void;
}

export const createPopoverStore = () =>
  create<PopoverStore>((set) => ({
    anchorElement: null,
    open: (element) => set({ anchorElement: element }),
    close: () => set({ anchorElement: null }),
  }));
