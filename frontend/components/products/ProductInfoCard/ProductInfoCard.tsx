import { IProduct } from "@/lib/interfaces/IProduct";
import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";

type ProductInfoCardProps = {
  product: IProduct;
};

export const ProductInfoCard: React.FC<ProductInfoCardProps> = ({
  product,
}) => {
  return (
    <Card shadow="sm" className="w-full">
      <CardBody className="overflow-visible p-0">
        <div className="grid grid-cols-12">
          <div className="relative col-span-6 flex items-center w-full justify-center">
            <Image
              radius="lg"
              width="100%"
              alt={product.name}
              className="w-full object-cover h-[140px] max-md:my-2 max-md:ml-2"
              src={product.image_url}
            />
          </div>

          <div className="col-span-6 flex flex-col items-start text-start justify-start gap-2 p-4">
            <a
              href={product.product_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <b className="text-small text-primary-800">{product.name}</b>
            </a>

            <a
              href={product.manufacture.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-small font-medium">
                Marca: {product.manufacture.name}
              </p>
            </a>

            <div>
              <p className={`font-bold text-lg flex items-center gap-1`}>
                {product.current_price} {product.currency}
              </p>

              {product.price_by_weight && (
                <p className={`font-bold text-sm flex items-center`}>
                  {product.price_by_weight}
                  {product.currency_by_weight}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
