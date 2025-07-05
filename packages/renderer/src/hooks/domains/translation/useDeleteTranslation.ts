import { useElectronAPI } from '@/hooks/common';
import { TranslationDeleteRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateGetAllTranslationsQuery } from './useInvalidateGetAllTranslationsQuery';

export const useDeleteTranslation = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: TranslationDeleteRequest) => electronAPI.workspace.translation.delete(request),
  });

  const invalidateGetAllTranslationsQuery = useInvalidateGetAllTranslationsQuery();

  return async (request: TranslationDeleteRequest) => {
    await mutateAsync(request);
    await invalidateGetAllTranslationsQuery(request);
  };
};
