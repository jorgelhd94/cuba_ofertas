import { IProduct } from "@/lib/interfaces/IProduct";
import { Chip } from "@nextui-org/react";
import React from "react";

type Props = {
  product: IProduct;
  showOfferDays: boolean;
};

const OnSaleChip: React.FC<Props> = ({ product, showOfferDays }) => {
  return (
    <>
      {product.old_price && product.days_on_sale !== null && (
        <Chip className="z-30" size="sm" color="danger">
          Oferta
          {showOfferDays && product.days_on_sale > 0 && (
            <span> hace {product.days_on_sale} día(s)</span>
          )}
          {showOfferDays && product.days_on_sale === 0 && <span> de Hoy</span>}
        </Chip>
      )}
    </>
  );
};

export default OnSaleChip;
