import { FormEventHandler, MouseEventHandler, useEffect } from 'react';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface IUseTableExtendDialogParams {}

export interface IUseTableExtendDialog {
  handleClickAdd: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
  disabledYes: boolean;
}

function useTableExtendDialog(params: IUseTableExtendDialogParams): IUseTableExtendDialog {
  const {} = params;
  const {
    tableExtendDialogData: { type, visible, onAdd },
    dropdownAddingLanguageCode,
    inputAddingKey,
  } = useTranslationFileEditorContext();

  const value = {
    row: inputAddingKey.value,
    column: dropdownAddingLanguageCode.value,
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
  }, [visible]);

  const disabledYes = !value;

  return {
    handleFormSubmit,
    handleClickAdd,
    disabledYes,
  };
}

export default useTableExtendDialog;
