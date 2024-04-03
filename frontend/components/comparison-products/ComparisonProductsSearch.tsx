"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { SearchComponent } from "../search/SearchComponent/SearchComponent";
import { HidePinProductContext } from "@/lib/context/HidePinProductContext";

type Props = {
  zoneId: string;
};

export const ComparisonProductsSearch: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <Button
        color="primary"
        variant="ghost"
        onPress={() => router.push("/comparison-zones/" + props.zoneId)}
        className="w-max"
      >
        Volver a la zona
      </Button>

      <h1 className="text-3xl w-full text-center">Buscar productos</h1>
      <div className="flex justify-center pt-4">
        <HidePinProductContext.Provider value={true}>
          <SearchComponent hideSaveSearch />
        </HidePinProductContext.Provider>
      </div>
    </div>
  );
};
