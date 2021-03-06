import { render, screen } from "../../../../internals/test";
import ConditionRender from "../ConditionalRender";

describe("ConditionalRender", () => {
  test("Should render componente if a condition is true", () => {
    const condition = "condition";
    const children = "children";

    render(
      <ConditionRender conditions={[[true, condition]]}>
        {children}
      </ConditionRender>
    );

    expect(screen.getByText(condition)).toBeInTheDocument();
  });

  test("Should render children if all conditions are false", () => {
    const condition = "condition";
    const children = "children";

    render(
      <ConditionRender conditions={[[false, condition]]}>
        {children}
      </ConditionRender>
    );

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
