export type Beer = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url?: string;
  first_brewed: string;
  abv: number;
  food_pairing: string[];
  ingredients: {
    malt: { name: string }[];
    hops: { name: string }[];
    yeast?: string;
  };
};
