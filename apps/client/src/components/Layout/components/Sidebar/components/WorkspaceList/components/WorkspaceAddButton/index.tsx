import SidebarMenuAddButton from '@components/Layout/components/Sidebar/components/SidebarMenu/add';
import useAddWorkspaceClickHandler from '@hooks/workspace/useAddWorkspaceClickHandler';

function WorkspaceAddButton() {
  const handleClick = useAddWorkspaceClickHandler();

  return <SidebarMenuAddButton onClick={handleClick} />;
}

export default WorkspaceAddButton;
