import { createPopoverStore } from '@stores/factories/popover';

export type FileManagerViewType = 'list' | 'table';

interface FileManagerStore {
  viewType: FileManagerViewType;
  setViewType: (viewType: FileManagerViewType) => void;
}

export const useFileManagerStore = createPopoverStore<FileManagerStore>((set) => ({
  viewType: 'table',
  setViewType: (viewType) => set({ viewType }),
}));
