import { useRecoilState, useRecoilValue } from 'recoil';
import { translationFileSelectorStates } from '@components/translationFileSelector/stores/store';
import { TranslationFileCreationDialogProps } from '@components/translationFileCreationDialog/TranslationFileCreationDialog';
import { useToastContext } from '@contexts/toastContext';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useMutationPostTranslationFile from '@hooks/queries/useMutationPostTranslationFile';
import { localeDirectoryPathState } from '@stores/store';
import { QUERY_KEY } from '@defines/reactQuery';
import { ErrorMessage } from 'i18n-editor-common';

export interface UseTranslationFileCreationDialogParams extends TranslationFileCreationDialogProps {}

export interface UseTranslationFileCreationDialog {
  visible: boolean;
  creationDisabled: boolean;
  inputTranslationFileName: IUseInput;
  duplicated: boolean;
  labelMessage: string;
  handleCreateButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleHide: () => void;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

export default function useTranslationFileCreationDialog(params: UseTranslationFileCreationDialogParams): UseTranslationFileCreationDialog {
  const {} = params;

  const queryClient = useQueryClient();
  const { toastRef } = useToastContext();

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const [visible, setVisible] = useRecoilState(translationFileSelectorStates.translationFileCreationDialogOpened);
  const [duplicated, setDuplicated] = useState(false);

  const inputTranslationFileName = useInput({
    onChangeValue() {
      setDuplicated(false);
    },
  });

  const { mutate: mutatePostTranslationFile } = useMutationPostTranslationFile({});

  const createTranslationFile = () => {
    mutatePostTranslationFile(
      {
        path: localeDirectoryPath!,
        fileName: `${inputTranslationFileName.value}.json`,
      },
      {
        async onSuccess() {
          await queryClient.invalidateQueries(QUERY_KEY.translationFile.base);

          toastRef.current?.show({
            severity: 'success',
            detail: '새로운 번역 파일을 생성했어요',
            life: 3000,
          });

          setVisible(false);
        },
        onError(error) {
          if ((error.response?.data.errorMessage as ErrorMessage) === 'EXIST_FILE_NAME') {
            setDuplicated(true);
          }
        },
      },
    );
  };

  const handleCreateButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    createTranslationFile();
  };

  const handleHide = () => {
    setVisible(false);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createTranslationFile();
  };

  useEffect(() => {
    document.body.style.overflowY = visible ? 'hidden' : 'initial';

    if (!visible) {
      inputTranslationFileName.clear();
    }
  }, [visible]);

  const creationDisabled = !inputTranslationFileName.value;
  const labelMessage = duplicated ? '동일한 이름을 가진 파일이 있어요' : '새로 생성할 번역 파일 이름을 입력하세요';

  return {
    visible,
    creationDisabled,
    inputTranslationFileName,
    duplicated,
    labelMessage,
    handleCreateButtonClick,
    handleHide,
    handleFormSubmit,
  };
}
