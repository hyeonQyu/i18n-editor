import { useWorkspaceId } from '@/hooks/domains/workspace';
import { useWorkspaces } from '@/hooks/domains/workspace/useWorkspaces';
import { Workspace } from '@i18n-editor/shared';

export const useWorkspace = () => {
  const workspaceId = useWorkspaceId();
  const workspaces = useWorkspaces();

  return (
    workspaces.find((workspace) => workspace.id === workspaceId) ??
    workspaces.reduce(
      (latest, workspace) => {
        return !latest || workspace.lastOpenedAt > latest.lastOpenedAt ? workspace : latest;
      },
      undefined as Workspace | undefined,
    )
  );
};
