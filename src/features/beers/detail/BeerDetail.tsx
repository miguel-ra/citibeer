import { Beer } from "models/beers/Beer";
import { useModal } from "store/modalContext";
import Button from "components/button/Button";
import barrelSrc from "assets/barrel.svg";
import classes from "./BeerDetail.module.scss";

type BeerDetailProps = {
  data: Beer;
};

function BeerDetail({ data }: BeerDetailProps) {
  const { closeModal } = useModal();
  return (
    <div className={classes.wrapper}>
      <figure className={classes.figure}>
        <img src={data.image_url || barrelSrc} alt={data.name} />
        <figcaption>{/* <AbvEmoji abv={data.abv} /> */}</figcaption>
      </figure>
      <div className={classes.content}>
        <div className={classes.date}>{data.first_brewed}</div>
        <h4 className={classes.name}>{data.name}</h4>
        <div className={classes.details}>
          <p className={classes.tagline}>{data.tagline}</p>
          <p className={classes.description}>{data.description}</p>
        </div>
        <div className={classes.actions}>
          <Button onClick={() => closeModal()}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
}

export default BeerDetail;
