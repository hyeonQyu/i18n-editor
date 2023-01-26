import { TranslationFileCreationDialogProps } from '@components/translationFileCreationDialog/TranslationFileCreationDialog';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { FormEventHandler, MouseEventHandler, useEffect } from 'react';

export interface UseTranslationFileCreationDialogParams extends TranslationFileCreationDialogProps {}

export interface UseTranslationFileCreationDialog {
  inputFileName: IUseInput;
  creationDisabled: boolean;
  handleCreateButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

export default function useTranslationFileCreationDialog(params: UseTranslationFileCreationDialogParams): UseTranslationFileCreationDialog {
  const { visible, onCreate } = params;

  const inputFileName = useInput({});

  const createTranslationFile = () => {
    onCreate({
      fileName: inputFileName.value,
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
    if (!visible) {
      inputFileName.clear();
    }
  }, [visible]);

  const creationDisabled = !inputFileName.value;

  return {
    inputFileName,
    creationDisabled,
    handleCreateButtonClick,
    handleFormSubmit,
  };
}
