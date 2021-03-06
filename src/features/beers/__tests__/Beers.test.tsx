import { mocked } from "ts-jest/utils";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../../internals/test";
import { generateBeers } from "../../../../internals/test/mocks/beers";
import Beers from "../Beers";
import BeersRepository from "services/beers/BeersRepository";
import { Beer } from "models/beers/Beer";
import BeersInvalidData from "models/beers/errors/BeersInvalidData";

jest.mock("services/beers/BeersRepository");

const mockedBeersRepository = mocked(BeersRepository);
const beers = generateBeers();

function deferred<T>() {
  let resolve: any, reject: any;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("Beers", () => {
  test("Should render spinner", async () => {
    const { promise, resolve } = deferred<Beer[]>();
    mockedBeersRepository.getAll.mockImplementation(() => promise);

    render(<Beers />);

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
    mockedBeersRepository.getAll.mockRejectedValue(new BeersInvalidData());

    render(<Beers />);

    await waitFor(() =>
      expect(screen.getByText(/failed to get data/i)).toBeInTheDocument()
    );
  });

  test("Should show default message if there are not beers to show", async () => {
    mockedBeersRepository.getAll.mockResolvedValue([]);

    render(<Beers />);

    await waitFor(() =>
      expect(screen.getByText(/no data to display/i)).toBeInTheDocument()
    );
  });

  test("Should render beers", async () => {
    mockedBeersRepository.getAll.mockResolvedValue(beers);

    render(<Beers />);

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
