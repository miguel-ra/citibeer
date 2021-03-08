import { beerToBeerView } from "features/beers/beerViewModel";
import { render, screen } from "../../../../../internals/test";
import { generateBeer } from "../../../../../internals/test/mocks/beers";
import BeersList from "../BeersList";

describe("BeersList", () => {
  test("Should render beer card", () => {
    const beer = beerToBeerView(generateBeer());
    const abv = 0;
    render(<BeersList onShowDetails={jest.fn()} data={[{ ...beer, abv }]} />);

    expect(screen.getByRole("img", { name: beer.name })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: beer.name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: beer.yeast })
    ).toBeInTheDocument();
    expect(screen.getByText(beer.tagline)).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /alcohol by volume less than or equal to 3%/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(beer.firstBrewedLabel)).toBeInTheDocument();
  });
});
