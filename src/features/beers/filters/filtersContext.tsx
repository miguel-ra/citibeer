//TODO: Rename this to beersContext
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type FiltersProviderProps = {
  children: ReactNode;
};

type Filters = {
  beerName?: string;
  firstBrewed?: string;
};

type FiltersContextValue = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

const initialValue = {
  filters: {},
  setFilters: () => {},
};

const FiltersContext = createContext<FiltersContextValue>(initialValue);

function useFilters() {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFilters must be used within the FiltersContext");
  }
  return context;
}

function FiltersProvider({ children }: FiltersProviderProps) {
  const [filters, setFilters] = useState<Filters>(initialValue.filters);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export { FiltersProvider, useFilters };
