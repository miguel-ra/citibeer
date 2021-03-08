import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../../../../internals/test";
import BeersFilters from "../BeersFilters";
import { BeersProvider, useBeers } from "../../beersContext";

jest.mock("../../beersContext", () => {
  const actualBeersContext = jest.requireActual("../../beersContext");
  return {
    ...actualBeersContext,
    useBeers: jest.fn(),
  };
});
const mockedUseBeers = useBeers as jest.Mock;

describe("BeersFilters", () => {
  beforeEach(() => {
    mockedUseBeers.mockImplementation(() => ({
      filters: {},
      setFilters: jest.fn(),
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render fields", () => {
    render(
      <BeersProvider>
        <BeersFilters />
      </BeersProvider>
    );

    expect(
      screen.getByRole("textbox", {
        name: /name/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/first brewed/i)).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", {
        name: /show only favorite beers/i,
      })
    ).toBeInTheDocument();
  });

  test("Should update beerName", async () => {
    const setFilters = jest.fn();
    mockedUseBeers.mockImplementation(() => ({
      filters: {},
      setFilters,
    }));
    render(
      <BeersProvider>
        <BeersFilters />
      </BeersProvider>
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
    mockedUseBeers.mockImplementation(() => ({
      filters: {},
      setFilters,
    }));
    render(
      <BeersProvider>
        <BeersFilters />
      </BeersProvider>
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

  test("Should update showFavorites", async () => {
    const setFilters = jest.fn();
    mockedUseBeers.mockImplementation(() => ({
      filters: {},
      setFilters,
    }));
    render(
      <BeersProvider>
        <BeersFilters />
      </BeersProvider>
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /show only favorite beers/i,
    });

    userEvent.click(checkbox);

    const updateFilter = setFilters.mock.calls[0][0] as Function;

    expect(updateFilter()).toStrictEqual({ showFavorites: true });
  });
});
