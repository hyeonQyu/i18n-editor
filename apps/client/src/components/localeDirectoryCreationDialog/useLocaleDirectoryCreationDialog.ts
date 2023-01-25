import { LocaleDirectoryCreationDialogProps } from '@components/localeDirectoryCreationDialog';
import { FormEventHandler, MouseEventHandler, useEffect } from 'react';
import useDropdown, { IUseDropdown } from '@hooks/common/useDropdown';
import { LanguageCode } from 'i18n-editor-common';

export interface IUseLocaleDirectoryCreationDialogParams extends LocaleDirectoryCreationDialogProps {}

export interface IUseLocaleDirectoryCreationDialog {
  dropdownLanguageCode: IUseDropdown;
  handleCreateButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

function useLocaleDirectoryCreationDialog(params: IUseLocaleDirectoryCreationDialogParams): IUseLocaleDirectoryCreationDialog {
  const { visible, onCreate } = params;

  const dropdownLanguageCode = useDropdown<LanguageCode>({});

  const handleCreateButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    onCreate(dropdownLanguageCode.value);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onCreate(dropdownLanguageCode.value);
  };

  useEffect(() => {
    if (!visible) {
      dropdownLanguageCode.clear();
    }
  }, [visible]);

  return {
    dropdownLanguageCode,
    handleCreateButtonClick,
    handleFormSubmit,
  };
}

export default useLocaleDirectoryCreationDialog;
