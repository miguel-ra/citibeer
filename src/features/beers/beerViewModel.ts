import { Beer } from "models/beers/Beer";
import barrelSrc from "assets/barrel.svg";

export type BeerView = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  firstBrewedLabel: string;
  firstBrewedMonth?: number;
  firstBrewedYear: number;
  abv: number;
  foodPairing: string[];
};

function parseDate(dateString: string) {
  if (!dateString.includes("/")) {
    return {
      firstBrewedLabel: dateString,
      firstBrewedYear: parseInt(dateString, 10),
    };
  }
  const [month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1);

  return {
    firstBrewedLabel: date.toLocaleString("en-GB", {
      month: "long",
      year: "numeric",
    }),
    firstBrewedMonth: month,
    firstBrewedYear: year,
  };
}

function beerViewModel({
  first_brewed,
  image_url,
  food_pairing,
  ...beer
}: Beer): BeerView {
  return {
    ...beer,
    ...parseDate(first_brewed),
    imageUrl: image_url || barrelSrc,
    foodPairing: food_pairing,
  };
}

export default beerViewModel;
