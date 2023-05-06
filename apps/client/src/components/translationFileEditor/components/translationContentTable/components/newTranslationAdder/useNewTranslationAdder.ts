import { useRecoilValue } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { FormEventHandler } from 'react';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { NewTranslationAdderProps } from '@components/translationFileEditor/components/translationContentTable/components/newTranslationAdder/NewTranslationAdder';
import useAddRow from '@components/translationFileEditor/hooks/useAddRow';

export interface UseNewTranslationAdderParams extends NewTranslationAdderProps {}

export interface UseNewTranslationAdder {
  isFiltered: boolean;
  inputTranslationKey: IUseInput;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

export default function useNewTranslationAdder(params: UseNewTranslationAdderParams): UseNewTranslationAdder {
  const {} = params;

  const inputFilterValue = useRecoilValue(translationFileEditorStates.filterValue);
  const rows = useRecoilValue(translationFileEditorStates.rows);

  const inputTranslationKey = useInput({});

  const isFiltered = Boolean(inputFilterValue && rows.length);

  const { addRow } = useAddRow({});

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addRow(inputTranslationKey.value);
  };

  return {
    isFiltered,
    inputTranslationKey,
    handleFormSubmit,
  };
}
