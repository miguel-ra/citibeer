import Beers from "features/beers/Beers";
import classes from "./App.module.scss";

function App() {
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
