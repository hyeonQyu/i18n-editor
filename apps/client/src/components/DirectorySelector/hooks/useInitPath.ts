import useConfig from '@hooks/config/useConfig';
import { usePathStore } from '@stores/pathStore';
import { useEffect } from 'react';

function useInitPath() {
  const { path, setPath } = usePathStore();

  const config = useConfig();

  useEffect(() => {
    if (path) return;
    if (!config) return;

    setPath(config.localeDirectoryPath);
  }, [path, config, setPath]);
}

export default useInitPath;
