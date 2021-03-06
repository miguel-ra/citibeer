import { Beer } from "models/beers/Beer";
import AbvEmoji from "./AbvEmoji";
import classes from "./ListBeer.module.scss";

type ListBeerProps = {
  data: Beer[];
};

function parseDate(dateString: string) {
  const [month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month);
  return date.toLocaleString("en-GB", { month: "long", year: "numeric" });
}

function ListBeer({ data }: ListBeerProps) {
  return (
    <section className={classes.container}>
      {data?.map((beer) => (
        <article key={beer.id} className={classes.beer} tabIndex={0}>
          <figure className={classes.figure}>
            <img src={beer.image_url} alt={beer.name} />
            <figcaption>
              <AbvEmoji abv={beer.abv} />
            </figcaption>
          </figure>
          <div className={classes.details}>
            <div className={classes.date}>{parseDate(beer.first_brewed)}</div>
            <h4 className={classes.name}>{beer.name}</h4>
            <p className={classes.tagline}>{beer.tagline}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default ListBeer;
