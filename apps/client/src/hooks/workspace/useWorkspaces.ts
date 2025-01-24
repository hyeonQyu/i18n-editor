import useQueryGetWorkspaces from '@hooks/workspace/useQueryGetWorkspaces';
import { GetWorkspacesResponse } from 'i18n-editor-common';

const DEFAULT_RESPONSE: GetWorkspacesResponse = { workspaces: [] };

function useWorkspaces() {
  const { data: { data: { workspaces } = DEFAULT_RESPONSE } = {} } = useQueryGetWorkspaces();

  return workspaces;
}

export default useWorkspaces;
