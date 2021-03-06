import { Beer } from "models/beers/Beer";
import { BeersRepository, GetAllParams } from "models/beers/BeersRepository";
import BeersInvalidData from "models/beers/errors/BeersInvalidData";

const BEER_API_URL = "https://api.punkapi.com/v2";

class BeerRepositoryApi implements BeersRepository {
  async getAll({ page }: GetAllParams = { page: 0 }) {
    const response = await fetch(`${BEER_API_URL}/beers?page=${page + 1}`);

    if (!response.ok) {
      throw new BeersInvalidData();
    }

    const data: Beer[] = await response.json();

    return data;
  }
}

export default BeerRepositoryApi;
