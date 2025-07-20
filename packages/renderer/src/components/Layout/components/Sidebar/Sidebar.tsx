import NamespaceList from '@/components/Layout/components/Sidebar/components/NamespaceList';
import SidebarContainer from '@/components/Layout/components/Sidebar/components/SidebarContainer';
import WorkspaceList from '@/components/Layout/components/Sidebar/components/WorkspaceList/WorkspaceList';
import { useSidebarDisplayIndex } from '@/components/Layout/components/Sidebar/hooks/useSidebarDisplayIndex';

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
