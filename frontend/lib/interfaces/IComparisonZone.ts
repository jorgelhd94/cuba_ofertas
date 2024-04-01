import { IProduct } from "./IProduct";

export interface ICreateComparisonZone {
  name: string;
  main_product: IProduct;
  comparison_products?: IProduct[];
}

export interface IComparisonZone {
  id: number | string;
  name: string;
  main_product: IProduct;
  comparison_products?: IProduct[];
}
