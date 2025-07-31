import { useElectronAPI } from '@/hooks/common';
import { useInvalidateGetAllLanguageCodesQuery } from '@/hooks/domains/language/useInvalidateGetAllLanguageCodesQuery';
import { LanguageDeleteRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeleteLanguageCode = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: LanguageDeleteRequest) => electronAPI.workspace.language.delete(request),
  });

  const invalidateGetAllLanguageCodesQuery = useInvalidateGetAllLanguageCodesQuery();

  return async (request: LanguageDeleteRequest) => {
    await mutateAsync(request);
    await invalidateGetAllLanguageCodesQuery(request);
  };
};
