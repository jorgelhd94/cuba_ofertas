import ShopImage from "@/components/shared/images/ShopImage/ShopImage";
import { IProduct } from "@/lib/interfaces/IProduct";
import { Button, Card, CardBody, Chip, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import HighRankedProductsModal from "./HighRankedProductsModal";
import Link from "next/link";

type Props = {
  product: IProduct;
  higherProducts: IProduct[];
};

const ProductNotificationCard = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Card fullWidth shadow="md">
        <CardBody className="flex flex-row items-center relative max-sm:px-4 py-6 sm:py-4 gap-2 flex-wrap">
          <Link href={"/products/" + props.product.id}>
            <Image
              radius="lg"
              alt={props.product.name}
              src={props.product.image_url}
              className="max-w-20"
            />
          </Link>
          <div>
            <p className="text-xs font-bold">{props.product.name}</p>
            <p className="text-sm font-bold mt-2">
              {props.product.current_price} {props.product.currency}
            </p>
            {props.product.price_by_weight && (
              <p className="text-xs font-bold mt-1">
                {props.product.price_by_weight}{" "}
                {props.product.currency_by_weight}
              </p>
            )}
          </div>

          <div className="w-full pt-2">
            <Button
              color="secondary"
              variant="ghost"
              startContent={<FaEye />}
              endContent={
                <Chip color="secondary" size="sm">
                  {props.higherProducts.length}
                </Chip>
              }
              size="sm"
              onClick={() => setShowModal(true)}
            >
              Productos con mejor precio
            </Button>
          </div>

          {props.product.provider && (
            <Chip
              color="primary"
              radius="full"
              size="sm"
              className="absolute top-2 right-2 z-30"
            >
              {props.product.provider?.name}
            </Chip>
          )}

          <div className="absolute bottom-2 right-2">
            <ShopImage
              product={props.product}
            />
          </div>
        </CardBody>
      </Card>

      <HighRankedProductsModal
        isOpen={showModal}
        onOpenChange={setShowModal}
        mainProduct={props.product}
        products={props.higherProducts}
      />
    </>
  );
};

export default ProductNotificationCard;
