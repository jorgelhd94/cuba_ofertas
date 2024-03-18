"use client";

import { OrderBy } from "@/components/shared/selects/order-by/OrderBy";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { Pagination } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { ProductCard } from "../product-card/ProductCard";
import { ProductsSkeleton } from "../products-skeleton/ProductsSkeleton";
import EmptyMsg from "@/components/shared/messages/empty-msg/empty-msg";

type SearchParamsType = {
  searchText: string;
  orderBy: number;
  pagination: number;
};

type ProductGridProps = {
  searchResults: ISearchProducts | null;
  searchParams: SearchParamsType;
  loading: boolean;
  handleSearch: (
    searchText: string,
    pageNumber?: number,
    order?: number
  ) => void;
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  searchResults,
  searchParams,
  loading,
  handleSearch,
}) => {

  const handleOrderBy = async (value: number) => {
    handleSearch(searchParams.searchText, searchParams.pagination, value);
  };

  const handlePagination = async (value: number) => {
    handleSearch(searchParams.searchText, value, searchParams.orderBy);
  };

  const showData = () => {
    if (loading) {
      return <ProductsSkeleton />;
    } else if (searchResults?.products.length) {
      return (
        <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4">
          {searchResults.products.map((item, index) => (
            <ProductCard key={item.id + "-" + index} product={item} />
          ))}
        </div>
      );
    } else {
      return <EmptyMsg />;
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
          <OrderBy
            handleOrderBy={handleOrderBy}
            isDisabled={loading}
            orderByOption={searchParams.orderBy}
          />
        </div>
        {showData()}

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
      </div>
    )
  );
};

export default ProductGrid;
