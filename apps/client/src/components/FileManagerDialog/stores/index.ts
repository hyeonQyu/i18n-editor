import { createDialogStore } from '@stores/factories/dialog';

export type FileManagerViewType = 'list' | 'table';

interface FileManagerDialogStore {
  viewType: FileManagerViewType;
  path: string | undefined;
  pathHistory: {
    backward: string[];
    forward: string[];
  };
  searchMode: boolean;
  searchKeyword: string;
  directoryOnly: boolean;
  onConfirm: (path: string) => Promise<void>;
  setViewType: (viewType: FileManagerViewType) => void;
  movePathTo: (path: string) => void;
  moveForward: () => void;
  moveBackward: () => void;
  startSearch: () => void;
  finishSearch: () => void;
  setSearchKeyword: (keyword: string) => void;
  setDirectoryOnly: (directoryOnly: boolean) => void;
}

export const useFileManagerDialogStore = createDialogStore<FileManagerDialogStore>((set) => {
  const getPoppedList = <T>(list: Array<T>): T[] => list.slice(0, list.length - 1);

  return {
    viewType: 'table',

    path: undefined,

    pathHistory: {
      backward: [],
      forward: [],
    },

    searchMode: false,

    searchKeyword: '',

    directoryOnly: false,

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

    setDirectoryOnly: (directoryOnly) => set({ directoryOnly }),
  };
});
