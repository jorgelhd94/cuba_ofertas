import { SearchSection } from "@/components/search/SearchSection/SearchSection";
import { Suspense } from "react";

export default async function SearchPage() {
  return (
    <div className=" container mx-auto max-w-screen-xl">
      <div className="w-full md:pt-8 space-y-8">
        <h1 className="text-3xl w-full text-center">Búsqueda general</h1>
        <Suspense>
          <SearchSection />
        </Suspense>
      </div>
    </div>
  );
}
