import { VerticalDots } from "@/components/shared/icons/VerticalDots";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

export const ProductDropdownMenu = () => {
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
        <DropdownItem key="new" description="Añadir a zona de comparación">Nueva comparación</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
