import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

type ProductModeSelectProps = {
  handleProductMode: Function;
  isDisabled?: boolean;
  orderByOption: number;
};

export const ProductModeSelect: React.FC<ProductModeSelectProps> = ({
  handleProductMode,
  isDisabled,
  orderByOption,
}) => {
  const options = [
    { value: "-1", text: "Mostrar todos" },
    { value: "0", text: "Mostrar combos" },
    { value: "1", text: "Mostrar productos simples" },
  ];

  const [defaultOption, setDefaultOption] = useState(["-1"]);

  useEffect(() => {
    setDefaultOption([orderByOption.toString()]);
  }, [orderByOption]);

  return (
    <Select
      isDisabled={isDisabled}
      selectedKeys={defaultOption}
      selectionMode="single"
      variant="faded"
      label="Mostrar por"
      className="max-w-64"
      onChange={(event) => handleProductMode(event.target.value)}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.text}
        </SelectItem>
      ))}
    </Select>
  );
};
