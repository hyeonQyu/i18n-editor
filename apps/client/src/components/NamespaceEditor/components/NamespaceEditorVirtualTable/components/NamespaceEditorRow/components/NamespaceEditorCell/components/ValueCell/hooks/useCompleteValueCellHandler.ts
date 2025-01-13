import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { useRows } from '@components/NamespaceEditor/providers/RowsProvider';
import useInvalidateGetNamespaceQuery from '@hooks/namespace/useInvalidateGetNamespaceQuery';
import useUpdateTranslation from '@hooks/translation/useUpdateTranslation';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';
import { LanguageCode } from 'i18n-editor-common';

function useCompleteValueCellHandler(languageCode: LanguageCode) {
  const workspace = useWorkspace();
  const namespace = useWorkspaceStore(({ namespace }) => namespace);

  const rows = useRows();
  const rowIndex = useRowIndex();

  const translation = rows[rowIndex];

  const updateTranslation = useUpdateTranslation();

  const invalidateGetNamespaceQuery = useInvalidateGetNamespaceQuery();

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

      await invalidateGetNamespaceQuery(workspace.id, namespace);
    } catch (e) {}
  };
}

export default useCompleteValueCellHandler;
