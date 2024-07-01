import { UpIcon } from "../../../components/shared/icons/UpIcon";
import { DownIcon } from "../../../components/shared/icons/DownIcon";
import { IProduct } from "@/lib/interfaces/IProduct";

export const getPriceStyle = (
  pinProduct: IProduct | null,
  product: IProduct
) => {
  if (pinProduct) {
    if (pinProduct?.current_price > product.current_price) {
      return "text-success";
    } else if (pinProduct?.current_price < product.current_price) {
      return "text-danger";
    }
  }
};

export const getPriceByWeightStyle = (
  pinProduct: IProduct | null,
  product: IProduct
) => {
  if (pinProduct && pinProduct.price_by_weight && product.price_by_weight) {
    if (pinProduct?.price_by_weight > product.price_by_weight) {
      return "text-success-600";
    } else if (pinProduct?.price_by_weight < product.price_by_weight) {
      return "text-danger";
    } else {
      return "text-slate-600";
    }
  }
};

export const getArrowIconByPrice = (
  pinProduct: IProduct | null,
  product: IProduct
) => {
  if (pinProduct) {
    if (pinProduct?.current_price > product.current_price) {
      return <DownIcon />;
    } else if (pinProduct?.current_price < product.current_price) {
      return <UpIcon />;
    }
  }
};

export const getArrowIconByWeight = (
  pinProduct: IProduct | null,
  product: IProduct
) => {
  if (pinProduct && pinProduct.price_by_weight && product.price_by_weight) {
    if (pinProduct?.price_by_weight > product.price_by_weight) {
      return <DownIcon size="small" />;
    } else if (pinProduct?.price_by_weight < product.price_by_weight) {
      return <UpIcon size="small" />;
    }
  }
};
