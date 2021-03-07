import { Beer } from "models/beers/Beer";
import { BeersRepository, GetAllParams } from "models/beers/BeersRepository";
import BeersInvalidData from "models/beers/errors/BeersInvalidData";

const BEER_API_URL = "https://api.punkapi.com/v2";

function getBrewedRange(firstBrewed: string) {
  if (!firstBrewed) {
    return {};
  }

  if (!firstBrewed.includes("-")) {
    const year = parseInt(firstBrewed, 10);
    return {
      brewed_after: `12-${year - 1}`,
      brewed_before: `01-${year + 1}`,
    };
  }

  const [month, year] = firstBrewed.split("-").map(Number);
  const afterBrewed = new Date(year, month);
  const beforeBrewed = new Date(year, month);
  afterBrewed.setMonth(afterBrewed.getMonth() - 2);
  return {
    brewed_after: `${afterBrewed.getMonth() + 1}-${afterBrewed.getFullYear()}`,
    brewed_before: `${
      beforeBrewed.getMonth() + 1
    }-${beforeBrewed.getFullYear()}`,
  };
}

class BeerRepositoryApi implements BeersRepository {
  async getAll({ beerName, firstBrewed, ...rest }: GetAllParams) {
    const serviceParams = {
      beer_name: beerName,
      ...getBrewedRange(firstBrewed),
      ...rest,
    };
    const filteredParams = Object.entries(serviceParams)
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, value!.toString()]);
    const queryParams = new URLSearchParams(filteredParams).toString();

    const response = await fetch(`${BEER_API_URL}/beers?${queryParams}`);

    if (!response.ok) {
      throw new BeersInvalidData();
    }

    const data: Beer[] = await response.json();

    return data;
  }
}

export default BeerRepositoryApi;
