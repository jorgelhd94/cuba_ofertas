import { SearchSection } from "@/components/search/SearchSection/SearchSection";

export default async function SearchPage() {
  return (
    <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
      <div className="py-24 lg:py-12 container mx-auto max-w-screen-xl">
        <div className="w-full md:pt-8 text-center space-y-8">
          <h1 className="text-3xl">Búsqueda general</h1>
          <SearchSection />
        </div>
      </div>
    </div>
  );
}
