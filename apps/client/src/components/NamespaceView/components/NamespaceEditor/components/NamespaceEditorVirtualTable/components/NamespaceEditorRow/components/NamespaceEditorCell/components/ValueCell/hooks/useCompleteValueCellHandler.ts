import { useRowIndex } from '@components/NamespaceView/components/NamespaceEditor/providers/RowProvider';
import { useRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';
import useNamespace from '@hooks/namespace/useNamespace';
import useInvalidateGetTranslationsQuery from '@hooks/translation/useInvalidateGetTranslationsQuery';
import useUpdateTranslation from '@hooks/translation/useUpdateTranslation';
import useWorkspace from '@hooks/workspace/useWorkspace';
import { LanguageCode } from 'i18n-editor-common';

function useCompleteValueCellHandler(languageCode: LanguageCode) {
  const workspace = useWorkspace();
  const namespace = useNamespace();

  const rows = useRows();
  const rowIndex = useRowIndex();

  const translation = rows[rowIndex];

  const updateTranslation = useUpdateTranslation();

  const invalidateGetTranslationsQuery = useInvalidateGetTranslationsQuery();

  return async (value: string) => {
    if (!workspace || !namespace || !translation) return;

    if (value === translation[languageCode]?.value) return;

    try {
      await updateTranslation({
        id: workspace.id,
        namespace,
        translationKey: translation.key.value,
        languageCode,
        value,
      });

      await invalidateGetTranslationsQuery(workspace.id, namespace);
    } catch (e) {}
  };
}

export default useCompleteValueCellHandler;
