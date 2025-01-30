import { ToolbarButtonProps } from '@components/Toolbar/components/ToolbarButton';
import useRouteWorkspacePage from '@hooks/workspace/useRouteWorkspacePage';
import useWorkspaceId from '@hooks/workspace/useWorkspaceId';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

function useToWorkspaceNamespaceToolbarButtonProps(): ToolbarButtonProps {
  const workspaceId = useWorkspaceId();
  const toWorkspace = useRouteWorkspacePage();

  return {
    IconComponent: ArrowBackOutlinedIcon,
    tooltip: '워크스페이스로 이동',
    onClick: () => toWorkspace(workspaceId),
    color: 'white',
  };
}

export default useToWorkspaceNamespaceToolbarButtonProps;
