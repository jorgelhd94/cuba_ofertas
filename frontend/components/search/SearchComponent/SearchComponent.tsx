import React, { useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import ProductGrid from "@/components/products/ProductGrid/ProductGrid";
import { ISearchProducts } from "@/lib/interfaces/ISearchProducts";
import { SaveBtn } from "@/components/shared/buttons/SaveBtn";

type Props = {
  hideSaveSearch?: boolean;
};

export const SearchComponent: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    searchText: "",
    orderBy: -1,
    pagination: 1,
    productMode: "-1",
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

  const handleProductMode = (productMode: string) => {
    if (!productMode) {
      setParams({ ...params, productMode: "-1" });
    } else {
      setParams({ ...params, productMode });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-md:pt-4 w-full">
      <div className="flex max-md:flex-col items-center gap-2 max-w-3xl w-full">
        <SearchForm loading={loading} handleSearch={handleSearch} />
        {!props.hideSaveSearch && <SaveBtn />}
      </div>
      <ProductGrid
        searchResults={searchResults}
        searchParams={params}
        loading={loading}
        handleSearch={handleSearch}
        handleProductMode={handleProductMode}
      />
    </div>
  );
};
