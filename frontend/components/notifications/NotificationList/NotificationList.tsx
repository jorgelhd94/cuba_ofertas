"use client";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { ErrorMsg } from "@/components/shared/messages/ErrorMsg/ErrorMsg";
import NotificationsSkeleton from "@/components/shared/skeletons/NotificationsSkeleton";
import INotification from "@/lib/interfaces/INotification";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import NotificationListItem from "../NotificationListItem/NotificationListItem";
import { toast } from "react-toastify";
import { DeleteModal } from "@/components/shared/modals/DeleteModal";
import { useSWRConfig } from "swr";

type Props = {};

interface Data {
  next: string | null;
  results: INotification[];
}

const getKey = (pageIndex: number, previousPageData: Data) => {
  if (previousPageData && !previousPageData.next) return null; // reached the end
  return getApiUrl(`/notifications?page=${pageIndex + 1}&page_size=100`); // SWR key
};

const NotificationList = (props: Props) => {
  const { data, size, setSize, error, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const swrConfig = useSWRConfig();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setSize(size + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [size, setSize]);

  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  swrConfig.mutate(getApiUrl("/unread-notifications/"));

  const deleteAll = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(getApiUrl("/notifications/delete_all/"), {
        method: "DELETE",
      });

      if (response.ok) {
        await mutate();

        swrConfig.mutate(getApiUrl("/unread-notifications/"));

        toast("Todas las alertas han sido eliminadas", { type: "success" });
      }
    } catch (error) {
      toast("Ha ocurrido un error al eliminar", { type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    setIsDataEmpty(data && data[0] && data[0].count === 0);
  }, [data]);

  if (error) return <ErrorMsg message="Error al cargar las alertas" />;

  if (!data) return <NotificationsSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold ">Alertas</h1>
        {!isDataEmpty && (
          <>
            <Button
              color="danger"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Eliminar todo {data[0] && `(${data[0].count})`}
            </Button>

            <DeleteModal
              isLoading={isDeleting}
              handleDelete={deleteAll}
              isOpen={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
              message="¿Desea eliminar todas las alertas?"
            />
          </>
        )}
      </div>

      {data &&
        data.map((notifications) => {
          return notifications.results.map((item: INotification) => (
            <NotificationListItem
              key={item.id}
              notification={item}
              onDelete={() => mutate()}
            />
          ));
        })}

      {isLoading && <NotificationsSkeleton />}

      {isDataEmpty && (
        <EmptyMsg
          title="Sin resultados"
          message="No hay alertas para mostrar"
        />
      )}
    </div>
  );
};

export default NotificationList;
