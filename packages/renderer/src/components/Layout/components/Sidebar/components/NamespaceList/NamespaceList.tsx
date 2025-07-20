import EllipsisText from '@/components/EllipsisText';
import SidebarMenu, {
  SidebarMenuAddButton,
  SidebarMenuList,
  SidebarMenuListItem,
  SidebarMenuTitle,
} from '@/components/Layout/components/Sidebar/components/SidebarMenu';
import { useNamespace, useNamespaces, useSetNamespace } from '@/hooks/domains/namespace';
import { useWorkspace } from '@/hooks/domains/workspace';

function NamespaceList() {
  const workspace = useWorkspace();
  const namespaces = useNamespaces(workspace?.id);

  const currentNamespace = useNamespace();

  const setNamespace = useSetNamespace();

  if (!workspace || namespaces.length === 0) return null;

  const handleClickAddButton = () => {
    // namespace 추가
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuTitle label={workspace.name} action={<SidebarMenuAddButton onClick={handleClickAddButton} />} />

        <SidebarMenuList>
          {namespaces.map((namespace) => (
            <SidebarMenuListItem key={namespace} onClick={() => setNamespace(namespace)} selected={currentNamespace === namespace}>
              <EllipsisText label={namespace} variant={'body2'} />
            </SidebarMenuListItem>
          ))}
        </SidebarMenuList>
      </SidebarMenu>
    </>
  );
}

export default NamespaceList;
