"use client";

import { PinProductContext } from "@/lib/context/PinProductContext";
import { IProduct } from "@/lib/interfaces/IProduct";
import { useState } from "react";
import { SearchComponent } from "../SearchComponent/SearchComponent";

export const SearchSection = () => {
  const [pinProduct, setPinProduct] = useState<IProduct | null>(null);

  return (
    <PinProductContext.Provider value={{ pinProduct, setPinProduct }}>
        <SearchComponent />
    </PinProductContext.Provider>
  );
};
