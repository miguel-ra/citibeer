import AbvEmoji from "components/emoji/AbvEmoji";
import classes from "./BeersList.module.scss";
import { BeerView } from "../beerViewModel";

type BeersListProps = {
  data: BeerView[];
  onShowDetails: (beer: BeerView) => void;
};

function BeersList({ data, onShowDetails }: BeersListProps) {
  return (
    <section className={classes.container}>
      {data?.map((beer) => (
        <article
          key={beer.id}
          className={classes.beer}
          tabIndex={0}
          onClick={() => onShowDetails(beer)}
          onKeyDown={(event) => {
            event.key === "Enter" && onShowDetails(beer);
          }}
        >
          <figure className={classes.figure}>
            <img src={beer.imageUrl} alt={beer.name} />
            <figcaption>
              <AbvEmoji abv={beer.abv} />
            </figcaption>
          </figure>
          <div className={classes.details}>
            <div className={classes.date}>{beer.firstBrewedLabel}</div>
            <h4 className={classes.name}>{beer.name}</h4>
            <p className={classes.tagline}>{beer.tagline}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default BeersList;
