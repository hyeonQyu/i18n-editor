import { useWindowFocus } from '@/hooks/common';
import { useNamespace } from '@/hooks/domains/namespace';
import { useInvalidateGetAllTranslationsQuery } from '@/hooks/domains/translation';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { useCallback } from 'react';

export const useRefreshTranslations = () => {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();
  const invalidateTranslationsQuery = useInvalidateGetAllTranslationsQuery();

  useWindowFocus({
    onFocus: useCallback(() => {
      invalidateTranslationsQuery({ workspaceId: workspaceId, namespace: namespace });
    }, [workspaceId, namespace]),
  });
};
