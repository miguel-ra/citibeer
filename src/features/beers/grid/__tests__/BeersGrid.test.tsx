import userEvent from "@testing-library/user-event";
import { beerToBeerView } from "features/beers/beerViewModel";
import { fireEvent, render, screen } from "../../../../../internals/test";
import { generateBeer } from "../../../../../internals/test/mocks/beers";
import { useBeers } from "../../beersContext";
import BeersGrid from "../BeersGrid";

jest.mock("../../beersContext");
const mockedUseBeers = useBeers as jest.Mock;

describe("BeersGrid", () => {
  beforeEach(() => {
    mockedUseBeers.mockImplementation(() => ({ savedIds: [] }));
  });

  test("Should render beer card", () => {
    const beer = beerToBeerView(generateBeer());
    const abv = 0;
    render(<BeersGrid onShowDetails={jest.fn()} data={[{ ...beer, abv }]} />);

    expect(screen.getByRole("img", { name: beer.name })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: beer.name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: beer.yeast })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /alcohol by volume less than or equal to 3%/i,
      })
    ).toBeInTheDocument();
  });

  test("Should show remove button and saved label if it's saved", () => {
    const beer = beerToBeerView(generateBeer());
    mockedUseBeers.mockImplementation(() => ({ savedIds: [beer.id] }));
    render(<BeersGrid onShowDetails={jest.fn()} data={[beer]} />);

    expect(screen.getByRole("img", { name: /saved/i })).toBeInTheDocument();
  });

  test("Should show details on click", () => {
    const beer = beerToBeerView(generateBeer());
    const onShowDetails = jest.fn();
    render(<BeersGrid onShowDetails={onShowDetails} data={[beer]} />);

    const article = screen.getByTestId(`beer-${beer.id}`);

    expect(onShowDetails).not.toBeCalled();

    userEvent.click(article);

    expect(onShowDetails).toBeCalled();
    expect(onShowDetails).toBeCalledWith(beer);
  });

  test("Should show details on enter", () => {
    const beer = beerToBeerView(generateBeer());
    const onShowDetails = jest.fn();
    render(<BeersGrid onShowDetails={onShowDetails} data={[beer]} />);

    const article = screen.getByTestId(`beer-${beer.id}`);

    expect(onShowDetails).not.toBeCalled();

    fireEvent.keyDown(article, { key: "Escape" });

    expect(onShowDetails).not.toBeCalled();

    fireEvent.keyDown(article, { key: "Enter" });

    expect(onShowDetails).toBeCalled();
    expect(onShowDetails).toBeCalledWith(beer);
  });
});
