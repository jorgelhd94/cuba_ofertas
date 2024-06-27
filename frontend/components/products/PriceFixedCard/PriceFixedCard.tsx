"use client";

import { IProduct } from "@/lib/interfaces/IProduct";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

type Props = {
  className?: string;
  product: IProduct;
};

const PriceFixedCard = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const documentHeight = document.documentElement.scrollHeight;

    // Calcular el 30% de la altura total del documento
    const scrollThreshold = documentHeight * 0.1;

    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <Card
      className={`z-30 bg-primary text-white fixed bottom-8 left-4 ${
        isVisible ? "block" : "hidden"
      } ${props.className}`}
    >
      <CardBody className="space-y-2">
        <p className="text-sm">Precio actual</p>
        <p className="text-sm">
          {props.product.current_price} {props.product.currency}
        </p>

        {props.product.price_by_weight !== null && (
          <p className="text-xs">
            {props.product.price_by_weight} {props.product.currency_by_weight}
          </p>
        )}
      </CardBody>
    </Card>
  );
};

export default PriceFixedCard;
