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
          onClick={props.handleNewZone}
          key="new"
          description="Añadir a zona de comparación"
        >
          Nueva comparación
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
