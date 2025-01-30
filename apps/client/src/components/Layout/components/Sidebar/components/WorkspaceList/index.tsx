import EllipsisText from '@components/EllipsisText';
import SidebarMenuList from '@components/Layout/components/Sidebar/components/SidebarMenu/list';
import SidebarMenuListItem from '@components/Layout/components/Sidebar/components/SidebarMenu/list/item';
import SidebarMenuTitle from '@components/Layout/components/Sidebar/components/SidebarMenu/title';
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

  return (
    <SidebarMenu>
      <SidebarMenuTitle>workspace</SidebarMenuTitle>

      <SidebarMenuList>
        {workspaces.map(({ id, name }) => (
          <SidebarMenuListItem
            key={id}
            menuItems={[
              {
                label: '이름 변경',
                IconComponent: EditIcon,
                onClick: () => {},
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
        ))}
      </SidebarMenuList>
    </SidebarMenu>
  );
}

export default WorkspaceList;
