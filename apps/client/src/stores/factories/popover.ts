import { create } from 'zustand/react';
import { StateCreator } from 'zustand/vanilla';

type PopoverActionHandler<T extends object> = (state: PopoverStore<T>) => Partial<PopoverStore<T>>;

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

  return create<PopoverStore<T>>((set, get, api) => {
    const extend = extendState(set, get, api);
    const initialState = { ...extend };

    return {
      anchorElement: null,

      open: (element, onOpen = defaultActionHandler) => {
        set((prev) => ({
          ...prev,
          ...onOpen(prev),
          anchorElement: element,
        }));
      },

      close: (onClose = defaultActionHandler) => {
        set((prev) => ({
          ...prev,
          ...initialState,
          ...onClose(prev),
          anchorElement: null,
        }));
      },

      ...extendState(set, get, api),
    };
  });
};
