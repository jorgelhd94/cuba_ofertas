"use client";
import { ErrorMsg } from "@/components/shared/messages/ErrorMsg/ErrorMsg";
import NotificationsSkeleton from "@/components/shared/skeletons/NotificationsSkeleton";
import INotification from "@/lib/interfaces/INotification";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import NotificationListItem from "../NotificationListItem/NotificationListItem";
import { Button } from "@nextui-org/react";

type Props = {};

const NotificationList = (props: Props) => {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, error } = useSWR(
    getApiUrl(`/notifications/?page=${page}`),
    fetcher
  );

  const loadMore = () => {
    if (data && data.next) {
      setPage((prevPage) => prevPage + 1);
      setIsLoadingMore(true);
    }
  };

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setNotifications(data.results);
      } else {
        setNotifications((prevProducts) => [...prevProducts, ...data.results]);
      }
      setIsLoadingMore(false);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  if (error) return <ErrorMsg message="Error al cargar las alertas" />;
  if (!data && page === 1) return <NotificationsSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Alertas</h1>
        <Button color="danger" size="sm">Eliminar todo</Button>
      </div>

      {notifications.map((product: any) => (
        <NotificationListItem key={product.id} notification={product} />
      ))}

      {isLoadingMore && <NotificationsSkeleton />}
    </div>
  );
};

export default NotificationList;
