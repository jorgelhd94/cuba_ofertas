"use client";

import { ProductCard } from "@/components/products/ProductCard/ProductCard";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { useState } from "react";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { NewZoneModal } from "@/components/comparison-zone/NewZoneModal/NewZoneModal";
import { CreateNewZoneContext } from "@/lib/context/CreateNewZoneContext";

export const SearchSection = () => {
  const [pinProduct, setPinProduct] = useState<IProduct | null>(null);

  const [zoneMainProduct, setZoneMainProduct] = useState<IProduct | null>(null);
  const [isModalNewZoneOpen, setIsModalNewZoneOpen] = useState(false);

  const handleNewZone = (product: IProduct | null) => {
    setIsModalNewZoneOpen(true);
    setZoneMainProduct(product);
  };

  return (
    <PinProductContext.Provider value={{ pinProduct, setPinProduct }}>
      <CreateNewZoneContext.Provider value={{ handleNewZone }}>
        <div className="flex max-md:flex-col justify-between px-4 gap-4 w-full">
          {pinProduct && (
            <div className="h-max sticky top-16 lg:top-20 z-50 flex md:flex-col justify-center">
              <h3 className="text-xl font-medium pb-4 max-md:hidden">
                Producto fijado
              </h3>
              <ProductCard product={pinProduct} />
            </div>
          )}

          <SearchComponent />
        </div>

        <NewZoneModal
          isOpen={isModalNewZoneOpen}
          onOpenChange={setIsModalNewZoneOpen}
          product={zoneMainProduct}
        />
      </CreateNewZoneContext.Provider>
    </PinProductContext.Provider>
  );
};
