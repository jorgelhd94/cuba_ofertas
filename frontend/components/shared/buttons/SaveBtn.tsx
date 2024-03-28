"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

type SaveBtnProps = {
  onClick?: React.MouseEventHandler;
  loading?: boolean;
};

export const SaveBtn: React.FC<SaveBtnProps> = ({ onClick, loading }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      color="success"
      variant="bordered"
      type="submit"
      isLoading={pending || loading}
      disabled={pending || loading}
      className="w-max text-black dark:text-white"
    >
      {pending || loading ? "Guardando" : "Guardar"}
    </Button>
  );
};
