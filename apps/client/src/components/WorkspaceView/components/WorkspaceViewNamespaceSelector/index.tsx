import useNamespaces from '@hooks/namespace/useNamespaces';
import useRouteNamespacePage from '@hooks/namespace/useRouteNamespacePage';
import { ListItemText, MenuItem, MenuList, Paper } from '@mui/material';

function WorkspaceViewNamespaceSelector() {
  const namespaces = useNamespaces();

  const toNamespace = useRouteNamespacePage();

  if (!namespaces.length) return null;

  return (
    <Paper>
      <MenuList>
        {namespaces.map((namespace) => (
          <MenuItem key={namespace} style={{ height: '56px' }} onClick={() => toNamespace(namespace)}>
            <ListItemText>{namespace}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}

export default WorkspaceViewNamespaceSelector;
