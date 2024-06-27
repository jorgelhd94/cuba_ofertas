import { ProductsSkeleton } from "@/components/products/ProductsSkeleton/ProductsSkeleton";
import { SearchSection } from "@/components/search/SearchSection/SearchSection";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="w-full pt-2 md:pt-6 space-y-8">
        <Suspense fallback={<ProductsSkeleton />}>
          <SearchSection />
        </Suspense>
      </div>
    </div>
  );
}
