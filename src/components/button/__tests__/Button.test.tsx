import { render, screen } from "../../../../internals/test";
import Button from "../Button";

describe("Button", () => {
  test("Should render buton", () => {
    const children = "children";
    render(<Button>{children}</Button>);
    expect(
      screen.getByRole("button", {
        name: children,
      })
    ).toBeInTheDocument();
  });
});
