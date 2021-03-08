import AbvEmoji from "components/emoji/AbvEmoji";
import classes from "./BeersGrid.module.scss";
import { BeerView } from "../beerViewModel";
import { useBeers } from "../beersContext";

type BeersGridProps = {
  data: BeerView[];
  onShowDetails: (beer: BeerView) => void;
};

function BeersGrid({ data, onShowDetails }: BeersGridProps) {
  const { savedIds } = useBeers();
  return (
    <section className={classes.container}>
      {data?.map((beer) => (
        <article
          id={`beer-${beer.id}`}
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
              {savedIds.includes(beer.id) ? (
                <span role="img" aria-label="saved">
                  ⭐️
                </span>
              ) : null}
            </figcaption>
          </figure>
          <div className={classes.details}>
            <h4 className={classes.name}>{beer.name}</h4>
            <h6 className={classes.yeast}>{beer.yeast}</h6>
          </div>
        </article>
      ))}
    </section>
  );
}

export default BeersGrid;
