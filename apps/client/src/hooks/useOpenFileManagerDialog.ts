import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import { useGlobalStore } from '@stores/globalStore';

function useOpenFileManagerDialog() {
  const path = useGlobalStore(({ path }) => path);

  const open = useFileManagerDialogStore(({ open }) => open);

  return () =>
    open(() => ({
      path: path!,
    }));
}

export default useOpenFileManagerDialog;
