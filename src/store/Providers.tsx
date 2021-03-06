import { ReactNode } from "react";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import merge from "lodash/merge";

type ProvidersProps = {
  children: ReactNode;
  options?: {
    queryClient: Partial<DefaultOptions>;
  };
};

const queryClientDefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

function Providers({ children, options }: ProvidersProps) {
  const queryClient = new QueryClient({
    defaultOptions: merge(queryClientDefaultOptions, options?.queryClient),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
