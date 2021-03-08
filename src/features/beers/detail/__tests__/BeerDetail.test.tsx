import userEvent from "@testing-library/user-event";
import { beerToBeerView } from "features/beers/beerViewModel";
import { useModal } from "store/modalContext";
import { render, screen } from "../../../../../internals/test";
import { generateBeer } from "../../../../../internals/test/mocks/beers";
import BeerDetail from "../BeerDetail";

jest.mock("store/modalContext");
const mockedUseModal = useModal as jest.Mock;

const beerDetailsProps = {
  isSaved: false,
  saveBeer: jest.fn(),
  removeBeer: jest.fn(),
};

describe("BeerDetail", () => {
  beforeEach(() => {
    mockedUseModal.mockImplementation(() => ({ closeModal: jest.fn() }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render beer detail", () => {
    const beer = beerToBeerView(generateBeer());
    render(<BeerDetail beer={{ ...beer, abv: 0 }} {...beerDetailsProps} />);

    expect(
      screen.getByRole("img", {
        name: /alcohol by volume less than or equal to 3%/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: beer.name })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: beer.yeast })
    ).toBeInTheDocument();

    expect(screen.getByText(beer.description)).toBeInTheDocument();

    expect(screen.getByText(/malt:/i)).toBeInTheDocument();
    beer.malt.forEach((item) => {
      expect(screen.getByText(new RegExp(item, "i"))).toBeInTheDocument();
    });

    expect(screen.getByText(/hops:/i)).toBeInTheDocument();
    beer.hops.forEach((item) => {
      expect(screen.getByText(new RegExp(item, "i"))).toBeInTheDocument();
    });

    expect(screen.getByText(/food pairing:/i)).toBeInTheDocument();
    beer.foodPairing.forEach((item) => {
      expect(screen.getByText(new RegExp(item, "i"))).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", {
        name: /save/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /close/i,
      })
    ).toBeInTheDocument();
  });

  test("Should show remove button and saved label if it's saved", () => {
    const beer = beerToBeerView(generateBeer());
    render(<BeerDetail beer={beer} {...beerDetailsProps} isSaved />);

    const removeButton = screen.getByRole("button", {
      name: /remove/i,
    });

    expect(screen.getByRole("img", { name: /saved/i })).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    expect(beerDetailsProps.removeBeer).not.toBeCalled();

    userEvent.click(removeButton);

    expect(beerDetailsProps.removeBeer).toBeCalled();
    expect(beerDetailsProps.removeBeer).toBeCalledWith(beer.id);
  });

  test("Should show option to save if it's not saved", () => {
    const beer = beerToBeerView(generateBeer());
    render(<BeerDetail beer={beer} {...beerDetailsProps} />);

    const saveButton = screen.getByRole("button", {
      name: /save/i,
    });

    expect(saveButton).toBeInTheDocument();

    expect(beerDetailsProps.saveBeer).not.toBeCalled();

    userEvent.click(saveButton);

    expect(beerDetailsProps.saveBeer).toBeCalled();
    expect(beerDetailsProps.saveBeer).toBeCalledWith(beer);
  });

  test("Should have to be able to close the modal", () => {
    const closeModal = jest.fn();
    mockedUseModal.mockImplementation(() => ({ closeModal }));

    const beer = beerToBeerView(generateBeer());
    render(<BeerDetail beer={beer} {...beerDetailsProps} />);

    const closeButton = screen.getByRole("button", {
      name: /close/i,
    });

    expect(closeModal).not.toBeCalled();

    userEvent.click(closeButton);

    expect(closeModal).toBeCalled();
  });
});
