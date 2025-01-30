import PaperSection from '@components/PaperSection';
import useNamespaces from '@hooks/namespace/useNamespaces';
import useRouteNamespacePage from '@hooks/namespace/useRouteNamespacePage';
import { ListItemText, MenuItem, MenuList } from '@mui/material';

function WorkspaceViewNamespaceSelector() {
  const namespaces = useNamespaces();

  const toNamespace = useRouteNamespacePage();

  if (!namespaces.length) return null;

  return (
    <PaperSection titleProps={{ children: '네임스페이스', sx: { padding: '16px' } }}>
      <MenuList>
        {namespaces.map((namespace) => (
          <MenuItem key={namespace} style={{ height: '56px' }} onClick={() => toNamespace(namespace)}>
            <ListItemText>{namespace}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </PaperSection>
  );
}

export default WorkspaceViewNamespaceSelector;
