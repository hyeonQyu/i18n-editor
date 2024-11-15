import HomeIcon from '@mui/icons-material/Home';
import { Box, Breadcrumbs, Link } from '@mui/material';

function FileManagerBreadcrumbs() {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        border: `1px solid rgba(25, 118, 210, 0.5)`,
        borderRadius: '4px',
      }}
    >
      <Breadcrumbs
        sx={{
          overflowX: 'auto',
          width: '100%',
          scrollbarWidth: 'none',

          '&::webkit-scrollbar': {
            display: 'none',
          },

          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap',
          },

          '& .MuiBreadcrumbs-separator': {
            margin: '6px',
          },
        }}
      >
        <Link component={'button'} color={'inherit'} sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon />
        </Link>
        <Link component={'button'} color={'inherit'} underline={'hover'} sx={{ display: 'flex', alignItems: 'center' }}>
          dasfas
        </Link>
        <Link component={'button'} color={'inherit'} underline={'hover'} sx={{ display: 'flex', alignItems: 'center' }}>
          dasfas
        </Link>
        <Link component={'button'} color={'inherit'} underline={'hover'} sx={{ display: 'flex', alignItems: 'center' }}>
          dasfas
        </Link>
        <Link component={'button'} color={'inherit'} underline={'hover'} sx={{ display: 'flex', alignItems: 'center' }}>
          dasfas
        </Link>
        <Link component={'button'} color={'inherit'} underline={'hover'} sx={{ display: 'flex', alignItems: 'center' }}>
          dasfas
        </Link>
        <Link component={'button'} color={'inherit'} underline={'hover'} sx={{ display: 'flex', alignItems: 'center' }}>
          dasfas
        </Link>
        <Link component={'button'} color={'inherit'} underline={'hover'} sx={{ display: 'flex', alignItems: 'center' }}>
          dasfas
        </Link>
      </Breadcrumbs>
    </Box>
  );
}

export default FileManagerBreadcrumbs;
