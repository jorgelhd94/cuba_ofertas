import { IProduct } from "./IProduct";

export interface ISearchProducts {
  results: IProduct[];
  count: number;
  next: string;
}
