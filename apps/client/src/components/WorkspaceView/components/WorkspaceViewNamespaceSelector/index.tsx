import PaperSection from '@components/PaperSection';
import AddablePaperSectionTitle from '@components/WorkspaceView/components/AddablePapaerSectionTitle';
import useFilteredNamespaces from '@components/WorkspaceView/components/WorkspaceViewNamespaceSelector/hooks/useFilteredNamespaces';
import NamespaceDeleteButton from '@components/WorkspaceView/components/WorkspaceViewNamespaceSelector/NamespaceDeleteButton';
import useAddNamespaceClickHandler from '@hooks/namespace/useAddNamespaceClickHandler';
import useNamespaces from '@hooks/namespace/useNamespaces';
import useRouteNamespacePage from '@hooks/namespace/useRouteNamespacePage';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, ListItemText, MenuItem, MenuList, TextField, useTheme } from '@mui/material';
import { ChangeEventHandler, useRef, useState } from 'react';

function WorkspaceViewNamespaceSelector() {
  const {
    palette: { text },
  } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  };

  const handleClear = () => {
    setKeyword('');
    inputRef.current?.focus();
  };

  const namespaces = useNamespaces();

  const toNamespace = useRouteNamespacePage();
  const handleClickAddNamespace = useAddNamespaceClickHandler();

  const filteredNamespaces = useFilteredNamespaces(namespaces, keyword);

  if (!namespaces.length) return null;

  return (
    <PaperSection
      titleProps={{
        children: (
          <AddablePaperSectionTitle onClick={handleClickAddNamespace}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span>네임스페이스</span>

              <TextField
                inputRef={inputRef}
                sx={{
                  flex: 1,
                  '& .MuiFilledInput-input': {
                    pt: 1.5,
                    pb: 1,
                    pl: 1,
                  },
                }}
                size="small"
                placeholder="검색"
                variant="filled"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: text.secondary }} />,
                  endAdornment: keyword && (
                    <IconButton onClick={handleClear} size="small" sx={{ color: text.secondary }}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
                onChange={handleChange}
                value={keyword}
              />
            </Box>
          </AddablePaperSectionTitle>
        ),
        sx: { padding: '16px' },
      }}
    >
      <MenuList>
        {filteredNamespaces.map((namespace) => (
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
