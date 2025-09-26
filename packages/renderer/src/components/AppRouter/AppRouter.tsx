import { HomeView } from '@/components/HomeView';
import NamespaceView from '@/components/NamespaceView';
import { WorkspaceView } from '@/components/WorkspaceView';
import { useNamespace } from '@/hooks/domains/namespace';
import { useSetWorkspace, useWorkspace, useWorkspaceId } from '@/hooks/domains/workspace';
import { useEffect } from 'react';

function AppRouter() {
  const workspaceId = useWorkspaceId();
  const workspace = useWorkspace();
  const namespace = useNamespace();
  const setWorkspace = useSetWorkspace();

  useEffect(() => {
    if (!workspaceId && workspace) {
      setWorkspace(workspace.id);
    }
  }, [workspace, workspaceId]);

  if (workspaceId) {
    if (namespace) return <NamespaceView />;
    return <WorkspaceView />;
  }

  return <HomeView />;
}

export default AppRouter;
