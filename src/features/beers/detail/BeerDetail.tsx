import { Beer } from "models/beers/Beer";
import barrelSrc from "assets/barrel.svg";
import classes from "./BeerDetail.module.scss";

type BeerDetailProps = {
  data: Beer;
};

function BeerDetail({ data }: BeerDetailProps) {
  return (
    <div className={classes.wrapper}>
      <figure className={classes.figure}>
        <img src={data.image_url || barrelSrc} alt={data.name} />
        <figcaption>{/* <AbvEmoji abv={data.abv} /> */}</figcaption>
      </figure>
      <div className={classes.details}>
        <div className={classes.date}>{data.first_brewed}</div>
        <h4 className={classes.name}>{data.name}</h4>
        <p className={classes.tagline}>{data.tagline}</p>
      </div>
    </div>
  );
}

export default BeerDetail;
