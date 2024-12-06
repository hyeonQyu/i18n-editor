import { create } from 'zustand/react';
import { StateCreator } from 'zustand/vanilla';

interface PopoverStore {
  anchorElement: HTMLElement | null;
  open: (element: HTMLElement) => void;
  close: () => void;
}

export const createPopoverStore = <T extends object>(extendState: StateCreator<T>) => {
  return create<PopoverStore & T>((set, get, api) => ({
    anchorElement: null,
    open: (element) => set((prev) => ({ ...prev, anchorElement: element })),
    close: () => set((prev) => ({ ...prev, anchorElement: null })),
    ...extendState(set, get, api),
  }));
};
