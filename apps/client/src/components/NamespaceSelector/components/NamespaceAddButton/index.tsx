import SidebarMenuAddButton from '@components/Layout/components/Sidebar/components/SidebarMenu/add';
import useAddNamespaceClickHandler from '@hooks/namespace/useAddNamespaceClickHandler';

function NamespaceAddButton() {
  const handleClick = useAddNamespaceClickHandler();

  return <SidebarMenuAddButton onClick={handleClick} />;
}

export default NamespaceAddButton;
