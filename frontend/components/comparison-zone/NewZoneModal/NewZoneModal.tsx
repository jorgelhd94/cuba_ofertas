import { ProductInfoCard } from "@/components/products/ProductInfoCard/ProductInfoCard";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
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
import React, { useEffect, useState } from "react";

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
  const [zoneName, setZoneName] = useState("");
  const [duplicateError, setDuplicateError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleKey = (key: string) => {
    if (key === "Enter") {
      handleForm();
    }
  };

  const handleInput = (element: HTMLInputElement) => {
    setZoneName(element.value);
    setDuplicateError(false);
  };

  const handleForm = async () => {
    if (!product) return;

    const data: IComparisonZone = {
      name: zoneName,
      main_product: product,
    };

    setIsLoading(true);
    await createZone(data);
    setIsLoading(false);
  };

  const createZone = async (data: IComparisonZone) => {
    const responseData = await fetch(
      process.env.NEXT_PUBLIC_API_URL! + `api/v1/comparation_zones/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .catch(async (error) => {
        if (error instanceof Response) {
          const errorData = await error.json();

          if ("name" in errorData) {
            setDuplicateError(true);
          }
        } else {
          // Si el error no es una instancia de Response, lo lanzamos tal cual
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
          throw error;
        }
      });

    console.log(responseData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Nueva zona de comparación
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Nombre de la zona"
                variant="bordered"
                isRequired
                value={zoneName}
                onChange={(ev) => handleInput(ev.target)}
                onKeyUp={(event) => handleKey(event.key)}
                isClearable
                onClear={() => setZoneName("")}
                errorMessage={
                  duplicateError && "Ya existe una zona con este nombre"
                }
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
              <Button
                color="primary"
                onPress={handleForm}
                isDisabled={!zoneName}
                isLoading={isLoading}
              >
                Crear
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
