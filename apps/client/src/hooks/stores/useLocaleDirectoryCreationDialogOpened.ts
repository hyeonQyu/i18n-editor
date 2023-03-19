import { useRecoilState } from 'recoil';
import { localeDirectoryCreationDialogOpenedState } from '@stores/store';
import { useCallback } from 'react';

export interface UseLocaleDirectoryCreationDialogOpened {
  localeDirectoryCreationDialogOpened: boolean;
  openLocaleDirectoryCreationDialog: () => void;
  closeLocaleDirectoryCreationDialog: () => void;
}

export default function useLocaleDirectoryCreationDialogOpened(): UseLocaleDirectoryCreationDialogOpened {
  const [localeDirectoryCreationDialogOpened, setLocaleDirectoryCreationDialogOpened] = useRecoilState(
    localeDirectoryCreationDialogOpenedState,
  );

  const openLocaleDirectoryCreationDialog = useCallback(() => {
    setLocaleDirectoryCreationDialogOpened(true);
  }, []);

  const closeLocaleDirectoryCreationDialog = useCallback(() => {
    setLocaleDirectoryCreationDialogOpened(false);
  }, []);

  return {
    localeDirectoryCreationDialogOpened,
    openLocaleDirectoryCreationDialog,
    closeLocaleDirectoryCreationDialog,
  };
}
