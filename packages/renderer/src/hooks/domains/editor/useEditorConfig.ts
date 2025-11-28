import { QUERY_KEY } from '@/constants';
import { useElectronAPI, useOS } from '@/hooks/common';
import { getDefaultConfig } from '@i18n-editor/shared';
import { useQuery } from '@tanstack/react-query';

export const useEditorConfig = () => {
  const electronAPI = useElectronAPI();

  const os = useOS();

  const defaultConfig = getDefaultConfig(os ?? 'linux');

  const { data: editor = defaultConfig.editor } = useQuery({
    queryKey: QUERY_KEY.config.editor.read(),
    queryFn: () => electronAPI.config.editor.read(),
    staleTime: Infinity,
  });

  return editor;
};
