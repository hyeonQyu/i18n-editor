import { TranslationFileEditorProps } from '@components/translationFileEditor/TranslationFileEditor';
import useQueryGetContent from '@hooks/queries/useQueryGetContent';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { localeDirectoryPathState, translationFileNameState } from '@stores/store';

export interface UseTranslationFileEditorParams extends TranslationFileEditorProps {}

export interface UseTranslationFileEditor {}

export default function useTranslationFileEditor(params: UseTranslationFileEditorParams): UseTranslationFileEditor {
  const {} = params;

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const translationFileName = useRecoilValue(translationFileNameState);
  const setColumns = useSetRecoilState(translationFileEditorStates.columns);
  const setRows = useSetRecoilState(translationFileEditorStates.rows);

  useQueryGetContent({
    req: { path: localeDirectoryPath!, fileName: translationFileName || '' },
    queryOption: {
      enabled: Boolean(translationFileName) && Boolean(localeDirectoryPath),
      retry: false,
      onSuccess({ data }) {
        if (!data) return;
        const { columns, rows } = data;
        setColumns(columns);
        setRows(rows);
      },
    },
  });

  return {};
}
