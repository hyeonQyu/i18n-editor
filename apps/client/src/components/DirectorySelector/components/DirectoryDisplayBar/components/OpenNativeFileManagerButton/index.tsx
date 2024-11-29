import { directoryPath } from '@defines/tmp';
import useOpenFileManager from '@hooks/useOpenFileManager';
import useOS from '@hooks/useOS';
import { FolderOpen } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
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
  const os = useOS();

  const fileManagerName = getFileManagerNameByOS(os);

  const tooltipMessage = `${fileManagerName} 열기`;

  const openFileManager = useOpenFileManager();

  const handleClick = () => openFileManager({ path: directoryPath });

  return (
    <Tooltip title={tooltipMessage}>
      <Button sx={{ width: '50px' }} onClick={handleClick}>
        <FolderOpen />
      </Button>
    </Tooltip>
  );
}

export default OpenNativeFileManagerButton;
