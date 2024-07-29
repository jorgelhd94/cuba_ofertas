"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { DeleteModal } from "../shared/modals/DeleteModal";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";

type DeleteComparisonZoneProps = {
  id: string | number;
};

export const DeleteComparisonZone: React.FC<DeleteComparisonZoneProps> = (
  props
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL!}api/v1/comparison_zones/${props.id}/`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        toast.success("Zona eliminada correctamente");
        setIsModalOpen(false);
        mutate( `${process.env.NEXT_PUBLIC_API_URL!}api/v1/comparison_zones/`);
        router.push("/comparison-zones");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error al eliminar la Zona");
      });

    setIsLoading(false);
  };

  return (
    <>
      <Button
        color="danger"
        variant="ghost"
        onPress={() => setIsModalOpen(true)}
      >
        Eliminar zona
      </Button>

      <DeleteModal
        isOpen={isModalOpen}
        handleDelete={handleDelete}
        onOpenChange={setIsModalOpen}
        isLoading={isLoading}
      />
    </>
  );
};
