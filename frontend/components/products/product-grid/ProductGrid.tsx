import { IProduct } from "@/lib/interfaces/IProduct";
import React from "react";
import { ProductCard } from "../product-card/ProductCard";

type ProductGridProps = {
  products: IProduct[];
  searchText: string;
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products, searchText }) => {
  return (
    <div className="px-4 md:px-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <h3 className="text-xl">Resultados de búsqueda para: <b>{searchText ? searchText : "Todos los productos"}</b></h3>
      </div>
      <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-4 ">
        {products.map((item, index) => (
          <ProductCard key={item.id + "-" + index} product={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
