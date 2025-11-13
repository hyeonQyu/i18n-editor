import { NamespaceList, SidebarContainer, WorkspaceList } from '@/components/Layout/components/Sidebar/components';
import { useSidebarDisplayIndex } from '@/components/Layout/components/Sidebar/hooks';

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
