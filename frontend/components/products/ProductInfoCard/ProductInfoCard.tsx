import PercentDifferenceShip from "@/components/shared/ships/PercentDifferenceShip";
import { IProduct } from "@/lib/interfaces/IProduct";
import { getArrowIcon } from "@/lib/utils/functions/pricesStyle";
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type ProductInfoCardProps = {
  product: IProduct;
  mainProduct?: IProduct | null;
};

export const ProductInfoCard: React.FC<ProductInfoCardProps> = ({
  product,
  mainProduct,
}) => {
  return (
    <Card shadow="sm" className="w-full">
      <CardBody className="overflow-visible p-0">
        <div className="grid grid-cols-12">
          <div className="relative col-span-6 flex items-center w-full justify-center">
            <Link
              href={"/product/" + product.id}
            >
              <Image
                radius="lg"
                width="100%"
                alt={product.name}
                className="w-full object-cover h-[140px] max-md:my-2 max-md:ml-2"
                src={product.image_url}
              />
            </Link>
          </div>
          <div className="col-span-6 flex flex-col items-start text-start justify-start gap-2 p-4">
            <Link
              href={"/product/" + product.id}
            >
              <b className="text-small text-primary-800">{product.name}</b>
            </Link>

            <p className="text-small font-medium">
              Marca: {product.manufacture.name}
            </p>

            <div>
              <div className={`font-bold text-lg flex items-center gap-1`}>
                {product.current_price} {product.currency}
                {mainProduct && (
                  <>
                    <span>{getArrowIcon(mainProduct, product)}</span>
                    <span>
                      <PercentDifferenceShip
                        price={mainProduct.current_price}
                        compareToPrice={product.current_price}
                      />
                    </span>
                  </>
                )}
              </div>

              {product.price_by_weight && (
                <p className={`font-bold text-sm flex items-center mt-2`}>
                  {product.price_by_weight} {product.currency_by_weight}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
