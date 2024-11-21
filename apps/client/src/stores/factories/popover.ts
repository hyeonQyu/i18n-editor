import { create } from 'zustand/react';
import { StateCreator } from 'zustand/vanilla';

type PopoverActionHandler<T extends object> = () => Partial<PopoverStore<T>>;

type PopoverStore<T extends object> = T & {
  anchorElement: HTMLElement | null;
  open: (element: HTMLElement, onOpen?: PopoverActionHandler<T>) => void;
  close: (onClose?: PopoverActionHandler<T>) => void;
};

const getDefaultActionHandler =
  <T extends object>(): PopoverActionHandler<T> =>
  () => ({});

export const createPopoverStore = <T extends object>(extendState: StateCreator<T>) => {
  const defaultActionHandler = getDefaultActionHandler<PopoverStore<T>>();

  return create<PopoverStore<T>>((set, get, api) => ({
    anchorElement: null,

    open: (element, onOpen = defaultActionHandler) => {
      set((prev) => ({
        ...prev,
        ...onOpen(),
        anchorElement: element,
      }));
    },

    close: (onClose = defaultActionHandler) => {
      set((prev) => ({
        ...prev,
        ...onClose(),
        anchorElement: null,
      }));
    },

    ...extendState(set, get, api),
  }));
};
