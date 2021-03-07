import { ReactNode } from "react";
import merge from "lodash/merge";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import { ModalProvider } from "./modalContext";

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
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  );
}

export default Providers;
