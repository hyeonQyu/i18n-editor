import { ToolbarButtonProps } from '@components/Toolbar/components/ToolbarButton';
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

function useOpenNativeFileManagerToolbarButtonProps(): ToolbarButtonProps {
  const os = useOS();

  const workspace = useWorkspace();

  const openFileManager = useOpenNativeFileManager();

  return {
    IconComponent: OpenInNewIcon,
    label: `${getFileManagerNameByOS(os)}에서 열기`,
    onClick: () => {
      if (!workspace?.path) return;
      openFileManager({ path: workspace.path });
    },
  };
}

export default useOpenNativeFileManagerToolbarButtonProps;
