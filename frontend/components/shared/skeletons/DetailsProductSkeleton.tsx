import { Skeleton } from "@nextui-org/react";

export const DetailsProductSkeleton = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden pt-4">
      <div className="container px-5 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Skeleton className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 space-y-4">
            <Skeleton className="h-8 w-32 rounded-md"></Skeleton>

            <Skeleton className="h-12 w-[90%] rounded-md"></Skeleton>

            <Skeleton className="h-4 w-full rounded-md"></Skeleton>
            <Skeleton className="h-4 w-full rounded-md"></Skeleton>
            <Skeleton className="h-4 w-full rounded-md"></Skeleton>
            <Skeleton className="h-4 w-full rounded-md"></Skeleton>
            <Skeleton className="h-4 w-full rounded-md"></Skeleton>

            <div className="flex">
              <Skeleton className="w-32 h-8 rounded-md"></Skeleton>
              <Skeleton className="flex ml-auto rounded w-32 h-8"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
