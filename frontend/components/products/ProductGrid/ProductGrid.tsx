"use client";

import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { OrderBy } from "@/components/shared/selects/order-by/OrderBy";
import { IProduct } from "@/lib/interfaces/IProduct";
import { ISearchParams } from "@/lib/interfaces/ISearchParams";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { HandleSearchType } from "@/lib/types/HandleSearchType";
import { filterProducts } from "@/lib/utils/functions/filters";
import { Pagination } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { ProductModeSelect } from "../../shared/selects/product-mode-select/ProductModeSelect";
import { ProductCard } from "../ProductCard/ProductCard";
import { ProductsSkeleton } from "../ProductsSkeleton/ProductsSkeleton";
import { getEmptyMessageByProductMode } from "@/lib/utils/functions/common";

type ProductGridProps = {
  searchResults: ISearchProducts | null;
  searchParams: ISearchParams;
  loading: boolean;
  handleSearch: HandleSearchType;
  handleProductMode: (productMode: string) => void;
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  searchResults,
  searchParams,
  loading,
  handleSearch,
  handleProductMode,
}) => {
  const [products, setProducts] = useState<IProduct[]>(
    searchResults?.products || []
  );

  const handleOrderBy = async (value: number) => {
    handleSearch(searchParams.searchText, searchParams.pagination, value);
  };

  const handlePagination = async (value: number) => {
    handleSearch(searchParams.searchText, value, searchParams.orderBy);
  };

  useEffect(() => {
    setProducts(
      filterProducts(searchResults?.products, searchParams.productMode)
    );
  }, [searchParams.productMode, searchResults?.products]);

  const showData = () => {
    if (loading) {
      return <ProductsSkeleton />;
    } else if (products.length) {
      return (
        <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4">
          {products.map((item, index) => (
            <ProductCard key={item.id + "-" + index} product={item} />
          ))}
        </div>
      );
    } else {
      return (
        <EmptyMsg
          message={getEmptyMessageByProductMode(searchParams.productMode)}
        />
      );
    }
  };

  return (
    searchResults?.products && (
      <div className="px-4 md:px-8 flex flex-col items-center gap-8 w-full">
        <div className="flex max-md:flex-col gap-4 justify-between items-center w-full">
          <div>
            <h3 className="text-xl max-md:text-center">
              Resultados de búsqueda para:{" "}
              <b>
                {searchParams.searchText
                  ? searchParams.searchText
                  : "Todos los productos"}
              </b>
            </h3>

            {!loading && (
              <h5 className="text-sm font-semibold max-md:text-center max-sm:mt-4">
                {searchResults.page_amount_text}
              </h5>
            )}
          </div>
          <div className="flex gap-2 flex-grow justify-end flex-wrap">
            <ProductModeSelect
              isDisabled={loading}
              handleProductMode={handleProductMode}
              orderByOption={searchParams.productMode}
            />
            <OrderBy
              handleOrderBy={handleOrderBy}
              isDisabled={loading}
              orderByOption={searchParams.orderBy}
            />
          </div>
        </div>

        {showData()}

        {searchResults.products.length > 0 && (
          <Pagination
            onChange={(pag) => handlePagination(pag)}
            color="secondary"
            total={Math.ceil(searchResults.total / 20)}
            initialPage={1}
            page={searchParams.pagination > -1 ? searchParams.pagination : 1}
            isCompact
            isDisabled={loading}
            boundaries={1}
          />
        )}
      </div>
    )
  );
};

export default ProductGrid;
