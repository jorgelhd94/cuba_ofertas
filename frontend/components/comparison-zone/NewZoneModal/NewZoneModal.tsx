import { ProductInfoCard } from "@/components/products/ProductInfoCard/ProductInfoCard";
import { CreateZoneSuccessMsg } from "@/components/shared/messages/CreateZoneSuccessMsg/CreateZoneSuccessMsg";
import {
  IComparisonZone,
  ICreateComparisonZone,
} from "@/lib/interfaces/IComparisonZone";
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
import Link from "next/link";
import React, { useState } from "react";

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

  const [comparisonZone, setComparisonZone] = useState<IComparisonZone | null>(
    null
  );

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      setComparisonZone(null);
      setZoneName("");
    }
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  };

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

    const data: ICreateComparisonZone = {
      name: zoneName,
      main_product: product,
    };

    setIsLoading(true);
    await createZone(data);
    setIsLoading(false);
  };

  const createZone = async (data: ICreateComparisonZone) => {
    const responseData = await fetch(
      process.env.NEXT_PUBLIC_API_URL! + `api/v1/comparison_zones/`,
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
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
          throw error;
        }
      });

    setComparisonZone(responseData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpen}
      placement="center"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {!comparisonZone ? (
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
              </>
            ) : (
              <ModalBody className="pt-4">
                <CreateZoneSuccessMsg />
              </ModalBody>
            )}

            <ModalFooter
              className={comparisonZone ? "flex justify-center" : ""}
            >
              <Button color="danger" variant="bordered" onPress={onClose}>
                Cerrar
              </Button>
              {!comparisonZone ? (
                <Button
                  color="primary"
                  onPress={handleForm}
                  isDisabled={!zoneName}
                  isLoading={isLoading}
                >
                  Crear
                </Button>
              ) : (
                <Button color="primary">
                  <Link href="/">Ver zona</Link>
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
