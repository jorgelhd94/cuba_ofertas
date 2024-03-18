import { PinBtn } from "@/components/shared/buttons/PinBtn/PinBtn";
import { DownIcon } from "@/components/shared/icons/DownIcon";
import { UpIcon } from "@/components/shared/icons/UpIcon";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
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

  const getArrowIcon = () => {
    if (pinProduct) {
      if (pinProduct?.current_price > product.current_price) {
        return <DownIcon />;
      } else if (pinProduct?.current_price < product.current_price) {
        return <UpIcon />;
      }
    }
  };

  return (
    <Card shadow="sm" className="max-sm:w-full w-72">
      <CardBody className="overflow-visible p-0 relative">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="w-full object-cover h-[240px]"
          src={product.image_url}
        />

        <div className="absolute top-1 right-1">
          <PinBtn isActive={isPinActive} handleClick={handlePinProduct} />
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start text-start justify-start gap-2">
        <a href={product.product_url} target="_blank" rel="noopener noreferrer">
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

        <p
          className={`font-bold text-lg flex items-center gap-1 ${getPriceStyle()}`}
        >
          {product.current_price} {product.currency}
          <span>{getArrowIcon()}</span>
        </p>
      </CardFooter>
    </Card>
  );
};
