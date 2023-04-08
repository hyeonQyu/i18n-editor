import { TranslationFileCreationDialogBeforeProps } from '@components/translationFileCreationDialog/TranslationFileCreationDialogBefore';
import { FormEventHandler, MouseEventHandler, useEffect } from 'react';

export interface UseTranslationFileCreationDialogBeforeParams extends TranslationFileCreationDialogBeforeProps {}

export interface UseTranslationFileCreationDialog {
  creationDisabled: boolean;
  labelMessage: string;
  handleCreateButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * @deprecated TODO 제거
 * @param params
 */
export default function useTranslationFileCreationDialogBefore(
  params: UseTranslationFileCreationDialogBeforeParams,
): UseTranslationFileCreationDialog {
  const { visible, isDuplicate, inputTranslationFileName, onCreate } = params;

  const createTranslationFile = () => {
    onCreate({
      fileName: inputTranslationFileName.value,
    });
  };

  const handleCreateButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    createTranslationFile();
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
  const labelMessage = isDuplicate ? '동일한 이름을 가진 파일이 있어요' : '새로 생성할 번역 파일 이름을 입력하세요';

  return {
    creationDisabled,
    labelMessage,
    handleCreateButtonClick,
    handleFormSubmit,
  };
}
