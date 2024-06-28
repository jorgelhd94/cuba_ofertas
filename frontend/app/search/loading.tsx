import { ProductsSkeleton } from "@/components/products/ProductsSkeleton/ProductsSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="w-full pt-2 md:pt-6 space-y-8">
        <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4">
          <ProductsSkeleton />
        </div>
      </div>
    </div>
  );
}
