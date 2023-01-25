import { LocaleDirectoryCreationDialogProps } from '@components/localeDirectoryCreationDialog';
import { FormEventHandler, MouseEventHandler, useEffect } from 'react';
import useDropdown, { IUseDropdown } from '@hooks/common/useDropdown';
import { LanguageCode } from 'i18n-editor-common';
import useInput, { IUseInput } from '@hooks/common/useInput';

export interface IUseLocaleDirectoryCreationDialogParams extends LocaleDirectoryCreationDialogProps {}

export interface IUseLocaleDirectoryCreationDialog {
  dropdownLanguageCode: IUseDropdown;
  inputFileName: IUseInput;
  inputDisabled: boolean;
  creationDisabled: boolean;
  handleCreateButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

function useLocaleDirectoryCreationDialog(params: IUseLocaleDirectoryCreationDialogParams): IUseLocaleDirectoryCreationDialog {
  const { visible, onCreate } = params;

  const dropdownLanguageCode = useDropdown<LanguageCode>({});
  const inputFileName = useInput({});

  const createDirectory = () => {
    onCreate({
      directoryName: dropdownLanguageCode.value,
      fileName: inputFileName.value,
    });
  };

  const handleCreateButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    createDirectory();
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createDirectory();
  };

  useEffect(() => {
    if (!visible) {
      dropdownLanguageCode.clear();
      inputFileName.clear();
    }
  }, [visible]);

  const inputDisabled = !dropdownLanguageCode.value;
  const creationDisabled = !(dropdownLanguageCode.value && inputFileName.value);

  return {
    dropdownLanguageCode,
    inputFileName,
    inputDisabled,
    creationDisabled,
    handleCreateButtonClick,
    handleFormSubmit,
  };
}

export default useLocaleDirectoryCreationDialog;
