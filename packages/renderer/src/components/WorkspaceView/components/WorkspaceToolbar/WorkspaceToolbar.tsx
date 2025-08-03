import { useOpenNamespaceAddDialog } from '@/components/NamespaceAddDialog';
import { Toolbar } from '@/components/Toolbar';
import {
  useChangeWorkspaceDirectory,
  useOpenWorkspaceFileManager,
  useOpenWorkspaceLanguageCodesDialog,
} from '@/components/WorkspaceView/hooks';
import { useFileManagerName } from '@/hooks/common';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTheme } from '@mui/material';

function WorkspaceToolbar() {
  const {
    palette: { divider },
  } = useTheme();

  const changeDirectory = useChangeWorkspaceDirectory();
  const openNativeFileManager = useOpenWorkspaceFileManager();
  const openNamespaceAddDialog = useOpenNamespaceAddDialog();
  const openWorkspaceLanguageCodesDialog = useOpenWorkspaceLanguageCodesDialog();

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
          onClick: changeDirectory,
        },
        {
          IconComponent: OpenInNewIcon,
          label: `${fileManagerName}에서 열기`,
          onClick: openNativeFileManager,
        },
        {
          IconComponent: NoteAddOutlinedIcon,
          label: '네임스페이스 추가',
          onClick: openNamespaceAddDialog,
        },
        {
          IconComponent: TranslateIcon,
          label: '언어 추가',
          onClick: openWorkspaceLanguageCodesDialog,
        },
      ]}
    />
  );
}

export default WorkspaceToolbar;
