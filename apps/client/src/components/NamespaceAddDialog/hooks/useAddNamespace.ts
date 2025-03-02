import useCreateNamespace from '@hooks/namespace/useCreateNamespace';
import useInvalidateGetNamespacesQuery from '@hooks/namespace/useInvalidateGetNamespacesQuery';
import useRouteNamespacePage from '@hooks/namespace/useRouteNamespacePage';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { enqueueClosableSnackbar } from '@utils/snackbar';

function useAddNamespace() {
  const workspace = useWorkspace();

  const createNewNamespace = useCreateNamespace();

  const invalidateNamespaces = useInvalidateGetNamespacesQuery();

  const selectNamespace = useRouteNamespacePage();

  return async (namespace: string) => {
    if (!workspace || !namespace) return;

    await createNewNamespace({ id: workspace.id, namespace });

    enqueueClosableSnackbar({
      message: '새로운 namespace가 추가되었습니다.',
      variant: 'success',
    });

    await invalidateNamespaces(workspace.id);

    selectNamespace(namespace);
  };
}

export default useAddNamespace;
