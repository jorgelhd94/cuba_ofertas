"use client";
import { ComparisonZoneContext } from "@/lib/context/ComparisonZoneContext";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { ComparisonProductsList } from "../comparison-products/ComparisonProductsList";
import { ProductCard } from "../products/ProductCard/ProductCard";
import { ErrorMsg } from "../shared/messages/ErrorMsg/ErrorMsg";
import { ComparisonZoneSkeleton } from "../shared/skeletons/ComparisonZoneSkeleton";
import { DeleteComparisonZone } from "./DeleteComparisonZone";

type Props = {
  id: string | number;
};

export const ManageComparisonZone: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `/api/comparison-zones/${props.id}/`,
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

  if (isLoading)
    return (
      <div className="pt-8">
        <ComparisonZoneSkeleton />
      </div>
    );

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
        <div className="flex justify-between">
          <Button
            color="primary"
            variant="ghost"
            onPress={() => router.push("/comparison-zones")}
          >
            Todas las zonas
          </Button>

          <DeleteComparisonZone id={props.id} />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl text-center">{comparisonZone.name}</h1>
          <hr />

          <div className="flex max-sm:flex-col pt-4 gap-8">
            <div className="text-center space-y-2 sticky top-16 z-50 h-max">
              <h3 className="text-xl font-medium max-sm:hidden">
                Producto principal
              </h3>
              <ProductCard
                product={comparisonZone.main_product}
                hideSetPin
                hideMenu
              />
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <h3 className="text-xl font-medium">Comparado con:</h3>
                <Button
                  color="primary"
                  variant="ghost"
                  onPress={() =>
                    router.push(`/comparison-zones/${props.id}/comparison-product`)
                  }
                >
                  Añadir producto
                </Button>
              </div>
              <div className="flex border rounded-lg p-8">
                <ComparisonZoneContext.Provider value={comparisonZone}>
                  <PinProductContext.Provider
                    value={{ pinProduct: comparisonZone.main_product }}
                  >
                    <ComparisonProductsList comparisonZone={comparisonZone} />
                  </PinProductContext.Provider>
                </ComparisonZoneContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
