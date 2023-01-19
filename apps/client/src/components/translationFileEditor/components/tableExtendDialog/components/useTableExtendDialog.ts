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
    inputAddingKey,
  } = useTranslationFileEditorContext();

  const handleClickAdd = () => {
    onAdd(inputAddingKey.value);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAdd(inputAddingKey.value);
  };

  useEffect(() => {
    document.body.style.overflowY = visible ? 'hidden' : 'initial';
  }, [visible]);

  const disabledYes = {
    row: !inputAddingKey.value,
    column: true,
  }[type];

  return {
    handleFormSubmit,
    handleClickAdd,
    disabledYes,
  };
}

export default useTableExtendDialog;
