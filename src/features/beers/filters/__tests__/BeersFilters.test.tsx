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
      options: {},
      setOptions: jest.fn(),
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
        name: /show only saved beers/i,
      })
    ).toBeInTheDocument();

    const viewSelect = screen.getByRole("combobox", {
      name: /view/i,
    }) as HTMLSelectElement;

    expect(viewSelect).toBeInTheDocument();
    expect(viewSelect.options).toHaveLength(2);
    expect(
      Array.from(viewSelect.options).map((element) => element.value)
    ).toEqual(expect.arrayContaining(["list", "grid"]));
  });

  test("Should update beerName", async () => {
    const setOptions = jest.fn();
    mockedUseBeers.mockImplementation(() => ({
      options: {},
      setOptions,
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

    await waitFor(() => expect(setOptions).toHaveBeenCalled());

    const updateFilter = setOptions.mock.calls[0][0] as Function;

    expect(updateFilter()).toStrictEqual({ beerName: "name" });
  });

  test("Should update firstBrewed", async () => {
    const setOptions = jest.fn();
    mockedUseBeers.mockImplementation(() => ({
      options: {},
      setOptions,
    }));
    render(
      <BeersProvider>
        <BeersFilters />
      </BeersProvider>
    );

    const input = screen.getByLabelText(/first brewed/i);

    input.setAttribute("type", "text");

    userEvent.type(input, "200");

    await waitFor(() => expect(setOptions).not.toHaveBeenCalled());

    userEvent.type(input, "0");

    await waitFor(() => expect(setOptions).toHaveBeenCalled());

    const updateFilter = setOptions.mock.calls[0][0] as Function;

    expect(updateFilter()).toStrictEqual({ firstBrewed: "2000" });
  });

  test("Should update showSaved", async () => {
    const setOptions = jest.fn();
    mockedUseBeers.mockImplementation(() => ({
      options: {},
      setOptions,
    }));
    render(
      <BeersProvider>
        <BeersFilters />
      </BeersProvider>
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /show only saved beers/i,
    });

    userEvent.click(checkbox);

    await waitFor(() => expect(setOptions).toHaveBeenCalled());

    const updateFilter = setOptions.mock.calls[0][0] as Function;

    expect(updateFilter()).toStrictEqual({ showSaved: true });
  });

  test("Should update viewMode", async () => {
    const setOptions = jest.fn();
    mockedUseBeers.mockImplementation(() => ({
      options: {},
      setOptions,
    }));
    render(
      <BeersProvider>
        <BeersFilters />
      </BeersProvider>
    );

    const combobox = screen.getByRole("combobox", {
      name: /view/i,
    });

    userEvent.selectOptions(combobox, ["grid"]);

    await waitFor(() => expect(setOptions).toHaveBeenCalled());

    const updateFilter = setOptions.mock.calls[0][0] as Function;

    expect(updateFilter()).toStrictEqual({ viewMode: "grid" });
  });
});
