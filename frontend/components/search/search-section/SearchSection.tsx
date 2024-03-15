"use client";

import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { useState } from "react";
import { SearchForm } from "../search-form/SearchForm";

export const SearchSection = () => {
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    searchText: "",
    orderBy: -1,
    pagination: 1,
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
      <ProductGrid
        searchResults={searchResults}
        searchParams={params}
        loading={loading}
        handleSearch={handleSearch}
      />
    </div>
  );
};
