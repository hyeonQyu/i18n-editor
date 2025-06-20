import useWorkspaceId from '@hooks/workspace/useWorkspaceId';
import useWorkspaces from '@hooks/workspace/useWorkspaces';
import { Workspace } from 'i18n-editor-common';

function useWorkspace() {
  const workspaceId = useWorkspaceId();
  const workspaces = useWorkspaces();

  return (
    workspaces.find((workspace) => workspace.id === workspaceId) ??
    workspaces.reduce((latest, workspace) => {
      return !latest || workspace.lastOpenedAt > latest.lastOpenedAt ? workspace : latest;
    }, undefined as Workspace | undefined)
  );
}

export default useWorkspace;
