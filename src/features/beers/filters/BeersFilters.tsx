import Field from "components/field/Field";
import classes from "./BeersFilters.module.scss";
import { useFilters } from "./filtersContext";

function BeersFilters() {
  const { filters, setFilters } = useFilters();

  return (
    <form className={classes.wrapper}>
      <Field
        label="Name"
        name="beerName"
        onChange={(value: string) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            beerName: value,
          }));
        }}
        value={filters.beerName}
      />
      <Field
        label="First brewed"
        name="firstBrewed"
        type="month"
        placeholder="YYYY-MM"
        pattern={/^(\d{0,4}(-(0[1-9]{0,1}|1[0-2]{0,1})?)?)?$/}
        onChange={(value: string) => {
          if (!value || value.length === 4 || value.includes("-")) {
            setFilters((prevFilters) => ({
              ...prevFilters,
              firstBrewed: value.split("-").reverse().join("-"),
            }));
          }
        }}
        value={filters.firstBrewed?.split("-").reverse().join("-")}
      />
    </form>
  );
}

export default BeersFilters;
