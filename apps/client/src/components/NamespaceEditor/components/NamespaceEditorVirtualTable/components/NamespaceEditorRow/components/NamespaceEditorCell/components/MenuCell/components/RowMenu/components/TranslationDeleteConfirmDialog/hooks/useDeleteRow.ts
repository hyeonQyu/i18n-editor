import { useRows } from '@components/NamespaceEditor/providers/RowsProvider';
import useNamespace from '@hooks/namespace/useNamespace';
import useDeleteTranslation from '@hooks/translation/useDeleteTranslation';
import useInvalidateGetTranslationsQuery from '@hooks/translation/useInvalidateGetTranslationsQuery';
import { useWorkspace } from '@providers/WorkspaceProvider';

function useDeleteRow() {
  const workspace = useWorkspace();
  const namespace = useNamespace();

  const rows = useRows();

  const deleteTranslation = useDeleteTranslation();

  const invalidateGetTranslationsQuery = useInvalidateGetTranslationsQuery();

  return async (index: number) => {
    if (!workspace?.id || !namespace) return;

    const translationKey = rows[index].key?.value;

    if (!translationKey) return;

    await deleteTranslation({ id: workspace.id, namespace, translationKey });
    await invalidateGetTranslationsQuery(workspace.id, namespace);
  };
}

export default useDeleteRow;
