import { WorkspaceToolbarButtonProps } from '@components/WorkspaceView/components/WorkspaceToolbar/components/WorkspaceToolbarButton';
import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import useUpdateWorkspace from '@hooks/workspace/useUpdateWorkspace';
import useWorkspace from '@hooks/workspace/useWorkspace';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

function useChangeDirectoryToolbarButtonProps(): WorkspaceToolbarButtonProps {
  const workspace = useWorkspace();

  const openFileManagerDialog = useOpenFileManagerDialog();

  const updateWorkspace = useUpdateWorkspace();

  return {
    IconComponent: FolderOpenIcon,
    label: '디렉토리 변경',
    onClick: () => {
      if (!workspace?.path) return;
      openFileManagerDialog(workspace.path, (path) => updateWorkspace({ ...workspace, path }));
    },
  };
}

export default useChangeDirectoryToolbarButtonProps;
