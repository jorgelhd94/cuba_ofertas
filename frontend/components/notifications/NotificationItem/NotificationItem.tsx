import INotification from "@/lib/interfaces/INotification";
import { convertToReadableDate } from "@/lib/utils/functions/dates";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaInfo } from "react-icons/fa6";

type Props = {
  notification: INotification;
  onClick?: React.MouseEventHandler;
};

const NotificationItem = (props: Props) => {
  const getColor = () => {
    if (props.notification.notification_type === "new_in_ranking") {
      return "danger";
    }

    return "primary";
  };
  return (
    <Link
      href={`/notifications/${props.notification.id}`}
      onClick={props.onClick}
      className="w-full"
    >
      <Card shadow="sm" radius="sm">
        <CardBody
          className={`relative py-2 pr-2 space-y-1 hover:bg-default-100 transition-all pl-4 border-l-4 select-none cursor-pointer border-${getColor()}`}
        >
          <p className={`text-xs text-${getColor()}`}>
            {convertToReadableDate(props.notification.created_at)}
          </p>
          <p className="text-sm">{props.notification.message}</p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default NotificationItem;
