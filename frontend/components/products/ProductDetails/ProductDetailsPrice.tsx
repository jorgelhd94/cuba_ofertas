import PercentDifferenceShip from "@/components/shared/ships/PercentDifferenceShip";
import { IProduct } from "@/lib/interfaces/IProduct";
import React from "react";

type Props = {
    product: IProduct;
};

const ProductDetailsPrice: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex gap-2">
      <p className="title-font font-medium text-2xl">
        {`${product.current_price} ${product.currency}`}
      </p>

      {product.old_price && (
        <>
          <span className="title-font font-medium text-xl text-default-500 line-through">
            {`${product.old_price} ${product.currency}`}
          </span>

          <PercentDifferenceShip
            price={product.old_price}
            compareToPrice={product.current_price}
            showArrow
          />
        </>
      )}
    </div>
  );
};

export default ProductDetailsPrice;
