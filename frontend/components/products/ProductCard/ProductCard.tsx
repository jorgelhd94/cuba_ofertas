import { PinBtn } from "@/components/shared/buttons/PinBtn/PinBtn";
import { DownIcon } from "@/components/shared/icons/DownIcon";
import { UpIcon } from "@/components/shared/icons/UpIcon";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { Card, CardBody, Image } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";

type ProductCardProps = {
  product: IProduct;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { pinProduct, setPinProduct } = useContext(PinProductContext);

  const [isPinActive, setIsPinActive] = useState(pinProduct?.id === product.id);

  const handlePinProduct = (isActive: boolean) => {
    setIsPinActive(isActive);
    if (isActive) {
      setPinProduct(product);
    } else {
      setPinProduct(null);
    }
  };

  useEffect(() => {
    if (pinProduct?.id !== product.id) {
      setIsPinActive(false);
    }
  }, [pinProduct?.id, product.id]);

  const getPriceStyle = () => {
    if (pinProduct) {
      if (pinProduct?.current_price > product.current_price) {
        return "text-success";
      } else if (pinProduct?.current_price < product.current_price) {
        return "text-danger";
      }
    }
  };

  const getPriceByWeightStyle = () => {
    if (pinProduct && pinProduct.price_by_weight && product.price_by_weight) {
      if (pinProduct?.price_by_weight.price > product.price_by_weight.price) {
        return "text-success-600";
      } else if (
        pinProduct?.price_by_weight.price < product.price_by_weight.price
      ) {
        return "text-danger";
      } else {
        return "text-slate-600";
      }
    }
  };

  const getArrowIcon = () => {
    if (pinProduct) {
      if (pinProduct?.current_price > product.current_price) {
        return <DownIcon />;
      } else if (pinProduct?.current_price < product.current_price) {
        return <UpIcon />;
      }
    }
  };

  const getArrowByWeightStyle = () => {
    if (pinProduct && pinProduct.price_by_weight && product.price_by_weight) {
      if (pinProduct?.price_by_weight.price > product.price_by_weight.price) {
        return <DownIcon size="small"/>;
      } else if (
        pinProduct?.price_by_weight.price < product.price_by_weight.price
      ) {
        return <UpIcon size="small"/>;
      }
    }
  };

  return (
    <Card shadow="sm" className="w-full sm:w-72 md:w-64">
      <CardBody className="overflow-visible p-0">
        <div className="grid grid-cols-12">
          <div className="relative col-span-6 md:col-span-12">
            <Image
              radius="lg"
              width="100%"
              alt={product.name}
              className="w-full object-cover h-[140px] md:h-[240px] max-md:my-2 max-md:ml-2"
              src={product.image_url}
            />

            <div className="absolute top-1 left-1">
              <PinBtn isActive={isPinActive} handleClick={handlePinProduct} />
            </div>
          </div>

          <div className="col-span-6 md:col-span-12 flex flex-col items-start text-start justify-start gap-2 p-4">
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
              <p
                className={`font-bold text-lg flex items-center gap-1 ${getPriceStyle()}`}
              >
                {product.current_price} {product.currency}
                <span>{getArrowIcon()}</span>
              </p>

              {product.price_by_weight && (
                <p
                  className={`font-bold text-sm flex items-center ${getPriceByWeightStyle()}`}
                >
                  {product.price_by_weight.price}{" "}
                  {product.price_by_weight.currency}
                  <span>{getArrowByWeightStyle()}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
