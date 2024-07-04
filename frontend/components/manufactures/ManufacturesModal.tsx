import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
  } from "@nextui-org/react";
  import React, { ReactNode, UIEventHandler, forwardRef } from "react";
  
  type Props = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    handleScroll: UIEventHandler<HTMLElement>;
    children: ReactNode;
  };
  
  const ManufacturesModal = forwardRef<HTMLDivElement, Props>(
    ({ isOpen, onOpenChange, handleScroll, children }, ref) => {
      return (
        <Modal
          size="2xl"
          placement="top"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
          ref={ref}
          onScrollCapture={handleScroll}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Seleccionar marca</ModalHeader>
                <ModalBody>{children}</ModalBody>
  
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
    }
  );
  
  export default ManufacturesModal;
  