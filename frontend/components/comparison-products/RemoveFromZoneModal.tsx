import { ComparisonZoneContext } from "@/lib/context/ComparisonZoneContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useContext, useState } from "react";

type Props = {
  product: IProduct;
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
};

export const RemoveFromZoneModal: React.FC<Props> = (props) => {
  const comparisonZone = useContext(ComparisonZoneContext);
  const [isLoading, setIsLoading] = useState(false);

  const removeProduct = async () => {
    // setIsLoading(true);
    // await postFetcher(`/comparison-zones/${comparisonZone?.id}/api/`, {
    //   product: props.product,
    // })
    //   .then(() => {
    //     if (props.onOpenChange) props.onOpenChange(false);
    //     toast.success("El producto se ha añadido correctamente");
    //   })
    //   .catch(() => toast.error("Ha ocurrido un error al añadir el producto"))
    //   .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      hideCloseButton={isLoading}
      isDismissable={!isLoading}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Eliminar producto
            </ModalHeader>
            <ModalBody>
              <p>¿Desea eliminar este producto de la zona de comparación?</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
              >
                Cerrar
              </Button>
              <Button
                color="danger"
                onPress={removeProduct}
                isLoading={isLoading}
              >
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
