import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

export default function ZonesSkeleton() {
  const cardsList = () => {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      cards.push(
        <Card key={i} className="w-80 h-[300px] space-y-5 p-4" radius="lg">
          <div className="space-y-3 flex flex-col items-center">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <Skeleton className="rounded-lg">
            <div className="h-80 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3 flex flex-col items-center">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        </Card>
      );
    }
    return cards;
  };
  return (
    <div className="flex justify-center gap-8 flex-wrap">{cardsList()}</div>
  );
}
