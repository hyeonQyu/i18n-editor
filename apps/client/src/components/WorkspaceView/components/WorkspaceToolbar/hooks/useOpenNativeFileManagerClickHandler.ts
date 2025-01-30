import useOpenNativeFileManager from '@hooks/useOpenNativeFileManager';
import useWorkspace from '@hooks/workspace/useWorkspace';

function useOpenNativeFileManagerClickHandler() {
  const workspace = useWorkspace();

  const openFileManager = useOpenNativeFileManager();

  return () => {
    if (!workspace?.path) return;
    openFileManager({ path: workspace.path });
  };
}

export default useOpenNativeFileManagerClickHandler;
