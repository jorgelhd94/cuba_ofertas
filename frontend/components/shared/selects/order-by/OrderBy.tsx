import { useQueryString } from "@/lib/hooks/useQueryString";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type OrderByProps = {
  isDisabled?: boolean;
};

export const OrderBy: React.FC<OrderByProps> = ({ isDisabled }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString(searchParams);

  const options = [
    { value: "default", text: "Sin ordenar" },
    { value: "less_price", text: "Menor precio" },
    { value: "higher_price", text: "Mayor precio" },
    { value: "new", text: "Más nuevo" },
    { value: "less_price_by_weight", text: "Menor precio/lb" },
  ];

  const [defaultOption, setDefaultOption] = useState(["default"]);

  const handleOrderBy = (criteria: string) => {
    const param = {
      name: "orderby",
      value: criteria,
    };

    router.push(pathname + "?" + createQueryString(param));
  };

  return (
    <Select
      isDisabled={isDisabled}
      selectedKeys={defaultOption}
      selectionMode="single"
      variant="faded"
      label="Ordenar por"
      className="max-w-64"
      onChange={(event) => handleOrderBy(event.target.value)}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.text}
        </SelectItem>
      ))}
    </Select>
  );
};
