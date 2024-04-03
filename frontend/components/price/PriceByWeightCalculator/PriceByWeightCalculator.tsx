import { ProductCard } from "@/components/products/ProductCard/ProductCard";
import { IProduct } from "@/lib/interfaces/IProduct";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";

type PriceByWeightCalculatorProps = {
  product: IProduct;
};

export const PriceByWeightCalculator: React.FC<PriceByWeightCalculatorProps> = (
  props
) => {
  const [weight, setWeight] = useState(0.0);
  const [newPriceByWeight, setNewPriceByWeight] = useState(0.0);

  const getWeightName = () => {
    return props.product.currency_by_weight
      ? props.product.currency_by_weight.split("/")[1]
      : "lb";
  };

  const getTotalPrice = () => {
    if (newPriceByWeight && weight) {
      return (newPriceByWeight * weight).toFixed(2);
    }

    const priceByWeight = props.product.price_by_weight;

    if (priceByWeight && weight) {
      return (priceByWeight * weight).toFixed(2);
    }

    return "0.00";
  };

  return (
    <div className="grid sm:grid-cols-2">
      <div className="flex justify-center">
        <ProductCard product={props.product} hideMenu hideSetPin />
      </div>

      <div>
        <div className="flex flex-col gap-4">
          <Input
            label="Nuevo peso del producto"
            placeholder="Ejemplo: 3"
            variant="bordered"
            isRequired
            type="number"
            step={0.01}
            labelPlacement="outside"
            endContent={getWeightName()}
            onChange={(event) => setWeight(parseFloat(event.target.value))}
          />

          <Input
            label="Nuevo precio por peso (Opcional)"
            placeholder="Ejemplo: 1.56"
            variant="bordered"
            type="number"
            step={0.01}
            labelPlacement="outside"
            endContent={
              props.product.currency_by_weight
                ? props.product.currency_by_weight
                : "US$/lb"
            }
            onChange={(event) =>
              setNewPriceByWeight(parseFloat(event.target.value))
            }
          />
        </div>

        <div className="h-44 w-full flex flex-col justify-center items-center gap-2">
          <h4 className="text-lg text-gray-400">Nuevo precio total</h4>
          <h1 className="text-4xl">
            {getTotalPrice()} {props.product.currency}
          </h1>
        </div>
      </div>
    </div>
  );
};
