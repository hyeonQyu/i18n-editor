import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BackwardButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackwardButton;
