import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import React from "react";
import { ProductCard } from "../products/ProductCard/ProductCard";
import { EmptyMsg } from "../shared/messages/empty-msg/empty-msg";

type Props = {
  comparisonZone: IComparisonZone;
};

export const ComparisonProductsList: React.FC<Props> = (props) => {
  return props.comparisonZone.comparison_products &&
    props.comparisonZone.comparison_products.length ? (
    <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4 w-full">
      {props.comparisonZone.comparison_products?.map((product) => {
        return (
          <ProductCard
            key={product.product_id}
            product={product}
            hideSetPin
          />
        );
      })}
    </div>
  ) : (
    <EmptyMsg title="Listado vacío" message="No hay productos para comparar" />
  );
};
