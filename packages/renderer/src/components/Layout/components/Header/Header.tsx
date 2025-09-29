import { SidebarController } from '@/components/Layout/components/Header/components';
import { BackwardButton } from '@/components/Layout/components/Header/components/BackwardButton';
import { ConfigButton } from '@/components/Layout/components/Header/components/ConfigButton';
import { AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

function Header() {
  const {
    palette: { primary },
  } = useTheme();

  const location = useLocation();
  const isConfigPage = location.pathname === '/config';

  return (
    <AppBar position={'fixed'}>
      <Toolbar sx={{ backgroundColor: primary.main }}>
        <SidebarController />
        <Typography variant={'h6'} noWrap component={'div'} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, padding: '0 8px' }}>
          i18n Editor
        </Typography>
        {isConfigPage ? <BackwardButton /> : <ConfigButton />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
