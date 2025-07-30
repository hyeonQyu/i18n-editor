import { useElectronAPI } from '@/hooks/common/useElectronAPI';
import { TranslationUpdateRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateGetAllTranslationsQuery } from './useInvalidateGetAllTranslationsQuery';

export const useUpdateTranslation = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: TranslationUpdateRequest) => electronAPI.workspace.translation.update(request),
  });

  const invalidateGetAllTranslationsQuery = useInvalidateGetAllTranslationsQuery();

  return async (request: TranslationUpdateRequest) => {
    await mutateAsync(request);
    await invalidateGetAllTranslationsQuery(request);
  };
};
