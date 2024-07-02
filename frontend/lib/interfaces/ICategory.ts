export interface ICategory {
  id: number;
  category_id: string;
  name: string;
  url: string;
  products_count: number;
  children?: ICategory[];
}
