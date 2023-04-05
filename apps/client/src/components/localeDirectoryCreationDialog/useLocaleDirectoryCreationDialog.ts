import useMultiSelect, { UseMultiSelect } from '@hooks/common/useMultiSelect';
import { LanguageCode } from 'i18n-editor-common';
import useInput, { IUseInput } from '@hooks/common/useInput';
import useMutationPostDirectory from '@hooks/queries/useMutationPostDirectory';
import { useRecoilState, useRecoilValue } from 'recoil';
import { localeDirectoryCreationDialogOpenedState, localeDirectoryPathState } from '@stores/store';
import { useToastContext } from '@contexts/toastContext';
import { FormEventHandler, MouseEventHandler, useEffect } from 'react';

export interface UseLocaleDirectoryCreationDialogParams {}

export interface UseLocaleDirectoryCreationDialog {
  visible: boolean;
  multiSelectLanguageCode: UseMultiSelect;
  inputFileName: IUseInput;
  inputDisabled: boolean;
  creationDisabled: boolean;
  handleCreateButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleCloseButtonClick: () => void;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

export default function useLocaleDirectoryCreationDialog(params: UseLocaleDirectoryCreationDialogParams): UseLocaleDirectoryCreationDialog {
  const {} = params;

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const [localeDirectoryCreationDialogOpened, setLocaleDirectoryCreationDialogOpened] = useRecoilState(
    localeDirectoryCreationDialogOpenedState,
  );

  const { toastRef } = useToastContext();

  const multiSelectLanguageCode = useMultiSelect<LanguageCode>({});
  const inputFileName = useInput({});

  const { mutate: mutatePostDirectory } = useMutationPostDirectory({});

  const createDirectory = () => {
    mutatePostDirectory(
      {
        path: localeDirectoryPath!,
        fileName: inputFileName.value,
        directoryNames: multiSelectLanguageCode.value,
      },
      {
        onSettled() {
          setLocaleDirectoryCreationDialogOpened(false);
        },
        onSuccess({ data }) {
          if (!data) return;

          toastRef.current?.show({
            severity: 'success',
            detail: '디렉토리와 파일을 생성했어요',
            life: 3000,
          });
        },
      },
    );
  };

  const handleCreateButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    createDirectory();
  };

  const handleCloseButtonClick = () => {
    toastRef.current?.show({
      severity: 'error',
      detail: 'Locale 디렉토리를 다시 선택하세요',
      life: 3000,
    });

    setLocaleDirectoryCreationDialogOpened(false);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createDirectory();
  };

  useEffect(() => {
    if (!localeDirectoryCreationDialogOpened) {
      multiSelectLanguageCode.clear();
      inputFileName.clear();
    }
  }, [localeDirectoryCreationDialogOpened]);

  const inputDisabled = !multiSelectLanguageCode.value;
  const creationDisabled = !(multiSelectLanguageCode.value && inputFileName.value);

  return {
    visible: localeDirectoryCreationDialogOpened,
    multiSelectLanguageCode,
    inputFileName,
    inputDisabled,
    creationDisabled,
    handleCreateButtonClick,
    handleCloseButtonClick,
    handleFormSubmit,
  };
}
