import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import {
  FILE_MANAGER_HEADER_GAP,
  FILE_MANAGER_SEARCH_ICON_WIDTH,
} from '@components/DirectorySelector/components/FileManager/defines/sizes';

function useFileManagerSearchInputWidth() {
  const searchMode = useFileManagerSearchStore(({ searchMode }) => searchMode);
  return searchMode ? `calc(100% - ${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP}px)` : 0;
}

export default useFileManagerSearchInputWidth;
