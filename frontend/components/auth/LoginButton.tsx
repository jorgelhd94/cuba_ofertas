import { Button } from "@nextui-org/react";
import React from "react";
import { HiUser } from "react-icons/hi2";

type Props = {};

const LoginButton = (props: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Button isIconOnly variant="light">
        <HiUser size={24} />
      </Button>
      <p className="text-medium">Iniciar sesión</p>
    </div>
  );
};

export default LoginButton;
