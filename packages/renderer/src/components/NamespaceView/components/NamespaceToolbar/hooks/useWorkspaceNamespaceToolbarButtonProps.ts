import { useSetWorkspace, useWorkspaceId } from '@/hooks/domains/workspace';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export const useWorkspaceNamespaceToolbarButtonProps = () => {
  const workspaceId = useWorkspaceId();
  const toWorkspace = useSetWorkspace();

  return {
    IconComponent: ArrowBackOutlinedIcon,
    tooltip: '워크스페이스로 이동',
    onClick: () => toWorkspace(workspaceId),
    color: 'white',
  };
};
