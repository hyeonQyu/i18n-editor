import EllipsisText from '@components/EllipsisText';
import NamespaceAddButton from '@components/Layout/components/Sidebar/components/NamespaceList/components/NamespaceAddButton';
import SidebarMenu from '@components/Layout/components/Sidebar/components/SidebarMenu';
import SidebarMenuList from '@components/Layout/components/Sidebar/components/SidebarMenu/list';
import SidebarMenuListItem from '@components/Layout/components/Sidebar/components/SidebarMenu/list/item';
import SidebarMenuTitle from '@components/Layout/components/Sidebar/components/SidebarMenu/title';
import useNamespace from '@hooks/namespace/useNamespace';
import useNamespaces from '@hooks/namespace/useNamespaces';
import useRouteNamespacePage from '@hooks/namespace/useRouteNamespacePage';
import useWorkspace from '@hooks/workspace/useWorkspace';

function NamespaceList() {
  const workspace = useWorkspace();
  const namespaces = useNamespaces();

  const currentNamespace = useNamespace();

  const selectNamespace = useRouteNamespacePage();

  if (!workspace || namespaces.length === 0) return null;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuTitle label={workspace.name} action={<NamespaceAddButton />} />

        <SidebarMenuList>
          {namespaces.map((namespace) => (
            <SidebarMenuListItem key={namespace} onClick={() => selectNamespace(namespace)} selected={currentNamespace === namespace}>
              <EllipsisText label={namespace} variant={'body2'} />
            </SidebarMenuListItem>
          ))}
        </SidebarMenuList>
      </SidebarMenu>
    </>
  );
}

export default NamespaceList;
