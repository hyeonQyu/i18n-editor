import { MUTATION_KEY } from '@defines/reactQuery';
import useInvalidateGetUIConfigQuery from '@hooks/ui/useInvalidateGetUIConfigQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { PatchUIRequest } from 'i18n-editor-common';

function useUpdatePartialUIConfig() {
  const api = useAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.config.patchUI(),
    mutationFn: async (data: PatchUIRequest) => (await api.config.patchUI(data)).data,
  });

  const invalidateGetUIConfigQuery = useInvalidateGetUIConfigQuery();

  return async (data: PatchUIRequest) => {
    await mutateAsync(data);
    await invalidateGetUIConfigQuery();
  };
}

export default useUpdatePartialUIConfig;
