import { FC, ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import Providers from "store/Providers";

function renderWithProviders(ui: ReactElement) {
  const Wrapper: FC = ({ children }) => (
    <Providers options={{ queryClient: { queries: { retry: false } } }}>
      {children}
    </Providers>
  );
  return rtlRender(ui, { wrapper: Wrapper });
}

export * from "@testing-library/react";
// override React Testing Library's render with our own
export { renderWithProviders };
