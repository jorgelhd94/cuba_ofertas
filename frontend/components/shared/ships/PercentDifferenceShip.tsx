import { IProduct } from "@/lib/interfaces/IProduct";
import { Chip } from "@nextui-org/react";
import React from "react";

type Props = {
  pinProduct: IProduct | null;
  product: IProduct | null;
  isPriceByWeight?: boolean;
};

const PercentDifferenceShip = (props: Props) => {
  const getPricePercentDifference = (
    pinProduct: IProduct,
    product: IProduct
  ) => {
    if (pinProduct.current_price > product.current_price) {
      const percent =
        100 - (product.current_price / pinProduct.current_price) * 100;
      return (
        <Chip color="success" size="sm">
          {percent.toFixed(2)}%
        </Chip>
      );
    } else if (pinProduct.current_price < product.current_price) {
      const percent =
        100 - (pinProduct.current_price / product.current_price) * 100;

      return (
        <Chip color="danger" size="sm">
          {percent.toFixed(2)} %
        </Chip>
      );
    }
  };

  const getWeightPercentDifference = (
    pinProduct: IProduct,
    product: IProduct
  ) => {
    if (!pinProduct.price_by_weight || !product.price_by_weight) {
      return null;
    }

    if (pinProduct.price_by_weight > product.price_by_weight) {
      const percent =
        100 - (product.price_by_weight / pinProduct.price_by_weight) * 100;
      return (
        <Chip color="success" size="sm">
          {percent.toFixed(2)}%
        </Chip>
      );
    } else if (pinProduct.price_by_weight < product.price_by_weight) {
      const percent =
        100 - (pinProduct.price_by_weight / product.price_by_weight) * 100;

      return (
        <Chip color="danger" size="sm">
          {percent.toFixed(2)} %
        </Chip>
      );
    }
  };

  if (!props.pinProduct || !props.product) {
    return;
  }

  return props.isPriceByWeight
    ? getWeightPercentDifference(props.pinProduct, props.product)
    : getPricePercentDifference(props.pinProduct, props.product);
};

export default PercentDifferenceShip;
