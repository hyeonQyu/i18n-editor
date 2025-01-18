import { MUTATION_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { DeleteTranslationParams } from 'i18n-editor-common';

function useDeleteTranslation() {
  const api = useAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.workspace.deleteTranslation(),
    mutationFn: async (req: DeleteTranslationParams) => (await api.workspace.deleteTranslation(req)).data,
  });

  return mutateAsync;
}

export default useDeleteTranslation;
