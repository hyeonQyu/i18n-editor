import { TranslationFileEditorProps } from '@components/translationFileEditor/TranslationFileEditor';

export interface IUseTranslationFileEditorParams extends TranslationFileEditorProps {}

export interface IUseTranslationFileEditor {
  globalFilterFields: string[];
}

function useTranslationFileEditor(params: IUseTranslationFileEditorParams): IUseTranslationFileEditor {
  const { columns = [] } = params;

  const globalFilterFields = columns.map(({ header }) => header);

  return {
    globalFilterFields,
  };
}

export default useTranslationFileEditor;
