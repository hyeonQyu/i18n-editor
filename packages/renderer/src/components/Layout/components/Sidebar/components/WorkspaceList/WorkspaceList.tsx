import EllipsisText from '@/components/EllipsisText';
import { useOpenLanguageCodesDialog } from '@/components/LanguageCodesDialog';
import SidebarMenu, {
  SidebarMenuAddButton,
  SidebarMenuList,
  SidebarMenuListItem,
  SidebarMenuTitle,
} from '@/components/Layout/components/Sidebar/components/SidebarMenu';
import WorkspaceNameUpdateDialog from '@/components/Layout/components/Sidebar/components/WorkspaceList/components/WorkspaceNameUpdateDialog';
import { useOpenWorkspaceNameUpdateDialog } from '@/components/Layout/components/Sidebar/components/WorkspaceList/hooks';
import { useSelectNewWorkspaceDirectory, useWorkspaceId, useWorkspaces } from '@/hooks/domains/workspace';
import { useConfirmDeleteWorkspace } from '@/hooks/domains/workspace/useConfirmDeleteWorkspace';
import { useNavigateToWorkspace } from '@/hooks/routes';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { useTheme } from '@mui/material';

function WorkspaceList() {
  const workspaces = useWorkspaces();
  const currentWorkspaceId = useWorkspaceId();

  const {
    palette: { error },
  } = useTheme();

  const selectNewWorkspaceDirectory = useSelectNewWorkspaceDirectory();

  const openNameUpdateDialog = useOpenWorkspaceNameUpdateDialog();
  const openLanguageCodesDialog = useOpenLanguageCodesDialog();
  const selectWorkspace = useNavigateToWorkspace();
  const confirmDeleteWorkspace = useConfirmDeleteWorkspace();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuTitle label={'워크스페이스'} action={<SidebarMenuAddButton onClick={selectNewWorkspaceDirectory} />} />

        <SidebarMenuList>
          {workspaces.map((workspace) => {
            const { id, name } = workspace;

            const handleClick = () => selectWorkspace(id);
            const selected = currentWorkspaceId === id;

            return (
              <SidebarMenuListItem
                key={id}
                onClick={handleClick}
                selected={selected}
                menuItems={[
                  {
                    label: '이름 변경',
                    IconComponent: EditIcon,
                    onClick: () => openNameUpdateDialog(workspace),
                  },
                  {
                    label: '언어 추가',
                    IconComponent: TranslateOutlinedIcon,
                    onClick: () => openLanguageCodesDialog(workspace.id),
                  },
                  {
                    label: '삭제',
                    IconComponent: DeleteForeverIcon,
                    onClick: () => confirmDeleteWorkspace(workspace),
                    color: error.light,
                  },
                ]}
              >
                <EllipsisText label={name} variant={'body2'} reverse />
              </SidebarMenuListItem>
            );
          })}
        </SidebarMenuList>
      </SidebarMenu>

      <WorkspaceNameUpdateDialog />
    </>
  );
}

export default WorkspaceList;
