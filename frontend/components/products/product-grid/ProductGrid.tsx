import { IProduct } from "@/lib/interfaces/IProduct";
import React from "react";
import { ProductCard } from "../product-card/ProductCard";

type ProductGridProps = {
  products: IProduct[];
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-4 px-4 md:px-8">
      {products.map((item, index) => (
        <ProductCard key={item.id + "-" + index} product={item} />
      ))}
    </div>
  );
};

export default ProductGrid;
