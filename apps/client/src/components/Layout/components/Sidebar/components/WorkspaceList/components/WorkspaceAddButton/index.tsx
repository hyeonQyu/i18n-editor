import SidebarMenuAddButton from '@components/Layout/components/Sidebar/components/SidebarMenu/add';
import useAddNewWorkspace from '@hooks/workspace/useAddNewWorkspace';

function WorkspaceAddButton() {
  const addNewWorkspace = useAddNewWorkspace();

  const handleClick = () => addNewWorkspace();

  return <SidebarMenuAddButton onClick={handleClick} />;
}

export default WorkspaceAddButton;
