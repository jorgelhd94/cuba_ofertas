import MainProductList from "@/components/notifications/HighRankedNotification/MainProductList";
import INotification from "@/lib/interfaces/INotification";
import { getApiUrl } from "@/lib/utils/api/api";
import { convertToReadableDate } from "@/lib/utils/functions/dates";
import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import Link from "next/link";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";

export const dynamic = "force-dynamic";

async function getData(productId: string) {
  const res = await fetch(getApiUrl("/notifications/" + productId));

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function NotificationDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const notification = (await getData(params.id)) as INotification;

  return (
    <div className="container mx-auto max-w-screen-lg px-4">
      <div className="w-full space-y-8 flex flex-col">
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

          <Button color="danger" className="w-max" isIconOnly>
            <FaTrash />
          </Button>
        </div>

        <div className="space-y-4">
          <Chip color="primary">
            {convertToReadableDate(notification.created_at)}
          </Chip>

          <Card className="lg:w-max">
            <CardBody>{notification.message}</CardBody>
          </Card>
        </div>

        {notification.notification_type === "new_in_ranking" && (
          <MainProductList notification={notification} />
        )}
      </div>
    </div>
  );
}
