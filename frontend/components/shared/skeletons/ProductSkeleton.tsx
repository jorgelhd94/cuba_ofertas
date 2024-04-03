import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

export const ProductSkeleton = () => {
  return (
    <Card
      className="w-[90vw] sm:w-48 md:w-[230px] space-y-5 "
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="h-48 w-full rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 p-4 pt-0">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
