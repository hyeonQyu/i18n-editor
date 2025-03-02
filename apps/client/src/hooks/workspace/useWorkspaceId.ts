import { useRouter } from 'next/router';

function useWorkspaceId() {
  const router = useRouter();
  return router.query.workspace as string;
}

export default useWorkspaceId;
