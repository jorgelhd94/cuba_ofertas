import SearchPagination from "@/components/search/SearchPagination/SearchPagination";
import SearchResultsText from "@/components/search/SearchResultsText/SearchResultsText";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { OrderBy } from "@/components/shared/selects/order-by/OrderBy";
import { HidePinProductContext } from "@/lib/context/HidePinProductContext";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import React, { useContext } from "react";
import { ProductModeSelect } from "../../shared/selects/product-mode-select/ProductModeSelect";
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
            <ProductModeSelect isDisabled={loading} />
            <OrderBy isDisabled={loading} />
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
