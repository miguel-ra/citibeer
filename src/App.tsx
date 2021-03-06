import Beers from "features/beers/Beers";
import { useEffect } from "react";
import useEventListener from "shared/hooks/useEventListener";
import classes from "./App.module.scss";

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEventListener(window, "mousedown", () => {
    document.body.classList.add("mousedown");
  });

  useEventListener(window, "keydown", () => {
    document.body.classList.remove("mousedown");
  });

  return (
    <>
      <header className={classes.header}>
        <h1>Citibeer</h1>
      </header>
      <main className={classes.main}>
        <Beers />
      </main>
    </>
  );
}

export default App;
