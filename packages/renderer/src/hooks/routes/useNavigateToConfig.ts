import { useNavigate } from 'react-router-dom';

export const useNavigateToConfig = () => {
  const navigate = useNavigate();

  return () => {
    navigate('/config');
  };
};
