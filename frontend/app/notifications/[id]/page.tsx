import NotificationDetails from "@/components/notifications/NotificationDetails/NotificationDetails";
import INotification from "@/lib/interfaces/INotification";
import { getApiUrl } from "@/lib/utils/api/api";

export const dynamic = "force-dynamic";

async function getData(notificationId: string) {
  const res = await fetch(getApiUrl("/notifications/" + notificationId));

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

  return <NotificationDetails notification={notification} />;
}
