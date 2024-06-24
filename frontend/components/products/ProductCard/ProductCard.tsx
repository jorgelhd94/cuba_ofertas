import { PinBtn } from "@/components/shared/buttons/PinBtn/PinBtn";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  getArrowByWeightStyle,
  getArrowIcon,
  getPriceByWeightStyle,
  getPriceStyle,
} from "@/lib/utils/functions/pricesStyle";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { ProductDropdownMenu } from "../ProductDropdownMenu/ProductDropdownMenu";
import ShopImage from "@/components/shared/images/ShopImage/ShopImage";
import PercentDifferenceShip from "@/components/shared/ships/PercentDifferenceShip";
import RankingByPrice from "../ProductRanking/RankingByPrice";
import RankingByPriceWeight from "../ProductRanking/RankingByPriceWeight";
import Link from "next/link";

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

  const getRankingByPrice = () => {
    if (pinProduct?.product_id === props.product.product_id) {
      return (
        <div className="flex flex-col gap-2">
          <Divider />
          <RankingByPrice />
          <RankingByPriceWeight />
        </div>
      );
    }
  };

  const [showFullText, setShowFullText] = useState(false);

  const getTruncateName = () => {
    if (
      pinProduct?.product_id === props.product.product_id &&
      props.product.name.length > 40 &&
      !showFullText
    ) {
      return props.product.name.slice(0, 40) + "...";
    }
    return props.product.name;
  };

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
                    className="absolute top-2 left-2 z-20 select-none"
                  >
                    Oferta
                  </Chip>
                )}

                {props.product.provider && (
                  <Chip
                    color="secondary"
                    size="sm"
                    className="absolute top-2 right-2 z-20 select-none"
                  >
                    {props.product.provider.name}
                  </Chip>
                )}
                <a
                  href={props.product.product_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    radius="lg"
                    width="100%"
                    alt={props.product.name}
                    className="w-full h-[140px] md:h-[256px] absolute block top-0 z-10"
                    src={props.product.image_url}
                  />
                </a>
              </div>
            </div>

            <div className="col-span-6 md:col-span-12 flex flex-col items-start text-start justify-start gap-2 pt-1 p-4">
              <b
                className="text-small text-primary-800"
                onClick={() => setShowFullText(!showFullText)}
              >
                {getTruncateName()}
              </b>

              {props.product.manufacture && (
                <a
                  href={props.product.manufacture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="text-small font-bold">
                    Marca:{" "}
                    <span className="font-normal">
                      {props.product.manufacture.name}
                    </span>
                  </p>
                </a>
              )}

              {/* Product Price Details */}
              <div>
                <div
                  className={`font-bold md:text-lg flex items-center flex-wrap gap-x-1 ${getPriceStyle(
                    pinProduct,
                    props.product
                  )}`}
                >
                  {props.product.current_price} {props.product.currency}
                  <span>{getArrowIcon(pinProduct, props.product)}</span>
                  <span>
                    <PercentDifferenceShip
                      pinProduct={pinProduct}
                      product={props.product}
                    />
                  </span>
                </div>

                {props.product.old_price && (
                  <p className="font-semibold text-lg text-gray-400 line-through flex items-center">
                    {props.product.old_price} {props.product.currency}
                  </p>
                )}

                {props.product.price_by_weight && (
                  <div
                    className={`font-bold text-sm flex items-center mt-2 flex-wrap gap-x-1 ${getPriceByWeightStyle(
                      pinProduct,
                      props.product
                    )}`}
                  >
                    {props.product.price_by_weight}{" "}
                    {props.product.currency_by_weight}
                    <span>
                      {getArrowByWeightStyle(pinProduct, props.product)}
                    </span>
                    <span>
                      <PercentDifferenceShip
                        pinProduct={pinProduct}
                        product={props.product}
                        isPriceByWeight
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardBody>

        <CardFooter>
          <div className="flex gap-2 justify-between items-center w-full">
            {!props.hideSetPin && (
              <PinBtn isActive={isPinActive} handleClick={handlePinProduct} />
            )}

            <ShopImage shop={props.product.shop} />

            {!props.hideMenu && <ProductDropdownMenu product={props.product} />}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
