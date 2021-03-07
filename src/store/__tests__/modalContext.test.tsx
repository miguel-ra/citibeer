import userEvent from "@testing-library/user-event";
import { useModal } from "store/modalContext";
import { renderWithProviders, screen } from "../../../internals/test";

function UseModalHookExample() {
  const { openModal, closeModal } = useModal();
  return (
    <div>
      <button onClick={() => openModal()}>open</button>
      <button onClick={() => closeModal()}>close</button>
    </div>
  );
}

describe("modalContext", () => {
  test("Should add 'preventScroll' class to body on open", () => {
    jest.spyOn(document.body.classList, "add");

    renderWithProviders(<UseModalHookExample />);

    userEvent.click(screen.getByRole("button", { name: /open/i }));

    expect(document.body.classList.add).toHaveBeenCalledWith("preventScroll");
  });

  test("Should remove 'preventScroll' class to body on close", () => {
    jest.spyOn(document.body.classList, "remove");

    renderWithProviders(<UseModalHookExample />);

    userEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(document.body.classList.remove).toHaveBeenCalledWith(
      "preventScroll"
    );
  });
});
