import faker, { fake } from "faker";
import { Beer } from "models/beers/Beer";

function generateBeer(id: number = 0): Beer {
  const pastDate = faker.date.past();
  const month = pastDate.getUTCMonth() + 1;
  const year = pastDate.getUTCFullYear();

  const food_pairing = [...new Array(faker.random.number(3))].map(() =>
    faker.commerce.productAdjective()
  );

  return {
    id: id || faker.random.number(),
    name: faker.commerce.productName(),
    tagline: faker.commerce.productAdjective(),
    description: faker.commerce.productDescription(),
    image_url: faker.image.imageUrl(),
    first_brewed: `${month}/${year}`,
    abv: faker.random.number(20),
    food_pairing,
    ingredients: {
      malt: [...new Array(faker.random.number(5))].map(() => ({
        name: faker.random.word(),
      })),
      hops: [...new Array(faker.random.number(5))].map(() => ({
        name: faker.random.word(),
      })),
      yeast: faker.random.words(2),
    },
  };
}

function generateBeers({ numOfBeers = 10 } = {}): Beer[] {
  const beers = [...new Array(numOfBeers)].map((_value, key) =>
    generateBeer(key)
  );
  return beers;
}

export { generateBeer, generateBeers };
