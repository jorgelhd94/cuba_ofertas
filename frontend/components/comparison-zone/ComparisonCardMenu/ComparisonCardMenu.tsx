"use client";
import { VerticalDots } from "@/components/shared/icons/VerticalDots";
import { DeleteModal } from "@/components/shared/modals/DeleteModal";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

type ComparisonCardMenuProps = {
  comparisonZoneId: string | number;
};

export const ComparisonCardMenu: React.FC<ComparisonCardMenuProps> = (
  props
) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    await fetch(`/comparison-zones/${props.comparisonZoneId}/api/`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Zona eliminada correctamente");
        setOpenDeleteModal(false);
        mutate("/comparison-zones/api/");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error al eliminar la Zona");
      });

    setIsLoading(false);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            className="z-20 bg-white"
            radius="lg"
            color="default"
            variant="bordered"
          >
            <VerticalDots />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="manage"
            description="Administrar zona de comparación"
            color="secondary"
            onPress={() =>
              router.push("/comparison-zones/" + props.comparisonZoneId)
            }
          >
            Administrar
          </DropdownItem>
          <DropdownItem
            key="delete"
            description="Eliminar zona de comparación"
            color="danger"
            onPress={() => setOpenDeleteModal(true)}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <DeleteModal
        isOpen={openDeleteModal}
        handleDelete={handleDelete}
        onOpenChange={setOpenDeleteModal}
        isLoading={isLoading}
      />
    </>
  );
};
