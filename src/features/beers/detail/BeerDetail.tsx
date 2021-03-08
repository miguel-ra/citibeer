import { useState } from "react";
import { useModal } from "store/modalContext";
import Button from "components/button/Button";
import AbvEmoji from "components/emoji/AbvEmoji";
import classes from "./BeerDetail.module.scss";
import { BeerView } from "../beerViewModel";

type BeerDetailProps = {
  beer: BeerView;
  isFavorite: boolean;
  addFavorite: (beer: BeerView) => void;
  removeFavorite: (beerId: number) => void;
};

function BeerDetail({
  beer,
  isFavorite: isFavoriteProp,
  addFavorite,
  removeFavorite,
}: BeerDetailProps) {
  const { closeModal } = useModal();
  const [isFavorite, setIsFavorite] = useState(isFavoriteProp);

  return (
    <div className={classes.wrapper}>
      <figure className={classes.figure}>
        <img src={beer.imageUrl} alt={beer.name} />
        <figcaption>
          <AbvEmoji abv={beer.abv} />
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
          {!isFavorite && (
            <Button
              onClick={() => {
                addFavorite(beer);
                setIsFavorite(true);
              }}
            >
              Agregar
            </Button>
          )}
          {isFavorite && (
            <Button
              onClick={() => {
                removeFavorite(beer.id);
                setIsFavorite(false);
              }}
            >
              Eliminar
            </Button>
          )}
          <Button onClick={() => closeModal()}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
}

export default BeerDetail;
