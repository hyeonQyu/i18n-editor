import PaperSection from '@components/PaperSection';
import NamespaceDeleteButton from '@components/WorkspaceView/components/WorkspaceViewNamespaceSelector/NamespaceDeleteButton';
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
          <MenuItem
            key={namespace}
            sx={{
              height: '56px',
              padding: '0 32px',

              '& .namespace-delete-button': {
                opacity: 0,
                transition: 'opacity 0.2s',
              },

              '&:hover .namespace-delete-button': {
                opacity: 1,
              },
            }}
            onClick={() => toNamespace(namespace)}
          >
            <ListItemText>{namespace}</ListItemText>

            <NamespaceDeleteButton namespace={namespace} />
          </MenuItem>
        ))}
      </MenuList>
    </PaperSection>
  );
}

export default WorkspaceViewNamespaceSelector;
