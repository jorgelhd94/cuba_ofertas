import { IManufacture } from "./IManufacture";

export interface IProduct {
  product_id: string;
  name: string;
  product_url: string;
  image_url: string;
  manufacture: IManufacture;
  current_price: number;
  old_price: number | null;
  currency: string;
  price_by_weight: number | null;
  currency_by_weight: string | null;
}
