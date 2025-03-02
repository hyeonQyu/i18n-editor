import { useRouter } from 'next/router';

function useNamespace() {
  const router = useRouter();
  return router.query.namespace as string;
}

export default useNamespace;
