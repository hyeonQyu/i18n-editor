import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';

export const useFileManagerDialogCloseHandler = () => {
  const close = useFileManagerDialogStore((state) => state.close);
  return () => close(({ viewType, directoryOnly }) => ({ viewType, directoryOnly }));
};
