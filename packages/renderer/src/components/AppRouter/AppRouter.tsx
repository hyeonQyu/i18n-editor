import { HomeView } from '@/components/HomeView';
import { WorkspaceView } from '@/components/WorkspaceView';
import { useWorkspaceId } from '@/hooks/domains/workspace';

function AppRouter() {
  const workspaceId = useWorkspaceId();

  if (workspaceId) {
    return <WorkspaceView />;
  }

  return <HomeView />;
}

export default AppRouter;
