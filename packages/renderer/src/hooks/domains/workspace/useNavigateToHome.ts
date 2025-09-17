import { useNavigate } from 'react-router-dom';

export const useNavigateToHome = () => {
  const navigate = useNavigate();

  return () => {
    navigate('/');
  };
};
