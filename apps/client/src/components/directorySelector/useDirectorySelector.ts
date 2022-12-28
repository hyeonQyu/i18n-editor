import { MouseEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import useQueryGetDirectory from '@hooks/queries/useQueryGetDirectory';

export interface IUseDirectorySelectorParams {}

export interface IUseDirectorySelector {
  fileExplorerRef: RefObject<OverlayPanel>;
  path: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

function useDirectorySelector(params: IUseDirectorySelectorParams): IUseDirectorySelector {
  const {} = params;

  const fileExplorerRef = useRef<OverlayPanel>(null);

  const [path, setPath] = useState('');

  const { data, refetch: refetchGetDirectory } = useQueryGetDirectory({ req: { path } });
  const { path: currentPath, entries } = data?.data || { path: '', entries: [] };

  useEffect(() => {
    setPath(currentPath);
  }, [currentPath]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    fileExplorerRef.current?.toggle(e);
  };

  return {
    fileExplorerRef,
    path,
    handleClick,
  };
}

export default useDirectorySelector;
