import { MUTATION_KEY } from '@/constants';
import { useElectronAPI } from '@/hooks/common';
import { useInvalidateReadUIConfigQuery } from '@/hooks/domains/ui/useInvalidateReadUIConfigQuery';
import { UIUpdateRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUIConfig = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.config.ui.update(),
    mutationFn: (data: UIUpdateRequest) => electronAPI.config.ui.update(data),
  });

  const invalidateQuery = useInvalidateReadUIConfigQuery();

  return async (data: UIUpdateRequest) => {
    await mutateAsync(data);
    await invalidateQuery();
  };
};
