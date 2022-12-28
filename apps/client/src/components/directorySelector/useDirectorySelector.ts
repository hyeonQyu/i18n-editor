import { MouseEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import useQueryGetDirectory from '@hooks/queries/useQueryGetDirectory';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';

export interface IUseDirectorySelectorParams {}

export interface IUseDirectorySelector {
  fileExplorerRef: RefObject<OverlayPanel>;
  path: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  handlePathChange: DirectorySelectorEventHandler<PathChangeEvent>;
}

function useDirectorySelector(params: IUseDirectorySelectorParams): IUseDirectorySelector {
  const {} = params;

  const fileExplorerRef = useRef<OverlayPanel>(null);

  const [path, setPath] = useState('');
  const [flagFetchGetDirectory, setFlagFetchGetDirectory] = useState(false);

  const { data, refetch: refetchGetDirectory } = useQueryGetDirectory({ req: { path } });
  const { path: currentPath, entries } = data?.data || { path: '', entries: [] };

  useEffect(() => {
    setPath(currentPath);
  }, [currentPath]);

  useEffect(() => {
    refetchGetDirectory();
  }, [flagFetchGetDirectory]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    fileExplorerRef.current?.toggle(e);
  };

  const handlePathChange: DirectorySelectorEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;

    setFlagFetchGetDirectory((prev) => {
      setPath(() => e.path);
      return !prev;
    });
  };

  return {
    fileExplorerRef,
    path,
    handleClick,
    handlePathChange,
  };
}

export default useDirectorySelector;
