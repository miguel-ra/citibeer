import { useCallback } from "react";
import { useBeersRepository } from "services/beers/beersRepository";
import { GetAllParams } from "models/beers/BeersRepository";
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
  malt: string[];
  hops: string[];
  yeast?: string;
};

type UseBeerViewOptions = {
  showSaved?: boolean;
};

const defaultOption = {
  showSaved: false,
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

function beerToBeerView({
  first_brewed,
  image_url,
  food_pairing,
  ingredients,
  ...beer
}: Beer): BeerView {
  const yeast = ingredients.yeast?.includes("-")
    ? ingredients.yeast.split("-")[1].trim()
    : ingredients.yeast;
  return {
    ...beer,
    ...parseDate(first_brewed),
    imageUrl: image_url || barrelSrc,
    foodPairing: food_pairing.map((food) => food.replace(/\./g, " ")),
    malt: ingredients.malt.map(({ name }) => name),
    hops: ingredients.hops.map(({ name }) => name),
    yeast: yeast?.replace(/[^\w\s]/gi, ""),
  };
}

function beerViewToBeer({
  imageUrl,
  firstBrewedLabel,
  firstBrewedMonth,
  firstBrewedYear,
  foodPairing,
  malt,
  hops,
  yeast,
  ...beerView
}: BeerView): Beer {
  return {
    ...beerView,
    image_url: imageUrl,
    first_brewed: [firstBrewedMonth, firstBrewedYear].filter(Boolean).join("/"),
    food_pairing: foodPairing,
    ingredients: {
      malt: malt.map((name) => ({ name })),
      hops: hops.map((name) => ({ name })),
      yeast,
    },
  };
}

function useBeerView({ showSaved }: UseBeerViewOptions = defaultOption) {
  const beerRepositroy = useBeersRepository({ showSaved });

  const getAll = useCallback(
    (params: GetAllParams) => {
      async function performGetAll() {
        const data = await beerRepositroy.getAll(params);
        return data.map(beerToBeerView);
      }
      return performGetAll();
    },
    [beerRepositroy]
  );

  return { getAll, beerRepositroy };
}

export { useBeerView, beerToBeerView, beerViewToBeer };
