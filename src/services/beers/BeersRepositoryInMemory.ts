import { Beer } from "models/beers/Beer";
import { BeersRepository, GetAllParams } from "models/beers/BeersRepository";

function getBrewedRange(firstBrewed: string) {
  if (!firstBrewed.includes("-")) {
    const year = parseInt(firstBrewed, 10);
    return {
      year,
    };
  }

  const [month, year] = firstBrewed.split("-").map(Number);

  return {
    month: month,
    year,
  };
}

function compareDates(
  dateString: string,
  dateToMatch: { month?: number; year: number }
) {
  if (!dateString.includes("/") && !dateToMatch.month) {
    return dateString === dateToMatch.year.toString();
  }
  const [month, year] = dateString.split("/").map(Number);

  if (!dateToMatch.month) {
    return year === dateToMatch.year;
  }

  return year === dateToMatch.year && month === dateToMatch.month;
}

function compareIds(beerA: Beer, beerB: Beer) {
  if (beerA.id < beerB.id) {
    return -1;
  }
  if (beerA.id > beerB.id) {
    return 1;
  }
  return 0;
}

class BeerRepositoryInMemory implements BeersRepository {
  serialize = JSON.stringify;
  deserialize = JSON.parse;
  storageKey = "savedBeers";

  private getLocalStorageItem() {
    const valueInLocalStorage = window.localStorage.getItem(this.storageKey);
    let data: Beer[] = [];
    if (valueInLocalStorage) {
      data = this.deserialize(valueInLocalStorage);
    }
    return data;
  }

  private setLocalStorageItem(data: Beer[]) {
    window.localStorage.setItem(this.storageKey, this.serialize(data));
  }

  async getAll({ beerName, firstBrewed, page, per_page }: GetAllParams = {}) {
    let data = this.getLocalStorageItem();

    if (!data || !data.length) {
      return [];
    }

    if (beerName) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(beerName.toLowerCase())
      );
    }

    if (firstBrewed) {
      data = data.filter((item) =>
        compareDates(item.first_brewed, getBrewedRange(firstBrewed))
      );
    }

    if (page && per_page) {
      const pageStartsAt = (page - 1) * per_page;
      data = data.slice(pageStartsAt, pageStartsAt + per_page);
    }

    return data.sort(compareIds) || [];
  }

  async add(beer: Beer) {
    const data = this.getLocalStorageItem();
    const filteredData = data.filter((item) => item.id !== beer.id);
    const newData = [...filteredData, beer];
    this.setLocalStorageItem(newData);
    return newData;
  }

  async remove(beerId: number) {
    const data = this.getLocalStorageItem();
    const filteredData = data.filter((item) => item.id !== beerId);
    this.setLocalStorageItem(filteredData);
    return filteredData;
  }
}

export default BeerRepositoryInMemory;
