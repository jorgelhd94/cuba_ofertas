import { IProduct } from "./IProduct";

export interface IComparisonZone {
  name: string;
  main_product: IProduct;
  comparison_products?: IProduct[];
}
