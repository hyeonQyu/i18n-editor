import { createPopoverStore } from '@stores/factories/popover';

export type FileManagerViewType = 'list' | 'table';

interface FileManagerStore {
  viewType: FileManagerViewType;
}

export const useFileManagerStore = createPopoverStore<FileManagerStore>(() => ({
  viewType: 'table',
}));
