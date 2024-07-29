import { ProductsSkeleton } from "@/components/products/ProductsSkeleton/ProductsSkeleton";
import { Skeleton } from "@nextui-org/react";
import { ProductSkeleton } from "./ProductSkeleton";

export const ComparisonZoneSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Skeleton className="w-32 rounded-lg">
          <div className="h-10 w-16 rounded-lg bg-default-200"></div>
        </Skeleton>

        <Skeleton className="w-32 rounded-lg">
          <div className="h-10 w-16 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      <div className="space-y-4">
        <div className="flex justify-center">
          <Skeleton className="w-32 rounded-lg">
            <div className="h-10 w-16 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <hr />

        <div className="flex max-sm:flex-col pt-4 gap-8">
          <div className="text-center space-y-2 sticky top-16 z-50">
            <h3 className="text-xl font-medium max-sm:hidden">
              Producto principal
            </h3>
            <ProductSkeleton />
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <h3 className="text-xl font-medium">Comparado con:</h3>
              <Skeleton className="w-32 rounded-lg">
                <div className="h-10 w-16 rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
            <div className="flex justify-center border rounded-lg p-8">
              <ProductsSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
