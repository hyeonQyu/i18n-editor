import useQueryGetWorkspace from '@hooks/namespace/useQueryGetWorkspace';
import useFetchWorkspace from '@hooks/workspace/useQueryGetWorkspace';
import { useState } from 'react';

function useSelectWorkspaceHandler() {
  const fetchWorkspace = useFetchWorkspace();
  const [workspaceId, setWorkspaceId] = useState<string>('');

  useQueryGetWorkspace(workspaceId);

  return (id: string) => setWorkspaceId(id);
}

export default useSelectWorkspaceHandler;
