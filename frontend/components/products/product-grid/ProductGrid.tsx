import { IProduct } from "@/lib/interfaces/IProduct";
import React from "react";
import { ProductCard } from "../product-card/ProductCard";
import { ProductsSkeleton } from "../products-skeleton/ProductsSkeleton";

type ProductGridProps = {
  products: IProduct[];
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
    } else if (products) {
      return (
        <div className="flex flex-col gap-8">
          <h3 className="text-xl">
            Resultados de búsqueda para:{" "}
            <b>{searchText ? searchText : "Todos los productos"}</b>
          </h3>
          <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-4">
            {products ? (
              products.map((item, index) => (
                <ProductCard key={item.id + "-" + index} product={item} />
              ))
            ) : (
              <p>Vacio</p>
            )}
          </div>
        </div>
      );
    }

    return <p>Vacio</p>;
  };
  return <div className="px-4 md:px-8 flex flex-col gap-8">{showData()}</div>;
};

export default ProductGrid;
