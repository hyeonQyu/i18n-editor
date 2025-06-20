import useSidebarOpened from '@hooks/ui/useSidebarOpened';
import useUpdatePartialUIConfig from '@hooks/ui/useUpdatePartialUIConfig';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { IconButton, Tooltip } from '@mui/material';

function SidebarController() {
  const sidebarOpened = useSidebarOpened();
  const updatePartialUIConfig = useUpdatePartialUIConfig();

  const handleClick = () => updatePartialUIConfig({ ui: { sidebarOpened: !sidebarOpened } });

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
