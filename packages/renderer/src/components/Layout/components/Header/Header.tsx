import { AddButton, SidebarController } from '@/components/Layout/components/Header/components';
import { AppBar, Toolbar, Typography, useTheme } from '@mui/material';

function Header() {
  const {
    palette: { primary },
  } = useTheme();

  return (
    <AppBar position={'fixed'}>
      <Toolbar sx={{ backgroundColor: primary.main }}>
        <SidebarController />
        <Typography variant={'h6'} noWrap component={'div'} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, padding: '0 8px' }}>
          i18n Editor
        </Typography>
        <AddButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
