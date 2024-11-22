import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';

function useCloseFileManager() {
  const close = useFileManagerStore(({ close }) => close);

  return () => close(({ viewType, directoryOnly }) => ({ viewType, directoryOnly }));
}

export default useCloseFileManager;
