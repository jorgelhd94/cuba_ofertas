import { ZoneSelect } from "@/components/comparison-zone/ZoneSelect";
import { ComparisonZoneContext } from "@/lib/context/ComparisonZoneContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { postFetcher } from "@/lib/utils/api/fetcher";
import { getComparisonZoneById } from "@/lib/utils/functions/comparison-zone";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
} from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

type Props = {
  product: IProduct;
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
};

export const AddToZoneModal: React.FC<Props> = (props) => {
  const comparisonZone = useContext(ComparisonZoneContext);
  const [comparisonZoneId, setComparisonZoneId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useSWRConfig();

  const addProduct = async () => {
    setIsLoading(true);

    const zoneId = comparisonZone ? comparisonZone.id : comparisonZoneId;

    await postFetcher(`/api/comparison-zones/${zoneId}/`, {
      product: props.product,
    })
      .then(() => {
        if (props.onOpenChange) props.onOpenChange(false);
        toast.success("El producto se ha añadido correctamente");
        mutate(`/api/comparison-zones/${zoneId}/`);
        mutate("/api/comparison-zones/");
      })
      .catch(() => toast.error("Ha ocurrido un error al añadir el producto"))
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
              Añadir producto
            </ModalHeader>
            <ModalBody>
              {comparisonZone ? (
                <p>¿Desea añadir este producto a la zona de comparación?</p>
              ) : (
                <ZoneSelect
                  onSelectChange={setComparisonZoneId}
                  product={props.product}
                />
              )}
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
                color="primary"
                onPress={addProduct}
                isLoading={isLoading}
                isDisabled={!comparisonZone && !comparisonZoneId}
              >
                Añadir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
