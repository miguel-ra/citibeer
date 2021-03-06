import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
