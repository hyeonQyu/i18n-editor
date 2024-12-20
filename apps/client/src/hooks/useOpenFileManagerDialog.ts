import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';

function useOpenFileManagerDialog() {
  const open = useFileManagerDialogStore(({ open }) => open);

  return (path: string, onConfirm: (path: string) => Promise<void>) => open(() => ({ path, onConfirm }));
}

export default useOpenFileManagerDialog;
