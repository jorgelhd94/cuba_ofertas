import { IProduct } from "@/lib/interfaces/IProduct";
import React from "react";
import { ProductCard } from "../product-card/ProductCard";
import { ProductsSkeleton } from "../products-skeleton/ProductsSkeleton";

type ProductGridProps = {
  products: IProduct[] | undefined;
  searchText: string;
  loading: boolean;
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  searchText,
  loading,
}) => {
  const showData = () => {
    if (loading) {
      return <ProductsSkeleton />;
    } else if (products?.length) {
      return (
        <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-4">
          {products.map((item, index) => (
            <ProductCard key={item.id + "-" + index} product={item} />
          ))}
        </div>
      );
    } else {
      return "Vacio";
    }
  };
  return (
    products && (
      <div className="px-4 md:px-8 flex flex-col gap-8 w-full">
        <div>
          <h3 className="text-xl">
            Resultados de búsqueda para:{" "}
            <b>{searchText ? searchText : "Todos los productos"}</b>
          </h3>
        </div>
        {showData()}
      </div>
    )
  );
};

export default ProductGrid;
