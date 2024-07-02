"use client"; // Error components must be Client Components

import { ErrorMsg } from "@/components/shared/messages/ErrorMsg/ErrorMsg";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 pt-4">
      <ErrorMsg message="Ha ocurrido un error al cargar los datos del producto" />
      <Button color="primary" onClick={() => reset()}>
        Inténtalo de nuevo
      </Button>

    </div>
  );
}
