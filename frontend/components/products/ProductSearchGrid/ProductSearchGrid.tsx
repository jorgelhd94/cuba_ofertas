import FilterDrawer from "@/components/search/FilterDrawer/FilterDrawer";
import ChangeLimitSelect from "@/components/search/SearchFIlters/ChangeLimitSelect";
import SearchPagination from "@/components/search/SearchPagination/SearchPagination";
import SearchResultsText from "@/components/search/SearchResultsText/SearchResultsText";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { HidePinProductContext } from "@/lib/context/HidePinProductContext";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import getCleanUrlFilters from "@/lib/utils/functions/SearchFilters/getCleanUrlFilters";
import handleCountFilters from "@/lib/utils/functions/SearchFilters/handleCountFilters";
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
    } else if (searchResults && searchResults.results.length > 0) {
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
    } else if (searchResults && searchResults.results.length === 0) {
      return <EmptyMsg />;
    }

    return <ProductsSkeleton />;
  };

  const [countFilters, setCountFilters] = useState(0);

  useEffect(() => {
    setCountFilters(handleCountFilters(searchParams));
  }, [searchParams]);

  const router = useRouter();
  const pathname = usePathname();

  const cleanFilters = () => {
    router.push(pathname + "?" + getCleanUrlFilters(searchParams));
  };

  return (
    <div className="px-4 md:px-8 flex flex-col items-center gap-8 w-full">
      <div className="flex max-md:flex-col gap-4 justify-between w-full">
        <div className="space-y-2 flex flex-col max-md:items-center">
          <SearchResultsText
            resultsLength={searchResults?.results.length}
            total={searchResults?.count}
            loading={loading}
          />
        </div>
        <div className="flex max-md:w-full gap-2 flex-grow justify-center md:justify-end items-end flex-wrap">
          <ChangeLimitSelect isDisabled={loading} />
          <Button
            color="primary"
            startContent={<HiAdjustments />}
            endContent={
              countFilters > 0 && (
                <Chip radius="sm" color="default" size="sm">
                  {countFilters}
                </Chip>
              )
            }
            onClick={() => setIsFilterOpen(true)}
          >
            Filtros
          </Button>

          {countFilters > 0 && (
            <Button
              color="danger"
              startContent={<HiTrash />}
              onClick={() => cleanFilters()}
            >
              Limpiar
            </Button>
          )}

          <FilterDrawer
            isOpen={isFilterOpen}
            handleClose={() => setIsFilterOpen(false)}
            isLoading={loading}
          />
        </div>
      </div>

      {showData()}

      {searchResults && searchResults.results.length > 0 && (
        <SearchPagination
          totalProducts={searchResults.count}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ProductSearchGrid;
