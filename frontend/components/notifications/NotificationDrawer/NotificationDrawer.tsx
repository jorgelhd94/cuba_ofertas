"use client";
import INotification from "@/lib/interfaces/INotification";
import { Button } from "@nextui-org/react";
import { Drawer } from "flowbite-react";
import { FaBell } from "react-icons/fa6";
import NotificationItem from "../NotificationItem/NotificationItem";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  handleClose: Function;
  notifications: INotification[];
  isError?: boolean;
};

const NotificationDrawer = (props: Props) => {
  const [notifications, setNotifications] = useState<INotification[]>(
    props.notifications
  );

  useEffect(() => {
    if (props.notifications) {
      setNotifications(props.notifications);
    }
  }, [props.notifications]);

  return (
    <Drawer
      open={props.isOpen}
      onClose={() => props.handleClose()}
      position="right"
      className="max-sm:w-full"
    >
      <Drawer.Header title="Alertas" titleIcon={FaBell} />
      <Drawer.Items className="relative">
        <div className="flex flex-col items-center gap-4 pb-16">
          {props.isError && (
            <p className="text-danger">Error al cargar las alertas</p>
          )}

          {props.notifications?.length === 0 && (
            <p>No hay nuevas alertas</p>
          )}

          {notifications &&
            notifications
              .slice(0, 99)
              .map((notification: any) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => props.handleClose()}
                />
              ))}

          <div
            className={
              notifications && notifications.length > 20
                ? "fixed bottom-4 z-50"
                : ""
            }
          >
            <Button
              as={Link}
              href="/notifications"
              color="primary"
              variant="shadow"
              onClick={() => props.handleClose()}
            >
              Ver todas
              {notifications && notifications.length > 99 ? " +99" : ""}
            </Button>
          </div>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default NotificationDrawer;
