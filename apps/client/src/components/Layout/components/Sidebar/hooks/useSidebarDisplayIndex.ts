import { useRouter } from 'next/router';

function useSidebarDisplayIndex() {
  const router = useRouter();

  if (router.pathname === '/[workspace]') return 0;

  if (router.pathname === '/[workspace]/[namespace]') return 1;

  return -1;
}

export default useSidebarDisplayIndex;
