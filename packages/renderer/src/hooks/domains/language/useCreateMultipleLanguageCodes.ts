import { useElectronAPI } from '@/hooks/common';
import { useInvalidateGetAllLanguageCodesQuery } from '@/hooks/domains/language/useInvalidateGetAllLanguageCodesQuery';
import { LanguageCreateMultipleRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useCreateMultipleLanguageCodes = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: LanguageCreateMultipleRequest) => electronAPI.workspace.language.createMultiple(request),
  });

  const invalidateGetAllLanguageCodesQuery = useInvalidateGetAllLanguageCodesQuery();

  return async (request: LanguageCreateMultipleRequest) => {
    await mutateAsync(request);
    await invalidateGetAllLanguageCodesQuery(request.workspaceId);
  };
};
