import { useElectronAPI } from '@/hooks/common';
import { useInvalidateGetAllTranslationsQuery } from '@/hooks/domains/translation/useInvalidateGetAllTranslationsQuery';
import { TranslationCreateRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useCreateTranslation = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: TranslationCreateRequest) => electronAPI.workspace.translation.create(request),
  });

  const invalidateGetAllTranslationsQuery = useInvalidateGetAllTranslationsQuery();

  return async (request: TranslationCreateRequest) => {
    await mutateAsync(request);
    await invalidateGetAllTranslationsQuery({ workspaceId: request.workspaceId, namespace: request.namespace });
  };
};
