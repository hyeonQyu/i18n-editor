import { useNamespace } from '@/hooks/domains/namespace';
import { useTranslations } from '@/hooks/domains/translation';
import { useWorkspaceId } from '@/hooks/domains/workspace';

export const useNamespaceTranslations = () => {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  return useTranslations(workspaceId, namespace);
};
