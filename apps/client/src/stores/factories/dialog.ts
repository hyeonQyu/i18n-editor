import { create } from 'zustand/react';
import { StateCreator } from 'zustand/vanilla';

type DialogStore<T extends object> = T & {
  opened: boolean;
  open: () => void;
  close: () => void;
};

export const createDialogStore = <T extends object>(extendState: StateCreator<T>) => {
  return create<DialogStore<T>>((set, get, api) => {
    const extend = extendState(set, get, api);
    const initialState = { ...extend };

    return {
      opened: false,
      open: () => set((prev) => ({ ...prev, opened: true })),
      close: () => set((prev) => ({ ...prev, ...initialState, opened: false })),
      ...extendState(set, get, api),
    };
  });
};
