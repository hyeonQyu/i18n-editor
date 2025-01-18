import { useGlobalStore } from '@stores/global';
import { useWorkspaceStore } from '@stores/workspace';

function useSelectWorkspace() {
  const select = useGlobalStore(({ selectWorkspace }) => selectWorkspace);
  const setPath = useWorkspaceStore(({ setPath }) => setPath);

  return (path: string) => {
    select(path);
    setPath(path);
  };
}

export default useSelectWorkspace;
