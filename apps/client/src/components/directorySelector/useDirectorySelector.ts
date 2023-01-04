import { FocusEventHandler, MouseEventHandler, RefObject, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { DirectorySelectorProps } from '@components/directorySelector/DirectorySelector';
import { useToastContext } from '@contexts/toastContext';

export interface IUseDirectorySelectorParams extends DirectorySelectorProps {}

export interface IUseDirectorySelector {
  fileExplorerRef: RefObject<OverlayPanel>;
  handleSelectClick: MouseEventHandler<HTMLButtonElement>;
  handleFocus: FocusEventHandler<HTMLInputElement>;
  handleCopyClick: MouseEventHandler<HTMLButtonElement>;
}

function useDirectorySelector(params: IUseDirectorySelectorParams): IUseDirectorySelector {
  const { path } = params;

  const fileExplorerRef = useRef<OverlayPanel>(null);
  const { toastRef } = useToastContext();

  const handleSelectClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    fileExplorerRef.current?.toggle(e);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.blur();
  };

  const handleCopyClick: MouseEventHandler<HTMLButtonElement> = async () => {
    await navigator.clipboard.writeText(path);
    toastRef.current?.show({
      severity: 'info',
      detail: '클립보드로 복사되었어요',
    });
  };

  return {
    fileExplorerRef,
    handleSelectClick,
    handleFocus,
    handleCopyClick,
  };
}

export default useDirectorySelector;
