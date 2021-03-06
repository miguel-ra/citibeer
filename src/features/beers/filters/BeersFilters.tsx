import Field from "components/field/Field";
import classes from "./BeersFilters.module.scss";

function BeersFilters() {
  return (
    <form className={classes.wrapper}>
      <Field label="Name" name="beerName" />
      <Field
        label="First brewed"
        name="beerFirstBrewed"
        type="month"
        placeholder="YYYY-MM"
        pattern={/^(\d{0,4}(-(0[1-9]{0,1}|1[0-2]{0,1})?)?)?$/}
        onChange={(event) => console.log(event.target.value)}
      />
    </form>
  );
}

export default BeersFilters;
