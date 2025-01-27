import useWorkspaceId from '@hooks/workspace/useWorkspaceId';
import useWorkspaces from '@hooks/workspace/useWorkspaces';
import { Workspace } from 'i18n-editor-common';
import { createContext, ReactNode, useContext, useMemo } from 'react';

const WorkspaceContext = createContext<Workspace | undefined>(undefined);

export const useWorkspace = () => useContext(WorkspaceContext);

interface WorkspaceProviderProps {
  children: ReactNode;
}

function WorkspaceProvider(props: WorkspaceProviderProps) {
  const { children } = props;

  const workspaces = useWorkspaces();
  const workspaceId = useWorkspaceId();

  const workspace = useMemo(
    () =>
      workspaces.find((workspace) => workspace.id === workspaceId) ??
      workspaces.reduce((latest, workspace) => {
        return !latest || workspace.lastOpenedAt > latest.lastOpenedAt ? workspace : latest;
      }, undefined as Workspace | undefined),
    [workspaces, workspaceId],
  );

  return <WorkspaceContext.Provider value={workspace}>{children}</WorkspaceContext.Provider>;
}

export default WorkspaceProvider;
