import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useRef } from 'react';

function ReactQueryClientProvider({ children }: { children: ReactNode }) {
  const queryClientRef = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
      },
    }),
  );

  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
}

export default ReactQueryClientProvider;
