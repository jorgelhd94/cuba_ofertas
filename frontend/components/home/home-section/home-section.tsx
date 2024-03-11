"use client";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { GenericSearch } from "@/components/search/generic-search/GenericSearch";
import { IProduct } from "@/lib/interfaces/IProduct";
import { createContext, useContext, useState } from "react";

const HomeSection = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleProducts = (data: { total: number; products: IProduct[] }) => {
    setProducts(data.products);
  };

  const handleSearchText = (text: string) => {
    setSearchText(text);
  };

  return (
    <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
      <div className="py-24 lg:py-12 container mx-auto max-w-screen-xl">
        <div className="flex flex-wrap flex-row items-center">
          <div className="w-full flex flex-col items-center pt-8 md:pt-20 gap-8">
            <GenericSearch
              searchText={searchText}
              handleProducts={handleProducts}
              handleSearchText={handleSearchText}
            />

            {products && products.length > 0 && (
              <ProductGrid products={products} searchText={searchText} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
