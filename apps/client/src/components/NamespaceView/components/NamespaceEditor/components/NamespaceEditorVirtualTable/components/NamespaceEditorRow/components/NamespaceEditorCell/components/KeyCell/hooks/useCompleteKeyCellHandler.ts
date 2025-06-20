import useSetCellError from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useSetCellError';
import { useRow } from '@components/NamespaceView/components/NamespaceEditor/providers/RowProvider';
import useNamespace from '@hooks/namespace/useNamespace';
import useCreateTranslation from '@hooks/translation/useCreateTranslation';
import useInvalidateGetTranslationsQuery from '@hooks/translation/useInvalidateGetTranslationsQuery';
import useWorkspace from '@hooks/workspace/useWorkspace';
import axios from 'axios';
import { ErrorResponseEntity } from 'i18n-editor-common';

function useCompleteKeyCellHandler() {
  const workspace = useWorkspace();
  const namespace = useNamespace();

  const row = useRow();

  const createTranslation = useCreateTranslation();

  const invalidateGetTranslationsQuery = useInvalidateGetTranslationsQuery();

  const setCellError = useSetCellError();

  return async (value: string) => {
    if (!workspace || !namespace || !value) return;

    try {
      await createTranslation({
        id: workspace.id,
        namespace,
        position: row.key.metadata.position,
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
