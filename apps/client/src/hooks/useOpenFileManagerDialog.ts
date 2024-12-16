import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';

function useOpenFileManagerDialog() {
  const open = useFileManagerDialogStore(({ open }) => open);

  return (path: string) => open(() => ({ path }));
}

export default useOpenFileManagerDialog;
