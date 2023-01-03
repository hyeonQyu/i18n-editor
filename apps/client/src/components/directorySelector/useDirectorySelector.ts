import { FocusEventHandler, MouseEventHandler, RefObject, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

export interface IUseDirectorySelectorParams {}

export interface IUseDirectorySelector {
  fileExplorerRef: RefObject<OverlayPanel>;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  handleFocus: FocusEventHandler<HTMLInputElement>;
}

function useDirectorySelector(params: IUseDirectorySelectorParams): IUseDirectorySelector {
  const {} = params;

  const fileExplorerRef = useRef<OverlayPanel>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    fileExplorerRef.current?.toggle(e);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.blur();
  };

  return {
    fileExplorerRef,
    handleClick,
    handleFocus,
  };
}

export default useDirectorySelector;
