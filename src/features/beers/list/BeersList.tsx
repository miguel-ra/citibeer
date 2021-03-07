import { Beer } from "models/beers/Beer";
import barrelSrc from "assets/barrel.svg";
import AbvEmoji from "./AbvEmoji";
import classes from "./BeersList.module.scss";

type BeersListProps = {
  data: Beer[];
  onShowDetails: (beer: Beer) => void;
};

function parseDate(dateString: string) {
  if (!dateString.includes("/")) {
    return dateString;
  }
  const [month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1);
  return date.toLocaleString("en-GB", { month: "long", year: "numeric" });
}

function BeersList({ data, onShowDetails }: BeersListProps) {
  return (
    <section className={classes.container}>
      {data?.map((beer) => (
        <article
          key={beer.id}
          className={classes.beer}
          tabIndex={0}
          onClick={() => onShowDetails(beer)}
        >
          <figure className={classes.figure}>
            <img src={beer.image_url || barrelSrc} alt={beer.name} />
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

export default BeersList;
