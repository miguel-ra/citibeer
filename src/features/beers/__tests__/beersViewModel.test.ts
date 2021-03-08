import barrelSrc from "assets/barrel.svg";
import { generateBeer } from "../../../../internals/test/mocks/beers";
import { beerToBeerView } from "../beerViewModel";

const beer = generateBeer();

describe("beersViewModel", () => {
  test("Should parse first_brewed", () => {
    const first_brewed = "1/2018";
    const beerView = beerToBeerView({ ...beer, first_brewed });
    expect(beerView.firstBrewedLabel).toBe("January 2018");
    expect(beerView.firstBrewedMonth).toBe(1);
    expect(beerView.firstBrewedYear).toBe(2018);
  });

  test("Should keep orignal first_brewed if doesn't containt /", () => {
    const first_brewed = "2018";
    const beerView = beerToBeerView({ ...beer, first_brewed });
    expect(beerView.firstBrewedLabel).toBe("2018");
    expect(beerView.firstBrewedMonth).toBe(undefined);
    expect(beerView.firstBrewedYear).toBe(2018);
  });

  test("Should add default image if image_url is not defined", () => {
    const image_url = undefined;
    const beerView = beerToBeerView({ ...beer, image_url });
    expect(beerView.imageUrl).toBe(barrelSrc);
  });
});
