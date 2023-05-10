import { SelectItem } from 'primereact/selectitem';
import { FormEventHandler, MouseEventHandler, useEffect } from 'react';
import { TableExtendDialogProps } from '@components/translationFileEditor/components/tableExtendDialog';
import { useRecoilState, useRecoilValue } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { LABELS_BY_TABLE_EXTEND_TYPE, LANGUAGE_SELECT_OPTIONS } from '@components/translationFileEditor/defines';
import useMultiSelect, { UseMultiSelect } from '@hooks/common/useMultiSelect';

export interface UseTableExtendDialogParams extends TableExtendDialogProps {}

export interface UseTableExtendDialog {
  disabledYes: boolean;
  languageSelectOptions: SelectItem[];
  inputAddingKey: IUseInput;
  multiSelectAddingLanguageCode: UseMultiSelect;
  handleClickAdd: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

export default function useTableExtendDialog(params: UseTableExtendDialogParams): UseTableExtendDialog {
  const {} = params;

  const [{ type, visible, onAddKey, onAddLanguageCodes }, setTableExtendDialogData] = useRecoilState(
    translationFileEditorStates.tableExtendDialogData,
  );
  const columns = useRecoilValue(translationFileEditorStates.columns);

  const inputAddingKey = useInput({
    onChangeValue() {
      setTableExtendDialogData((prev) => ({
        ...prev,
        invalid: false,
        ...LABELS_BY_TABLE_EXTEND_TYPE[prev.type],
      }));
    },
  });

  const multiSelectAddingLanguageCode = useMultiSelect({});

  const value = {
    row: inputAddingKey.value,
    column: multiSelectAddingLanguageCode.value,
  }[type];

  const clear = {
    row: inputAddingKey.clear,
    column: multiSelectAddingLanguageCode.clear,
  }[type];

  const onAdd = {
    row: onAddKey,
    column: onAddLanguageCodes,
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
    inputAddingKey,
    multiSelectAddingLanguageCode,
    handleFormSubmit,
    handleClickAdd,
  };
}
