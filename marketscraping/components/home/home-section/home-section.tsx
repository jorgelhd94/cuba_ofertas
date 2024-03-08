"use client";
import { GenericSearch } from "@/components/search/generic-search/GenericSearch";
import { IProduct } from "@/lib/interfaces/IProduct";
import { useEffect, useState } from "react";

const HomeSection = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleProducts = (data: IProduct[]) => {
    setProducts(data);
  };

  return (
    <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
      <div className="py-24 lg:py-12 container mx-auto max-w-screen-xl">
        <div className="flex flex-wrap flex-row items-center">
          <div className="w-full flex flex-col items-center pt-8 md:pt-20">
            <GenericSearch handleProducts={handleProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
