import { render, screen, waitFor } from "../../../../internals/test";
import Spinner from "../Spinner";

describe("Spinner", () => {
  test("Should render spinner if is mountend more than 250 seconds", async () => {
    render(<Spinner />);

    expect(
      screen.queryByRole("alert", { name: /spinner/i })
    ).not.toBeInTheDocument();

    await waitFor(
      () =>
        expect(
          screen.getByRole("alert", { name: /spinner/i })
        ).toBeInTheDocument(),
      { timeout: 250 }
    );
  });
});
