import { MUTATION_KEY } from '@defines/reactQuery';
import useInvalidateGetLanguagesQuery from '@hooks/language/useInvalidateGetLanguagesQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { PostLanguagesParams, PostLanguagesRequest } from 'i18n-editor-common';

function useCreateLanguageCodes() {
  const api = useAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.workspace.postLanguageCodes(),
    mutationFn: async (req: PostLanguagesParams & PostLanguagesRequest) => (await api.workspace.postLanguages(req)).data,
  });

  const invalidateLanguages = useInvalidateGetLanguagesQuery();

  return async (req: PostLanguagesParams & PostLanguagesRequest) => {
    if (!req.id) return;
    await mutateAsync(req);
    await invalidateLanguages(req.id);
  };
}

export default useCreateLanguageCodes;
