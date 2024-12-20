import { createPopoverStore } from '@stores/factories/popover';

export type FileManagerViewType = 'list' | 'table';

interface FileManagerStore {
  viewType: FileManagerViewType;
  path: string | undefined;
  pathHistory: {
    backward: string[];
    forward: string[];
  };
  setViewType: (viewType: FileManagerViewType) => void;
  movePathTo: (path: string) => void;
  moveForward: () => void;
  moveBackward: () => void;
}

export const useFileManagerStore = createPopoverStore<FileManagerStore>((set) => ({
  viewType: 'table',
  path: undefined,
  pathHistory: {
    backward: [],
    forward: [],
  },
  setViewType: (viewType) => set({ viewType }),
  movePathTo: (path) => set({ path }),
  moveBackward: () => {},
  moveForward: () => {},
}));
