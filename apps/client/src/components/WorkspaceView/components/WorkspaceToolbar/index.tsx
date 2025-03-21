import Toolbar from '@components/Toolbar';
import useChangeDirectoryClickHandler from '@components/WorkspaceView/hooks/useChangeDirectoryClickHandler';
import useOpenAddLanguagesDialogClickHandler from '@components/WorkspaceView/hooks/useOpenAddLanguagesDialogClickHandler';
import useOpenNativeFileManagerClickHandler from '@components/WorkspaceView/hooks/useOpenNativeFileManagerClickHandler';
import useAddNamespaceClickHandler from '@hooks/namespace/useAddNamespaceClickHandler';
import useFileManagerName from '@hooks/useFileManagerName';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTheme } from '@mui/material';

function WorkspaceToolbar() {
  const {
    palette: { divider },
  } = useTheme();

  const handleClickChangeDirectory = useChangeDirectoryClickHandler();
  const handleClickOpenNativeFileManager = useOpenNativeFileManagerClickHandler();
  const handleClickAddNamespace = useAddNamespaceClickHandler();
  const handleClickOpenAddLanguagesDialog = useOpenAddLanguagesDialogClickHandler();

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
          IconComponent: NoteAddOutlinedIcon,
          label: '네임스페이스 추가',
          onClick: handleClickAddNamespace,
        },
        {
          IconComponent: TranslateIcon,
          label: '언어 추가',
          onClick: handleClickOpenAddLanguagesDialog,
        },
      ]}
    />
  );
}

export default WorkspaceToolbar;
