import { useUIConfig, useUpdateUIConfig } from '@/hooks/domains/ui';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { IconButton, Tooltip } from '@mui/material';

function SidebarController() {
  const { sidebarOpened } = useUIConfig();
  const updateUIConfig = useUpdateUIConfig();

  const handleClick = () => updateUIConfig({ sidebarOpened: !sidebarOpened });

  const tooltipMessage = sidebarOpened ? '사이드바 닫기' : '사이드바 열기';

  return (
    <Tooltip title={tooltipMessage}>
      <IconButton size={'large'} edge={'start'} color={'inherit'} aria-label={'open drawer'} onClick={handleClick}>
        <SpaceDashboardOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}

export default SidebarController;
