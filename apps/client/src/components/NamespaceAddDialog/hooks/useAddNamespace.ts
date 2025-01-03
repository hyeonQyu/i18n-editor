import useSelectNamespaceHandler from '@components/Layout/components/Sidebar/components/NamespaceList/hooks/useSelectNamespaceHandler';
import useCreateNamespace from '@hooks/namespace/useCreateNamespace';
import useInvalidateGetWorkspaceQuery from '@hooks/workspace/useInvalidateGetWorkspaceQuery';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { enqueueClosableSnackbar } from '@utils/snackbar';

function useAddNamespace() {
  const workspace = useWorkspace();

  const createNewNamespace = useCreateNamespace();

  const invalidateWorkspace = useInvalidateGetWorkspaceQuery(workspace?.id ?? '');

  const selectNamespace = useSelectNamespaceHandler();

  return async (namespace: string) => {
    if (!workspace || !namespace) return;

    await createNewNamespace({ id: workspace.id, namespace });

    enqueueClosableSnackbar({
      message: '새로운 namespace가 추가되었습니다.',
      variant: 'success',
    });

    await invalidateWorkspace();

    selectNamespace(namespace);
  };
}

export default useAddNamespace;
