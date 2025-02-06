import EllipsisText from '@components/EllipsisText';
import useSelectNamespaceHandler from '@components/Layout/components/Sidebar/components/NamespaceList/hooks/useSelectNamespaceHandler';
import SidebarMenu from '@components/Layout/components/Sidebar/components/SidebarMenu';
import SidebarMenuList from '@components/Layout/components/Sidebar/components/SidebarMenu/list';
import SidebarMenuListItem from '@components/Layout/components/Sidebar/components/SidebarMenu/list/item';
import SidebarMenuTitle from '@components/Layout/components/Sidebar/components/SidebarMenu/title';
import useNamespaces from '@hooks/namespace/useNamespaces';
import { Typography, useTheme } from '@mui/material';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';

function NamespaceList() {
  const {
    palette: { text },
  } = useTheme();

  const workspace = useWorkspace();
  const namespaces = useNamespaces();

  const currentNamespace = useWorkspaceStore(({ namespace }) => namespace);

  const selectNamespace = useSelectNamespaceHandler();

  if (!workspace || namespaces.length === 0) return null;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuTitle>
          네임스페이스
          <span>
            <Typography
              variant={'body2'}
              sx={{
                width: 'fit-content',
                display: 'inline-flex',
                marginLeft: '8px',
                color: text.secondary,
              }}
            >
              [{workspace.name}]
            </Typography>
          </span>
        </SidebarMenuTitle>

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
