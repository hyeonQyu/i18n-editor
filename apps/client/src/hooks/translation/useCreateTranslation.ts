import { MUTATION_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { PostTranslationParams, PostTranslationRequest } from 'i18n-editor-common';

function useCreateTranslation() {
  const api = useAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.workspace.postTranslation(),
    mutationFn: async (req: PostTranslationRequest & PostTranslationParams) => (await api.workspace.postTranslation(req)).data,
  });

  return mutateAsync;
}

export default useCreateTranslation;
