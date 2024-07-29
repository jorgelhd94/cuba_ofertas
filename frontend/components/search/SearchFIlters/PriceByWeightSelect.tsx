import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  isDisabled?: boolean;
};

export const PriceByWeightSelect: React.FC<Props> = ({ isDisabled }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const options = [
    { value: "show_all", text: "Mostrar todos" },
    { value: "with_price_weight", text: "Con precio/lb" },
    { value: "without_price_weight", text: "Sin precio/lb" },
  ];

  const handleMode = (criteria: string) => {
    router.push(
      pathname +
        "?" +
        getQueryString(searchParams.toString(), {
          name: "price_by_weight",
          value: criteria,
        })
    );
  };

  const isNotDefault =
    searchParams.get("price_by_weight") &&
    searchParams.get("price_by_weight") !== "show_all";

  return (
    <Select
      size="sm"
      isDisabled={isDisabled}
      selectedKeys={[searchParams.get("price_by_weight") || "show_all"]}
      selectionMode="single"
      variant={isNotDefault ? "flat" : "faded"}
      label="Precio por libra"
      className="max-w-64"
      onChange={(event) => handleMode(event.target.value)}
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
