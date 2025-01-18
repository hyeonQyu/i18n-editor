import useConfig from '@hooks/config/useConfig';
import useInitialPath from '@hooks/file-system/useInitialPath';
import { useWorkspaceStore } from '@stores/workspace';
import { useEffect } from 'react';

function useInitPath() {
  const { path, setPath } = useWorkspaceStore();

  const config = useConfig();
  const initialPath = useInitialPath();

  useEffect(() => {
    if (path) return;

    if (config) {
      setPath(config.localeDirectoryPath);
      return;
    }

    if (initialPath) {
      setPath(initialPath);
    }
  }, [path, config, initialPath, setPath]);
}

export default useInitPath;
