import BeersFilters from "./filters/BeersFilters";
import BeersData from "./BeersData";
import { BeersProvider } from "./beersContext";

function BeersCatalog() {
  return (
    <BeersProvider>
      <BeersFilters />
      <BeersData />
    </BeersProvider>
  );
}

export default BeersCatalog;
