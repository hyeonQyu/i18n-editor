import { MouseEventHandler, RefObject, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

export interface IUseDirectorySelectorParams {}

export interface IUseDirectorySelector {
  fileExplorerRef: RefObject<OverlayPanel>;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

function useDirectorySelector(params: IUseDirectorySelectorParams): IUseDirectorySelector {
  const {} = params;

  const fileExplorerRef = useRef<OverlayPanel>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    fileExplorerRef.current?.toggle(e);
  };

  return {
    fileExplorerRef,
    handleClick,
  };
}

export default useDirectorySelector;
