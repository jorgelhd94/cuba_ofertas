
import { GenericSearch } from "@/components/search/generic-search/GenericSearch";

export default async function SearchPage() {
    return (
      <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
        <div className="py-24 lg:py-12 container mx-auto max-w-screen-xl">
          <div className="flex flex-wrap flex-row items-center">
            <div className="w-full flex flex-col items-center pt-8 md:pt-8 gap-8">
              <GenericSearch
                searchText={"searchText"}
              />
  
              {/* {products && products.length > 0 && (
                <ProductGrid products={products} searchText={searchText} />
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
}
