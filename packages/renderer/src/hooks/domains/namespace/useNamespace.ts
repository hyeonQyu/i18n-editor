import { useParams } from 'react-router-dom';

export const useNamespace = () => {
  const { namespace } = useParams<{ namespace: string }>();
  return namespace;
};
