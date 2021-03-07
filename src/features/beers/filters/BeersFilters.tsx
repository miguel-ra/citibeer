import CheckboxField from "components/field/CheckboxField";
import Field from "components/field/Field";
import { useBeers } from "../beersContext";
import classes from "./BeersFilters.module.scss";

function BeersFilters() {
  const { filters, setFilters } = useBeers();

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
      <CheckboxField
        label="Show only favorite beers"
        name="showFavorites"
        onChange={(value: boolean) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            showFavorites: value,
          }));
        }}
        checked={filters.showFavorites}
      />
    </form>
  );
}

export default BeersFilters;
