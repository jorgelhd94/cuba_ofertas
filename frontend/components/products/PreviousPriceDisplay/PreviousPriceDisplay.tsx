import PercentDifferenceShip from "@/components/shared/ships/PercentDifferenceShip";
import { IProduct } from "@/lib/interfaces/IProduct";
import React from "react";

interface PreviousPriceDisplayProps {
  product: IProduct;
  isPinProductActive?: boolean;
}

const PreviousPriceDisplay: React.FC<PreviousPriceDisplayProps> = ({
  product,
  isPinProductActive,
}) => {
  const displayPrice = product.old_price ?? product.previous_price;

  return displayPrice ? (
    <div className="font-semibold text-sm md:text-lg text-gray-400 line-through flex items-center gap-2">
      {displayPrice} {product.currency}
      {!isPinProductActive && (
        <span>
          <PercentDifferenceShip
            price={displayPrice}
            compareToPrice={product.current_price}
            showArrow
          />
        </span>
      )}
    </div>
  ) : null;
};

export default PreviousPriceDisplay;
