import { ProductInfoCard } from "@/components/products/ProductInfoCard/ProductInfoCard";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

type NewZoneModalProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  product: IProduct | null;
};

export const NewZoneModal: React.FC<NewZoneModalProps> = ({
  isOpen,
  onOpenChange,
  product,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Nueva zona de comparación
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Nombre"
                placeholder="Entra el nombre de la zona"
                variant="bordered"
              />

              {product && (
                <div>
                  <ProductInfoCard product={product} />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="bordered" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={onClose}>
                Crear
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
