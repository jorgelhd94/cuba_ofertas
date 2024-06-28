import { Skeleton } from "@nextui-org/react";
import React from "react";

type Props = {};

const SingleNotificationSkeleton = (props: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <Skeleton className="rounded-lg  w-full">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg  w-full">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg  w-full">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
};

export default SingleNotificationSkeleton;
