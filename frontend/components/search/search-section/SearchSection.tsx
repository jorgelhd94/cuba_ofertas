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

  const handleSearch = async (text: string) => {
    setSearchText(text);
    setLoading(true);
    
    const params = {
      text: searchText ? "search_text=" + text : "",
    };

    try {
      const data = await fetch(
        process.env.NEXT_PUBLIC_API_URL! + `api/v1/search/?` + params.text
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
      <GenericSearch loading={loading} handleSearch={handleSearch} />
      <ProductGrid
        products={searchResults?.products}
        searchText={searchText}
        loading={loading}
      />
    </div>
  );
};
