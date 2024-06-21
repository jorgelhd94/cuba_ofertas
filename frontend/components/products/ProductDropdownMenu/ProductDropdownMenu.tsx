"use client";
import { PriceByWeightCalculatorModal } from "@/components/price/PriceByWeightCalculator/PriceByWeightCalculatorModal";
import { VerticalDots } from "@/components/shared/icons/VerticalDots";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";

type ProductDropdownMenuProps = {
  product: IProduct;
};

export const ProductDropdownMenu: React.FC<ProductDropdownMenuProps> = (
  props
) => {
  const [isPriceCalculatorModalOpen, setPriceCalculatorModalOpen] =
    useState(false);



  const getMenuItems = () => {
    const menu = [
      <DropdownItem
        key="calculate_price_by_weight"
        description="Calcular nuevo precio por peso"
        color="warning"
        onPress={() => setPriceCalculatorModalOpen(true)}
      >
        Calcular nuevo precio
      </DropdownItem>,
    ];
    return menu;
  };

  return (
    <>
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
          {getMenuItems().map((item) => item)}
        </DropdownMenu>
      </Dropdown>

      <PriceByWeightCalculatorModal
        product={props.product}
        isOpen={isPriceCalculatorModalOpen}
        onOpenChange={setPriceCalculatorModalOpen}
      />
    </>
  );
};
