import WorkspaceMenuButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/WorkspaceMenuButton';
import useOpenNativeFileManager from '@hooks/useOpenNativeFileManager';
import useOS from '@hooks/useOS';
import useWorkspace from '@hooks/workspace/useWorkspace';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { OS } from 'i18n-editor-common';

const getFileManagerNameByOS = (os: OS | undefined) => {
  switch (os) {
    case 'win':
      return '파일 탐색기';
    case 'macos':
      return '파인더';
    default:
      return '파일 관리자';
  }
};

function NativeFileManagerOpenButton() {
  const workspace = useWorkspace();

  const os = useOS();

  const fileManagerName = getFileManagerNameByOS(os);

  const tooltipMessage = `${fileManagerName}에서 열기`;

  const openFileManager = useOpenNativeFileManager();

  const handleClick = () => {
    if (!workspace) return;
    return openFileManager({ path: workspace.path });
  };

  return <WorkspaceMenuButton title={tooltipMessage} onClick={handleClick} IconComponent={OpenInNewIcon} />;
}

export default NativeFileManagerOpenButton;
