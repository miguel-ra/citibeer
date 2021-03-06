import { Beer } from "./Beer";

export interface BeersRepository {
  getAll(): Promise<Beer[]>;
}
