import { MUTATION_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { PostNamespaceRequest } from 'i18n-editor-common';

function useCreateNamespace() {
  const api = useAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.namespace.postNamespace(),
    mutationFn: async (req: PostNamespaceRequest) => (await api.namespace.postNamespace(req)).data,
  });

  return mutateAsync;
}

export default useCreateNamespace;
