import NamespaceList from '@components/Layout/components/Sidebar/components/NamespaceList';
import WorkspaceList from '@components/Layout/components/Sidebar/components/WorkspaceList';
import SidebarContainer from 'components/Layout/components/Sidebar/components/SidebarContainer';

function Sidebar() {
  return (
    <SidebarContainer>
      <WorkspaceList />
      <NamespaceList />
    </SidebarContainer>
  );
}

export default Sidebar;
