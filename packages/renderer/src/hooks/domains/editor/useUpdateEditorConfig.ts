import { MUTATION_KEY } from '@/constants';
import { useElectronAPI } from '@/hooks/common';
import { useInvalidateReadEditorConfigQuery } from '@/hooks/domains/editor/useInvalidateReadEditorConfigQuery';
import { EditorUpdateRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useUpdateEditorConfig = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.config.editor.update(),
    mutationFn: (data: EditorUpdateRequest) => electronAPI.config.editor.update(data),
  });

  const invalidateQuery = useInvalidateReadEditorConfigQuery();

  return async (data: EditorUpdateRequest) => {
    await mutateAsync(data);
    await invalidateQuery();
  };
};
