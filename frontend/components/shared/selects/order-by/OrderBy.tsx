import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

type OrderByProps = {
  handleOrderBy: Function;
  isDisabled?: boolean;
};

export const OrderBy: React.FC<OrderByProps> = ({
  handleOrderBy,
  isDisabled,
}) => {
  const options = [
    { value: "0", text: "Menor precio" },
    { value: "1", text: "Mayor precio" },
    { value: "2", text: "Más nuevo" },
    { value: "3", text: "Menor precio/lb" },
  ];

  return (
    <Select
      isDisabled={isDisabled}
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
