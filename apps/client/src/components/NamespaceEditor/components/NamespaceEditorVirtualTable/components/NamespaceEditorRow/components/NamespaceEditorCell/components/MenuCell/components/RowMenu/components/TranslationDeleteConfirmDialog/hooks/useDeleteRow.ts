import { useRows } from '@components/NamespaceEditor/providers/RowsProvider';
import useInvalidateGetNamespaceQuery from '@hooks/namespace/useInvalidateGetNamespaceQuery';
import useDeleteTranslation from '@hooks/translation/useDeleteTranslation';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';

function useDeleteRow() {
  const workspace = useWorkspace();
  const namespace = useWorkspaceStore((state) => state.namespace);

  const rows = useRows();

  const deleteTranslation = useDeleteTranslation();

  const invalidateGetNamespaceQuery = useInvalidateGetNamespaceQuery();

  return async (index: number) => {
    if (!workspace?.id || !namespace) return;

    const translationKey = rows[index].key?.value;

    if (!translationKey) return;

    await deleteTranslation({ id: workspace.id, namespace, translationKey });
    await invalidateGetNamespaceQuery(workspace.id, namespace);
  };
}

export default useDeleteRow;
