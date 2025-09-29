import { useNavigateToConfig } from '@/hooks/routes';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';

function ConfigButton() {
  const navigateToConfig = useNavigateToConfig();

  const handleClick = () => navigateToConfig();

  return (
    <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
      <SettingsIcon />
    </IconButton>
  );
}

export default ConfigButton;
