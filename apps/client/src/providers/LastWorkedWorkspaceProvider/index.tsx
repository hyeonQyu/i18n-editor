import useWorkspaces from '@hooks/workspace/useWorkspaces';
import { Workspace } from 'i18n-editor-common';
import { createContext, ReactNode, useContext, useMemo } from 'react';

const LastWorkedWorkspaceContext = createContext<Workspace | undefined>(undefined);

export const useLastWorkedWorkspace = () => useContext(LastWorkedWorkspaceContext);

interface LastWorkedWorkspaceProviderProps {
  children: ReactNode;
}

function LastWorkedWorkspaceProvider(props: LastWorkedWorkspaceProviderProps) {
  const { children } = props;

  const workspaces = useWorkspaces();

  const lastWorkedWorkspace = useMemo(
    () =>
      workspaces.reduce((latest, workspace) => {
        return !latest || workspace.lastOpenedAt > latest.lastOpenedAt ? workspace : latest;
      }, undefined as Workspace | undefined),
    [workspaces],
  );

  return <LastWorkedWorkspaceContext.Provider value={lastWorkedWorkspace}>{children}</LastWorkedWorkspaceContext.Provider>;
}

export default LastWorkedWorkspaceProvider;
