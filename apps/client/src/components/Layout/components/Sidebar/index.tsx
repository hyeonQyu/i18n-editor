import NamespaceList from '@components/Layout/components/Sidebar/components/NamespaceList';
import WorkspaceList from '@components/Layout/components/Sidebar/components/WorkspaceList';
import useSidebarDisplayIndex from '@components/Layout/components/Sidebar/hooks/useSidebarDisplayIndex';
import SidebarContainer from 'components/Layout/components/Sidebar/components/SidebarContainer';

function Sidebar() {
  const displayIndex = useSidebarDisplayIndex();

  return (
    <SidebarContainer displayIndex={displayIndex}>
      <WorkspaceList />
      <NamespaceList />
    </SidebarContainer>
  );
}

export default Sidebar;
