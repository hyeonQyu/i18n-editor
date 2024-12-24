import useCreateNamespace from '@hooks/namespace/useCreateNamespace';
import useInvalidateGetWorkspaceQuery from '@hooks/workspace/useInvalidateGetWorkspaceQuery';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { enqueueClosableSnackbar } from '@utils/snackbar';

function useAddNamespace() {
  const workspace = useWorkspace();

  const createNewNamespace = useCreateNamespace();

  const invalidateWorkspace = useInvalidateGetWorkspaceQuery(workspace?.id ?? '');

  return async (namespace: string) => {
    if (!workspace || !namespace) return;

    await createNewNamespace({ localeDirectoryPath: workspace.path, namespace });

    enqueueClosableSnackbar({
      message: '새로운 namespace가 추가되었습니다.',
      variant: 'success',
    });

    await invalidateWorkspace();
  };
}

export default useAddNamespace;
