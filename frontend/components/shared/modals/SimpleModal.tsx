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
  hideFooter?: boolean;
  hideHeader?: boolean;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
};

const SimpleModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.showModal}
      onOpenChange={props.setShowModal}
      placement="center"
      isDismissable={false}
      size={props.size || "xl"}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            {!props.hideHeader && <ModalHeader>{props.title}</ModalHeader>}

            <ModalBody className="py-4">{props.children}</ModalBody>

            {!props.hideFooter && (
              <ModalFooter>
                <Button color="danger" variant="bordered" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SimpleModal;
