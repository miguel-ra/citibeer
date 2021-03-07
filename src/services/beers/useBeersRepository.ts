import { BeersRepository } from "models/beers/BeersRepository";
import { useEffect, useState } from "react";
import BeersRepositoryApi from "./BeersRepositoryApi";
import BeersRepositoryInMemory from "./BeersRepositoryInMemory";

type UseRepositoryProps = {
  showFavorites?: boolean;
};

const defaultProps = {
  showFavorites: false,
};

function useBeersRepository({
  showFavorites,
}: UseRepositoryProps = defaultProps) {
  const [beerRepository, setBeerRepository] = useState<BeersRepository>(
    new BeersRepositoryApi()
  );

  useEffect(() => {
    if (showFavorites) {
      return setBeerRepository(new BeersRepositoryInMemory());
    }
    return setBeerRepository(new BeersRepositoryApi());
  }, [showFavorites]);

  return beerRepository;
}

export default useBeersRepository;
