"use client";

import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { useState } from "react";
import { GenericSearch } from "../generic-search/GenericSearch";

export const SearchSection = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [searchResults, setSearchResults] = useState<ISearchProducts | null>(
    null
  );

  const handleSearch = async (searchParams: {
    text: string;
    pagination?: number;
    orderby?: number;
  }) => {
    setSearchText(searchParams.text);
    setLoading(true);

    try {
      const data = await fetch(
        process.env.NEXT_PUBLIC_API_URL! +
          `api/v1/search/?search_text=${searchText || ""}`
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
      <GenericSearch
        searchText={searchText}
        loading={loading}
        handleSearch={handleSearch}
      />
      <ProductGrid
        products={searchResults ? searchResults.products : []}
        searchText={searchText}
        loading={loading}
      />
    </div>
  );
};
