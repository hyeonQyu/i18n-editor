import useCreateNamespace from '@hooks/namespace/useCreateNamespace';
import useInvalidateGetNamespacesQuery from '@hooks/namespace/useInvalidateGetNamespacesQuery';
import useWorkspace from '@hooks/workspace/useWorkspace';
import { enqueueClosableSnackbar } from '@utils/snackbar';

function useAddNamespace() {
  const workspace = useWorkspace();

  const createNewNamespace = useCreateNamespace();

  const invalidateNamespaces = useInvalidateGetNamespacesQuery();

  return async (namespace: string) => {
    if (!workspace || !namespace) return;

    await createNewNamespace({ id: workspace.id, namespace });

    enqueueClosableSnackbar({
      message: `새로운 네임스페이스 ${namespace}이(가) 추가되었습니다.`,
      variant: 'success',
    });

    await invalidateNamespaces(workspace.id);
  };
}

export default useAddNamespace;
