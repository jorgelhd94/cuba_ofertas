import { Button } from "@nextui-org/react";
import { useState } from "react";
import { HiUser } from "react-icons/hi2";

type Props = {};

const LoginButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-4" onClick={() => setIsOpen(true)}>
        <Button isIconOnly variant="light">
          <HiUser size={24} />
        </Button>
        <p className="text-medium">Iniciar sesión</p>
      </div>
    </div>
  );
};

export default LoginButton;
