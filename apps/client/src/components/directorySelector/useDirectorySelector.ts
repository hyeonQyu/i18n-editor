import { useToastContext } from '@contexts/toastContext';
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, RefObject, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menu } from 'primereact/menu';
import useQueryGetNativeFileExplorer from '@hooks/queries/useQueryGetNativeFileExplorer';
import { CustomEventHandler } from '@defines/event';
import { MenuItem } from 'primereact/menuitem';
import useQueryGetTranslationFile from '@hooks/queries/useQueryGetTranslationFile';
import { useRecoilValue } from 'recoil';
import { localeDirectoryCreationDialogOpenedState, localeDirectoryPathState } from '@stores/store';

export interface UseDirectorySelector {
  fileExplorerRef: RefObject<OverlayPanel>;
  menuRef: RefObject<Menu>;
  isFileExplorerOpened: boolean;
  menuItems: MenuItem[];
  invalid: boolean;
  handleOpenFileExplorerButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleInputFocus: FocusEventHandler<HTMLInputElement>;
  handleMenuClick: MouseEventHandler<HTMLButtonElement>;
  handleFileExplorerShow: CustomEventHandler;
  handleFileExplorerHide: CustomEventHandler;
}

export default function useDirectorySelector(): UseDirectorySelector {
  const { toastRef } = useToastContext();
  const fileExplorerRef = useRef<OverlayPanel>(null);
  const menuRef = useRef<Menu>(null);

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const localeDirectoryCreationDialogOpened = useRecoilValue(localeDirectoryCreationDialogOpenedState);

  const [isFileExplorerOpened, setIsFileExplorerOpened] = useState(false);

  // OS 파일 탐색기에서 locale directory 열기
  const { refetch: refetchGetFileExplorer } = useQueryGetNativeFileExplorer({
    req: {
      path: localeDirectoryPath || '',
    },
    queryOption: {
      enabled: false,
    },
  });

  // 번역 파일 목록 조회
  const { error: errorGetTranslationFile } = useQueryGetTranslationFile({
    req: {
      path: localeDirectoryPath!,
    },
    queryOption: {
      enabled: Boolean(localeDirectoryPath) && !localeDirectoryCreationDialogOpened,
    },
  });
  const invalid = Boolean(errorGetTranslationFile);

  // i18n-editor 파일 탐색기 열기 버튼 클릭
  const handleOpenFileExplorerButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    fileExplorerRef.current?.toggle(e);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = () => {};

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
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
        await navigator.clipboard.writeText(localeDirectoryPath!);
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
    invalid,
    handleOpenFileExplorerButtonClick,
    handleInputChange,
    handleInputFocus,
    handleMenuClick,
    handleFileExplorerShow,
    handleFileExplorerHide,
  };
}
