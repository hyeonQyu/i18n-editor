import useWorkspace from '@hooks/workspace/useWorkspace';
import { useRouter } from 'next/router';

function useRouteNamespacePage() {
  const router = useRouter();
  const workspace = useWorkspace();

  return (namespace: string) => {
    if (!workspace?.id) return;
    return router.push({
      pathname: '/[workspace]/[namespace]',
      query: { workspace: workspace.id, namespace },
    });
  };
}

export default useRouteNamespacePage;
