import { MUTATION_KEY } from '@defines/reactQuery';
import useInvalidateGetLanguagesQuery from '@hooks/language/useInvalidateGetLanguagesQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { DeleteLanguageParams } from 'i18n-editor-common';

function useDeleteLanguageCode() {
  const api = useAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.workspace.deleteLanguage(),
    mutationFn: async (req: DeleteLanguageParams) => (await api.workspace.deleteLanguage(req)).data,
  });

  const invalidateLanguages = useInvalidateGetLanguagesQuery();

  return async (req: DeleteLanguageParams) => {
    if (!req.id) return;
    await mutateAsync(req);
    await invalidateLanguages(req.id);
  };
}

export default useDeleteLanguageCode;
