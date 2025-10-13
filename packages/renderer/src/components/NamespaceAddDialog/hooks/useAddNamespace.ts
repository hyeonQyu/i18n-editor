import { useInvalidateGetAllNamespacesQuery } from '@/hooks/domains/namespace';
import { useCreateNamespace } from '@/hooks/domains/namespace/useCreateNamespace';
import { useWorkspace } from '@/hooks/domains/workspace/useWorkspace';
import { enqueueClosableSnackbar } from '@/utils/snackbar.utils';

export const useAddNamespace = () => {
  const workspace = useWorkspace();

  const createNewNamespace = useCreateNamespace();

  const invalidateNamespaces = useInvalidateGetAllNamespacesQuery();

  return async (namespace: string) => {
    if (!workspace || !namespace) return;

    await createNewNamespace({ workspaceId: workspace.id, namespace });

    enqueueClosableSnackbar({
      message: `새로운 네임스페이스 ${namespace}이(가) 추가되었습니다.`,
      variant: 'success',
    });

    await invalidateNamespaces(workspace.id);
  };
};
