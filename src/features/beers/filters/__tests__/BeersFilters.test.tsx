import userEvent from "@testing-library/user-event";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../../../../internals/test";
import BeersFilters from "../BeersFilters";
import { FiltersProvider, useFilters } from "../filtersContext";

jest.mock("../filtersContext", () => {
  const actualFiltersContext = jest.requireActual("../filtersContext");
  return {
    ...actualFiltersContext,
    useFilters: jest.fn(),
  };
});
const mockedUseFilters = useFilters as jest.Mock;

describe("BeersFilters", () => {
  beforeEach(() => {
    mockedUseFilters.mockImplementation(() => ({
      filters: {},
      setFilters: jest.fn(),
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render fields", () => {
    render(
      <FiltersProvider>
        <BeersFilters />
      </FiltersProvider>
    );

    expect(
      screen.getByRole("textbox", {
        name: /name/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/first brewed/i)).toBeInTheDocument();
  });

  test("Should update beerName", async () => {
    const setFilters = jest.fn();
    mockedUseFilters.mockImplementation(() => ({
      filters: {},
      setFilters,
    }));
    render(
      <FiltersProvider>
        <BeersFilters />
      </FiltersProvider>
    );

    const input = screen.getByRole("textbox", {
      name: /name/i,
    });

    userEvent.type(input, "name");

    await waitFor(() => expect(setFilters).toHaveBeenCalled());

    const updateFilter = setFilters.mock.calls[0][0] as Function;

    expect(updateFilter()).toStrictEqual({ beerName: "name" });
  });

  test("Should update firstBrewed", async () => {
    const setFilters = jest.fn();
    mockedUseFilters.mockImplementation(() => ({
      filters: {},
      setFilters,
    }));
    render(
      <FiltersProvider>
        <BeersFilters />
      </FiltersProvider>
    );

    const input = screen.getByLabelText(/first brewed/i);

    input.setAttribute("type", "text");

    userEvent.type(input, "200");

    await waitFor(() => expect(setFilters).not.toHaveBeenCalled());

    userEvent.type(input, "0");

    await waitFor(() => expect(setFilters).toHaveBeenCalled());

    const updateFilter = setFilters.mock.calls[0][0] as Function;

    expect(updateFilter()).toStrictEqual({ firstBrewed: "2000" });
  });
});
