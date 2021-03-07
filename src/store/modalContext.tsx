import React, {
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useState,
} from "react";

type ModalProviderProps = {
  children: ReactNode;
};

type ModalContextValue = {
  openModal: Function;
  closeModal: Function;
};

const initialValue = {
  openModal: () => {},
  closeModal: () => {},
};

const containerId = "root-modal";
const Modal = React.lazy(() => import("components/modal/Modal"));

const ModalContext = React.createContext<ModalContextValue>(initialValue);

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within the ModalContext");
  }
  return context;
}

function ModalProvider({ children }: ModalProviderProps) {
  const [content, setContent] = useState<JSX.Element | undefined>();

  const openModal = useCallback((newContent: JSX.Element) => {
    document.body.classList.add("preventScroll");
    setContent(newContent);
  }, []);

  const closeModal = useCallback(() => {
    document.body.classList.remove("preventScroll");
    setContent(undefined);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Suspense fallback={null}>
        <Modal containerId={containerId} closeModal={closeModal}>
          {content}
        </Modal>
      </Suspense>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal };
