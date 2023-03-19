import { FocusEventHandler, MouseEventHandler, RefObject, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { DirectorySelectorBeforeProps } from '@components/directorySelector/DirectorySelectorBefore';
import { useToastContext } from '@contexts/toastContext';
import { CustomEventHandler } from '@defines/event';
import useQueryGetNativeFileExplorer from '@hooks/queries/useQueryGetNativeFileExplorer';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

export interface IUseDirectorySelectorParams extends DirectorySelectorBeforeProps {}

export interface IUseDirectorySelector {
  fileExplorerRef: RefObject<OverlayPanel>;
  menuRef: RefObject<Menu>;
  isFileExplorerOpened: boolean;
  menuItems: MenuItem[];
  handleSelectClick: MouseEventHandler<HTMLButtonElement>;
  handleFocus: FocusEventHandler<HTMLInputElement>;
  handleMenuClick: MouseEventHandler<HTMLButtonElement>;
  handleFileExplorerShow: CustomEventHandler;
  handleFileExplorerHide: CustomEventHandler;
}

/**
 * TODO 삭제
 * @deprecated
 * @param params
 */
function useDirectorySelectorBefore(params: IUseDirectorySelectorParams): IUseDirectorySelector {
  const { path } = params;

  const fileExplorerRef = useRef<OverlayPanel>(null);
  const { toastRef } = useToastContext();
  const menuRef = useRef<Menu>(null);

  const [isFileExplorerOpened, setIsFileExplorerOpened] = useState(false);

  const { refetch: refetchGetFileExplorer } = useQueryGetNativeFileExplorer({
    req: { path: path || '' },
    queryOption: {
      enabled: false,
    },
  });

  const handleSelectClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    fileExplorerRef.current?.toggle(e);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.blur();
  };

  const handleMenuClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    menuRef.current?.toggle(e);
  };

  const handleFileExplorerShow: CustomEventHandler = () => {
    setIsFileExplorerOpened(true);
  };

  const handleFileExplorerHide: CustomEventHandler = () => {
    setIsFileExplorerOpened(false);
  };

  const menuItems: MenuItem[] = [
    {
      label: '디렉토리 열기',
      icon: 'pi pi-folder-open',
      async command() {
        await refetchGetFileExplorer();
      },
    },
    {
      label: '디렉토리 경로 복사',
      icon: 'pi pi-clone',
      async command() {
        await navigator.clipboard.writeText(path!);
        toastRef.current?.show({
          severity: 'info',
          detail: '클립보드에 복사되었어요',
        });
      },
    },
  ];

  return {
    fileExplorerRef,
    menuRef,
    isFileExplorerOpened,
    menuItems,
    handleSelectClick,
    handleFocus,
    handleMenuClick,
    handleFileExplorerShow,
    handleFileExplorerHide,
  };
}

export default useDirectorySelectorBefore;
