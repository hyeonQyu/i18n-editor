import WorkspaceMenuIconButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/WorkspaceMenuButton';
import useCopyClipboard from '@hooks/useCopyClipboard';
import { ContentCopy } from '@mui/icons-material';
import { useWorkspace } from '@providers/WorkspaceProvider';

function DirectoryPathCopyButton() {
  const workspace = useWorkspace();
  const copyClipboard = useCopyClipboard();

  const handleClick = () => {
    if (!workspace) return;
    copyClipboard(workspace.path);
  };

  return <WorkspaceMenuIconButton title={'경로 복사'} aria-label={'copy'} onClick={handleClick} IconComponent={ContentCopy} />;
}

export default DirectoryPathCopyButton;
