import { Beer } from "./Beer";

export type GetAllParams = {
  page: number;
};

export interface BeersRepository {
  getAll(params?: GetAllParams): Promise<Beer[]>;
}
