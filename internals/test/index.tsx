import { FC, ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import Providers from "store/Providers";

function render(ui: ReactElement) {
  const Wrapper: FC = ({ children }) => (
    <Providers options={{ queryClient: { queries: { retry: false } } }}>
      {children}
    </Providers>
  );
  return rtlRender(ui, { wrapper: Wrapper });
}

export * from "@testing-library/react";
// override React Testing Library's render with our own
export { render };
