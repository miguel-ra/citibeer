import { render, screen } from "../../../../internals/test";
import SelectField from "../SelectField";

describe("SelectField", () => {
  test("Should render checkbox field", () => {
    const label = "label";
    const name = "name";

    render(
      <SelectField label={label} name={name}>
        <option></option>
      </SelectField>
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", {
        name: label,
      })
    ).toBeInTheDocument();
  });
});
