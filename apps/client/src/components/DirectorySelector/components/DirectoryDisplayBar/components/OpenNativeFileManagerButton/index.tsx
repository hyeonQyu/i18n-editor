import useOpenNativeFileManager from '@hooks/useOpenNativeFileManager';
import useOS from '@hooks/useOS';
import { FolderOpen } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { useGlobalStore } from '@stores/globalStore';
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

function OpenNativeFileManagerButton() {
  const path = useGlobalStore(({ path }) => path);

  const os = useOS();

  const fileManagerName = getFileManagerNameByOS(os);

  const tooltipMessage = `${fileManagerName}에서 열기`;

  const openFileManager = useOpenNativeFileManager();

  const handleClick = () => openFileManager({ path: path! });

  return (
    <Tooltip title={tooltipMessage}>
      <Button sx={{ width: '50px' }} disabled={!path} onClick={handleClick}>
        <FolderOpen />
      </Button>
    </Tooltip>
  );
}

export default OpenNativeFileManagerButton;
