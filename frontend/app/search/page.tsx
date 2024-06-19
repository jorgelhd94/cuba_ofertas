import { SearchSection } from "@/components/search/SearchSection/SearchSection";
import SearchFormSkeleton from "@/components/shared/skeletons/SearchFormSkeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="w-full md:pt-2 space-y-8">
        <h1 className="text-3xl w-full text-center">Búsqueda general</h1>
        <Suspense fallback={<SearchFormSkeleton />}>
          <SearchSection />
        </Suspense>
      </div>
    </div>
  );
}
