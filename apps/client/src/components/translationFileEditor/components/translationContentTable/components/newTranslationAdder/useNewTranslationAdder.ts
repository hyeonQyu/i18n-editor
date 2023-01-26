import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { FormEventHandler, MouseEventHandler } from 'react';

export interface IUseNewTranslationAdderParams {}

export interface IUseNewTranslationAdder {
  isFiltered: boolean;
  inputTranslationKey: IUseInput;
  handleAddClick: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

function useNewTranslationAdder(params: IUseNewTranslationAdderParams): IUseNewTranslationAdder {
  const {} = params;
  const { inputFilter, onAddNewTranslationKey } = useTranslationFileEditorContext();
  const inputTranslationKey = useInput({});

  const isFiltered = Boolean(inputFilter.value);

  const handleAddClick: MouseEventHandler<HTMLButtonElement> = () => {
    onAddNewTranslationKey(inputTranslationKey.value);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAddNewTranslationKey(inputTranslationKey.value);
  };

  return {
    isFiltered,
    inputTranslationKey,
    handleAddClick,
    handleFormSubmit,
  };
}

export default useNewTranslationAdder;
