import { ICategory } from "./ICategory";
import { IShop } from "./IChop";
import { IManufacture } from "./IManufacture";
import { IProvider } from "./IProvider";

export interface IProduct {
  id: string;
  product_id: string;
  name: string;
  product_url: string;
  image_url: string;
  manufacture: IManufacture;
  provider: IProvider | null;
  shop: IShop;
  current_price: number;
  old_price: number | null;
  currency: string;
  price_by_weight: number | null;
  currency_by_weight: string | null;
  categories: ICategory[];
  created_at: string;
  updated_at: string;
  days_since_last_update: number;
}
