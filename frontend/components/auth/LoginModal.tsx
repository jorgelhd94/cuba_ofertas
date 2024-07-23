import { Button, Input } from "@nextui-org/react";
import { HiLockClosed, HiUser } from "react-icons/hi2";
import Logo from "../shared/logo";
import SimpleModal from "../shared/modals/SimpleModal";
import { authenticate } from "@/lib/actions/authenticate";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const LoginModal = (props: Props) => {
  const [state, formAction] = useFormState(authenticate, initialState);

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
            {state && (
              <p className="text-sm text-danger mt-2">{state.message}</p>
            )}
          </div>
        </div>
        <form
          action={formAction}
          className="w-full flex flex-col items-center gap-4"
        >
          <Input
            id="username"
            name="username"
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
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Escriba la contraseña"
            labelPlacement="outside"
            variant="bordered"
            startContent={
              <HiLockClosed className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />

          <Button type="submit" color="primary" className="my-4 w-full">
            Acceder
          </Button>
        </form>
      </div>
    </SimpleModal>
  );
};

export default LoginModal;
