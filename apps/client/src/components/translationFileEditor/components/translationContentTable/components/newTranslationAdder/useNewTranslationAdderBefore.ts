import { useTranslationFileEditorContextBefore } from '@components/translationFileEditor/contexts/translationFileEditorContextBefore';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { FormEventHandler } from 'react';

export interface IUseNewTranslationAdderParamsBefore {}

export interface IUseNewTranslationAdderBefore {
  isFiltered: boolean;
  inputTranslationKey: IUseInput;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * @deprecated TODO 삭제
 * @param params
 */
function useNewTranslationAdderBefore(params: IUseNewTranslationAdderParamsBefore): IUseNewTranslationAdderBefore {
  const {} = params;
  const { rows, inputFilter, onAddNewTranslationKey } = useTranslationFileEditorContextBefore();
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

export default useNewTranslationAdderBefore;
