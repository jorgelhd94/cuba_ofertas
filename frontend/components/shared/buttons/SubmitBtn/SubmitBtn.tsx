"use client";
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export const SubmitBtn = () => {
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
