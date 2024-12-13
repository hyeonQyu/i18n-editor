import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';

function useFileManagerDialogCloseHandler() {
  const close = useFileManagerDialogStore(({ close }) => close);
  return () => close(({ viewType, directoryOnly }) => ({ viewType, directoryOnly }));
}

export default useFileManagerDialogCloseHandler;
