import { ToolbarButtonProps } from '@/components/Toolbar/components/ToolbarButton';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { useNavigateToWorkspace } from '@/hooks/routes';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export const useToWorkspaceToolbarButtonProps = (): ToolbarButtonProps => {
  const workspaceId = useWorkspaceId();
  const toWorkspace = useNavigateToWorkspace();

  return {
    IconComponent: ArrowBackOutlinedIcon,
    tooltip: '워크스페이스로 이동',
    onClick: () => toWorkspace(workspaceId),
    color: 'white',
  };
};
