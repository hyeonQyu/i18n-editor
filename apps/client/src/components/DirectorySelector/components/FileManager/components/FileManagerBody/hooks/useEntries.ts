import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import useDirectoryEntries from '@hooks/file-system/useDirectoryEntries';

function useEntries() {
  const path = useFileManagerStore(({ path }) => path) ?? '';

  return useDirectoryEntries(path);
}

export default useEntries;
