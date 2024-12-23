import EllipsisText from '@components/EllipsisText';
import SidebarMenuList from '@components/Layout/components/Sidebar/components/SidebarMenu/list';
import SidebarMenuListItem from '@components/Layout/components/Sidebar/components/SidebarMenu/list/item';
import SidebarMenuTitle from '@components/Layout/components/Sidebar/components/SidebarMenu/title';
import WorkspaceDeleteConfirmDialog from '@components/Layout/components/Sidebar/components/WorkspaceList/components/WorkspaceDeleteConfirmDialog';
import WorkspaceNameUpdateDialog from '@components/Layout/components/Sidebar/components/WorkspaceList/components/WorkspaceNameUpdateDialog';
import useDeleteWorkspaceHandler from '@components/Layout/components/Sidebar/components/WorkspaceList/hooks/useDeleteWorkspaceHandler';
import useOpenWorkspaceNameUpdateDialog from '@components/Layout/components/Sidebar/components/WorkspaceList/hooks/useOpenWorkspaceNameUpdateDialog';
import useWorkspaces from '@hooks/workspace/useWorkspaces';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material';
import { useWorkspace } from '@providers/WorkspaceProvider';
import SidebarMenu from 'components/Layout/components/Sidebar/components/SidebarMenu';
import useSelectWorkspaceHandler from './hooks/useSelectWorkspaceHandler';

function WorkspaceList() {
  const workspaces = useWorkspaces();
  const currentWorkspace = useWorkspace();

  const {
    palette: { error },
  } = useTheme();

  const openNameUpdateDialog = useOpenWorkspaceNameUpdateDialog();
  const selectWorkspace = useSelectWorkspaceHandler();
  const deleteWorkspace = useDeleteWorkspaceHandler();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuTitle>워크스페이스</SidebarMenuTitle>

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
                    label: '삭제',
                    IconComponent: DeleteForeverIcon,
                    onClick: () => deleteWorkspace(id),
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
      <WorkspaceDeleteConfirmDialog />
    </>
  );
}

export default WorkspaceList;
