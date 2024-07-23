import { IShop } from "@/lib/interfaces/IChop";
import React from "react";
import Sm23 from "@/public/assets/shops/sm23.png";
import Kata from "@/public/assets/shops/kata.png";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/lib/interfaces/IProduct";

type Props = {
  product: IProduct;
};

const ShopImage = (props: Props) => {
  const getShopImage = () => {
    if (props.product.shop.slug === "kata") {
      return Kata;
    }

    return Sm23;
  };

  const getProductUrl = () => {
    return props.product.product_url || props.product.shop.url;
  };

  return (
    <Link href={getProductUrl()} target="_blank">
      <Image src={getShopImage()} priority width={36} alt="Shop Image" />
    </Link>
  );
};

export default ShopImage;
