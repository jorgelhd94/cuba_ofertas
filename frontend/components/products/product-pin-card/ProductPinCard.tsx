import { PinBtn } from "@/components/shared/buttons/PinBtn/PinBtn";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";

type ProductPinCardProps = {
  product: IProduct;
};

export const ProductPinCard: React.FC<ProductPinCardProps> = ({ product }) => {
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

  return (
    <Card shadow="sm" isPressable className="max-sm:w-full w-72">
      <CardBody className="overflow-visible p-0 relative">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="w-full object-cover h-[240px]"
          src={product.image_url}
        />

        <PinBtn isActive={isPinActive} handleClick={handlePinProduct} />
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

        <p className="font-bold text-lg">
          {product.current_price} {product.currency}
        </p>
      </CardFooter>
    </Card>
  );
};
