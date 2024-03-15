import { IProduct } from "./IProduct";

export interface ISearchProducts {
  products: IProduct[];
  total: number;
  page_amount_text: string;
}
