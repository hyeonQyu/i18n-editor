import { WorkspaceToolbarButtonProps } from '@components/WorkspaceView/components/WorkspaceToolbar/components/WorkspaceToolbarButton';
import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import useUpdateWorkspace from '@hooks/workspace/useUpdateWorkspace';
import useWorkspace from '@hooks/workspace/useWorkspace';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

function useChangeDirectoryToolbarButtonProps(): WorkspaceToolbarButtonProps {
  const workspace = useWorkspace();

  const openFileManagerDialog = useOpenFileManagerDialog();

  const updateWorkspace = useUpdateWorkspace();

  return {
    IconComponent: FolderCopyOutlinedIcon,
    label: '디렉토리 변경',
    onClick: () => {
      if (!workspace?.path) return;
      openFileManagerDialog(workspace.path, (path) => updateWorkspace({ ...workspace, path }));
    },
  };
}

export default useChangeDirectoryToolbarButtonProps;
