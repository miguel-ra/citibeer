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
import omit from "lodash/omit";
import BeersRepositoryInMemory from "services/beers/BeersRepositoryInMemory";
import { Beer } from "models/beers/Beer";
import { BeerView } from "./beerViewModel";

const beersRepositoryInMemory = new BeersRepositoryInMemory();

type BeersProviderProps = {
  children: ReactNode;
};

type Filters = {
  beerName?: string;
  firstBrewed?: string;
  showFavorites?: boolean;
};

type BeersContextValue = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  favoriteIds: number[];
  addFavorite: (beer: BeerView) => void;
  removeFavorite: (beerId: number) => void;
};

const initialValue = {
  filters: {},
  setFilters: () => {},
  favoriteIds: [],
  addFavorite: () => {},
  removeFavorite: () => {},
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
  const [favoriteIds, setFavoriteIds] = useState<number[]>(
    initialValue.favoriteIds
  );

  useEffect(() => {
    beersRepositoryInMemory.getAll().then((data) => {
      const storedFavorites = data.map((beer) => beer.id);
      if (storedFavorites.length) {
        setFavoriteIds(storedFavorites);
      }
    });
  }, []);

  const addFavorite = useCallback((beerView: BeerView) => {
    const beer: Beer = {
      ...omit(beerView, [
        "imageUrl",
        "firstBrewedLabel",
        "firstBrewedMonth",
        "firstBrewedYear",
        "foodPairing",
      ]),
      image_url: beerView.imageUrl,
      first_brewed: [beerView.firstBrewedMonth, beerView.firstBrewedYear]
        .filter(Boolean)
        .join("/"),
      food_pairing: beerView.foodPairing,
    };
    beersRepositoryInMemory
      .add(beer)
      .then((newFavorites) =>
        setFavoriteIds(newFavorites.map((beer) => beer.id))
      );
  }, []);

  const removeFavorite = useCallback((beerId: number) => {
    beersRepositoryInMemory
      .remove(beerId)
      .then((newFavorites) =>
        setFavoriteIds(newFavorites.map((beer) => beer.id))
      );
  }, []);

  return (
    <BeersContext.Provider
      value={{
        filters,
        setFilters,
        favoriteIds,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </BeersContext.Provider>
  );
}

export { BeersProvider, useBeers };
