"use client";
import { Button } from "@nextui-org/react";
import React, { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";

type SubmitBtnProps = {
  onClick?: React.MouseEventHandler;
};

export const SubmitBtn: React.FC<SubmitBtnProps> = ({ onClick }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      color="secondary"
      type="submit"
      isLoading={pending}
      disabled={pending}
    >
      {pending ? "Buscando" : "Buscar"}
    </Button>
  );
};
