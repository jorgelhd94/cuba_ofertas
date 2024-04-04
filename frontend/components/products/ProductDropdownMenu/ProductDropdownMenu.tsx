"use client";
import { AddToZoneWrapper } from "@/components/comparison-products/add-to-compare/AddToZoneWrapper";
import { RemoveFromZoneModal } from "@/components/comparison-products/RemoveFromZoneModal";
import { NewZoneModal } from "@/components/comparison-zone/NewZoneModal/NewZoneModal";
import { PriceByWeightCalculatorModal } from "@/components/price/PriceByWeightCalculator/PriceByWeightCalculatorModal";
import { VerticalDots } from "@/components/shared/icons/VerticalDots";
import { ComparisonZoneContext } from "@/lib/context/ComparisonZoneContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";

type ProductDropdownMenuProps = {
  product: IProduct;
};

export const ProductDropdownMenu: React.FC<ProductDropdownMenuProps> = (
  props
) => {
  const comparisonZone = useContext(ComparisonZoneContext);

  const [isAddToZoneModalOpen, setAddToZoneModalOpen] = useState(false);
  const [isRemoveFromZoneModalOpen, setRemoveFromZoneModalOpen] =
    useState(false);
  const [isNewZoneModalOpen, setNewZoneModalOpen] = useState(false);
  const [isPriceCalculatorModalOpen, setPriceCalculatorModalOpen] =
    useState(false);

  const isProductInZone = () => {
    if (!comparisonZone || !comparisonZone.comparison_products) return false;

    return comparisonZone.comparison_products.find(
      (value) => value.product_id === props.product.product_id
    );
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
          <DropdownItem
            onPress={() => setNewZoneModalOpen(true)}
            key="new"
            description="Crear nueva zona de comparación"
            color="primary"
          >
            Nueva comparación
          </DropdownItem>

          {!isProductInZone() ? (
            <DropdownItem
              onPress={() => setAddToZoneModalOpen(true)}
              key="addToZone"
              description="Añadir a zona de comparación"
              color="secondary"
            >
              Añadir a comparar
            </DropdownItem>
          ) : (
            <DropdownItem
              onPress={() => setRemoveFromZoneModalOpen(true)}
              key="removeFromZone"
              description="Eliminar de la zona de comparación"
              color="danger"
            >
              Eliminar de la zona
            </DropdownItem>
          )}

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
        isOpen={isNewZoneModalOpen}
        onOpenChange={setNewZoneModalOpen}
      />

      <PriceByWeightCalculatorModal
        product={props.product}
        isOpen={isPriceCalculatorModalOpen}
        onOpenChange={setPriceCalculatorModalOpen}
      />

      <AddToZoneWrapper
        product={props.product}
        isOpen={isAddToZoneModalOpen}
        onOpenChange={setAddToZoneModalOpen}
      />

      <RemoveFromZoneModal
        product={props.product}
        isOpen={isRemoveFromZoneModalOpen}
        onOpenChange={setRemoveFromZoneModalOpen}
      />
    </>
  );
};
