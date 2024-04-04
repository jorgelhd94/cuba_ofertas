import { ComparisonZoneContext } from "@/lib/context/ComparisonZoneContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { postFetcher } from "@/lib/utils/api/fetcher";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

type Props = {
  product: IProduct;
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
};

export const RemoveFromZoneModal: React.FC<Props> = (props) => {
  const comparisonZone = useContext(ComparisonZoneContext);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useSWRConfig();

  const removeProduct = async () => {
    setIsLoading(true);
    await postFetcher(
      `/api/comparison-zones/${comparisonZone?.id}/comparison-product/`,
      {
        product: props.product,
      },
      "DELETE"
    )
      .then(() => {
        if (props.onOpenChange) props.onOpenChange(false);
        toast.success("El producto se ha eliminado correctamente");
        mutate(`/api/comparison-zones/${comparisonZone?.id}/`);
      })
      .catch(() => toast.error("Ha ocurrido un error al eliminar el producto"))
      .finally(() => setIsLoading(false));
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
