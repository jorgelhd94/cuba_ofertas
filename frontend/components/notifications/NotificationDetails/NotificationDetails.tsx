"use client";
import INotification from "@/lib/interfaces/INotification";
import { convertToReadableDate } from "@/lib/utils/functions/dates";
import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import MainProductList from "../HighRankedNotification/MainProductList";
import { useSWRConfig } from "swr";
import { getApiUrl } from "@/lib/utils/api/api";
import { DeleteModal } from "@/components/shared/modals/DeleteModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  notification: INotification;
};

const NotificationDetails = (props: Props) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  useEffect(() => {
    mutate(getApiUrl("/unread-notifications/"));
  }, []);

  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    await fetch(getApiUrl("/notifications/" + props.notification.id), {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Alerta eliminada correctamente");
        router.push("/notifications");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error al eliminar");
      });

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Button
          color="primary"
          variant="ghost"
          as={Link}
          href="/notifications"
          startContent={<FaArrowLeft />}
          className="w-max"
        >
          Todas las notificaciones
        </Button>

        <>
          <Button
            color="danger"
            className="w-max"
            isIconOnly
            onClick={() => setisDeleteModalOpen(true)}
            isLoading={isLoading}
          >
            <FaTrash />
          </Button>

          <DeleteModal
            isOpen={isDeleteModalOpen}
            handleDelete={handleDelete}
            isLoading={isLoading}
            onOpenChange={setisDeleteModalOpen}
          />
        </>
      </div>

      <div className="space-y-4">
        <Chip color="primary">
          {convertToReadableDate(props.notification.created_at)}
        </Chip>

        <Card className="lg:w-max">
          <CardBody>{props.notification.message}</CardBody>
        </Card>
      </div>

      {props.notification.notification_type === "new_in_ranking" && (
        <MainProductList notification={props.notification} />
      )}
    </>
  );
};

export default NotificationDetails;
