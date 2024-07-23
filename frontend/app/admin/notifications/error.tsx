"use client";

import { ErrorMsg } from "@/components/shared/messages/ErrorMsg/ErrorMsg";
import { Button } from "@nextui-org/react";

export default function NotificationsErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto max-w-screen-md">
      <div className="w-full space-y-8">
        <h1 className="text-2xl font-bold">Alertas</h1>

        <ErrorMsg message="Ha ocurrido un error al cargar las alertas" />

        <div className="flex justify-center">
          <Button color="primary" onClick={() => reset()}>
            Inténtalo de nuevo
          </Button>
        </div>
      </div>
    </div>
  );
}
