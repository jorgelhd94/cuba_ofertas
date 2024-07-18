import React from "react";
import SimpleModal from "../shared/modals/SimpleModal";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const LoginModal = (props: Props) => {
  return (
    <SimpleModal
      showModal={props.isOpen}
      setShowModal={props.onOpenChange}
      title=""
    >
      {props.children}
    </SimpleModal>
  );
};

export default LoginModal;
