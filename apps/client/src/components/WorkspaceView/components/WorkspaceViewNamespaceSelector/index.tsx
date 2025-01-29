import useNamespaces from '@hooks/namespace/useNamespaces';
import useRouteNamespacePage from '@hooks/namespace/useRouteNamespacePage';
import { Box, ListItemText, MenuItem, MenuList, Paper } from '@mui/material';

function WorkspaceViewNamespaceSelector() {
  const namespaces = useNamespaces();

  const toNamespace = useRouteNamespacePage();

  if (!namespaces.length) return null;

  return (
    <Box sx={{ padding: '0 16px' }}>
      <Paper>
        <MenuList>
          {namespaces.map((namespace) => (
            <MenuItem key={namespace} style={{ height: '56px' }} onClick={() => toNamespace(namespace)}>
              <ListItemText>{namespace}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Box>
  );
}

export default WorkspaceViewNamespaceSelector;
