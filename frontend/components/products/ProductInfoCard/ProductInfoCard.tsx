import ShopImage from "@/components/shared/images/ShopImage/ShopImage";
import PercentDifferenceShip from "@/components/shared/ships/PercentDifferenceShip";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  getArrowIconByPrice,
  getArrowIconByWeight,
} from "@/lib/utils/functions/pricesStyle";
import { Card, CardBody, Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type ProductInfoCardProps = {
  product: IProduct;
  position?: number;
  highlight?: boolean;
  compareToProduct?: IProduct | null;
  hidePricePercent?: boolean;
  hidePriceByWeightPercent?: boolean;
};

export const ProductInfoCard: React.FC<ProductInfoCardProps> = (props) => {
  return (
    <Card
      fullWidth
      shadow="md"
      className={props.highlight ? "border-2 border-secondary" : ""}
    >
      <CardBody className="flex flex-row items-center relative max-sm:px-4 py-6 sm:py-4 gap-2">
        {props.position && (
          <Chip
            color={props.highlight ? "secondary" : "primary"}
            radius="full"
            size="sm"
          >
            {props.position}
          </Chip>
        )}

        <Link href={"/products/" + props.product.id}>
          <Image
            radius="lg"
            alt={props.product.name}
            src={props.product.image_url}
            className="max-w-20"
          />
        </Link>

        <div className="space-y-2">
          <Link href={"/products/" + props.product.id}>
            <p className="text-sm font-bold text-primary-800">
              {props.product.name}
            </p>
          </Link>

          <p className="text-sm font-bold mt-2 flex items-center flex-wrap">
            {props.product.current_price} {props.product.currency}
            {props.compareToProduct && !props.hidePricePercent && (
              <>
                <span>
                  {getArrowIconByPrice(props.compareToProduct, props.product)}
                </span>
                <span>
                  <PercentDifferenceShip
                    price={props.compareToProduct.current_price}
                    compareToPrice={props.product.current_price}
                  />
                </span>
              </>
            )}
          </p>
          {props.product.price_by_weight && (
            <p className="text-xs font-bold mt-1 flex items-center flex-wrap">
              {props.product.price_by_weight} {props.product.currency_by_weight}
              
              {props.compareToProduct &&
                props.compareToProduct.price_by_weight &&
                !props.hidePriceByWeightPercent && (
                  <>
                    <span>
                      {getArrowIconByWeight(
                        props.compareToProduct,
                        props.product
                      )}
                    </span>
                    <span>
                      <PercentDifferenceShip
                        price={props.compareToProduct.price_by_weight}
                        compareToPrice={props.product.price_by_weight}
                      />
                    </span>
                  </>
                )}
            </p>
          )}
        </div>

        {props.product.provider && (
          <Chip
            color="primary"
            radius="full"
            size="sm"
            className="absolute top-2 left-2 z-30"
          >
            {props.product.provider?.name}
          </Chip>
        )}

        <div className="absolute bottom-2 max-sm:left-3 sm:right-2">
          <ShopImage
            shop={props.product.shop}
            urlProduct={props.product.product_url}
          />
        </div>
      </CardBody>
    </Card>
  );
};
