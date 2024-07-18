import React from "react";
import SimpleModal from "../shared/modals/SimpleModal";
import { Button, Input } from "@nextui-org/react";
import { HiLockClosed, HiUser } from "react-icons/hi2";
import { FaDoorOpen } from "react-icons/fa6";
import Logo from "../shared/logo";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const LoginModal = (props: Props) => {
  return (
    <SimpleModal
      showModal={props.isOpen}
      setShowModal={props.onOpenChange}
      title=""
      hideFooter
      hideHeader
      size="sm"
    >
      <div className="w-full px-2 my-2 flex flex-col items-center gap-4">
        <div className="mb-4 flex flex-col items-center gap-4">
          <Logo />
          <div className="text-center">
            <h1 className="text-2xl">Iniciar sesión</h1>
            <p className="text-sm">Introduzca sus credenciales para acceder</p>
          </div>
        </div>
        <Input
          type="text"
          label="Nombre de usuario"
          placeholder="Nombre de usuario"
          labelPlacement="outside"
          variant="bordered"
          startContent={
            <HiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />

        <Input
          type="password"
          label="Contraseña"
          placeholder="Escriba la contraseña"
          labelPlacement="outside"
          variant="bordered"
          startContent={
            <HiLockClosed className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />

        <Button color="primary" className="my-4 w-full">
          Acceder
        </Button>
      </div>
    </SimpleModal>
  );
};

export default LoginModal;
