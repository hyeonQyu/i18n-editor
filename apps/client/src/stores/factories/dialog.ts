import { getDefaultActionHandler, PortalActionHandler } from '@defines/portal';
import { create } from 'zustand/react';
import { StateCreator } from 'zustand/vanilla';

type DialogActionHandler<T extends object> = PortalActionHandler<DialogStore<T>>;

type DialogStore<T extends object> = T & {
  opened: boolean;
  open: (onOpen?: DialogActionHandler<T>) => void;
  close: (onClose?: DialogActionHandler<T>) => void;
};

export const createDialogStore = <T extends object>(extendState: StateCreator<T>) => {
  const defaultActionHandler = getDefaultActionHandler<DialogStore<T>>();

  return create<DialogStore<T>>((set, get, api) => {
    const extend = extendState(set, get, api);
    const initialState = { ...extend };

    return {
      opened: false,

      open: (onOpen = defaultActionHandler) =>
        set((prev) => ({
          ...prev,
          ...onOpen(prev),
          opened: true,
        })),

      close: (onClose = defaultActionHandler) =>
        set((prev) => ({
          ...prev,
          ...initialState,
          ...onClose(prev),
          opened: false,
        })),
      ...extendState(set, get, api),
    };
  });
};
