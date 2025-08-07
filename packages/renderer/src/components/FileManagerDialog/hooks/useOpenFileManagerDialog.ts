import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';

export const useOpenFileManagerDialog = () => {
  const open = useFileManagerDialogStore((state) => state.open);
  return (path: string, onConfirm: (path: string) => Promise<void>) => open(() => ({ path, onConfirm }));
};
