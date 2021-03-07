import {
  renderWithProviders,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../../internals/test";
import { generateBeers } from "../../../../internals/test/mocks/beers";
import BeersCatalog from "../BeersCatalog";
import useBeersRepository from "services/beers/useBeersRepository";
import { Beer } from "models/beers/Beer";
import BeersInvalidData from "models/beers/errors/BeersInvalidData";

jest.mock("services/beers/useBeersRepository");
const mockedUseBeersRepository = useBeersRepository as jest.Mock;

const beers = generateBeers();

function deferred<T>() {
  let resolve: any, reject: any;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("BeersCatalog", () => {
  test("Should render spinner", async () => {
    const { promise, resolve } = deferred<Beer[]>();
    mockedUseBeersRepository.mockImplementation(() => ({
      getAll: () => promise,
    }));

    renderWithProviders(<BeersCatalog />);

    await waitFor(() =>
      expect(
        screen.getByRole("alert", { name: /spinner/i })
      ).toBeInTheDocument()
    );

    resolve(beers);

    await waitForElementToBeRemoved(() =>
      screen.getByRole("alert", { name: /spinner/i })
    );
  });

  test("Should show error message if the respository fails", async () => {
    mockedUseBeersRepository.mockImplementation(() => ({
      getAll: jest.fn().mockRejectedValue(new BeersInvalidData()),
    }));

    renderWithProviders(<BeersCatalog />);

    await waitFor(() =>
      expect(screen.getByText(/failed to get data/i)).toBeInTheDocument()
    );
  });

  test("Should show default message if there are not beers to show", async () => {
    mockedUseBeersRepository.mockImplementation(() => ({
      getAll: jest.fn().mockResolvedValue([]),
    }));

    renderWithProviders(<BeersCatalog />);

    await waitFor(() =>
      expect(screen.getByText(/no data to display/i)).toBeInTheDocument()
    );
  });

  test("Should render beers", async () => {
    mockedUseBeersRepository.mockImplementation(() => ({
      getAll: jest.fn().mockResolvedValue(beers),
    }));

    renderWithProviders(<BeersCatalog />);

    await waitFor(() =>
      expect(
        screen.getByRole("heading", {
          name: beers[0].name,
        })
      ).toBeInTheDocument()
    );

    expect(
      screen.getByRole("heading", {
        name: beers[beers.length - 1].name,
      })
    ).toBeInTheDocument();
  });
});
