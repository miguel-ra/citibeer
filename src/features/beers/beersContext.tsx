import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import BeersRepositoryInMemory from "services/beers/BeersRepositoryInMemory";
import { BeerView, beerViewToBeer } from "./beerViewModel";

const beersRepositoryInMemory = new BeersRepositoryInMemory();

type BeersProviderProps = {
  children: ReactNode;
};

type Filters = {
  beerName?: string;
  firstBrewed?: string;
  showSaved?: boolean;
  viewMode: "list" | "grid";
};

type BeersContextValue = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  savedIds: number[];
  saveBeer: (beer: BeerView) => void;
  removeBeer: (beerId: number) => void;
};

const initialValue = {
  filters: {
    viewMode: "list" as const,
  },
  setFilters: () => {},
  savedIds: [],
  saveBeer: () => {},
  removeBeer: () => {},
};

const BeersContext = createContext<BeersContextValue>(initialValue);

function useBeers() {
  const context = useContext(BeersContext);

  if (!context) {
    throw new Error("useBeers must be used within the BeersContext");
  }
  return context;
}

function BeersProvider({ children }: BeersProviderProps) {
  const [filters, setFilters] = useState<Filters>(initialValue.filters);
  const [savedIds, setSavedIds] = useState<number[]>(initialValue.savedIds);

  useEffect(() => {
    beersRepositoryInMemory.getAll().then((data) => {
      const storedBeers = data.map((beer) => beer.id);
      if (storedBeers.length) {
        setSavedIds(storedBeers);
      }
    });
  }, []);

  const saveBeer = useCallback((beerView: BeerView) => {
    beersRepositoryInMemory
      .add(beerViewToBeer(beerView))
      .then((storedBeers) => setSavedIds(storedBeers.map((beer) => beer.id)));
  }, []);

  const removeBeer = useCallback((beerId: number) => {
    beersRepositoryInMemory
      .remove(beerId)
      .then((storedBeers) => setSavedIds(storedBeers.map((beer) => beer.id)));
  }, []);

  return (
    <BeersContext.Provider
      value={{
        filters,
        setFilters,
        savedIds,
        saveBeer,
        removeBeer,
      }}
    >
      {children}
    </BeersContext.Provider>
  );
}

export { BeersProvider, useBeers };
