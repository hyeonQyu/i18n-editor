import { MUTATION_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';

function useCreateNewNamespace(localeDirectoryPath: string) {
  const api = useAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.namespace.postNamespace(),
    mutationFn: async (namespace: string) => (await api.namespace.postNamespace({ localeDirectoryPath, namespace })).data,
  });

  return mutateAsync;
}

export default useCreateNewNamespace;
