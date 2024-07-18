import NotificationsSkeleton from "@/components/shared/skeletons/NotificationsSkeleton";

export default async function NotificationsLoadingPage() {
  return (
    <div className="container mx-auto max-w-screen-md px-4">
      <div className="w-full space-y-8">
        <h1 className="text-2xl font-bold">Alertas</h1>
        <NotificationsSkeleton />
      </div>
    </div>
  );
}
