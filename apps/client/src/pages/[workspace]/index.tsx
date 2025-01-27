import WorkspaceView from '@components/WorkspaceView';
import useFetchWorkspace from '@hooks/workspace/useFetchWorkspace';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function WorkspacePage() {
  const router = useRouter();
  const workspaceId = router.query.workspace as string;

  const fetchWorkspace = useFetchWorkspace();

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, [workspaceId, fetchWorkspace]);

  return <WorkspaceView />;
}

export default WorkspacePage;
