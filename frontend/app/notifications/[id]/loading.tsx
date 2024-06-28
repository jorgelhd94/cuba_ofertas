import SingleNotificationSkeleton from "@/components/shared/skeletons/SingleNotificationSkeleton";

export default async function LoadingPage() {
  return (
    <div className="container mx-auto max-w-screen-md px-4">
      <div className="w-full space-y-8">
        <SingleNotificationSkeleton />
      </div>
    </div>
  );
}
