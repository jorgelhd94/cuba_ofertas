import { IProduct } from "@/lib/interfaces/IProduct";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";

type ProductCardProps = {
  product: IProduct;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}        
          className="w-full object-cover h-[240px]"
          src={product.image_url}
        />
      </CardBody>
      <CardFooter className="text-small flex flex-col items-start justify-start">
        <b className="text-start">{product.name}</b>
        <p className="text-default-500">{product.current_price}</p>
      </CardFooter>
    </Card>
  );
};
