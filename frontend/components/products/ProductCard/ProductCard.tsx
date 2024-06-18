import { PinBtn } from "@/components/shared/buttons/PinBtn/PinBtn";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  getArrowByWeightStyle,
  getArrowIcon,
  getPriceByWeightStyle,
  getPriceStyle,
} from "@/lib/utils/functions/pricesStyle";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { ProductDropdownMenu } from "../ProductDropdownMenu/ProductDropdownMenu";

type ProductCardProps = {
  product: IProduct;
  hideSetPin?: boolean;
  hideMenu?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { pinProduct, setPinProduct } = useContext(PinProductContext);

  const [isPinActive, setIsPinActive] = useState(
    pinProduct?.product_id === props.product.product_id
  );

  const getPercentDifference = () => {
    if (pinProduct) {
      if (pinProduct?.current_price > props.product.current_price) {
        const percent =
          100 - (props.product.current_price / pinProduct?.current_price) * 100;
        return (
          <Chip color="success" size="sm">
            {percent.toFixed(2)}%
          </Chip>
        );
      } else if (pinProduct?.current_price < props.product.current_price) {
        const percent =
          100 - (pinProduct?.current_price / props.product.current_price) * 100;

        return (
          <Chip color="danger" size="sm">
            {percent.toFixed(2)} %
          </Chip>
        );
      }
    }
  };

  const handlePinProduct = (isActive: boolean) => {
    setIsPinActive(isActive);

    if (!setPinProduct) {
      return;
    }

    if (isActive) {
      setPinProduct(props.product);
    } else {
      setPinProduct(null);
    }
  };

  useEffect(() => {
    if (pinProduct?.product_id !== props.product.product_id) {
      setIsPinActive(false);
    }
  }, [pinProduct?.product_id, props.product.product_id]);

  return (
    <>
      <Card shadow="sm" className="w-full sm:w-72 md:w-64">
        <CardBody className="overflow-visible p-0">
          <div className="grid grid-cols-12">
            <div className="relative col-span-6 md:col-span-12 max-md:my-2 max-md:ml-2">
              <div className="relative overflow-hidden pb-[100%] rounded-sm">
                {props.product.old_price && (
                  <Chip
                    color="danger"
                    size="sm"
                    className="absolute top-2 left-2 z-20"
                  >
                    Oferta
                  </Chip>
                )}
                <Image
                  radius="lg"
                  width="100%"
                  alt={props.product.name}
                  className="w-full h-[140px] md:h-[256px] absolute block top-0 z-10"
                  src={props.product.image_url}
                />
              </div>
            </div>

            <div className="col-span-6 md:col-span-12 flex flex-col items-start text-start justify-start gap-2 pt-1 p-4">
              <a
                href={props.product.product_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <b className="text-small text-primary-800">
                  {props.product.name}
                </b>
              </a>

              {props.product.manufacture && (
                <a
                  href={props.product.manufacture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="text-small font-medium">
                    Marca: {props.product.manufacture.name}
                  </p>
                </a>
              )}

              <div>
                <div
                  className={`font-bold text-lg flex items-center flex-wrap gap-x-1 ${getPriceStyle(
                    pinProduct,
                    props.product
                  )}`}
                >
                  {props.product.current_price} {props.product.currency}
                  <span>{getArrowIcon(pinProduct, props.product)}</span>
                  <span>{getPercentDifference()}</span>
                </div>

                {props.product.old_price && (
                  <p className="font-semibold text-lg text-gray-400 line-through flex items-center">
                    {props.product.old_price} {props.product.currency}
                  </p>
                )}

                {props.product.price_by_weight && (
                  <p
                    className={`font-bold text-sm flex items-center mt-2 ${getPriceByWeightStyle(
                      pinProduct,
                      props.product
                    )}`}
                  >
                    {props.product.price_by_weight}{" "}
                    {props.product.currency_by_weight}
                    <span>
                      {getArrowByWeightStyle(pinProduct, props.product)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardBody>

        <CardFooter>
          <div className="flex gap-2 justify-between w-full">
            {!props.hideSetPin && (
              <PinBtn isActive={isPinActive} handleClick={handlePinProduct} />
            )}

            {!props.hideMenu && <ProductDropdownMenu product={props.product} />}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
