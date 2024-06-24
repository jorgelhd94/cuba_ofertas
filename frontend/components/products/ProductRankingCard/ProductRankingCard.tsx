"use client";
import { IProduct } from "@/lib/interfaces/IProduct";
import { Card, CardBody, Chip, Image } from "@nextui-org/react";
import React from "react";

type Props = {
  product: IProduct;
  position: number;
  highlight?: boolean;
};

const ProductRankingCard = (props: Props) => {
  return (
    <Card
      fullWidth
      shadow="md"
      className={props.highlight ? "border-2 border-secondary" : ""}
    >
      <CardBody className="flex flex-row items-center">
        <Chip
          color={props.highlight ? "secondary" : "primary"}
          radius="full"
          size="sm"
        >
          {props.position}
        </Chip>
        
        <a href={props.product.product_url} target="_blank" rel="noreferrer">
          <Image
            radius="lg"
            alt={props.product.name}
            src={props.product.image_url}
            className="max-w-20"
          />
        </a>

        <div>
          <p className="text-xs font-bold">{props.product.name}</p>
          <p className="text-sm font-bold mt-2">
            {props.product.current_price} {props.product.currency}
          </p>
          {props.product.price_by_weight && (
            <p className="text-xs font-bold mt-1">
              {props.product.price_by_weight} {props.product.currency_by_weight}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductRankingCard;
