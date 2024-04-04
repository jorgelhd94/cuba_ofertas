"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SearchComponent } from "../search/SearchComponent/SearchComponent";
import { HidePinProductContext } from "@/lib/context/HidePinProductContext";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/api/fetcher";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { ErrorMsg } from "../shared/messages/ErrorMsg/ErrorMsg";
import { ProductCard } from "../products/ProductCard/ProductCard";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { ComparisonZoneIdContext } from "@/lib/context/ComparisonZoneIdContext";

type Props = {
  zoneId: string;
};

export const ComparisonProductsSearch: React.FC<Props> = (props) => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `/comparison-zones/${props.zoneId}/api/`,
    fetcher
  );

  const [comparisonZone, setComparisonZone] = useState<IComparisonZone | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setComparisonZone(data.comparisonZone);
    }
  }, [data]);

  if (error)
    return (
      <div className="pt-12 space-y-4 flex flex-col items-center">
        <ErrorMsg message="Esta zona no existe" />
        <Button
          color="primary"
          variant="ghost"
          onPress={() => router.push("/comparison-zones")}
        >
          Todas las zonas
        </Button>
      </div>
    );

  return (
    comparisonZone && (
      <div className="flex flex-col gap-2">
        <Button
          color="primary"
          variant="ghost"
          onPress={() => router.push("/comparison-zones/" + props.zoneId)}
          className="w-max"
        >
          Volver a la zona
        </Button>

        <div className="flex max-md:flex-col justify-between gap-8 w-full pt-4">
          <div className="text-center space-y-2 sticky top-16 lg:top-20 z-50 h-max">
            <h3 className="text-xl font-medium max-sm:hidden">
              Producto principal
            </h3>
            <ProductCard
              product={comparisonZone.main_product}
              hideSetPin
              hideMenu
            />
          </div>
          <div className="flex flex-col items-center w-full gap-4">
            <h1 className="text-3xl w-full text-center">Buscar productos</h1>
            <PinProductContext.Provider
              value={{ pinProduct: comparisonZone.main_product }}
            >
              <HidePinProductContext.Provider value={true}>
                <ComparisonZoneIdContext.Provider value={props.zoneId}>
                  <SearchComponent hideSaveSearch />
                </ComparisonZoneIdContext.Provider>
              </HidePinProductContext.Provider>
            </PinProductContext.Provider>
          </div>
        </div>
      </div>
    )
  );
};
