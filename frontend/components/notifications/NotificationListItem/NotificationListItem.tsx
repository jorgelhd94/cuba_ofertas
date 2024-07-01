import { DeleteModal } from "@/components/shared/modals/DeleteModal";
import INotification from "@/lib/interfaces/INotification";
import { getApiUrl } from "@/lib/utils/api/api";
import { convertToReadableDate } from "@/lib/utils/functions/dates";
import { Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

type Props = {
  notification: INotification;
  onDelete?: Function;
};

const NotificationListItem = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getColor = () => {
    if (props.notification.notification_type === "new_in_ranking") {
      return "danger";
    }

    return "primary";
  };

  const handleDelete = async () => {
    setIsLoading(true);

    await fetch(getApiUrl("/notifications/" + props.notification.id), {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Alerta eliminada correctamente");
        setIsOpen(false);
        if (props.onDelete) {
          props.onDelete();
        }
      })
      .catch(() => {
        toast.error("Ha ocurrido un error al eliminar");
      });

    setIsLoading(false);
  };

  return (
    <>
      <Card
        className={`py-2 hover:bg-default-100 transition-all border-l-4 select-none cursor-pointer border-${getColor()}`}
      >
        <CardBody className="relative flex flex-wrap gap-2 pl-4 justify-end md:justify-between items-center flex-row">
          <div className="space-y-2 md:w-[85%]">
            <p className={`text-xs text-${getColor()}`}>
              {convertToReadableDate(props.notification.created_at)}
            </p>

            <p className="text-sm">{props.notification.message}</p>
          </div>

          <div className="flex gap-2">
            {props.notification.notification_type === "new_in_ranking" && (
              <Button
                as={Link}
                href={`/notifications/${props.notification.id}`}
                isIconOnly
                color="primary"
              >
                <FaSearch />
              </Button>
            )}

            <Button
              isLoading={isLoading}
              isIconOnly
              color="danger"
              onClick={() => setIsOpen(true)}
            >
              <FaTrash />
            </Button>
          </div>
        </CardBody>
      </Card>

      <DeleteModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
};

export default NotificationListItem;
