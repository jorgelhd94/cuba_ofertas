import { IShop } from "@/lib/interfaces/IChop";
import React from "react";
import Sm23 from "@/public/assets/shops/sm23.png";
import Image from "next/image";
import Link from "next/link";

type Props = {
  shop: IShop;
};

const ShopImage = (props: Props) => {
  return (
    <Link href={props.shop.url} target="_blank">
      <Image src={Sm23} priority width={36} alt="Shop Image" />
    </Link>
  );
};

export default ShopImage;
