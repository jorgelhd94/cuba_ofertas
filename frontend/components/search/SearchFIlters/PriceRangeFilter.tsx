"use client";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Input, Slider, SliderValue } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {};
const PriceRangeFilter = (props: Props) => {
  const { data, isLoading, error } = useSWR(
    getApiUrl("/products/range_prices/"),
    fetcher
  );

  const [max, setMax] = useState(10000);

  const [minPrice, setMinPrice] = useState(0.0);
  const [maxPrice, setMaxPrice] = useState(max);

  const [values, setValues] = useState<SliderValue>([minPrice, maxPrice]);

  useEffect(() => {
    if (data && data.max_price > 0) {
      setMaxPrice(data.max_price);
      setMax(data.max_price);
    }
  }, [data]);

  const handleValues = (values: SliderValue) => {
    if (!Array.isArray(values)) return;

    const [min, max] = values;

    setMinPrice(min);
    setMaxPrice(max);
    setValues(values);
  };

  useEffect(() => {
    if (Array.isArray(values) && values.length === 2) {
      setMinPrice(values[0]);
      setMaxPrice(values[1]);
    }
  }, [values]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="w-full">
      <h4 className="text-medium font-medium text-left w-full mb-2">Precio</h4>
      <Slider
        label={" "}
        color={"primary"}
        step={10}
        minValue={0.0}
        maxValue={max}
        value={values}
        formatOptions={{ style: "currency", currency: "USD" }}
        className="max-w-md"
        onChange={handleValues}
      />

      <div className="flex gap-2">
        <Input
          type="number"
          variant="underlined"
          description="mínimo"
          value={minPrice.toString()}
          onChange={(event) => {
            if (Number(event.target.value) < maxPrice) {
              setMinPrice(Number(event.target.value));
            }
          }}
          min={0.0}
          startContent={"$"}
        />
        <Input
          startContent={"$"}
          type="number"
          variant="underlined"
          description="máximo"
          value={maxPrice.toString()}
          onChange={(event) => {
            if (Number(event.target.value) > minPrice) {
              setMaxPrice(Number(event.target.value));
            }
          }}
          min={0.0}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
