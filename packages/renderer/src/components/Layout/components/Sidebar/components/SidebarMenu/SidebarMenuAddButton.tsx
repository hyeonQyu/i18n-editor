import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

interface SidebarMenuAddButtonProps {
  onClick: () => void;
}

function SidebarMenuAddButton(props: SidebarMenuAddButtonProps) {
  const { onClick } = props;

  return (
    <IconButton onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
}

export default SidebarMenuAddButton;
