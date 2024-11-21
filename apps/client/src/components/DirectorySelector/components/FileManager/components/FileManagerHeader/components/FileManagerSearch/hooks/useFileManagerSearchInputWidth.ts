import {
  FILE_MANAGER_HEADER_GAP,
  FILE_MANAGER_SEARCH_ICON_WIDTH,
} from '@components/DirectorySelector/components/FileManager/defines/sizes';
import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';

function useFileManagerSearchInputWidth() {
  const searchMode = useFileManagerStore(({ searchMode }) => searchMode);
  return searchMode ? `calc(100% - ${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP}px)` : 0;
}

export default useFileManagerSearchInputWidth;
