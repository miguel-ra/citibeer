import { render, screen } from "../../../../internals/test";
import CheckboxField from "../CheckboxField";

describe("CheckboxField", () => {
  test("Should render checkbox field", () => {
    const label = "label";
    const name = "name";

    render(<CheckboxField label={label} name={name} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", {
        name: label,
      })
    ).toBeInTheDocument();
  });
});
