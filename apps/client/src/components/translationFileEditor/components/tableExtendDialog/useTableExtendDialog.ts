import { FormEventHandler, MouseEventHandler, useEffect } from 'react';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import { LANGUAGE_SELECT_OPTIONS } from '@components/translationFileEditor/defines';
import { SelectItem } from 'primereact/selectitem';

export interface IUseTableExtendDialogParams {}

export interface IUseTableExtendDialog {
  disabledYes: boolean;
  languageSelectOptions: SelectItem[];
  handleClickAdd: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

function useTableExtendDialog(params: IUseTableExtendDialogParams): IUseTableExtendDialog {
  const {} = params;
  const {
    columns = [],
    tableExtendDialogData: { type, visible, onAdd },
    dropdownAddingLanguageCode,
    inputAddingKey,
  } = useTranslationFileEditorContext();

  const value = {
    row: inputAddingKey.value,
    column: dropdownAddingLanguageCode.value,
  }[type];

  const clear = {
    row: inputAddingKey.clear,
    column: dropdownAddingLanguageCode.clear,
  }[type];

  const handleClickAdd = () => {
    onAdd(value);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAdd(value);
  };

  useEffect(() => {
    document.body.style.overflowY = visible ? 'hidden' : 'initial';

    if (!visible) {
      clear();
    }
  }, [visible]);

  const disabledYes = !value;

  const existLanguageSet = new Set(columns.map(({ header }) => header));
  const languageSelectOptions = LANGUAGE_SELECT_OPTIONS.map((option) => {
    return {
      ...option,
      disabled: existLanguageSet.has(option.value),
    };
  });

  return {
    disabledYes,
    languageSelectOptions,
    handleFormSubmit,
    handleClickAdd,
  };
}

export default useTableExtendDialog;
