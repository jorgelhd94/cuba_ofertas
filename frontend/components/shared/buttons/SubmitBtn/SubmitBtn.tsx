"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

type SubmitBtnProps = {
  onClick?: React.MouseEventHandler;
  loading?: boolean;
};

export const SubmitBtn: React.FC<SubmitBtnProps> = ({ onClick, loading }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      color="secondary"
      type="submit"
      isLoading={pending || loading}
      disabled={pending || loading}
    >
      {pending || loading ? "Buscando" : "Buscar"}
    </Button>
  );
};
