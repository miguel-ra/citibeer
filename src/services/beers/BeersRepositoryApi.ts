import { Beer } from "models/beers/Beer";
import { BeersRepository } from "models/beers/BeersRepository";
import BeersInvalidData from "models/beers/errors/BeersInvalidData";

const BEER_API_URL = "https://api.punkapi.com/v2";

class BeerRepositoryApi implements BeersRepository {
  async getAll() {
    const response = await fetch(`${BEER_API_URL}/beers`);

    if (!response.ok) {
      throw new BeersInvalidData();
    }

    const data: Beer[] = await response.json();

    return data;
  }
}

export default BeerRepositoryApi;
