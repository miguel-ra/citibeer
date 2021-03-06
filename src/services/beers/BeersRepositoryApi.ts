import { Beer } from "models/beers/Beer";
import { BeersRepository } from "models/beers/BeersRepository";

const BEER_API_URL = "https://api.punkapi.com/v2";

type HttpResponse = {
  error: string;
  statusCode: number;
  message: string;
  data: { localtion: string; msg: string; param: string; value: string }[];
};

class BeerRepositoryApi implements BeersRepository {
  async getAll() {
    const response = await fetch(`${BEER_API_URL}/beers`);

    if (!response.ok) {
      const error: HttpResponse = await response.json();
      throw new Error(error.message);
    }

    const data: Beer[] = await response.json();

    return data;
  }
}

export default BeerRepositoryApi;
