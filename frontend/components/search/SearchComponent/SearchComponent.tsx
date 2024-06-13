"use client";

import ProductGrid from "@/components/products/ProductGrid/ProductGrid";
import { SaveBtn } from "@/components/shared/buttons/SaveBtn";
import { ErrorMsg } from "@/components/shared/messages/ErrorMsg/ErrorMsg";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";

type Props = {
  hideSaveSearch?: boolean;
};

export const SearchComponent: React.FC<Props> = (props) => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchResults, setSearchResults] = useState<ISearchProducts | null>(
    null
  );

  useEffect(() => {
    async function handleSearchProducts() {
      setLoading(true);
      setIsError(false);

      try {
        const data = await fetch(
          process.env.NEXT_PUBLIC_API_URL! +
            `api/v1/search/?` +
            searchParams.toString()
        )
          .then((response) => {
            return response.json();
          })
          .catch((error) => {
            throw error;
          });

        setSearchResults(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    handleSearchProducts();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center gap-8 max-md:pt-4 w-full">
      <div className="flex max-md:flex-col items-center gap-2 max-w-3xl w-full">
        <SearchForm loading={loading} />
        {!props.hideSaveSearch && <SaveBtn />}
      </div>
      <ProductGrid searchResults={searchResults} loading={loading} />

      {isError && <ErrorMsg />}
    </div>
  );
};
