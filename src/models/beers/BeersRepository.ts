import { Beer } from "./Beer";

export type GetAllParams = {
  page: number;
  beerName: string;
  firstBrewed: string;
};

export interface BeersRepository {
  getAll(params?: GetAllParams): Promise<Beer[]>;
}
