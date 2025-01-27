import useSetCellError from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useSetCellError';
import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import useCreateTranslation from '@hooks/translation/useCreateTranslation';
import useInvalidateGetTranslationsQuery from '@hooks/translation/useInvalidateGetTranslationsQuery';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';
import axios from 'axios';
import { ErrorResponseEntity } from 'i18n-editor-common';

function useCompleteKeyCellHandler() {
  const workspace = useWorkspace();
  const namespace = useWorkspaceStore((state) => state.namespace);

  const rowIndex = useRowIndex();

  const createTranslation = useCreateTranslation();

  const invalidateGetTranslationsQuery = useInvalidateGetTranslationsQuery();

  const setCellError = useSetCellError();

  return async (value: string) => {
    if (!workspace || !namespace || !value) return;

    try {
      await createTranslation({
        id: workspace.id,
        namespace,
        index: rowIndex,
        translation: {
          key: value,
          value: {},
        },
      });

      await invalidateGetTranslationsQuery(workspace.id, namespace);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { errorMessage } = e.response?.data as ErrorResponseEntity;
        setCellError({ message: errorMessage });
      }
    }
  };
}

export default useCompleteKeyCellHandler;
