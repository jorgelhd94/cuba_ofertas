"use client";
import { AddToZoneWrapper } from "@/components/comparison-products/add-to-compare/AddToZoneWrapper";
import { NewZoneModal } from "@/components/comparison-zone/NewZoneModal/NewZoneModal";
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
  const [isModalAddToZoneOpen, setIsModalAddToZoneOpen] = useState(false);
  const [isModalNewZoneOpen, setIsModalNewZoneOpen] = useState(false);
  const [isPriceCalculatorModalOpen, setPriceCalculatorModalOpen] =
    useState(false);

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
          <DropdownItem
            onPress={() => setIsModalAddToZoneOpen(true)}
            key="add"
            description="Añadir a zona de comparación"
            color="secondary"
          >
            Añadir a comparar
          </DropdownItem>
          <DropdownItem
            onPress={() => setIsModalNewZoneOpen(true)}
            key="new"
            description="Crear nueva zona de comparación"
            color="primary"
          >
            Nueva comparación
          </DropdownItem>
          <DropdownItem
            key="calculate_price_by_weight"
            description="Calcular nuevo precio por peso"
            color="warning"
            onPress={() => setPriceCalculatorModalOpen(true)}
          >
            Calcular nuevo precio
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <NewZoneModal
        product={props.product}
        isOpen={isModalNewZoneOpen}
        onOpenChange={setIsModalNewZoneOpen}
      />

      <PriceByWeightCalculatorModal
        product={props.product}
        isOpen={isPriceCalculatorModalOpen}
        onOpenChange={setPriceCalculatorModalOpen}
      />

      <AddToZoneWrapper
        product={props.product}
        isOpen={isModalAddToZoneOpen}
        onOpenChange={setIsModalAddToZoneOpen}
      />
    </>
  );
};
