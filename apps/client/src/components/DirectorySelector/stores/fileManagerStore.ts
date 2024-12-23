import { createPopoverStore } from '@stores/factories/popover';

export type FileManagerViewType = 'list' | 'table';

interface FileManagerStore {
  viewType: FileManagerViewType;
  path: string | undefined;
  pathHistory: {
    backward: string[];
    forward: string[];
  };
  searchMode: boolean;
  searchKeyword: string;
  setViewType: (viewType: FileManagerViewType) => void;
  movePathTo: (path: string) => void;
  moveForward: () => void;
  moveBackward: () => void;
  startSearch: () => void;
  finishSearch: () => void;
  setSearchKeyword: (keyword: string) => void;
}

const getPoppedList = <T>(list: Array<T>): T[] => list.slice(0, list.length - 1);

export const useFileManagerStore = createPopoverStore<FileManagerStore>((set) => ({
  viewType: 'table',

  path: undefined,

  pathHistory: {
    backward: [],
    forward: [],
  },

  searchMode: false,

  searchKeyword: '',

  setViewType: (viewType) => set({ viewType }),

  movePathTo: (path) => {
    set((state) => {
      const {
        path: prevPath,
        pathHistory: { backward },
      } = state;

      return {
        ...state,
        path,
        pathHistory: {
          backward: [...backward, prevPath!],
          forward: [],
        },
      };
    });
  },

  moveBackward: () => {
    set((state) => {
      const {
        path: prevPath,
        pathHistory: { backward, forward },
      } = state;

      const path = backward[backward.length - 1];

      return {
        ...state,
        path,
        pathHistory: {
          backward: getPoppedList(backward),
          forward: [...forward, prevPath!],
        },
      };
    });
  },

  moveForward: () => {
    set((state) => {
      const {
        path: prevPath,
        pathHistory: { backward, forward },
      } = state;

      const path = forward[forward.length - 1];

      return {
        ...state,
        path,
        pathHistory: {
          backward: [...backward, prevPath!],
          forward: getPoppedList(forward),
        },
      };
    });
  },

  startSearch: () => set({ searchMode: true }),

  finishSearch: () => set({ searchMode: false, searchKeyword: '' }),

  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
}));
