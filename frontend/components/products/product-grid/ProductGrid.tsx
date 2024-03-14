"use client";

import { IProduct } from "@/lib/interfaces/IProduct";
import React, { useState } from "react";
import { ProductCard } from "../product-card/ProductCard";
import { ProductsSkeleton } from "../products-skeleton/ProductsSkeleton";
import { OrderBy } from "@/components/shared/selects/order-by/OrderBy";
import { Pagination } from "@nextui-org/react";

type SearchParamsType = {
  searchText: string;
  orderBy: number;
  pagination: number;
};

type ProductGridProps = {
  products: IProduct[] | undefined;
  searchParams: SearchParamsType;
  loading: boolean;
  handleSearch: (
    searchText: string,
    pageNumber?: number,
    order?: number
  ) => void;
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
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
    } else if (products?.length) {
      return (
        <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-4">
          {products.map((item, index) => (
            <ProductCard key={item.id + "-" + index} product={item} />
          ))}
        </div>
      );
    } else {
      return "Vacio";
    }
  };

  return (
    products && (
      <div className="px-4 md:px-8 flex flex-col items-center gap-8 w-full">
        <div className="flex max-md:flex-col gap-4 justify-between items-center w-full">
          <h3 className="text-xl max-md:text-center">
            Resultados de búsqueda para:{" "}
            <b>
              {searchParams.searchText
                ? searchParams.searchText
                : "Todos los productos"}
            </b>
          </h3>
          <OrderBy handleOrderBy={handleOrderBy} isDisabled={loading} />
        </div>
        {showData()}

        <Pagination
          onChange={(pag) => handlePagination(pag)}
          color="secondary"
          showControls
          total={10}
          initialPage={searchParams.pagination}
          isDisabled={loading}
        />
      </div>
    )
  );
};

export default ProductGrid;
