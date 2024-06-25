"use client";
import ShopImage from "@/components/shared/images/ShopImage/ShopImage";
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
      <CardBody className="flex flex-row items-center relative max-sm:px-4 py-6 sm:py-4 gap-2">
        <Chip
          color={props.highlight ? "secondary" : "primary"}
          radius="full"
          size="sm"
        >
          {props.position}
        </Chip>

        <Image
          radius="lg"
          alt={props.product.name}
          src={props.product.image_url}
          className="max-w-20"
        />

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

        <div className="absolute bottom-2 right-2">
          <ShopImage
            shop={props.product.shop}
            urlProduct={props.product.product_url}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductRankingCard;
