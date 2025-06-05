import { QueryClientProvider as Provider } from '@tanstack/react-query';

import { queryClient } from './query-client';

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={queryClient}>{children}</Provider>;
}
