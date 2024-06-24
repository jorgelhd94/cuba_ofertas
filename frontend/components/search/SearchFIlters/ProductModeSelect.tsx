import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type ProductModeSelectProps = {
  isDisabled?: boolean;
};

export const ProductModeSelect: React.FC<ProductModeSelectProps> = ({
  isDisabled,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const options = [
    { value: "show_all", text: "Mostrar todos" },
    { value: "combo", text: "Mostrar combos" },
    { value: "simple", text: "Mostrar productos simples" },
  ];

  const handleMode = (criteria: string) => {
    router.push(
      pathname +
        "?" +
        getQueryString(searchParams.toString(), {
          name: "mode",
          value: criteria,
        })
    );
  };
  return (
    <Select
      isDisabled={isDisabled}
      selectedKeys={[searchParams.get("mode") || "show_all"]}
      selectionMode="single"
      variant="faded"
      label="Mostrar por"
      className="max-w-64"
      onChange={(event) => handleMode(event.target.value)}
      color={
        searchParams.get("mode") && searchParams.get("mode") !== "show_all"
          ? "primary"
          : "default"
      }
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.text}
        </SelectItem>
      ))}
    </Select>
  );
};
