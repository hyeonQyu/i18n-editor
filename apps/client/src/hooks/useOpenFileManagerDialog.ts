import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import { useWorkspaceStore } from '@stores/workspace';

function useOpenFileManagerDialog() {
  const path = useWorkspaceStore(({ path }) => path);

  const open = useFileManagerDialogStore(({ open }) => open);

  return () =>
    open(() => ({
      path: path!,
    }));
}

export default useOpenFileManagerDialog;
