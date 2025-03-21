import PaperSection from '@components/PaperSection';
import AddablePaperSectionTitle from '@components/WorkspaceView/components/AddablePapaerSectionTitle';
import NamespaceDeleteButton from '@components/WorkspaceView/components/WorkspaceViewNamespaceSelector/NamespaceDeleteButton';
import useAddNamespaceClickHandler from '@hooks/namespace/useAddNamespaceClickHandler';
import useNamespaces from '@hooks/namespace/useNamespaces';
import useRouteNamespacePage from '@hooks/namespace/useRouteNamespacePage';
import { ListItemText, MenuItem, MenuList } from '@mui/material';

function WorkspaceViewNamespaceSelector() {
  const namespaces = useNamespaces();

  const toNamespace = useRouteNamespacePage();
  const handleClickAddNamespace = useAddNamespaceClickHandler();

  if (!namespaces.length) return null;

  return (
    <PaperSection
      titleProps={{
        children: <AddablePaperSectionTitle title="네임스페이스" onClick={handleClickAddNamespace} />,
        sx: { padding: '16px' },
      }}
    >
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
