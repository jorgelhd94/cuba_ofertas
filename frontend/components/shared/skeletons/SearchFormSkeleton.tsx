import { Skeleton } from "@nextui-org/react";
import React from "react";

type Props = {};

const SearchFormSkeleton = (props: Props) => {
  return (
    <div className="w-full flex justify-center items-center gap-2 px-4">
      <Skeleton className="rounded-lg max-w-2xl w-[80%]">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>

      <Skeleton className="rounded-lg max-w-32 w-[20%]">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
};

export default SearchFormSkeleton;
