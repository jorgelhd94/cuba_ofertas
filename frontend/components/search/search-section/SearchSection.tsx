"use client";

import { ProductCard } from "@/components/products/product-card/ProductCard";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { useState } from "react";
import { SearchForm } from "../search-form/SearchForm";

export const SearchSection = () => {
  const [loading, setLoading] = useState(false);
  const [pinProduct, setPinProduct] = useState<IProduct | null>(null);

  const [params, setParams] = useState({
    searchText: "",
    orderBy: -1,
    pagination: 1,
    productMode: -1,
  });

  const [searchResults, setSearchResults] = useState<ISearchProducts | null>(
    null
  );

  const getSearchParams = (
    text: string,
    pagination?: number,
    orderby?: number
  ) => {
    const urlSearchParams = new URLSearchParams();

    if (text) {
      urlSearchParams.append("search_text", text);

      setParams((prevState) => ({
        ...prevState,
        searchText: text,
      }));
    }

    if (pagination) {
      urlSearchParams.append("pagination", pagination.toString());

      setParams((prevState) => ({
        ...prevState,
        pagination: pagination,
      }));
    }

    if (orderby) {
      urlSearchParams.append("orderby", orderby.toString());

      setParams((prevState) => ({
        ...prevState,
        orderBy: orderby,
      }));
    }

    return urlSearchParams;
  };

  const handleSearch = async (
    text: string,
    pagination?: number,
    orderby?: number
  ) => {
    setLoading(true);

    const urlSearchParams = getSearchParams(text, pagination, orderby);

    try {
      const data = await fetch(
        process.env.NEXT_PUBLIC_API_URL! +
          `api/v1/search/?` +
          urlSearchParams.toString()
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          throw error;
        });

      setSearchResults(data);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-8 md:pt-8 gap-8">
      <SearchForm loading={loading} handleSearch={handleSearch} />

      <PinProductContext.Provider value={{ pinProduct, setPinProduct }}>
        <div className="flex max-md:flex-col justify-between px-4 gap-4 w-full">
          {pinProduct && (
            <div className="h-max sticky top-16 lg:top-20 z-50 flex md:flex-col justify-center">
              <h3 className="text-xl font-medium pb-4 max-md:hidden">
                Producto fijado
              </h3>
              <ProductCard product={pinProduct} />
            </div>
          )}
          <ProductGrid
            searchResults={searchResults}
            searchParams={params}
            loading={loading}
            handleSearch={handleSearch}
          />
        </div>
      </PinProductContext.Provider>
    </div>
  );
};
