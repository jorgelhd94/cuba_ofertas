import { VerticalDots } from "@/components/shared/icons/VerticalDots";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

type ProductDropdownMenuProps = {
  handleNewZone?: () => void;
  handlePriceByWeightCalculatorModal?: (isOpen: boolean) => void;
};

export const ProductDropdownMenu: React.FC<ProductDropdownMenuProps> = (
  props
) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className="z-20 bg-white"
          radius="lg"
          color="default"
          variant="bordered"
        >
          <VerticalDots />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onPress={props.handleNewZone}
          key="new"
          description="Crear nueva zona de comparación"
          color="primary"
        >
          Nueva comparación
        </DropdownItem>
        <DropdownItem
          key="calculate_price_by_weight"
          description="Calcular nuevo precio por peso"
          color="secondary"
          onPress={() =>
            props.handlePriceByWeightCalculatorModal &&
            props.handlePriceByWeightCalculatorModal(true)
          }
        >
          Calcular nuevo precio
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
