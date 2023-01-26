import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { FormEventHandler } from 'react';

export interface IUseNewTranslationAdderParams {}

export interface IUseNewTranslationAdder {
  isFiltered: boolean;
  inputTranslationKey: IUseInput;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

function useNewTranslationAdder(params: IUseNewTranslationAdderParams): IUseNewTranslationAdder {
  const {} = params;
  const { rows, inputFilter, onAddNewTranslationKey } = useTranslationFileEditorContext();
  const inputTranslationKey = useInput({});

  const isFiltered = Boolean(inputFilter.value && rows?.length);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAddNewTranslationKey(inputTranslationKey.value);
  };

  return {
    isFiltered,
    inputTranslationKey,
    handleFormSubmit,
  };
}

export default useNewTranslationAdder;
