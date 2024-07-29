import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { PriceByWeightCalculator } from "./PriceByWeightCalculator";
import { IProduct } from "@/lib/interfaces/IProduct";

type CalculatorModalProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  product: IProduct;
};

export const PriceByWeightCalculatorModal: React.FC<CalculatorModalProps> = (
  props
) => {
  return (
    <Modal size="3xl" placement="top" scrollBehavior="outside" isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Calcular nuevo precio según peso
            </ModalHeader>
            <ModalBody>
              <PriceByWeightCalculator product={props.product} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
