import { BeersRepository } from "models/beers/BeersRepository";
import { useEffect, useState } from "react";
import BeersRepositoryApi from "./BeersRepositoryApi";
import BeersRepositoryInMemory from "./BeersRepositoryInMemory";

type UseRepositoryProps = {
  showSaved?: boolean;
};

const defaultProps = {
  showSaved: false,
};

function useBeersRepository({ showSaved }: UseRepositoryProps = defaultProps) {
  const [beerRepository, setBeerRepository] = useState<BeersRepository>(
    new BeersRepositoryApi()
  );

  useEffect(() => {
    if (showSaved) {
      return setBeerRepository(new BeersRepositoryInMemory());
    }
    return setBeerRepository(new BeersRepositoryApi());
  }, [showSaved]);

  return beerRepository;
}

export { useBeersRepository };
