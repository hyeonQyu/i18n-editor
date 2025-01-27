import { useRouter } from 'next/router';

function useRouteWorkspacePage() {
  const router = useRouter();

  return (workspaceId: string) =>
    router.push({
      pathname: '/[workspace]',
      query: { workspace: workspaceId },
    });
}

export default useRouteWorkspacePage;
