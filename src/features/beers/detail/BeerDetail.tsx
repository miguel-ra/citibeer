import { useState } from "react";
import { useModal } from "store/modalContext";
import Button from "components/button/Button";
import AbvEmoji from "components/emoji/AbvEmoji";
import classes from "./BeerDetail.module.scss";
import { BeerView } from "../beerViewModel";

type BeerDetailProps = {
  beer: BeerView;
  isSaved: boolean;
  saveBeer: (beer: BeerView) => void;
  removeBeer: (beerId: number) => void;
};

function BeerDetail({
  beer,
  isSaved: isSavedProp,
  saveBeer,
  removeBeer,
}: BeerDetailProps) {
  const { closeModal } = useModal();
  const [isSaved, setIsSaved] = useState(isSavedProp);

  return (
    <div className={classes.wrapper}>
      <figure className={classes.figure}>
        <img src={beer.imageUrl} alt={beer.name} />
        <figcaption>
          <AbvEmoji abv={beer.abv} />
          {isSaved ? (
            <span role="img" aria-label="saved">
              ⭐️
            </span>
          ) : null}
        </figcaption>
      </figure>
      <div className={classes.content}>
        <div className={classes.date}>{beer.firstBrewedLabel}</div>
        <h4 className={classes.name}>{beer.name}</h4>
        <div className={classes.details}>
          <p className={classes.tagline}>{beer.tagline}</p>
          <p className={classes.description}>{beer.description}</p>
        </div>
        <div className={classes.actions}>
          {!isSaved && (
            <Button
              onClick={() => {
                saveBeer(beer);
                setIsSaved(true);
              }}
            >
              Save
            </Button>
          )}
          {isSaved && (
            <Button
              onClick={() => {
                removeBeer(beer.id);
                setIsSaved(false);
              }}
            >
              Remove
            </Button>
          )}
          <Button onClick={() => closeModal()}>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default BeerDetail;
