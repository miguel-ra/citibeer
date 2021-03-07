import BeersFilters from "./filters/BeersFilters";
import BeersData from "./BeersData";
import { FiltersProvider } from "./filters/filtersContext";

function BeersCatalog() {
  return (
    <FiltersProvider>
      <BeersFilters />
      <BeersData />
    </FiltersProvider>
  );
}

export default BeersCatalog;
