import Toolbar from '@components/Toolbar';
import useChangeDirectoryClickHandler from '@components/WorkspaceView/components/WorkspaceToolbar/hooks/useChangeDirectoryClickHandler';
import useOpenNativeFileManagerClickHandler from '@components/WorkspaceView/components/WorkspaceToolbar/hooks/useOpenNativeFileManagerClickHandler';
import useAddNamespaceClickHandler from '@hooks/namespace/useAddNamespaceClickHandler';
import useFileManagerName from '@hooks/useFileManagerName';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useTheme } from '@mui/material';

function WorkspaceToolbar() {
  const {
    palette: { divider },
  } = useTheme();

  const handleClickChangeDirectory = useChangeDirectoryClickHandler();
  const handleClickOpenNativeFileManager = useOpenNativeFileManagerClickHandler();
  const handleClickAddNamespace = useAddNamespaceClickHandler();

  const fileManagerName = useFileManagerName();

  return (
    <Toolbar
      sx={{
        borderBottom: `1px solid ${divider}`,
        padding: '4px 32px',
      }}
      buttons={[
        {
          IconComponent: FolderCopyOutlinedIcon,
          label: '디렉토리 변경',
          onClick: handleClickChangeDirectory,
        },
        {
          IconComponent: OpenInNewIcon,
          label: `${fileManagerName}에서 열기`,
          onClick: handleClickOpenNativeFileManager,
        },
        {
          IconComponent: PostAddIcon,
          label: '네임스페이스 추가',
          onClick: handleClickAddNamespace,
        },
      ]}
    />
  );
}

export default WorkspaceToolbar;
