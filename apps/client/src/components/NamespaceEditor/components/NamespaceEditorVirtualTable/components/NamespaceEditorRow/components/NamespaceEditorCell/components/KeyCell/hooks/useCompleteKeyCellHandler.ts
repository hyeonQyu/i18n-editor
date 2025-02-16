import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import useInvalidateGetNamespaceQuery from '@hooks/namespace/useInvalidateGetNamespaceQuery';
import useCreateTranslation from '@hooks/translation/useCreateTranslation';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';

function useCompleteKeyCellHandler() {
  const workspace = useWorkspace();
  const namespace = useWorkspaceStore(({ namespace }) => namespace);

  const rowIndex = useRowIndex();

  const createTranslation = useCreateTranslation();

  const invalidateGetNamespaceQuery = useInvalidateGetNamespaceQuery();

  return async (value: string) => {
    if (!workspace || !namespace || !value) return;

    await createTranslation({
      id: workspace.id,
      namespace,
      index: rowIndex,
      translation: {
        key: value,
        value: {},
      },
    });

    await invalidateGetNamespaceQuery(workspace.id, namespace);
  };
}

export default useCompleteKeyCellHandler;
