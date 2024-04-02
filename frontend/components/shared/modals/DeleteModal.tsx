import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

type DeleteModalProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  handleDelete?: () => void;
  isLoading?: boolean;
};

export const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      placement="center"
      isDismissable={false}
      hideCloseButton={props.isLoading}
      size="xs"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center">Eliminar</ModalHeader>

            <ModalBody className="text-lg text-center">
              ¿Desea eliminar este elemento?
            </ModalBody>

            <ModalFooter className="flex justify-center">
              <Button
                color="danger"
                variant="bordered"
                onPress={onClose}
                isDisabled={props.isLoading}
              >
                Cancelar
              </Button>

              <Button
                color="danger"
                onPress={props.handleDelete}
                isLoading={props.isLoading}
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
