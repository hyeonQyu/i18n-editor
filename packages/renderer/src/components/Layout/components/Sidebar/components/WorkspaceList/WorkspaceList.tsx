import EllipsisText from '@/components/EllipsisText';
import SidebarMenu, {
  SidebarMenuAddButton,
  SidebarMenuList,
  SidebarMenuListItem,
  SidebarMenuTitle,
} from '@/components/Layout/components/Sidebar/components/SidebarMenu';
import { useSetWorkspace, useWorkspace, useWorkspaces } from '@/hooks/domains/workspace';
import { useConfirmDeleteWorkspace } from '@/hooks/domains/workspace/useConfirmDeleteWorkspace';
import { Workspace } from '@i18n-editor/shared';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { useTheme } from '@mui/material';

function WorkspaceList() {
  const workspaces = useWorkspaces();
  const currentWorkspace = useWorkspace();

  const {
    palette: { error },
  } = useTheme();

  // const openNameUpdateDialog = useOpenWorkspaceNameUpdateDialog();
  // const openLanguageCodesDialog = useOpenLanguageCodesDialog();
  const openNameUpdateDialog = (workspace: Workspace) => {};
  const openLanguageCodesDialog = (workspaceId: string) => {};
  const selectWorkspace = useSetWorkspace();
  const confirmDeleteWorkspace = useConfirmDeleteWorkspace();

  const handleClickAddButton = () => {
    // workspace 추가
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuTitle label={'워크스페이스'} action={<SidebarMenuAddButton onClick={handleClickAddButton} />} />

        <SidebarMenuList>
          {workspaces.map((workspace) => {
            const { id, name } = workspace;

            const handleClick = () => selectWorkspace(id);
            const selected = currentWorkspace?.id === id;

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
      {/* <WorkspaceNameUpdateDialog /> */}
    </>
  );
}

export default WorkspaceList;
