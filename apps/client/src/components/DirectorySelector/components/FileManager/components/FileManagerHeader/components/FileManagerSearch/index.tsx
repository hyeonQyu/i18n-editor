import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';

function FileManagerSearch() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }}
    >
      <IconButton aria-label={'search file manager'} size={'small'}>
        <SearchIcon fontSize={'medium'} />
      </IconButton>
    </Box>
  );
}

export default FileManagerSearch;
