import { render, screen } from "../../../../../internals/test";
import AbvEmoji from "../AbvEmoji";

const messages = [
  /alcohol by volume less than or equal to 3%/i,
  /alcohol by volume less than or equal to 8% but greater than 3%/i,
  /alcohol by volume less than or equal to 15% but greater than 8%/i,
  /alcohol by volume greater than 15%/i,
];

describe("AbvEmoji", () => {
  test("Should render 🙂 if abv is less than 3", () => {
    const abv = 0;
    render(<AbvEmoji abv={abv} />);

    expect(screen.getByText("🙂")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: messages[0] })).toBeInTheDocument();
  });

  test("Should render 🙂 if abv is equal to 3", () => {
    const abv = 3;
    render(<AbvEmoji abv={abv} />);

    expect(screen.getByText("🙂")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: messages[0] })).toBeInTheDocument();
  });

  test("Should render 😊 if abv less than or equal to 8% but greater than 3", () => {
    const abv = 8;
    render(<AbvEmoji abv={abv} />);

    expect(screen.getByText("😊")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: messages[1] })).toBeInTheDocument();
  });

  test("Should render 🥴 if abv is less than or equal to 15 but greater than 8", () => {
    const abv = 15;
    render(<AbvEmoji abv={abv} />);

    expect(screen.getByText("🥴")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: messages[2] })).toBeInTheDocument();
  });

  test("Should render 🤢 if abv is greater than 15", () => {
    const abv = 16;
    render(<AbvEmoji abv={abv} />);

    expect(screen.getByText("🤢")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: messages[3] })).toBeInTheDocument();
  });
});
