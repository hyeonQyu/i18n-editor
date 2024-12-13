import { useLayoutStore } from '@components/Layout/stores';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

function SidebarController() {
  const { toggleSidebar } = useLayoutStore();

  const handleClick = () => toggleSidebar();

  return (
    <IconButton size={'large'} edge={'start'} color={'inherit'} aria-label={'open drawer'} onClick={handleClick}>
      <MenuIcon />
    </IconButton>
  );
}

export default SidebarController;
