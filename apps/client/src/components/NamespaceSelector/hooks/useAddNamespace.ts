import useCreateNewNamespace from '@hooks/namespace/useCreateNewNamespace';
import useInvalidateLocaleNamespaces from '@hooks/namespace/useInvalidateLocaleNamespaces';
import { useWorkspaceStore } from '@stores/workspace';
import { enqueueClosableSnackbar } from '@utils/snackbar';

function useAddNamespace() {
  const path = useWorkspaceStore(({ path }) => path);

  const createNewNamespace = useCreateNewNamespace();

  const invalidateNamespaces = useInvalidateLocaleNamespaces();

  return async (namespace: string) => {
    if (!path || !namespace) return;

    await createNewNamespace({ localeDirectoryPath: path, namespace });

    enqueueClosableSnackbar({
      message: '새로운 namespace가 추가되었습니다.',
      variant: 'success',
    });

    await invalidateNamespaces();
  };
}

export default useAddNamespace;
