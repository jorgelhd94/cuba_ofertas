"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  title: string;
  children: React.ReactNode;
};

const SimpleModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.showModal}
      onOpenChange={props.setShowModal}
      placement="center"
      isDismissable={false}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{props.title}</ModalHeader>
            
            <ModalBody className="pt-4">{props.children}</ModalBody>

            <ModalFooter>
              <Button color="danger" variant="bordered" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SimpleModal;
