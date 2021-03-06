import { render, screen } from "../../internals/test";
import App from "../App";

describe("App", () => {
  test("Should render title", async () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /citibeer/i })
    ).toBeInTheDocument();
  });
});
