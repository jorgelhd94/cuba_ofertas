import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

type OrderByProps = {
  isDisabled?: boolean;
};

export const OrderBy: React.FC<OrderByProps> = ({ isDisabled }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const options = [
    { value: "default", text: "Sin ordenar" },
    { value: "less_price", text: "Menor precio" },
    { value: "higher_price", text: "Mayor precio" },
    { value: "new", text: "Más nuevo" },
    { value: "less_price_by_weight", text: "Menor precio/lb" },
    { value: "less_discount", text: "Menor descuento" },
    { value: "higher_discount", text: "Mayor descuento" },
  ];

  const handleOrderBy = (criteria: string) => {
    router.push(
      pathname +
        "?" +
        getQueryString(searchParams.toString(), {
          name: "orderby",
          value: criteria,
        })
    );
  };

  const isNotDefault =
    searchParams.get("orderby") && searchParams.get("orderby") !== "default";

  return (
    <Select
      size="sm"
      isDisabled={isDisabled}
      selectedKeys={[searchParams.get("orderby") || "default"]}
      selectionMode="single"
      variant={isNotDefault ? "flat" : "faded"}
      label="Ordenar por"
      className={`max-w-64`}
      onChange={(event) => handleOrderBy(event.target.value)}
      color={isNotDefault ? "primary" : "default"}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.text}
        </SelectItem>
      ))}
    </Select>
  );
};
