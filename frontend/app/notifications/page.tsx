import NotificationList from "@/components/notifications/NotificationList/NotificationList";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  return (
    <div className="container mx-auto max-w-screen-md px-4">
      <div className="w-full space-y-4">
        <NotificationList />
      </div>
    </div>
  );
}
