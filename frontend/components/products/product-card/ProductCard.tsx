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
      <CardFooter className="flex flex-col items-start justify-start gap-2">
        <b className="text-start text-small text-primary-800">{product.name}</b>
        <p className="text-start text-small font-medium">Marca: {product.manufacture.name}</p>
        <p className="font-bold text-lg">{product.current_price} {product.currency}</p>
      </CardFooter>
    </Card>
  );
};
