import EllipsisText from '@components/EllipsisText';
import NamespaceListTitleLabel from '@components/Layout/components/Sidebar/components/NamespaceList/components/NamespaceListTitleLabel';
import useSelectNamespaceHandler from '@components/Layout/components/Sidebar/components/NamespaceList/hooks/useSelectNamespaceHandler';
import SidebarMenu from '@components/Layout/components/Sidebar/components/SidebarMenu';
import SidebarMenuList from '@components/Layout/components/Sidebar/components/SidebarMenu/list';
import SidebarMenuListItem from '@components/Layout/components/Sidebar/components/SidebarMenu/list/item';
import SidebarMenuTitle from '@components/Layout/components/Sidebar/components/SidebarMenu/title';
import NamespaceAddButton from '@components/NamespaceSelector/components/NamespaceAddButton';
import useNamespaces from '@hooks/namespace/useNamespaces';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';

function NamespaceList() {
  const workspace = useWorkspace();
  const namespaces = useNamespaces();

  const currentNamespace = useWorkspaceStore(({ namespace }) => namespace);

  const selectNamespace = useSelectNamespaceHandler();

  if (!workspace || namespaces.length === 0) return null;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuTitle label={<NamespaceListTitleLabel />} action={<NamespaceAddButton />} />

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
