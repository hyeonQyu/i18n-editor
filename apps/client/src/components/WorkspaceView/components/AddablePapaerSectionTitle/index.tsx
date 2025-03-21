import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material';

interface AddablePaperSectionTitleProps {
  title: string;
  onClick: () => void;
}

function AddablePaperSectionTitle(props: AddablePaperSectionTitleProps) {
  const { title, onClick } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>{title}</span>
      <IconButton onClick={onClick}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default AddablePaperSectionTitle;
