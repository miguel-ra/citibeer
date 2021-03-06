import { render, screen } from "../../../../../internals/test";
import { generateBeer } from "../../../../../internals/test/mocks/beers";
import BeersList from "../BeersList";

describe("BeersList", () => {
  test("Should render beer card", () => {
    const beer = generateBeer();
    const abv = 0;
    const first_brewed = "1/2018";
    render(<BeersList data={[{ ...beer, abv, first_brewed }]} />);

    expect(screen.getByRole("img", { name: beer.name })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: beer.name })
    ).toBeInTheDocument();
    expect(screen.getByText(beer.tagline)).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /alcohol by volume less than or equal to 3%/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("January 2018")).toBeInTheDocument();
  });

  test("Should show only year if month is not specified", () => {
    const beer = generateBeer();
    const first_brewed = "2018";

    render(<BeersList data={[{ ...beer, first_brewed }]} />);

    expect(screen.getByText(first_brewed)).toBeInTheDocument();
  });
});
