import { useLanguageCodes } from '@/hooks/domains/language';
import { useWorkspaceId } from '@/hooks/domains/workspace';

export const useWorkspaceLanguageCodes = () => {
  const workspaceId = useWorkspaceId();
  return useLanguageCodes(workspaceId);
};
