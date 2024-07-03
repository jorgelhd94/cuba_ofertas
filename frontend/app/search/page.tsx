import { ProductsSkeleton } from "@/components/products/ProductsSkeleton/ProductsSkeleton";
import { SearchComponent } from "@/components/search/SearchComponent/SearchComponent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="w-full pt-2 md:pt-6 space-y-8">
        <Suspense
          fallback={
            <div className="max-w-screen-lg mx-auto">
              <ProductsSkeleton />
            </div>
          }
        >
          <SearchComponent />
        </Suspense>
      </div>
    </div>
  );
}
