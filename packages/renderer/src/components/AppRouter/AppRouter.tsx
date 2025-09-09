import { HomeView } from '@/components/HomeView';
import NamespaceView from '@/components/NamespaceView';
import { WorkspaceView } from '@/components/WorkspaceView';
import { useNamespace } from '@/hooks/domains/namespace';
import { useWorkspaceId } from '@/hooks/domains/workspace';

function AppRouter() {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  if (workspaceId) {
    if (namespace) return <NamespaceView />;
    return <WorkspaceView />;
  }

  return <HomeView />;
}

export default AppRouter;
