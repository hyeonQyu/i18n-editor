import { LocaleDirectoryCreationDialogProps } from './index';
import useInput, { IUseInput } from '../../hooks/common/useInput';
import useMultiSelect, { UseMultiSelect } from '../../hooks/common/useMultiSelect';
import { LanguageCode } from 'i18n-editor-common';
import { FormEventHandler, MouseEventHandler, useEffect } from 'react';

/**
 * @deprecated
 */
export interface IUseLocaleDirectoryCreationDialogParams extends LocaleDirectoryCreationDialogProps {}

/**
 * @deprecated
 */
export interface IUseLocaleDirectoryCreationDialog {
  multiSelectLanguageCode: UseMultiSelect;
  inputFileName: IUseInput;
  inputDisabled: boolean;
  creationDisabled: boolean;
  handleCreateButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * @deprecated
 */
function useLocaleDirectoryCreationDialog(params: IUseLocaleDirectoryCreationDialogParams): IUseLocaleDirectoryCreationDialog {
  const { visible, onCreate } = params;

  const multiSelectLanguageCode = useMultiSelect<LanguageCode>({});
  const inputFileName = useInput({});

  const createDirectory = () => {
    onCreate({
      directoryNames: multiSelectLanguageCode.value,
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
      multiSelectLanguageCode.clear();
      inputFileName.clear();
    }
  }, [visible]);

  const inputDisabled = !multiSelectLanguageCode.value;
  const creationDisabled = !(multiSelectLanguageCode.value && inputFileName.value);

  return {
    multiSelectLanguageCode,
    inputFileName,
    inputDisabled,
    creationDisabled,
    handleCreateButtonClick,
    handleFormSubmit,
  };
}

export default useLocaleDirectoryCreationDialog;
