import {
  FILE_MANAGER_HEADER_GAP,
  FILE_MANAGER_SEARCH_ICON_WIDTH,
} from '@/components/FileManagerDialog/constants/fileManagerDialog.style.constants';
import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';

export const useFileManagerSearchInputWidth = () => {
  const searchMode = useFileManagerDialogStore(({ searchMode }) => searchMode);
  return searchMode ? `calc(100% - ${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP}px)` : 0;
};
