"use client";

import SearchResultsText from "@/components/search/SearchResultsText/SearchResultsText";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { OrderBy } from "@/components/shared/selects/order-by/OrderBy";
import { HidePinProductContext } from "@/lib/context/HidePinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { getEmptyMessageByProductMode } from "@/lib/utils/functions/common";
import { filterProducts } from "@/lib/utils/functions/filters";
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ProductModeSelect } from "../../shared/selects/product-mode-select/ProductModeSelect";
import { ProductCard } from "../ProductCard/ProductCard";
import { ProductsSkeleton } from "../ProductsSkeleton/ProductsSkeleton";
import { useQueryString } from "@/lib/hooks/useQueryString";

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

  const router = useRouter();
  const pathname = usePathname();

  const { createQueryString } = useQueryString(searchParams);

  const [products, setProducts] = useState<IProduct[]>(
    searchResults?.results || []
  );

  const handlePagination = (page: number) => {
    const param = {
      name: "page",
      value: page.toString(),
    };

    router.push(pathname + "?" + createQueryString(param));
  };

  useEffect(() => {
    setProducts(filterProducts(searchResults?.results));
  }, [searchResults?.results]);

  const showData = () => {
    if (loading) {
      return <ProductsSkeleton />;
    } else if (products.length) {
      return (
        <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4">
          {products.map((item, index) => (
            <ProductCard
              key={item.product_id + "-" + index}
              product={item}
              hideSetPin={hidePinProduct}
            />
          ))}
        </div>
      );
    } else {
      return <EmptyMsg message={getEmptyMessageByProductMode("1")} />;
    }
  };

  return (
    searchResults?.results && (
      <div className="px-4 md:px-8 flex flex-col items-center gap-8 w-full">
        <div className="flex max-md:flex-col gap-4 justify-between items-center w-full">
          <SearchResultsText
            resultsLength={searchResults.results.length}
            total={searchResults.count}
            loading={loading}
          />
          <div className="flex gap-2 flex-grow justify-end flex-wrap">
            <ProductModeSelect
              isDisabled={loading}
              handleProductMode={() => {}}
              orderByOption={"0"}
            />
            <OrderBy isDisabled={loading} />
          </div>
        </div>

        {showData()}

        {searchResults.results.length > 0 && (
          <Pagination
            onChange={(page) => handlePagination(page)}
            color="secondary"
            total={Math.ceil(searchResults.count / 10)}
            initialPage={1}
            page={parseInt(searchParams.get("page") || "1")}
            isCompact
            isDisabled={loading}
            boundaries={1}
          />
        )}
      </div>
    )
  );
};

export default ProductSearchGrid;
