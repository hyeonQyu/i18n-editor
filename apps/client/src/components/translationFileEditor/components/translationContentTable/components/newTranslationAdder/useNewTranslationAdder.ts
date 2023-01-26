import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import useInput, { IUseInput } from '@hooks/common/useInput';

export interface IUseNewTranslationAdderParams {}

export interface IUseNewTranslationAdder {
  isFiltered: boolean;
  inputTranslationKey: IUseInput;
}

function useNewTranslationAdder(params: IUseNewTranslationAdderParams): IUseNewTranslationAdder {
  const {} = params;
  const { inputFilter } = useTranslationFileEditorContext();
  const inputTranslationKey = useInput({});

  const isFiltered = Boolean(inputFilter.value);

  return {
    isFiltered,
    inputTranslationKey,
  };
}

export default useNewTranslationAdder;
