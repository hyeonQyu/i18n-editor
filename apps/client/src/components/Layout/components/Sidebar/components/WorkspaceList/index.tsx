import EllipsisText from '@components/EllipsisText';
import SidebarMenuList from '@components/Layout/components/Sidebar/components/SidebarMenu/list';
import SidebarMenuListItem from '@components/Layout/components/Sidebar/components/SidebarMenu/list/item';
import SidebarMenuTitle from '@components/Layout/components/Sidebar/components/SidebarMenu/title';
import WorkspaceNameUpdateDialog from '@components/Layout/components/Sidebar/components/WorkspaceList/components/WorkspaceNameUpdateDialog';
import useOpenWorkspaceNameUpdateDialog from '@components/Layout/components/Sidebar/components/WorkspaceList/hooks/useOpenWorkspaceNameUpdateDialog';
import useWorkspaces from '@hooks/workspace/useWorkspaces';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material';
import SidebarMenu from 'components/Layout/components/Sidebar/components/SidebarMenu';

function WorkspaceList() {
  const workspaces = useWorkspaces();

  const {
    palette: { error },
  } = useTheme();

  const openNameUpdateDialog = useOpenWorkspaceNameUpdateDialog();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuTitle>워크스페이스</SidebarMenuTitle>

        <SidebarMenuList>
          {workspaces.map((workspace) => {
            const { id, name } = workspace;

            return (
              <SidebarMenuListItem
                key={id}
                menuItems={[
                  {
                    label: '이름 변경',
                    IconComponent: EditIcon,
                    onClick: () => openNameUpdateDialog(workspace),
                  },
                  {
                    label: '삭제',
                    IconComponent: DeleteForeverIcon,
                    onClick: () => {},
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
