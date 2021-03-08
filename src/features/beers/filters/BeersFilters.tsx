import CheckboxField from "components/field/CheckboxField";
import Field from "components/field/Field";
import SelectField from "components/field/SelectField";
import { useBeers } from "../beersContext";
import classes from "./BeersFilters.module.scss";

function BeersFilters() {
  const { options, setOptions } = useBeers();

  return (
    <form className={classes.wrapper}>
      <div className={classes.row}>
        <Field
          label="Name"
          name="beerName"
          onChange={(value: string) => {
            setOptions((prevOptions) => ({
              ...prevOptions,
              beerName: value,
            }));
          }}
          value={options.beerName}
        />
        <Field
          label="First brewed"
          name="firstBrewed"
          type="month"
          placeholder="YYYY-MM"
          pattern={/^(\d{0,4}(-(0[1-9]{0,1}|1[0-2]{0,1})?)?)?$/}
          onChange={(value: string) => {
            if (!value || value.length === 4 || value.includes("-")) {
              setOptions((prevOptions) => ({
                ...prevOptions,
                firstBrewed: value.split("-").reverse().join("-"),
              }));
            }
          }}
          value={options.firstBrewed?.split("-").reverse().join("-")}
        />
      </div>
      <div className={classes.rowReverse}>
        <CheckboxField
          label="Show only saved beers"
          name="showSaved"
          onChange={(value: boolean) => {
            setOptions((prevOptions) => ({
              ...prevOptions,
              showSaved: value,
            }));
          }}
          checked={options.showSaved}
        />
        <SelectField
          label="View"
          name="viewMode"
          onChange={(value: string) => {
            setOptions((prevOptions) => ({
              ...prevOptions,
              viewMode: value === "grid" ? "grid" : "list",
            }));
          }}
          value={options.viewMode}
        >
          <option value="list">List</option>
          <option value="grid">Grid</option>
        </SelectField>
      </div>
    </form>
  );
}

export default BeersFilters;
