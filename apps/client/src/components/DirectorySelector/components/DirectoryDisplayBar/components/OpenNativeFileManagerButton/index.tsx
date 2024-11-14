import useOS from '@hooks/useOS';
import { FolderOpen } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { OSType } from 'i18n-editor-common';

const getFileManagerNameByOS = (os: OSType | undefined) => {
  switch (os) {
    case 'windows':
      return '파일 탐색기';
    case 'mac':
      return '파인더';
    default:
      return '파일 관리자';
  }
};

function OpenNativeFileManagerButton() {
  const os = useOS();

  const fileManagerName = getFileManagerNameByOS(os);

  const tooltipMessage = `${fileManagerName} 열기`;

  return (
    <Tooltip title={tooltipMessage}>
      <Button sx={{ width: '50px' }}>
        <FolderOpen />
      </Button>
    </Tooltip>
  );
}

export default OpenNativeFileManagerButton;
