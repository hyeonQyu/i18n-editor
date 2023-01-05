import { FocusEventHandler, MouseEventHandler, RefObject, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { DirectorySelectorProps } from '@components/directorySelector/DirectorySelector';
import { useToastContext } from '@contexts/toastContext';
import { DirectorySelectorEventHandler } from '@components/directorySelector/defines';

export interface IUseDirectorySelectorParams extends DirectorySelectorProps {}

export interface IUseDirectorySelector {
  fileExplorerRef: RefObject<OverlayPanel>;
  isFileExplorerOpened: boolean;
  handleSelectClick: MouseEventHandler<HTMLButtonElement>;
  handleFocus: FocusEventHandler<HTMLInputElement>;
  handleCopyClick: MouseEventHandler<HTMLButtonElement>;
  handleFileExplorerShow: DirectorySelectorEventHandler;
  handleFileExplorerHide: DirectorySelectorEventHandler;
}

function useDirectorySelector(params: IUseDirectorySelectorParams): IUseDirectorySelector {
  const { path } = params;

  const fileExplorerRef = useRef<OverlayPanel>(null);
  const { toastRef } = useToastContext();

  const [isFileExplorerOpened, setIsFileExplorerOpened] = useState(false);

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
      detail: '클립보드에 복사되었어요',
    });
  };

  const handleFileExplorerShow: DirectorySelectorEventHandler = () => {
    setIsFileExplorerOpened(true);
  };

  const handleFileExplorerHide: DirectorySelectorEventHandler = () => {
    setIsFileExplorerOpened(false);
  };

  return {
    fileExplorerRef,
    isFileExplorerOpened,
    handleSelectClick,
    handleFocus,
    handleCopyClick,
    handleFileExplorerShow,
    handleFileExplorerHide,
  };
}

export default useDirectorySelector;
