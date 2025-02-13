import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material';
import { ReactNode } from 'react';

interface AddablePaperSectionTitleProps {
  onClick: () => void;
  children: ReactNode;
}

function AddablePaperSectionTitle(props: AddablePaperSectionTitleProps) {
  const { children, onClick } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      {children}
      <IconButton onClick={onClick}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default AddablePaperSectionTitle;
