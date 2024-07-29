import NotificationList from "@/components/notifications/NotificationList/NotificationList";
import { getApiUrl } from "@/lib/utils/api/api";

export const dynamic = "force-dynamic";

async function markNotificationAsReaded() {
  const res = await fetch(getApiUrl("/notifications/mark_all_as_read/"));

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function NotificationsPage() {
  await markNotificationAsReaded();
  return (
    <div className="container mx-auto max-w-screen-md px-4">
      <div className="w-full space-y-4">
        <NotificationList />
      </div>
    </div>
  );
}
