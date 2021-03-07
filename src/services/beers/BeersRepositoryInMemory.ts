import { Beer } from "models/beers/Beer";
import { BeersRepository, GetAllParams } from "models/beers/BeersRepository";

class BeerRepositoryInMemory implements BeersRepository {
  serialize: (value: any) => string;
  deserialize: (text: string) => any;
  storageKey: string;

  constructor() {
    this.storageKey = "favoriteBeers";
    this.serialize = JSON.stringify;
    this.deserialize = JSON.parse;
  }

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

  async getAll(params: GetAllParams = {}) {
    const data = this.getLocalStorageItem();

    return data.reverse() || [];
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
