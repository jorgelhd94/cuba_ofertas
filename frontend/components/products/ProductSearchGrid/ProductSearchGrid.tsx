import FilterDrawer from "@/components/search/FilterDrawer/FilterDrawer";
import SearchPagination from "@/components/search/SearchPagination/SearchPagination";
import SearchResultsText from "@/components/search/SearchResultsText/SearchResultsText";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { HidePinProductContext } from "@/lib/context/HidePinProductContext";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { Button, Chip } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { HiAdjustments, HiTrash } from "react-icons/hi";
import { ProductCard } from "../ProductCard/ProductCard";
import { ProductsSkeleton } from "../ProductsSkeleton/ProductsSkeleton";

type ProductSearchGridProps = {
  searchResults: ISearchProducts | null;
  loading: boolean;
};

export const ProductSearchGrid: React.FC<ProductSearchGridProps> = ({
  searchResults,
  loading,
}) => {
  const hidePinProduct = useContext(HidePinProductContext);
  const searchParams = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const showData = () => {
    if (loading) {
      return <ProductsSkeleton />;
    } else if (searchResults && searchResults.results.length) {
      return (
        <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4">
          {searchResults.results.map((item, index) => (
            <ProductCard
              key={item.product_id + "-" + index}
              product={item}
              hideSetPin={hidePinProduct}
            />
          ))}
        </div>
      );
    } else {
      return <EmptyMsg />;
    }
  };

  const [countFilters, setCountFilters] = useState(0);

  const handleCountFilters = () => {
    let newCount = 0;

    if (
      searchParams.get("orderby") &&
      searchParams.get("orderby") !== "default"
    ) {
      newCount += 1;
    }

    if (searchParams.get("mode") && searchParams.get("mode") !== "show_all") {
      newCount += 1;
    }

    setCountFilters(newCount);
  };

  useEffect(() => handleCountFilters(), [searchParams]);

  const router = useRouter();
  const pathname = usePathname();

  const cleanFilters = () => {
    const searchText = searchParams.get("q");
    const newParams = new URLSearchParams();

    if (searchText) {
      newParams.set("q", searchText);
    }

    router.push(pathname + "?" + newParams.toString());
  };

  return (
    searchResults?.results && (
      <div className="px-4 md:px-8 flex flex-col items-center gap-8 w-full">
        <div className="flex max-md:flex-col gap-4 justify-between w-full">
          <SearchResultsText
            resultsLength={searchResults.results.length}
            total={searchResults.count}
            loading={loading}
          />
          <div className="flex max-md:w-full gap-2 flex-grow justify-center md:justify-end flex-wrap">
            <Button
              color="secondary"
              startContent={<HiAdjustments />}
              endContent={
                <Chip radius="sm" color="primary" size="sm">
                  {countFilters}
                </Chip>
              }
              onClick={() => setIsFilterOpen(true)}
              variant="ghost"
            >
              Filtros
            </Button>
            <FilterDrawer
              isOpen={isFilterOpen}
              handleClose={() => setIsFilterOpen(false)}
              isLoading={loading}
            />

            {countFilters > 0 && (
              <Button
                color="danger"
                startContent={<HiTrash />}
                onClick={() => cleanFilters()}
              >
                Limpiar
              </Button>
            )}
          </div>
        </div>

        {showData()}

        {searchResults.results.length > 0 && (
          <SearchPagination
            total={Math.ceil(searchResults.count / 10)}
            loading={loading}
          />
        )}
      </div>
    )
  );
};

export default ProductSearchGrid;
